/**
 * Training Agent
 * Fort Homes QMS - Generates training materials and competency assessments
 */

import { BaseAgent, AgentConfig } from './base-agent';
import { prisma } from '../database';
import fs from 'fs';
import path from 'path';

export interface TrainingDocument {
  type: 'matrix' | 'material' | 'assessment' | 'record' | 'acknowledgment';
  number: string;
  title: string;
  content: string;
  role?: string;
  topic?: string;
}

export class TrainingAgent extends BaseAgent {
  constructor() {
    super({
      name: 'TrainingAgent',
      description: 'Generates training materials, competency assessments, and training records',
      temperature: 0.6,
      maxTokens: 5000,
    });
  }

  /**
   * Execute training document generation
   */
  async execute(
    type: 'matrix' | 'material' | 'assessment' | 'record' | 'acknowledgment',
    options?: { role?: string; topic?: string; phase?: number }
  ): Promise<TrainingDocument[]> {
    if (type === 'matrix') {
      return [await this.generateTrainingMatrix(options?.role)];
    }

    if (type === 'material') {
      if (options?.phase !== undefined) {
        return [await this.generatePhaseTrainingMaterial(options.phase)];
      }
      if (options?.topic) {
        return [await this.generateTopicTrainingMaterial(options.topic)];
      }
      throw new Error('Training material requires either phase or topic');
    }

    if (type === 'assessment') {
      return [await this.generateCompetencyAssessment(options?.role, options?.topic)];
    }

    if (type === 'record') {
      return [await this.generateTrainingRecord()];
    }

    if (type === 'acknowledgment') {
      return [await this.generateAcknowledgmentForm()];
    }

    throw new Error(`Unknown training document type: ${type}`);
  }

  /**
   * Generate training matrix for a role
   */
  private async generateTrainingMatrix(role?: string): Promise<TrainingDocument> {
    console.log(`Generating training matrix${role ? ' for ' + role : ''}`);

    const docNumber = role ? `TRAIN-MATRIX-${role.toUpperCase().replace(/\s+/g, '-')}` : 'TRAIN-MATRIX-ALL';
    const title = role ? `Training Matrix - ${role}` : 'Comprehensive Training Matrix';

    // Check if matrix already exists
    const existingPath = this.findExistingTrainingDoc(docNumber);
    if (existingPath) {
      const content = fs.readFileSync(existingPath, 'utf-8');
      console.log(`✓ Loaded existing training matrix: ${docNumber}`);

      return {
        type: 'matrix',
        number: docNumber,
        title,
        content,
        role,
      };
    }

    // Generate new training matrix
    const content = this.createTrainingMatrixContent(docNumber, title, role);
    await this.storeInDatabase(docNumber, title, content, 'training');

    console.log(`✓ Generated training matrix: ${docNumber}`);

    return {
      type: 'matrix',
      number: docNumber,
      title,
      content,
      role,
    };
  }

  /**
   * Create training matrix content
   */
  private createTrainingMatrixContent(docNumber: string, title: string, role?: string): string {
    const company = this.context.companyInfo?.company || {};
    const date = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const roles = role ? [role] : this.getStandardRoles();
    let matrixContent = '';

    for (const currentRole of roles) {
      const requirements = this.getTrainingRequirements(currentRole);
      matrixContent += this.formatRoleTrainingSection(currentRole, requirements);
    }

    return `# ${title}

**Document ID:** ${docNumber}  
**Company:** ${company.legal_name || 'Fort Homes LLC'}  
**Effective Date:** ${date}  
**Process Owner:** HR Manager  
**Review Cycle:** Annual

---

## 📋 Purpose

This training matrix defines mandatory training requirements for Fort Homes personnel to ensure competency in quality management, regulatory compliance, and safe production practices.

## 🎯 Scope

Applies to all ${role || 'Fort Homes'} personnel involved in modular home manufacturing and quality management.

---

${matrixContent}

---

## 📊 Training Delivery Methods

| Method | Description | Typical Duration |
|:-------|:------------|:----------------|
| **Classroom** | Instructor-led training in classroom | 1-8 hours |
| **OJT** | On-the-job training with mentor | 2-40 hours |
| **Online** | Self-paced e-learning modules | 1-4 hours |
| **Practical** | Hands-on demonstration and practice | 2-8 hours |
| **External** | Third-party training provider | Varies |

## 📝 Training Records

All training records shall be maintained for a minimum of 5 years post-employment and include:
- Training date and duration
- Training content/topic
- Trainer name and qualifications
- Trainee performance/assessment results
- Signed acknowledgment of understanding

## ✅ Competency Verification

Competency is verified through:
- Written examinations (minimum 80-90% pass score)
- Practical demonstrations
- On-the-job observations
- Supervisor assessments

---

**Document Control:**
- Document ID: ${docNumber}
- Created: ${new Date().toISOString().split('T')[0]}
- Generated by: TrainingAgent (AI)
- Status: Active
`;
  }

