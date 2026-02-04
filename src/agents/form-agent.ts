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
    const date = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const checklistItems = this.generateChecklistItems(phase);

    return `\`\`\`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   🏗️ ${company.legal_name || 'FORT HOMES LLC'} QMS                        ${formNumber}       ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ║
║                                                                              ║
║                    ${title.toUpperCase().padEnd(56)}  ║
║                    Phase ${phase.id} | Hold Point ${phase.holdPoint}                                 ║
║                                                                              ║
║   Revision: 2.0  │  Effective: ${date}  │  Retention: 7 Years          ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   📋 MODULE INFORMATION                                                      ║
║   ┌────────────────────────────────────────────────────────────────────┐    ║
║   │                                                                    │    ║
║   │   Module Serial #:  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │    ║
║   │                                                                    │    ║
║   │   Production Bay:   ░░░░░░░░░░░░░░░░    Lot #: ░░░░░░░░░░░░░░   │    ║
║   │                                                                    │    ║
║   │   Model Type:       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │    ║
║   │                                                                    │    ║
║   │   Supervisor:       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │    ║
║   │                                                                    │    ║
║   └────────────────────────────────────────────────────────────────────┘    ║
║                                                                              ║
║   📅 INSPECTION TIMING                                                       ║
║   ┌────────────────────────────────────────────────────────────────────┐    ║
║   │                                                                    │    ║
║   │   Date: ░░░░░░░░░░░░░░░    Time Start: ░░░░░░░   End: ░░░░░░░   │    ║
║   │                                                                    │    ║
║   │   Shift:  □ Day (6am-2pm)   □ Swing (2pm-10pm)   □ Night         │    ║
║   │                                                                    │    ║
║   └────────────────────────────────────────────────────────────────────┘    ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   👤 INSPECTOR INFORMATION                                                   ║
║   ┌────────────────────────────────────────────────────────────────────┐    ║
║   │                                                                    │    ║
║   │   Inspector Name:   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │    ║
║   │                                                                    │    ║
║   │   Inspector ID:     ░░░░░░░░░░░░░░░░   Cert. Exp: ░░░░░░░░░░░   │    ║
║   │                                                                    │    ║
║   └────────────────────────────────────────────────────────────────────┘    ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   🔍 VISUAL INSPECTION CHECKLIST                                             ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ║
║                                                                              ║
${checklistItems}
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   📸 PHOTOGRAPHIC DOCUMENTATION                                              ║
║   ┌────────────────────────────────────────────────────────────────────┐    ║
║   │                                                                    │    ║
║   │   Photos Required: □ Yes  □ No   Total Photos: ░░░░░░░░░         │    ║
║   │                                                                    │    ║
║   │   Photo Storage Location: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │    ║
║   │                                                                    │    ║
║   └────────────────────────────────────────────────────────────────────┘    ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   📊 INSPECTION RESULTS                                                      ║
║   ┌────────────────────────────────────────────────────────────────────┐    ║
║   │                                                                    │    ║
║   │   □ PASS - All items meet requirements, proceed to next phase     │    ║
║   │                                                                    │    ║
║   │   □ CONDITIONAL PASS - Minor defects noted, corrected in-phase    │    ║
║   │                                                                    │    ║
║   │   □ FAIL - Nonconformance found, NCR required                     │    ║
║   │                                                                    │    ║
║   └────────────────────────────────────────────────────────────────────┘    ║
║                                                                              ║
║   🚨 NONCONFORMANCES (If any)                                                ║
║   ┌────────────────────────────────────────────────────────────────────┐    ║
║   │                                                                    │    ║
║   │   NCR Number: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │    ║
║   │                                                                    │    ║
║   │   Description: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │    ║
║   │   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │    ║
║   │                                                                    │    ║
║   └────────────────────────────────────────────────────────────────────┘    ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   ✅ INSPECTOR CERTIFICATION                                                 ║
║   ┌────────────────────────────────────────────────────────────────────┐    ║
║   │                                                                    │    ║
║   │   I certify that this inspection was performed in accordance      │    ║
║   │   with applicable codes and Fort Homes QMS procedures.            │    ║
║   │                                                                    │    ║
║   │   Inspector Signature: ░░░░░░░░░░░░░░░   Date: ░░░░░░░░░░░░░░   │    ║
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
  }

  /**
   * Generate checklist items based on phase activities
   */
  private generateChecklistItems(phase: any): string {
    const activities = phase.workActivities || [];
    let checklist = '';
    let itemNum = 1;

    // Group activities into logical sections
    const sections = this.groupActivitiesBySection(activities);

    for (const [sectionName, items] of Object.entries(sections)) {
      checklist += `║   ${sectionName.toUpperCase().padEnd(76)}║\n`;
      checklist += `║   ┌────┬──────────────────────────────────────────┬────────┬───────────┐    ║\n`;
      checklist += `║   │ #  │ INSPECTION ITEM                          │ STATUS │   NOTES   │    ║\n`;
      checklist += `║   ├────┼──────────────────────────────────────────┼────────┼───────────┤    ║\n`;

      const itemArray = items as string[];
      for (let i = 0; i < itemArray.length; i++) {
        const item = itemArray[i];
        const itemText = item.substring(0, 40).padEnd(40);
        checklist += `║   │ ${itemNum.toString().padStart(2)}  │ ${itemText} │ ✅ ❌  │           │    ║\n`;
        if (i < itemArray.length - 1) {
          checklist += `║   ├────┼──────────────────────────────────────────┼────────┼───────────┤    ║\n`;
        }
        itemNum++;
      }

      checklist += `║   └────┴──────────────────────────────────────────┴────────┴───────────┘    ║\n`;
      checklist += `║                                                                              ║\n`;
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
