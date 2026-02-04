/**
 * WORK INSTRUCTION ORCHESTRATOR
 *
 * Purpose: Coordinate all WI creation agents to generate complete work instruction
 * Input: Phase number, project path
 * Output: Complete markdown work instruction document
 *
 * Orchestrates:
 * 1. Specification Extractor (01)
 * 2. Code Mapper (02)
 * 3. Safety Generator (03)
 * 4. Procedure Writer (04)
 * 5. Hold Point Generator (05)
 */

import fs from 'fs';
import path from 'path';
import extractSpecifications from './01-specification-extractor';
import mapCodeRequirements from './02-code-mapper';
import generateSafetyRequirements, { generateSafetySection } from './03-safety-generator';
import generateProcedure, { formatProcedureSection } from './04-procedure-writer';
import generateHoldPointCriteria, { formatHoldPointChecklist } from './05-hold-point-generator';

// ========================================
// TYPES
// ========================================

export interface WorkInstructionConfig {
  phase: number;
  project_path: string;
  output_dir?: string;
  module_name?: string;
}

export interface WorkInstruction {
  metadata: {
    document_id: string;
    title: string;
    phase: number;
    phase_name: string;
    revision: string;
    effective_date: string;
    next_review: string;
    process_owner: string;
    classification: string;
  };
  frontmatter: string;
  safety_section: string;
  procedure_sections: string;
  hold_point_section: string;
  references: string;
  full_document: string;
}

// ========================================
// ORCHESTRATION LOGIC
// ========================================

export async function createWorkInstruction(config: WorkInstructionConfig): Promise<WorkInstruction> {
  const phaseNames = [
    '',
    'Chassis & Floor Deck Assembly',
    'Wall Framing & Sheathing',
    'Roof Framing & Sheathing',
    'MEP Rough-In & Testing',
    'Insulation & Air Sealing',
    'Drywall Installation',
    'Interior Trim & Finishes',
    'Final Inspection & Testing'
  ];

  const holdPoints = ['', 'HP-1', 'HP-2', 'HP-3', 'HP-4', 'HP-5', 'HP-6', 'HP-7', 'HP-8'];

  console.log('\n🤖 WORK INSTRUCTION ORCHESTRATOR');
  console.log('==================================');
  console.log(`Phase: ${config.phase} - ${phaseNames[config.phase]}`);
  console.log(`Project: ${config.project_path}`);
  console.log('');

  // STEP 1: Extract Specifications
  console.log('Step 1/5: Extracting specifications...');
  const specs = await extractSpecifications(config.project_path, config.phase);
  console.log('');

  // STEP 2: Map Code Requirements
  console.log('Step 2/5: Mapping code requirements...');
  const codeMap = await mapCodeRequirements(config.phase);
  console.log('');

  // STEP 3: Generate Safety Requirements
  console.log('Step 3/5: Generating safety requirements...');
  const safetyProfile = await generateSafetyRequirements(config.phase);
  const safetySection = generateSafetySection(safetyProfile);
  console.log('');

  // STEP 4: Generate Procedures
  console.log('Step 4/5: Writing step-by-step procedures...');
  const procedures = await generateProcedure(config.phase, specs);
  let procedureSection = '';
  for (const section of procedures) {
    procedureSection += formatProcedureSection(section);
  }
  console.log('');

  // STEP 5: Generate Hold Point Criteria
  console.log('Step 5/5: Generating hold point criteria...');
  const holdPoint = await generateHoldPointCriteria(config.phase, specs);
  const holdPointSection = formatHoldPointChecklist(holdPoint);
  console.log('');

  // ASSEMBLE DOCUMENT
  console.log('Assembling final document...');

  const metadata = {
    document_id: `WI-${100 + config.phase}`,
    title: phaseNames[config.phase],
    phase: config.phase,
    phase_name: phaseNames[config.phase],
    revision: '1.0',
    effective_date: new Date().toISOString().split('T')[0],
    next_review: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 6 months
    process_owner: 'Production Manager',
    classification: 'CONTROLLED'
  };

  const frontmatter = `---
title: "${metadata.title}"
document_id: "${metadata.document_id}"
revision: "${metadata.revision}"
effective_date: "${metadata.effective_date}"
process_owner: "${metadata.process_owner}"
next_review: "${metadata.next_review}"
classification: "${metadata.classification}"
phase: ${metadata.phase}
hold_point: "${holdPoints[config.phase]}"
---

`;

  const header = `# ${metadata.document_id}: ${metadata.title}

**Phase:** ${config.phase} of 8
**Hold Point:** ${holdPoints[config.phase]}
**Module:** ${config.module_name || 'Generic'}
**Related SOP:** SOP-${100 + config.phase}

---

`;

  const references = `
---

## 📚 REFERENCES

### Shop Drawings
${specs.drawings ? `- ${specs.drawings}` : '- Refer to approved shop drawings'}

### Building Codes
- **Building Code:** ${specs.codes_standards?.building_code || '2024 IRC/IBC'}
- **Electrical Code:** ${specs.codes_standards?.electrical_code || '2023 NEC'}
- **Plumbing Code:** ${specs.codes_standards?.plumbing_code || '2024 IPC'}
- **Mechanical Code:** ${specs.codes_standards?.mechanical_code || '2024 IMC'}
- **Energy Code:** ${specs.codes_standards?.energy_code || '2021 IECC'}

### Related Documents
- Quality Manual: QMS-005 (Operations)
- SOP-${100 + config.phase}: ${phaseNames[config.phase]}
- FORM-I-00${config.phase}: ${holdPoints[config.phase]} Inspection Form

### Code Requirements Summary
${codeMap.requirements.map(req => `- **${req.citation}:** ${req.title}`).join('\n')}

---

## 📋 DOCUMENT CONTROL

**Revision:** ${metadata.revision}
**Effective Date:** ${metadata.effective_date}
**Next Review:** ${metadata.next_review}
**Process Owner:** ${metadata.process_owner}

**Classification:** ${metadata.classification}
⚠️ **UNCONTROLLED WHEN PRINTED**

---

*This work instruction was generated using AI-powered QMS automation*
*Fort Homes LLC Quality Management System*
*https://claude.ai/code/session_01LGTTQfa59SB9VL2epuXEiG*
`;

  const fullDocument =
    frontmatter +
    header +
    safetySection +
    '\n---\n\n## 📝 STEP-BY-STEP PROCEDURES\n\n' +
    procedureSection +
    '\n---\n\n## 🔍 HOLD POINT INSPECTION\n\n' +
    holdPointSection +
    references;

  const workInstruction: WorkInstruction = {
    metadata,
    frontmatter,
    safety_section: safetySection,
    procedure_sections: procedureSection,
    hold_point_section: holdPointSection,
    references,
    full_document: fullDocument
  };

  console.log('✅ Work instruction generation complete!');
  console.log('');

  return workInstruction;
}

