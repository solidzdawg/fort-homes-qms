#!/usr/bin/env tsx
/**
 * Generate Comprehensive Training Manuals
 * Uses TrainingManualAgent to create elaborate training materials for all phases
 */

import fs from 'fs/promises';
import path from 'path';
import { TrainingManualAgent } from '../src/agents/TrainingManualAgent';

async function loadData() {
  const phasesData = JSON.parse(
    await fs.readFile(path.join(process.cwd(), 'data', 'phases.json'), 'utf-8')
  );
  const companyInfo = JSON.parse(
    await fs.readFile(path.join(process.cwd(), 'data', 'company-info.json'), 'utf-8')
  );
  return { phases: phasesData.phases || [], companyInfo };
}

async function main() {
  console.log('🎓 Fort Homes QMS - Training Manual Generator\n');
  console.log('Generating comprehensive training manuals using AI agents...\n');

  const { phases, companyInfo } = await loadData();
  const agent = new TrainingManualAgent();

  const outputDir = path.join(process.cwd(), 'docs', 'training', 'manuals');
  await fs.mkdir(outputDir, { recursive: true });

  let successCount = 0;

  for (let i = 0; i < phases.length; i++) {
    const phase = phases[i];
    console.log(`📚 Phase ${phase.id}: ${phase.name}`);
    console.log(`   Duration: ${phase.durationDays}`);
    console.log(`   Generating training manual...`);

    try {
      const result = await agent.generateTrainingManual(
        phase.id,
        phase,
        companyInfo
      );

      if (result.success && result.content) {
        const fileName = `TRAIN-${phase.id.toString().padStart(3, '0')}-${phase.name.replace(/[\/\s]+/g, '-')}.md`;
        const filePath = path.join(outputDir, fileName);

        await fs.writeFile(filePath, result.content.manual);

        console.log(`   ✓ Training manual generated: ${fileName}`);
        console.log(`   • Modules: ${result.content.modules.length}`);
        console.log(`   • Total duration: ${result.content.curriculum.totalDuration}`);
        console.log(`   • Certification: ${result.content.certification.certificationName}`);
        console.log('');

        successCount++;
      } else {
        console.log(`   ✗ Failed: ${result.error}`);
        console.log('');
      }
    } catch (error) {
      console.log(`   ✗ Error: ${error}`);
      console.log('');
    }
  }

  // Generate master training index
  console.log('📋 Generating master training index...');
  const indexContent = await generateTrainingIndex(phases, outputDir);
  await fs.writeFile(path.join(outputDir, 'TRAINING-INDEX.md'), indexContent);
  console.log('   ✓ Training index generated\n');

  console.log('='.repeat(60));
  console.log('✅ Training Manual Generation Complete!');
  console.log('='.repeat(60));
  console.log(`📊 Statistics:`);
  console.log(`   • Phases processed: ${phases.length}`);
  console.log(`   • Manuals generated: ${successCount}`);
  console.log(`   • Output directory: ${outputDir}`);
  console.log('='.repeat(60) + '\n');
}

