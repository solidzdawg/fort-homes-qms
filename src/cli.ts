#!/usr/bin/env node

/**
 * QMS CLI Tool
 * Command-line interface for generating QMS documents
 */

import { qmsGenerator } from './generators/qms-generator';
import { orchestrator } from './agents/orchestrator';

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  console.log('Fort Homes QMS Generator\n');

  try {
    switch (command) {
      case 'manual':
        await generateManual();
        break;

      case 'sop':
        await generateSOP();
        break;

      case 'wi':
        await generateWI();
        break;

      case 'form':
        await generateForm();
        break;

      case 'all':
        await generateAll();
        break;

      case 'help':
      default:
        showHelp();
        break;
    }
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

async function generateManual() {
  console.log('Generating Quality Manual...\n');
  const result = await qmsGenerator.generateQualityManual(undefined, {
    format: 'all',
    outputDir: './output/manual',
  });
  console.log(`\n✅ Generated ${result.files.length} files`);
  result.files.forEach((f) => console.log(`   - ${f}`));
}

async function generateSOP() {
  const phase = parseInt(args[1]) || 1;
  if (phase < 1 || phase > 8) {
    console.error('Phase must be between 1 and 8');
    process.exit(1);
  }

  console.log(`Generating SOP for Phase ${phase}...\n`);
  const result = await qmsGenerator.generateSOP(phase, {
    format: 'all',
    outputDir: './output/sops',
  });
  console.log(`\n✅ Generated ${result.files.length} files`);
  result.files.forEach((f) => console.log(`   - ${f}`));
}

async function generateWI() {
  const phase = parseInt(args[1]) || 1;
  const activity = parseInt(args[2]) || 0;

  if (phase < 1 || phase > 8) {
    console.error('Phase must be between 1 and 8');
    process.exit(1);
  }

  console.log(`Generating Work Instruction for Phase ${phase}, Activity ${activity}...\n`);
  const result = await qmsGenerator.generateWorkInstruction(phase, activity, {
    format: 'all',
    outputDir: './output/work-instructions',
  });
  console.log(`\n✅ Generated ${result.files.length} files`);
  result.files.forEach((f) => console.log(`   - ${f}`));
}

async function generateForm() {
  const holdPoint = args[1] || 'HP-1';

  console.log(`Generating Inspection Form for ${holdPoint}...\n`);
  const result = await qmsGenerator.generateInspectionForm(holdPoint, {
    format: 'all',
    outputDir: './output/forms',
  });
  console.log(`\n✅ Generated ${result.files.length} files`);
  result.files.forEach((f) => console.log(`   - ${f}`));
}

async function generateAll() {
  console.log('Generating Complete QMS Package...\n');
  const result = await qmsGenerator.generateCompleteQMS({
    format: 'all',
    outputDir: './output',
  });
  console.log(`\n✅ Complete QMS Generated!`);
  console.log(`   Total Files: ${result.summary.totalFiles}`);
  console.log(`   - Manual: ${result.summary.manualFiles} files`);
  console.log(`   - SOPs: ${result.summary.sopFiles} files`);
  console.log(`   - Forms: ${result.summary.formFiles} files`);
}

function showHelp() {
  console.log(`
Usage: npm run qms-generate <command> [options]

Commands:
  manual              Generate Quality Manual (QM-001)
  sop <phase>         Generate SOP for specific phase (1-8)
  wi <phase> <act>    Generate Work Instruction for phase and activity
  form <holdpoint>    Generate Inspection Form (HP-1 to HP-8)
  all                 Generate complete QMS package (all documents)
  help                Show this help message

Examples:
  npm run qms-generate manual
  npm run qms-generate sop 1
  npm run qms-generate wi 1 0
  npm run qms-generate form HP-1
  npm run qms-generate all

Output:
  All generated files are saved to the ./output directory in multiple formats:
  - PDF (for printing and approval)
  - DOCX (for editing)
  - Markdown (for version control)
  `);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
