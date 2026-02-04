/**
 * Version Control Utilities
 * Fort Homes QMS
 */

import { prisma } from '../database';

export interface Version {
  major: number;
  minor: number;
  patch: number;
}

/**
 * Parse version string (e.g., "2.1.0")
 */
export function parseVersion(versionStr: string): Version {
  const parts = versionStr.split('.').map(p => parseInt(p, 10));
  return {
    major: parts[0] || 1,
    minor: parts[1] || 0,
    patch: parts[2] || 0,
  };
}

/**
 * Format version object to string
 */
export function formatVersion(version: Version): string {
  return `${version.major}.${version.minor}.${version.patch}`;
}

/**
 * Increment version
 */
export function incrementVersion(
  currentVersion: string,
  type: 'major' | 'minor' | 'patch'
): string {
  const version = parseVersion(currentVersion);

  switch (type) {
    case 'major':
      version.major += 1;
      version.minor = 0;
      version.patch = 0;
      break;
    case 'minor':
      version.minor += 1;
      version.patch = 0;
      break;
    case 'patch':
      version.patch += 1;
      break;
  }

  return formatVersion(version);
}

/**
 * Compare versions
 */
export function compareVersions(v1: string, v2: string): number {
  const ver1 = parseVersion(v1);
  const ver2 = parseVersion(v2);

  if (ver1.major !== ver2.major) return ver1.major - ver2.major;
  if (ver1.minor !== ver2.minor) return ver1.minor - ver2.minor;
  return ver1.patch - ver2.patch;
}

/**
 * Get document version history
 */
export async function getVersionHistory(documentId: string): Promise<any[]> {
  const auditTrail = await prisma.auditTrail.findMany({
    where: { documentId },
    orderBy: { timestamp: 'desc' },
  });

  return auditTrail.map(entry => ({
    version: JSON.parse(entry.changes).version || 'unknown',
    timestamp: entry.timestamp,
    author: entry.username || entry.userId,
    action: entry.action,
    comment: entry.comment,
  }));
}

/**
 * Create new document version
 */
export async function createNewVersion(
  documentNumber: string,
  versionType: 'major' | 'minor' | 'patch',
  userId: string = 'system',
  username: string = 'System',
  comment?: string
): Promise<string> {
  const document = await prisma.document.findUnique({
    where: { number: documentNumber },
  });

  if (!document) {
    throw new Error(`Document ${documentNumber} not found`);
  }

  const newVersion = incrementVersion(document.version, versionType);

  await prisma.document.update({
    where: { number: documentNumber },
    data: { version: newVersion },
  });

  await prisma.auditTrail.create({
    data: {
      documentId: document.id,
      action: 'version_updated',
      userId,
      username,
      changes: JSON.stringify({
        oldVersion: document.version,
        newVersion,
        type: versionType,
      }),
      comment: comment || `Version incremented to ${newVersion}`,
    },
  });

  return newVersion;
}
