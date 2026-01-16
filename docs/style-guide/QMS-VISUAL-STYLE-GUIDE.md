---
title: "QMS Visual Style Guide"
document_id: "QMS-STYLE-2026"
revision: "2.0"
effective_date: "January 2026"
process_owner: "Document Controller"
next_review: "July 2026"
classification: "CONTROLLED"
---

<div align="center">

# 🏗️ FORT HOMES LLC
## Quality Management System

---

### QMS VISUAL STYLE GUIDE

| Attribute | Value |
|:----------|:------|
| **Document ID** | `QMS-STYLE-2026` |
| **Revision** | `2.0` |
| **Effective Date** | January 2026 |
| **Process Owner** | Document Controller |
| **Classification** | CONTROLLED |
| **Review Cycle** | Semi-Annual |
| **Next Review** | July 2026 |

---

</div>

## 📋 Purpose

This master style guide establishes professional typography standards, visual design principles, and formatting guidelines for all Fort Homes QMS documents. It serves as the foundation for creating cutting-edge, professional documentation with consistent branding and visual excellence.

---

## 🎨 Design Philosophy

Fort Homes QMS adopts a **"Billion-Dollar Look"** approach:
- **Professional** - Enterprise-grade visual quality
- **Modern** - Contemporary styling with research-backed design
- **Consistent** - Unified appearance across all 56+ documents
- **Accessible** - Clear hierarchy and maximum readability
- **Branded** - Strong Fort Homes identity throughout

---

## 📐 Typography Standards

Based on 2025-2026 professional documentation research:

| Element | Font | Size | Weight | Rationale |
|---------|------|------|--------|-----------|
| **Document Title (H1)** | Oswald | 28pt | Bold | Modern authority, brand consistency |
| **Section Headers (H2)** | Oswald | 20pt | SemiBold | Clear hierarchy |
| **Subsection (H3)** | Open Sans | 16pt | SemiBold | Readable differentiation |
| **Body Text** | Open Sans | 11pt | Regular | Maximum readability |
| **Table Headers** | Open Sans | 10pt | Bold | Compact, scannable |
| **Table Body** | Open Sans | 10pt | Regular | Data density |
| **Code/Monospace** | JetBrains Mono | 10pt | Regular | Technical precision |
| **Callouts** | Open Sans | 10pt | Medium | Emphasis without distraction |

### Font Guidelines

**Primary Fonts:**
- **Oswald**: Headers and titles - provides modern authority and brand consistency
- **Open Sans**: Body text and tables - optimized for readability in technical documentation
- **JetBrains Mono**: Code blocks and technical data - designed for developer clarity

**Fallback Strategy:**
When specified fonts are unavailable, markdown will use system defaults:
- Headers: System sans-serif
- Body: System default
- Code: System monospace

---

## 🎨 Color Palette

### Primary Colors (Existing Brand)

```
Charcoal Olive: #101810
- Usage: Headers, primary text, dark backgrounds
- Purpose: Primary brand identity color

Secondary Dark: #181810
- Usage: Backgrounds, borders, subtle elements
- Purpose: Supporting dark shade

Off-White: #F8F8F8
- Usage: Page backgrounds, light surfaces
- Purpose: Clean, professional background

Neutral Gray: #B8B8B8
- Usage: Secondary text, borders, dividers
- Purpose: Supporting neutral element
```

### Accent Colors (Extended for Diagrams/Visuals)

```
Success Green: #4CAF50
- Usage: Approved status, pass indicators, complete states
- Example: ✅ Approved | Phase Complete | Quality Check Pass

Warning Amber: #FF9800
- Usage: Hold points, caution states, pending review
- Example: 🎯 HOLD POINT | ⚠️ Requires Attention

Error Red: #F44336
- Usage: Failed inspections, NCRs, critical issues
- Example: ❌ Failed | NCR Created | Critical Safety

Info Blue: #2196F3
- Usage: Information notes, reference materials
- Example: ℹ️ Information | 📋 Note | Reference

Process Purple: #9C27B0
- Usage: In-progress states, workflow indicators
- Example: 🔄 In Progress | Under Review

Highlight Yellow: #FFEB3B
- Usage: Attention items, important highlights
- Example: ⭐ Important | Highlighted Item
```

### Color Usage Matrix

| State/Purpose | Primary Color | Background Color | Border Color |
|:--------------|:--------------|:-----------------|:-------------|
| Success/Approved | #4CAF50 | #E8F5E9 | #4CAF50 |
| Warning/Hold | #FF9800 | #FFF3E0 | #FF9800 |
| Error/Critical | #F44336 | #FFEBEE | #F44336 |
| Information | #2196F3 | #E3F2FD | #2196F3 |
| In Progress | #9C27B0 | #F3E5F5 | #9C27B0 |
| Neutral | #B8B8B8 | #F8F8F8 | #B8B8B8 |

---

## 📄 Document Header Template

### Standard Header (Copy-Paste Ready)

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
| **Review Cycle** | Semi-Annual |
| **Next Review** | July 2026 |

