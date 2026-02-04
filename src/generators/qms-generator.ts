/**
 * QMS Generator - Main Document Generator
 * Fort Homes QMS
 */

import { ManualAgent, ProcedureAgent, VisualAgent } from '../agents';
import { prisma } from '../database';
import fs from 'fs';
import path from 'path';

export interface GeneratorOptions {
  outputDir?: string;
  format?: 'markdown' | 'pdf' | 'docx' | 'all';
}

export class QMSGenerator {
  private manualAgent: ManualAgent;
  private procedureAgent: ProcedureAgent;
  private visualAgent: VisualAgent;
  private outputDir: string;

  constructor(options: GeneratorOptions = {}) {
    this.manualAgent = new ManualAgent();
    this.procedureAgent = new ProcedureAgent();
    this.visualAgent = new VisualAgent();
    this.outputDir = options.outputDir || path.join(process.cwd(), 'output');
    
    // Ensure output directories exist
    this.ensureOutputDirectories();
  }

  /**
   * Ensure output directories exist
   */
  private ensureOutputDirectories(): void {
    const dirs = [
      this.outputDir,
      path.join(this.outputDir, 'manual'),
      path.join(this.outputDir, 'sops'),
      path.join(this.outputDir, 'work-instructions'),
      path.join(this.outputDir, 'forms'),
      path.join(this.outputDir, 'diagrams'),
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * Generate Quality Manual
   */
  async generateQualityManual(): Promise<string[]> {
    console.log('📋 Generating Quality Manual sections...\n');

    const sections = await this.manualAgent.execute();
    const outputFiles: string[] = [];

    for (const section of sections) {
      const filename = `${section.number}.md`;
      const filepath = path.join(this.outputDir, 'manual', filename);
      
      fs.writeFileSync(filepath, section.content, 'utf-8');
      outputFiles.push(filepath);
      
      console.log(`  ✓ Generated: ${filename}`);
    }

    console.log(`\n✅ Generated ${sections.length} Quality Manual sections`);
    return outputFiles;
  }

  /**
   * Generate Standard Operating Procedures
   */
  async generateSOPs(phaseNumber?: number): Promise<string[]> {
    console.log('📋 Generating Standard Operating Procedures...\n');

    const sops = phaseNumber 
      ? await this.procedureAgent.execute('sop', phaseNumber)
      : await this.procedureAgent.execute('sop');
    
    const outputFiles: string[] = [];

    for (const sop of sops) {
      const filename = `${sop.number}.md`;
      const filepath = path.join(this.outputDir, 'sops', filename);
      
      fs.writeFileSync(filepath, sop.content, 'utf-8');
      outputFiles.push(filepath);
      
      console.log(`  ✓ Generated: ${filename}`);
    }

    console.log(`\n✅ Generated ${sops.length} Standard Operating Procedures`);
    return outputFiles;
  }

  /**
   * Generate Work Instructions
   */
  async generateWorkInstructions(phaseNumber?: number): Promise<string[]> {
    console.log('📋 Generating Work Instructions...\n');

    const wis = phaseNumber 
      ? await this.procedureAgent.execute('wi', phaseNumber)
      : await this.procedureAgent.execute('wi');
    
    const outputFiles: string[] = [];

    for (const wi of wis) {
      const filename = `${wi.number}.md`;
      const filepath = path.join(this.outputDir, 'work-instructions', filename);
      
      fs.writeFileSync(filepath, wi.content, 'utf-8');
      outputFiles.push(filepath);
      
      console.log(`  ✓ Generated: ${filename}`);
    }

    console.log(`\n✅ Generated ${wis.length} Work Instructions`);
    return outputFiles;
  }

  /**
   * Generate all documents
   */
  async generateAll(): Promise<{
    manual: string[];
    sops: string[];
    wis: string[];
  }> {
    console.log('🚀 Generating complete QMS documentation suite...\n');

    const manual = await this.generateQualityManual();
    const sops = await this.generateSOPs();
    const wis = await this.generateWorkInstructions();

    console.log(`\n✅ Complete! Generated ${manual.length + sops.length + wis.length} documents`);

    return { manual, sops, wis };
  }

  /**
   * Generate diagrams for a phase
   */
  async generatePhaseDiagrams(phaseNumber: number): Promise<string[]> {
    console.log(`📊 Generating diagrams for Phase ${phaseNumber}...\n`);

    const outputFiles: string[] = [];

    // Generate phase flowchart
    const flowchart = this.visualAgent.generatePhaseFlowchart(phaseNumber);
    const flowchartFile = path.join(
      this.outputDir,
      'diagrams',
      `phase-${phaseNumber}-flowchart.md`
    );
    fs.writeFileSync(flowchartFile, flowchart, 'utf-8');
    outputFiles.push(flowchartFile);

    console.log(`  ✓ Generated flowchart for Phase ${phaseNumber}`);

    return outputFiles;
  }

  /**
   * Generate all diagrams
   */
  async generateAllDiagrams(): Promise<string[]> {
    console.log('📊 Generating all process diagrams...\n');

    const outputFiles: string[] = [];

    // Generate production flowchart
    const productionFlow = await this.visualAgent.execute({
      type: 'flowchart',
      title: 'Production Process Flow',
    });
    const flowFile = path.join(this.outputDir, 'diagrams', 'production-flowchart.md');
    fs.writeFileSync(flowFile, productionFlow, 'utf-8');
    outputFiles.push(flowFile);

    // Generate SIPOC
    const sipoc = await this.visualAgent.execute({
      type: 'sipoc',
      title: 'SIPOC Diagram',
    });
    const sipocFile = path.join(this.outputDir, 'diagrams', 'sipoc.md');
    fs.writeFileSync(sipocFile, sipoc, 'utf-8');
    outputFiles.push(sipocFile);

    // Generate org chart
    const orgChart = await this.visualAgent.execute({
      type: 'orgchart',
      title: 'Organizational Chart',
    });
    const orgFile = path.join(this.outputDir, 'diagrams', 'org-chart.md');
    fs.writeFileSync(orgFile, orgChart, 'utf-8');
    outputFiles.push(orgFile);

    // Generate phase diagrams
    for (let phase = 1; phase <= 8; phase++) {
      const phaseFiles = await this.generatePhaseDiagrams(phase);
      outputFiles.push(...phaseFiles);
    }

    console.log(`\n✅ Generated ${outputFiles.length} diagrams`);

    return outputFiles;
  }
}

export default QMSGenerator;
