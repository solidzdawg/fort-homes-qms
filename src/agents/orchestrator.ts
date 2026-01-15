/**
 * Agent Orchestrator
 * Coordinates multiple AI agents for document generation and QMS management
 */

import { QMSManualAgent } from './manual-agent';
import { ProcedureAgent } from './procedure-agent';
import { ComplianceAgent } from './compliance-agent';
import { VisualAgent } from './visual-agent';
import { ReviewAgent } from './review-agent';
import { AuditAgent } from './audit-agent';
import { AgentResult } from './types';

export class AgentOrchestrator {
  private agents: {
    manual: QMSManualAgent;
    procedure: ProcedureAgent;
    compliance: ComplianceAgent;
    visual: VisualAgent;
    review: ReviewAgent;
    audit: AuditAgent;
  };

  constructor() {
    this.agents = {
      manual: new QMSManualAgent(),
      procedure: new ProcedureAgent(),
      compliance: new ComplianceAgent(),
      visual: new VisualAgent(),
      review: new ReviewAgent(),
      audit: new AuditAgent(),
    };
  }

  /**
   * Generate a complete Quality Manual
   */
  async generateQualityManual(section?: string): Promise<AgentResult> {
    console.log('[AgentOrchestrator] Generating quality manual...');
    
    const result = await this.agents.manual.execute({ section });
    
    if (result.success) {
      // Check compliance
      const compliance = await this.agents.compliance.execute({
        documentType: 'manual',
        content: JSON.stringify(result.content),
      });
      
      // Review the document
      const review = await this.agents.review.execute({
        documentType: 'manual',
        content: JSON.stringify(result.content),
      });
      
      return {
        success: true,
        content: {
          manual: result.content,
          compliance: compliance.content,
          review: review.content,
        },
        metadata: {
          ...result.metadata,
          complianceChecked: true,
          reviewed: true,
        },
      };
    }
    
    return result;
  }

  /**
   * Generate SOP for a specific phase
   */
  async generateSOP(phase: number): Promise<AgentResult> {
    console.log(`[AgentOrchestrator] Generating SOP for phase ${phase}...`);
    
    const result = await this.agents.procedure.execute({
      type: 'sop',
      phase,
    });
    
    if (result.success) {
      // Check compliance
      const compliance = await this.agents.compliance.execute({
        documentType: 'sop',
        content: JSON.stringify(result.content),
      });
      
      // Review the document
      const review = await this.agents.review.execute({
        documentNumber: result.content.documentNumber,
        documentType: 'sop',
        content: result.content.content,
      });
      
      return {
        success: true,
        content: {
          sop: result.content,
          compliance: compliance.content,
          review: review.content,
        },
        metadata: {
          ...result.metadata,
          complianceChecked: true,
          reviewed: true,
        },
      };
    }
    
    return result;
  }

  /**
   * Generate Work Instruction
   */
  async generateWorkInstruction(phase: number, activityIndex: number): Promise<AgentResult> {
    console.log(`[AgentOrchestrator] Generating WI for phase ${phase}, activity ${activityIndex}...`);
    
    return await this.agents.procedure.execute({
      type: 'wi',
      phase,
      activityIndex,
    });
  }

  /**
   * Generate Inspection Form
   */
  async generateInspectionForm(holdPointId: string): Promise<AgentResult> {
    console.log(`[AgentOrchestrator] Generating inspection form for ${holdPointId}...`);
    
    return await this.agents.procedure.execute({
      type: 'form',
      holdPointId,
    });
  }

  /**
   * Generate Process Flow Diagram
   */
  async generateProcessFlow(phases: any[]): Promise<AgentResult> {
    console.log('[AgentOrchestrator] Generating process flow diagram...');
    
    return await this.agents.visual.execute({
      type: 'process-flow',
      data: { phases },
    });
  }

  /**
   * Generate Organization Chart
   */
  async generateOrgChart(leadership: any): Promise<AgentResult> {
    console.log('[AgentOrchestrator] Generating organization chart...');
    
    return await this.agents.visual.execute({
      type: 'org-chart',
      data: { leadership },
    });
  }

  /**
   * Check document compliance
   */
  async checkCompliance(documentType: string, content: string): Promise<AgentResult> {
    console.log(`[AgentOrchestrator] Checking compliance for ${documentType}...`);
    
    return await this.agents.compliance.execute({
      documentType,
      content,
    });
  }

  /**
   * Review document
   */
  async reviewDocument(documentNumber: string, documentType: string, content: string): Promise<AgentResult> {
    console.log(`[AgentOrchestrator] Reviewing ${documentNumber}...`);
    
    return await this.agents.review.execute({
      documentNumber,
      documentType,
      content,
    });
  }

  /**
   * Log audit trail
   */
  async logAudit(documentId: string, action: string, userId: string, changes: any): Promise<AgentResult> {
    console.log(`[AgentOrchestrator] Logging audit for ${documentId}...`);
    
    return await this.agents.audit.execute({
      action: 'log',
      documentId,
      actionType: action,
      userId,
      changes,
    });
  }

  /**
   * Get document history
   */
  async getDocumentHistory(documentId: string): Promise<AgentResult> {
    console.log(`[AgentOrchestrator] Getting history for ${documentId}...`);
    
    return await this.agents.audit.execute({
      action: 'getHistory',
      documentId,
    });
  }

  /**
   * Generate complete QMS package
   * Generates all documents for all phases
   */
  async generateCompleteQMS(): Promise<{
    manual: any;
    sops: any[];
    workInstructions: any[];
    forms: any[];
    visuals: any[];
  }> {
    console.log('[AgentOrchestrator] Generating complete QMS package...');
    
    // Generate quality manual
    const manualResult = await this.generateQualityManual();
    
    // Generate SOPs for all 8 phases
    const sopPromises = Array.from({ length: 8 }, (_, i) => this.generateSOP(i + 1));
    const sops = await Promise.all(sopPromises);
    
    // Generate inspection forms for all hold points
    const formPromises = Array.from({ length: 8 }, (_, i) => 
      this.generateInspectionForm(`HP-${i + 1}`)
    );
    const forms = await Promise.all(formPromises);
    
    // Generate process flow and org chart
    const processFlow = await this.generateProcessFlow([]);
    const orgChart = await this.generateOrgChart({});
    
    return {
      manual: manualResult.success ? manualResult.content : null,
      sops: sops.filter(s => s.success).map(s => s.content),
      workInstructions: [], // WIs would be generated on-demand
      forms: forms.filter(f => f.success).map(f => f.content),
      visuals: [
        processFlow.success ? processFlow.content : null,
        orgChart.success ? orgChart.content : null,
      ].filter(Boolean),
    };
  }

  /**
   * Get agent instance for direct access
   */
  getAgent(agentName: 'manual' | 'procedure' | 'compliance' | 'visual' | 'review' | 'audit') {
    return this.agents[agentName];
  }
}

// Export singleton instance
export const orchestrator = new AgentOrchestrator();
