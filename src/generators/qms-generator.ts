/**
 * QMS Document Generator
 * Main generator that orchestrates document creation using AI agents and export to various formats
 */

import { orchestrator } from '../agents/orchestrator';
import { pdfGenerator } from './pdf-generator';
import { docxGenerator } from './docx-generator';
import { prisma } from '../database/client';
import * as path from 'path';
import * as fs from 'fs/promises';

export interface DocumentGenerationOptions {
  format: 'pdf' | 'docx' | 'markdown' | 'all';
  outputDir: string;
  watermark?: string;
}

export class QMSGenerator {
  /**
   * Generate complete Quality Manual
   */
  async generateQualityManual(
    section?: string,
    options: DocumentGenerationOptions = { format: 'all', outputDir: './output/manual' }
  ): Promise<{ files: string[]; document: any }> {
    console.log('[QMSGenerator] Generating Quality Manual...');

    // Generate content using AI agent
    const result = await orchestrator.generateQualityManual(section);

    if (!result.success) {
      throw new Error(`Failed to generate manual: ${result.error}`);
    }

    const manualContent = result.content.manual;
    const files: string[] = [];

    // Ensure output directory exists
    await fs.mkdir(options.outputDir, { recursive: true });

    const docOptions = {
      title: 'Quality Management System Manual',
      documentNumber: 'QM-001',
      version: '1.0',
      effectiveDate: new Date().toISOString().split('T')[0],
      status: 'draft',
      company: 'Fort Homes LLC',
      watermark: options.watermark,
    };

    // Generate markdown
    if (options.format === 'markdown' || options.format === 'all') {
      const mdPath = path.join(options.outputDir, 'QM-001-Quality-Manual.md');
      await fs.writeFile(mdPath, this.convertToMarkdown(manualContent));
      files.push(mdPath);
      console.log(`  ✓ Generated: ${mdPath}`);
    }

    // Generate PDF
    if (options.format === 'pdf' || options.format === 'all') {
      const pdfPath = path.join(options.outputDir, 'QM-001-Quality-Manual.pdf');
      await pdfGenerator.generatePDF(
        this.convertToMarkdown(manualContent),
        pdfPath,
        docOptions
      );
      files.push(pdfPath);
      console.log(`  ✓ Generated: ${pdfPath}`);
    }

    // Generate DOCX
    if (options.format === 'docx' || options.format === 'all') {
      const docxPath = path.join(options.outputDir, 'QM-001-Quality-Manual.docx');
      await docxGenerator.generateDOCX(
        this.convertToMarkdown(manualContent),
        docxPath,
        docOptions
      );
      files.push(docxPath);
      console.log(`  ✓ Generated: ${docxPath}`);
    }

    // Store in database
    await this.storeDocument({
      type: 'manual',
      number: 'QM-001',
      title: 'Quality Management System Manual',
      version: '1.0',
      status: 'draft',
      content: JSON.stringify(manualContent),
    });

    return { files, document: result.content };
  }

  /**
   * Generate SOP for a specific phase
   */
  async generateSOP(
    phase: number,
    options: DocumentGenerationOptions = { format: 'all', outputDir: './output/sops' }
  ): Promise<{ files: string[]; document: any }> {
    console.log(`[QMSGenerator] Generating SOP for Phase ${phase}...`);

    const result = await orchestrator.generateSOP(phase);

    if (!result.success) {
      throw new Error(`Failed to generate SOP: ${result.error}`);
    }

    const sopContent = result.content.sop;
    const files: string[] = [];

    await fs.mkdir(options.outputDir, { recursive: true });

    const docOptions = {
      title: sopContent.title,
      documentNumber: sopContent.documentNumber,
      version: sopContent.version,
      effectiveDate: sopContent.effectiveDate,
      status: sopContent.status,
      company: 'Fort Homes LLC',
      watermark: options.watermark,
    };

    // Generate in requested formats
    if (options.format === 'markdown' || options.format === 'all') {
      const mdPath = path.join(options.outputDir, `${sopContent.documentNumber}.md`);
      await fs.writeFile(mdPath, sopContent.content);
      files.push(mdPath);
      console.log(`  ✓ Generated: ${mdPath}`);
    }

    if (options.format === 'pdf' || options.format === 'all') {
      const pdfPath = path.join(options.outputDir, `${sopContent.documentNumber}.pdf`);
      await pdfGenerator.generatePDF(sopContent.content, pdfPath, docOptions);
      files.push(pdfPath);
      console.log(`  ✓ Generated: ${pdfPath}`);
    }

    if (options.format === 'docx' || options.format === 'all') {
      const docxPath = path.join(options.outputDir, `${sopContent.documentNumber}.docx`);
      await docxGenerator.generateDOCX(sopContent.content, docxPath, docOptions);
      files.push(docxPath);
      console.log(`  ✓ Generated: ${docxPath}`);
    }

    // Store in database
    await this.storeDocument({
      type: 'sop',
      number: sopContent.documentNumber,
      title: sopContent.title,
      version: sopContent.version,
      status: sopContent.status,
      content: sopContent.content,
    });

    return { files, document: result.content };
  }

