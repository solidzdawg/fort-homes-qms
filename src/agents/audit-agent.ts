/**
 * Audit Agent
 * Fort Homes QMS - Tracks document versions and maintains audit trail
 */

import { BaseAgent, AgentConfig } from './base-agent';
import { prisma } from '../database';

export interface AuditEntry {
  id: string;
  documentId: string;
  action: string;
  userId: string;
  username: string;
  timestamp: Date;
  changes: any;
  comment?: string;
}

export class AuditAgent extends BaseAgent {
  constructor() {
    super({
      name: 'AuditAgent',
      description: 'Tracks document versions and maintains comprehensive audit trail',
      temperature: 0.2,
      maxTokens: 1000,
    });
  }

  /**
   * Execute audit trail creation
   */
  async execute(
    documentId: string,
    action: string,
    changes: any,
    userId: string = 'system',
    username: string = 'System'
  ): Promise<AuditEntry> {
    console.log(`Creating audit trail for document ${documentId}`);

    const entry = await prisma.auditTrail.create({
      data: {
        documentId,
        action,
        userId,
        username,
        changes: JSON.stringify(changes),
        comment: `Action performed by ${this.config.name}`,
      },
    });

    console.log(`✓ Audit trail entry created: ${entry.id}`);

    return {
      id: entry.id,
      documentId: entry.documentId,
      action: entry.action,
      userId: entry.userId,
      username: entry.username || userId,
      timestamp: entry.timestamp,
      changes: JSON.parse(entry.changes),
      comment: entry.comment || undefined,
    };
  }

  /**
   * Get audit trail for a document
   */
  async getAuditTrail(documentId: string): Promise<AuditEntry[]> {
    const entries = await prisma.auditTrail.findMany({
      where: { documentId },
      orderBy: { timestamp: 'desc' },
    });

    return entries.map(entry => ({
      id: entry.id,
      documentId: entry.documentId,
      action: entry.action,
      userId: entry.userId,
      username: entry.username || entry.userId,
      timestamp: entry.timestamp,
      changes: JSON.parse(entry.changes),
      comment: entry.comment || undefined,
    }));
  }

  /**
   * Get recent audit entries
   */
  async getRecentEntries(limit: number = 50): Promise<AuditEntry[]> {
    const entries = await prisma.auditTrail.findMany({
      orderBy: { timestamp: 'desc' },
      take: limit,
    });

    return entries.map(entry => ({
      id: entry.id,
      documentId: entry.documentId,
      action: entry.action,
      userId: entry.userId,
      username: entry.username || entry.userId,
      timestamp: entry.timestamp,
      changes: JSON.parse(entry.changes),
      comment: entry.comment || undefined,
    }));
  }

  /**
   * Generate audit report
   */
  async generateReport(documentId?: string): Promise<string> {
    let entries: AuditEntry[];
    
    if (documentId) {
      entries = await this.getAuditTrail(documentId);
    } else {
      entries = await this.getRecentEntries(100);
    }

    let report = `# Audit Trail Report\n\n`;
    report += `Generated: ${new Date().toISOString()}\n`;
    report += `Total Entries: ${entries.length}\n\n`;

    if (documentId) {
      report += `## Document: ${documentId}\n\n`;
    } else {
      report += `## Recent Activity (Last 100 entries)\n\n`;
    }

    report += `| Timestamp | Document | Action | User | Changes |\n`;
    report += `|:----------|:---------|:-------|:-----|:--------|\n`;

    entries.forEach(entry => {
      const timestamp = entry.timestamp.toISOString().split('T')[0];
      const changesSummary = typeof entry.changes === 'string' 
        ? entry.changes.substring(0, 50) 
        : JSON.stringify(entry.changes).substring(0, 50);
      
      report += `| ${timestamp} | ${entry.documentId} | ${entry.action} | ${entry.username} | ${changesSummary}... |\n`;
    });

    return report;
  }
}

export default AuditAgent;
