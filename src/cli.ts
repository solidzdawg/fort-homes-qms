#!/usr/bin/env node
/**
 * Fort Homes QMS - Command Line Interface
 * Generate and manage QMS documents using AI agents
 */

import { Command } from 'commander';
import { orchestrator } from './agents';
import { prisma } from './database';

const program = new Command();

program
  .name('qms')
  .description('Fort Homes QMS - AI-powered document generation and management')
  .version('3.0.0');

// Generate commands
const generateCmd = program
  .command('generate')
  .description('Generate QMS documents');

generateCmd
  .command('all')
  .description('Generate complete QMS documentation suite (Manual + SOPs + WIs)')
  .action(async () => {
    try {
      console.log('🚀 Starting complete QMS generation...\n');
      const result = await orchestrator.execute('generate-all');
      
      if (result.success) {
        console.log(`\n✅ Success! Generated ${result.documents.length} documents.`);
      } else {
        console.log(`\n⚠️  Completed with ${result.errors.length} errors:`);
        result.errors.forEach(err => console.log(`  - ${err}`));
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Error:', error);
      process.exit(1);
    }
  });

generateCmd
  .command('manual')
  .description('Generate Quality Manual sections only')
  .action(async () => {
    try {
      console.log('📋 Generating Quality Manual...\n');
      const result = await orchestrator.execute('generate-manual');
      
      if (result.success) {
        console.log(`\n✅ Success! Generated ${result.documents.length} manual sections.`);
      } else {
        console.log(`\n⚠️  Completed with ${result.errors.length} errors:`);
        result.errors.forEach(err => console.log(`  - ${err}`));
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Error:', error);
      process.exit(1);
    }
  });

generateCmd
  .command('sop [phase]')
  .description('Generate Standard Operating Procedures (optionally for specific phase 1-8)')
  .action(async (phase) => {
    try {
      const phaseNum = phase ? parseInt(phase) : undefined;
      
      if (phaseNum !== undefined && (phaseNum < 1 || phaseNum > 8)) {
        console.error('❌ Phase must be between 1 and 8');
        process.exit(1);
      }

      if (phaseNum) {
        console.log(`📋 Generating SOP for Phase ${phaseNum}...\n`);
        const result = await orchestrator.execute('generate-phase', { phase: phaseNum });
        console.log(`\n✅ Success! Generated SOP-${100 + phaseNum}`);
      } else {
        console.log('📋 Generating all SOPs...\n');
        const result = await orchestrator.execute('generate-sops');
        console.log(`\n✅ Success! Generated ${result.documents.length} SOPs.`);
      }
    } catch (error) {
      console.error('❌ Error:', error);
      process.exit(1);
    }
  });

generateCmd
  .command('wi [phase]')
  .description('Generate Work Instructions (optionally for specific phase 1-8)')
  .action(async (phase) => {
    try {
      const phaseNum = phase ? parseInt(phase) : undefined;
      
      if (phaseNum !== undefined && (phaseNum < 1 || phaseNum > 8)) {
        console.error('❌ Phase must be between 1 and 8');
        process.exit(1);
      }

      if (phaseNum) {
        console.log(`📋 Generating Work Instruction for Phase ${phaseNum}...\n`);
        const result = await orchestrator.execute('generate-phase', { phase: phaseNum });
        console.log(`\n✅ Success! Generated WI-${100 + phaseNum}`);
      } else {
        console.log('📋 Generating all Work Instructions...\n');
        const result = await orchestrator.execute('generate-wis');
        console.log(`\n✅ Success! Generated ${result.documents.length} Work Instructions.`);
      }
    } catch (error) {
      console.error('❌ Error:', error);
      process.exit(1);
    }
  });

generateCmd
  .command('forms [type]')
  .description('Generate forms (inspection, ncr, approval, training, checklist)')
  .action(async (type) => {
    try {
      const { FormAgent } = await import('./agents/form-agent');
      const formAgent = new FormAgent();
      
      if (!type) {
        console.log('📋 Generating all inspection forms...\n');
        const forms = await formAgent.execute('inspection');
        console.log(`\n✅ Success! Generated ${forms.length} inspection forms.`);
      } else if (type === 'inspection') {
        console.log('📋 Generating inspection forms...\n');
        const forms = await formAgent.execute('inspection');
        console.log(`\n✅ Success! Generated ${forms.length} inspection forms.`);
      } else if (type === 'ncr') {
        console.log('📋 Generating NCR form...\n');
        await formAgent.execute('ncr');
        console.log('\n✅ Success! Generated NCR form.');
      } else if (type === 'approval') {
        console.log('📋 Generating approval form...\n');
        await formAgent.execute('approval');
        console.log('\n✅ Success! Generated approval form.');
      } else if (type === 'training') {
        console.log('📋 Generating training form...\n');
        await formAgent.execute('training');
        console.log('\n✅ Success! Generated training form.');
      } else if (type === 'checklist') {
        console.log('📋 Generating checklist form...\n');
        await formAgent.execute('checklist');
        console.log('\n✅ Success! Generated checklist form.');
      } else {
        console.error('❌ Unknown form type. Use: inspection, ncr, approval, training, or checklist');
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Error:', error);
      process.exit(1);
    }
  });

generateCmd
  .command('training <type>')
  .description('Generate training materials (matrix, material, assessment, record, acknowledgment)')
  .option('-r, --role <role>', 'Role for training (e.g., "Production Operator")')
  .option('-t, --topic <topic>', 'Topic for training material')
  .option('-p, --phase <phase>', 'Phase number for training material (1-8)')
  .action(async (type, cmdOptions) => {
    try {
      const { TrainingAgent } = await import('./agents/training-agent');
      const trainingAgent = new TrainingAgent();
      
      const validTypes = ['matrix', 'material', 'assessment', 'record', 'acknowledgment'];
      
      if (!validTypes.includes(type)) {
        console.error(`❌ Unknown training type. Use: ${validTypes.join(', ')}`);
        process.exit(1);
      }

      console.log(`📚 Generating training ${type}...\n`);
      
      const trainingOptions: any = {};
      if (cmdOptions.role) trainingOptions.role = cmdOptions.role;
      if (cmdOptions.topic) trainingOptions.topic = cmdOptions.topic;
      if (cmdOptions.phase) {
        const phaseNum = parseInt(cmdOptions.phase);
        if (phaseNum < 1 || phaseNum > 8) {
          console.error('❌ Phase must be between 1 and 8');
          process.exit(1);
        }
        trainingOptions.phase = phaseNum;
      }
      
      const docs = await trainingAgent.execute(type as any, trainingOptions);
      console.log(`\n✅ Success! Generated ${docs.length} training document(s).`);
    } catch (error) {
      console.error('❌ Error:', error);
      process.exit(1);
    }
  });

// Database commands
const dbCmd = program
  .command('db')
  .description('Database operations');

dbCmd
  .command('status')
  .description('Check database connection and statistics')
  .action(async () => {
    try {
      const docCount = await prisma.document.count();
      const auditCount = await prisma.auditTrail.count();
      const procCount = await prisma.procedure.count();

      console.log('📊 Database Status:\n');
      console.log(`  Documents: ${docCount}`);
      console.log(`  Audit Trail Entries: ${auditCount}`);
      console.log(`  Procedures: ${procCount}`);
      console.log('\n✅ Database connection OK');
    } catch (error) {
      console.error('❌ Database error:', error);
      process.exit(1);
    }
  });

dbCmd
  .command('list')
  .description('List all documents in database')
  .action(async () => {
    try {
      const docs = await prisma.document.findMany({
        orderBy: { number: 'asc' },
      });

      console.log('📄 Documents in Database:\n');
      
      if (docs.length === 0) {
        console.log('  No documents found.');
        return;
      }

      console.log('  Type | Number      | Title                           | Status   | Version');
      console.log('  -----|-------------|--------------------------------|----------|--------');
      
      docs.forEach(doc => {
        const type = doc.type.padEnd(4);
        const number = doc.number.padEnd(11);
        const title = doc.title.length > 30 ? doc.title.substring(0, 27) + '...' : doc.title.padEnd(30);
        const status = doc.status.padEnd(8);
        
        console.log(`  ${type} | ${number} | ${title} | ${status} | ${doc.version}`);
      });

      console.log(`\n  Total: ${docs.length} documents`);
    } catch (error) {
      console.error('❌ Error:', error);
      process.exit(1);
    }
  });

// Validate command
program
  .command('validate <file>')
  .description('Validate a document file for compliance and quality')
  .action(async (file) => {
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      if (!fs.existsSync(file)) {
        console.error(`❌ File not found: ${file}`);
        process.exit(1);
      }

      const content = fs.readFileSync(file, 'utf-8');
      const docType = path.basename(file);

      console.log(`🔍 Validating ${docType}...\n`);
      
      const result = await orchestrator.validateDocument(content, docType);
      
      console.log('\n📊 Validation Report:\n');
      console.log(`  Overall Score: ${result.overallScore}%`);
      console.log(`  Compliance: ${result.compliance.score}% (${result.compliance.isCompliant ? '✅ Pass' : '❌ Fail'})`);
      console.log(`  Review: ${result.review.score}%`);
      
      if (result.compliance.issues.length > 0) {
        console.log('\n  Compliance Issues:');
        result.compliance.issues.forEach((issue: any) => {
          console.log(`    - [${issue.severity}] ${issue.description}`);
        });
      }

      if (result.review.improvements.length > 0) {
        console.log('\n  Improvements Needed:');
        result.review.improvements.forEach((imp: string) => {
          console.log(`    - ${imp}`);
        });
      }

      if (result.overallScore < 80) {
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Error:', error);
      process.exit(1);
    }
  });

// Audit command
program
  .command('audit [documentId]')
  .description('Show audit trail for a document or recent activity')
  .action(async (documentId) => {
    try {
      const { AuditAgent } = await import('./agents/audit-agent');
      const auditAgent = new AuditAgent();
      
      const report = await auditAgent.generateReport(documentId);
      console.log(report);
    } catch (error) {
      console.error('❌ Error:', error);
      process.exit(1);
    }
  });

// Parse command line arguments
program.parse(process.argv);
