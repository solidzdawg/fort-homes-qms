/**
 * Manual Agent
 * Fort Homes QMS - Generates Quality Manual sections
 */

import { BaseAgent, AgentConfig } from './base-agent';
import { prisma } from '../database';
import { ProfessionalFormatter } from '../lib/professional-formatter';
import fs from 'fs';
import path from 'path';

export interface ManualSection {
  number: string;
  title: string;
  content: string;
}

export class ManualAgent extends BaseAgent {
  constructor() {
    super({
      name: 'ManualAgent',
      description: 'Generates Quality Manual sections following QMS framework',
      temperature: 0.7,
      maxTokens: 4000,
    });
  }

  /**
   * Execute manual generation
   */
  async execute(sectionNumber?: string): Promise<ManualSection[]> {
    if (sectionNumber) {
      return [await this.generateSection(sectionNumber)];
    }
    
    // Generate all sections
    return await this.generateAllSections();
  }

  /**
   * Generate all Quality Manual sections
   */
  private async generateAllSections(): Promise<ManualSection[]> {
    const sections: ManualSection[] = [];
    
    // QMS Manual sections follow ISO-like structure
    const sectionNumbers = [
      'QMS-000', // Master Index
      'QMS-001', // Context & Stakeholders
      'QMS-002', // Leadership & Policy
      'QMS-003', // Planning & Risk
      'QMS-004', // Support & Resources
      'QMS-005', // Operations
      'QMS-006', // Performance Evaluation
      'QMS-007', // Improvement
      'QMS-008', // Document & Records
      'QMS-009', // Regulatory Compliance
    ];

    for (const num of sectionNumbers) {
      try {
        const section = await this.generateSection(num);
        sections.push(section);
      } catch (error) {
        console.error(`Error generating section ${num}:`, error);
      }
    }

    return sections;
  }

  /**
   * Generate a specific Quality Manual section
   */
  async generateSection(sectionNumber: string): Promise<ManualSection> {
    console.log(`Generating Quality Manual section: ${sectionNumber}`);

    // Load existing document from docs/manual/ if it exists
    const docPath = path.join(
      process.cwd(),
      'docs',
      'manual',
      `${sectionNumber}-*.md`
    );

    // Use glob to find the actual file
    const glob = require('fast-glob');
    const files = await glob(docPath);

    if (files.length > 0) {
      // Load existing document
      const content = fs.readFileSync(files[0], 'utf-8');
      const title = this.extractTitle(content);
      
      console.log(`✓ Loaded existing section: ${sectionNumber} - ${title}`);
      
      return {
        number: sectionNumber,
        title,
        content,
      };
    }

    // Generate new section from template
    return await this.generateFromTemplate(sectionNumber);
  }

  /**
   * Generate section from template
   */
  private async generateFromTemplate(sectionNumber: string): Promise<ManualSection> {
    const sectionMap: Record<string, string> = {
      'QMS-000': 'Master Index',
      'QMS-001': 'Context & Stakeholders',
      'QMS-002': 'Leadership & Policy',
      'QMS-003': 'Planning & Risk',
      'QMS-004': 'Support & Resources',
      'QMS-005': 'Operations',
      'QMS-006': 'Performance Evaluation',
      'QMS-007': 'Improvement',
      'QMS-008': 'Document & Records',
      'QMS-009': 'Regulatory Compliance',
    };

    const title = sectionMap[sectionNumber] || 'Unknown Section';
    
    // Generate basic structure
    const content = this.generateSectionContent(sectionNumber, title);

    // Store in database
    await this.storeInDatabase(sectionNumber, title, content);

    console.log(`✓ Generated new section: ${sectionNumber} - ${title}`);

    return {
      number: sectionNumber,
      title,
      content,
    };
  }

