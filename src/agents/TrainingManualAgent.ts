/**
 * Training Manual Agent
 * Generates comprehensive training manuals, curricula, and certification programs
 * Based on best practices from HUD, NREL, and ISO 9001 standards
 */

import { BaseAgent, AgentConfig, AgentResult } from './types';
import * as fs from 'fs/promises';
import * as path from 'path';

interface TrainingModule {
  id: string;
  title: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  objectives: string[];
  content: TrainingContent[];
  assessment: Assessment;
  prerequisites: string[];
}

interface TrainingContent {
  type: 'lecture' | 'hands-on' | 'demonstration' | 'video' | 'quiz' | 'practical';
  title: string;
  duration: string;
  materials: string[];
  instructions: string;
  safetyNotes?: string[];
}

interface Assessment {
  type: 'written' | 'practical' | 'both';
  passingScore: number;
  questions: AssessmentQuestion[];
}

interface AssessmentQuestion {
  question: string;
  type: 'multiple-choice' | 'true-false' | 'practical' | 'demonstration';
  points: number;
  correctAnswer?: string;
  rubric?: string;
}

export class TrainingManualAgent extends BaseAgent {
  constructor(config?: Partial<AgentConfig>) {
    super({
      name: 'TrainingManualAgent',
      description: 'Generates comprehensive training manuals with best practices from manufacturing industry',
      temperature: 0.7,
      maxTokens: 8000,
      ...config
    });
  }

  /**
   * Execute agent with input
   */
  async execute(input: any): Promise<AgentResult> {
    const { phase, phaseData, companyInfo } = input;
    return this.generateTrainingManual(phase, phaseData, companyInfo);
  }

