# QMS Context Files

This directory contains reference documentation for Fort Homes QMS document generation.

## Files

### 01-BRAND-SYSTEM.md
Brand specifications including:
- Typography (Oswald font family)
- Color palette (Charcoal Olive #101810, Secondary Dark #181810, etc.)
- Page layout and dimensions
- Header and footer specifications
- Table styling guidelines
- Callout box designs
- Logo usage rules
- File naming conventions

**Purpose:** Reference for all document generation to ensure brand consistency

### 02-REGULATORY-REQUIREMENTS.md
Regulatory and compliance information including:
- Colorado Division of Housing (CDOH) requirements
- Fort Homes registration details (DOH Approval Number: 2526-5434-QA)
- Third-Party Inspection Agency (ICC NTA, LLC) requirements
- Adopted building codes (IRC 2021, IBC 2021, NEC 2023, IPC 2021, IMC 2021, IECC 2021)
- Structural design criteria for Grand Junction/Mesa County
- Insignia of approval procedures
- DOH notification requirements
- Record retention schedules
- Key code citations for QMS

**Purpose:** Reference for compliance-related content in QMS documents

## Usage

These files are loaded as context when generating QMS documents to ensure:
1. Brand consistency across all generated documents
2. Accurate regulatory references and code citations
3. Proper formatting and styling
4. Compliance with Fort Homes standards

## Document Number

All QMS documents use the FHDEV prefix:
- `FHDEV-QMS-001` - Quality Manual
- `FHDEV-SOP-XXX` - Standard Operating Procedures  
- `FHDEV-WI-XXX` - Work Instructions
- `FHDEV-FRM-XXX` - Forms
- `FHDEV-CHK-XXX` - Checklists

## Updates

When brand specifications or regulatory requirements change:
1. Update the appropriate context file
2. Increment the "Last Updated" date
3. Regenerate affected QMS documents
4. Update revision history in affected documents