  /**
   * Generate section content
   */
  private generateSectionContent(sectionNumber: string, title: string): string {
    const company = this.context.companyInfo?.company || {};
    
    const header = ProfessionalFormatter.generateDocumentHeader({
      documentId: sectionNumber,
      title: title,
      revision: '1.0',
      effectiveDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      processOwner: 'QA Manager',
      classification: 'CONTROLLED',
      reviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    });

    const signatureBlock = ProfessionalFormatter.generateSignatureBlock([
      'Prepared By (QA Manager)',
      'Reviewed By (Operations Manager)',
      'Approved By (President)'
    ]);

    const footer = ProfessionalFormatter.generateDocumentFooter({
      documentId: sectionNumber,
      title: title,
      revision: '1.0',
      effectiveDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      processOwner: 'QA Manager',
      classification: 'CONTROLLED'
    });
    
    return `${header}

<!-- Document Content -->

<h2>${ProfessionalFormatter.formatSectionNumber(1)} Purpose</h2>

<p>This section of the Quality Management System Manual establishes the requirements for ${title.toLowerCase()} at ${company.legal_name || 'Fort Homes LLC'}. This document defines the policies, procedures, and responsibilities necessary to ensure consistent quality in modular home manufacturing operations.</p>

<h2>${ProfessionalFormatter.formatSectionNumber(2)} Scope</h2>

<p>This procedure applies to all personnel, processes, and activities related to ${title.toLowerCase()} within Fort Homes LLC manufacturing facility located in Grand Junction, Colorado.</p>

<p><strong>Applicable to:</strong></p>
<ul>
  <li>All manufacturing personnel</li>
  <li>Quality assurance team</li>
  <li>Management and supervision</li>
  <li>Contractors and temporary workers as applicable</li>
</ul>

<h2>${ProfessionalFormatter.formatSectionNumber(3)} Definitions and References</h2>

<h3>${ProfessionalFormatter.formatSectionNumber(3, 1)} Definitions</h3>

${ProfessionalFormatter.generateTable(
  ['Term', 'Definition'],
  [
    ['QMS', 'Quality Management System - The integrated framework of policies, processes, and procedures used to ensure quality'],
    ['SOP', 'Standard Operating Procedure - Documented instructions for routine operations'],
    ['WI', 'Work Instruction - Detailed step-by-step instructions for specific tasks'],
    ['NCR', 'Nonconformance Report - Documentation of quality issues and corrective actions'],
    ['CAPA', 'Corrective and Preventive Action - Systematic approach to resolving quality issues']
  ]
)}

<h3>${ProfessionalFormatter.formatSectionNumber(3, 2)} Referenced Documents</h3>

<ul>
  <li>Colorado Division of Housing Regulations (8 CCR 1302-14)</li>
  <li>International Residential Code (IRC 2021)</li>
  <li>National Electrical Code (NEC 2023)</li>
  <li>International Plumbing Code (IPC 2021)</li>
  <li>Fort Homes LLC Standard Operating Procedures</li>
</ul>

<h2>${ProfessionalFormatter.formatSectionNumber(4)} Requirements and Procedures</h2>

<h3>${ProfessionalFormatter.formatSectionNumber(4, 1)} Overview</h3>

<p>Fort Homes LLC maintains a comprehensive quality management system that ensures all modular homes are manufactured in compliance with applicable codes and regulations. The following key requirements apply:</p>

<div class="no-break">
${ProfessionalFormatter.generateTable(
  ['Requirement Area', 'Description', 'Reference Document'],
  [
    ['Quality Policy', 'Commitment to quality and continuous improvement', 'QMS-002'],
    ['Process Controls', 'Manufacturing process documentation and control', 'QMS-005'],
    ['Inspection Points', 'Hold point inspections and TPIA coordination', 'SOPs 101-108'],
    ['Documentation', 'Records maintenance and traceability', 'QMS-008'],
    ['Training', 'Personnel competency and training requirements', 'QMS-004']
  ]
)}
</div>

<h3>${ProfessionalFormatter.formatSectionNumber(4, 2)} Responsibilities</h3>

${ProfessionalFormatter.generateTable(
  ['Role', 'Responsibilities'],
  [
    ['President/COO', 'Overall accountability for quality management system; Resource allocation; Policy approval'],
    ['QA Manager', 'QMS implementation and maintenance; Internal audits; TPIA coordination; Document control'],
    ['Production Supervisor', 'Daily quality oversight; Work instruction compliance; Team training; Issue escalation'],
    ['Quality Inspectors', 'Hold point inspections; Documentation; Nonconformance identification; Testing verification'],
    ['Production Team', 'Following work instructions; Quality awareness; Reporting issues; Maintaining work areas']
  ]
)}

<h3>${ProfessionalFormatter.formatSectionNumber(4, 3)} Process Requirements</h3>

<p>All activities related to ${title.toLowerCase()} shall be conducted in accordance with documented procedures. Key process requirements include:</p>

<ol>
  <li><strong>Planning:</strong> Activities shall be planned and documented before execution</li>
  <li><strong>Execution:</strong> Work shall follow approved procedures and work instructions</li>
  <li><strong>Verification:</strong> Results shall be inspected and verified against requirements</li>
  <li><strong>Documentation:</strong> Records shall be maintained for traceability</li>
  <li><strong>Improvement:</strong> Lessons learned shall be captured and implemented</li>
</ol>

<h2>${ProfessionalFormatter.formatSectionNumber(5)} Records and Documentation</h2>

<p>The following records shall be maintained to demonstrate compliance with ${title.toLowerCase()} requirements:</p>

${ProfessionalFormatter.generateTable(
  ['Record Type', 'Retention Period', 'Storage Location'],
  [
    ['Quality Manual Sections', 'Superseded + 7 years', 'Document Control'],
    ['Procedure Approvals', 'Life of document + 7 years', 'Document Control'],
    ['Training Records', 'Employment + 5 years', 'HR / QA'],
    ['Audit Reports', '7 years', 'QA Files'],
    ['Management Reviews', '7 years', 'QA Files']
  ]
)}

<h2>${ProfessionalFormatter.formatSectionNumber(6)} Review and Updates</h2>

<p>This document shall be reviewed annually or when:</p>
<ul>
  <li>Regulatory requirements change</li>
  <li>Significant process changes occur</li>
  <li>Audit findings require updates</li>
  <li>Management determines review is necessary</li>
</ul>

<div class="no-break" style="background: #f0f8ff; border-left: 4px solid #2196F3; padding: 15px; margin: 20px 0;">
  <h3 style="margin-top: 0; color: #1976D2;">📋 Quality Commitment</h3>
  <p style="margin-bottom: 0;">
    Fort Homes LLC is committed to manufacturing high-quality modular homes that meet or exceed 
    customer expectations and regulatory requirements. We continuously improve our processes 
    through systematic monitoring, measurement, and corrective action.
  </p>
</div>

${signatureBlock}

${footer}
`;
  }