  /**
   * Format role training section
   */
  private formatRoleTrainingSection(role: string, requirements: any[]): string {
    let section = `## ${role}\n\n`;
    section += `### Required Training\n\n`;
    section += `| Training Topic | Delivery | Duration | Initial Due | Frequency | Certification | Pass Criteria |\n`;
    section += `|:---------------|:---------|:--------:|:------------|:----------|:--------------|:--------------|\n`;

    for (const req of requirements) {
      section += `| ${req.topic} | ${req.delivery} | ${req.duration} | ${req.initialDue} | ${req.frequency} | ${req.certification} | ${req.passCriteria} |\n`;
    }

    section += `\n`;
    return section;
  }

  /**
   * Get standard roles
   */
  private getStandardRoles(): string[] {
    return [
      'Production Operator',
      'Production Supervisor',
      'Quality Inspector',
      'QA Manager',
      'Maintenance Technician',
    ];
  }

  /**
   * Get training requirements for a role
   */
  private getTrainingRequirements(role: string): any[] {
    const baseRequirements = [
      {
        topic: 'Orientation & Safety',
        delivery: 'Classroom',
        duration: '4 hrs',
        initialDue: 'Day 1',
        frequency: 'Annual',
        certification: 'Yes',
        passCriteria: '≥80% test',
      },
      {
        topic: 'Quality Standards',
        delivery: 'Classroom',
        duration: '2 hrs',
        initialDue: 'Week 1',
        frequency: 'Annual',
        certification: 'No',
        passCriteria: 'Sign-off',
      },
    ];

    // Add role-specific requirements
    if (role.includes('Inspector') || role.includes('QA')) {
      return [
        ...baseRequirements,
        {
          topic: 'Colorado DOH Regulations (8 CCR 1302-14)',
          delivery: 'Classroom',
          duration: '8 hrs',
          initialDue: 'Month 1',
          frequency: 'Annual',
          certification: 'Yes',
          passCriteria: '≥90% exam',
        },
        {
          topic: 'NTA TPIA Interface',
          delivery: 'Classroom + OJT',
          duration: '8 hrs',
          initialDue: 'Month 1',
          frequency: 'Semi-annual',
          certification: 'No',
          passCriteria: 'Observation',
        },
        {
          topic: 'NCR/CAPA Process',
          delivery: 'Classroom',
          duration: '8 hrs',
          initialDue: 'Month 1',
          frequency: 'Annual',
          certification: 'No',
          passCriteria: 'Case study',
        },
      ];
    }

    if (role.includes('Supervisor')) {
      return [
        ...baseRequirements,
        {
          topic: 'Colorado DOH Regulations Overview',
          delivery: 'Online',
          duration: '4 hrs',
          initialDue: 'Month 1',
          frequency: 'Biennial',
          certification: 'Yes',
          passCriteria: '≥85% exam',
        },
        {
          topic: 'SOP/WI Training',
          delivery: 'Self-study',
          duration: '16 hrs',
          initialDue: 'Month 1-2',
          frequency: 'Annual',
          certification: 'No',
          passCriteria: '≥85% test',
        },
      ];
    }

    return baseRequirements;
  }

