# Fort and Home LLC QMS — Professional Document Layout & Formatting Standards

**Version:** 1.0  
**Effective Date:** January 13, 2026  
**Document Control ID:** QMS-LAYOUT-001

---

## Executive Summary

This document establishes the **visual and structural standards** for all Fort and Home LLC QMS documentation, ensuring professional presentation, clarity, and regulatory alignment with Colorado Division of Housing (CDOH) and industry best practices for modular home manufacturing.

---

## 1. QMS Document Hierarchy & Organization

### 1.1 Four-Tier Documentation Structure

```
┌─────────────────────────────────────────────────────┐
│  TIER 1: QUALITY MANUAL                             │
│  (System overview, policy, regulatory compliance)   │
│  → QMS-Manual.md                                    │
└──────────────────────┬──────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼────────────┐┌───────┴─────┐┌──────┴─────────┐
│ TIER 2: SOPs       ││ TIER 2: ITPs ││ TIER 2: Forms  │
│ Process standards ││ Inspection   ││ Templates      │
│ docs/sops/        ││ specs        ││ docs/forms/    │
└────────┬───────────┘└────┬─────────┘└────────────────┘
         │                 │
         │    ┌────────────┘
         │    │
┌────────▼────▼──────────────────────────────────────┐
│ TIER 3: WORK INSTRUCTIONS & DETAILED PROCEDURES     │
│ Step-by-step execution guides with visuals         │
│ docs/work-instructions/ + docs/manual/procedures/  │
└────────┬───────────────────────────────────────────┘
         │
┌────────▼──────────────────────────────────────────┐
│ TIER 4: RECORDS & MODULE TRAVELERS                 │
│ Actual execution records, sign-offs, approvals     │
│ /modules/[Job-ID]/traveler-[Job-ID].md            │
└───────────────────────────────────────────────────┘
```

### 1.2 Document Naming Convention

```
[TYPE]-[SEQUENCE]-[DESCRIPTION].[EXT]

WHERE:
  TYPE = SOP, WI, ITP, FORM, QMS, FRM
  SEQUENCE = Three-digit number (001, 002, etc.)
  DESCRIPTION = Kebab-case procedure title
  EXT = .md or .pdf

EXAMPLES:
  SOP-001-Chassis-Floor-Deck.md           → Standard Operating Procedure
  WI-001-Floor-Deck.md                    → Work Instruction
  ITP-001-Floor-System-Inspection.md      → Inspection Test Plan
  FORM-I001-Floor-Inspection.md           → Inspection Form
  FORM-NCR01-Nonconformance.md            → NCR Form
```

---

## 2. SOP (Standard Operating Procedure) Layout

### 2.1 SOP Document Structure

Each SOP consists of the following sections in this order:

```
1. Title & Document Control Header
   ├─ Document ID, Revision, Effective Date
   ├─ Process Owner, Next Review
   └─ Approval signatures

2. 1. Purpose (1-2 paragraphs)
3. 2. Scope (bullet list)
4. 3. References & Standards
5. 4. Roles & Responsibilities (table)
6. 5. Materials & Equipment (tables)
7. 6. Pre-Production Checklist
8. 7. Detailed Procedure (numbered steps with subsections)
9. 8. Quality Acceptance Criteria (hold points)
10. 9. Nonconforming Items & Corrective Actions
11. 10. Work Instructions & Visual Guides (cross-references)
12. 11. Hold Point Inspection (coordination process)
13. 12. Records & Documentation
14. 13. Training & Competency
15. 14. Safety & Environment
16. Appendices (reference materials)
17. Document Approval (signature block)
18. Revision History
```

### 2.2 SOP Header Format

```markdown
# [SOP-NNN]: [Procedure Title] (PHASE-N)

---

## Document Control

| Field | Value |
| :--- | :--- |
| **Document ID** | SOP-NNN |
| **Revision** | 1.0 |
| **Effective Date** | [DATE] |
| **Process Owner** | [TITLE] |
| **Last Reviewed** | [DATE] |
| **Next Review** | [DATE] |

---

## 1. Purpose
[Clear, concise statement of what the procedure accomplishes]

## 2. Scope
[What processes/products/areas this applies to]

## 3. References & Standards
[Linked reference materials]

...
```

### 2.3 SOP Visual Standards

**Tables for Material Specs:**
```markdown
| Item | Spec | Qty (Typical) | Verification |
| :--- | :--- | :--- | :--- |
| Steel Chassis | Model-specific; engineered | 1 | Cert. on file; visual inspect |
```

