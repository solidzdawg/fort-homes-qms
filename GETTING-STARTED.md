# Getting Started with Fort Homes QMS

This guide will help you get started with the Fort Homes Quality Management System.

## Installation

```bash
# Clone the repository
git clone https://github.com/solidzdawg/fort-homes-qms.git
cd fort-homes-qms

# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY if using AI features
```

## Initialize Database

```bash
# Generate Prisma client
npm run db:generate

# Create database tables
npm run db:push

# Optional: Open Prisma Studio to view database
npm run db:studio
```

## Generate Documents

### Generate Everything

Generate the complete QMS package (Quality Manual + SOPs + Forms):

```bash
npm run qms-generate all
```

This will create:
- `output/manual/` - Quality Management System Manual
- `output/sops/` - Standard Operating Procedures for all 8 phases
- `output/forms/` - Inspection forms for all 8 hold points

Each document is generated in three formats:
- **PDF** - For printing and official use
- **DOCX** - For editing in Microsoft Word
- **Markdown** - For version control

### Generate Specific Documents

#### Quality Manual

```bash
npm run qms-generate manual
```

Generates the complete Quality Manual (QM-001) with all sections.

#### Standard Operating Procedures

```bash
# Generate SOP for Phase 1 (Chassis & Floor Deck)
npm run qms-generate sop 1

# Generate SOP for Phase 4 (MEP Rough-In)
npm run qms-generate sop 4
```

Generate SOPs for specific production phases (1-8).

#### Work Instructions

```bash
# Generate WI for Phase 1, Activity 0
npm run qms-generate wi 1 0

# Generate WI for Phase 2, Activity 1
npm run qms-generate wi 2 1
```

Generate detailed work instructions for specific activities within a phase.

#### Inspection Forms

```bash
# Generate form for Hold Point 1
npm run qms-generate form HP-1

# Generate form for Hold Point 4 (NTA inspection)
npm run qms-generate form HP-4
```

Generate inspection forms for quality hold points.

## Using the AI Agents

The system includes specialized AI agents for document generation. Here's how to use them programmatically:

```typescript
import { orchestrator } from './src/agents/orchestrator';

// Generate Quality Manual
const manual = await orchestrator.generateQualityManual();

// Generate SOP for phase 2
const sop = await orchestrator.generateSOP(2);

// Check compliance
const compliance = await orchestrator.checkCompliance('sop', sopContent);

// Review document
const review = await orchestrator.reviewDocument('SOP-101', 'sop', content);
```

## Working with the Database

### Store a Document

```typescript
import { prisma } from './src/database/client';

await prisma.document.create({
  data: {
    type: 'sop',
    number: 'SOP-101',
    title: 'Chassis and Floor Deck',
    version: '1.0',
    status: 'draft',
    content: JSON.stringify(sopContent),
  },
});
```

### Get Document History

```typescript
import { AuditTrail } from './src/lib/audit-trail';

const history = await AuditTrail.getTrail('document-id');
console.log(history);
```

### Check Compliance

```typescript
import { complianceChecker } from './src/lib/compliance-checker';

const results = complianceChecker.check(documentContent, 'sop');
const isCompliant = complianceChecker.isCompliant(results);
const report = complianceChecker.generateReport(results);

console.log(report);
```

## Customizing Company Data

All company-specific data is stored in JSON files in the `data/` directory:

- **`company-info.json`** - Company details, leadership, contact information
- **`phases.json`** - Production phase definitions
- **`hold-points.json`** - Quality gate and inspection criteria
- **`itps.json`** - Inspection Test Plan specifications

Edit these files to customize the QMS for your specific needs.

## Production Phases

Fort Homes uses 8 production phases:

1. **Phase 1: Chassis & Floor Deck** (HP-1)
2. **Phase 2: Wall Framing & Sheathing** (HP-2)
3. **Phase 3: Roof/Ceiling Framing** (HP-3)
4. **Phase 4: MEP Rough-In & Testing** (HP-4) - NTA Required
5. **Phase 5: Insulation & Air Sealing** (HP-5)
6. **Phase 6: Drywall & Interior Shell** (HP-6)
7. **Phase 7: Interior Finish & Trim** (HP-7)
8. **Phase 8: Final Inspection & Pre-Ship** (HP-8) - NTA Required

## Next Steps

1. **Review Generated Documents** - Check the `output/` directory for generated files
2. **Customize Data** - Edit JSON files in `data/` directory to match your operations
3. **Database Setup** - Initialize database and start tracking documents
4. **Integrate with Workflows** - Use the API to integrate with your existing systems
5. **Train Team** - Distribute generated SOPs and WIs to production team

## Support

For questions or issues:
- Check the main [README.md](./README.md) for detailed documentation
- Review the [Project Structure](./README.md#-project-structure)
- Contact Fort Homes QA team

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                  AI Agent Layer                      │
│  (QMSManual, Procedure, Compliance, Visual, etc.)   │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│              Document Generators                     │
│         (PDF, DOCX, Markdown, JSON)                 │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│              Database Layer                          │
│          (Prisma + SQLite/PostgreSQL)               │
└──────────────────────────────────────────────────────┘
```

The system follows a layered architecture:
1. **AI Agents** - Generate intelligent content
2. **Generators** - Convert to professional formats
3. **Database** - Store and track everything