  /**
   * Generate phase-specific training material
   */
  private async generatePhaseTrainingMaterial(phaseNumber: number): Promise<TrainingDocument> {
    console.log(`Generating training material for Phase ${phaseNumber}`);

    const phase = this.getPhaseInfo(phaseNumber);
    if (!phase) {
      throw new Error(`Phase ${phaseNumber} not found`);
    }

    const docNumber = `TRAIN-P${phaseNumber}-${phase.name.toUpperCase().replace(/\s+/g, '-')}`;
    const title = `Training Material - ${phase.name}`;

    const content = this.createPhaseTrainingContent(docNumber, title, phase);
    await this.storeInDatabase(docNumber, title, content, 'training');

    console.log(`✓ Generated phase training material: ${docNumber}`);

    return {
      type: 'material',
      number: docNumber,
      title,
      content,
      topic: phase.name,
    };
  }

  /**
   * Create phase training content
   */
  private createPhaseTrainingContent(docNumber: string, title: string, phase: any): string {
    const company = this.context.companyInfo?.company || {};
    const activities = phase.workActivities || [];

    let activitiesList = '';
    for (let i = 0; i < activities.length; i++) {
      activitiesList += `${i + 1}. ${activities[i]}\n`;
    }

    return `# ${title}

**Document ID:** ${docNumber}  
**Company:** ${company.legal_name || 'Fort Homes LLC'}  
**Phase:** ${phase.id} - ${phase.name}  
**Hold Point:** ${phase.holdPoint}

---

## 📋 Training Objectives

Upon completion of this training, participants will be able to:
1. Understand the requirements for ${phase.name}
2. Perform work activities safely and according to quality standards
3. Recognize quality issues and report nonconformances
4. Complete required documentation and inspection forms
5. Coordinate with inspectors at hold point ${phase.holdPoint}

---

## 🔧 Phase Overview

**Phase ${phase.id}: ${phase.name}**

${phase.description || 'This phase involves critical manufacturing activities that must be performed according to work instructions and quality standards.'}

**Hold Point:** ${phase.holdPoint}  
**NTA TPIA Required:** ${phase.tpiaRequired ? 'Yes' : 'No'}  
**Typical Duration:** ${phase.durationDays || 'Varies by module'}

---

## 📝 Work Activities

${activitiesList}

---

## 🎯 Quality Requirements

### Critical Quality Points
- All work must comply with IRC 2021, NEC 2023, and Colorado regulations
- Follow work instructions (WI-${100 + phase.id}) exactly
- Use proper materials as specified in bill of materials
- Maintain cleanliness and organization in work area

### Hold Point ${phase.holdPoint} Inspection
${phase.tpiaRequired ? '**NTA TPIA Inspector Required**\n\n' : ''}
Before proceeding to the next phase, the following must be completed:
1. All work activities finished
2. Self-inspection using Form I-${100 + phase.id}
3. Supervisor verification
${phase.tpiaRequired ? '4. NTA TPIA inspector approval\n' : ''}
4. Documentation complete in module traveler

---

## 🛠️ Tools & Equipment

### Required Tools
- Standard hand tools (hammer, drill, saw, etc.)
- Measuring devices (tape measure, level, square)
- Safety equipment (PPE as required)
- Phase-specific equipment (see WI-${100 + phase.id})

### Safety Precautions
- Wear appropriate PPE at all times
- Follow lockout/tagout procedures
- Use fall protection when required
- Report unsafe conditions immediately

---

## 📊 Competency Assessment

Trainees must demonstrate:
1. **Knowledge:** Pass written test (≥80%)
2. **Skills:** Perform work activities under observation
3. **Quality:** Produce work that passes inspection
4. **Documentation:** Complete required forms correctly

---

## 📚 References

- SOP-${100 + phase.id}: ${phase.name} Procedure
- WI-${100 + phase.id}: ${phase.name} Work Instructions
- FORM-I${100 + phase.id}: ${phase.name} Inspection Form
- Colorado DOH Regulations (8 CCR 1302-14)
- IRC 2021, NEC 2023 (as applicable)

---

**Document Control:**
- Document ID: ${docNumber}
- Created: ${new Date().toISOString().split('T')[0]}
- Generated by: TrainingAgent (AI)
- Status: Active
`;
  }

