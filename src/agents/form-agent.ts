/**
 * Form Agent
 * Fort Homes QMS - Generates inspection forms, NCR forms, and templates
 */

import { BaseAgent, AgentConfig } from './base-agent';
import { prisma } from '../database';
import fs from 'fs';
import path from 'path';

export interface FormDocument {
  type: 'inspection' | 'ncr' | 'approval' | 'training' | 'checklist';
  number: string;
  title: string;
  content: string;
  phase?: number;
  holdPoint?: string;
}

export class FormAgent extends BaseAgent {
  constructor() {
    super({
      name: 'FormAgent',
      description: 'Generates QMS forms including inspection forms, NCR templates, and approval forms',
      temperature: 0.5,
      maxTokens: 4000,
    });
  }

  /**
   * Execute form generation
   */
  async execute(
    type: 'inspection' | 'ncr' | 'approval' | 'training' | 'checklist',
    phaseNumber?: number
  ): Promise<FormDocument[]> {
    if (type === 'inspection' && phaseNumber !== undefined) {
      return [await this.generateInspectionForm(phaseNumber)];
    }

    if (type === 'inspection') {
      return await this.generateAllInspectionForms();
    }

    if (type === 'ncr') {
      return [await this.generateNCRForm()];
    }

    if (type === 'approval') {
      return [await this.generateApprovalForm()];
    }

    if (type === 'training') {
      return [await this.generateTrainingForm()];
    }

    if (type === 'checklist') {
      return [await this.generateChecklistForm()];
    }

    throw new Error(`Unknown form type: ${type}`);
  }

  /**
   * Generate all inspection forms (Phases 1-8)
   */
  private async generateAllInspectionForms(): Promise<FormDocument[]> {
    const forms: FormDocument[] = [];

    for (let phase = 1; phase <= 8; phase++) {
      try {
        const form = await this.generateInspectionForm(phase);
        forms.push(form);
      } catch (error) {
        console.error(`Error generating inspection form for phase ${phase}:`, error);
      }
    }

    return forms;
  }

  /**
   * Generate inspection form for a specific phase
   */
  async generateInspectionForm(phaseNumber: number): Promise<FormDocument> {
    console.log(`Generating inspection form for Phase ${phaseNumber}`);

    // Get phase information
    const phase = this.getPhaseInfo(phaseNumber);
    if (!phase) {
      throw new Error(`Phase ${phaseNumber} not found`);
    }

    const formNumber = `FORM-I${100 + phaseNumber}`;

    // Check if form already exists
    const existingPath = this.findExistingForm(formNumber);
    if (existingPath) {
      const content = fs.readFileSync(existingPath, 'utf-8');
      const title = this.extractTitle(content, phase.name);

      console.log(`✓ Loaded existing form: ${formNumber} - ${title}`);

      return {
        type: 'inspection',
        number: formNumber,
        title,
        content,
        phase: phaseNumber,
        holdPoint: phase.holdPoint,
      };
    }

    // Generate new form
    return await this.generateNewInspectionForm(phaseNumber, formNumber, phase);
  }

  /**
   * Generate new inspection form content
   */
  private async generateNewInspectionForm(
    phaseNumber: number,
    formNumber: string,
    phase: any
  ): Promise<FormDocument> {
    const title = `${phase.name} Inspection`;
    const content = this.createInspectionFormContent(formNumber, title, phase);

    // Store in database
    await this.storeInDatabase(formNumber, title, content, 'inspection');

    console.log(`✓ Generated new form: ${formNumber} - ${title}`);

    return {
      type: 'inspection',
      number: formNumber,
      title,
      content,
      phase: phaseNumber,
      holdPoint: phase.holdPoint,
    };
  }