**Tables for Roles & Responsibilities:**
```markdown
| Role | Responsibility |
| :--- | :--- |
| Bay Supervisor | Oversee all work; verify adherence to plans |
```

**Tables for Quality Criteria:**
```markdown
| Criterion | Tolerance | Verification Method |
| :--- | :--- | :--- |
| **Frame Squareness** | Diagonals differ ≤¼" | Diagonal tape measure |
```

---

## 3. Work Instruction (WI) Layout

### 3.1 Work Instruction Structure

Each WI is **2–4 pages maximum** and follows this format:

```
1. Overview (purpose, audience, training requirements)
2. Safety Reminders (top priority)
3. Tools & Materials List
4. Section-by-Section Visual Procedures
   ├─ Each section 3–5 steps with diagrams
   ├─ Heavy use of ASCII art / visual callouts
   └─ Troubleshooting for common issues
5. Pre-Inspection Checklist
6. Final Verification Points
```

### 3.2 Work Instruction Visual Standards

**Diagrams:** Use ASCII art or text-based visuals for clarity:

```
        TOP VIEW EXAMPLE:

        ┌─────────────────────────────────────┐
        │  CHASSIS FRAME                      │
        │  ├─ Rim joist (exterior edge)       │
        │  └─ Floor joists @ 16" o.c.        │
        └─────────────────────────────────────┘
```

**Step Format:**
```markdown
### Step X.Y: [Action Title]

**What to Do:**
1. [First action]
2. [Second action]
3. [Verification]

**Checklist:**
- [ ] Item 1
- [ ] Item 2

**Diagram:** [ASCII art or visual reference]
```

**Photo Documentation:**
- Production crews use smartphone cameras (high enough resolution)
- Photos show hand placement, tool positioning, final results
- Minimum 2 photos per major step (before/after or process detail)

---

## 4. Inspection Test Plan (ITP) & Form Layout

### 4.1 Hold Point Inspection Form Structure

Each **Hold Point Inspection Form** has:

```
┌─────────────────────────────────────────────────┐
│ FORM HEADER                                     │
│ ├─ Form ID (FORM-Ixx)                          │
│ ├─ Hold Point Reference (HP-x)                 │
│ ├─ Module Information Table                    │
│ └─ Inspector Information Section               │
├─────────────────────────────────────────────────┤
│ PART A: STRUCTURAL ITEMS                       │
│ [Detailed checklist with P/F columns]          │
├─────────────────────────────────────────────────┤
│ PART B: MATERIAL CERTIFICATIONS                │
│ [Required certs verification]                  │
├─────────────────────────────────────────────────┤
│ PART C: NONCONFORMING ITEMS (if any)           │
│ [NCR routing table]                            │
├─────────────────────────────────────────────────┤
│ PART D: OVERALL ASSESSMENT                     │
│ [PASS/FAIL summary]                            │
├─────────────────────────────────────────────────┤
│ PART E: SIGN-OFF & ARCHIVAL                    │
│ [Inspector signature, retention instructions]  │
└─────────────────────────────────────────────────┘
```

### 4.2 Inspection Checklist Table Format

```markdown
| Item | Criteria | Result | Comment / Measurement |
| :--- | :--- | :--- | :--- |
| **A.1.1** | Frame free of cracks, bends, severe rust | ☐ P ☐ F | |
| **A.1.2** | Frame level (top surface ±¼" across length) | ☐ P ☐ F | Measured: ___ ± ____ |
```

**Key Features:**
- Unique item numbers (hierarchical: A.1.1, A.1.2, B.2.1, etc.)
- Pass/Fail (P/F) checkboxes
- Measurement field for quantitative criteria
- Comment section for observations/evidence

---

## 5. Nonconformance Report (NCR) Layout

### 5.1 NCR Form Structure

```markdown
# FORM-NCR01: Nonconformance Report

| Section | Contents |
| :--- | :--- |
| **Part A: Identification** | Date, module ID, defect location, severity |
| **Part B: Problem Description** | What was wrong, where, photos |
| **Part C: Root Cause Analysis** | Why it occurred |
| **Part D: Disposition** | Rework / Scrap / Use As-Is |
| **Part E: Corrective Action** | How to fix, who is responsible, deadline |
| **Part F: Verification** | Re-inspection result, sign-off |
| **Part G: Closure** | Date closed, lessons learned |
```

---

## 6. Professional Formatting Standards

### 6.1 Typography & Color

