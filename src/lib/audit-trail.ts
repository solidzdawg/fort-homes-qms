/**
 * Audit Trail Utility
 * Tracks and logs changes to documents
 */

import { prisma } from '../database/client';

export interface AuditEntry {
  documentId: string;
  action: 'create' | 'update' | 'approve' | 'archive';
  userId: string;
  userName?: string;
  changes: any;
  timestamp?: Date;
}

export class AuditTrail {
  /**
   * Log an audit entry
   */
  static async log(entry: AuditEntry): Promise<void> {
    try {
      await prisma.auditTrail.create({
        data: {
          documentId: entry.documentId,
          action: entry.action,
          userId: entry.userId,
          userName: entry.userName,
          changes: JSON.stringify(entry.changes),
          timestamp: entry.timestamp || new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to log audit entry:', error);
    }
  }

  /**
   * Get audit trail for a document
   */
  static async getTrail(documentId: string): Promise<any[]> {
    try {
      const trail = await prisma.auditTrail.findMany({
        where: { documentId },
        orderBy: { timestamp: 'desc' },
      });

      return trail.map((entry) => ({
        id: entry.id,
        action: entry.action,
        user: entry.userName || entry.userId,
        timestamp: entry.timestamp,
        changes: JSON.parse(entry.changes),
      }));
    } catch (error) {
      console.error('Failed to get audit trail:', error);
      return [];
    }
  }

  /**
   * Get recent activity across all documents
   */
  static async getRecentActivity(limit: number = 10): Promise<any[]> {
    try {
      const recent = await prisma.auditTrail.findMany({
        orderBy: { timestamp: 'desc' },
        take: limit,
      });

      return recent.map((entry) => ({
        documentId: entry.documentId,
        action: entry.action,
        user: entry.userName || entry.userId,
        timestamp: entry.timestamp,
      }));
    } catch (error) {
      console.error('Failed to get recent activity:', error);
      return [];
    }
  }

  /**
   * Generate audit report for a document
   */
  static async generateReport(documentId: string): Promise<string> {
    const trail = await this.getTrail(documentId);

    let report = `# Audit Trail Report\n\n`;
    report += `**Document ID:** ${documentId}\n`;
    report += `**Total Changes:** ${trail.length}\n\n`;

    if (trail.length === 0) {
      report += `No audit entries found.\n`;
      return report;
    }

    report += `## History\n\n`;
    report += `| Date | Action | User | Changes |\n`;
    report += `|------|--------|------|----------|\n`;

    for (const entry of trail) {
      const date = new Date(entry.timestamp).toLocaleString();
      const changesStr = JSON.stringify(entry.changes).substring(0, 50);
      report += `| ${date} | ${entry.action} | ${entry.user} | ${changesStr}... |\n`;
    }

    return report;
  }
}
