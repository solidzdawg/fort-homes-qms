/**
 * Compliance Checker Utility
 * Validates documents against regulatory requirements
 */

export interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  regulation: string;
  checkFunction: (content: string) => boolean;
  severity: 'critical' | 'warning' | 'info';
}

export interface ComplianceResult {
  ruleId: string;
  ruleName: string;
  passed: boolean;
  severity: string;
  message: string;
}

export class ComplianceChecker {
  private rules: ComplianceRule[] = [];

  constructor() {
    this.initializeRules();
  }

  private initializeRules(): void {
    // Rule: No ISO 9001 references
    this.addRule({
      id: 'no-iso-9001',
      name: 'No ISO 9001 References',
      description: 'Document must not contain ISO 9001 references',
      regulation: 'Internal Policy',
      severity: 'critical',
      checkFunction: (content: string) => {
        const isoPatterns = [/ISO\s*9001/i, /ISO-9001/i, /clause\s+\d+\.\d+/i];
        return !isoPatterns.some((pattern) => pattern.test(content));
      },
    });

    // Rule: Colorado CDOH reference required
    this.addRule({
      id: 'cdoh-reference',
      name: 'Colorado CDOH Reference',
      description: 'Manufacturing documents should reference Colorado Division of Housing',
      regulation: '8 CCR 1302-14',
      severity: 'warning',
      checkFunction: (content: string) => {
        return /Colorado\s+Division\s+of\s+Housing|CDOH|8\s*CCR\s*1302-14/i.test(content);
      },
    });

    // Rule: HUD Code reference for manufacturing
    this.addRule({
      id: 'hud-code',
      name: 'HUD Code Reference',
      description: 'Manufacturing documents should reference HUD standards',
      regulation: '24 CFR Part 3280',
      severity: 'warning',
      checkFunction: (content: string) => {
        return /HUD\s+Code|24\s*CFR\s*(?:Part\s*)?3280/i.test(content);
      },
    });

    // Rule: NTA inspection reference
    this.addRule({
      id: 'nta-inspection',
      name: 'NTA Third-Party Inspection',
      description: 'Inspection procedures should reference NTA as third-party inspector',
      regulation: 'Internal Policy',
      severity: 'info',
      checkFunction: (content: string) => {
        return /NTA|National\s+Technical\s+Systems|third[- ]party\s+inspect/i.test(content);
      },
    });

    // Rule: Safety requirements
    this.addRule({
      id: 'safety-requirements',
      name: 'Safety Requirements',
      description: 'Work instructions should include safety requirements',
      regulation: 'OSHA',
      severity: 'warning',
      checkFunction: (content: string) => {
        return /safety|PPE|personal\s+protective\s+equipment|hazard/i.test(content);
      },
    });

    // Rule: Document identification
    this.addRule({
      id: 'document-id',
      name: 'Document Identification',
      description: 'Document must have proper identification (number, version, date)',
      regulation: 'Internal Policy',
      severity: 'critical',
      checkFunction: (content: string) => {
        const hasNumber = /(?:QM|SOP|WI|FORM)-\d+/i.test(content);
        const hasVersion = /version|revision|rev\.?\s*\d+/i.test(content);
        const hasDate = /\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}/i.test(content);
        return hasNumber && hasVersion && hasDate;
      },
    });
  }

  /**
   * Add a custom compliance rule
   */
  addRule(rule: ComplianceRule): void {
    this.rules.push(rule);
  }

  /**
   * Remove a rule by ID
   */
  removeRule(ruleId: string): void {
    this.rules = this.rules.filter((r) => r.id !== ruleId);
  }

  /**
   * Check document compliance against all rules
   */
  check(content: string, documentType?: string): ComplianceResult[] {
    const results: ComplianceResult[] = [];

    for (const rule of this.rules) {
      // Skip certain rules based on document type
      if (this.shouldSkipRule(rule, documentType)) {
        continue;
      }

      const passed = rule.checkFunction(content);

      results.push({
        ruleId: rule.id,
        ruleName: rule.name,
        passed,
        severity: rule.severity,
        message: passed
          ? `✓ ${rule.name}: Compliant`
          : `✗ ${rule.name}: ${rule.description}`,
      });
    }

    return results;
  }

  /**
   * Check if overall compliance is met
   */
  isCompliant(results: ComplianceResult[]): boolean {
    // Document is compliant if no critical rules fail
    return !results.some((r) => !r.passed && r.severity === 'critical');
  }

  /**
   * Get compliance summary
   */
  getSummary(results: ComplianceResult[]): {
    total: number;
    passed: number;
    failed: number;
    critical: number;
    warnings: number;
    info: number;
  } {
    return {
      total: results.length,
      passed: results.filter((r) => r.passed).length,
      failed: results.filter((r) => !r.passed).length,
      critical: results.filter((r) => !r.passed && r.severity === 'critical').length,
      warnings: results.filter((r) => !r.passed && r.severity === 'warning').length,
      info: results.filter((r) => !r.passed && r.severity === 'info').length,
    };
  }

  private shouldSkipRule(rule: ComplianceRule, documentType?: string): boolean {
    // Skip safety rule for non-work-instruction documents
    if (rule.id === 'safety-requirements' && documentType !== 'wi') {
      return true;
    }

    // Skip HUD Code check for non-manufacturing documents
    if (rule.id === 'hud-code' && documentType === 'form') {
      return true;
    }

    return false;
  }

  /**
   * Generate compliance report in markdown
   */
  generateReport(results: ComplianceResult[]): string {
    const summary = this.getSummary(results);
    const isCompliant = this.isCompliant(results);

    let report = '# Compliance Check Report\n\n';
    report += `**Overall Status:** ${isCompliant ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}\n\n`;
    report += `## Summary\n\n`;
    report += `- Total Checks: ${summary.total}\n`;
    report += `- Passed: ${summary.passed}\n`;
    report += `- Failed: ${summary.failed}\n`;
    report += `- Critical Issues: ${summary.critical}\n`;
    report += `- Warnings: ${summary.warnings}\n`;
    report += `- Info: ${summary.info}\n\n`;

    report += `## Detailed Results\n\n`;

    // Group by severity
    const critical = results.filter((r) => !r.passed && r.severity === 'critical');
    const warnings = results.filter((r) => !r.passed && r.severity === 'warning');
    const info = results.filter((r) => !r.passed && r.severity === 'info');
    const passed = results.filter((r) => r.passed);

    if (critical.length > 0) {
      report += `### ❌ Critical Issues\n\n`;
      critical.forEach((r) => {
        report += `- ${r.message}\n`;
      });
      report += `\n`;
    }

    if (warnings.length > 0) {
      report += `### ⚠️ Warnings\n\n`;
      warnings.forEach((r) => {
        report += `- ${r.message}\n`;
      });
      report += `\n`;
    }

    if (info.length > 0) {
      report += `### ℹ️ Informational\n\n`;
      info.forEach((r) => {
        report += `- ${r.message}\n`;
      });
      report += `\n`;
    }

    if (passed.length > 0) {
      report += `### ✅ Passed\n\n`;
      passed.forEach((r) => {
        report += `- ${r.message}\n`;
      });
      report += `\n`;
    }

    return report;
  }
}

export const complianceChecker = new ComplianceChecker();
