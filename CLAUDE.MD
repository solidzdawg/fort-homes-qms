# CLAUDE.MD - AI Assistant Context Guide

> **Project:** Fort Homes LLC Quality Management System
> **Purpose:** Context and guidelines for AI assistants working on this codebase
> **Last Updated:** 2026-02-04

---

## 🎯 Project Overview

**Fort Homes LLC QMS** is an AI-powered Quality Management System for Colorado off-site modular home manufacturing. This is NOT a manufactured housing (mobile home) facility - we build IRC-compliant modular homes inspected by NTA (National Technical Systems) as our Third-Party Inspection Agency (TPIA).

### Core Purpose
- Generate professional QMS documentation (manuals, SOPs, work instructions, inspection forms)
- Ensure compliance with Colorado Division of Housing (CDOH) regulations (8 CCR 1302-14)
- Support modular construction manufacturing with 8 production phases
- Track quality metrics, NCRs/CAPAs, training, and audit trails
- Provide database-backed document management with Prisma + SQLite

### Key Technologies
- **Runtime:** Node.js 20+ / Next.js 14
- **Language:** TypeScript
- **Database:** Prisma ORM + SQLite (PostgreSQL-ready)
- **PDF Generation:** PDFKit, pdfmake, @react-pdf/renderer
- **DOCX Generation:** docx package
- **Visualization:** Mermaid.js, Chart.js, D3.js
- **Frontend:** React + Tailwind CSS
- **CLI:** tsx for TypeScript execution

---

## 🏗️ Business Domain Context

### Manufacturing Methodology
**Build-in-Place (Static Bay Manufacturing)**
- 5 production bays in Grand Junction, Colorado
- Modules built in fixed positions (not on assembly line)
- Offline fabrication stations for walls, panels, MEP pre-assembly
- Kitting zones adjacent to each bay

### 8 Production Phases & Hold Points

| Phase | Name | Hold Point | TPIA Required | Typical Duration |
|-------|------|------------|---------------|------------------|
| 1 | Chassis & Floor Deck | HP-1 | No | 1-2 days |
| 2 | Wall Framing & Sheathing | HP-2 | No | 2-3 days |
| 3 | Roof/Ceiling Framing | HP-3 | No | 2 days |
| 4 | MEP Rough-In & Testing | HP-4 | **Yes** | 3-4 days |
| 5 | Insulation & Air Sealing | HP-5 | No | 1-2 days |
| 6 | Drywall & Interior Shell | HP-6 | No | 2-3 days |
| 7 | Interior Trim & Finish | HP-7 | No | 2-3 days |
| 8 | Final Inspection & Pre-Ship | HP-8 | **Yes** | 1 day |

**Critical:** HP-4 (MEP) and HP-8 (Final) require NTA Third-Party Inspector approval before proceeding.

### Regulatory Framework
- **Primary Authority:** Colorado Division of Housing (CDOH)
- **Regulation:** 8 CCR 1302-14
- **Statute:** C.R.S. §24-32-3301 et seq.
- **TPIA:** ICC NTA, LLC (Brandy Watkins - Regional Manager)
- **Applicable Codes:**
  - IRC 2021 (International Residential Code)
  - NEC 2023 (National Electrical Code)
  - IPC 2021 (International Plumbing Code)
  - IMC 2021 (International Mechanical Code)
  - IECC 2021 (International Energy Conservation Code)

### Key Personnel
- **Jeff Zimmerman** - President (final approval authority, DOH liaison)
- **Marty Magill** - COO (operations oversight, supplier management)
- **Zach Lamont** - QA Manager (QMS owner, hold point inspections, TPIA coordination)

---

## 📁 Project Structure

