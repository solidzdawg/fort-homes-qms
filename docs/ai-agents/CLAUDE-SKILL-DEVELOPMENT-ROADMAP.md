---
title: "Claude AI Skill Development Roadmap"
document_id: "ROADMAP-001"
created: "2026-02-04"
purpose: "Define skills needed for effective QMS automation"
---

# 🤖 Claude AI Skill Development Roadmap for QMS Automation

## Executive Summary

This document outlines the specific capabilities an AI assistant (Claude) needs to effectively automate Fort Homes' workflow of converting shop drawing PDFs into compliant QMS documentation. The workflow is: **Technical Drawings → Code Requirements → QMS Documents**.

---

## 🎯 Current Workflow Analysis

### What We Do Now (Manual Process)
1. **Receive shop drawings** (PDF format, 20-25 pages, architectural/structural/MEP)
2. **Manually extract specifications** (dimensions, materials, fasteners, MEP details)
3. **Map to building codes** (IRC, NEC, IPC, IMC, IECC, HUD Code)
4. **Write QMS documents** (SOPs, Work Instructions, Forms)
5. **Generate professional PDFs** (branded, paginated, document control)

### What Works (Automated)
- ✅ PDF text extraction (`scripts/extract-cc21te.js`)
- ✅ Regex pattern matching for common specs (joist spacing, subfloor type, etc.)
- ✅ Markdown → PDF conversion (`scripts/generate-professional-pdf.js`)
- ✅ Basic traceability matrix creation

### What Doesn't Work Yet (Manual)
- ❌ Understanding technical drawings visually (not just text extraction)
- ❌ Interpreting code requirements contextually
- ❌ Generating work instructions from drawing details
- ❌ Creating inspection forms based on hold point criteria
- ❌ Mapping fastener schedules to specific drawing callouts
- ❌ Generating SVG technical diagrams from PDF drawings

---

## 📚 SKILL CATEGORY 1: PDF & Technical Drawing Interpretation

### 1.1 Multi-Modal PDF Understanding
**Current Gap:** Claude can read text extracted from PDFs but cannot "see" the drawings themselves.

**Skills Needed:**
- **Visual PDF parsing:** Understand architectural plans, elevations, sections, details
- **Drawing annotation reading:** Interpret dimension lines, leaders, callouts, symbols
- **Multi-page coordination:** Cross-reference between sheets (e.g., "See Detail 5/SM40")
- **Scale interpretation:** Understand 1/4" = 1'-0" scales and dimension extraction
- **Layer recognition:** Distinguish between architectural, structural, MEP, and notes layers

**Example Use Case:**
```
INPUT: Shop Drawing Sheet SM10 (Floor Framing Plan)
OUTPUT:
- Floor joists: 9-1/4" TJI @ 16" O.C.
- Span: 44'-10" (requires LVL rim at supports)
- Blocking: At 8' intervals per IRC R502.7
- Connection: BC-T1 clips at each joist to rim (see Detail 3/SM40)
- Subfloor: 3/4" T&G Advantech glued & nailed 8" O.C. edges, 12" O.C. field
```

**Training Data Needed:**
- Annotated shop drawing datasets with extracted specifications
- Common architectural symbols library (walls, doors, windows, dimensions)
- Structural detail libraries (connections, fasteners, hardware)
- MEP symbols (outlets, fixtures, ductwork, piping)

### 1.2 Technical Drawing Standards Knowledge
**Skills Needed:**
- **Sheet numbering conventions:** Understand GM (General), AM (Architectural), SM (Structural), E (Electrical), M (Mechanical), P (Plumbing) prefixes
- **Detail callout system:** Parse "5/SM40" = Detail 5 on Sheet SM40
- **Note hierarchy:** General notes (all sheets) vs. specific notes (local to detail)
- **Title block reading:** Extract project name, date, revision, engineer stamp info
- **Coordination markers:** Match grid lines (A, B, C...) across multiple sheets

**Example Use Case:**
```
DRAWING CALLOUT: "Floor joists per 3/SM10; connections per 5/SM40"
CLAUDE OUTPUT:
- Reference Sheet SM10, Detail 3 for joist layout and spacing
- Reference Sheet SM40, Detail 5 for BC-T1 clip installation
- Extract: 8d nails @ 3" O.C. through BC-T1 into rim joist
- Map to WI-101 Section 3.2: Floor Joist Installation
```

### 1.3 Material & Hardware Specification Extraction
**Skills Needed:**
- **Fastener schedule parsing:** Extract type, size, spacing, and application from tabular data
- **Material callouts:** Interpret "2x4 SPF #2 or better" vs. "1-3/4" × 14" LVL 2.0E"
- **Hardware identification:** BC-T1, LUS24, A35, LSSR straps, hold-down anchors
- **Finish specifications:** Galvanized, HDG, stainless steel, powder-coated
- **Cross-sheet material coordination:** Track material usage across multiple drawings

**Example Output (Fastener Schedule for WI-101):**
```json
{
  "application": "Floor sheathing perimeter",
  "fastener": "8d ring shank nails",
  "spacing": "8\" O.C. edges, 12\" O.C. field",
  "source": "SM40, Detail 5",
  "code_reference": "IRC R502.3.1",
  "verification": "HP-1 inspection"
}
```

---

## 📖 SKILL CATEGORY 2: Building Code Interpretation & Compliance

