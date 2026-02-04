/**
 * Orchestrator Agent
 * Fort Homes QMS - Coordinates all AI agents for document generation
 */

import { BaseAgent, AgentConfig } from './base-agent';
import ManualAgent from './manual-agent';
import ProcedureAgent from './procedure-agent';
import ComplianceAgent from './compliance-agent';
import VisualAgent from './visual-agent';
import ReviewAgent from './review-agent';
import AuditAgent from './audit-agent';

export interface WorkflowResult {
  success: boolean;
  documents: any[];
  reports: {
    compliance?: any;
    review?: any;
    audit?: any;
  };
  errors: string[];
}

export class Orchestrator extends BaseAgent {
  private manualAgent: ManualAgent;
  private procedureAgent: ProcedureAgent;
  private complianceAgent: ComplianceAgent;
  private visualAgent: VisualAgent;
  private reviewAgent: ReviewAgent;
  private auditAgent: AuditAgent;

  constructor() {
    super({
      name: 'Orchestrator',
      description: 'Coordinates all AI agents for comprehensive QMS document generation',
      temperature: 0.5,
      maxTokens: 2000,
    });

    // Initialize all agents
    this.manualAgent = new ManualAgent();
    this.procedureAgent = new ProcedureAgent();
    this.complianceAgent = new ComplianceAgent();
    this.visualAgent = new VisualAgent();
    this.reviewAgent = new ReviewAgent();
    this.auditAgent = new AuditAgent();
  }

  /**
   * Execute complete workflow
   */
  async execute(workflow: string, options?: any): Promise<WorkflowResult> {
    console.log(`\n🤖 Orchestrator executing workflow: ${workflow}\n`);

    switch (workflow) {
      case 'generate-all':
        return await this.generateAllDocuments();
      case 'generate-manual':
        return await this.generateQualityManual();
      case 'generate-sops':
        return await this.generateSOPs();
      case 'generate-wis':
        return await this.generateWorkInstructions();
      case 'generate-phase':
        return await this.generatePhaseDocuments(options?.phase);
      default:
        throw new Error(`Unknown workflow: ${workflow}`);
    }
  }

  /**
   * Generate all QMS documents
   */
  async generateAllDocuments(): Promise<WorkflowResult> {
    console.log('📦 Generating complete QMS documentation suite...\n');

    const result: WorkflowResult = {
      success: true,
      documents: [],
      reports: {},
      errors: [],
    };

    try {
      // Step 1: Generate Quality Manual
      console.log('📋 Step 1/3: Generating Quality Manual...');
      const manualResult = await this.generateQualityManual();
      result.documents.push(...manualResult.documents);
      result.errors.push(...manualResult.errors);

      // Step 2: Generate SOPs
      console.log('\n📋 Step 2/3: Generating Standard Operating Procedures...');
      const sopResult = await this.generateSOPs();
      result.documents.push(...sopResult.documents);
      result.errors.push(...sopResult.errors);

      // Step 3: Generate Work Instructions
      console.log('\n📋 Step 3/3: Generating Work Instructions...');
      const wiResult = await this.generateWorkInstructions();
      result.documents.push(...wiResult.documents);
      result.errors.push(...wiResult.errors);

      // Generate final audit report
      result.reports.audit = await this.auditAgent.generateReport();

      result.success = result.errors.length === 0;

      console.log(`\n✅ Complete! Generated ${result.documents.length} documents with ${result.errors.length} errors.`);

    } catch (error) {
      result.success = false;
      result.errors.push(`Orchestrator error: ${error}`);
    }

    return result;
  }

  /**
   * Generate Quality Manual
   */
  async generateQualityManual(): Promise<WorkflowResult> {
    const result: WorkflowResult = {
      success: true,
      documents: [],
      reports: {},
      errors: [],
    };

    try {
      const sections = await this.manualAgent.execute();
      
      for (const section of sections) {
        // Run compliance check
        const compliance = await this.complianceAgent.execute(section.content, section.number);
        
        // Run review
        const review = await this.reviewAgent.execute(section.content, section.number);

        result.documents.push({
          type: 'manual',
          number: section.number,
          title: section.title,
          compliance: compliance.score,
          review: review.score,
        });

        if (!compliance.isCompliant) {
          result.errors.push(`${section.number}: Compliance issues found (score: ${compliance.score})`);
        }

        console.log(`  ✓ ${section.number}: ${section.title} (Compliance: ${compliance.score}%, Review: ${review.score}%)`);
      }

      result.success = result.errors.length === 0;

    } catch (error) {
      result.success = false;
      result.errors.push(`Quality Manual generation error: ${error}`);
    }

    return result;
  }

