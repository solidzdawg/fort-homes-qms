/**
 * Manual Agent
 * Fort Homes QMS - Generates Quality Manual sections
 */

import { BaseAgent, AgentConfig } from './base-agent';
import { prisma } from '../database';
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
    
    return `---
title: "${title}"
document_id: "${sectionNumber}"
revision: "1.0"
effective_date: "${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}"
process_owner: "QA Manager"
next_review: "${new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}"
classification: "CONTROLLED"
---

<div align="center">

# 🏗️ ${company.legal_name || 'FORT HOMES LLC'}
## Quality Management System

---

### ${title.toUpperCase()}

| Attribute | Value |
|:----------|:------|
| **Document ID** | \`${sectionNumber}\` |
| **Revision** | \`1.0\` |
| **Effective Date** | ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} |
| **Process Owner** | QA Manager |
| **Classification** | CONTROLLED |

---

</div>

## 📋 Purpose

This section of the Quality Manual addresses ${title.toLowerCase()} for ${company.legal_name || 'Fort Homes LLC'}.

## 🎯 Scope

This applies to all quality management system activities related to ${title.toLowerCase()}.

## 📌 Key Requirements

### ${sectionNumber}.1 Overview

[Content to be developed based on specific section requirements]

### ${sectionNumber}.2 Responsibilities

[Define roles and responsibilities]

### ${sectionNumber}.3 Procedures

[Reference applicable SOPs and Work Instructions]

## 📊 Related Documents

- Refer to applicable Standard Operating Procedures (SOPs)
- See Work Instructions (WIs) for detailed procedures
- Complete required Forms as specified

## 📝 Records

Records maintained in accordance with Document Control procedures.

---

**Document Control:**
- Created: ${new Date().toISOString().split('T')[0]}
- Generated by: ManualAgent (AI)
- Status: Draft
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
