/**
 * Visual Agent
 * Fort Homes QMS - Generates Mermaid diagrams and visual documentation
 */

import { BaseAgent, AgentConfig } from './base-agent';

export interface DiagramConfig {
  type: 'flowchart' | 'sequence' | 'gantt' | 'sipoc' | 'orgchart';
  title: string;
  data?: any;
}

export class VisualAgent extends BaseAgent {
  constructor() {
    super({
      name: 'VisualAgent',
      description: 'Generates Mermaid.js diagrams and visual process documentation',
      temperature: 0.5,
      maxTokens: 2000,
    });
  }

  /**
   * Execute diagram generation
   */
  async execute(config: DiagramConfig): Promise<string> {
    console.log(`Generating ${config.type} diagram: ${config.title}`);

    switch (config.type) {
      case 'flowchart':
        return this.generateFlowchart(config);
      case 'sequence':
        return this.generateSequenceDiagram(config);
      case 'gantt':
        return this.generateGanttChart(config);
      case 'sipoc':
        return this.generateSIPOC(config);
      case 'orgchart':
        return this.generateOrgChart(config);
      default:
        throw new Error(`Unknown diagram type: ${config.type}`);
    }
  }

  /**
   * Generate production phase flowchart
   */
  private generateFlowchart(config: DiagramConfig): string {
    const phases = this.context.phases?.phases || [];

    let mermaid = `\`\`\`mermaid
flowchart TD
    Start([Production Start]) --> Phase1
`;

    phases.forEach((phase: any, idx: number) => {
      const phaseNum = idx + 1;
      const nextPhase = idx + 1;
      const holdPoint = phase.hold_point;
      const tpiaRequired = phase.tpia_required ? ' - TPIA Required' : '';

      mermaid += `    Phase${phaseNum}[Phase ${phaseNum}: ${phase.name}] --> HP${phaseNum}
    HP${phaseNum}{Hold Point ${holdPoint}${tpiaRequired}} --> |Pass| `;
      
      if (nextPhase < phases.length) {
        mermaid += `Phase${nextPhase + 1}\n`;
      } else {
        mermaid += `Complete\n`;
      }
      
      mermaid += `    HP${phaseNum} --> |Fail| NCR${phaseNum}[NCR Generated]
    NCR${phaseNum} --> Phase${phaseNum}\n`;
    });

    mermaid += `    Complete([Production Complete])

    style Start fill:#2D5016,color:#fff
    style Complete fill:#2D5016,color:#fff
`;

    // Style hold points differently based on TPIA requirement
    phases.forEach((phase: any, idx: number) => {
      const phaseNum = idx + 1;
      if (phase.tpia_required) {
        mermaid += `    style HP${phaseNum} fill:#8B1414,color:#fff\n`;
      } else {
        mermaid += `    style HP${phaseNum} fill:#1E3A5F,color:#fff\n`;
      }
    });

    mermaid += `\`\`\`\n`;

    return mermaid;
  }

  /**
   * Generate sequence diagram for inspection process
   */
  private generateSequenceDiagram(config: DiagramConfig): string {
    return `\`\`\`mermaid
sequenceDiagram
    participant Prod as Production Team
    participant QA as QA Manager
    participant NTA as NTA Inspector
    participant System as QMS System

    Prod->>Prod: Complete phase work
    Prod->>QA: Request Hold Point Inspection
    QA->>QA: Conduct initial inspection
    QA->>System: Document findings
    
    alt Nonconformance Found
        QA->>System: Generate NCR
        System->>Prod: Issue NCR notification
        Prod->>Prod: Implement corrective action
        Prod->>QA: Request re-inspection
        QA->>QA: Verify correction
    end
    
    alt TPIA Required (HP-4 or HP-8)
        QA->>NTA: Schedule inspection
        NTA->>NTA: Conduct third-party inspection
        NTA->>System: Submit inspection report
        
        alt NTA Approval
            NTA->>QA: Issue approval
            QA->>System: Update module status
            System->>Prod: Authorize next phase
        else NTA Rejection
            NTA->>QA: Identify deficiencies
            QA->>System: Generate NCR
            System->>Prod: Hold production
        end
    else Internal Hold Point Only
        QA->>System: Approve hold point
        System->>Prod: Authorize next phase
    end
\`\`\`
`;
  }