---

</div>
```

### Header Variations by Document Type

**Quality Manual Section:**
```markdown
### [SECTION NAME] - QMS Manual Section

| Attribute | Value |
|:----------|:------|
| **Document ID** | `QMS-00X` |
| **ISO 9001:2015 Clause** | [Clause Number] |
```

**Standard Operating Procedure:**
```markdown
### [SOP TITLE]

| Attribute | Value |
|:----------|:------|
| **Document ID** | `SOP-XXX` |
| **Process Phase** | [Phase Name] |
| **Hold Point** | HP-X (if applicable) |
```

**Work Instruction:**
```markdown
### [WORK INSTRUCTION TITLE]

| Attribute | Value |
|:----------|:------|
| **Document ID** | `WI-XXX` |
| **Parent SOP** | `SOP-XXX` |
| **Skill Level Required** | [Basic/Intermediate/Advanced] |
```

**Inspection Form:**
```markdown
### [FORM TITLE]

| Attribute | Value |
|:----------|:------|
| **Form ID** | `FORM-XXX` |
| **Related SOP** | `SOP-XXX` |
| **TPIA Required** | Yes/No |
```

---

## 📦 Callout Box Styles

### Hold Point (Critical - Orange)

```html
<div style="background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%); border-left: 4px solid #FF9800; padding: 16px; margin: 16px 0; border-radius: 4px;">
  <strong>🎯 MANDATORY HOLD POINT</strong><br>
  Production SHALL NOT proceed until TPIA sign-off received.
</div>
```

**Example:**

<div style="background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%); border-left: 4px solid #FF9800; padding: 16px; margin: 16px 0; border-radius: 4px;">
  <strong>🎯 MANDATORY HOLD POINT</strong><br>
  Production SHALL NOT proceed until TPIA sign-off received.
</div>

### Quality Checkpoint (Green)

```html
<div style="background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%); border-left: 4px solid #4CAF50; padding: 16px; margin: 16px 0; border-radius: 4px;">
  <strong>✅ QUALITY CHECKPOINT</strong><br>
  Verify all items before proceeding.
</div>
```

**Example:**

<div style="background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%); border-left: 4px solid #4CAF50; padding: 16px; margin: 16px 0; border-radius: 4px;">
  <strong>✅ QUALITY CHECKPOINT</strong><br>
  Verify all items before proceeding.
</div>

### Critical Safety (Red)

```html
<div style="background: linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%); border-left: 4px solid #F44336; padding: 16px; margin: 16px 0; border-radius: 4px;">
  <strong>⚠️ CRITICAL SAFETY</strong><br>
  Safety equipment required. PPE must be worn at all times.
</div>
```

**Example:**

<div style="background: linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%); border-left: 4px solid #F44336; padding: 16px; margin: 16px 0; border-radius: 4px;">
  <strong>⚠️ CRITICAL SAFETY</strong><br>
  Safety equipment required. PPE must be worn at all times.
</div>

### Information Note (Blue)

```html
<div style="background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%); border-left: 4px solid #2196F3; padding: 16px; margin: 16px 0; border-radius: 4px;">
  <strong>ℹ️ NOTE</strong><br>
  Reference additional documentation for detailed specifications.
</div>
```

**Example:**

<div style="background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%); border-left: 4px solid #2196F3; padding: 16px; margin: 16px 0; border-radius: 4px;">
  <strong>ℹ️ NOTE</strong><br>
  Reference additional documentation for detailed specifications.
</div>

### In Progress (Purple)

```html
<div style="background: linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%); border-left: 4px solid #9C27B0; padding: 16px; margin: 16px 0; border-radius: 4px;">
  <strong>🔄 IN PROGRESS</strong><br>
  Work in progress - awaiting completion.
