# Fort Homes LLC QMS - Quality Management System

A cutting-edge, AI-powered Quality Management System for **Colorado off-site modular home construction** with **NTA (National Technical Systems)** as third-party inspector.

## 🏠 About Fort Homes LLC

Fort Homes LLC manufactures modular residential structures in Grand Junction, Colorado under:
- **Colorado Division of Housing (CDOH)** regulations (8 CCR 1302-14)
- **HUD Code** (24 CFR Part 3280) for manufactured housing
- **NTA, Inc.** Third-Party Inspection Agency (TPIA) coordination
- **IRC 2021, NEC 2023, IPC 2021, IECC 2021** building codes

## 🚀 Key Features

### 🤖 AI Agent Framework
Multi-agent system for autonomous document generation:
- **QMSManualAgent** - Generates complete quality manual sections
- **ProcedureAgent** - Creates SOPs, Work Instructions, and inspection forms
- **ComplianceAgent** - Validates documents against Colorado DHO and HUD regulations
- **VisualAgent** - Generates diagrams, flowcharts, and visual process documentation
- **ReviewAgent** - Automated document review and improvement suggestions
- **AuditAgent** - Tracks document versions, changes, and audit trails

### 📄 Professional Document Generation
- **PDF** export with professional formatting (headers, footers, page numbers, TOC)
- **DOCX** export for editing
- **Markdown** as source format
- Template-based generation
- Version control and revision history
- Document numbering system (QM-001, SOP-001, WI-001, FORM-001)
- Approval workflow tracking
- Watermarks for draft/controlled documents

### 🗄️ Database Persistence
SQLite database with Prisma ORM for:
- Document storage and versioning
- Audit trail tracking
- Procedure and hold point management
- NCR/CAPA records
- Training records
- Quality metrics
- Supplier management

### 📊 Visual Documentation
Generates comprehensive visual documentation:
- Process flowcharts (Mermaid.js)
- Inspection checklists
- Organizational charts
- SIPOC diagrams
- Control charts and Pareto charts
- Fishbone/Ishikawa diagrams

## 📁 Project Structure

```
fort-homes-qms/
├── src/
│   ├── agents/              # AI agents for autonomous document work
│   │   ├── manual-agent.ts  # Quality manual generation
│   │   ├── procedure-agent.ts # SOPs and WIs
│   │   ├── compliance-agent.ts # Regulatory compliance
│   │   ├── visual-agent.ts  # Diagram generation
│   │   ├── review-agent.ts  # Document review
│   │   ├── audit-agent.ts   # Version tracking
│   │   └── orchestrator.ts  # Agent coordination
│   ├── database/            # Prisma/database layer
│   │   ├── client.ts
│   │   └── index.ts
│   ├── generators/          # Document generation
│   │   ├── pdf-generator.ts
│   │   ├── docx-generator.ts
│   │   └── qms-generator.ts
│   ├── lib/                 # Utilities
│   │   ├── compliance-checker.ts
│   │   ├── version-control.ts
│   │   └── audit-trail.ts
│   ├── templates/           # Document templates
│   │   ├── manual/
│   │   ├── sops/
│   │   ├── work-instructions/
│   │   └── forms/
│   └── cli.ts               # Command-line interface
├── data/                    # Company data
│   ├── company-info.json
│   ├── phases.json
│   ├── hold-points.json
│   └── itps.json
├── output/                  # Generated documents
│   ├── manual/
│   ├── sops/
│   ├── work-instructions/
│   └── forms/
├── prisma/                  # Database schema
│   └── schema.prisma
└── docs/                    # Existing QMS documentation
```

## 🎯 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
git clone https://github.com/solidzdawg/fort-homes-qms.git
cd fort-homes-qms
npm install
```

### Setup Database

```bash
# Generate Prisma client
npm run db:generate

# Create database
npm run db:push
```

### Generate QMS Documents

```bash
# Generate complete QMS package (Manual + SOPs + Forms)
npm run qms-generate all