/**
 * Save work instruction to file
 */
export async function saveWorkInstruction(
  wi: WorkInstruction,
  config: WorkInstructionConfig
): Promise<string> {
  const outputDir = config.output_dir || path.join(process.cwd(), 'output/work-instructions');

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const moduleSuffix = config.module_name ? `-${config.module_name}` : '';
  const filename = `${wi.metadata.document_id}-${wi.metadata.title.replace(/\s+/g, '-')}${moduleSuffix}.md`;
  const filepath = path.join(outputDir, filename);

  fs.writeFileSync(filepath, wi.full_document, 'utf-8');

  console.log(`📄 Saved work instruction: ${filepath}`);
  console.log(`   Document ID: ${wi.metadata.document_id}`);
  console.log(`   Phase: ${wi.metadata.phase} - ${wi.metadata.phase_name}`);
  console.log(`   Size: ${Math.round(wi.full_document.length / 1024)} KB`);

  return filepath;
}

// ========================================
// EXPORT MAIN FUNCTION
// ========================================

export default async function orchestrate(config: WorkInstructionConfig): Promise<WorkInstruction> {
  try {
    const wi = await createWorkInstruction(config);
    await saveWorkInstruction(wi, config);
    return wi;
  } catch (error) {
    console.error('❌ Error in orchestration:', error);
    throw error;
  }
}

// ========================================
// CLI INTERFACE
// ========================================

if (require.main === module) {
  const phase = parseInt(process.argv[2] || '1');
  const projectPath = process.argv[3] || 'data/cc21te';
  const moduleName = process.argv[4] || 'CC21TE';

  const config: WorkInstructionConfig = {
    phase,
    project_path: projectPath,
    module_name: moduleName,
    output_dir: 'output/work-instructions'
  };

  orchestrate(config)
    .then(wi => {
      console.log('\n✅ SUCCESS!');
      console.log('\n📊 GENERATION STATISTICS:');
      console.log(`   Total document size: ${Math.round(wi.full_document.length / 1024)} KB`);
      console.log(`   Safety hazards: ${wi.safety_section.split('####').length - 1}`);
      console.log(`   Procedure sections: ${wi.procedure_sections.split('##').length - 1}`);
      console.log(`   Inspection criteria: ${wi.hold_point_section.split('###').length - 1}`);
      console.log('');
      console.log('🎉 Work Instruction Ready for Review!');
    })
    .catch(err => {
      console.error('\n❌ FAILED:', err.message);
      process.exit(1);
    });
}
