/**
 * Compliance Checker Utilities
 * Fort Homes QMS
 */

import { ComplianceAgent, ComplianceResult } from '../agents/compliance-agent';

/**
 * Check if document meets compliance requirements
 */
export async function checkCompliance(
  content: string,
  documentType: string
): Promise<ComplianceResult> {
  const agent = new ComplianceAgent();
  return await agent.execute(content, documentType);
}

/**
 * Validate Colorado DOH requirements
 */
export function validateColoradoDOH(content: string): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Check for required regulation reference
  if (!content.match(/8\s*CCR\s*1302-14/i)) {
    issues.push('Missing Colorado regulation reference (8 CCR 1302-14)');
  }

  // Check for C.R.S. statute reference
  if (!content.match(/C\.R\.S\.\s*§?\s*24-32-3301/i)) {
    issues.push('Missing Colorado Revised Statutes reference (C.R.S. §24-32-3301)');
  }

  // Check for proper modular distinction
  if (content.match(/manufactured\s+housing|HUD\s+Code/i) && 
      !content.match(/not.*manufactured|modular.*not.*HUD/i)) {
    issues.push('Should clarify distinction between modular and manufactured housing');
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Validate NTA TPIA requirements for hold points
 */
export function validateTPIARequirements(
  content: string,
  holdPoint: string
): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // HP-4 and HP-8 require TPIA
  if (holdPoint === 'HP-4' || holdPoint === 'HP-8') {
    if (!content.match(/NTA|Third-Party\s+Inspect/i)) {
      issues.push(`${holdPoint} requires NTA Third-Party Inspection Agency reference`);
    }

    if (!content.match(/ICC\s+NTA/i)) {
      issues.push(`${holdPoint} should reference ICC NTA, LLC as TPIA`);
    }

    // Check for proper inspection workflow
    if (!content.match(/approval.*before.*proceed|cannot.*proceed.*without.*approval/i)) {
      issues.push(`${holdPoint} should explicitly state production cannot proceed without TPIA approval`);
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Check for prohibited references
 */
export function checkProhibitedReferences(content: string): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // No ISO 9001 references (company not ISO certified)
  if (content.match(/ISO\s*9001/i)) {
    issues.push('PROHIBITED: Fort Homes is not ISO 9001 certified - remove all ISO 9001 references');
  }

  // Check for generic terms vs specific standards
  const isoMatches = content.match(/ISO\s*\d{4,}/gi);
  if (isoMatches && isoMatches.length > 0) {
    const allowedISO = ['ISO 10002']; // Customer satisfaction
    const normalizedMatches = isoMatches.map(iso => iso.replace(/\s+/g, ' ').toUpperCase());
    const normalizedAllowed = allowedISO.map(iso => iso.replace(/\s+/g, ' ').toUpperCase());
    const foundISO = isoMatches.filter((iso, idx) => !normalizedAllowed.includes(normalizedMatches[idx]));
    
    if (foundISO.length > 0) {
      issues.push(`Review ISO references: ${foundISO.join(', ')} - ensure they are appropriate`);
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Validate document structure
 */
export function validateDocumentStructure(content: string): {
  valid: boolean;
  issues: string[];
  score: number;
} {
  const issues: string[] = [];
  let score = 100;

  // Check for YAML frontmatter
  if (!content.match(/^---\s*$/m)) {
    issues.push('Missing YAML frontmatter');
    score -= 10;
  }

  // Check for document ID
  if (!content.match(/document_id:\s*["']?[A-Z]+-\d+/i)) {
    issues.push('Missing or invalid document ID');
    score -= 10;
  }

  // Check for revision/version
  if (!content.match(/revision:|version:/i)) {
    issues.push('Missing revision/version information');
    score -= 5;
  }

  // Check for effective date
  if (!content.match(/effective_date:/i)) {
    issues.push('Missing effective date');
    score -= 5;
  }

  // Check for process owner
  if (!content.match(/process_owner:/i)) {
    issues.push('Missing process owner');
    score -= 5;
  }

  // Check for proper headers
  const h1Count = (content.match(/^# /gm) || []).length;
  const h2Count = (content.match(/^## /gm) || []).length;

  if (h1Count === 0) {
    issues.push('Missing H1 header');
    score -= 10;
  }

  if (h2Count < 2) {
    issues.push('Insufficient section headers (need at least 2 H2 headers)');
    score -= 5;
  }

  score = Math.max(0, score);

  return {
    valid: issues.length === 0,
    issues,
    score,
  };
}

/**
 * Generate compliance report
 */
export function generateComplianceReport(results: {
  coloradoDOH: ReturnType<typeof validateColoradoDOH>;
  tpia?: ReturnType<typeof validateTPIARequirements>;
  prohibited: ReturnType<typeof checkProhibitedReferences>;
  structure: ReturnType<typeof validateDocumentStructure>;
}): string {
  let report = '# Compliance Check Report\n\n';
  
  report += `## Overall Assessment\n\n`;
  
  const allValid = 
    results.coloradoDOH.valid &&
    (results.tpia?.valid !== false) &&
    results.prohibited.valid &&
    results.structure.valid;

  report += `**Status:** ${allValid ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}\n`;
  report += `**Structure Score:** ${results.structure.score}/100\n\n`;

  // Colorado DOH
  report += `## Colorado DOH Requirements\n`;
  report += `**Status:** ${results.coloradoDOH.valid ? '✅ Pass' : '❌ Fail'}\n\n`;
  if (results.coloradoDOH.issues.length > 0) {
    report += `**Issues:**\n`;
    results.coloradoDOH.issues.forEach(issue => {
      report += `- ${issue}\n`;
    });
    report += `\n`;
  }

  // TPIA
  if (results.tpia) {
    report += `## TPIA Requirements\n`;
    report += `**Status:** ${results.tpia.valid ? '✅ Pass' : '❌ Fail'}\n\n`;
    if (results.tpia.issues.length > 0) {
      report += `**Issues:**\n`;
      results.tpia.issues.forEach(issue => {
        report += `- ${issue}\n`;
      });
      report += `\n`;
    }
  }

  // Prohibited References
  report += `## Prohibited References\n`;
  report += `**Status:** ${results.prohibited.valid ? '✅ Pass' : '❌ Fail'}\n\n`;
  if (results.prohibited.issues.length > 0) {
    report += `**Issues:**\n`;
    results.prohibited.issues.forEach(issue => {
      report += `- ${issue}\n`;
    });
    report += `\n`;
  }

  // Document Structure
  report += `## Document Structure\n`;
  report += `**Score:** ${results.structure.score}/100\n`;
  report += `**Status:** ${results.structure.valid ? '✅ Pass' : '⚠️ Issues Found'}\n\n`;
  if (results.structure.issues.length > 0) {
    report += `**Issues:**\n`;
    results.structure.issues.forEach(issue => {
      report += `- ${issue}\n`;
    });
  }

  return report;
}