# Generate Quality Manual only
npm run qms-generate manual

# Generate SOP for specific phase (1-8)
npm run qms-generate sop 1

# Generate Work Instruction
npm run qms-generate wi 1 0

# Generate Inspection Form
npm run qms-generate form HP-1
```

### View Generated Documents

All generated documents are saved to `./output/` directory in multiple formats:
- **PDF** - Ready for printing and official use
- **DOCX** - Editable Microsoft Word format
- **Markdown** - Version control friendly
- **JSON** - Interactive forms data

## 📊 Production Phases

Fort Homes uses a **Build-in-Place (Static Bay)** manufacturing approach with 8 production phases:

| Phase | Description | Hold Point | NTA Required |
|-------|-------------|------------|--------------|
| 1 | Chassis & Floor Deck | HP-1 | No |
| 2 | Wall Framing & Sheathing | HP-2 | No |
| 3 | Roof/Ceiling Framing | HP-3 | No |
| 4 | MEP Rough-In & Testing | HP-4 | **Yes** |
| 5 | Insulation & Air Sealing | HP-5 | No |
| 6 | Drywall & Interior Shell | HP-6 | No |
| 7 | Interior Finish & Trim | HP-7 | No |
| 8 | Final Inspection & Pre-Ship | HP-8 | **Yes** |

## 🔍 Quality Management System Structure

The QMS Manual follows industry-standard quality management structure (without ISO 9001 references):

1. Introduction & Scope
2. Company Overview & Quality Policy
3. Organizational Structure
4. Document Control System
5. Management Responsibility
6. Resource Management
7. Product Realization Process
8. Manufacturing Operations
9. Inspection & Testing
10. Nonconformance & Corrective Action
11. Supplier Management
12. Training & Competency
13. Internal Auditing
14. Continuous Improvement
15. Records Management

## 🛠️ Tech Stack

- **Runtime:** Node.js 20+ / Next.js 14+
- **Language:** TypeScript
- **AI Framework:** LangChain.js concepts (custom implementation)
- **Database:** Prisma + SQLite (portable) / PostgreSQL ready
- **PDF Generation:** PDFKit
- **DOCX Generation:** docx package
- **Visualization:** Mermaid.js, Chart.js, D3.js concepts
- **Frontend:** React with Tailwind CSS
- **CLI:** tsx for TypeScript execution

## 📜 Regulatory Compliance

This QMS addresses requirements from:
- **Colorado Division of Housing** (8 CCR 1302-14, C.R.S. §24-32-3301)
- **HUD Code** (24 CFR Part 3280)
- **International Residential Code** (IRC 2021)
- **National Electrical Code** (NEC 2023)
- **International Plumbing Code** (IPC 2021)
- **International Energy Conservation Code** (IECC 2021)
- **NTA Third-Party Inspection** requirements

**Important:** This QMS uses generic quality management terminology and **does not reference ISO 9001** anywhere.

## 🔐 Database Schema

The system uses a comprehensive database schema with these core entities:
- **Document** - All QMS documents with versioning
- **AuditTrail** - Complete change history
- **Procedure** - Production procedures by phase
- **HoldPoint** - Quality gate definitions
- **NCR** - Nonconformance records
- **TrainingRecord** - Employee training tracking
- **QualityMetric** - KPIs and performance metrics
- **Supplier** - Approved supplier list

## 🤝 Contributing

This is a proprietary system for Fort Homes LLC. For questions or support, contact:
- **Jeff Zimmerman** - President
- **Marty Magill** - COO  
- **Zach Lamont** - QA Manager

## 📄 License

Proprietary - Fort Homes LLC © 2026

## 🔗 Related Links

- [Colorado Division of Housing](https://cdola.colorado.gov/housing)
- [NTA Third-Party Inspection](https://www.nta-labs.com/)
- [HUD Manufactured Housing Program](https://www.hud.gov/program_offices/housing/ramh/mhs/mhshome)