### 2.1 Code Citation Understanding
**Skills Needed:**
- **Multi-code navigation:** IRC, IBC, NEC, IPC, IMC, IECC, HUD Code (24 CFR 3280)
- **Hierarchical structure:** Understand Chapter → Section → Subsection (e.g., IRC R502.3.1)
- **Exception parsing:** Identify when exceptions apply vs. general requirements
- **Amendment awareness:** Grand Junction amendments to base codes
- **Code year tracking:** Distinguish 2021 IRC from 2024 IRC requirements

**Example Code Interpretation:**
```
CODE: IRC R502.7 "Bridging or blocking shall be installed at supports and at intervals not exceeding 8 feet..."

CLAUDE INTERPRETATION:
- WHAT: Blocking/bridging required for floor joists
- WHERE: At bearing points (walls, beams) AND mid-span if span > 8'
- WHEN: Before subfloor installation (HP-1 verification)
- HOW: Solid blocking (2x material) or X-bridging (metal)
- VERIFICATION: Measure spacing with tape, confirm at HP-1
- FORM: FORM-I-001, Section 3.4 "Blocking Installation"
- DRAWING REFERENCE: SM10 shows blocking locations
```

### 2.2 Regulatory Traceability Mapping
**Skills Needed:**
- **Requirement decomposition:** Break broad code requirements into verifiable actions
- **QMS document mapping:** Link code → QMS section → SOP → Work Instruction → Form
- **Inspection point identification:** Determine which requirements need hold point verification
- **Record retention rules:** Understand which codes require what documentation (7 years, 20 years, indefinite)
- **Gap analysis:** Identify where QMS doesn't fully address a code requirement

**Example Traceability Chain:**
```
8 CCR 1302-14 § 3.5(c) "Manufacturer shall conduct inspections at critical stages"
  ↓
QMS-005 Operations § 5.2 "Hold Point System"
  ↓
SOP-013 Hold Point Inspections
  ↓
SOP-102 Wall Framing (HP-2 trigger)
  ↓
WI-102 Wall Framing Assembly (inspection criteria listed)
  ↓
FORM-I-002 Wall Framing Inspection (checklist items)
  ↓
Module Traveler (HP-2 sign-off by QA Inspector)
  ↓
Record Retention: 7 years per TRACE-003
```

### 2.3 Code-to-Drawing Reconciliation
**Skills Needed:**
- **Compliance verification:** Check if shop drawings meet code requirements
- **Conflict detection:** Identify when drawing specs contradict code minimums
- **Engineering judgment notes:** Recognize "or equivalent" situations
- **Performance-based compliance:** Understand when engineered solutions exceed prescriptive code
- **Inspector expectation mapping:** Know what TPIA inspectors will check at HP-4, HP-8

**Example Reconciliation:**
```
CODE: NEC § 550.16(A) "Grounding conductors shall be insulated, covered, or bare, and shall be 8 AWG copper minimum"

SHOP DRAWING: E02 shows 10 AWG bare copper grounding

CLAUDE ANALYSIS:
❌ NON-COMPLIANT - 10 AWG < 8 AWG minimum
✅ ACTION: Flag for engineer review before production
📋 REFERENCE: NEC 550.16(A) requires 8 AWG minimum for manufactured housing
🔍 INSPECTION: TPIA will catch this at HP-4 (MEP rough-in)
🛠️ REMEDY: Upgrade to 8 AWG bare copper grounding conductor
```

---

## 🏭 SKILL CATEGORY 3: Manufacturing Process Knowledge

### 3.1 Modular Construction Workflows
**Skills Needed:**
- **Build-in-place methodology:** Understand static bay production (not assembly line)
- **8-phase production sequence:** Floor → Walls → Roof → MEP → Insulation → Drywall → Finishes → Final
- **Hold point triggers:** Know when each HP occurs and what must be complete
- **Crew rotation logistics:** Understand skill specialization (framing crew, MEP crew, finish crew)
- **Module transport considerations:** Why certain work must be done in-plant vs. on-site

**Example Phase Understanding:**
```
PHASE 3: ROOF FRAMING (Days 6-8)
Prerequisites:
  - HP-2 passed (walls inspected and approved)
  - Wall top plates level and square
  - Shear wall nailing verified

Work Activities (WI-103):
  1. Set ridge beam (3-ply 1-3/4" x 14" LVL) per SM11
  2. Install roof trusses/rafters 24" O.C. per SM11.1
  3. Install hurricane clips (H2.5) at each truss-to-plate connection
  4. Brace trusses per BCSI guidelines
  5. Install roof sheathing (7/16" OSB or 12-1/8" SIP) per AM10

Hold Point Trigger: HP-3
Inspection Criteria:
  - Truss/rafter spacing verified 24" O.C.
  - Ridge beam properly supported
  - Hurricane clips installed at all connections
  - Sheathing/SIP properly fastened

TPIA Required? No (HP-4 and HP-8 only)
Form: FORM-I-003
Next Phase: Phase 4 (MEP Rough-In)
```

### 3.2 Quality Control Workflows
**Skills Needed:**
- **Hold point criteria generation:** Create objective pass/fail inspection criteria
- **Measurement methods:** Specify tools (tape measure, level, square, torque wrench)
- **Sampling plans:** When to check 100% vs. statistical sampling
- **Non-conformance handling:** Understand when to stop production vs. repair and continue
- **TPIA coordination:** Know what Third Party Inspection Agency expects at HP-4, HP-8

