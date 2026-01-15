/**
 * Audit Agent
 * Tracks document versions, changes, and audit trails
 */

import { BaseAgent, AgentConfig, AgentResult } from './types';
import { prisma } from '../database/client';

export class AuditAgent extends BaseAgent {
  constructor() {
    super({
      name: 'AuditAgent',
      description: 'Tracks document versions and audit trails',
      temperature: 0.2,
      maxTokens: 1000,
    });
  }

  async execute(input: any): Promise<AgentResult> {
    try {
      this.log(`Audit action: ${input.action} for document ${input.documentId || 'new'}`);

      let result;

      switch (input.action) {
        case 'log':
          result = await this.logAuditTrail(input);
          break;
        case 'getHistory':
          result = await this.getDocumentHistory(input.documentId);
          break;
        case 'compareVersions':
          result = await this.compareVersions(input.versionA, input.versionB);
          break;
        case 'getChangeSummary':
          result = await this.getChangeSummary(input.documentId);
          break;
        default:
          throw new Error(`Unknown audit action: ${input.action}`);
      }

      return {
        success: true,
        content: result,
        metadata: {
          timestamp: new Date().toISOString(),
          agent: this.config.name,
        },
      };
    } catch (error) {
      this.log(`Error: ${error}`);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private async logAuditTrail(input: any): Promise<any> {
    // Create audit trail entry in database
    const auditEntry = await prisma.auditTrail.create({
      data: {
        documentId: input.documentId,
        action: input.actionType || 'update',
        userId: input.userId || 'system',
        userName: input.userName || 'System',
        changes: JSON.stringify(input.changes || {}),
      },
    });

    return {
      auditId: auditEntry.id,
      message: 'Audit trail recorded successfully',
      timestamp: auditEntry.timestamp,
    };
  }

  private async getDocumentHistory(documentId: string): Promise<any> {
    // Get all audit trail entries for a document
    const history = await prisma.auditTrail.findMany({
      where: { documentId },
      orderBy: { timestamp: 'desc' },
    });

    return {
      documentId,
      totalChanges: history.length,
      history: history.map((entry) => ({
        id: entry.id,
        action: entry.action,
        user: entry.userName || entry.userId,
        timestamp: entry.timestamp,
        changes: JSON.parse(entry.changes),
      })),
    };
  }

  private async compareVersions(versionA: string, versionB: string): Promise<any> {
    // Compare two document versions
    // This is a placeholder - actual implementation would compare content
    return {
      versionA,
      versionB,
      differences: [
        {
          type: 'addition',
          section: 'Section 4.2',
          content: 'Added new quality checkpoint',
        },
        {
          type: 'modification',
          section: 'Section 2.1',
          before: 'Old text',
          after: 'New text',
        },
        {
          type: 'deletion',
          section: 'Section 5.3',
          content: 'Removed outdated reference',
        },
      ],
      summary: 'Document updated with 3 changes across multiple sections',
    };
  }

  private async getChangeSummary(documentId: string): Promise<any> {
    // Get summary of changes over time
    const history = await prisma.auditTrail.findMany({
      where: { documentId },
      orderBy: { timestamp: 'desc' },
      take: 10,
    });

    const actionCounts = history.reduce((acc: any, entry) => {
      acc[entry.action] = (acc[entry.action] || 0) + 1;
      return acc;
    }, {});

    const uniqueUsers = new Set(history.map((h) => h.userId));

    return {
      documentId,
      totalChanges: history.length,
      actionSummary: actionCounts,
      contributorCount: uniqueUsers.size,
      lastModified: history[0]?.timestamp,
      lastModifiedBy: history[0]?.userName || history[0]?.userId,
      recentChanges: history.slice(0, 5).map((h) => ({
        action: h.action,
        user: h.userName || h.userId,
        timestamp: h.timestamp,
      })),
    };
  }

  // Helper method to create audit entry when document is created/updated
  public async createAuditEntry(
    documentId: string,
    action: 'create' | 'update' | 'approve' | 'archive',
    userId: string,
    userName: string,
    changes: any
  ): Promise<void> {
    await prisma.auditTrail.create({
      data: {
        documentId,
        action,
        userId,
        userName,
        changes: JSON.stringify(changes),
      },
    });
  }

  // Helper method to get audit trail for a document
  public async getAuditTrail(documentId: string): Promise<any[]> {
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
  }
}