  /**
   * Generate Gantt chart for production schedule
   */
  private generateGanttChart(config: DiagramConfig): string {
    const phases = this.context.phases?.phases || [];

    let gantt = `\`\`\`mermaid
gantt
    title Modular Home Production Schedule
    dateFormat YYYY-MM-DD
    section Production Phases
`;

    let startDate = new Date();
    
    phases.forEach((phase: any) => {
      const duration = phase.duration || 2;
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + duration);

      gantt += `    ${phase.name} :${phase.tpia_required ? 'crit, ' : ''}phase${phase.phase_number}, ${startDate.toISOString().split('T')[0]}, ${duration}d\n`;
      
      startDate = endDate;
    });

    gantt += `\`\`\`\n`;

    return gantt;
  }

  /**
   * Generate SIPOC diagram
   */
  private generateSIPOC(config: DiagramConfig): string {
    return `\`\`\`mermaid
flowchart LR
    subgraph Suppliers
        S1[Material Suppliers]
        S2[Equipment Vendors]
        S3[Engineering/Design]
    end
    
    subgraph Inputs
        I1[Raw Materials]
        I2[Shop Drawings]
        I3[Specifications]
        I4[Tools & Equipment]
    end
    
    subgraph Process
        P1[Phase 1-3:<br/>Framing & Structure]
        P2[Phase 4:<br/>MEP Systems]
        P3[Phase 5-7:<br/>Finishing]
        P4[Phase 8:<br/>Final Inspection]
    end
    
    subgraph Outputs
        O1[Quality Module]
        O2[Documentation]
        O3[Test Results]
        O4[NTA Approval]
    end
    
    subgraph Customers
        C1[End Customer]
        C2[General Contractor]
        C3[Colorado DOH]
    end
    
    S1 & S2 & S3 --> I1 & I2 & I3 & I4
    I1 & I2 & I3 & I4 --> P1
    P1 --> P2 --> P3 --> P4
    P4 --> O1 & O2 & O3 & O4
    O1 & O2 & O3 & O4 --> C1 & C2 & C3
\`\`\`
`;
  }

  /**
   * Generate organizational chart
   */
  private generateOrgChart(config: DiagramConfig): string {
    const company = this.context.companyInfo?.leadership || {};

    return `\`\`\`mermaid
flowchart TD
    President[Jeff Zimmerman<br/>President]
    
    President --> COO[Marty Magill<br/>COO]
    President --> QA[Zach Lamont<br/>QA Manager]
    
    COO --> ProdMgr[Production Manager]
    COO --> Procurement[Procurement]
    
    QA --> QC[Quality Control]
    QA --> Compliance[Compliance Officer]
    
    ProdMgr --> Team1[Production Team 1]
    ProdMgr --> Team2[Production Team 2]
    ProdMgr --> Team3[Production Team 3]
    
    style President fill:#101810,color:#fff
    style COO fill:#2D5016,color:#fff
    style QA fill:#2D5016,color:#fff
\`\`\`
`;
  }

  /**
   * Generate process flow for specific phase
   */
  generatePhaseFlowchart(phaseNumber: number): string {
    const phase = this.context.phases?.phases?.find(
      (p: any) => p.id === phaseNumber
    );

    if (!phase) {
      throw new Error(`Phase ${phaseNumber} not found`);
    }

    const activities = phase.workActivities || [];

    let mermaid = `\`\`\`mermaid
flowchart TD
    Start([Phase ${phaseNumber} Start]) --> Prep[Preparation & Setup]
`;

    activities.forEach((activity: string, idx: number) => {
      const current = `Act${idx + 1}`;
      const next = idx < activities.length - 1 ? `Act${idx + 2}` : 'QC';
      mermaid += `    ${current === 'Act1' ? 'Prep' : `Act${idx}`} --> ${current}[${activity}]
    ${current} --> ${next}\n`;
    });

    mermaid += `    QC{Quality Check} --> |Pass| HP[Hold Point ${phase.holdPoint}]
    QC --> |Fail| NCR[Generate NCR]
    NCR --> Act1
    HP --> Complete([Phase Complete])
    
    style Start fill:#2D5016,color:#fff
    style Complete fill:#2D5016,color:#fff
    style HP fill:#1E3A5F,color:#fff
    style NCR fill:#8B1414,color:#fff
\`\`\`
`;

    return mermaid;
  }
}

export default VisualAgent;