  /**
   * Create inspection form content
   */
  private createInspectionFormContent(
    formNumber: string,
    title: string,
    phase: any
  ): string {
    const company = this.context.companyInfo?.company || {};
    const { ProfessionalFormatter } = require('../lib/professional-formatter');

    const checklistItems = this.generateChecklistItems(phase);

    const header = ProfessionalFormatter.generateDocumentHeader({
      documentId: formNumber,
      title: `${title} - Phase ${phase.id}`,
      revision: '2.0',
      effectiveDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      processOwner: 'QA Manager',
      classification: 'CONTROLLED',
      reviewDate: 'Annual'
    });

    const footer = ProfessionalFormatter.generateDocumentFooter({
      documentId: formNumber,
      title: title,
      revision: '2.0',
      effectiveDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      processOwner: 'QA Manager',
      classification: 'CONTROLLED'
    });

    return `${header}

<!-- Form Content -->

<div style="background: #e3f2fd; border-left: 4px solid #2196F3; padding: 15px; margin: 20px 0;" class="no-break">
  <h3 style="margin-top: 0; color: #1976D2;">📋 Inspection Overview</h3>
  <p style="margin-bottom: 5px;"><strong>Phase:</strong> ${phase.id} - ${phase.name}</p>
  <p style="margin-bottom: 5px;"><strong>Hold Point:</strong> ${phase.holdPoint}</p>
  <p style="margin-bottom: 5px;"><strong>TPIA Required:</strong> ${phase.tpiaRequired ? 'Yes - NTA Inspector must verify' : 'No - Internal inspection only'}</p>
  <p style="margin-bottom: 0;"><strong>Purpose:</strong> Verify completion and quality of all work activities before proceeding to next phase</p>
</div>

<h2>${ProfessionalFormatter.formatSectionNumber(1)} Module Information</h2>

<div class="no-break">
${ProfessionalFormatter.generateTable(
  ['Field', 'Value'],
  [
    ['Module Serial Number', '___________________________________________'],
    ['Production Bay', '_______________ Lot Number: _______________'],
    ['Model Type', '___________________________________________'],
    ['Production Supervisor', '___________________________________________'],
    ['Inspection Date', '_______________ Time: _______________'],
    ['Production Shift', '☐ Day (6am-2pm)  ☐ Swing (2pm-10pm)  ☐ Night']
  ]
)}
</div>

<h2>${ProfessionalFormatter.formatSectionNumber(2)} Inspector Information</h2>

<div class="no-break">
${ProfessionalFormatter.generateTable(
  ['Field', 'Value'],
  [
    ['Inspector Name', '___________________________________________'],
    ['Inspector ID', '_______________ Certification Exp: _______________'],
    ['Inspector Type', '☐ Internal QA  ☐ NTA TPIA  ☐ Other: _______________']
  ]
)}
</div>

<h2>${ProfessionalFormatter.formatSectionNumber(3)} Inspection Checklist</h2>

<p>Verify each item below meets requirements. Mark as <strong>PASS (✓)</strong> or <strong>FAIL (✗)</strong>. Document any deficiencies in the Comments section.</p>

${checklistItems}

<h2>${ProfessionalFormatter.formatSectionNumber(4)} Measurement and Testing</h2>

<div class="no-break">
${phase.tpiaRequired ? `
<div style="background: #fff3cd; border-left: 4px solid #ff9800; padding: 15px; margin: 10px 0;">
  <strong>⚠️ TPIA VERIFICATION REQUIRED</strong><br>
  NTA Third-Party Inspector must verify and sign before module proceeds to next phase.
</div>
` : ''}

${ProfessionalFormatter.generateTable(
  ['Test/Measurement', 'Specification', 'Result', 'Pass/Fail'],
  phase.id === 4 ? [
    ['Electrical Panel Installation', 'Per NEC 2023', '_______________', '☐ P ☐ F'],
    ['Water Pressure Test', '100 PSI, 15 min hold', '_______________', '☐ P ☐ F'],
    ['DWV Test', '10 ft water OR 5 PSI air, 15 min', '_______________', '☐ P ☐ F'],
    ['HVAC Line Set', 'Leak test per mfg specs', '_______________', '☐ P ☐ F']
  ] : [
    ['Dimensional Check', 'Per approved plans', '_______________', '☐ P ☐ F'],
    ['Visual Inspection', 'No defects/damage', '_______________', '☐ P ☐ F'],
    ['Material Verification', 'Per bill of materials', '_______________', '☐ P ☐ F']
  ]
)}
</div>

<h2>${ProfessionalFormatter.formatSectionNumber(5)} Photographic Documentation</h2>

<div class="no-break" style="border: 1px solid #ddd; padding: 15px; background: #fafafa;">
  <p><strong>Photos Required:</strong> ☐ Yes  ☐ No  &nbsp;&nbsp;&nbsp; <strong>Total Photos Taken:</strong> ___________</p>
  <p><strong>Photo Storage Location:</strong> ___________________________________________</p>
  <p style="font-size: 9pt; color: #666; margin: 10px 0 0 0;">
    Note: Photographic documentation is required for all hold points. Photos must clearly show 
    completed work and any deficiencies identified.
  </p>
</div>

<h2>${ProfessionalFormatter.formatSectionNumber(6)} Inspection Results</h2>

<div class="no-break" style="border: 2px solid #333; padding: 20px; margin: 20px 0;">
  <h3 style="margin-top: 0;">Final Determination</h3>
  
  <div style="margin: 15px 0;">
    <label style="display: block; padding: 10px; border: 2px solid #4CAF50; background: #f1f8f4; margin-bottom: 10px;">
      <input type="checkbox"> <strong>PASS</strong> - All items meet requirements. Module may proceed to next phase.
    </label>
    
    <label style="display: block; padding: 10px; border: 2px solid #FF9800; background: #fff8e1; margin-bottom: 10px;">
      <input type="checkbox"> <strong>CONDITIONAL PASS</strong> - Minor defects noted and corrected during this phase. See comments.
    </label>
    
    <label style="display: block; padding: 10px; border: 2px solid #f44336; background: #ffebee;">
      <input type="checkbox"> <strong>FAIL</strong> - Nonconformance found. NCR required. Module held at this phase.
    </label>
  </div>
  
  <h3>Comments and Observations</h3>
  <div style="border: 1px solid #666; min-height: 100px; padding: 10px; background: white;">
    
  </div>
</div>

<h2>${ProfessionalFormatter.formatSectionNumber(7)} Nonconformances (If Applicable)</h2>

<div class="no-break">
${ProfessionalFormatter.generateTable(
  ['Field', 'Value'],
  [
    ['NCR Number (if applicable)', '___________________________________________'],
    ['Description of Nonconformance', '___________________________________________'],
    ['', '___________________________________________'],
    ['Corrective Action Required', '___________________________________________'],
    ['', '___________________________________________']
  ]
)}
</div>

${ProfessionalFormatter.generateSignatureBlock([
  'Inspector Signature',
  'Production Supervisor',
  phase.tpiaRequired ? 'NTA TPIA Inspector (Required)' : 'QA Manager Approval'
])}

<div class="confidentiality-notice">
  <strong>INSPECTION CERTIFICATION:</strong> I certify that this inspection was performed in 
  accordance with Fort Homes LLC procedures, applicable building codes (IRC 2021, NEC 2023, IPC 2021), 
  and Colorado Division of Housing regulations (8 CCR 1302-14).
</div>

${footer}
`;
  }