**Example Inspection Criteria (Generated by Claude):**
```yaml
hold_point: HP-2
phase: "Wall Framing"
inspector: "QA Inspector (Zach Lamont)"
tpia_required: false

inspection_criteria:
  - id: HP2-01
    item: "Interior wall stud spacing"
    requirement: "16\" O.C. maximum per IRC R602.3"
    method: "Measure on-center spacing with tape measure"
    acceptance: "14.5\" - 16.5\" actual (±1/2\" tolerance)"
    sample: "Check 5 studs per wall section"
    drawing_ref: "SM10.2-SM10.5"

  - id: HP2-02
    item: "Shear wall nailing"
    requirement: "7/16\" OSB with 8d nails @ 3\" O.C. edges per SM40 Detail 7"
    method: "Visual inspection + nail pattern verification"
    acceptance: "All edges fully nailed, no missing fasteners"
    sample: "100% visual check of perimeter"
    drawing_ref: "SM40, Detail 7"

  - id: HP2-03
    item: "Wall plumb and alignment"
    requirement: "Walls within 1/4\" per 8' vertical"
    method: "4' level on both faces"
    acceptance: "Bubble within tolerance on all walls"
    sample: "Check all exterior walls + 50% of interior"
    drawing_ref: "SM10.2"

non_conformance_action:
  - "Tag wall with red flag"
  - "Document on FORM-I-002 in NCR section"
  - "Stop production until corrected"
  - "Re-inspect after correction"
  - "Update module traveler with resolution"
```

### 3.3 Material & Tool Specification
**Skills Needed:**
- **Tool callouts:** Specify appropriate tools for each task (circular saw, nail gun, impact driver)
- **Consumable quantities:** Estimate fastener quantities, adhesive coverage, etc.
- **Material staging:** Understand when materials must be pre-cut, pre-assembled, or kitted
- **Shop safety:** Incorporate PPE, lockout/tagout, confined space requirements
- **Equipment maintenance:** Reference calibration, inspection, and preventive maintenance needs

**Example Tool Specification (WI-104, MEP Rough-In):**
```markdown
## 🧰 Required Tools & Equipment

### Electrical (E02)
- Cable ripper/stripper (12-2, 14-2 Romex)
- Wire strippers (10-14 AWG)
- Needle-nose pliers
- Screwdrivers (flathead, Phillips)
- Voltage tester (non-contact)
- Fish tape (25' minimum)
- Drill with hole saw set (1/2", 3/4", 1")
- Staple gun (Romex staples)
- Label maker (circuit identification)

### Plumbing (P03)
- PEX cutters
- Crimping tool (PEX-A expansion or crimp rings)
- Deburring tool
- ABS/PVC cement & primer
- Pipe wrenches (12", 18")
- Channel locks (10", 12")
- Drill with hole saw set (1-1/2", 2", 3")
- Level (torpedo, 4')
- Pressure test gauge (0-100 PSI)

### HVAC (M02.1)
- Tin snips (straight, left, right)
- Sheet metal brake (for custom transitions)
- Drill with metal bits
- Self-tapping screws (8-18 × 3/4")
- Foil tape (UL-181A-P)
- Mastic sealant
- Manometer (duct pressure testing)
```

---

## 📝 SKILL CATEGORY 4: QMS Document Generation

### 4.1 Standard Operating Procedure (SOP) Writing
**Skills Needed:**
- **Regulatory SOP structure:** Purpose → Scope → Responsibilities → Procedure → Records → References
- **Hierarchical numbering:** Use 1.0, 1.1, 1.2 structure consistently
- **Verb consistency:** Use imperative mood ("Inspect the wall", not "The wall should be inspected")
- **RACI matrix generation:** Assign Responsible, Accountable, Consulted, Informed roles
- **Revision control:** Maintain version history, effective dates, change logs

**Example SOP Generation (Claude-written):**
```markdown
# SOP-104: MEP ROUGH-IN & TESTING

## 1.0 PURPOSE
This procedure establishes requirements for mechanical, electrical, and plumbing (MEP) rough-in installation to ensure compliance with approved shop drawings (M02.1, E02, P03), applicable building codes (NEC 2023, IPC 2021, IMC 2021), and Colorado Division of Housing regulations (8 CCR 1302-14).

## 2.0 SCOPE
Applies to Phase 4 production activities for all module types. Covers installation, testing, and inspection of MEP systems prior to insulation (Phase 5). Includes Third-Party Inspection Agency (TPIA) coordination for Hold Point HP-4.

## 3.0 RESPONSIBILITIES
- **Production Lead:** Coordinate MEP trades, schedule TPIA inspection
- **Licensed Electrician:** Install electrical per E02 and NEC 2023
- **Licensed Plumber:** Install plumbing per P03 and IPC 2021
- **HVAC Technician:** Install ductwork per M02.1 and IMC 2021
- **QA Inspector (Zach Lamont):** Verify compliance, witness tests, complete FORM-I-004
- **TPIA Inspector (NTA):** Third-party verification of MEP rough-in at HP-4

## 4.0 PROCEDURE

### 4.1 Pre-Start Verification
- [ ] HP-3 (Roof Framing) passed and signed off
- [ ] Shop drawings (M02.1, E02, P03) available in production bay
- [ ] MEP materials staged and inspected per SOP-007
- [ ] Licensed trades personnel confirmed available
- [ ] TPIA inspection scheduled (48-hour notice required)

### 4.2 Electrical Rough-In (Per WI-104, Section 4.2)
...
```