  /**
   * Generate Standard Operating Procedures
   */
  async generateSOPs(): Promise<WorkflowResult> {
    const result: WorkflowResult = {
      success: true,
      documents: [],
      reports: {},
      errors: [],
    };

    try {
      const sops = await this.procedureAgent.execute('sop');
      
      for (const sop of sops) {
        // Run compliance check
        const compliance = await this.complianceAgent.execute(sop.content, sop.number);
        
        // Run review
        const review = await this.reviewAgent.execute(sop.content, sop.number);

        result.documents.push({
          type: 'sop',
          number: sop.number,
          title: sop.title,
          phase: sop.phase,
          compliance: compliance.score,
          review: review.score,
        });

        if (!compliance.isCompliant) {
          result.errors.push(`${sop.number}: Compliance issues found (score: ${compliance.score})`);
        }

        console.log(`  ✓ ${sop.number}: ${sop.title} (Compliance: ${compliance.score}%, Review: ${review.score}%)`);
      }

      result.success = result.errors.length === 0;

    } catch (error) {
      result.success = false;
      result.errors.push(`SOP generation error: ${error}`);
    }

    return result;
  }

  /**
   * Generate Work Instructions
   */
  async generateWorkInstructions(): Promise<WorkflowResult> {
    const result: WorkflowResult = {
      success: true,
      documents: [],
      reports: {},
      errors: [],
    };

    try {
      const wis = await this.procedureAgent.execute('wi');
      
      for (const wi of wis) {
        // Run compliance check
        const compliance = await this.complianceAgent.execute(wi.content, wi.number);
        
        // Run review
        const review = await this.reviewAgent.execute(wi.content, wi.number);

        result.documents.push({
          type: 'wi',
          number: wi.number,
          title: wi.title,
          phase: wi.phase,
          compliance: compliance.score,
          review: review.score,
        });

        if (!compliance.isCompliant) {
          result.errors.push(`${wi.number}: Compliance issues found (score: ${compliance.score})`);
        }

        console.log(`  ✓ ${wi.number}: ${wi.title} (Compliance: ${compliance.score}%, Review: ${review.score}%)`);
      }

      result.success = result.errors.length === 0;

    } catch (error) {
      result.success = false;
      result.errors.push(`Work Instruction generation error: ${error}`);
    }

    return result;
  }

  /**
   * Generate documents for a specific phase
   */
  async generatePhaseDocuments(phaseNumber: number): Promise<WorkflowResult> {
    console.log(`📦 Generating documents for Phase ${phaseNumber}...\n`);

    const result: WorkflowResult = {
      success: true,
      documents: [],
      reports: {},
      errors: [],
    };

    try {
      // Generate SOP
      const sop = await this.procedureAgent.execute('sop', phaseNumber);
      const sopCompliance = await this.complianceAgent.execute(sop[0].content, sop[0].number);
      
      result.documents.push({
        type: 'sop',
        ...sop[0],
        compliance: sopCompliance.score,
      });

      // Generate WI
      const wi = await this.procedureAgent.execute('wi', phaseNumber);
      const wiCompliance = await this.complianceAgent.execute(wi[0].content, wi[0].number);
      
      result.documents.push({
        type: 'wi',
        ...wi[0],
        compliance: wiCompliance.score,
      });

      // Generate flowchart
      const flowchart = this.visualAgent.generatePhaseFlowchart(phaseNumber);
      result.documents.push({
        type: 'diagram',
        title: `Phase ${phaseNumber} Flowchart`,
        content: flowchart,
      });

      console.log(`\n✅ Phase ${phaseNumber} documents generated successfully!`);

    } catch (error) {
      result.success = false;
      result.errors.push(`Phase ${phaseNumber} generation error: ${error}`);
    }

    return result;
  }

  /**
   * Validate existing document
   */
  async validateDocument(documentContent: string, documentType: string): Promise<any> {
    console.log(`🔍 Validating ${documentType}...\n`);

    const compliance = await this.complianceAgent.execute(documentContent, documentType);
    const review = await this.reviewAgent.execute(documentContent, documentType);

    const report = {
      compliance: {
        score: compliance.score,
        isCompliant: compliance.isCompliant,
        issues: compliance.issues,
      },
      review: {
        score: review.score,
        strengths: review.strengths,
        improvements: review.improvements,
      },
      overallScore: Math.round((compliance.score + review.score) / 2),
    };

    console.log(`\nValidation Results:`);
    console.log(`  Compliance Score: ${compliance.score}%`);
    console.log(`  Review Score: ${review.score}%`);
    console.log(`  Overall Score: ${report.overallScore}%`);
    console.log(`  Status: ${compliance.isCompliant && review.score >= 80 ? '✅ PASS' : '❌ NEEDS IMPROVEMENT'}`);

    return report;
  }
}

export default Orchestrator;
