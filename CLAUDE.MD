# CLAUDE.MD - AI Assistant Context Guide

> **Project:** Fort Homes LLC Quality Management System
> **Purpose:** Context and guidelines for AI assistants working on this codebase
> **Last Updated:** 2026-01-26

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
├── src/
│   ├── agents/                  # AI document generation agents
│   │   ├── manual-agent.ts      # Quality manual generation
│   │   ├── enhanced-manual-agent.ts
│   │   ├── procedure-agent.ts   # SOPs and Work Instructions
│   │   ├── compliance-agent.ts  # Regulatory compliance checking
│   │   ├── visual-agent.ts      # Mermaid diagram generation
│   │   ├── review-agent.ts      # Document review
│   │   ├── audit-agent.ts       # Version tracking
│   │   ├── orchestrator.ts      # Agent coordination
│   │   └── types.ts
│   ├── database/                # Database layer
│   │   ├── client.ts            # Prisma client singleton
│   │   └── index.ts
│   ├── generators/              # Document format generators
│   │   ├── pdf-generator.ts
│   │   ├── docx-generator.ts
│   │   └── qms-generator.ts
│   ├── lib/                     # Utility libraries
│   │   ├── compliance-checker.ts
│   │   ├── version-control.ts
│   │   └── audit-trail.ts
│   ├── pages/                   # Next.js frontend
│   │   └── index.tsx
│   ├── cli.ts                   # Command-line interface
│   └── server.js                # Development server
│
├── data/                        # Company configuration (JSON)
│   ├── company-info.json        # Company details, leadership, regulatory info
│   ├── phases.json              # 8 production phase definitions
│   ├── hold-points.json         # Quality gate criteria
│   └── itps.json                # Inspection Test Plan specs
│
├── docs/                        # Generated QMS documentation
│   ├── manual/                  # Quality Manual sections (QMS-000 through QMS-009)
│   ├── sops/                    # Standard Operating Procedures (SOP-001 through SOP-020)
│   ├── work-instructions/       # Work Instructions (WI-101 through WI-108)
│   ├── forms-templates/         # Inspection forms (FORM-I001 through FORM-I008)
│   ├── training/                # Training materials and matrices
│   ├── implementation/          # Implementation roadmap and phase summaries
│   ├── style-guide/             # Visual style and document templates
│   │   ├── QMS-VISUAL-STYLE-GUIDE.md
│   │   ├── COLOR-PALETTE.md
│   │   ├── TYPOGRAPHY-REFERENCE.md
│   │   ├── MERMAID-DIAGRAM-LIBRARY.md
│   │   ├── ICON-EMOJI-REFERENCE.md
│   │   └── DOCUMENT-TEMPLATES/  # Copy-paste ready templates
│   ├── context/                 # Brand system and regulatory requirements
│   └── ai-agents/               # AI agent architecture documentation
│
├── output/                      # Generated output files (PDF, DOCX, MD)
│   ├── manual/
│   ├── sops/
│   ├── work-instructions/
│   └── forms/
│
├── scripts/                     # Automation scripts
│   ├── generate-docs.js
│   ├── generate-pdf.js
│   ├── generate-professional-pdf.js
│   ├── generate-traveler.js
│   └── build-docs.sh
│
├── templates/                   # Document templates
│   └── traveler/
│       └── traveler-template.json
│
├── prisma/
│   └── schema.prisma            # Database schema definition
│
├── .mcp.json                    # MCP server configuration (Taskr integration)
├── README.md                    # Project documentation
├── GETTING-STARTED.md           # Quick start guide
└── CLAUDE.MD                    # This file
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

## 💾 Database Schema (Prisma)

Key models in `prisma/schema.prisma`:

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

# Database setup
npm run db:generate    # Generate Prisma client
npm run db:push        # Create/update database tables
npm run db:studio      # Open Prisma Studio (DB GUI)

# Development server (Next.js)
npm run dev            # Start dev server on http://localhost:3000
npm run build          # Build production bundle
npm run start          # Start production server
```

### Document Generation (CLI)
```bash
# Generate all documents
npm run qms-generate all

# Generate Quality Manual
npm run qms-generate manual

# Generate SOP for specific phase (1-8)
npm run qms-generate sop 4

# Generate Work Instruction
npm run qms-generate wi 1 0

# Generate Inspection Form
npm run qms-generate form HP-4
```

### PDF Generation (Legacy Scripts)
```bash
npm run generate:pdf          # Generate all PDFs
npm run generate:pdf:sops     # Generate SOP PDFs only
npm run pdf:sop-002          # Generate specific SOP PDF
```

### Build Scripts
```bash
npm run build:html           # Build HTML documentation
npm run build:pdf            # Build PDF documentation
npm run build:all            # Build HTML + PDF
```

---

## 🤖 AI Agent Architecture

The system uses a multi-agent approach for autonomous document generation:

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

### Agent Usage Example
```typescript
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

## 🎯 Common Development Patterns

### Reading Company Data
```typescript
import fs from 'fs';
import path from 'path';

const companyInfo = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'data/company-info.json'), 'utf-8')
);

const phases = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'data/phases.json'), 'utf-8')
);
```

### Generating Documents
```typescript
import { qmsGenerator } from './src/generators/qms-generator';

// Generate SOP
const sop = await qmsGenerator.generateSOP(phaseNumber);

// Export to multiple formats
await qmsGenerator.exportPDF(sop, 'output/sops/SOP-104.pdf');
await qmsGenerator.exportDOCX(sop, 'output/sops/SOP-104.docx');
await qmsGenerator.exportMarkdown(sop, 'output/sops/SOP-104.md');
```

### Database Operations
```typescript
import { prisma } from './src/database/client';

// Store document
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

// Log audit trail
await prisma.auditTrail.create({
  data: {
    documentId: doc.id,
    action: 'created',
    userId: 'system',
    changes: JSON.stringify({ action: 'Initial creation' }),
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

1. **Always check data files first** - Don't assume company details
2. **Use the TodoWrite tool** for multi-step tasks
3. **Reference existing documents** for consistency
4. **Follow the style guide religiously** - Fort Homes has strict branding
5. **Understand modular vs. manufactured** - Different regulatory frameworks
6. **HP-4 and HP-8 are sacred** - Never bypass TPIA requirements
7. **Prisma schema is the source of truth** for database structure
8. **Output folder is gitignored** - Generated files go there
9. **Scripts folder has legacy generators** - Prefer CLI (`src/cli.ts`)
10. **This is a real business** - Accuracy matters for regulatory compliance

---

## 📞 Project Contacts

- **Repository:** https://github.com/solidzdawg/fort-homes-qms
- **Company:** Fort and Homes LLC (DBA: Fort and Home)
- **Location:** 2828 North Avenue, Grand Junction, CO 81501
- **Email:** info@fortandhome.com

---

**Last Updated:** 2026-01-26
**Maintained By:** Document Controller
**Version:** 3.0

---

*This CLAUDE.MD file is intended for AI assistants working on the Fort Homes QMS codebase. It provides essential context, conventions, and guidelines to ensure consistent, compliant, and high-quality contributions.*