```
fort-homes-qms/
├── .github/
│   └── workflows/               # CI/CD automation
│       ├── build-docs.yml
│       └── npm-publish.yml
│
├── assets/                      # Visual branding resources
│   ├── css/                     # Stylesheets
│   ├── fonts/                   # Inter font family (Regular, Bold)
│   ├── img/                     # Images and graphics
│   ├── styles/                  # Additional styling
│   └── svg/                     # SVG graphics
│
├── data/                        # Company configuration (JSON)
│   ├── cc21te/                  # Project-specific data
│   │   ├── materials-traceability.json
│   │   ├── project-plan.json
│   │   ├── tasks-phase-*.json   # Task lists for phases 1-8
│   │   └── traceability-matrix.json
│   ├── company-info.json        # Company details, leadership, regulatory info
│   ├── phases.json              # 8 production phase definitions
│   ├── hold-points.json         # Quality gate criteria
│   └── itps.json                # Inspection Test Plan specs
│
├── docs/                        # QMS documentation (119 markdown files, ~60K+ lines)
│   ├── ai-agents/               # AI agent architecture documentation
│   ├── context/                 # Brand system and regulatory requirements
│   │   ├── 01-BRAND-SYSTEM.md
│   │   └── 02-REGULATORY-REQUIREMENTS.md
│   ├── forms-templates/         # Inspection forms (FORM-I001 through FORM-I008)
│   ├── implementation/          # Implementation roadmap and phase summaries
│   ├── manual/                  # Quality Manual sections (QMS-000 through QMS-009)
│   ├── qc-tools/                # Quality control tools and checklists
│   ├── sops/                    # Standard Operating Procedures (18+ SOPs)
│   ├── style-guide/             # Visual style and document templates
│   │   ├── components/          # Reusable component library
│   │   │   ├── badges-status-indicators.md
│   │   │   ├── kpi-cards.md
│   │   │   ├── layouts-containers.md
│   │   │   ├── navigation-menus.md
│   │   │   └── tables-data-display.md
│   │   ├── DOCUMENT-TEMPLATES/  # Templates for SOPs, WIs, Forms
│   │   ├── QMS-VISUAL-STYLE-GUIDE.md
│   │   ├── COLOR-PALETTE.md
│   │   ├── TYPOGRAPHY-REFERENCE.md
│   │   ├── MERMAID-DIAGRAM-LIBRARY.md
│   │   └── ICON-EMOJI-REFERENCE.md
│   ├── traceability/            # Regulatory traceability matrices
│   ├── training/                # Training materials and matrices
│   └── work-instructions/       # Work Instructions (WI-101 through WI-108)
│       ├── Generic versions (WI-101 to WI-108)
│       ├── CC21TE project-specific versions
│       └── Visual work instruction prompts
│
├── scripts/                     # Automation scripts (Node.js)
│   ├── generate-professional-pdf.js  # PDF generation using PDFKit
│   ├── extract-cc21te.js        # Project data extraction
│   ├── auth-check.ps1           # PowerShell GitHub auth check
│   ├── setup-github.ps1         # PowerShell GitHub setup
│   └── setup-github.bat         # Windows batch GitHub setup
│
├── templates/                   # Document templates
│   └── sop-template.html        # HTML template for SOPs
│
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── .mcp.json                    # MCP server configuration (Taskr integration)
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── next-env.d.ts                # Next.js type definitions
├── README.md                    # Project documentation
├── GETTING-STARTED.md           # Quick start guide
└── CLAUDE.MD                    # This file

# Note: The following directories are gitignored (generated/runtime)
├── node_modules/                # NPM dependencies
├── .next/                       # Next.js build output
├── output/                      # Generated PDFs, DOCX files
│   ├── pdf/                     # PDF outputs
│   └── [other formats]/
└── dev.db                       # SQLite database (if created)
```

### 🚧 Implementation Status

**Currently Implemented:**
- ✅ Comprehensive QMS documentation (119 markdown files)
- ✅ Visual style guide and component library
- ✅ Data configuration files (JSON)
- ✅ PDF generation scripts (scripts/generate-professional-pdf.js)
- ✅ Next.js frontend framework setup
- ✅ TypeScript configuration
- ✅ GitHub workflows for automation

