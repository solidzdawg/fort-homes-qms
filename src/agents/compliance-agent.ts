/**
 * Compliance Agent
 * Validates documents against Colorado DHO and HUD regulations
 */

import { BaseAgent, AgentConfig, AgentResult } from './types';

export class ComplianceAgent extends BaseAgent {
  private regulations = {
    CDOH: ['8 CCR 1302-14', 'C.R.S. §24-32-3301'],
    HUD: ['24 CFR Part 3280'],
    IRC: ['IRC 2021 Chapters 1-10'],
    NEC: ['NEC 2023'],
    IPC: ['IPC 2021'],
    IECC: ['IECC 2021'],
  };

  constructor() {
    super({
      name: 'ComplianceAgent',
      description: 'Validates documents against Colorado and federal regulations',
      temperature: 0.3,
      maxTokens: 1500,
    });
  }

  async execute(input: any): Promise<AgentResult> {
    try {
      this.log(`Checking compliance for: ${input.documentType}`);

      const complianceReport = await this.checkCompliance(input);

      return {
        success: true,
        content: complianceReport,
        metadata: {
          checkedAt: new Date().toISOString(),
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

  private async checkCompliance(input: any): Promise<any> {
    const checks = [];

    // Check for ISO 9001 references (should NOT be present)
    const hasISO9001 = this.checkForISO9001References(input.content);
    checks.push({
      check: 'No ISO 9001 References',
      passed: !hasISO9001,
      severity: hasISO9001 ? 'critical' : 'pass',
      message: hasISO9001
        ? 'Document contains ISO 9001 references - these must be removed'
        : 'Document correctly avoids ISO 9001 references',
    });

    // Check for Colorado CDOH requirements
    const hasCDOH = this.checkForCDOHCompliance(input.content);
    checks.push({
      check: 'Colorado Division of Housing Compliance',
      passed: hasCDOH,
      severity: hasCDOH ? 'pass' : 'warning',
      message: hasCDOH
        ? 'Document references Colorado CDOH requirements appropriately'
        : 'Consider adding Colorado CDOH compliance references',
    });

    // Check for NTA inspection references
    const hasNTA = this.checkForNTAReferences(input.content);
    checks.push({
      check: 'NTA Third-Party Inspection References',
      passed: hasNTA,
      severity: hasNTA ? 'pass' : 'info',
      message: hasNTA
        ? 'Document includes NTA inspection requirements'
        : 'If applicable, consider adding NTA inspection requirements',
    });

    // Check for HUD Code references (if manufacturing-related)
    if (this.isManufacturingDocument(input.documentType)) {
      const hasHUD = this.checkForHUDReferences(input.content);
      checks.push({
        check: 'HUD Code References',
        passed: hasHUD,
        severity: hasHUD ? 'pass' : 'warning',
        message: hasHUD
          ? 'Document includes HUD Code requirements'
          : 'Manufacturing documents should reference HUD Code (24 CFR 3280)',
      });
    }

    // Check for building code references
    const hasBuildingCodes = this.checkForBuildingCodeReferences(input.content);
    checks.push({
      check: 'Building Code References',
      passed: hasBuildingCodes,
      severity: hasBuildingCodes ? 'pass' : 'info',
      message: hasBuildingCodes
        ? 'Document includes appropriate building code references'
        : 'Consider adding specific building code references (IRC, NEC, IPC, IECC)',
    });

    // Overall compliance status
    const critical = checks.filter((c) => c.severity === 'critical').length;
    const warnings = checks.filter((c) => c.severity === 'warning').length;
    const passed = checks.filter((c) => c.passed).length;

    return {
      documentType: input.documentType,
      overallStatus: critical > 0 ? 'FAIL' : warnings > 0 ? 'WARNING' : 'PASS',
      summary: {
        totalChecks: checks.length,
        passed,
        warnings,
        critical,
      },
      checks,
      recommendations: this.generateRecommendations(checks),
    };
  }

  private checkForISO9001References(content: string): boolean {
    const iso9001Patterns = [
      /ISO\s*9001/i,
      /ISO-9001/i,
      /ISO9001/i,
      /clause\s+\d+\.\d+/i, // ISO clause references like "clause 7.5"
    ];

    return iso9001Patterns.some((pattern) => pattern.test(content));
  }

  private checkForCDOHCompliance(content: string): boolean {
    const cdohPatterns = [
      /Colorado\s+Division\s+of\s+Housing/i,
      /CDOH/i,
      /8\s*CCR\s*1302-14/i,
      /C\.R\.S\.\s*§?\s*24-32-3301/i,
    ];

    return cdohPatterns.some((pattern) => pattern.test(content));
  }

  private checkForNTAReferences(content: string): boolean {
    const ntaPatterns = [
      /NTA/i,
      /National\s+Technical\s+Systems/i,
      /third[- ]party\s+inspect/i,
      /TPIA/i,
      /Inspection\s+Agency/i,
    ];

    return ntaPatterns.some((pattern) => pattern.test(content));
  }

  private checkForHUDReferences(content: string): boolean {
    const hudPatterns = [
      /HUD\s+Code/i,
      /24\s*CFR\s*(?:Part\s*)?3280/i,
      /Manufactured\s+Housing\s+Construction/i,
    ];

    return hudPatterns.some((pattern) => pattern.test(content));
  }

  private checkForBuildingCodeReferences(content: string): boolean {
    const codePatterns = [
      /IRC\s*202[0-9]/i,
      /International\s+Residential\s+Code/i,
      /NEC\s*202[0-9]/i,
      /National\s+Electrical\s+Code/i,
      /IPC\s*202[0-9]/i,
      /International\s+Plumbing\s+Code/i,
      /IECC\s*202[0-9]/i,
      /International\s+Energy\s+Conservation\s+Code/i,
    ];

    return codePatterns.some((pattern) => pattern.test(content));
  }

  private isManufacturingDocument(docType: string): boolean {
    const manufacturingTypes = ['sop', 'wi', 'manual', 'procedure'];
    return manufacturingTypes.some((type) => docType.toLowerCase().includes(type));
  }

  private generateRecommendations(checks: any[]): string[] {
    const recommendations = [];

    const failedChecks = checks.filter((c) => !c.passed && c.severity !== 'info');

    for (const check of failedChecks) {
      if (check.check === 'No ISO 9001 References') {
        recommendations.push(
          'Remove all ISO 9001 references and replace with generic quality management terminology'
        );
      } else if (check.check === 'Colorado Division of Housing Compliance') {
        recommendations.push(
          'Add references to Colorado CDOH requirements (8 CCR 1302-14, C.R.S. §24-32-3301)'
        );
      } else if (check.check === 'HUD Code References') {
        recommendations.push(
          'Include HUD Code requirements (24 CFR Part 3280) for manufactured housing'
        );
      }
    }

    if (recommendations.length === 0) {
      recommendations.push('Document meets all critical compliance requirements');
    }

    return recommendations;
  }
}
