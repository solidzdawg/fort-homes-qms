---
title: "Typography Reference"
document_id: "QMS-TYPO-2026"
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

### TYPOGRAPHY REFERENCE

| Attribute | Value |
|:----------|:------|
| **Document ID** | `QMS-TYPO-2026` |
| **Revision** | `2.0` |
| **Effective Date** | January 2026 |
| **Process Owner** | Document Controller |
| **Classification** | CONTROLLED |
| **Review Cycle** | Semi-Annual |
| **Next Review** | July 2026 |

---

</div>

## 📋 Purpose

This document provides comprehensive typography standards for all Fort Homes QMS documentation, ensuring consistent, professional, and highly readable documentation across all platforms.

---

## 🔤 Typography Standards

### Research-Backed Font Selection

Based on 2025-2026 professional documentation research, the following fonts have been selected for optimal readability, professionalism, and technical precision:

<div style="background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%); border-left: 4px solid #2196F3; padding: 16px; margin: 16px 0; border-radius: 4px;">
  <strong>ℹ️ NOTE</strong><br>
  Font specifications are optimized for print and PDF output. When rendered in markdown on GitHub, system fonts will be used as fallbacks.
</div>

---

## 📊 Font Hierarchy

### Complete Typography Scale

| Element | Font Family | Size | Weight | Line Height | Letter Spacing | Rationale |
|:--------|:------------|:-----|:-------|:------------|:---------------|:----------|
| **Document Title (H1)** | Oswald | 28pt | Bold (700) | 1.2 | 0.5pt | Modern authority, strong visual hierarchy |
| **Section Headers (H2)** | Oswald | 20pt | SemiBold (600) | 1.3 | 0.3pt | Clear distinction from body, professional |
| **Subsection (H3)** | Open Sans | 16pt | SemiBold (600) | 1.4 | 0pt | Readable differentiation, easy scanning |
| **Body Text** | Open Sans | 11pt | Regular (400) | 1.6 | 0pt | Maximum readability, optimal for long text |
| **Table Headers** | Open Sans | 10pt | Bold (700) | 1.4 | 0pt | Compact yet scannable, clear emphasis |
| **Table Body** | Open Sans | 10pt | Regular (400) | 1.5 | 0pt | High data density without sacrificing clarity |
| **Code/Monospace** | JetBrains Mono | 10pt | Regular (400) | 1.5 | 0pt | Technical precision, character differentiation |
| **Callouts** | Open Sans | 10pt | Medium (500) | 1.5 | 0pt | Emphasis without excessive weight |
| **Captions** | Open Sans | 9pt | Regular (400) | 1.4 | 0pt | Supporting information, image labels |
| **Footer Text** | Open Sans | 8pt | Regular (400) | 1.3 | 0pt | Small but legible for legal/metadata |

---

## 🎯 Primary Fonts

### Oswald - Display & Headers

**Usage:** Document titles, section headers (H1, H2)  
**Characteristics:**
- Modern, condensed sans-serif
- Strong visual presence
- Excellent for establishing hierarchy
- Clean, professional appearance

**When to Use:**
- Document titles
- Major section headings (H1, H2)
- Emphasis headers in callout boxes
- Report cover pages

**Example Markdown:**
```markdown
# Document Title (H1 - Oswald)
## Section Header (H2 - Oswald)
```

**Font Weights Available:**
- Light (300) - Not recommended for QMS use
- Regular (400) - Acceptable for secondary headers
- SemiBold (600) - **Recommended for H2**
- Bold (700) - **Recommended for H1**

---

### Open Sans - Body & Data

**Usage:** Body text, tables, subsections (H3, H4), callouts  
**Characteristics:**
- Humanist sans-serif
- Optimized for readability
- Neutral and professional
- Excellent for technical documentation

**When to Use:**
- All body paragraphs
- Table content (headers and body)
- Subsection headers (H3, H4)
- Callout box content
- Lists and bullet points
- Captions and labels

**Example Markdown:**
```markdown
### Subsection (H3 - Open Sans)
#### Sub-subsection (H4 - Open Sans)

Body text is automatically rendered in Open Sans for optimal readability across
all documentation types including procedures, instructions, and technical specifications.
```

**Font Weights Available:**
- Light (300) - Acceptable for large text only
- Regular (400) - **Recommended for body text**
- Medium (500) - **Recommended for callouts**
- SemiBold (600) - **Recommended for H3, H4**
- Bold (700) - **Recommended for table headers, emphasis**

---

### JetBrains Mono - Technical Data

**Usage:** Code blocks, technical specifications, data fields  
**Characteristics:**
- Designed specifically for developers
- Excellent character differentiation (0 vs O, 1 vs l vs I)
- Optimized for technical precision
- Includes programming ligatures