| Element | Style | Size | Color | Usage |
| :--- | :--- | :--- | :--- | :--- |
| Main Title | Bold | 24-28pt | Navy Blue (#003366) | Document H1 |
| Section Heading | Bold | 16-18pt | Teal (#00796B) | Section H2 |
| Subsection | Bold | 14-16pt | Dark Gray (#333333) | H3/H4 |
| Body Text | Regular | 11pt | Black (#000000) | Standard |
| Code/Data | Monospace | 10pt | Dark Gray | Specifications |

### 6.2 Visual Hierarchy & Spacing

```
Document Structure:
┌─────────────────────────────────────────────┐
│  Title (H1)                   [24pt bold]    │
│                                             │
│  Section Heading (H2)         [16pt bold]   │
│  ───────────────────────────────────────    │
│                                             │
│  Subsection (H3)              [14pt bold]   │
│                                             │
│  Body text flows here. Use 1.15 line       │
│  spacing for readability. Include 15%      │
│  white space on margins.                   │
│                                             │
│  ├─ Bullet points use hierarchy            │
│  │  └─ Second-level bullets                │
│  │     └─ Third-level if needed            │
│                                             │
│  1. Numbered lists for sequences           │
│  2. Or procedural steps                    │
│  3. Each step builds on previous           │
│                                             │
│  [Callout Box]                             │
│  ┌─────────────────────────────────────┐  │
│  │ Important information, warnings,     │  │
│  │ or critical notes go in boxes.       │  │
│  │ Use light background color.         │  │
│  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### 6.3 Callout & Warning Standards

**CRITICAL (Red):**
```markdown
⛔ **CRITICAL HOLD POINT**
Do NOT proceed beyond this step without HP-x inspection approval.
```

**WARNING (Orange/Yellow):**
```markdown
⚠️ **WARNING: Fall Hazard**
All work at heights >6 feet requires fall protection harness and lanyard.
```

**IMPORTANT (Blue):**
```markdown
ℹ️ **IMPORTANT**
Verify material certifications are on file before installation begins.
```

**NOTE (Gray):**
```markdown
📝 **NOTE**
This step may be performed by either Framing or MEP crew, depending on scheduling.
```

---

## 7. Module Traveler & Record Layout

### 7.1 Module Traveler Structure

The **Module Traveler** is a living document that accompanies each module through production:

```
Module Traveler (Physical + Digital)
├─ Front Cover (Module ID, Model, Customer)
├─ Phase-by-Phase Checklists (HP inspection results)
├─ Material Certifications (filed)
├─ NCR Log (any nonconformances issued)
├─ Photographs (as-built, defects, repairs)
├─ Inspection Records (signed FORM-I00x)
├─ Rework Documentation (if applicable)
└─ Final Inspection Sign-Off (FORM-I999)
```

### 7.2 Traveler Page Format

**Each phase in traveler:**

```markdown
## PHASE-2: Wall Framing & Sheathing

| Item | Status | Date | Inspector |
| :--- | :--- | :--- | :--- |
| **HP-2 Inspection** | ☐ Pass ☐ Fail | _____ | _____________ |
| **Material Certs** | ☐ Filed | _____ | _____________ |
| **NCRs Issued** | _____ items | _____ | _____________ |
| **Rework Complete** | ☐ Yes ☐ N/A | _____ | _____________ |

**Release to Phase-3?** ☐ Yes ☐ No (if no, see NCR section)
```

---

## 8. Digital Document Accessibility & Formatting

### 8.1 Markdown Standards for Web/PDF

All documents are authored in **Markdown (.md)** for:
- Version control via Git
- Easy conversion to PDF via Pandoc
- Web display via static site generator (optional)
- Seamless integration with ERP/document management systems

### 8.2 PDF Export Standards

When converting Markdown to PDF:
- **Paper:** 8.5" × 11" (Letter size)
- **Margins:** 0.75" all sides
- **Font:** Calibri or Arial (11pt body)
- **Images:** Minimum 150 DPI
- **Hyperlinks:** Enabled with table of contents
 - **Metadata:** Title, Author (Fort and Home LLC QMS), Creation date

---

## 9. Visual Aids & Diagrams Standards

### 9.1 Diagram Types & Usage

| Diagram Type | Usage | Example Format |
| :--- | :--- | :--- |
| **Flowchart** | Process flow, decision trees | Mermaid or ASCII |
| **Assembly Diagram** | Component layout, positioning | ASCII art or photo overlay |
| **Detail Callouts** | Close-up views, fastener patterns | Photography with annotations |
| **Cross-Section** | Layer stacking, assembly elevation | ASCII cross-section |
| **Exploded View** | Component relationships | ASCII 3D perspective |

### 9.2 Flowchart Standards

```markdown
┌──────────────┐
│   START      │
└───────┬──────┘
        │
        ▼
┌──────────────────┐
│ Decision Point?  │
└┬────────────┬────┘
 │ YES        │ NO
 │            │
 ▼            ▼
[ACTION]  [OTHER ACTION]
 │            │
 └────┬───────┘
      │
      ▼
 ┌──────────────┐
 │   APPROVE    │
 └──────────────┘
```

### 9.3 Photography Standards

For production floor documentation:
- **Resolution:** Minimum 2MP (smartphone acceptable)
- **Lighting:** Natural light preferred; avoid shadows
- **Subject:** Show hands/tools in action, final results
- **Captions:** Brief description, measurement scale if applicable
- **Angle:** 45-90° to subject (not at extreme angles)

**Example Photo Series:**
1. Before (setup, initial state)
2. During (hand placement, tool operation)
3. After (completed work, verification)

---

## 10. Quality Document Control System

### 10.1 Document Status Indicators

```markdown
| Status | Indicator | Meaning |
| :--- | :--- | :--- |
| **DRAFT** | 🟡 | Under development, not for production use |
| **REVIEW** | 🟠 | Awaiting management/stakeholder approval |
| **ACTIVE** | 🟢 | Approved and in use on production floor |
| **OBSOLETE** | ⚫ | Superseded by newer version; archive only |
| **SUPERSEDED** | 🔴 | Replaced by [Link to New Doc]; do not use |
```

### 10.2 Revision Tracking

Every document includes a **Revision History** table:

```markdown
| Revision | Date | Author | Changes |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-01-13 | QMS Team | Initial release |
| 1.1 | [TBD] | [Name] | [Description of changes] |
```

### 10.3 Document Control Checklist

Before publishing any QMS document:

- [ ] Document ID and title are unique (not duplicate)
- [ ] Revision number is current (1.0 for new)
- [ ] Effective date is populated
- [ ] Process owner is identified
- [ ] All references and hyperlinks are tested
- [ ] Approval signatures obtained (if required)
- [ ] Scanned and filed in document management system
- [ ] Posted to production area (if paper copy required)
- [ ] All team members notified of new/updated document
- [ ] Old versions archived or destroyed per retention policy

---

## 11. Implementation Roadmap (6-Month Deployment)

### Phase 1: Foundation (Months 1-2)
- ✅ Establish document hierarchy and naming conventions
- ✅ Create template files for SOP, WI, ITP, Forms
- ✅ Build approval workflow process
- [ ] Train QMS team on documentation standards

### Phase 2: Production SOPs (Months 2-3)
- [ ] Document all Phase-1 through Phase-8 procedures
- [ ] Develop work instructions with visual aids
- [ ] Create inspection forms for each hold point

### Phase 3: Visual Enhancement (Months 3-4)
- [ ] Photograph production processes
- [ ] Create detailed flowcharts and diagrams
- [ ] Develop visual quick-reference cards

### Phase 4: Testing & Validation (Months 4-5)
- [ ] Pilot new procedures on 2–3 modules
- [ ] Gather crew feedback and refine
- [ ] Validate inspection criteria with quality data

### Phase 5: Full Deployment (Month 5-6)
- [ ] Roll out to all production bays
- [ ] Conduct training sessions
- [ ] Monitor compliance and effectiveness

---

## 12. Document Templates & Examples

Refer to existing documents for layout examples:

- **SOP Example:** [SOP-001-Chassis-Floor-Deck.md](docs/sops/SOP-001-Chassis-Floor-Deck.md)
- **WI Example:** [WI-001-Floor-Deck.md](docs/work-instructions/WI-001-Floor-Deck.md)
- **Form Example:** [FORM-I002-Floor-Inspection.md](docs/forms-templates/FORM-I002-Floor-Inspection.md)

---

## 13. Continuous Improvement

This QMS layout framework is **living documentation** and will be updated as:
- New best practices emerge
- Technology or processes change
- Crew feedback suggests improvements
- Regulatory requirements shift

**Document Review Cycle:** Annually (every 12 months) or as needed

---

## Approval & Authority

| Role | Signature | Date |
| :--- | :--- | :--- |
| QMS Manager | __________________ | __________ |
| Production Manager | __________________ | __________ |
| Executive Leadership | __________________ | __________ |

---

**End of Document**

---

**Version:** 1.0 | **Effective Date:** 2026-01-13 | **Document ID:** QMS-LAYOUT-001