### 4.2 Work Instruction (WI) Writing
**Skills Needed:**
- **Step-by-step clarity:** Write at 8th-grade reading level, one action per step
- **Visual aids:** Reference SVG diagrams, photos, or drawing callouts
- **Safety callouts:** Highlight hazards (⚠️) and required PPE
- **Quality checkpoints:** Embed mini-inspections within procedure ("Verify spacing before proceeding")
- **Drawing cross-referencing:** Cite specific sheets and details for each step

**Example WI Generation:**
```markdown
### 3.2 Floor Joist Installation

**Drawing Reference:** SM10, SM10.1 (Pages 11-12)
**Fastener Schedule:** SM40, Detail 5
**Time Estimate:** 3-4 hours (2-person crew)

#### Safety Requirements ⚠️
- Hard hat, safety glasses, work gloves required
- Fall protection if working above 6' height
- Ensure LVL rim is properly braced before loading joists

#### Step-by-Step Procedure

**STEP 1:** Verify LVL rim beam installation
- [ ] Check rim beam is 1-3/4" × 9-1/4" LVL 2.0E (minimum)
- [ ] Confirm rim is level within 1/4" per 10' (use 4' level)
- [ ] Verify rim is anchored with hold-down straps per SM40, Detail 3
- 📐 **Quality Check:** Measure rim height at both ends - must match within 1/8"

**STEP 2:** Mark joist layout on rim beam
- [ ] Start at one end, mark first joist at 16" O.C.
- [ ] Continue marking every 16" along entire length
- [ ] Use speed square to mark perpendicular lines for alignment
- 📏 **Tolerance:** ±1/4" on-center spacing acceptable
- 🎨 **Tip:** Use red lumber crayon for visibility

**STEP 3:** Install floor joists (9-1/4" TJI or equivalent)
- [ ] Position first joist at marked location
- [ ] Ensure joist is seated fully into rim pocket
- [ ] Check joist is plumb using 2' level on web
- [ ] Install BC-T1 clip on each side per SM40, Detail 5
- [ ] Fasten clip with (8) 8d nails - (4) into joist flange, (4) into rim
- [ ] Repeat for all remaining joists

📸 **Photo Documentation:** Take photo of first 3 joists installed for quality record

**STEP 4:** Install blocking at mid-span (if span > 8')
- [ ] Measure total span - if > 8', blocking required per IRC R502.7
- [ ] Cut solid blocking (2x9-1/4" lumber) to fit between joists
- [ ] Install blocking at 1/2 span location
- [ ] Fasten with (3) 16d nails each end, toe-nailed
- ⚠️ **Code Requirement:** IRC R502.7 mandates blocking at 8' intervals

**STEP 5:** Quality verification before subfloor
- [ ] Verify all joists are 16" O.C. ±1/4" (measure 10% sample)
- [ ] Confirm all BC-T1 clips installed (100% visual check)
- [ ] Check for joist damage, splits, or improper installation
- [ ] Notify QA Inspector - ready for HP-1 inspection
- 📋 **Form:** Document on FORM-I-001, Section 3
```

### 4.3 Inspection Form Generation
**Skills Needed:**
- **Criteria extraction from codes:** Convert code requirements into yes/no checkboxes
- **Pass/fail logic:** Create objective acceptance criteria (measurements, visual checks)
- **NCR integration:** Provide space for non-conformance documentation
- **Signature blocks:** Specify required approvals (QA Inspector, TPIA, Production Lead)
- **Traceability fields:** Module ID, date, shift, crew, drawing revision