**Planned but Not Yet Implemented:**
- ⏳ src/ directory with AI agents (manual-agent.ts, procedure-agent.ts, etc.)
- ⏳ Database layer (Prisma schema exists in dependencies but no schema.prisma file)
- ⏳ CLI tool (src/cli.ts referenced in package.json but doesn't exist)
- ⏳ Document generators (src/generators/)
- ⏳ Compliance checker utilities (src/lib/)
- ⏳ Full web application frontend

**Current Focus:** This is primarily a **documentation repository** with professional-quality QMS content ready for manufacturing use. The AI-powered document generation system described in some documentation is aspirational.

---

## 📝 Working with Documentation

### Current Documentation Stats
- **Total Files:** 119+ markdown files
- **Total Lines:** ~60,000+ lines of content
- **SOPs:** 18+ Standard Operating Procedures
- **Work Instructions:** 16+ (8 generic + 8 CC21TE project-specific)
- **Forms:** 8+ inspection forms
- **Style Guides:** Comprehensive visual system with component library

### Document Types and Locations

| Document Type | Location | Naming Pattern | Example |
|--------------|----------|----------------|---------|
| Quality Manual | `docs/manual/` | QMS-000 to QMS-009 | QMS-001-QUALITY-POLICY.md |
| SOPs | `docs/sops/` | SOP-001 to SOP-020+ | SOP-104-MEP-ROUGH-IN.md |
| Work Instructions | `docs/work-instructions/` | WI-101 to WI-108 | WI-104-MEP-ROUGH-IN-TESTING.md |
| Forms | `docs/forms-templates/` | FORM-I001 to FORM-I008 | FORM-I004-MEP-ROUGH-IN.md |
| Style Guide | `docs/style-guide/` | Descriptive names | QMS-VISUAL-STYLE-GUIDE.md |
| Components | `docs/style-guide/components/` | Component type | kpi-cards.md |

### Creating New Documents

**Step-by-step process:**

1. **Choose the right template** from `docs/style-guide/DOCUMENT-TEMPLATES/`
   - SOP-TEMPLATE.md for procedures
   - WI-TEMPLATE.md for work instructions
   - FORM-TEMPLATE.md for forms

2. **Copy template to appropriate directory**
   ```bash
   cp docs/style-guide/DOCUMENT-TEMPLATES/SOP-TEMPLATE.md docs/sops/SOP-XXX-TITLE.md
   ```

3. **Update YAML frontmatter** with document metadata
   ```yaml
   ---
   title: "Your Document Title"
   document_id: "SOP-XXX"
   revision: "1.0"
   effective_date: "February 2026"
   process_owner: "QA Manager"
   next_review: "August 2026"
   classification: "CONTROLLED"
   ---
   ```

4. **Write content** following style guide conventions
   - Use Oswald-style headers (bold, large font)
   - Use emoji icons from `docs/style-guide/ICON-EMOJI-REFERENCE.md`
   - Follow color palette from `docs/style-guide/COLOR-PALETTE.md`
   - Use Mermaid diagrams from `docs/style-guide/MERMAID-DIAGRAM-LIBRARY.md`

5. **Generate PDF** using the working script
   ```bash
   node scripts/generate-professional-pdf.js
   ```

6. **Review output** in `output/pdf/`

### Editing Existing Documents

1. **Find the document** in `docs/` subdirectories
2. **Read data files first** if referencing company info
   ```typescript
   const companyInfo = require('./data/company-info.json');
   const phases = require('./data/phases.json');
   ```
3. **Make changes** following the style guide
4. **Increment revision** in frontmatter if substantive change
5. **Regenerate PDF** after editing

### Style Guide Quick Reference

**Typography:**
- **H1 Headers:** `# 🏗️ FORT HOMES LLC` (with emoji)
- **H2 Headers:** `## 📋 Section Title`
- **H3 Headers:** `### Subsection`
- **Body Text:** Regular paragraph text
- **Code/Technical:** Use backticks for technical terms

**Colors (for HTML/CSS in markdown):**
- Primary: #101810 (Charcoal Olive)
- Success: #2D5016 (Dark Green)
- Warning: #8B6914 (Dark Amber)
- Error: #8B1414 (Dark Red)
- Info: #1E3A5F (Dark Blue)

**Common Components:**
```markdown
<!-- Status Badge -->
<div style="background: linear-gradient(135deg, #2D5016 0%, #3A6B1E 100%); color: white; padding: 8px 16px; border-radius: 6px; display: inline-block; font-weight: bold;">
✅ APPROVED
</div>

<!-- KPI Card -->
<div style="background: linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%); color: white; padding: 20px; border-radius: 8px; margin: 10px 0;">
<div style="font-size: 24px; font-weight: bold;">95.2%</div>
<div style="font-size: 14px; opacity: 0.9;">First-Time Quality Rate</div>
</div>
```

### Referencing Other Documents

Use consistent cross-referencing:
```markdown
See SOP-104 (MEP Rough-In & Testing) for detailed procedures.
Refer to WI-104 for step-by-step work instructions.
Complete FORM-I004 at Hold Point HP-4.
Review QMS-005 (Training & Competency) for training requirements.
```

---

## 🎨 Documentation Standards

### Visual Style Guide
All QMS documents follow the **QMS Visual Style Guide** (`docs/style-guide/QMS-VISUAL-STYLE-GUIDE.md`):

**Typography:**
- **Headers (H1, H2):** Oswald font (Bold/SemiBold)
- **Body Text:** Open Sans 11pt Regular
- **Code/Technical:** JetBrains Mono 10pt
- **Tables:** Open Sans 10pt (Bold headers, Regular body)

**Color Palette:**
- **Primary:** Charcoal Olive (#101810)
- **Background:** Off-White (#F8F8F8)
- **Success:** Green (#4CAF50)
- **Warning/Hold:** Amber (#FF9800)
- **Error/Critical:** Red (#F44336)
- **Info:** Blue (#2196F3)
- **In Progress:** Purple (#9C27B0)

**Document Structure:**
```markdown
---
title: "[DOCUMENT TITLE]"
document_id: "[XXX-000]"
revision: "2.0"
effective_date: "January 2026"
process_owner: "[Role]"
next_review: "July 2026"
classification: "CONTROLLED"
---

<div align="center">

# 🏗️ FORT HOMES LLC
## Quality Management System

---

### [DOCUMENT TITLE]

| Attribute | Value |
|:----------|:------|
| **Document ID** | `XXX-000` |
| **Revision** | `2.0` |
| **Effective Date** | January 2026 |
| **Process Owner** | [Role] |
| **Classification** | CONTROLLED |

---

</div>
```

### Document Numbering System
- **Quality Manual:** QMS-000 through QMS-009
- **SOPs:** SOP-001 through SOP-020
- **Work Instructions:** WI-101 through WI-108 (phase-based)
- **Inspection Forms:** FORM-I001 through FORM-I008, FORM-QT-001 (traveler)

### Important Conventions
- **Hold Points:** Always use `HP-X` format (e.g., HP-4)
- **TPIA:** Refers to NTA (Third-Party Inspection Agency)
- **NCR:** Nonconformance Report
- **CAPA:** Corrective and Preventive Action
- **DOH:** Colorado Division of Housing
- **CDOH:** Colorado Division of Housing (interchangeable with DOH)

---

## 💾 Database Schema (Prisma) - PLANNED

**Note:** The database layer is planned but not yet implemented. No `prisma/schema.prisma` file exists currently.

Planned models:

```prisma
// Core document management
model Document {
  id           String   @id @default(cuid())
  type         String   // 'manual', 'sop', 'wi', 'form'
  number       String   @unique
  title        String
  version      String
  status       String   // 'draft', 'review', 'approved', 'superseded'
  content      String   // JSON-serialized content
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  auditTrail   AuditTrail[]
}

// Change tracking
model AuditTrail {
  id          String   @id @default(cuid())
  documentId  String
  action      String
  userId      String
  timestamp   DateTime @default(now())
  changes     String   // JSON-serialized diff
  document    Document @relation(fields: [documentId], references: [id])
}

// Production procedures
model Procedure {
  id          String   @id @default(cuid())
  phase       Int      // 1-8
  title       String
  description String
  holdPoint   String?  // 'HP-1' through 'HP-8'
  tpiaRequired Boolean @default(false)
}

// Quality gates
model HoldPoint {
  id          String   @id @default(cuid())
  number      String   @unique  // 'HP-1' through 'HP-8'
  phase       Int
  criteria    String   // JSON array
  tpiaRequired Boolean
}

// Nonconformance records
model NCR {
  id          String   @id @default(cuid())
  number      String   @unique
  moduleId    String
  description String
  severity    String
  status      String
  createdAt   DateTime @default(now())
}

// Training management
model TrainingRecord {
  id          String   @id @default(cuid())
  employeeId  String
  courseId    String
  completedAt DateTime
  expiresAt   DateTime?
}

// Quality metrics
model QualityMetric {
  id          String   @id @default(cuid())
  metricType  String
  value       Float
  target      Float
  period      String
  recordedAt  DateTime @default(now())
}

// Supplier management
model Supplier {
  id          String   @id @default(cuid())
  name        String
  status      String   // 'approved', 'conditional', 'suspended'
  category    String
  rating      Float?
}
```

---

## 🔧 Common Commands

### Setup & Development
```bash
# Install dependencies
npm install

# Development server (Next.js)
npm run dev            # Start dev server on http://localhost:3000
npm run build          # Build production bundle
npm run start          # Start production server
```

### PDF Generation (Current Implementation)
```bash
# Generate professional PDFs using PDFKit
node scripts/generate-professional-pdf.js

# Generate SOP PDFs only
node scripts/generate-professional-pdf.js --sops

# Generate traveler documents
npm run generate-traveler
```

### Database Commands (Planned - Not Yet Functional)
```bash
# These commands are in package.json but won't work until Prisma schema is created
npm run db:generate    # Generate Prisma client (requires prisma/schema.prisma)
npm run db:push        # Create/update database tables
npm run db:studio      # Open Prisma Studio (DB GUI)
```

### Document Generation CLI (Planned - Not Yet Functional)
```bash
# These commands reference src/cli.ts which doesn't exist yet
npm run qms-generate all
npm run qms-generate manual
npm run qms-generate sop 4
npm run qms-generate wi 1 0
npm run qms-generate form HP-4
```

### GitHub Workflows
The repository has automated workflows:
- `.github/workflows/build-docs.yml` - Document build automation
- `.github/workflows/npm-publish.yml` - NPM package publishing

---

## 🤖 AI Agent Architecture - PLANNED

**Note:** The AI agent system is described in documentation (`docs/ai-agents/`) but not yet implemented in code. No `src/agents/` directory exists.

Planned multi-agent approach for autonomous document generation:

### Agent Roles

**1. ManualAgent** (`src/agents/manual-agent.ts`)
- Generates Quality Manual sections
- Ensures structure follows QMS framework
- Uses company data from `data/company-info.json`

**2. ProcedureAgent** (`src/agents/procedure-agent.ts`)
- Creates SOPs and Work Instructions
- Phase-aware (1-8 production phases)
- Includes hold point criteria

**3. ComplianceAgent** (`src/agents/compliance-agent.ts`)
- Validates documents against regulations
- Checks for required elements (CCR references, NTA requirements)
- Ensures no ISO 9001 references (company not ISO certified)

**4. VisualAgent** (`src/agents/visual-agent.ts`)
- Generates Mermaid.js diagrams
- Creates flowcharts, SIPOC diagrams, org charts
- Follows brand color palette

**5. ReviewAgent** (`src/agents/review-agent.ts`)
- Automated document review
- Suggests improvements
- Checks consistency

**6. AuditAgent** (`src/agents/audit-agent.ts`)
- Tracks document versions
- Maintains audit trail
- Records changes

**7. Orchestrator** (`src/agents/orchestrator.ts`)
- Coordinates all agents
- Manages workflow
- Handles dependencies

### Agent Usage Example (Planned)
```typescript
// This code doesn't work yet - src/agents/ directory doesn't exist
import { orchestrator } from './src/agents/orchestrator';

// Generate Quality Manual
const manual = await orchestrator.generateQualityManual();

// Generate SOP for Phase 4 (MEP)
const sop = await orchestrator.generateSOP(4);

// Check compliance
const complianceResult = await orchestrator.checkCompliance('sop', sopContent);

// Review document
const review = await orchestrator.reviewDocument('SOP-104', 'sop', content);
```

**Current Workaround:** Documents are currently authored manually in markdown and converted to PDF using `scripts/generate-professional-pdf.js`.

---

## 📊 Data Configuration Files

### company-info.json
**Purpose:** Company details, leadership, regulatory framework
**Key Sections:**
- `company` - Legal name, address, contact info
- `leadership` - Jeff Zimmerman (President), Marty Magill (COO), Zach Lamont (QA Manager)
- `regulatory` - CDOH, NTA TPIA, applicable codes
- `facility` - Production bays, offline fabrication areas
- `products` - 7 modular home models (Aspen Commons, Melrose, Summit, Grand)
- `qms` - Document prefix (`FHDEV`), revision (`3.0`)

### phases.json
**Purpose:** 8 production phase definitions
**Structure:** Each phase includes:
- Phase number (1-8)
- Name (e.g., "Chassis & Floor Deck")
- Hold point (HP-1 through HP-8)
- Activities array
- Duration estimates
- Crew size requirements
- TPIA required flag

### hold-points.json
**Purpose:** Quality gate inspection criteria
**Structure:** Each hold point includes:
- Hold point number (HP-1 through HP-8)
- Phase number
- Description
- Inspection criteria array
- TPIA required flag
- Forms required

### itps.json
**Purpose:** Inspection Test Plan specifications
**Structure:** Detailed inspection criteria for each phase

---

## 🚨 Critical Rules & Context

### DO NOT:
1. **Reference ISO 9001** - Fort Homes is NOT ISO certified. Use generic quality management terminology only.
2. **Confuse with Manufactured Housing (HUD Code)** - This is modular construction regulated by CDOH, not HUD manufactured housing.
3. **Skip Hold Points** - HP-4 (MEP) and HP-8 (Final) require TPIA sign-off. Never allow production to proceed without approval.
4. **Ignore Style Guide** - All documents MUST follow `docs/style-guide/QMS-VISUAL-STYLE-GUIDE.md`
5. **Hardcode Company Data** - Always read from `data/` JSON files

### DO:
1. **Reference Colorado Regulations** - 8 CCR 1302-14, C.R.S. §24-32-3301
2. **Mention NTA as TPIA** - ICC NTA, LLC is the Third-Party Inspection Agency
3. **Use Correct Codes** - IRC 2021, NEC 2023, IPC 2021, IMC 2021, IECC 2021
4. **Follow Brand Guidelines** - Oswald headers, Open Sans body, brand color palette
5. **Track Changes** - Use audit trail and version control
6. **Generate Multiple Formats** - PDF, DOCX, and Markdown for all documents

### Important Business Rules
- **Hold Point HP-4:** MEP Rough-In must pass NTA inspection before insulation
- **Hold Point HP-8:** Final inspection must pass NTA before module can ship
- **QA Manager Authority:** Zach Lamont is sole authority to apply DOH Insignia
- **Document Control:** All QMS documents are CONTROLLED and require approval
- **Record Retention:** Minimum 7 years for all quality records

---

## 🎯 Current Development Patterns

### Reading Company Data (Working)
```typescript
import fs from 'fs';
import path from 'path';

// This pattern works - data files exist
const companyInfo = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'data/company-info.json'), 'utf-8')
);

const phases = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'data/phases.json'), 'utf-8')
);

const holdPoints = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'data/hold-points.json'), 'utf-8')
);
```

### Generating PDFs (Working)
```bash
# Use the existing PDF generation script
node scripts/generate-professional-pdf.js

# Or use the npm script
npm run generate:pdf
```

### Document Creation Workflow (Current Process)
1. **Author in Markdown:** Create/edit markdown files in `docs/` following style guide
2. **Use Templates:** Reference `docs/style-guide/DOCUMENT-TEMPLATES/` for structure
3. **Include Frontmatter:** Add YAML metadata (document_id, revision, effective_date, etc.)
4. **Generate PDF:** Run `node scripts/generate-professional-pdf.js` to convert to PDF
5. **Review Output:** Check generated PDFs in `output/pdf/`

### Planned Development Patterns (Not Yet Implemented)

#### Document Generation (Planned)
```typescript
// This won't work yet - src/generators/ doesn't exist
import { qmsGenerator } from './src/generators/qms-generator';

const sop = await qmsGenerator.generateSOP(phaseNumber);
await qmsGenerator.exportPDF(sop, 'output/sops/SOP-104.pdf');
```

#### Database Operations (Planned)
```typescript
// This won't work yet - no Prisma schema exists
import { prisma } from './src/database/client';

const doc = await prisma.document.create({
  data: {
    type: 'sop',
    number: 'SOP-104',
    title: 'MEP Rough-In & Testing',
    version: '2.0',
    status: 'approved',
    content: JSON.stringify(sopContent),
  },
});
```

---

## 📖 Essential Reference Documents

When working on this codebase, frequently reference:

1. **QMS-VISUAL-STYLE-GUIDE.md** - All visual and formatting standards
2. **MERMAID-DIAGRAM-LIBRARY.md** - Diagram templates and examples
3. **company-info.json** - Company details, personnel, regulatory info
4. **phases.json** - Production phase definitions
5. **hold-points.json** - Quality gate criteria
6. **README.md** - High-level project overview
7. **GETTING-STARTED.md** - Quick start and usage examples

---

## 🔗 External Resources

- **Colorado Division of Housing:** https://cdola.colorado.gov/housing
- **ICC NTA:** https://www.icc-es.org/nta/
- **HUD Manufactured Housing:** https://www.hud.gov/program_offices/housing/ramh/mhs/mhshome
- **Colorado Regulations (8 CCR 1302-14):** https://www.sos.state.co.us/CCR/

---

## 🎓 Quick Context for Common Tasks

### Task: Generate a new SOP
1. Ensure `data/phases.json` has phase definition
2. Run `npm run qms-generate sop [phase-number]`
3. Review generated files in `output/sops/`
4. Verify compliance with style guide
5. Store in database if approved

### Task: Update company information
1. Edit `data/company-info.json`
2. Regenerate affected documents
3. Update database records
4. Create audit trail entry

### Task: Create inspection form
1. Check `data/hold-points.json` for criteria
2. Run `npm run qms-generate form HP-X`
3. Verify TPIA requirements if HP-4 or HP-8
4. Export to PDF and DOCX

### Task: Add new production phase
1. Update `data/phases.json`
2. Update `data/hold-points.json`
3. Regenerate SOPs and Work Instructions
4. Update Quality Manual if needed
5. Create corresponding inspection forms

---

## 🔒 Security & Compliance Notes

- All documents marked **CONTROLLED** require formal approval process
- NTA TPIA access credentials stored in `.env` (not in repo)
- Database contains sensitive production data - handle appropriately
- HIPAA does not apply (manufacturing, not healthcare)
- ITAR does not apply (residential construction, not defense)

---

## 💡 Tips for AI Assistants

### What Currently Works
1. **Documentation is the product** - Focus on markdown files in `docs/`
2. **Data files are authoritative** - Read from `data/*.json` for company info
3. **PDF generation works** - Use `scripts/generate-professional-pdf.js`
4. **Style guide is comprehensive** - `docs/style-guide/` has everything you need
5. **Templates exist** - Use `docs/style-guide/DOCUMENT-TEMPLATES/` for structure

### Critical Business Context
1. **This is modular construction, NOT manufactured housing** - Different regulatory frameworks
2. **HP-4 and HP-8 are sacred** - Never bypass NTA TPIA requirements
3. **No ISO 9001 references** - Fort Homes is not ISO certified
4. **Accuracy matters** - Real business submitting to Colorado DOH for certification
5. **Colorado-specific regulations** - 8 CCR 1302-14, IRC 2021, NEC 2023

### Development Guidelines
1. **Check what exists before coding** - Many planned features aren't implemented yet
2. **Follow the style guide religiously** - Fort Homes has strict branding
3. **Use the TodoWrite tool** for multi-step tasks
4. **Reference existing documents** for consistency in tone and structure
5. **Markdown is source of truth** - Not database, not TypeScript (those are planned)

### What Doesn't Work Yet
1. **No src/ directory** - AI agents, generators, database client don't exist
2. **No Prisma schema** - Database commands in package.json won't work
3. **No CLI tool** - `npm run qms-generate` references non-existent `src/cli.ts`
4. **No web frontend** - Next.js is configured but no pages exist

### When Asked to Implement New Features
1. **Start with documentation** - Create markdown files first
2. **Follow existing patterns** - Look at `docs/sops/` or `docs/work-instructions/`
3. **Use data files** - Pull company info from `data/company-info.json`
4. **Generate PDFs** - Use the working script: `node scripts/generate-professional-pdf.js`
5. **Consider if code is needed** - Often markdown + existing scripts is sufficient

---

## 📞 Project Contacts

- **Repository:** https://github.com/solidzdawg/fort-homes-qms
- **Company:** Fort and Homes LLC (DBA: Fort and Home)
- **Location:** 2828 North Avenue, Grand Junction, CO 81501
- **Email:** info@fortandhome.com

---

**Last Updated:** 2026-02-04
**Maintained By:** Document Controller
**Version:** 3.1

**Changelog:**
- 2026-02-04: Updated to reflect current repository state (v3.1)
  - Removed references to non-existent src/ directory
  - Added implementation status indicators
  - Updated project structure to match actual files
  - Clarified what works vs. what's planned
  - Updated commands section with working vs. non-functional commands
- 2026-01-26: Initial comprehensive version (v3.0)

---

*This CLAUDE.MD file is intended for AI assistants working on the Fort Homes QMS codebase. It provides essential context, conventions, and guidelines to ensure consistent, compliant, and high-quality contributions.*

**Repository Focus:** This is primarily a **professional QMS documentation repository** with 119+ markdown files totaling 60,000+ lines of regulatory-compliant content. The AI-powered generation system is aspirational/planned for future development.
