# Fort Homes LLC QMS - Quality Management System

A comprehensive Quality Management System for **Colorado off-site modular home construction** with **NTA (National Technical Systems)** as third-party inspector.

## 🏠 About Fort Homes LLC

Fort Homes LLC manufactures modular residential structures in Grand Junction, Colorado under:
- **Colorado Division of Housing (CDOH)** regulations (8 CCR 1302-14)
- **HUD Code** (24 CFR Part 3280) for manufactured housing
- **NTA, Inc.** Third-Party Inspection Agency (TPIA) coordination
- **IRC 2021, NEC 2023, IPC 2021, IECC 2021** building codes

## 🚀 Current Features

### 📄 Comprehensive Documentation Library
Complete QMS documentation in Markdown format:
- **Quality Manual** - Complete 9-section quality management system manual
- **Standard Operating Procedures (SOPs)** - 28 detailed SOPs covering all aspects of operations
- **Work Instructions** - Detailed production work instructions for all 8 phases
- **Inspection Forms** - Quality hold point inspection templates
- **Training Materials** - Employee training documentation

### 📊 Professional Document Generation
- **PDF Generation** scripts for professional formatting
- Markdown-based source documentation for version control
- Document numbering system (QM-XXX, SOP-XXX, WI-XXX, FORM-XXX)
- Template-based document structure

### 🎨 Next.js Web Interface (In Development)
- React-based web application framework
- Tailwind CSS for styling
- Document viewing and management interface

## 🔮 Future Enhancements (Planned)

The following features are planned for future development:

### 🤖 AI Agent Framework (Planned)
Multi-agent system for autonomous document generation and management

### 🗄️ Database Persistence (Planned)
SQLite/PostgreSQL database with Prisma ORM for document management, audit trails, and quality metrics

### 📊 Advanced Visual Documentation (Planned)
Automated generation of flowcharts, diagrams, and quality metrics visualizations

## 📁 Project Structure

```
fort-homes-qms/
├── docs/                    # QMS Documentation (Markdown)
│   ├── manual/              # Quality Management System Manual
│   ├── sops/                # Standard Operating Procedures
│   ├── work-instructions/   # Detailed work instructions
│   ├── forms-templates/     # Inspection forms and templates
│   ├── training/            # Training materials
│   ├── implementation/      # Implementation guides
│   ├── ai-agents/           # AI agent documentation
│   ├── context/             # Project context
│   ├── qc-tools/            # Quality control tools
│   ├── style-guide/         # Documentation style guide
│   └── traceability/        # Traceability documentation
├── scripts/                 # Utility scripts
│   ├── generate-professional-pdf.js  # PDF generation
│   ├── extract-cc21te.js             # Data extraction
│   └── setup-github-auth.ps1         # GitHub setup
├── templates/               # Document templates
├── data/                    # Company and regulatory data
│   └── cc21te/              # Colorado Code reference data
├── assets/                  # Static assets
│   ├── css/                 # Stylesheets
│   ├── fonts/               # Fonts
│   ├── img/                 # Images
│   └── svg/                 # SVG graphics
└── package.json             # Node.js dependencies and scripts
```

## 🎯 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/solidzdawg/fort-homes-qms.git
cd fort-homes-qms
npm install
```

### Environment Setup

```bash
# Copy environment file and configure
cp .env.example .env
# Edit .env if needed (DATABASE_URL, OPENAI_API_KEY for future features)
```

### Working with Documentation

All QMS documentation is available as Markdown files in the `docs/` directory:

```bash
# View Quality Manual sections
ls docs/manual/

# View Standard Operating Procedures
ls docs/sops/

# View Work Instructions
ls docs/work-instructions/

# View Inspection Forms
ls docs/forms-templates/
```

### Generate PDF Documents

```bash
# Generate professional PDFs from documentation
npm run generate:pdf

# Generate SOPs as PDFs
npm run generate:pdf:sops

# Generate all documents
npm run generate:all
```

### Start Development Server (Next.js)

```bash
# Start the web interface
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build Next.js application |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run generate:pdf` | Generate PDF documents |
| `npm run generate:pdf:sops` | Generate SOP PDFs |
| `npm run generate:all` | Generate all PDFs |

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

The QMS Manual in `docs/manual/` follows industry-standard quality management structure:

1. **QMS-001** - Context & Stakeholders
2. **QMS-002** - Leadership & Quality Policy
3. **QMS-003** - Planning & Risk Management
4. **QMS-004** - Support & Resources
5. **QMS-005** - Operations
6. **QMS-006** - Performance Evaluation
7. **QMS-007** - Improvement
8. **QMS-008** - Document & Records Control
9. **QMS-009** - Regulatory Compliance

### Standard Operating Procedures

The repository includes 28 comprehensive SOPs covering:
- **Core QMS Operations** (SOP-001 to SOP-020) - Document control, training, audits, NCR/CAPA, etc.
- **Production Operations** (SOP-101 to SOP-108) - Phase-specific manufacturing procedures

## 🛠️ Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Next.js 14
- **Language:** TypeScript / JavaScript
- **PDF Generation:** PDFKit, puppeteer
- **Frontend:** React with Tailwind CSS
- **Documentation:** Markdown
- **Version Control:** Git/GitHub

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

## 📋 Documentation Overview

### Quality Manual
Complete 9-section quality management system manual covering all aspects of operations, from context and leadership to continuous improvement.

### Standard Operating Procedures (SOPs)
- **Core Operations** (20 SOPs) - Document control, training, audits, supplier management, etc.
- **Production Operations** (8 SOPs) - Phase-specific manufacturing procedures for all production stages

### Work Instructions & Forms
- Detailed work instructions for each production phase
- Inspection forms and checklists for quality hold points
- Training materials and competency assessments

## 🤝 Contributing

This is a proprietary system for Fort Homes LLC. For questions or support, contact:
- **Jeff Zimmerman** - President
- **Marty Magill** - COO  
- **Zach Lamont** - QA Manager

## 📖 Additional Documentation

For more detailed information, see:
- [GETTING-STARTED.md](./GETTING-STARTED.md) - Comprehensive setup and usage guide
- [CLAUDE.MD](./CLAUDE.MD) - AI assistant context guide with project background
- `docs/` directory - Complete QMS documentation library

## 📄 License

Proprietary - Fort Homes LLC © 2026

## 🔗 Related Links

- [Colorado Division of Housing](https://cdola.colorado.gov/housing)
- [NTA Third-Party Inspection](https://www.nta-labs.com/)
- [HUD Manufactured Housing Program](https://www.hud.gov/program_offices/housing/ramh/mhs/mhshome)