**When to Use:**
- Code snippets
- Document IDs and reference numbers
- Technical specifications
- Database field names
- Command-line examples
- Structured data blocks

**Example Markdown:**
````markdown
```
Document ID: QMS-001
Revision: 2.0
Status: ACTIVE
```
````

**Font Weights Available:**
- Regular (400) - **Recommended for all technical text**
- Bold (700) - Use sparingly for emphasis in code comments

---

## 📏 Size Scale Guidelines

### Print/PDF Output Sizes

For professional PDF generation:

| Level | Size (pt) | Use Case |
|:------|:----------|:---------|
| XXL | 28pt | Document titles only |
| XL | 20pt | Major section headers |
| L | 16pt | Subsection headers |
| M | 11pt | **Body text (default)** |
| S | 10pt | Tables, callouts, technical data |
| XS | 9pt | Captions, image labels |
| XXS | 8pt | Footer text, metadata |

### Web/Markdown Rendering

When rendered in markdown on GitHub:
- Heading levels automatically scale based on H1-H6 tags
- Body text uses GitHub's default rendering
- Code blocks use GitHub's monospace font

---

## 📐 Spacing Standards

### Line Height (Leading)

Proper line height ensures readability:

| Text Type | Line Height | Calculation |
|:----------|:------------|:------------|
| **Headers (H1-H2)** | 1.2-1.3 | Tight for visual impact |
| **Body Text** | 1.6 | Comfortable reading |
| **Tables** | 1.4-1.5 | Compact yet readable |
| **Captions** | 1.4 | Space-efficient |
| **Code Blocks** | 1.5 | Technical clarity |

### Paragraph Spacing

- **Before Paragraph:** 0pt (let headings create space)
- **After Paragraph:** 8pt minimum
- **Between Sections:** 16pt minimum

### Letter Spacing (Tracking)

| Element | Spacing | Purpose |
|:--------|:--------|:--------|
| **Headers (H1-H2)** | +0.3pt to +0.5pt | Visual prominence |
| **Body Text** | 0pt | Optimal readability |
| **Callouts** | 0pt | Standard |
| **All Caps Text** | +1pt | Improved legibility |

---

## ✍️ Text Formatting

### Emphasis Techniques

| Purpose | Markdown | Rendered | When to Use |
|:--------|:---------|:---------|:------------|
| **Strong Emphasis** | `**text**` | **text** | Critical information, terms |
| *Italic Emphasis* | `*text*` | *text* | References, terminology |
| `Code/Technical` | `` `text` `` | `text` | IDs, commands, data |
| ***Bold Italic*** | `***text***` | ***text*** | Rarely - extreme emphasis only |

### Best Practices

**Do:**
- Use **bold** for critical requirements (SHALL, MUST)
- Use *italics* for document references
- Use `code format` for IDs and technical data
- Maintain consistent emphasis throughout documents

**Don't:**
- Overuse bold (reduces impact)
- Use ALL CAPS except for acronyms
- Underline text (reserved for hyperlinks)
- Mix multiple emphasis styles in one phrase

---

## 📝 Markdown Headers

### Header Hierarchy

```markdown
# H1 - Document Title (Oswald, 28pt, Bold)
Use once per document, at the top

## H2 - Major Section (Oswald, 20pt, SemiBold)
Primary section dividers

### H3 - Subsection (Open Sans, 16pt, SemiBold)
Secondary content organization

#### H4 - Sub-subsection (Open Sans, 14pt, SemiBold)
Tertiary content organization

##### H5 - Minor Heading (Open Sans, 12pt, SemiBold)
Rarely used - consider restructuring if needed

###### H6 - Smallest Heading (Open Sans, 11pt, SemiBold)
Avoid if possible - indicates over-complexity
```

### Header Usage Rules

1. **Never skip levels** - Don't jump from H2 to H4
2. **Use H1 once** - Only for document title
3. **H2 for sections** - Major document divisions
4. **H3 for subsections** - Most common level
5. **H4 sparingly** - Consider if document is too complex
6. **Avoid H5-H6** - Restructure document instead

---

## 📊 Table Typography

### Header Row

```markdown
| **Header 1** | **Header 2** | **Header 3** |
|:-------------|:------------:|-------------:|
| Left aligned | Center       | Right aligned|
```

**Standards:**
- Font: Open Sans
- Size: 10pt
- Weight: Bold (700)
- Always use bold formatting in markdown (`**Header**`)

### Body Rows

**Standards:**
- Font: Open Sans
- Size: 10pt
- Weight: Regular (400)
- Use bold for emphasis cells only