  /**
   * Generate topic training material
   */
  private async generateTopicTrainingMaterial(topic: string): Promise<TrainingDocument> {
    const docNumber = `TRAIN-${topic.toUpperCase().replace(/\s+/g, '-')}`;
    const title = `Training Material - ${topic}`;

    const content = `# ${title}

**Document ID:** ${docNumber}  
**Topic:** ${topic}

## Training Content

[Training content for ${topic} to be developed]

---

**Document Control:**
- Document ID: ${docNumber}
- Created: ${new Date().toISOString().split('T')[0]}
- Generated by: TrainingAgent (AI)
`;

    await this.storeInDatabase(docNumber, title, content, 'training');
    console.log(`✓ Generated topic training material: ${docNumber}`);

    return {
      type: 'material',
      number: docNumber,
      title,
      content,
      topic,
    };
  }

  /**
   * Generate competency assessment
   */
  private async generateCompetencyAssessment(role?: string, topic?: string): Promise<TrainingDocument> {
    const docNumber = `TRAIN-ASSESS-${(role || topic || 'GENERAL').toUpperCase().replace(/\s+/g, '-')}`;
    const title = `Competency Assessment - ${role || topic || 'General'}`;
    const company = this.context.companyInfo?.company || {};

    const content = `# ${title}

**Document ID:** ${docNumber}  
**Company:** ${company.legal_name || 'Fort Homes LLC'}  
${role ? `**Role:** ${role}\n` : ''}${topic ? `**Topic:** ${topic}\n` : ''}

---

## 📋 Employee Information

- **Name:** ________________
- **Employee ID:** ________________
- **Position:** ________________
- **Department:** ________________
- **Assessment Date:** ________________

---

## 📝 Written Assessment

### Section 1: Safety & Regulations (20 points)

1. What are the key Colorado DOH regulations applicable to modular home construction?
   - [ ] Answer demonstrates thorough understanding
   - [ ] Answer demonstrates partial understanding
   - [ ] Answer needs improvement

2. When is PPE required in the production facility?
   - [ ] Answer demonstrates thorough understanding
   - [ ] Answer demonstrates partial understanding
   - [ ] Answer needs improvement

### Section 2: Quality Standards (30 points)

3. Explain the purpose of hold point inspections.
   - [ ] Answer demonstrates thorough understanding
   - [ ] Answer demonstrates partial understanding
   - [ ] Answer needs improvement

4. What are the steps for reporting a nonconformance?
   - [ ] Answer demonstrates thorough understanding
   - [ ] Answer demonstrates partial understanding
   - [ ] Answer needs improvement

### Section 3: Technical Knowledge (50 points)

5. Describe the key activities in your assigned work area.
   - [ ] Answer demonstrates thorough understanding
   - [ ] Answer demonstrates partial understanding
   - [ ] Answer needs improvement

---

## 🛠️ Practical Assessment

### Task 1: Work Activity Performance
- [ ] Selects appropriate tools and materials
- [ ] Follows work instructions correctly
- [ ] Maintains quality standards
- [ ] Works safely
- [ ] Completes within expected time

### Task 2: Quality Inspection
- [ ] Identifies quality issues
- [ ] Uses inspection forms correctly
- [ ] Documents findings accurately
- [ ] Takes appropriate corrective action

### Task 3: Documentation
- [ ] Completes module traveler correctly
- [ ] Records measurements accurately
- [ ] Signs and dates all required fields

---

## 📊 Assessment Results

| Section | Points Possible | Points Earned | Pass? |
|:--------|:---------------:|:-------------:|:-----:|
| Written Assessment | 100 | _____ | ☐ |
| Practical Assessment | Pass/Fail | _____ | ☐ |
| **Overall Result** | - | - | ☐ Pass ☐ Fail |

**Minimum Passing Score:** 80/100 on written, Pass on practical

---

## ✅ Assessor Certification

I certify that this assessment was conducted fairly and accurately represents the employee's competency level.

**Assessor Name:** ________________  
**Assessor Title:** ________________  
**Assessor Signature:** ________________  
**Date:** ________________

---

## 📝 Training Recommendations

${role || topic ? `Based on this assessment, the following training is recommended:\n\n- [ ] No additional training needed\n- [ ] Refresher training required\n- [ ] Additional OJT needed\n- [ ] Reassessment required\n\n**Notes:** ________________` : ''}

---

**Document Control:**
- Document ID: ${docNumber}
- Created: ${new Date().toISOString().split('T')[0]}
- Generated by: TrainingAgent (AI)
- Status: Active
`;

    await this.storeInDatabase(docNumber, title, content, 'training');
    console.log(`✓ Generated competency assessment: ${docNumber}`);

    return {
      type: 'assessment',
      number: docNumber,
      title,
      content,
      role,
      topic,
    };
  }