</div>
```

---

## 📊 Table Styles

### Professional Table with Icons

```markdown
| Phase | Status | Hold Point | Duration | Crew Size |
|:------|:------:|:----------:|:--------:|:---------:|
| 🏗️ **Phase 1: Foundation** | ✅ | HP-1 | 1-2 days | 2-4 |
| 🧱 **Phase 2: Walls** | ✅ | HP-2 | 2-3 days | 4-6 |
| 🏠 **Phase 3: Roof** | 🔄 | HP-3 | 2 days | 3-5 |
| ⚡ **Phase 4: MEP** | ⏳ | HP-4 | 3-4 days | 4-6 |
| 🧊 **Phase 5: Insulation** | ⏳ | HP-5 | 1-2 days | 2-3 |
| 🎨 **Phase 6: Drywall** | ⏳ | HP-6 | 2-3 days | 3-5 |
| ✨ **Phase 7: Trim** | ⏳ | HP-7 | 2-3 days | 2-4 |
| 🎯 **Phase 8: Final** | ⏳ | HP-8 | 1 day | 2-3 |
```

**Renders as:**

| Phase | Status | Hold Point | Duration | Crew Size |
|:------|:------:|:----------:|:--------:|:---------:|
| 🏗️ **Phase 1: Foundation** | ✅ | HP-1 | 1-2 days | 2-4 |
| 🧱 **Phase 2: Walls** | ✅ | HP-2 | 2-3 days | 4-6 |
| 🏠 **Phase 3: Roof** | 🔄 | HP-3 | 2 days | 3-5 |
| ⚡ **Phase 4: MEP** | ⏳ | HP-4 | 3-4 days | 4-6 |
| 🧊 **Phase 5: Insulation** | ⏳ | HP-5 | 1-2 days | 2-3 |
| 🎨 **Phase 6: Drywall** | ⏳ | HP-6 | 2-3 days | 3-5 |
| ✨ **Phase 7: Trim** | ⏳ | HP-7 | 2-3 days | 2-4 |
| 🎯 **Phase 8: Final** | ⏳ | HP-8 | 1 day | 2-3 |

### Data Table with Alignment

```markdown
| Item | Description | Quantity | Unit Cost | Total |
|:-----|:------------|:--------:|----------:|------:|
| Lumber | 2x4 Studs | 150 | $4.50 | $675.00 |
| Fasteners | Deck Screws | 500 | $0.15 | $75.00 |
| Insulation | R-21 Batts | 200 | $2.25 | $450.00 |
```

### Progress Indicator Table

```markdown
| Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5 | Phase 6 | Phase 7 | Phase 8 |
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
| ✅ | ✅ | 🔄 | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| Complete | Complete | Active | Pending | Pending | Pending | Pending | Pending |
```

**Renders as:**

| Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5 | Phase 6 | Phase 7 | Phase 8 |
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
| ✅ | ✅ | 🔄 | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| Complete | Complete | Active | Pending | Pending | Pending | Pending | Pending |

---

## 🔄 Revision History Template

```markdown
## 🔄 Revision History

| Version | Date | Description | Author | Approved By |
|:--------|:-----|:------------|:-------|:------------|
| 1.0 | 2025-01-15 | Initial release | [Author] | [Approver] |
| 2.0 | 2026-01-15 | Major revision per style guide | [Author] | [Approver] |
```

---

## ✅ Approval Signatures Template

```markdown
## ✅ Approval Signatures

| Role | Name | Signature | Date |
|:-----|:-----|:----------|:-----|
| **Prepared By** | [Name] | _________________ | YYYY-MM-DD |
| **Reviewed By** | Quality Manager | _________________ | YYYY-MM-DD |
| **Approved By** | General Manager | _________________ | YYYY-MM-DD |
```

---

## 📋 Document Footer Template

```markdown
---

**Document Classification:** CONTROLLED  
**Distribution:** [Distribution List]  
**Next Review Date:** [YYYY-MM-DD]  
**Custodian:** Document Controller

---

*Fort Homes LLC - Quality Management System*  
*Grand Junction, Colorado*
```

---

## 🎯 Quality Checklist

Before publishing any QMS document, verify:

- [ ] Document header with metadata table complete
- [ ] Typography follows standards (Oswald headers, Open Sans body)
- [ ] Color palette used consistently
- [ ] Tables properly formatted with appropriate alignment
- [ ] Icons and emoji used appropriately per reference guide
- [ ] Callout boxes styled correctly for their purpose
- [ ] Mermaid diagrams render correctly and use brand colors
- [ ] All cross-references are accurate and up-to-date
- [ ] Revision history updated
- [ ] Approval signatures section included
- [ ] Document footer with classification and dates
- [ ] Spell-check and grammar review completed
- [ ] No ISO references (company not ISO certified)
- [ ] HUD Code, CCR, NEC, and NTA references verified

---

## 📚 Related Documents

- **MERMAID-DIAGRAM-LIBRARY.md** - Comprehensive Mermaid.js templates
- **TYPOGRAPHY-REFERENCE.md** - Detailed font specifications
- **COLOR-PALETTE.md** - Complete color system
- **ICON-EMOJI-REFERENCE.md** - Approved icons and usage
- **DOCUMENT-TEMPLATES/** - Copy-paste ready templates

---

## 🔄 Revision History

| Version | Date | Description | Author | Approved By |
|:--------|:-----|:------------|:-------|:------------|
| 1.0 | 2025-01-15 | Initial style guide | Document Controller | Quality Manager |
| 2.0 | 2026-01-15 | Enhanced with typography standards and expanded color palette | Document Controller | Quality Manager |

---

## ✅ Approval Signatures

| Role | Name | Signature | Date |
|:-----|:-----|:----------|:-----|
| **Prepared By** | Document Controller | _________________ | 2026-01-15 |
| **Reviewed By** | Quality Manager | _________________ | 2026-01-15 |
| **Approved By** | General Manager | _________________ | 2026-01-15 |

---

**Document Classification:** CONTROLLED  
**Distribution:** All Document Authors  
**Next Review Date:** 2026-07-15  
**Custodian:** Document Controller

---

*Fort Homes LLC - Quality Management System*  
*Grand Junction, Colorado*