**Example Form Structure (Claude-generated):**
```markdown
# FORM-I-004: MEP ROUGH-IN INSPECTION (HP-4)

**Module ID:** ____________  **Inspection Date:** ____________
**Shop Drawing Revision:** E02 Rev. ___ | M02.1 Rev. ___ | P03 Rev. ___
**QA Inspector:** ____________  **TPIA Inspector:** ____________

---

## SECTION A: ELECTRICAL SYSTEM (Per E02)

### A1. Service Panel & Feeders
- [ ] **PASS** / [ ] **FAIL** — Service panel is 225A minimum per E02, Sheet 1
- [ ] **PASS** / [ ] **FAIL** — Main breaker labeled and accessible
- [ ] **PASS** / [ ] **FAIL** — Feeder cables sized per NEC Table 310.15(B)(16)
- [ ] **PASS** / [ ] **FAIL** — Grounding conductor 8 AWG copper minimum (NEC 550.16)

### A2. Branch Circuits
- [ ] **PASS** / [ ] **FAIL** — Kitchen circuits: (2) 20A dedicated per NEC 210.52(B)
- [ ] **PASS** / [ ] **FAIL** — GFCI protection at kitchen, bath, exterior per NEC 210.8
- [ ] **PASS** / [ ] **FAIL** — AFCI protection at bedrooms per NEC 210.12
- [ ] **PASS** / [ ] **FAIL** — Smoke alarm circuit dedicated per IRC R314.4

### A3. Rough-In Installation
- [ ] **PASS** / [ ] **FAIL** — All boxes secured within 1/4" of finish surface
- [ ] **PASS** / [ ] **FAIL** — Romex stapled within 8" of boxes, 4'-6" along run
- [ ] **PASS** / [ ] **FAIL** — Proper cable protection through studs (1-1/4" from edge)
- [ ] **PASS** / [ ] **FAIL** — Wire fill within box capacity per NEC 314.16

**Electrical Megger Test:** _________ MΩ (Minimum 25 MΩ required)

---

## SECTION B: PLUMBING SYSTEM (Per P03)

### B1. Water Supply
- [ ] **PASS** / [ ] **FAIL** — PEX piping 3/4" main, 1/2" branches per P03
- [ ] **PASS** / [ ] **FAIL** — Proper slope 1/4" per foot minimum on horizontal runs
- [ ] **PASS** / [ ] **FAIL** — Support spacing 32" max for 1/2", 48" max for 3/4"
- [ ] **PASS** / [ ] **FAIL** — Pressure test: 80 PSI for 30 min, no leaks

**Pressure Test Results:**
Start: ______ PSI @ _______ (time)
End: ______ PSI @ _______ (time)
Pressure Drop: ______ PSI (Max 5 PSI allowed)

### B2. Drain/Waste/Vent
- [ ] **PASS** / [ ] **FAIL** — ABS/PVC drain piping sized per P03
- [ ] **PASS** / [ ] **FAIL** — Slope 1/4" per foot minimum on horizontal drains
- [ ] **PASS** / [ ] **FAIL** — Vent pipes terminate above roof per IPC 905.5
- [ ] **PASS** / [ ] **FAIL** — Water test: Fill drains, inspect for leaks (30 min hold)

---

## SECTION C: HVAC SYSTEM (Per M02.1)

### C1. Ductwork Installation
- [ ] **PASS** / [ ] **FAIL** — Supply ducts sized per M02.1 (main 10" × 10", branches 6")
- [ ] **PASS** / [ ] **FAIL** — Return ducts sized per M02.1 (14" × 10")
- [ ] **PASS** / [ ] **FAIL** — Duct joints sealed with mastic + foil tape (UL-181A-P)
- [ ] **PASS** / [ ] **FAIL** — Duct support every 4' max (strap or wire)

### C2. Duct Leakage Test
**Test Pressure:** 25 Pa
**Leakage Rate:** _______ CFM25 (Max 6 CFM25/100 sq ft per IECC R403.3.6)

---

## SECTION D: NON-CONFORMANCE REPORT (NCR)

| NCR# | Description | Location | Severity | Corrective Action | Verified By | Date |
|------|-------------|----------|----------|-------------------|-------------|------|
|      |             |          | ⚠️/❌     |                   |             |      |
|      |             |          | ⚠️/❌     |                   |             |      |

**Severity Key:** ⚠️ Minor (repair before next phase) | ❌ Major (stop work until resolved)

---

## HOLD POINT DECISION

**HP-4 RESULT:**
- [ ] **✅ PASSED** — All criteria met, proceed to Phase 5 (Insulation & Air Sealing)
- [ ] **❌ FAILED** — NCRs must be resolved before proceeding

---

## SIGNATURES

**QA Inspector:** ________________________ **Date:** ____________
**TPIA Inspector (NTA):** ________________________ **Date:** ____________
**Production Lead:** ________________________ **Date:** ____________

**TPIA Stamp Required:** [           ]
```