  /**
   * Extract title from markdown content
   */
  private extractTitle(content: string): string {
    // Look for H3 header after the main header
    const match = content.match(/###\s+([^\n]+)/);
    if (match) {
      return match[1].trim();
    }
    
    // Fallback to frontmatter
    const fmMatch = content.match(/^---\s+title:\s*"([^"]+)"/m);
    if (fmMatch) {
      return fmMatch[1];
    }
    
    return 'Unknown Section';
  }

  /**
   * Store document in database
   */
  private async storeInDatabase(
    number: string,
    title: string,
    content: string
  ): Promise<void> {
    try {
      // Check if document exists
      const existing = await prisma.document.findUnique({
        where: { number },
      });

      if (existing) {
        // Update existing
        await prisma.document.update({
          where: { number },
          data: {
            title,
            content,
            version: '1.0',
            status: 'draft',
            updatedAt: new Date(),
          },
        });

        await this.createAuditTrail(existing.id, 'updated', { title, content });
      } else {
        // Create new
        const doc = await prisma.document.create({
          data: {
            type: 'manual',
            number,
            title,
            content,
            version: '1.0',
            status: 'draft',
          },
        });

        await this.createAuditTrail(doc.id, 'created', { title, content });
      }
    } catch (error) {
      console.error('Error storing document in database:', error);
    }
  }

