/**
 * Procedure Agent
 * Creates SOPs, Work Instructions, and inspection forms
 */

import { BaseAgent, AgentConfig, AgentResult } from './types';
import * as fs from 'fs/promises';
import * as path from 'path';

export class ProcedureAgent extends BaseAgent {
  constructor() {
    super({
      name: 'ProcedureAgent',
      description: 'Creates SOPs and Work Instructions for production phases',
      temperature: 0.6,
      maxTokens: 2000,
    });
  }

  async execute(input: any): Promise<AgentResult> {
    try {
      this.log(`Generating procedure: ${input.type} for phase ${input.phase || 'general'}`);

      const companyData = await this.loadCompanyData();
      const phasesData = await this.loadPhasesData();
      const holdPointsData = await this.loadHoldPointsData();

      let content;
      
      if (input.type === 'sop') {
        content = await this.generateSOP(input, companyData, phasesData, holdPointsData);
      } else if (input.type === 'wi') {
        content = await this.generateWorkInstruction(input, phasesData);
      } else if (input.type === 'form') {
        content = await this.generateInspectionForm(input, holdPointsData);
      } else {
        throw new Error(`Unknown procedure type: ${input.type}`);
      }

      return {
        success: true,
        content,
        metadata: {
          generatedAt: new Date().toISOString(),
          agent: this.config.name,
          type: input.type,
          phase: input.phase,
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

  private async loadCompanyData(): Promise<any> {
    const dataPath = path.join(process.cwd(), 'data', 'company-info.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  }

  private async loadPhasesData(): Promise<any> {
    const dataPath = path.join(process.cwd(), 'data', 'phases.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  }

  private async loadHoldPointsData(): Promise<any> {
    const dataPath = path.join(process.cwd(), 'data', 'hold-points.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  }

  private async generateSOP(
    input: any,
    companyData: any,
    phasesData: any,
    holdPointsData: any
  ): Promise<any> {
    const phase = phasesData.phases.find((p: any) => p.phase === input.phase);
    if (!phase && input.phase) {
      throw new Error(`Phase ${input.phase} not found`);
    }

    const sopNumber = input.phase ? `SOP-${100 + input.phase}` : input.sopNumber || 'SOP-XXX';
    const title = phase ? `${phase.name}` : input.title || 'Standard Operating Procedure';

    return {
      documentNumber: sopNumber,
      title: title,
      version: '1.0',
      effectiveDate: new Date().toISOString().split('T')[0],
      status: 'draft',
      company: companyData.company.legalName,
      content: phase ? this.generatePhaseSOPContent(phase, holdPointsData) : this.generateGenericSOPContent(input),
    };
  }

  private generatePhaseSOPContent(phase: any, holdPointsData: any): string {
    const holdPoint = holdPointsData.holdPoints.find((hp: any) => hp.id === phase.holdPoint);
    
    return `
# SOP: ${phase.name}

## 1. PURPOSE

This Standard Operating Procedure defines the requirements and process for ${phase.name} in modular home manufacturing.

## 2. SCOPE

This SOP applies to all production personnel performing ${phase.name} activities in the manufacturing facility.

## 3. RESPONSIBILITIES

**Bay Supervisor:**
- Coordinate crew scheduling and assignments
- Verify material availability
- Conduct daily safety briefings
- Perform in-process quality checks
- Document work completion

**Trade Crew:**
- Follow work instructions and building codes
- Perform work to specification
- Conduct self-inspection
- Report quality issues immediately
- Maintain clean and safe work area

**QA Inspector:**
- Conduct hold point inspection
- Verify compliance with specifications
- Document inspection results
- Issue NCRs for nonconformances
- Approve phase completion

## 4. PROCEDURE

### 4.1 Prerequisites

Before starting ${phase.name}:
- [ ] Previous phase (${phase.phase > 1 ? `Phase ${phase.phase - 1}` : 'N/A'}) approved
- [ ] Materials staged and verified
- [ ] Tools and equipment available and calibrated
- [ ] Work instructions available at workstation
- [ ] Safety briefing completed
- [ ] Module traveler available

### 4.2 Work Activities

${phase.workActivities.map((activity: string, index: number) => `
**${index + 1}. ${activity}**
- Follow WI-${100 + phase.phase}-${index + 1}
- Verify dimensions and specifications
- Perform self-inspection
- Document completion on traveler
`).join('\n')}

### 4.3 Materials and Equipment

**Materials Required:**
${phase.materials.map((m: string) => `- ${m}`).join('\n')}

**Tools and Equipment:**
${phase.equipment.map((e: string) => `- ${e}`).join('\n')}

**Trade Crews:**
${phase.tradeCrews.map((c: string) => `- ${c}`).join('\n')}

### 4.4 Quality Control

**In-Process Checks:**
- Dimensional verification at key points
- Material conformance to specifications
- Workmanship per building codes
- Installation per manufacturer instructions

**Self-Inspection:**
Each tradesperson verifies:
- Work complete per WI
- No defects or damage
- Measurements within tolerance
- Ready for inspection

### 4.5 Hold Point Inspection (${phase.holdPoint})

${holdPoint ? `
**Inspection Criteria:**
${holdPoint.inspectionCriteria.map((c: any) => `- ${c.criterion}: ${c.acceptanceCriteria}`).join('\n')}

**NTA Notification:**
${holdPoint.ntaRequired ? `Third-party inspection required. Notify NTA minimum ${holdPoint.notificationDays} days in advance.` : 'Internal inspection only.'}

**Inspection Process:**
1. Bay supervisor completes self-inspection
2. QA inspector conducts independent inspection
3. All criteria verified and documented
4. NCRs issued for any nonconformances
5. Corrective actions completed and verified
6. Module traveler signed off
7. Approval granted to proceed to next phase

**Pass Criteria:**
${holdPoint.passConditions.map((c: string) => `- ${c}`).join('\n')}

**Fail Actions:**
${holdPoint.failActions.map((a: string) => `- ${a}`).join('\n')}
` : 'Internal quality check performed by QA team.'}

## 5. DOCUMENTATION

**Required Records:**
- Module traveler with activity checkoffs
- Hold point inspection form (FORM-${phase.holdPoint})
- Material certifications and lot traceability
- NCRs (if applicable)
- NTA inspection report (if applicable)
- Photographs (key stages)

## 6. SAFETY REQUIREMENTS

- Personal protective equipment (PPE) required at all times
- Fall protection for work above 6 feet
- Lockout/tagout for electrical work
- Confined space procedures (if applicable)
- Fire watch for hot work
- Ventilation for chemical use

## 7. REFERENCES

- International Residential Code (IRC 2021)
- National Electrical Code (NEC 2023) [if electrical work]
- International Plumbing Code (IPC 2021) [if plumbing work]
- IECC 2021 [if insulation/energy work]
- Manufacturer installation instructions
- Module work instructions (WI-${100 + phase.phase}-XX)

## 8. REVISION HISTORY

| Version | Date | Changes | Approved By |
|---------|------|---------|-------------|
| 1.0 | ${new Date().toLocaleDateString()} | Initial Release | QA Manager |

---

**Prepared by:** Quality Assurance Manager  
**Approved by:** Chief Operating Officer  
**Effective Date:** ${new Date().toLocaleDateString()}
    `.trim();
  }

  private generateGenericSOPContent(input: any): string {
    return `
# ${input.title || 'Standard Operating Procedure'}

## 1. PURPOSE

[Define the purpose of this procedure]

## 2. SCOPE

[Define the scope and applicability]

## 3. RESPONSIBILITIES

[Define roles and responsibilities]

## 4. PROCEDURE

[Detail the procedure steps]

## 5. DOCUMENTATION

[List required records and forms]

## 6. REFERENCES

[List applicable references and standards]

---

**Prepared by:** Quality Assurance Manager  
**Approved by:** Chief Operating Officer  
**Effective Date:** ${new Date().toLocaleDateString()}
    `.trim();
  }

  private async generateWorkInstruction(input: any, phasesData: any): Promise<any> {
    const phase = phasesData.phases.find((p: any) => p.phase === input.phase);
    if (!phase) {
      throw new Error(`Phase ${input.phase} not found`);
    }

    const wiNumber = `WI-${100 + input.phase}-${input.activityIndex || 1}`;
    const activity = phase.workActivities[input.activityIndex || 0];

    return {
      documentNumber: wiNumber,
      title: activity || `${phase.name} - Activity ${input.activityIndex || 1}`,
      version: '1.0',
      effectiveDate: new Date().toISOString().split('T')[0],
      status: 'draft',
      phase: phase.phase,
      content: `
# Work Instruction: ${activity}

## PHASE: ${phase.phase} - ${phase.name}

## ACTIVITY: ${activity}

## TOOLS AND MATERIALS

**Tools:**
${phase.equipment.slice(0, 5).map((e: string) => `- ${e}`).join('\n')}

**Materials:**
${phase.materials.slice(0, 5).map((m: string) => `- ${m}`).join('\n')}

## SAFETY PRECAUTIONS

- [ ] Wear appropriate PPE (safety glasses, gloves, hearing protection)
- [ ] Verify area is clear of hazards
- [ ] Ensure adequate lighting
- [ ] Check tool condition before use
- [ ] Follow lockout/tagout if applicable

## STEP-BY-STEP INSTRUCTIONS

### Step 1: Preparation
- Review module specifications and drawings
- Verify materials match specifications
- Stage materials in work area
- Inspect materials for damage

### Step 2: Layout and Measurement
- Mark reference lines per drawings
- Verify dimensions
- Double-check critical measurements
- Document measurements on traveler

### Step 3: Installation/Execution
- Follow building code requirements
- Install per manufacturer instructions
- Maintain proper spacing and alignment
- Use specified fasteners and adhesives

### Step 4: Verification
- Check dimensions and alignment
- Verify all connections secure
- Inspect for defects or damage
- Ensure compliance with specifications

### Step 5: Documentation
- Initial traveler for activity completion
- Note any deviations or issues
- Take photos of completed work
- Prepare for inspection

## QUALITY CHECKS

**Dimensional:**
- All measurements within ±1/8" tolerance
- Level and plumb verified
- Proper spacing maintained

**Material:**
- Correct materials used
- No defects or damage
- Proper grade/rating verified

**Workmanship:**
- Clean and professional appearance
- No gaps or voids
- Secure connections
- Code compliant installation

## ACCEPTANCE CRITERIA

- [ ] All steps completed per this WI
- [ ] Dimensions within specification
- [ ] Materials correct and undamaged
- [ ] Workmanship meets quality standards
- [ ] No safety hazards present
- [ ] Traveler documented

## TROUBLESHOOTING

**Problem:** Dimensions don't match drawings
**Solution:** Verify drawings are current revision; consult supervisor

**Problem:** Material defect discovered
**Solution:** Tag material as defective; request replacement; document NCR

**Problem:** Uncertain about specification
**Solution:** Stop work; consult drawings, WI, or supervisor; do not proceed

## RELATED DOCUMENTS

- SOP-${100 + phase.phase}: ${phase.name}
- Module drawings and specifications
- Manufacturer installation instructions
- Building code references

---

**Prepared by:** Quality Assurance Department  
**Approved by:** Production Manager  
**Effective Date:** ${new Date().toLocaleDateString()}
**Version:** 1.0
      `.trim(),
    };
  }

  private async generateInspectionForm(input: any, holdPointsData: any): Promise<any> {
    const holdPoint = holdPointsData.holdPoints.find((hp: any) => hp.id === input.holdPointId);
    if (!holdPoint) {
      throw new Error(`Hold point ${input.holdPointId} not found`);
    }

    return {
      documentNumber: `FORM-${holdPoint.id}`,
      title: `Inspection Form - ${holdPoint.id}`,
      version: '1.0',
      effectiveDate: new Date().toISOString().split('T')[0],
      status: 'draft',
      holdPointId: holdPoint.id,
      content: {
        formTitle: `HOLD POINT INSPECTION FORM`,
        holdPointId: holdPoint.id,
        phase: holdPoint.phase,
        description: holdPoint.description,
        ntaRequired: holdPoint.ntaRequired,
        sections: [
          {
            title: 'Module Information',
            fields: [
              { label: 'Module Number', type: 'text', required: true },
              { label: 'Customer Name', type: 'text', required: true },
              { label: 'Model/Plan', type: 'text', required: true },
              { label: 'Bay Number', type: 'select', options: ['Bay 1', 'Bay 2', 'Bay 3', 'Bay 4', 'Bay 5'], required: true },
              { label: 'Inspection Date', type: 'date', required: true },
            ],
          },
          {
            title: 'Inspection Criteria',
            fields: holdPoint.inspectionCriteria.map((c: any) => ({
              label: c.criterion,
              type: 'checkbox-with-notes',
              acceptanceCriteria: c.acceptanceCriteria,
              required: true,
            })),
          },
          {
            title: 'Pass/Fail Conditions',
            fields: holdPoint.passConditions.map((condition: string) => ({
              label: condition,
              type: 'checkbox',
              required: true,
            })),
          },
          {
            title: 'Inspection Results',
            fields: [
              { label: 'Overall Result', type: 'radio', options: ['PASS', 'FAIL'], required: true },
              { label: 'NCRs Generated', type: 'text', placeholder: 'NCR numbers if any' },
              { label: 'Comments/Notes', type: 'textarea', rows: 4 },
              { label: 'Photos Attached', type: 'checkbox' },
            ],
          },
          {
            title: 'Approvals',
            fields: [
              { label: 'Bay Supervisor', type: 'text', required: true },
              { label: 'Bay Supervisor Signature', type: 'signature', required: true },
              { label: 'Date', type: 'date', required: true },
              { label: 'QA Inspector', type: 'text', required: true },
              { label: 'QA Inspector Signature', type: 'signature', required: true },
              { label: 'Date', type: 'date', required: true },
            ],
          },
        ],
      },
    };
  }
}
