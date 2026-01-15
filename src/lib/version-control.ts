/**
 * Version Control Utility
 * Manages document versions and revision history
 */

export interface Version {
  major: number;
  minor: number;
  patch: number;
}

export class VersionControl {
  /**
   * Parse version string (e.g., "1.2.3")
   */
  static parse(versionString: string): Version {
    const parts = versionString.split('.').map(Number);
    return {
      major: parts[0] || 0,
      minor: parts[1] || 0,
      patch: parts[2] || 0,
    };
  }

  /**
   * Convert version to string
   */
  static toString(version: Version): string {
    return `${version.major}.${version.minor}.${version.patch}`;
  }

  /**
   * Increment major version (breaking changes)
   */
  static incrementMajor(version: Version): Version {
    return {
      major: version.major + 1,
      minor: 0,
      patch: 0,
    };
  }

  /**
   * Increment minor version (new features)
   */
  static incrementMinor(version: Version): Version {
    return {
      major: version.major,
      minor: version.minor + 1,
      patch: 0,
    };
  }

  /**
   * Increment patch version (bug fixes)
   */
  static incrementPatch(version: Version): Version {
    return {
      major: version.major,
      minor: version.minor,
      patch: version.patch + 1,
    };
  }

  /**
   * Compare two versions
   * Returns: -1 if a < b, 0 if a === b, 1 if a > b
   */
  static compare(a: Version, b: Version): number {
    if (a.major !== b.major) return a.major - b.major;
    if (a.minor !== b.minor) return a.minor - b.minor;
    return a.patch - b.patch;
  }

  /**
   * Check if version is newer
   */
  static isNewer(current: Version, compare: Version): boolean {
    return this.compare(current, compare) > 0;
  }
}

export interface RevisionEntry {
  version: string;
  date: string;
  changes: string;
  approvedBy: string;
}

export class RevisionHistory {
  private revisions: RevisionEntry[] = [];

  /**
   * Add a new revision
   */
  addRevision(entry: RevisionEntry): void {
    this.revisions.push(entry);
  }

  /**
   * Get all revisions sorted by version
   */
  getAllRevisions(): RevisionEntry[] {
    return this.revisions.sort((a, b) => {
      const versionA = VersionControl.parse(a.version);
      const versionB = VersionControl.parse(b.version);
      return VersionControl.compare(versionB, versionA); // Newest first
    });
  }

  /**
   * Get latest revision
   */
  getLatest(): RevisionEntry | undefined {
    return this.getAllRevisions()[0];
  }

  /**
   * Get revision by version
   */
  getByVersion(version: string): RevisionEntry | undefined {
    return this.revisions.find((r) => r.version === version);
  }

  /**
   * Generate revision history table markdown
   */
  toMarkdownTable(): string {
    const sorted = this.getAllRevisions();
    let table = '| Version | Date | Changes | Approved By |\n';
    table += '|---------|------|---------|-------------|\n';

    for (const rev of sorted) {
      table += `| ${rev.version} | ${rev.date} | ${rev.changes} | ${rev.approvedBy} |\n`;
    }

    return table;
  }
}