  /**
   * Generate a complete training manual for a production phase
   */
  async generateTrainingManual(
    phase: number,
    phaseData: any,
    companyInfo: any
  ): Promise<AgentResult> {
    try {
      this.log('info', `Generating training manual for Phase ${phase}`);

      const modules = await this.createTrainingModules(phase, phaseData);
      const curriculum = await this.createCurriculum(modules);
      const certification = await this.createCertificationProgram(phase, modules);

      const manual = this.formatTrainingManual(phase, phaseData, modules, curriculum, certification, companyInfo);

      this.setMemory(`training-manual-phase-${phase}`, manual, true);

      return {
        success: true,
        content: {
          manual,
          modules,
          curriculum,
          certification
        },
        metadata: {
          generatedAt: new Date().toISOString(),
          agent: this.config.name,
          phase: phase
        }
      };
    } catch (error) {
      this.log('error', `Failed to generate training manual: ${error}`);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Create training modules for a phase
   */
  private async createTrainingModules(phase: number, phaseData: any): Promise<TrainingModule[]> {
    const modules: TrainingModule[] = [];

    // Module 1: Safety and PPE
    modules.push({
      id: `TM-${phase}01`,
      title: `Phase ${phase} Safety and Personal Protective Equipment`,
      duration: '2 hours',
      level: 'beginner',
      objectives: [
        'Identify all safety hazards in this phase',
        'Demonstrate proper PPE usage',
        'Explain emergency procedures',
        'Recognize and report unsafe conditions'
      ],
      prerequisites: [],
      content: [
        {
          type: 'lecture',
          title: 'Safety Hazard Identification',
          duration: '30 min',
          materials: ['Safety presentation', 'Hazard photos', 'OSHA guidelines'],
          instructions: 'Review all potential hazards including electrical, fall, pinch points, and material handling risks.'
        },
        {
          type: 'demonstration',
          title: 'PPE Donning and Doffing',
          duration: '30 min',
          materials: ['Safety glasses', 'Hard hat', 'Gloves', 'Steel-toe boots'],
          instructions: 'Demonstrate correct procedures for putting on and removing PPE.',
          safetyNotes: ['Inspect PPE before each use', 'Report damaged equipment immediately']
        },
        {
          type: 'hands-on',
          title: 'Safety Equipment Practice',
          duration: '45 min',
          materials: ['Fire extinguisher trainer', 'First aid kit', 'Emergency stop buttons'],
          instructions: 'Practice using emergency equipment under supervision.'
        },
        {
          type: 'quiz',
          title: 'Safety Knowledge Check',
          duration: '15 min',
          materials: ['Quiz form', 'Pencil'],
          instructions: 'Complete 20-question safety assessment.'
        }
      ],
      assessment: {
        type: 'both',
        passingScore: 80,
        questions: [
          {
            question: 'What PPE is required for this phase?',
            type: 'multiple-choice',
            points: 5,
            correctAnswer: 'All of the above: safety glasses, hard hat, gloves, steel-toe boots'
          },
          {
            question: 'Demonstrate proper use of safety equipment',
            type: 'practical',
            points: 10,
            rubric: 'Student correctly identifies, inspects, and uses safety equipment'
          }
        ]
      }
    });

    // Module 2: Tools and Equipment
    modules.push({
      id: `TM-${phase}02`,
      title: `Phase ${phase} Tools and Equipment Operation`,
      duration: '4 hours',
      level: 'intermediate',
      objectives: [
        'Identify all tools and equipment for this phase',
        'Demonstrate safe operation of each tool',
        'Perform basic maintenance and inspection',
        'Troubleshoot common issues'
      ],
      prerequisites: [`TM-${phase}01`],
      content: [
        {
          type: 'lecture',
          title: 'Tool Identification and Specifications',
          duration: '45 min',
          materials: ['Tool catalog', 'Specification sheets', 'Calibration records'],
          instructions: 'Review each tool, its purpose, specifications, and calibration requirements.'
        },
        {
          type: 'demonstration',
          title: 'Safe Operation Procedures',
          duration: '1 hour',
          materials: ['Actual tools', 'Safety guards', 'Lockout/tagout equipment'],
          instructions: 'Demonstrate correct operation, including startup, use, and shutdown procedures.'
        },
        {
          type: 'hands-on',
          title: 'Supervised Tool Practice',
          duration: '2 hours',
          materials: ['Practice materials', 'Tools', 'Work instructions'],
          instructions: 'Students practice using each tool under direct supervision.',
          safetyNotes: ['One student per tool', 'Instructor must approve each operation', 'Emergency stop within reach']
        },
        {
          type: 'practical',
          title: 'Competency Demonstration',
          duration: '15 min per student',
          materials: ['Competency checklist', 'Actual work materials'],
          instructions: 'Each student demonstrates proficiency with all required tools.'
        }
      ],
      assessment: {
        type: 'practical',
        passingScore: 90,
        questions: [
          {
            question: 'Set up and safely operate pneumatic nail gun',
            type: 'practical',
            points: 20,
            rubric: 'Student demonstrates: proper PPE, tool inspection, correct pressure setting, safe handling, accurate placement, proper shutdown'
          },
          {
            question: 'Identify when tool requires calibration',
            type: 'demonstration',
            points: 10,
            rubric: 'Student correctly checks calibration sticker, identifies out-of-spec conditions'
          }
        ]
      }
    });

    // Module 3: Quality Requirements and Inspection
    modules.push({
      id: `TM-${phase}03`,
      title: `Phase ${phase} Quality Standards and Inspection Procedures`,
      duration: '3 hours',
      level: 'intermediate',
      objectives: [
        'Explain all quality requirements for this phase',
        'Perform self-inspection using checklists',
        'Identify defects and nonconformances',
        'Complete inspection documentation'
      ],
      prerequisites: [`TM-${phase}01`, `TM-${phase}02`],
      content: [
        {
          type: 'lecture',
          title: 'HUD Code and Quality Standards',
          duration: '1 hour',
          materials: ['HUD Code excerpts', 'Quality manual', 'Specification sheets'],
          instructions: 'Review all applicable codes, standards, and company quality requirements.'
        },
        {
          type: 'demonstration',
          title: 'Inspection Techniques',
          duration: '45 min',
          materials: ['Measuring tools', 'Inspection forms', 'Good/bad examples'],
          instructions: 'Demonstrate proper measurement techniques, visual inspection, and documentation.'
        },
        {
          type: 'hands-on',
          title: 'Practice Inspections',
          duration: '1 hour',
          materials: ['Sample assemblies', 'Inspection tools', 'Checklists'],
          instructions: 'Students perform inspections on prepared samples with known defects.'
        },
        {
          type: 'quiz',
          title: 'Quality Knowledge Assessment',
          duration: '15 min',
          materials: ['Assessment form', 'Reference materials'],
          instructions: 'Complete quality standards assessment.'
        }
      ],
      assessment: {
        type: 'both',
        passingScore: 85,
        questions: [
          {
            question: 'What is the tolerance for floor levelness per HUD Code?',
            type: 'multiple-choice',
            points: 5,
            correctAnswer: '1/4 inch in 10 feet'
          },
          {
            question: 'Perform complete inspection using checklist',
            type: 'practical',
            points: 20,
            rubric: 'Student correctly: uses measuring tools, identifies all defects, completes documentation accurately, determines pass/fail correctly'
          }
        ]
      }
    });

    // Module 4: Production Process and Work Instructions
    modules.push({
      id: `TM-${phase}04`,
      title: `Phase ${phase} Production Process and Procedures`,
      duration: '8 hours',
      level: 'advanced',
      objectives: [
        'Execute complete phase production process',
        'Follow work instructions accurately',
        'Maintain quality throughout process',
        'Complete all documentation',
        'Achieve productivity targets'
      ],
      prerequisites: [`TM-${phase}01`, `TM-${phase}02`, `TM-${phase}03`],
      content: [
        {
          type: 'lecture',
          title: 'Process Overview and Flow',
          duration: '1 hour',
          materials: ['Process flowchart', 'Work instructions', 'Timeline'],
          instructions: 'Review complete process from start to finish, dependencies, and timing.'
        },
        {
          type: 'demonstration',
          title: 'Step-by-Step Process Walkthrough',
          duration: '2 hours',
          materials: ['Actual materials', 'Tools', 'Work instructions'],
          instructions: 'Instructor performs complete process while explaining each step.'
        },
        {
          type: 'hands-on',
          title: 'Supervised Production',
          duration: '4 hours',
          materials: ['Full material kit', 'All tools', 'Work instructions', 'Inspection forms'],
          instructions: 'Student performs complete phase under supervision with coaching.',
          safetyNotes: ['Continuous supervision required', 'Stop immediately if quality issues arise', 'Document all work performed']
        },
        {
          type: 'practical',
          title: 'Final Competency Demonstration',
          duration: '1 hour',
          materials: ['Complete material kit', 'All tools', 'Blank documentation'],
          instructions: 'Student performs complete phase independently while being evaluated.'
        }
      ],
      assessment: {
        type: 'practical',
        passingScore: 90,
        questions: [
          {
            question: 'Complete phase production process independently',
            type: 'practical',
            points: 50,
            rubric: `Evaluation criteria:
- Safety: 20 points (proper PPE, safe work practices, no violations)
- Quality: 20 points (meets all specifications, passes inspection)
- Process: 5 points (follows work instructions correctly)
- Documentation: 5 points (complete and accurate records)
- Efficiency: 5 points bonus (completes within target time)`
          }
        ]
      }
    });

    return modules;
  }

  /**
   * Create training curriculum
   */
  private async createCurriculum(modules: TrainingModule[]): Promise<any> {
    return {
      totalDuration: this.calculateTotalDuration(modules),
      schedule: this.createTrainingSchedule(modules),
      learningPath: this.createLearningPath(modules),
      resources: this.compileResourceList(modules)
    };
  }

  /**
   * Create certification program
   */
  private async createCertificationProgram(phase: number, modules: TrainingModule[]): Promise<any> {
    return {
      certificationName: `Phase ${phase} Production Technician`,
      validityPeriod: '12 months',
      recertificationRequirements: [
        'Complete annual refresher training (4 hours)',
        'Maintain quality performance above 95%',
        'No safety violations in past 12 months',
        'Complete any updated training modules'
      ],
      certificationLevels: [
        {
          level: 'Trainee',
          requirements: ['Complete TM-01 Safety module', 'Pass safety assessment'],
          privileges: ['Work under direct supervision', 'Assist experienced workers']
        },
        {
          level: 'Technician I',
          requirements: ['Complete all training modules', 'Pass all assessments', 'Complete 40 hours supervised work'],
          privileges: ['Work under general supervision', 'Perform routine tasks', 'Self-inspection']
        },
        {
          level: 'Technician II',
          requirements: ['6 months experience as Technician I', 'Quality rating > 95%', 'Complete advanced training'],
          privileges: ['Work independently', 'Train others', 'Perform complex tasks']
        },
        {
          level: 'Lead Technician',
          requirements: ['12 months as Technician II', 'Leadership training', 'Quality rating > 98%'],
          privileges: ['Supervise others', 'Approve work', 'Conduct training']
        }
      ],
      assessmentSchedule: {
        initial: 'Upon completion of all modules',
        ongoing: 'Quarterly performance reviews',
        recertification: 'Annual competency verification'
      }
    };
  }

  /**
   * Format complete training manual
   */
  private formatTrainingManual(
    phase: number,
    phaseData: any,
    modules: TrainingModule[],
    curriculum: any,
    certification: any,
    companyInfo: any
  ): string {
    return `# TRAINING MANUAL: Phase ${phase}
${phaseData.name}

---

## 📋 DOCUMENT CONTROL

| **Attribute** | **Details** |
|:---|:---|
| **Document ID** | TRAIN-${phase.toString().padStart(3, '0')} |
| **Version** | 1.0 |
| **Effective Date** | ${new Date().toISOString().split('T')[0]} |
| **Process Owner** | Training Manager |
| **Classification** | CONTROLLED |

---

## 🎯 TRAINING OVERVIEW

### Purpose
This training manual provides comprehensive instruction for all personnel involved in Phase ${phase} production operations. The training program is designed to ensure:

- ✅ **Safety**: All workers understand and follow safety requirements
- ✅ **Quality**: Production meets HUD Code and company standards
- ✅ **Efficiency**: Workers can perform tasks to productivity targets
- ✅ **Compliance**: All regulatory and certification requirements are met

### Training Philosophy

Fort Homes follows the **"See One, Do One, Teach One"** methodology:

1. **See One**: Observation and lecture-based learning
2. **Do One**: Hands-on practice under supervision
3. **Teach One**: Demonstrate mastery by training others

This approach, combined with **NREL workforce training best practices**, ensures competency through:
- Hands-on training at actual workstations
- Independent verification at each step
- Quality assurance checkpoints
- Continuous improvement feedback

---

## 📚 TRAINING MODULES

${modules.map((module, idx) => `
### Module ${idx + 1}: ${module.title}

**Module ID**: ${module.id}
**Duration**: ${module.duration}
**Level**: ${module.level.charAt(0).toUpperCase() + module.level.slice(1)}
**Prerequisites**: ${module.prerequisites.length > 0 ? module.prerequisites.join(', ') : 'None'}

#### Learning Objectives

${module.objectives.map(obj => `- ${obj}`).join('\n')}

#### Module Content

${module.content.map((content, cidx) => `
**${cidx + 1}. ${content.title}** (${content.type.toUpperCase()}) - ${content.duration}

**Materials**:
${content.materials.map(m => `- ${m}`).join('\n')}

**Instructions**:
${content.instructions}

${content.safetyNotes ? `
**⚠️ Safety Notes**:
${content.safetyNotes.map(note => `- ${note}`).join('\n')}
` : ''}
`).join('\n')}

#### Assessment

**Type**: ${module.assessment.type}
**Passing Score**: ${module.assessment.passingScore}%

${module.assessment.questions.map((q, qidx) => `
**Question ${qidx + 1}** (${q.points} points):
${q.question}

${q.correctAnswer ? `**Answer**: ${q.correctAnswer}` : ''}
${q.rubric ? `**Rubric**: ${q.rubric}` : ''}
`).join('\n')}

---
`).join('\n')}

## 📅 TRAINING CURRICULUM

### Total Training Duration
${curriculum.totalDuration}

### Recommended Schedule
- **Week 1**: Safety and Tools (Modules 1-2)
- **Week 2**: Quality and Process (Modules 3-4)
- **Week 3-4**: Supervised Production Practice
- **Week 4**: Final Assessment and Certification

### Learning Path
1. Complete online safety orientation
2. Attend classroom sessions for each module
3. Complete hands-on practice under supervision
4. Pass written and practical assessments
5. Complete supervised production hours
6. Final competency demonstration
7. Receive certification

---

## 🏆 CERTIFICATION PROGRAM

### ${certification.certificationName}

**Validity Period**: ${certification.validityPeriod}

### Certification Levels

${certification.certificationLevels.map(level => `
#### ${level.level}

**Requirements**:
${level.requirements.map(req => `- ${req}`).join('\n')}

**Privileges**:
${level.privileges.map(priv => `- ${priv}`).join('\n')}
`).join('\n')}

### Recertification Requirements

${certification.recertificationRequirements.map(req => `- ${req}`).join('\n')}

### Assessment Schedule

- **Initial**: ${certification.assessmentSchedule.initial}
- **Ongoing**: ${certification.assessmentSchedule.ongoing}
- **Recertification**: ${certification.assessmentSchedule.recertification}

---

## 📊 COMPETENCY TRACKING

### Performance Metrics

Trainee competency is tracked through:

| Metric | Target | Measurement |
|:---|:---|:---|
| Safety Compliance | 100% | No violations, proper PPE use |
| Quality First-Pass Yield | > 95% | Percentage passing inspection first time |
| Process Adherence | > 90% | Follows work instructions correctly |
| Productivity | Target cycle time | Time to complete phase |
| Documentation | 100% | Complete and accurate records |

### Continuous Improvement

- **Daily**: Supervisor observation and coaching
- **Weekly**: Performance metrics review
- **Monthly**: Skills assessment and development planning
- **Quarterly**: Formal competency verification
- **Annual**: Recertification and career development

---

## 📖 TRAINING RESOURCES

### Required Materials

- [ ] Safety equipment (PPE)
- [ ] Hand tools and power tools
- [ ] Measuring and inspection equipment
- [ ] Work instructions (WI-${phase.toString().padStart(3, '0')})
- [ ] Inspection forms (FORM-I${phase.toString().padStart(3, '0')})
- [ ] Quality manual sections
- [ ] HUD Code reference materials

### Training Aids

- [ ] Process flowcharts and diagrams
- [ ] Good vs. bad examples (photos)
- [ ] Video demonstrations
- [ ] Hands-on training station
- [ ] Practice materials
- [ ] Assessment forms and checklists

### Reference Documents

- QMS-004: Support Resources & Competency
- SOP-002: Training & Competency Management
- WI-${phase.toString().padStart(3, '0')}: Phase ${phase} Work Instructions
- FORM-COMP-EVAL: Competency Evaluation Form

---

## ✅ TRAINER QUALIFICATIONS

### Required Qualifications

- [ ] Certified Lead Technician for this phase
- [ ] Minimum 2 years experience in this phase
- [ ] Completed "Train the Trainer" program
- [ ] Current on all safety and quality training
- [ ] No safety violations in past 12 months

### Trainer Responsibilities

- Deliver training according to this manual
- Assess trainee competency objectively
- Provide constructive feedback
- Document training completion
- Report training effectiveness issues
- Maintain training records

---

## 🔄 REVISION HISTORY

| Version | Date | Description | Author |
|:---|:---|:---|:---|
| 1.0 | ${new Date().toISOString().split('T')[0]} | Initial training manual | Training Manager |

---

## ✅ APPROVAL

| Role | Name | Signature | Date |
|:---|:---|:---|:---|
| **Prepared By** | Training Manager | _____________ | ${new Date().toISOString().split('T')[0]} |
| **Reviewed By** | QA Manager | _____________ | ${new Date().toISOString().split('T')[0]} |
| **Approved By** | Operations Manager | _____________ | ${new Date().toISOString().split('T')[0]} |

---

**Document Classification**: CONTROLLED
**Distribution**: Training Department, Supervisors, Trainees

*This document is part of the Fort Homes LLC Quality Management System.*
`;
  }

  /**
   * Helper methods
   */
  private calculateTotalDuration(modules: TrainingModule[]): string {
    // Calculate total hours from duration strings
    let totalHours = 0;
    for (const module of modules) {
      const match = module.duration.match(/(\d+)/);
      if (match) {
        totalHours += parseInt(match[1]);
      }
    }
    return `${totalHours} hours classroom + 80-120 hours supervised practice`;
  }

  private createTrainingSchedule(modules: TrainingModule[]): any {
    return {
      week1: ['Safety training', 'Tool training'],
      week2: ['Quality training', 'Process overview'],
      week3: ['Supervised practice', 'Coaching'],
      week4: ['Independent practice', 'Final assessment']
    };
  }

  private createLearningPath(modules: TrainingModule[]): string[] {
    return modules.map(m => `${m.id}: ${m.title}`);
  }

  private compileResourceList(modules: TrainingModule[]): string[] {
    const resources = new Set<string>();
    for (const module of modules) {
      for (const content of module.content) {
        for (const material of content.materials) {
          resources.add(material);
        }
      }
    }
    return Array.from(resources);
  }
}
