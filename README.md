# Fort and Homes LLC QMS - Quality Management System

A comprehensive Quality Management System for Fort and Homes LLC, a modular home manufacturer in Grand Junction, Colorado.

## 🏠 About Fort Homes

Fort Homes LLC manufactures modular residential structures under Colorado Division of Housing (CDOH) regulations. This QMS supports:
- **DOH Certification** per C.R.S. §24-32-3301 and 8 CCR 1302-14
- **ICC NTA** Third-Party Inspection Agency coordination
- **IHIP Grant** compliance for affordable housing

## 📋 Manufacturing Methodology

This QMS implements a **Build-in-Place (Static Bay)** manufacturing approach:
- Modules remain stationary in assigned production bays (Bay 1-5)
- Trade crews rotate through each bay in defined phases
- Phase-based inspection hold points (HP-1 through HP-8)
- Clear accountability with Bay Supervisors

### Production Phases

| Phase | Description | Hold Point |
|-------|-------------|------------|
| 1 | Chassis & Floor Deck | HP-1 |
| 2 | Wall Framing & Sheathing | HP-2 |
| 3 | Roof/Ceiling Framing | HP-3 |
| 4 | MEP Rough-In & Testing | HP-4 (TPIA) |
| 5 | Insulation & Air Sealing | HP-5 |
| 6 | Drywall & Interior Shell | HP-6 |
| 7 | Interior Finish & Trim | QA-7 |
| 8 | Final Inspection & Pre-Ship | HP-8 (TPIA) |

## 📁 Repository Structure

```
fort-homes-qms/
├── docs/                    # QMS Documentation
│   ├── manual/             # Main QMS Manual sections
│   ├── sops/               # Standard Operating Procedures
│   ├── work-instructions/  # Detailed work instructions
│   └── forms/              # Quality forms and templates
├── src/                    # Application source code
│   ├── components/         # React components
│   ├── pages/              # Page components
│   └── utils/              # Utility functions
├── templates/              # Document templates
│   ├── traveler/           # Module traveler templates
│   ├── ncr/                # NCR form templates
│   └── itp/                # Inspection Test Plan templates
├── scripts/                # Build and generation scripts
│   └── generate-docs.js    # Document generation script
├── data/                   # JSON data files
│   ├── phases.json         # Phase definitions
│   ├── hold-points.json    # Hold point configurations
│   ├── itps.json           # Inspection Test Plans
│   └── company-info.json   # Company information
└── public/                 # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/[your-username]/fort-homes-qms.git
cd fort-homes-qms
npm install
```

### Generate QMS Documents

```bash
npm run generate-docs
```

### Run Development Server

```bash
npm run dev
```

## 📊 Key Features

### Document Management
- Version-controlled QMS documentation
- Automated document generation (DOCX/PDF)
- Template-based forms and checklists

### Inspection Tracking
- Phase-based hold point management
- NCR/CAPA workflow integration
- TPIA coordination scheduling

### Integration Ready
- Google Workspace compatibility
- NetSuite ERP connection points

## 📜 Regulatory Compliance

This QMS is designed to meet:
- **Colorado Division of Housing** (8 CCR 1302-14)
- **ISO 9001:2015** Quality Management Systems
- **IRC 2021** International Residential Code
- **NEC 2023** National Electrical Code
- **IPC 2021** International Plumbing Code
- **IECC 2021** International Energy Conservation Code

## 🏗️ Build-in-Place vs Station-Based

| Aspect | Station-Based | Build-in-Place |
|--------|---------------|----------------|
| Module Movement | Moves through stations | Stays in assigned bay |
| Progress Tracking | By station location | By phase within bay |
| Inspection Triggers | "At Station X → Inspect" | "Phase X complete → Inspect" |
| NCR Hold Logic | "Held at Station X" | "Held at Phase X in Bay Y" |
| Material Staging | At each station | All at assigned bay |

## 👥 Team

- **Jeff Zimmerman** - President
- **Marty Magill** - COO
- **Zach Lamont** - QA Manager

## 📄 License

Proprietary - Fort Homes LLC © 2026

## 🔗 Related Links

- [Colorado Division of Housing](https://cdola.colorado.gov/housing)
- [ICC NTA](https://www.icc-es.org/nta/)
- [ISO 9001:2015](https://www.iso.org/iso-9001-quality-management.html)