  /**
   * Generate Work Instruction
   */
  async generateWorkInstruction(
    phase: number,
    activityIndex: number,
    options: DocumentGenerationOptions = { format: 'all', outputDir: './output/work-instructions' }
  ): Promise<{ files: string[]; document: any }> {
    console.log(`[QMSGenerator] Generating WI for Phase ${phase}, Activity ${activityIndex}...`);

    const result = await orchestrator.generateWorkInstruction(phase, activityIndex);

    if (!result.success) {
      throw new Error(`Failed to generate WI: ${result.error}`);
    }

    const wiContent = result.content;
    const files: string[] = [];

    await fs.mkdir(options.outputDir, { recursive: true });

    const docOptions = {
      title: wiContent.title,
      documentNumber: wiContent.documentNumber,
      version: wiContent.version,
      effectiveDate: wiContent.effectiveDate,
      status: wiContent.status,
      company: 'Fort Homes LLC',
      watermark: options.watermark,
    };

    // Generate in requested formats
    if (options.format === 'markdown' || options.format === 'all') {
      const mdPath = path.join(options.outputDir, `${wiContent.documentNumber}.md`);
      await fs.writeFile(mdPath, wiContent.content);
      files.push(mdPath);
      console.log(`  ✓ Generated: ${mdPath}`);
    }

    if (options.format === 'pdf' || options.format === 'all') {
      const pdfPath = path.join(options.outputDir, `${wiContent.documentNumber}.pdf`);
      await pdfGenerator.generatePDF(wiContent.content, pdfPath, docOptions);
      files.push(pdfPath);
      console.log(`  ✓ Generated: ${pdfPath}`);
    }

    if (options.format === 'docx' || options.format === 'all') {
      const docxPath = path.join(options.outputDir, `${wiContent.documentNumber}.docx`);
      await docxGenerator.generateDOCX(wiContent.content, docxPath, docOptions);
      files.push(docxPath);
      console.log(`  ✓ Generated: ${docxPath}`);
    }

    // Store in database
    await this.storeDocument({
      type: 'wi',
      number: wiContent.documentNumber,
      title: wiContent.title,
      version: wiContent.version,
      status: wiContent.status,
      content: wiContent.content,
    });

    return { files, document: wiContent };
  }

  /**
   * Generate Inspection Form
   */
  async generateInspectionForm(
    holdPointId: string,
    options: DocumentGenerationOptions = { format: 'all', outputDir: './output/forms' }
  ): Promise<{ files: string[]; document: any }> {
    console.log(`[QMSGenerator] Generating inspection form for ${holdPointId}...`);

    const result = await orchestrator.generateInspectionForm(holdPointId);

    if (!result.success) {
      throw new Error(`Failed to generate form: ${result.error}`);
    }

    const formContent = result.content;
    const files: string[] = [];

    await fs.mkdir(options.outputDir, { recursive: true });

    // Save as JSON for interactive use
    const jsonPath = path.join(options.outputDir, `${formContent.documentNumber}.json`);
    await fs.writeFile(jsonPath, JSON.stringify(formContent, null, 2));
    files.push(jsonPath);
    console.log(`  ✓ Generated: ${jsonPath}`);

    // Generate PDF version
    if (options.format === 'pdf' || options.format === 'all') {
      const pdfPath = path.join(options.outputDir, `${formContent.documentNumber}.pdf`);
      const docOptions = {
        title: formContent.title,
        documentNumber: formContent.documentNumber,
        version: formContent.version,
        effectiveDate: formContent.effectiveDate,
        status: formContent.status,
        company: 'Fort Homes LLC',
        watermark: options.watermark,
      };
      
      // Convert form to printable format
      const printableContent = this.convertFormToPrintable(formContent);
      await pdfGenerator.generatePDF(printableContent, pdfPath, docOptions);
      files.push(pdfPath);
      console.log(`  ✓ Generated: ${pdfPath}`);
    }

    // Store in database
    await this.storeDocument({
      type: 'form',
      number: formContent.documentNumber,
      title: formContent.title,
      version: formContent.version,
      status: formContent.status,
      content: JSON.stringify(formContent),
    });

    return { files, document: formContent };
  }