  /**
   * Generate training record
   */
  private async generateTrainingRecord(): Promise<TrainingDocument> {
    const docNumber = 'TRAIN-RECORD-001';
    const title = 'Training Record Form';
    const company = this.context.companyInfo?.company || {};

    const content = `# Training Record Form

**Document ID:** ${docNumber}  
**Company:** ${company.legal_name || 'Fort Homes LLC'}

---

## Employee Information
- **Name:** ________________
- **Employee ID:** ________________
- **Position:** ________________
- **Department:** ________________

---

## Training Details
- **Training Topic:** ________________
- **Training Date:** ________________
- **Training Duration:** ________________ hours
- **Trainer Name:** ________________
- **Trainer Title:** ________________
- **Training Location:** ________________

---

## Training Method
- [ ] Classroom
- [ ] On-the-Job (OJT)
- [ ] Online/Self-Study
- [ ] Practical/Hands-on
- [ ] External Provider

---

## Assessment Results
- [ ] Written Test: _______ / 100
- [ ] Practical Demonstration: ☐ Pass ☐ Fail
- [ ] Overall Result: ☐ Pass ☐ Fail

---

## Signatures

**Trainee Acknowledgment:**  
I acknowledge that I have completed this training and understand the content.

- Signature: ________________
- Date: ________________

**Trainer Certification:**  
I certify that this training was delivered and the trainee demonstrated competency.

- Signature: ________________
- Date: ________________

---

**Document Control:**
- Document ID: ${docNumber}
- Created: ${new Date().toISOString().split('T')[0]}
- Generated by: TrainingAgent (AI)
- Retention: 5 years post-employment
`;

    await this.storeInDatabase(docNumber, title, content, 'training');
    console.log(`✓ Generated training record: ${docNumber}`);

    return {
      type: 'record',
      number: docNumber,
      title,
      content,
    };
  }

  /**
   * Generate training acknowledgment form
   */
  private async generateAcknowledgmentForm(): Promise<TrainingDocument> {
    const docNumber = 'TRAIN-ACK-001';
    const title = 'Training Acknowledgment Form';
    const company = this.context.companyInfo?.company || {};

    const content = `# Training Acknowledgment Form

**Document ID:** ${docNumber}  
**Company:** ${company.legal_name || 'Fort Homes LLC'}

---

## Trainee Information
- **Name:** ________________
- **Employee ID:** ________________
- **Position:** ________________

---

## Training Acknowledgment

I acknowledge that I have received training on the following topics:

- [ ] Topic 1: ________________
- [ ] Topic 2: ________________
- [ ] Topic 3: ________________

I understand the content and will apply this knowledge in my work.

**Trainee Signature:** ________________  
**Date:** ________________

---

**Document Control:**
- Document ID: ${docNumber}
- Created: ${new Date().toISOString().split('T')[0]}
- Generated by: TrainingAgent (AI)
`;

    await this.storeInDatabase(docNumber, title, content, 'training');
    console.log(`✓ Generated acknowledgment form: ${docNumber}`);

    return {
      type: 'acknowledgment',
      number: docNumber,
      title,
      content,
    };
  }

  /**
   * Helper: Get phase info
   */
  private getPhaseInfo(phaseNumber: number): any {
    const phases = this.context.phases?.phases || [];
    return phases.find((p: any) => p.id === phaseNumber);
  }

  /**
   * Helper: Find existing training document
   */
  private findExistingTrainingDoc(docNumber: string): string | null {
    const trainingDir = path.join(process.cwd(), 'docs', 'training');
    const glob = require('fast-glob');

    try {
      const files = glob.sync(`${trainingDir}/${docNumber}*.md`);
      return files.length > 0 ? files[0] : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Store document in database
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
            type: 'training',
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
      console.error('Error storing document in database:', error);
    }
  }
}

export default TrainingAgent;