  /**
   * Generate summary of all manual sections
   */
  async generateSummary(): Promise<string> {
    const sections = await this.generateAllSections();
    let summary = '# Quality Manual Summary\n\n';
    summary += '## Document Overview\n\n';
    summary += `Total Sections: ${sections.length}\n\n`;
    summary += '## Section List\n\n';
    
    for (const section of sections) {
      summary += `- **${section.number}**: ${section.title}\n`;
    }
    
    return summary;
  }

  /**
   * Generate cross-reference table for manual sections
   */
  generateCrossReferenceTable(): string {
    const references = [
      { section: 'QMS-001', relatedSOPs: ['SOP-001', 'SOP-016'], relatedForms: [] },
      { section: 'QMS-002', relatedSOPs: ['SOP-002', 'SOP-003'], relatedForms: [] },
      { section: 'QMS-003', relatedSOPs: ['SOP-006', 'SOP-015'], relatedForms: [] },
      { section: 'QMS-004', relatedSOPs: ['SOP-002', 'SOP-003'], relatedForms: ['FORM-TRN-001'] },
      { section: 'QMS-005', relatedSOPs: ['SOP-101', 'SOP-102', 'SOP-103', 'SOP-104', 'SOP-105', 'SOP-106', 'SOP-107', 'SOP-108'], relatedForms: [] },
      { section: 'QMS-006', relatedSOPs: ['SOP-014', 'SOP-016'], relatedForms: [] },
      { section: 'QMS-007', relatedSOPs: ['SOP-004', 'SOP-005'], relatedForms: ['FORM-NCR-001'] },
      { section: 'QMS-008', relatedSOPs: ['SOP-001'], relatedForms: [] },
      { section: 'QMS-009', relatedSOPs: ['SOP-009', 'SOP-017'], relatedForms: [] },
    ];

    let table = '# Quality Manual Cross-Reference\n\n';
    table += '| Manual Section | Related SOPs | Related Forms |\n';
    table += '|:---------------|:-------------|:--------------|\n';

    for (const ref of references) {
      const sops = ref.relatedSOPs.join(', ') || 'None';
      const forms = ref.relatedForms.join(', ') || 'None';
      table += `| ${ref.section} | ${sops} | ${forms} |\n`;
    }

    return table;
  }

  /**
   * Validate manual section completeness
   */
  async validateSectionCompleteness(sectionNumber: string): Promise<{
    isComplete: boolean;
    missingElements: string[];
  }> {
    const section = await this.generateSection(sectionNumber);
    const missingElements: string[] = [];

    // Check for required elements
    const requiredElements = [
      { name: 'Title', pattern: /^#\s+.+/m },
      { name: 'Document ID', pattern: /Document ID:|document_id:/i },
      { name: 'Effective Date', pattern: /Effective Date:|effective_date:/i },
      { name: 'Process Owner', pattern: /Process Owner:|process_owner:/i },
      { name: 'Purpose', pattern: /##\s+.*Purpose/i },
      { name: 'Scope', pattern: /##\s+.*Scope/i },
    ];

    for (const element of requiredElements) {
      if (!element.pattern.test(section.content)) {
        missingElements.push(element.name);
      }
    }

    return {
      isComplete: missingElements.length === 0,
      missingElements,
    };
  }

  /**
   * Generate table of contents for the manual
   */
  async generateTableOfContents(): Promise<string> {
    const sections = await this.generateAllSections();
    let toc = '# Quality Manual - Table of Contents\n\n';
    
    toc += '## Fort Homes LLC\n';
    toc += '### Quality Management System Manual\n\n';
    toc += '---\n\n';
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      toc += `${i + 1}. [${section.number} - ${section.title}](#${section.number.toLowerCase()})\n`;
    }
    
    toc += '\n---\n\n';
    toc += '*Generated by ManualAgent*\n';
    
    return toc;
  }
}

export default ManualAgent;