  /**
   * Generate checklist items based on phase activities
   */
  private generateChecklistItems(phase: any): string {
    const activities = phase.workActivities || [];
    const { ProfessionalFormatter } = require('../lib/professional-formatter');

    // Group activities into logical sections
    const sections = this.groupActivitiesBySection(activities);
    let checklist = '';

    for (const [sectionName, items] of Object.entries(sections)) {
      const itemArray = items as string[];
      const rows = itemArray.map((item, index) => [
        `${index + 1}`,
        item,
        '☐ Pass  ☐ Fail',
        '_______________'
      ]);

      checklist += `<h3 class="no-break">${sectionName}</h3>\n`;
      checklist += ProfessionalFormatter.generateTable(
        ['#', 'Inspection Item', 'Result', 'Comments'],
        rows
      );
      checklist += '\n';
    }

    return checklist;
  }

  /**
   * Group activities into logical sections
   */
  private groupActivitiesBySection(activities: string[]): Record<string, string[]> {
    // For now, create a single section
    // In the future, could use AI to intelligently group activities
    if (activities.length === 0) {
      return {
        'General Inspection': [
          'Visual inspection complete',
          'All components properly installed',
          'No visible defects or damage',
          'Measurements within tolerance',
        ],
      };
    }

    return {
      'Work Activities Verification': activities.slice(0, 10),
    };
  }

