# CC21TE Factory Documentation Package

**Project:** CC21TE Modular Home  
**Client:** FORT + HOME  
**Date:** 02/04/26  
**Engineer:** M-INTEGRATED Building Plans

---

## Overview

This repository contains the complete factory-ready documentation package for the CC21TE modular home project. All documentation has been systematically extracted from the shop drawing package (dated 01/19/26) following a multi-agent workflow with zero-miss extraction discipline.

---

## Repository Structure

```
fort-homes-qms/
├── 00_source_drawings/
│   └── 26.01.19_MI_FOR_25002_CC21TE_OFFSITECOMBINED.pdf
├── 01_extraction/
│   ├── DRAWING_INDEX.md
│   ├── STRUCTURAL_SPECS.md
│   └── ARCHITECTURAL_SCHEDULES.md
├── 02_bom/
│   └── MASTER_BOM.md
├── 03_work_instructions/
│   ├── WI-101_FLOOR_ASSEMBLY.md
│   ├── WI-201_WALL_ASSEMBLY.md
│   └── WI-301_ROOF_ASSEMBLY.md
├── 04_sops_qc/
│   ├── SOP-100_FLOOR_SYSTEM_PRODUCTION.md
│   ├── FORM-I-101_FLOOR_INSPECTION.md
│   ├── SOP-200_WALL_SYSTEM_PRODUCTION.md
│   ├── FORM-I-201_WALL_INSPECTION.md
│   ├── SOP-300_ROOF_SYSTEM_PRODUCTION.md
│   └── FORM-I-301_ROOF_INSPECTION.md
├── 05_visuals_prompts/
│   └── VISUAL_PROMPTS.md
├── 06_change_control/
│   └── VERIFICATION_REPORT.md
└── README.md
```

---

## Directory Descriptions

### 00_source_drawings/
Contains the original shop drawing PDF package from M-INTEGRATED Building Plans.

### 01_extraction/
Structured extraction of specifications from shop drawings:
- **DRAWING_INDEX.md**: Complete inventory of all 19 sheets
- **STRUCTURAL_SPECS.md**: Floor, wall, and roof system specifications
- **ARCHITECTURAL_SCHEDULES.md**: Door, window, and room schedules

### 02_bom/
Bill of Materials with hierarchical structure:
- **MASTER_BOM.md**: Complete BOM covering all 7 major systems (Floor, Wall, Roof, Doors/Windows, Mechanical, Plumbing, Electrical)

### 03_work_instructions/
Step-by-step work instructions for production stations:
- **WI-101**: Floor System Assembly
- **WI-201**: Wall System Assembly
- **WI-301**: Roof System Assembly

### 04_sops_qc/
Standard Operating Procedures and Quality Control checklists:
- **SOP-100**: Floor System Production
- **FORM-I-101**: Floor System Inspection Checklist (HP-1)
- **SOP-200**: Wall System Production
- **FORM-I-201**: Wall System Inspection Checklist (HP-2)
- **SOP-300**: Roof System Production
- **FORM-I-301**: Roof System Inspection Checklist (HP-3)

### 05_visuals_prompts/
AI visual generation prompts for creating:
- Exploded views
- Fastener maps
- Good vs. bad examples
- Detail callouts

### 06_change_control/
Verification and change control documentation:
- **VERIFICATION_REPORT.md**: Cross-check results and discrepancy log

---

## Key Specifications

### Module Dimensions
- **Length:** 44'-10"
- **Width:** 12'-5"
- **Ridge Height:** 15'-11 1/2"

### Floor System
- **Joists:** 11-7/8" Engineered I-Joists @ 16" O.C.
- **Subfloor:** 3/4" T&G OSB
- **Rim Board:** 1-1/2" x 11-7/8" LSL

### Wall System
- **Exterior:** 6-3/8" SIPS (7/16" OSB faces, 5-1/2" EPS core)
- **Interior:** 2x4 SPF #2 @ 16" O.C.
- **Shear Walls:** 7/16" OSB, nailed 4" O.C. edges, 12" O.C. field

### Roof System
- **Ridge Beam:** (3) 1-3/4" x 14" LVL
- **Roof Panels:** SIPS
- **Hardware:** Simpson H3.5 hangers @ 16" O.C. max

---

## Hold Points

| Hold Point | Phase | TPIA Required | Inspection Form |
|:---|:---|:---:|:---|
| HP-1 | Floor System | No | FORM-I-101 |
| HP-2 | Wall System | No | FORM-I-201 |
| HP-3 | Roof System | TBD | FORM-I-301 |

---

## Usage Instructions

### For Production Team:
1. Review the relevant Work Instruction (WI) for your station
2. Ensure all materials from the BOM are staged
3. Follow the step-by-step instructions
4. Complete in-process quality checkpoints
5. Call for hold point inspection when ready

### For QA Inspectors:
1. Use the appropriate Inspection Form (FORM-I-XXX)
2. Verify all items on the checklist
3. Document any discrepancies
4. Sign off when all criteria are met

### For Supervisors:
1. Review the relevant SOP for the production phase
2. Ensure resources and materials are available
3. Coordinate hold point inspections
4. Manage nonconformances per SOP-004

---

## Compliance & Standards

- **8 CCR 1302-14** (Colorado Factory-Built Structures - source of truth)
- **IRC 2024** (International Residential Code)
- **Engineered Plans:** CC21TE Shop Drawings (stamped by registered engineer)

**Note:** Fort Homes builds modular homes (IRC-compliant, permanent foundation) per 8 CCR 1302-14, NOT manufactured homes (HUD Code).

---

## Document Control

All documents in this repository are controlled and versioned through Git. Changes must be reviewed and approved before merging.

**Current Version:** 1.0  
**Last Updated:** 02/04/26  
**Status:** Approved for Production Use (with noted recommendations in VERIFICATION_REPORT.md)

---

## Contact

For questions or clarifications, contact:
- **Production Manager:** [Contact Info]
- **Quality Manager:** [Contact Info]
- **Engineering:** M-INTEGRATED Building Plans

---

## License

This documentation is proprietary and confidential. Unauthorized distribution is prohibited.

© 2026 FORT + HOME. All rights reserved.
