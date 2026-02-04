/**
 * Procedure Agent
 * Fort Homes QMS - Generates SOPs and Work Instructions
 */

import { BaseAgent, AgentConfig } from './base-agent';
import { prisma } from '../database';
import fs from 'fs';
import path from 'path';

export interface ProcedureDocument {
  type: 'sop' | 'wi';
  number: string;
  title: string;
  content: string;
  phase?: number;
  holdPoint?: string;
}

export class ProcedureAgent extends BaseAgent {
  constructor() {
    super({
      name: 'ProcedureAgent',
      description: 'Generates SOPs and Work Instructions for production phases',
      temperature: 0.6,
      maxTokens: 5000,
    });
  }

  /**
   * Execute procedure generation
   */
  async execute(
    type: 'sop' | 'wi',
    phaseNumber?: number
  ): Promise<ProcedureDocument[]> {
    if (phaseNumber !== undefined) {
      return [await this.generateProcedure(type, phaseNumber)];
    }

    // Generate all procedures for type
    return await this.generateAllProcedures(type);
  }

  /**
   * Generate all procedures of a specific type
   */
  private async generateAllProcedures(type: 'sop' | 'wi'): Promise<ProcedureDocument[]> {
    const procedures: ProcedureDocument[] = [];
    
    // Production phases 1-8
    for (let phase = 1; phase <= 8; phase++) {
      try {
        const proc = await this.generateProcedure(type, phase);
        procedures.push(proc);
      } catch (error) {
        console.error(`Error generating ${type} for phase ${phase}:`, error);
      }
    }

    return procedures;
  }

  /**
   * Generate a procedure for a specific phase
   */
  async generateProcedure(
    type: 'sop' | 'wi',
    phaseNumber: number
  ): Promise<ProcedureDocument> {
    console.log(`Generating ${type.toUpperCase()} for Phase ${phaseNumber}`);

    // Get phase information
    const phase = this.getPhaseInfo(phaseNumber);
    if (!phase) {
      throw new Error(`Phase ${phaseNumber} not found`);
    }

    // Determine document number
    const docNumber = type === 'sop' ? `SOP-${100 + phaseNumber}` : `WI-${100 + phaseNumber}`;

    // Check if document already exists
    const existingPath = this.findExistingDocument(type, docNumber);
    if (existingPath) {
      const content = fs.readFileSync(existingPath, 'utf-8');
      const title = this.extractTitle(content);
      
      console.log(`✓ Loaded existing ${type.toUpperCase()}: ${docNumber} - ${title}`);
      
      return {
        type,
        number: docNumber,
        title,
        content,
        phase: phaseNumber,
        holdPoint: phase.hold_point,
      };
    }

    // Generate new procedure
    return await this.generateNewProcedure(type, docNumber, phase);
  }

  /**
   * Get phase information
   */
  private getPhaseInfo(phaseNumber: number): any {
    if (!this.context.phases || !this.context.phases.phases) {
      return null;
    }

    return this.context.phases.phases.find(
      (p: any) => p.id === phaseNumber
    );
  }

  /**
   * Find existing document
   */
  private findExistingDocument(type: 'sop' | 'wi', docNumber: string): string | null {
    const docsDir = path.join(process.cwd(), 'docs', type === 'sop' ? 'sops' : 'work-instructions');
    
    try {
      const files = fs.readdirSync(docsDir);
      const found = files.find(f => f.startsWith(docNumber));
      
      if (found) {
        return path.join(docsDir, found);
      }
    } catch (error) {
      console.warn(`Could not read ${type} directory`);
    }

    return null;
  }

  /**
   * Generate new procedure
   */
  private async generateNewProcedure(
    type: 'sop' | 'wi',
    docNumber: string,
    phase: any
  ): Promise<ProcedureDocument> {
    const title = `${phase.name}`;
    const content = this.generateProcedureContent(type, docNumber, phase);

    // Store in database
    await this.storeInDatabase(type, docNumber, title, content, phase);

    console.log(`✓ Generated new ${type.toUpperCase()}: ${docNumber} - ${title}`);

    return {
      type,
      number: docNumber,
      title,
      content,
      phase: phase.phase_number,
      holdPoint: phase.hold_point,
    };
  }

