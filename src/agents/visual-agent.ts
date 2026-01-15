/**
 * Visual Agent
 * Generates diagrams, flowcharts, and visual process documentation
 */

import { BaseAgent, AgentConfig, AgentResult } from './types';

export class VisualAgent extends BaseAgent {
  constructor() {
    super({
      name: 'VisualAgent',
      description: 'Generates diagrams and visual documentation',
      temperature: 0.5,
      maxTokens: 1500,
    });
  }

  async execute(input: any): Promise<AgentResult> {
    try {
      this.log(`Generating visual: ${input.type}`);

      let visual;

      switch (input.type) {
        case 'flowchart':
          visual = this.generateFlowchart(input.data);
          break;
        case 'process-flow':
          visual = this.generateProcessFlow(input.data);
          break;
        case 'org-chart':
          visual = this.generateOrgChart(input.data);
          break;
        case 'sipoc':
          visual = this.generateSIPOC(input.data);
          break;
        case 'fishbone':
          visual = this.generateFishbone(input.data);
          break;
        case 'pareto':
          visual = this.generatePareto(input.data);
          break;
        default:
          throw new Error(`Unknown visual type: ${input.type}`);
      }

      return {
        success: true,
        content: visual,
        metadata: {
          generatedAt: new Date().toISOString(),
          agent: this.config.name,
          type: input.type,
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

  private generateFlowchart(data: any): any {
    // Generate Mermaid.js flowchart
    const mermaidCode = `
graph TD
    A[${data.start || 'Start'}] --> B{${data.decision || 'Decision Point'}}
    B -->|Yes| C[${data.yesPath || 'Action 1'}]
    B -->|No| D[${data.noPath || 'Action 2'}]
    C --> E[${data.end || 'End'}]
    D --> E
    `;

    return {
      format: 'mermaid',
      code: mermaidCode.trim(),
      title: data.title || 'Process Flowchart',
    };
  }

  private generateProcessFlow(data: any): any {
    // Generate process flow for production phases
    const phases = data.phases || [];
    
    let mermaidCode = 'graph LR\n';
    
    phases.forEach((phase: any, index: number) => {
      const nodeId = `P${index + 1}`;
      const nextNodeId = `P${index + 2}`;
      const hpNodeId = `HP${index + 1}`;
      
      mermaidCode += `    ${nodeId}[${phase.name}]\n`;
      mermaidCode += `    ${nodeId} --> ${hpNodeId}{${phase.holdPoint}}\n`;
      
      if (phase.ntaRequired) {
        mermaidCode += `    ${hpNodeId} -.NTA Inspection.- ${nextNodeId === `P${phases.length + 1}` ? 'END' : nextNodeId}\n`;
      } else {
        mermaidCode += `    ${hpNodeId} --> ${index < phases.length - 1 ? nextNodeId : 'END[Complete]'}\n`;
      }
    });

    return {
      format: 'mermaid',
      code: mermaidCode,
      title: data.title || 'Production Phase Flow',
    };
  }

  private generateOrgChart(data: any): any {
    const leadership = data.leadership || {};
    
    const mermaidCode = `
graph TD
    A[${leadership.president?.name || 'President'}]
    A --> B[${leadership.coo?.name || 'COO'}]
    B --> C[${leadership.qaManager?.name || 'QA Manager'}]
    B --> D[Production Manager]
    B --> E[Operations Manager]
    C --> F[QA Inspectors]
    D --> G[Bay Supervisors]
    G --> H[Trade Crews]
    `;

    return {
      format: 'mermaid',
      code: mermaidCode.trim(),
      title: data.title || 'Organization Chart',
    };
  }

  private generateSIPOC(data: any): any {
    // SIPOC: Supplier-Input-Process-Output-Customer
    const sipoc = data.sipoc || {
      suppliers: ['Material Suppliers', 'Equipment Vendors'],
      inputs: ['Raw Materials', 'Tools', 'Specifications'],
      process: ['Receive', 'Fabricate', 'Inspect', 'Deliver'],
      outputs: ['Modular Home', 'Quality Records'],
      customers: ['Homebuyers', 'Contractors'],
    };

    const mermaidCode = `
graph LR
    subgraph Suppliers
        S1[${sipoc.suppliers[0]}]
        S2[${sipoc.suppliers[1] || '...'}]
    end
    subgraph Inputs
        I1[${sipoc.inputs[0]}]
        I2[${sipoc.inputs[1] || '...'}]
    end
    subgraph Process
        P1[${sipoc.process[0]}]
        P2[${sipoc.process[1] || '...'}]
        P3[${sipoc.process[2] || '...'}]
    end
    subgraph Outputs
        O1[${sipoc.outputs[0]}]
        O2[${sipoc.outputs[1] || '...'}]
    end
    subgraph Customers
        C1[${sipoc.customers[0]}]
        C2[${sipoc.customers[1] || '...'}]
    end
    S1 --> I1
    S2 --> I2
    I1 --> P1
    I2 --> P1
    P1 --> P2
    P2 --> P3
    P3 --> O1
    P3 --> O2
    O1 --> C1
    O2 --> C2
    `;

    return {
      format: 'mermaid',
      code: mermaidCode.trim(),
      title: data.title || 'SIPOC Diagram',
    };
  }

  private generateFishbone(data: any): any {
    // Ishikawa/Fishbone diagram for root cause analysis
    const problem = data.problem || 'Quality Issue';
    const causes = data.causes || {
      method: ['Process not followed', 'Inadequate training'],
      material: ['Defective materials', 'Wrong specification'],
      machine: ['Equipment malfunction', 'Tool calibration'],
      manpower: ['Insufficient skill', 'Fatigue'],
      measurement: ['Incorrect inspection', 'Missing criteria'],
      environment: ['Poor lighting', 'Temperature variation'],
    };

    const mermaidCode = `
graph LR
    M1[Method] -->|${causes.method[0]}| P[${problem}]
    M2[Material] -->|${causes.material[0]}| P
    M3[Machine] -->|${causes.machine[0]}| P
    M4[Manpower] -->|${causes.manpower[0]}| P
    M5[Measurement] -->|${causes.measurement[0]}| P
    M6[Environment] -->|${causes.environment[0]}| P
    `;

    return {
      format: 'mermaid',
      code: mermaidCode.trim(),
      title: data.title || 'Root Cause Analysis - Fishbone Diagram',
      description: 'Ishikawa diagram showing potential causes',
    };
  }

  private generatePareto(data: any): any {
    // Pareto chart data (80/20 rule)
    const defects = data.defects || [
      { category: 'Dimension Error', count: 45 },
      { category: 'Material Defect', count: 30 },
      { category: 'Workmanship', count: 15 },
      { category: 'Missing Item', count: 7 },
      { category: 'Other', count: 3 },
    ];

    // Sort by count descending
    defects.sort((a: any, b: any) => b.count - a.count);

    // Calculate cumulative percentage
    const total = defects.reduce((sum: number, d: any) => sum + d.count, 0);
    let cumulative = 0;
    const paretoData = defects.map((d: any) => {
      cumulative += d.count;
      return {
        ...d,
        percentage: ((d.count / total) * 100).toFixed(1),
        cumulative: ((cumulative / total) * 100).toFixed(1),
      };
    });

    return {
      format: 'chart',
      chartType: 'pareto',
      data: paretoData,
      title: data.title || 'Defect Pareto Analysis',
      config: {
        xAxis: 'Defect Category',
        yAxis: 'Count',
        y2Axis: 'Cumulative %',
      },
    };
  }

  // Helper method to generate inspection checklist visual
  public generateInspectionChecklist(phase: any, holdPoint: any): any {
    const checklistItems = holdPoint.inspectionCriteria || [];
    
    return {
      format: 'checklist',
      phase: phase.name,
      holdPoint: holdPoint.id,
      items: checklistItems.map((item: any) => ({
        criterion: item.criterion,
        acceptance: item.acceptanceCriteria,
        status: 'pending', // pending, pass, fail
        notes: '',
      })),
    };
  }

  // Helper method to generate assembly diagram placeholder
  public generateAssemblyDiagram(phase: any): any {
    return {
      format: 'placeholder',
      type: 'assembly',
      phase: phase.name,
      description: `Assembly diagram for ${phase.name}`,
      note: 'Detailed assembly diagrams would be created using CAD software or technical illustration tools',
      suggestedSections: [
        'Exploded view of components',
        'Step-by-step assembly sequence',
        'Fastener locations and specifications',
        'Critical dimension callouts',
        'Quality checkpoints',
      ],
    };
  }
}