  /**
   * Generate NCR (Nonconformance Report) form
   */
  private async generateNCRForm(): Promise<FormDocument> {
    console.log('Generating NCR form');

    const formNumber = 'FORM-NCR-001';
    const title = 'Nonconformance Report';
    const company = this.context.companyInfo?.company || {};

    const content = `\`\`\`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   🏗️ ${company.legal_name || 'FORT HOMES LLC'} QMS                        ${formNumber}  ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ║
║                                                                              ║
║                    NONCONFORMANCE REPORT (NCR)                               ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   📋 NCR INFORMATION                                                         ║
║   ┌────────────────────────────────────────────────────────────────────┐    ║
║   │                                                                    │    ║
║   │   NCR Number:       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │    ║
║   │                                                                    │    ║
║   │   Date Identified:  ░░░░░░░░░░░░░░░    Time: ░░░░░░░░░░░░░░░░   │    ║
║   │                                                                    │    ║
║   │   Module Serial #:  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │    ║
║   │                                                                    │    ║
║   │   Phase:            ░░░░░░░░░░░░░░░    Hold Point: ░░░░░░░░░░   │    ║
║   │                                                                    │    ║
║   └────────────────────────────────────────────────────────────────────┘    ║
║                                                                              ║
║   🚨 SEVERITY LEVEL                                                          ║
║   ┌────────────────────────────────────────────────────────────────────┐    ║
║   │                                                                    │    ║
║   │   □ CRITICAL - Safety/Code violation, immediate action required   │    ║
║   │   □ MAJOR - Significant quality impact, must be corrected         │    ║
║   │   □ MINOR - Cosmetic/documentation issue, can be addressed        │    ║
║   │                                                                    │    ║
║   └────────────────────────────────────────────────────────────────────┘    ║
║                                                                              ║
║   📝 DESCRIPTION OF NONCONFORMANCE                                           ║
║   ┌────────────────────────────────────────────────────────────────────┐    ║
║   │                                                                    │    ║
║   │   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │    ║
║   │   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │    ║
║   │   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │    ║
║   │                                                                    │    ║
║   └────────────────────────────────────────────────────────────────────┘    ║
║                                                                              ║
║   🔍 ROOT CAUSE ANALYSIS                                                     ║
║   ┌────────────────────────────────────────────────────────────────────┐    ║
║   │                                                                    │    ║
║   │   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │    ║
║   │   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │    ║
║   │                                                                    │    ║
║   └────────────────────────────────────────────────────────────────────┘    ║
║                                                                              ║
║   ✅ CORRECTIVE ACTION                                                       ║
║   ┌────────────────────────────────────────────────────────────────────┐    ║
║   │                                                                    │    ║
║   │   Action Taken: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │    ║
║   │   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │    ║
║   │                                                                    │    ║
║   │   Completed By: ░░░░░░░░░░░░░░░░░   Date: ░░░░░░░░░░░░░░░░░░░░  │    ║
║   │                                                                    │    ║
║   └────────────────────────────────────────────────────────────────────┘    ║
║                                                                              ║
║   ✓ VERIFICATION                                                             ║
║   ┌────────────────────────────────────────────────────────────────────┐    ║
║   │                                                                    │    ║
║   │   Verified By: ░░░░░░░░░░░░░░░░░░░   Date: ░░░░░░░░░░░░░░░░░░░  │    ║
║   │                                                                    │    ║
║   │   QA Manager Approval: ░░░░░░░░░░░   Date: ░░░░░░░░░░░░░░░░░░░  │    ║
║   │                                                                    │    ║
║   └────────────────────────────────────────────────────────────────────┘    ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
\`\`\`

---

**Document Control:**
- Form ID: ${formNumber}
- Created: ${new Date().toISOString().split('T')[0]}
- Generated by: FormAgent (AI)
- Status: Active
`;

    await this.storeInDatabase(formNumber, title, content, 'ncr');
    console.log(`✓ Generated NCR form: ${formNumber}`);

    return {
      type: 'ncr',
      number: formNumber,
      title,
      content,
    };
  }