  /**
   * Generate procedure content
   */
  private generateProcedureContent(
    type: 'sop' | 'wi',
    docNumber: string,
    phase: any
  ): string {
    const company = this.context.companyInfo?.company || {};
    const holdPoint = this.getHoldPointInfo(phase.holdPoint);
    const tpiaRequired = holdPoint?.tpiaRequired || phase.tpiaRequired || false;

    const docType = type === 'sop' ? 'Standard Operating Procedure' : 'Work Instruction';
    const docTypeShort = type.toUpperCase();

    return `---
title: "${phase.name}"
document_id: "${docNumber}"
revision: "1.0"
effective_date: "${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}"
process_owner: "Production Manager"
next_review: "${new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}"
classification: "CONTROLLED"
---

<div align="center">

# 🏗️ ${company.legal_name || 'FORT HOMES LLC'}
## Quality Management System

---

### ${docTypeShort}-${100 + phase.id}: ${phase.name.toUpperCase()}

| Attribute | Value |
|:----------|:------|
| **Document ID** | \`${docNumber}\` |
| **Revision** | \`1.0\` |
| **Phase** | ${phase.id} of 8 |
| **Hold Point** | \`${phase.holdPoint}\` |
| **TPIA Required** | ${tpiaRequired ? '✅ Yes' : '❌ No'} |
| **Effective Date** | ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} |
| **Process Owner** | Production Manager |

---

</div>

## 📋 Purpose

This ${docType.toLowerCase()} defines the requirements and procedures for **${phase.name}** (Phase ${phase.id}) in the modular home manufacturing process.

## 🎯 Scope

This procedure applies to all production activities during Phase ${phase.id} and includes:
- Process steps and sequence
- Quality control requirements
- Hold Point ${phase.holdPoint} inspection criteria
${tpiaRequired ? '- Third-Party Inspection Agency (NTA) coordination\n' : ''}
- Material and documentation requirements

## 👥 Roles & Responsibilities

### Production Manager
- Overall responsibility for phase completion
- Resource allocation and scheduling
- Issue resolution and NCR management

### QA Manager
- Hold Point ${phase.holdPoint} inspection
${tpiaRequired ? '- TPIA coordination and approval\n' : ''}- Quality verification and documentation
- NCR initiation if nonconformances detected

### Production Team
- Execute work according to procedures
- Maintain quality standards
- Complete required documentation

${tpiaRequired ? `### NTA Third-Party Inspector
- Conduct independent inspection at Hold Point ${phase.holdPoint}
- Verify compliance with IRC 2021 and applicable codes
- Approve module to proceed or identify deficiencies
` : ''}

## 📐 Prerequisites

${phase.prerequisites && phase.prerequisites.length > 0 ? 
  phase.prerequisites.map((p: string) => `- ${p}`).join('\n') :
  `- Previous phase (Phase ${phase.id - 1}) completed and approved
- Required materials and components available
- Work area prepared and safe
- Module traveler updated with previous phase completion`
}

## 🔧 Equipment & Materials

### Tools Required
- [List specific tools for this phase]
- Personal protective equipment (PPE)
- Measuring and inspection tools

### Materials
${phase.keyMaterials && phase.keyMaterials.length > 0 ?
  phase.keyMaterials.map((m: string) => `- ${m}`).join('\n') :
  '- [List materials specific to this phase]\n- Reference Module Traveler for project-specific materials'
}

## 📝 Procedure Steps

### ${phase.id}.1 Preparation
1. Review module traveler and shop drawings
2. Verify all materials are available and inspected
3. Ensure work area is clean and organized
4. Conduct safety briefing with production team

### ${phase.id}.2 Execution
${phase.workActivities && phase.workActivities.length > 0 ?
  phase.workActivities.map((activity: string, idx: number) => 
    `${idx + 1}. ${activity}`
  ).join('\n') :
  `1. [Step-by-step procedure to be detailed]
2. Follow shop drawings and specifications
3. Maintain quality standards throughout
4. Document completion of each step`
}

### ${phase.id}.3 Quality Verification
1. Self-inspection by production team
2. Verify all work meets specifications
3. Check for any defects or nonconformances
4. Prepare for Hold Point ${phase.holdPoint} inspection

### ${phase.id}.4 Hold Point ${phase.holdPoint} Inspection

**📋 Inspection Criteria:**
${holdPoint && holdPoint.inspectionCriteria ?
  holdPoint.inspectionCriteria.map((c: string) => `- ✓ ${c}`).join('\n') :
  phase.inspectionCriteria && phase.inspectionCriteria.length > 0 ?
    phase.inspectionCriteria.map((c: string) => `- ✓ ${c}`).join('\n') :
    `- All work completed per specifications
- No visible defects or nonconformances
- Measurements within tolerance
- Documentation complete`
}

**🚦 Inspection Process:**
1. QA Manager conducts initial inspection
2. Complete FORM-I${String(phase.id).padStart(3, '0')} inspection form
${tpiaRequired ? 
`3. Coordinate with NTA for third-party inspection
4. NTA inspector verifies compliance
5. NTA approval required to proceed` :
`3. QA Manager approval required to proceed`
}
6. Update module traveler with Hold Point approval
7. Document inspection results in QMS database

**⚠️ CRITICAL:** Module **CANNOT** proceed to Phase ${phase.id + 1} without Hold Point ${phase.holdPoint} approval${tpiaRequired ? ' from NTA' : ''}.

## ⚠️ Quality Requirements

### Critical Quality Points
- [Phase-specific critical quality requirements]
- Dimensional accuracy
- Material specifications
- Workmanship standards

### Inspection & Testing
- Visual inspection for defects
- Dimensional verification
- ${tpiaRequired ? 'NTA compliance verification' : 'QA verification'}
- Photographic documentation

## 🚫 Nonconformances

If nonconformances are identified:
1. **STOP WORK** on affected area
2. Tag and segregate nonconforming work
3. Notify QA Manager immediately
4. Initiate NCR (Nonconformance Report)
5. Determine disposition (rework, repair, scrap)
6. Re-inspect after corrective action
7. Update module traveler and documentation

## 📄 Required Documentation

- [ ] Module Traveler (FORM-QT-001)
- [ ] Hold Point ${phase.holdPoint} Inspection Form (FORM-I${String(phase.id).padStart(3, '0')})
${tpiaRequired ? `- [ ] NTA Inspection Report
- [ ] NTA Approval Documentation\n` : ''}- [ ] Material traceability records
- [ ] Photographs of completed work
- [ ] Any NCRs generated during phase

## 🔗 Related Documents

- **Quality Manual:** QMS-005 (Operations)
- **Work Instructions:** WI-${100 + phase.id}
- **Inspection Form:** FORM-I${String(phase.id).padStart(3, '0')}
${phase.id > 1 ? `- **Previous Phase:** SOP-${99 + phase.id}\n` : ''}${phase.id < 8 ? `- **Next Phase:** SOP-${101 + phase.id}\n` : ''}- **Hold Point Procedures:** SOP-013
- **NCR/CAPA Process:** SOP-004

## 📊 Key Performance Indicators

- First-time quality rate for Phase ${phase.id}
- Hold Point ${phase.holdPoint} pass rate
- Cycle time for phase completion
- NCR frequency for phase
${tpiaRequired ? '- NTA approval rate\n' : ''}

## 📝 Revision History

| Revision | Date | Author | Description |
|:--------:|:----:|:------:|:------------|
| 1.0 | ${new Date().toISOString().split('T')[0]} | ProcedureAgent | Initial creation |

---

**Document Control:**
- Generated by: ProcedureAgent (AI)
- Approved by: [Pending]
- Status: Draft
- Next Review: ${new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
`;
  }