### 4.4 Visual Style Guide Compliance
**Skills Needed:**
- **Brand consistency:** Apply Fort Homes color palette (#101810, #2D5016, #8B6914, #8B1414, #1E3A5F)
- **Typography:** Oswald for headers, Inter for body text
- **Emoji icon usage:** Use consistent icons (🏗️ construction, 📋 process, ✅ approval, ⚠️ warning)
- **Mermaid diagram generation:** Create flowcharts, Gantt charts, sequence diagrams
- **KPI card styling:** Generate gradient-styled metrics cards
- **Table formatting:** Professional tables with alternating row colors

**Example Generated KPI Card:**
```markdown
<div style="background: linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%); color: white; padding: 20px; border-radius: 8px; margin: 10px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
<div style="font-size: 36px; font-weight: bold; font-family: 'Oswald', sans-serif;">18</div>
<div style="font-size: 14px; opacity: 0.9; margin-top: 5px;">Standard Operating Procedures</div>
<div style="font-size: 12px; opacity: 0.75; margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 8px;">✅ 95% Compliance Rate | 📅 Last Audit: Jan 2026</div>
</div>
```

---

## 🧠 SKILL CATEGORY 5: Advanced AI Capabilities

### 5.1 SVG Technical Diagram Generation
**Current Gap:** Repository has 22 SVG diagrams but they were manually created. Claude could auto-generate these from shop drawings.

**Skills Needed:**
- **Simplified view extraction:** Take complex shop drawing and create simplified instructional diagram
- **SVG path creation:** Generate clean vector paths for lines, arcs, dimensions
- **Annotation placement:** Add callouts, dimension lines, labels automatically
- **Color coding:** Use semantic colors (green = verified, red = critical, yellow = caution)
- **Export optimization:** Generate production-ready SVGs at correct size/resolution

**Example Use Case:**
```
INPUT: SM40, Detail 5 (Floor Sheathing Nailing Pattern)

CLAUDE GENERATES SVG:
- Simplified top view of joist-to-rim connection
- Shows sheathing overlapping rim by 1-3/4"
- Arrows indicating nail spacing: 8" O.C. edges, 12" O.C. field
- Color-coded: Rim = dark gray, joists = medium gray, sheathing = light gray, nails = red dots
- Dimensions labeled: "8\" spacing" with leader lines
- Clean, printable at 4" × 6" size for work instruction

OUTPUT: /assets/svg/floor-sheathing-detail-wi101.svg
```

**Training Needed:**
- Annotated pairs: Shop drawing detail → Instructional SVG
- SVG syntax and optimization techniques
- Technical illustration best practices (exploded views, section cuts, isometric projections)

### 5.2 Multi-Sheet Cross-Referencing
**Skills Needed:**
- **Coordinate system understanding:** Match grid lines (A1, B3, etc.) across architectural, structural, MEP sheets
- **Detail callout resolution:** When WI references "Detail 5/SM40", automatically fetch that detail content
- **Bill of materials aggregation:** Combine material lists from multiple sheets (SM10 + SM40 + SM41)
- **Conflict detection:** Flag when E02 shows outlet at location that SM10.3 shows as structural wall
- **Version control:** Ensure all sheet references are to same revision (all "Rev. C" or flag mismatch)

**Example Cross-Reference Chain:**
```
WI-102 (Wall Framing) references "shear wall nailing per SM40, Detail 7"
  ↓
Claude fetches SM40, Detail 7
  ↓
Extracts: 7/16" OSB with 8d nails @ 3" O.C. perimeter, 6" O.C. field
  ↓
Cross-checks with SM10.3 (Wall Elevations) for shear wall location
  ↓
Confirms: North wall is designated shear wall
  ↓
Maps to code requirement: IRC R602.10.3, SDPWS (APA wood design)
  ↓
Generates inspection criteria for FORM-I-002:
  "Shear wall nailing: 8d @ 3\" O.C. edges, 6\" O.C. field (IRC R602.10.3)"
```

### 5.3 Natural Language to Structured Data
**Skills Needed:**
- **Spec extraction from prose:** Convert general notes into structured JSON
- **Table OCR:** Extract fastener schedules, material lists from PDF tables
- **Unit normalization:** Convert mixed units (inches, feet, PSI, PSF) to consistent format
- **Tolerance parsing:** Understand "16\" O.C. ±1/2\"" means 15.5" - 16.5" acceptable
- **Conditional logic extraction:** Parse "if span > 8', install blocking per IRC R502.7"

**Example Transformation:**
```
INPUT (from Shop Drawing General Note #7):
"All exterior wall studs shall be 2x6 SPF #2 or better at 16" on center maximum.
Double studs at all openings exceeding 4' width. Install hurricane clips (H2.5)
at all top plate connections per IRC R602.10.1. Shear walls per plan to receive
7/16" OSB with 8d nails at 3" o.c. perimeter and 6" o.c. field."

CLAUDE OUTPUT (structured JSON):
{
  "component": "exterior_walls",
  "studs": {
    "size": "2x6",
    "species": "SPF",
    "grade": "#2 or better",
    "spacing": {
      "nominal": "16 inches",
      "tolerance": "maximum",
      "actual_range": "14.5 - 16.0 inches"
    }
  },
  "openings": {
    "threshold": "4 feet width",
    "reinforcement": "double studs",
    "location": "each side of opening"
  },
  "hardware": {
    "type": "hurricane clips",
    "model": "H2.5",
    "location": "all top plate connections",
    "code_reference": "IRC R602.10.1"
  },
  "shear_walls": {
    "sheathing": "7/16 inch OSB",
    "fasteners": {
      "type": "8d nails",
      "perimeter": "3 inches o.c.",
      "field": "6 inches o.c."
    },
    "location": "per architectural plan"
  },
  "drawing_reference": "SM10.2, General Note #7"
}
```

### 5.4 Intelligent Hold Point Criteria Generation
**Skills Needed:**
- **Risk assessment:** Determine which items are critical to verify (structural connections > cosmetic)
- **Sampling plan logic:** Know when 100% inspection needed vs. statistical sampling
- **Code-driven criteria:** Auto-generate checkboxes from building code requirements
- **Measurement method specification:** Specify tool (tape, level, gauge) for each check
- **NCR triggering logic:** Define when minor issue vs. stop-work condition

**Example Claude-Generated Hold Point:**
```yaml
hold_point_id: HP-2
phase: 2
phase_name: "Wall Framing"
triggering_event: "All walls framed, squared, and braced"
prerequisites:
  - "HP-1 passed (floor system approved)"
  - "Wall materials staged and inspected"
  - "Shop drawings SM10.2 - SM10.5 available"

inspection_criteria:
  structural_critical:  # 100% inspection required
    - id: HP2-STR-01
      item: "Shear wall nailing"
      requirement: "7/16\" OSB, 8d @ 3\" O.C. edges, 6\" O.C. field"
      code: "IRC R602.10.3"
      method: "Visual inspection + nail pattern gauge"
      acceptance: "All perimeter nails present, spacing within ±1/4\""
      sample: "100% of shear wall perimeter"
      failure_mode: "❌ STOP WORK - structural deficiency"

    - id: HP2-STR-02
      item: "Top plate connections"
      requirement: "H2.5 hurricane clips at all studs"
      code: "IRC R602.10.1"
      method: "Visual count, verify nail quantity (12 nails per clip)"
      acceptance: "All clips installed, no missing nails"
      sample: "100% of exterior wall connections"
      failure_mode: "❌ STOP WORK - connection deficiency"

  dimensional_checks:  # Statistical sampling OK
    - id: HP2-DIM-01
      item: "Stud spacing"
      requirement: "16\" O.C. maximum per IRC R602.3"
      code: "IRC R602.3"
      method: "Tape measure, on-center spacing"
      acceptance: "15.5\" - 16.5\" actual (±1/2\" tolerance)"
      sample: "20% of studs (min 5 per wall)"
      failure_mode: "⚠️ REPAIR - adjust spacing, re-inspect affected area"

    - id: HP2-DIM-02
      item: "Wall plumb"
      requirement: "Within 1/4\" per 8' vertical"
      code: "IRC R602.3.1"
      method: "4' level on both faces"
      acceptance: "Bubble within center zone"
      sample: "100% of exterior walls, 50% of interior"
      failure_mode: "⚠️ REPAIR - re-plumb, re-brace, re-check"

  workmanship_checks:  # Sample inspection
    - id: HP2-WRK-01
      item: "Framing lumber condition"
      requirement: "No splits, wane, excessive knots"
      code: "General workmanship"
      method: "Visual inspection"
      acceptance: "Structurally sound per grading rules"
      sample: "10% visual scan"
      failure_mode: "⚠️ REPLACE - swap out defective lumber"

tpia_required: false
estimated_duration: "45-60 minutes"
documentation:
  form: "FORM-I-002"
  photos: "4 photos minimum (each wall elevation)"
  attachments: "NCR forms if applicable"

approval_chain:
  - role: "QA Inspector"
    name: "Zach Lamont"
    authority: "Pass/Fail decision"
  - role: "Production Lead"
    authority: "Acknowledge, proceed to Phase 3"

next_phase_trigger: "HP-2 passed → Start Phase 3 (Roof Framing)"
```

### 5.5 Continuous Learning & Gap Detection
**Skills Needed:**
- **Self-auditing:** Compare generated QMS content against industry best practices
- **Gap identification:** Detect when code requirement has no corresponding SOP/WI/Form
- **Version tracking:** Notice when shop drawing revision changes and flag affected documents
- **Feedback incorporation:** Learn from inspector rejections (what gets flagged at HP-4?)
- **Proactive suggestions:** "I noticed WI-104 doesn't specify torque for PEX crimps - should we add that?"

**Example Gap Detection:**
```
CLAUDE ANALYSIS: QMS Coverage Audit

✅ FULL COVERAGE:
- IRC R502 (Floor Systems) → SOP-101, WI-101, FORM-I-001, HP-1
- IRC R602 (Wall Systems) → SOP-102, WI-102, FORM-I-002, HP-2
- IRC R802 (Roof Systems) → SOP-103, WI-103, FORM-I-003, HP-3

⚠️ PARTIAL COVERAGE:
- NEC § 550.16 (Grounding) → SOP-104 mentions but WI-104 lacks specific steps
  RECOMMENDATION: Add WI-104 Section 4.2.3 "Grounding Electrode System Installation"

- IPC § 305.4.1 (PEX Support Spacing) → Mentioned in WI-104 but no inspection criteria
  RECOMMENDATION: Add FORM-I-004, Section B1, Item 3: "PEX support spacing check"

❌ NO COVERAGE:
- IECC § R402.4.1.2 (Air Sealing) → No dedicated SOP, WI, or Form
  RISK: TPIA may flag at HP-8 (final inspection)
  ACTION: Create SOP-105A "Air Sealing & Insulation" with blower door test procedure
  TARGET: Complete before CC21TE module production

- IRC § R310 (Emergency Egress) → Mentioned in QMS-005 but no verification procedure
  RISK: Code compliance gap, DOH may reject certification application
  ACTION: Add egress check to FORM-I-007 (Interior Finishes)
  TARGET: Implement in next QMS revision (Q2 2026)
```

---

## 🛠️ IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Q1 2026) - PDF & Code Understanding
**Skills to Develop:**
1. ✅ Text extraction from PDF shop drawings (DONE - `extract-cc21te.js`)
2. 🔨 Visual PDF interpretation (multi-modal AI for drawing understanding)
3. 🔨 Building code corpus integration (IRC, NEC, IPC, IMC, IECC full text)
4. 🔨 Code citation parsing and linking

**Deliverable:** Claude can read shop drawing PDF and extract all specifications with 95%+ accuracy

### Phase 2: Traceability (Q2 2026) - Mapping & Cross-Referencing
**Skills to Develop:**
1. 🔨 Regulatory-to-QMS mapping automation
2. 🔨 Multi-sheet drawing coordination
3. 🔨 Fastener schedule extraction and normalization
4. 🔨 Material BOM aggregation across sheets

**Deliverable:** Automated traceability matrix generation (TRACE-001, TRACE-004 style)

### Phase 3: Document Generation (Q3 2026) - SOPs, WIs, Forms
**Skills to Develop:**
1. 🔨 SOP generation from code requirements + shop drawings
2. 🔨 Work instruction generation with step-by-step procedures
3. 🔨 Inspection form generation with pass/fail criteria
4. 🔨 Hold point criteria auto-generation

**Deliverable:** Full QMS document set generated from shop drawings in <2 hours (vs. 40+ hours manual)

### Phase 4: Visual Generation (Q4 2026) - Diagrams & SVGs
**Skills to Develop:**
1. 🔨 SVG technical diagram generation from PDF details
2. 🔨 Mermaid flowchart auto-generation for processes
3. 🔨 Exploded view / isometric projection creation
4. 🔨 Annotation and callout placement

**Deliverable:** Work instructions include auto-generated visual aids

### Phase 5: Intelligence (2027) - Learning & Optimization
**Skills to Develop:**
1. 🔨 Feedback loop from inspection results (what fails at hold points?)
2. 🔨 Continuous QMS gap detection
3. 🔨 Proactive code change monitoring (when IRC 2024 updates, flag affected SOPs)
4. 🔨 Best practice recommendations ("Industry standard for this is X, consider updating")

**Deliverable:** Self-improving QMS that learns from production experience

---

## 📊 Success Metrics

### Current State (Manual Process)
- ⏱️ **Time to Create QMS:** 40-60 hours per module type
- 📝 **Document Accuracy:** 85-90% (requires multiple review cycles)
- 🔍 **Traceability Completeness:** 70% (some gaps in drawing-to-code mapping)
- 🤖 **Automation Level:** 10% (basic PDF text extraction only)

### Target State (AI-Powered Process)
- ⏱️ **Time to Create QMS:** <2 hours per module type (95% reduction)
- 📝 **Document Accuracy:** 98%+ (consistent application of rules)
- 🔍 **Traceability Completeness:** 100% (automated cross-referencing)
- 🤖 **Automation Level:** 85% (human review for edge cases only)

### ROI Calculation
**Manual Process:**
- QMS Development: 50 hours × $75/hr = $3,750 per module type
- Review/Revision: 10 hours × $75/hr = $750
- **Total: $4,500 per module**

**AI-Powered Process:**
- Shop Drawing Upload: 5 minutes
- AI Generation: 1 hour
- Human Review: 1 hour × $75/hr = $75
- **Total: $75 per module (98% cost reduction)**

**For Fort Homes (7 product models):**
- Manual: 7 × $4,500 = $31,500
- AI-Powered: 7 × $75 = $525
- **Savings: $30,975 (one-time)**

**Ongoing (revisions every 6 months):**
- Manual: 7 × 10 hours × $75 = $5,250/year
- AI-Powered: 7 × 1 hour × $75 = $525/year
- **Savings: $4,725/year**

---

## 🎓 Training Data Needed

### 1. Annotated Shop Drawing Dataset
- 50+ complete shop drawing sets (PDF) with extracted specifications (JSON)
- Covering: Single-family, multi-family, ADUs, commercial modular
- Variety: 1-4 bedroom, different roof styles, various MEP configurations

### 2. Building Code Corpus
- Complete text of IRC 2021, IBC 2021, NEC 2023, IPC 2021, IMC 2021, IECC 2021
- HUD Code (24 CFR 3280) for manufactured housing
- State amendments (Colorado 8 CCR 1302-14)
- Commentary and interpretation guides

### 3. QMS Document Examples
- 100+ SOPs from various industries (construction, manufacturing, aerospace)
- 200+ work instructions with visual aids
- 150+ inspection forms and checklists
- Traceability matrices and FMEA examples

### 4. Technical Drawing Symbols Library
- Architectural symbols (doors, windows, walls, dimensions)
- Structural symbols (beams, columns, connections, hardware)
- MEP symbols (outlets, fixtures, ductwork, piping)
- Welding symbols, fastener symbols, material callouts

### 5. Inspection & Testing Procedures
- Fastener torque specifications
- MEP testing procedures (pressure, voltage, leakage)
- Dimensional tolerance standards
- Material inspection criteria (lumber grading, fastener sizes)

---

## 💡 Immediate Actions (Next 30 Days)

### For Fort Homes Team:
1. **Collect shop drawing samples** (5-10 complete sets) to use as training data
2. **Document current pain points** in manual QMS creation (what takes longest? what errors occur?)
3. **Prioritize use cases** (start with WI generation? Form generation? Traceability?)
4. **Establish success criteria** (how accurate must AI be before trusting it?)

### For Claude Development:
1. **Enhance multi-modal PDF parsing** (combine text extraction + visual understanding)
2. **Integrate building code database** (searchable IRC, NEC, IPC, IMC, IECC)
3. **Train on QMS document structure** (learn Fort Homes templates and style guide)
4. **Develop fastener schedule parser** (extract from tabular data in PDFs)

### For Repository:
1. **Create `/training-data/` directory** with annotated shop drawing examples
2. **Document AI agent prompts** in `/docs/ai-agents/` (reusable templates)
3. **Build evaluation scripts** to measure AI accuracy (compare generated vs. human-written SOPs)
4. **Establish feedback loop** (how to incorporate inspector comments into AI learning)

---

## 🔗 Related Documents
- `/docs/ai-agents/AI-AGENTS-ARCHITECTURE.md` - Current AI agent design
- `/docs/traceability/TRACE-001-Regulatory-Requirements-Matrix.md` - Example output format
- `/scripts/extract-cc21te.js` - Current PDF extraction script
- `/data/cc21te/traceability.md` - Example drawing-to-WI mapping

---

**Document Control**
**Revision:** 1.0
**Effective Date:** 2026-02-04
**Next Review:** 2026-05-04
**Owner:** QA Manager / AI Systems Lead