  /**
   * Generate complete QMS package (all documents)
   */
  async generateCompleteQMS(
    options: DocumentGenerationOptions = { format: 'all', outputDir: './output' }
  ): Promise<any> {
    console.log('[QMSGenerator] Generating Complete QMS Package...\n');

    const results = {
      manual: null as any,
      sops: [] as any[],
      forms: [] as any[],
      summary: {
        totalFiles: 0,
        manualFiles: 0,
        sopFiles: 0,
        formFiles: 0,
      },
    };

    // Generate Quality Manual
    console.log('1. Generating Quality Manual...');
    const manual = await this.generateQualityManual(undefined, {
      ...options,
      outputDir: path.join(options.outputDir, 'manual'),
    });
    results.manual = manual;
    results.summary.manualFiles = manual.files.length;

    // Generate SOPs for all 8 phases
    console.log('\n2. Generating SOPs...');
    for (let phase = 1; phase <= 8; phase++) {
      const sop = await this.generateSOP(phase, {
        ...options,
        outputDir: path.join(options.outputDir, 'sops'),
      });
      results.sops.push(sop);
      results.summary.sopFiles += sop.files.length;
    }

    // Generate Inspection Forms for all 8 hold points
    console.log('\n3. Generating Inspection Forms...');
    for (let hp = 1; hp <= 8; hp++) {
      const form = await this.generateInspectionForm(`HP-${hp}`, {
        ...options,
        outputDir: path.join(options.outputDir, 'forms'),
      });
      results.forms.push(form);
      results.summary.formFiles += form.files.length;
    }

    results.summary.totalFiles =
      results.summary.manualFiles + results.summary.sopFiles + results.summary.formFiles;

    console.log('\n✅ Complete QMS Package Generated!');
    console.log(`   Total Files: ${results.summary.totalFiles}`);
    console.log(`   - Manual: ${results.summary.manualFiles} files`);
    console.log(`   - SOPs: ${results.summary.sopFiles} files`);
    console.log(`   - Forms: ${results.summary.formFiles} files`);

    return results;
  }

  private convertToMarkdown(content: any): string {
    if (typeof content === 'string') {
      return content;
    }

    if (typeof content === 'object') {
      let markdown = '';

      for (const [key, value] of Object.entries(content)) {
        if (typeof value === 'object' && value !== null) {
          const section = value as any;
          if (section.title) {
            markdown += `\n# ${section.title}\n\n`;
          }
          if (section.content) {
            markdown += `${section.content}\n\n`;
          }
        }
      }

      return markdown;
    }

    return JSON.stringify(content, null, 2);
  }

  private convertFormToPrintable(formContent: any): string {
    let printable = `# ${formContent.content.formTitle}\n\n`;
    printable += `**Hold Point:** ${formContent.content.holdPointId}\n`;
    printable += `**Phase:** ${formContent.content.phase}\n`;
    printable += `**Description:** ${formContent.content.description}\n\n`;

    for (const section of formContent.content.sections) {
      printable += `## ${section.title}\n\n`;

      for (const field of section.fields) {
        printable += `**${field.label}**`;
        if (field.required) {
          printable += ' *';
        }
        printable += '\n';

        if (field.acceptanceCriteria) {
          printable += `_Acceptance: ${field.acceptanceCriteria}_\n`;
        }

        printable += `_________________\n\n`;
      }
    }

    return printable;
  }

  private async storeDocument(doc: {
    type: string;
    number: string;
    title: string;
    version: string;
    status: string;
    content: string;
  }): Promise<void> {
    try {
      await prisma.document.upsert({
        where: { number: doc.number },
        create: doc,
        update: {
          title: doc.title,
          version: doc.version,
          status: doc.status,
          content: doc.content,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.warn(`Warning: Could not store document in database: ${error}`);
    }
  }
}

export const qmsGenerator = new QMSGenerator();