### Alignment

| Data Type | Alignment | Markdown | Example |
|:----------|:----------|:---------|:--------|
| **Text** | Left | `:---` | Description text |
| **Status/Icons** | Center | `:---:` | ✅ Pass |
| **Numbers** | Right | `---:` | 123.45 |
| **Currency** | Right | `---:` | $1,234.56 |

---

## 🎨 Special Text Elements

### Callout Box Typography

For HTML-styled callouts:

```html
<div style="...">
  <strong>🎯 HEADING TEXT</strong><br>
  Body text in regular weight.
</div>
```

**Standards:**
- Heading: Open Sans, 10pt, Bold
- Body: Open Sans, 10pt, Regular
- Line Height: 1.5

### Code Blocks

````markdown
```language
code content here
```
````

**Standards:**
- Font: JetBrains Mono
- Size: 10pt
- Weight: Regular (400)
- Background: Light gray (#F6F8FA)

### Inline Code

Use backticks for inline technical text:

```markdown
The document ID is `QMS-001` and revision is `2.0`.
```

**Standards:**
- Font: JetBrains Mono
- Size: Match surrounding text (typically 11pt body)
- Background: Light gray
- Padding: 2px 4px

---

## 🖼️ Typography in Context

### Document Header Example

```markdown
<div align="center">

# 🏗️ FORT HOMES LLC
## Quality Management System

---

### DOCUMENT TITLE

| Attribute | Value |
|:----------|:------|
| **Document ID** | `QMS-001` |
| **Revision** | `2.0` |

---

</div>
```

**Applied Typography:**
- "FORT HOMES LLC" - Oswald Bold, acts as H1
- "Quality Management System" - Oswald SemiBold, acts as H2
- "DOCUMENT TITLE" - Oswald SemiBold, acts as H3
- Table content - Open Sans Regular 10pt
- Document ID values - JetBrains Mono 10pt

---

## 📱 Responsive Considerations

### Screen vs Print

| Medium | Optimization | Key Consideration |
|:-------|:-------------|:------------------|
| **Screen** | Larger sizes for readability | Higher line height (1.6) |
| **Print/PDF** | Compact for page efficiency | Standard line height (1.5) |
| **Mobile** | System fonts for performance | Let device handle sizing |

### Accessibility

Ensure all typography meets WCAG 2.1 Level AA:

- **Minimum Size:** 9pt for body text
- **Contrast Ratio:** 4.5:1 minimum for body text
- **Line Length:** 50-75 characters per line ideal
- **Line Height:** 1.5 minimum for body text

---

## 🔧 Implementation Guide

### For Document Authors

1. **Use markdown headers correctly**
   - H1 for title, H2 for sections, H3 for subsections

2. **Apply emphasis appropriately**
   - Bold for critical items
   - Italics for references
   - Code format for IDs

3. **Format tables consistently**
   - Bold headers
   - Proper alignment
   - Regular body text

4. **Use callout boxes**
   - Follow HTML templates
   - Strong tags for headings

### For PDF Generation

When generating PDFs with custom fonts:

```css
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');

body {
  font-family: 'Open Sans', sans-serif;
  font-size: 11pt;
  line-height: 1.6;
}

h1, h2 {
  font-family: 'Oswald', sans-serif;
}

h3, h4, h5, h6 {
  font-family: 'Open Sans', sans-serif;
}

code, pre {
  font-family: 'JetBrains Mono', monospace;
}
```

---

## ✅ Typography Checklist

Before publishing documents, verify:

- [ ] Headers use proper hierarchy (H1→H2→H3)
- [ ] No header levels skipped
- [ ] Bold used for critical requirements only
- [ ] Italics used consistently for references
- [ ] Code formatting applied to all IDs and technical data
- [ ] Table headers are bold
- [ ] Table alignment appropriate for data type
- [ ] Line height sufficient for readability
- [ ] No overuse of ALL CAPS
- [ ] Consistent font sizing throughout
- [ ] Callout boxes use strong tags for headings

---

## 📚 Related Documents

- **QMS-VISUAL-STYLE-GUIDE.md** - Master style guide
- **COLOR-PALETTE.md** - Complete color system
- **ICON-EMOJI-REFERENCE.md** - Icon standards
- **DOCUMENT-TEMPLATES/** - Implementation examples

---

## 🔄 Revision History

| Version | Date | Description | Author | Approved By |
|:--------|:-----|:------------|:-------|:------------|
| 1.0 | 2025-06-01 | Initial typography standards | Document Controller | Quality Manager |
| 2.0 | 2026-01-15 | Research-backed font selection, expanded guidelines | Document Controller | Quality Manager |

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