async function generateTrainingIndex(phases: any[], outputDir: string): Promise<string> {
  const date = new Date().toISOString().split('T')[0];

  return `# FORT HOMES TRAINING MANUAL INDEX
## Comprehensive Training Program for Modular Home Manufacturing

---

## 📋 DOCUMENT CONTROL

| **Attribute** | **Details** |
|:---|:---|
| **Document ID** | TRAIN-INDEX |
| **Version** | 1.0 |
| **Effective Date** | ${date} |
| **Process Owner** | Training Manager |
| **Classification** | CONTROLLED |

---

## 🎯 TRAINING PROGRAM OVERVIEW

### Program Philosophy

Fort Homes training program is based on industry best practices:

- **HUD Training Standards**: Manufacturer installation training manual guidelines
- **NREL Workforce Development**: Hands-on training at Last Mile Facility methodology
- **ISO 9001 Competency**: Structured competency verification and certification
- **Lean Manufacturing**: Continuous improvement and waste reduction

### Training Methodology

1. **Classroom Instruction**: Theory, codes, and standards
2. **Demonstration**: Expert shows correct procedures
3. **Hands-On Practice**: Supervised skill development
4. **Independent Work**: Competency verification
5. **Certification**: Formal recognition of proficiency
6. **Continuous Improvement**: Ongoing development and recertification

---

## 📚 TRAINING MANUALS BY PHASE

${phases.map((phase, idx) => {
  const fileName = `TRAIN-${phase.id.toString().padStart(3, '0')}-${phase.name.replace(/\s+/g, '-')}.md`;
  return `
### Phase ${phase.id}: ${phase.name}

**Manual**: [${fileName}](./${fileName})
**Duration**: ${phase.estimatedDuration}
**Hold Point**: HP-${phase.id}
**TPIA Required**: ${phase.tpiaRequired ? 'Yes' : 'No'}

**Training Modules**:
- Module 1: Safety and PPE (2 hours)
- Module 2: Tools and Equipment (4 hours)
- Module 3: Quality Standards (3 hours)
- Module 4: Production Process (8 hours)

**Total Training Time**: ~17 hours classroom + 80-120 hours supervised practice

**Certification**: Phase ${phase.id} Production Technician

---
`;
}).join('\n')}

## 🏆 CERTIFICATION PROGRAM

### Certification Levels

| Level | Requirements | Privileges |
|:---|:---|:---|
| **Trainee** | Complete safety module | Work under direct supervision |
| **Technician I** | Complete all modules, pass assessments | Work under general supervision |
| **Technician II** | 6 months experience, quality > 95% | Work independently, train others |
| **Lead Technician** | 12 months experience, quality > 98% | Supervise, approve work, conduct training |

### Recertification

All certifications valid for 12 months. Recertification requires:
- Complete annual refresher training (4 hours)
- Maintain quality performance above 95%
- No safety violations in past 12 months
- Complete any updated training modules

---

## 📊 COMPETENCY TRACKING

### Performance Metrics

| Metric | Target | Measurement Method |
|:---|:---|:---|
| Safety Compliance | 100% | No violations, proper PPE use |
| Quality First-Pass Yield | > 95% | Percentage passing inspection |
| Process Adherence | > 90% | Work instruction compliance |
| Productivity | Target cycle time | Time to complete phase |
| Documentation | 100% | Complete and accurate records |

### Assessment Schedule

- **Daily**: Supervisor observation and coaching
- **Weekly**: Performance metrics review
- **Monthly**: Skills assessment
- **Quarterly**: Formal competency verification
- **Annual**: Recertification

---

## 📖 TRAINING RESOURCES

### Required Documentation

- Quality Manual (QMS-001 through QMS-009)
- Standard Operating Procedures (SOP-002 Training & Competency)
- Work Instructions (WI-101 through WI-108)
- Inspection Forms (FORM-I101 through FORM-I108)
- HUD Code Reference Materials

### Training Equipment

- Personal protective equipment (PPE)
- Hand tools and power tools
- Measuring and inspection equipment
- Training workstations
- Good/bad example samples
- Video demonstration equipment

---

## 🔄 CONTINUOUS IMPROVEMENT

### Training Effectiveness Evaluation

- **Trainee Feedback**: Post-training surveys
- **Performance Tracking**: Quality and productivity metrics
- **Supervisor Input**: Coaching and development needs
- **Audit Findings**: Training-related quality issues
- **Regulatory Updates**: Changes to codes and standards

### Program Updates

Training manuals reviewed and updated:
- **Annually**: Scheduled review and update
- **As Needed**: Regulatory changes, process improvements, equipment changes
- **After Incidents**: Root cause analysis identifies training gaps

---

## ✅ APPROVAL

| Role | Name | Signature | Date |
|:---|:---|:---|:---|
| **Prepared By** | Training Manager | _____________ | ${date} |
| **Reviewed By** | QA Manager | _____________ | ${date} |
| **Approved By** | Operations Manager | _____________ | ${date} |

---

**Document Classification**: CONTROLLED
**Distribution**: All Fort Homes Personnel

*This document is part of the Fort Homes LLC Quality Management System.*
`;
}

main().catch(console.error);