  /**
   * Get hold point information
   */
  private getHoldPointInfo(holdPointCode: string): any {
    if (!this.context.holdPoints || !this.context.holdPoints.holdPoints) {
      return null;
    }

    return this.context.holdPoints.holdPoints.find(
      (hp: any) => hp.id === holdPointCode
    );
  }

  /**
   * Extract title from content
   */
  private extractTitle(content: string): string {
    const match = content.match(/###\s+([^\n]+)/);
    if (match) {
      return match[1].trim().replace(/^[A-Z]+-\d+:\s*/, '');
    }
    
    const fmMatch = content.match(/^---\s+title:\s*"([^"]+)"/m);
    if (fmMatch) {
      return fmMatch[1];
    }
    
    return 'Unknown Procedure';
  }

  /**
   * Store procedure in database
   */
  private async storeInDatabase(
    type: 'sop' | 'wi',
    number: string,
    title: string,
    content: string,
    phase: any
  ): Promise<void> {
    try {
      const existing = await prisma.document.findUnique({
        where: { number },
      });

      if (existing) {
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
        const doc = await prisma.document.create({
          data: {
            type,
            number,
            title,
            content,
            version: '1.0',
            status: 'draft',
          },
        });

        await this.createAuditTrail(doc.id, 'created', { title, content });
      }

      // Also store in Procedure table
      const existingProc = await prisma.procedure.findUnique({
        where: { code: number },
      });

      if (!existingProc) {
        await prisma.procedure.create({
          data: {
            phase: phase.id,
            code: number,
            title,
            description: phase.description || title,
            holdPoint: phase.holdPoint,
            tpiaRequired: phase.tpiaRequired || false,
            duration: phase.durationDays ? parseInt(phase.durationDays.split('-')[0]) : null,
            crewSize: phase.tradeCrews ? phase.tradeCrews.length : null,
            sequence: phase.id,
          },
        });
      }
    } catch (error) {
      console.error('Error storing procedure in database:', error);
    }
  }
}

export default ProcedureAgent;
