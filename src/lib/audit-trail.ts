/**
 * Audit Trail Utilities
 * Fort Homes QMS
 */

import { prisma } from '../database';

/**
 * Create audit trail entry
 */
export async function createAuditEntry(
  documentId: string,
  action: string,
  changes: any,
  userId: string = 'system',
  username?: string,
  comment?: string
): Promise<void> {
  await prisma.auditTrail.create({
    data: {
      documentId,
      action,
      userId,
      username: username || userId,
      changes: JSON.stringify(changes),
      comment,
    },
  });
}

/**
 * Get audit trail for document
 */
export async function getAuditTrail(
  documentId: string,
  limit?: number
): Promise<any[]> {
  const entries = await prisma.auditTrail.findMany({
    where: { documentId },
    orderBy: { timestamp: 'desc' },
    take: limit,
  });

  return entries.map(entry => ({
    id: entry.id,
    action: entry.action,
    user: entry.username || entry.userId,
    timestamp: entry.timestamp,
    changes: JSON.parse(entry.changes),
    comment: entry.comment,
  }));
}

/**
 * Get recent activity across all documents
 */
export async function getRecentActivity(limit: number = 50): Promise<any[]> {
  const entries = await prisma.auditTrail.findMany({
    orderBy: { timestamp: 'desc' },
    take: limit,
    include: {
      document: {
        select: {
          number: true,
          title: true,
          type: true,
        },
      },
    },
  });

  return entries.map(entry => ({
    id: entry.id,
    action: entry.action,
    user: entry.username || entry.userId,
    timestamp: entry.timestamp,
    document: entry.document,
    changes: JSON.parse(entry.changes),
    comment: entry.comment,
  }));
}

/**
 * Generate audit report
 */
export async function generateAuditReport(
  documentId?: string,
  startDate?: Date,
  endDate?: Date
): Promise<string> {
  let where: any = {};

  if (documentId) {
    where.documentId = documentId;
  }

  if (startDate || endDate) {
    where.timestamp = {};
    if (startDate) where.timestamp.gte = startDate;
    if (endDate) where.timestamp.lte = endDate;
  }

  const entries = await prisma.auditTrail.findMany({
    where,
    orderBy: { timestamp: 'desc' },
    include: {
      document: {
        select: {
          number: true,
          title: true,
          type: true,
        },
      },
    },
  });

  let report = '# Audit Trail Report\n\n';
  report += `**Generated:** ${new Date().toISOString()}\n`;
  
  if (documentId) {
    const doc = entries[0]?.document;
    if (doc) {
      report += `**Document:** ${doc.number} - ${doc.title}\n`;
    }
  }
  
  if (startDate) {
    report += `**From:** ${startDate.toISOString().split('T')[0]}\n`;
  }
  
  if (endDate) {
    report += `**To:** ${endDate.toISOString().split('T')[0]}\n`;
  }
  
  report += `**Total Entries:** ${entries.length}\n\n`;

  report += '## Activity Log\n\n';
  report += '| Timestamp | Document | Action | User | Changes |\n';
  report += '|:----------|:---------|:-------|:-----|:--------|\n';

  entries.forEach(entry => {
    const timestamp = entry.timestamp.toISOString().split('T')[0];
    const doc = entry.document 
      ? `${entry.document.number}` 
      : entry.documentId.substring(0, 8);
    const user = entry.username || entry.userId;
    const changesSummary = JSON.stringify(entry.changes).substring(0, 30) + '...';

    report += `| ${timestamp} | ${doc} | ${entry.action} | ${user} | ${changesSummary} |\n`;
  });

  return report;
}
