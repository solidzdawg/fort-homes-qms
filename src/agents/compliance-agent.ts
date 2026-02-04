/**
 * Compliance Agent
 * Fort Homes QMS - Validates documents against regulations
 */

import { BaseAgent, AgentConfig } from './base-agent';

export interface ComplianceResult {
  isCompliant: boolean;
  score: number;
  issues: ComplianceIssue[];
  recommendations: string[];
}

export interface ComplianceIssue {
  severity: 'critical' | 'major' | 'minor';
  category: string;
  description: string;
  location?: string;
}

export class ComplianceAgent extends BaseAgent {
  constructor() {
    super({
      name: 'ComplianceAgent',
      description: 'Validates documents against Colorado DOH regulations and industry standards',
      temperature: 0.3,
      maxTokens: 3000,
    });
  }

  /**
   * Execute compliance check
   */
  async execute(documentContent: string, documentType: string): Promise<ComplianceResult> {
    console.log(`Running compliance check for ${documentType}...`);

    const issues: ComplianceIssue[] = [];
    const recommendations: string[] = [];

    // Check for ISO 9001 references (should not be present)
    if (documentContent.match(/ISO\s*9001/i)) {
      issues.push({
        severity: 'critical',
        category: 'Incorrect Standard',
        description: 'Document contains ISO 9001 references. Fort Homes is NOT ISO certified.',
        location: 'Multiple locations',
      });
    }

    // Check for required Colorado references
    if (!documentContent.match(/8\s*CCR\s*1302-14/)) {
      issues.push({
        severity: 'major',
        category: 'Missing Regulation',
        description: 'Missing reference to Colorado regulation 8 CCR 1302-14',
      });
    }

    // Check for NTA/TPIA references in hold point documents
    if (documentType.includes('HP-4') || documentType.includes('HP-8')) {
      if (!documentContent.match(/NTA|Third-Party\s+Inspect/i)) {
        issues.push({
          severity: 'critical',
          category: 'Missing TPIA Requirement',
          description: 'Hold Point HP-4 or HP-8 must include NTA Third-Party Inspection requirements',
        });
      }
    }

    // Check for HUD Code references (should be minimal/none for modular)
    if (documentContent.match(/HUD\s+Code/i) && !documentContent.match(/not.*HUD|modular.*not.*manufactured/i)) {
      recommendations.push(
        'Clarify distinction between modular construction (IRC) and manufactured housing (HUD Code)'
      );
    }

    // Check for proper hold point sequence
    const holdPointMatches = documentContent.match(/HP-(\d+)/g);
    if (holdPointMatches) {
      const holdPoints = holdPointMatches.map(hp => parseInt(hp.replace('HP-', '')));
      const invalidHPs = holdPoints.filter(hp => hp < 1 || hp > 8);
      if (invalidHPs.length > 0) {
        issues.push({
          severity: 'major',
          category: 'Invalid Hold Point',
          description: `Invalid hold point numbers: ${invalidHPs.join(', ')}. Must be HP-1 through HP-8.`,
        });
      }
    }

    // Check for proper document structure
    if (!documentContent.match(/^---\s*$/m)) {
      recommendations.push('Add YAML frontmatter for document metadata');
    }

    // Check for revision history
    if (!documentContent.match(/revision|version/i)) {
      issues.push({
        severity: 'minor',
        category: 'Missing Revision Info',
        description: 'Document should include revision/version information',
      });
    }

    // Calculate compliance score
    const criticalIssues = issues.filter(i => i.severity === 'critical').length;
    const majorIssues = issues.filter(i => i.severity === 'major').length;
    const minorIssues = issues.filter(i => i.severity === 'minor').length;

    let score = 100;
    score -= criticalIssues * 25; // Critical issues: -25 points each
    score -= majorIssues * 10;    // Major issues: -10 points each
    score -= minorIssues * 2;     // Minor issues: -2 points each

    score = Math.max(0, Math.min(100, score));

    const isCompliant = score >= 95 && criticalIssues === 0;

    console.log(`✓ Compliance check complete: Score ${score}/100, ${issues.length} issues found`);

    return {
      isCompliant,
      score,
      issues,
      recommendations,
    };
  }

  /**
   * Generate compliance report
   */
  generateReport(result: ComplianceResult): string {
    let report = `# Compliance Report\n\n`;
    report += `**Overall Score:** ${result.score}/100\n`;
    report += `**Status:** ${result.isCompliant ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}\n\n`;

    if (result.issues.length > 0) {
      report += `## Issues Found (${result.issues.length})\n\n`;
      
      const critical = result.issues.filter(i => i.severity === 'critical');
      const major = result.issues.filter(i => i.severity === 'major');
      const minor = result.issues.filter(i => i.severity === 'minor');

      if (critical.length > 0) {
        report += `### 🔴 Critical Issues\n`;
        critical.forEach(issue => {
          report += `- **${issue.category}**: ${issue.description}\n`;
        });
        report += `\n`;
      }

      if (major.length > 0) {
        report += `### 🟠 Major Issues\n`;
        major.forEach(issue => {
          report += `- **${issue.category}**: ${issue.description}\n`;
        });
        report += `\n`;
      }

      if (minor.length > 0) {
        report += `### 🟡 Minor Issues\n`;
        minor.forEach(issue => {
          report += `- **${issue.category}**: ${issue.description}\n`;
        });
        report += `\n`;
      }
    }

    if (result.recommendations.length > 0) {
      report += `## Recommendations\n\n`;
      result.recommendations.forEach(rec => {
        report += `- ${rec}\n`;
      });
    }

    return report;
  }
}

export default ComplianceAgent;