  /**
   * Generate approval form
   */
  private async generateApprovalForm(): Promise<FormDocument> {
    const formNumber = 'FORM-APP-001';
    const title = 'Document Approval Form';
    const company = this.context.companyInfo?.company || {};

    const content = `# Document Approval Form

**Form ID:** ${formNumber}  
**Company:** ${company.legal_name || 'Fort Homes LLC'}

## Document Information
- Document Number: ________________
- Document Title: ________________
- Revision: ________________
- Date: ________________

## Approval Chain

### Preparer
- Name: ________________
- Signature: ________________
- Date: ________________

### Reviewer
- Name: ________________
- Signature: ________________
- Date: ________________

### QA Manager Approval
- Name: ________________
- Signature: ________________
- Date: ________________

---

**Document Control:**
- Form ID: ${formNumber}
- Created: ${new Date().toISOString().split('T')[0]}
- Generated by: FormAgent (AI)
`;

    await this.storeInDatabase(formNumber, title, content, 'approval');
    console.log(`✓ Generated approval form: ${formNumber}`);

    return {
      type: 'approval',
      number: formNumber,
      title,
      content,
    };
  }

  /**
   * Generate training form
   */
  private async generateTrainingForm(): Promise<FormDocument> {
    const formNumber = 'FORM-TRN-001';
    const title = 'Training Acknowledgment Form';
    const company = this.context.companyInfo?.company || {};

    const content = `# Training Acknowledgment Form

**Form ID:** ${formNumber}  
**Company:** ${company.legal_name || 'Fort Homes LLC'}

## Trainee Information
- Name: ________________
- Employee ID: ________________
- Position: ________________
- Department: ________________

## Training Information
- Training Topic: ________________
- Training Date: ________________
- Trainer Name: ________________
- Duration: ________________ hours

## Acknowledgment

I acknowledge that I have received and understood the training provided.

- Trainee Signature: ________________
- Date: ________________

- Trainer Signature: ________________
- Date: ________________

---

**Document Control:**
- Form ID: ${formNumber}
- Created: ${new Date().toISOString().split('T')[0]}
- Generated by: FormAgent (AI)
`;

    await this.storeInDatabase(formNumber, title, content, 'training');
    console.log(`✓ Generated training form: ${formNumber}`);

    return {
      type: 'training',
      number: formNumber,
      title,
      content,
    };
  }

  /**
   * Generate checklist form
   */
  private async generateChecklistForm(): Promise<FormDocument> {
    const formNumber = 'FORM-CHK-001';
    const title = 'Quality Checklist';

    const content = `# Quality Checklist

**Form ID:** ${formNumber}

## Checklist Items
- [ ] Item 1
- [ ] Item 2
- [ ] Item 3

---

**Document Control:**
- Form ID: ${formNumber}
- Created: ${new Date().toISOString().split('T')[0]}
- Generated by: FormAgent (AI)
`;

    await this.storeInDatabase(formNumber, title, content, 'checklist');
    console.log(`✓ Generated checklist form: ${formNumber}`);

    return {
      type: 'checklist',
      number: formNumber,
      title,
      content,
    };
  }

  /**
   * Helper: Get phase info from context
   */
  private getPhaseInfo(phaseNumber: number): any {
    const phases = this.context.phases?.phases || [];
    return phases.find((p: any) => p.id === phaseNumber);
  }

  /**
   * Helper: Find existing form file
   */
  private findExistingForm(formNumber: string): string | null {
    const formsDir = path.join(process.cwd(), 'docs', 'forms-templates');
    const glob = require('fast-glob');

    try {
      const files = glob.sync(`${formsDir}/${formNumber}*.md`);
      return files.length > 0 ? files[0] : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Helper: Extract title from content
   */
  private extractTitle(content: string, fallback: string): string {
    // Try to extract from form header
    const match = content.match(/\s+([A-Z\s]+INSPECTION)\s+/);
    if (match) {
      return match[1].trim();
    }
    return fallback;
  }

  /**
   * Store form in database
   */
  private async storeInDatabase(
    number: string,
    title: string,
    content: string,
    type: string
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
            status: 'active',
            updatedAt: new Date(),
          },
        });

        await this.createAuditTrail(existing.id, 'updated', { title, content });
      } else {
        const doc = await prisma.document.create({
          data: {
            type: 'form',
            number,
            title,
            content,
            version: '1.0',
            status: 'active',
          },
        });

        await this.createAuditTrail(doc.id, 'created', { title, content });
      }
    } catch (error) {
      console.error('Error storing form in database:', error);
    }
  }
}

export default FormAgent;
