# Fort Homes QMS Documentation System

## Overview

This documentation system transforms markdown files into professional HTML and PDF outputs following Fort Homes brand specifications. The system uses Pandoc for conversion, custom CSS for styling, and includes a library of SVG diagrams for visual documentation.

## Brand Specifications

All generated documents follow the Fort Homes QMS brand system:

- **Colors**: Charcoal Olive (#101810), Secondary Dark (#181810), Off-White (#F8F8F8), Neutral Gray (#B8B8B8)
- **Typography**: Oswald font family with specific heading sizes and weights
- **Page Layout**: US Letter (8.5" × 11") with 1" top/bottom and 0.75" left/right margins
- **Headers/Footers**: Brand-consistent headers and footers on every page

### Font Loading

The system uses Google Fonts CDN for Oswald font family. For offline use or better performance, you can:

1. Download Oswald font files from Google Fonts
2. Place them in `assets/fonts/`
3. Update `assets/css/typography.css` to reference local files instead of the CDN import

## Quick Start

### Building HTML Documentation

```bash
# Build HTML only (fast)
npm run build:html

# Or use the script directly
bash scripts/build-docs.sh
```

Generated HTML files will be in `dist/html/`

### Building PDF Documentation

```bash
# Build PDFs only
npm run build:pdf

# Build both HTML and PDF
npm run build:all
```

⚠️ **Note**: PDF generation requires LaTeX and can be slow (several minutes for all documents).

## Document Structure

### YAML Frontmatter

Add YAML frontmatter to the top of your markdown files to provide metadata:

```yaml
---
title: "Document Control & Records Management"
document_id: "SOP-001"
revision: "2.0"
effective_date: "January 2026"
process_owner: "Quality Manager"
next_review: "July 2026"
---
```

### Standard Sections

A typical QMS document should include:

1. **Title Block** - Document ID, revision, owner
2. **Executive Summary** - Brief overview
3. **Table of Contents** - Auto-generated
4. **Body Sections** - Numbered sections with content
5. **Revision History** - Change log
6. **Approval Block** - Sign-off section

## Markdown Syntax

### Headings

```markdown
# H1 - Section Header (18pt Bold, ALL CAPS)
## H2 - Subsection (14pt SemiBold, Title Case)
### H3 - Sub-subsection (12pt SemiBold, Title Case)
```

### Tables

Tables are automatically styled with zebra striping:

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

### Callout Boxes

Use HTML div elements with specific classes for callouts:

```html
<!-- Warning Callout -->
<div class="callout callout-warning">
<div class="callout-title">Warning</div>
Important safety or quality information that requires attention.
</div>

<!-- Note Callout -->
<div class="callout callout-note">
<div class="callout-title">Note</div>
Additional information or clarification.
</div>

<!-- Tip Callout -->
<div class="callout callout-tip">
<div class="callout-title">Tip</div>
Helpful suggestions or best practices.
</div>

<!-- Hold Point (Critical) -->
<div class="callout callout-hold-point">
<div class="callout-title">Mandatory Hold Point</div>
Production SHALL NOT proceed until QA sign-off received.
</div>

<!-- Quality Checkpoint -->
<div class="callout callout-quality-checkpoint">
<div class="callout-title">Quality Checkpoint</div>
<ul>
  <li>Checkpoint item 1</li>
  <li>Checkpoint item 2</li>
</ul>
</div>
```

### Code References

Highlight code citations with italics and info color:

```markdown
Per *IRC 2021 Section R502.6*, floor joists shall be...
```

Or use HTML for more control:

```html
<span class="code-reference">IRC 2021 Section R502.6</span>
```

### Lists

```markdown
- Unordered list item 1
- Unordered list item 2
  - Nested item 2.1
  - Nested item 2.2

1. Ordered list item 1
2. Ordered list item 2
3. Ordered list item 3
```

### Forms and Checklists

```html
<div class="checkbox-group">
  <div class="checkbox-item">
    <input type="checkbox" id="check1">
    <label for="check1">Item to verify</label>
  </div>
  <div class="checkbox-item">
    <input type="checkbox" id="check2">
    <label for="check2">Another item to verify</label>
  </div>
</div>
```

## Including SVG Diagrams

### Available Diagrams

The system includes professional SVG diagrams in `assets/svg/`:

- `fort-homes-logo.svg` - Company logo
- `process-flow-template.svg` - Generic process flow
- `inspection-checkpoint.svg` - Inspection icon
- `phase-indicator.svg` - 8-phase production tracker
- `safety-warning.svg` - Warning/caution icon
- `quality-gate.svg` - Quality gate graphic
- `floor-joist-layout.svg` - Floor joist pattern (WI-101)
- `wall-framing-layout.svg` - Wall framing (WI-102)
- `roof-truss-diagram.svg` - Roof truss installation (WI-103)
- `mep-rough-in.svg` - MEP routing (WI-104)
- `air-sealing-points.svg` - Air sealing locations (WI-105)
- `final-inspection-checklist.svg` - Inspection visual (WI-108)

### Embedding Diagrams

```markdown
![Floor Joist Layout](../../assets/svg/floor-joist-layout.svg)

<!-- Or with HTML for more control -->
<figure class="diagram-container">
  <img src="../../assets/svg/floor-joist-layout.svg" alt="Floor Joist Layout">
  <figcaption>Figure 1: Floor joist installation pattern per IRC R502.6</figcaption>
</figure>
```

### Phase Indicator

Show production progress:

```html
<div class="phase-indicator">
  <div class="phase-item completed">
    <span class="phase-number">1</span>
    <span class="phase-label">Chassis</span>
  </div>
  <div class="phase-item completed">
    <span class="phase-number">2</span>
    <span class="phase-label">Walls</span>
  </div>
  <div class="phase-item active">
    <span class="phase-number">3</span>
    <span class="phase-label">Roof</span>
  </div>
  <div class="phase-item">
    <span class="phase-number">4</span>
    <span class="phase-label">MEP</span>
  </div>
  <!-- ... continue for phases 5-8 -->
</div>
```

## Styling Reference

### CSS Classes

#### Text Utilities
- `.text-center` - Center align text
- `.text-right` - Right align text
- `.text-uppercase` - Uppercase text
- `.text-bold` - Bold text
- `.text-italic` - Italic text

#### Spacing
- `.mb-sm`, `.mb-md`, `.mb-lg`, `.mb-xl` - Margin bottom
- `.mt-sm`, `.mt-md`, `.mt-lg`, `.mt-xl` - Margin top
- `.p-sm`, `.p-md`, `.p-lg` - Padding

#### Tables
- `.table-compact` - Reduced padding
- `.table-bordered` - All cells bordered
- `.table-striped` - Explicit zebra striping
- `.table-dark-header` - Dark header variant

#### Document Control
- `.document-id` - Style document IDs
- `.revision-number` - Style revision numbers
- `.status-badge` - Status indicators

## Build System Details

### Directory Structure

```
fort-homes-qms/
├── assets/
│   ├── css/          # Stylesheets
│   │   ├── main.css
│   │   ├── typography.css
│   │   ├── tables.css
│   │   ├── forms.css
│   │   ├── diagrams.css
│   │   └── print.css
│   └── svg/          # SVG diagrams
├── docs/
│   ├── sops/         # Standard Operating Procedures
│   ├── work-instructions/  # Work Instructions
│   ├── forms-templates/    # Forms & Templates
│   └── manual/       # QMS Manual sections
├── pandoc/
│   ├── defaults.yaml # Pandoc settings
│   └── metadata.yaml # Shared metadata
├── scripts/
│   └── build-docs.sh # Build script
├── templates/
│   └── html/
│       └── base.html # HTML template
└── dist/             # Generated output
    ├── html/         # HTML files
    └── pdf/          # PDF files
```

### Build Script Options

```bash
# HTML only (default)
bash scripts/build-docs.sh

# With PDF generation
bash scripts/build-docs.sh --with-pdf
bash scripts/build-docs.sh --pdf
```

### Custom Pandoc Options

Edit `pandoc/defaults.yaml` to customize:
- Table of contents depth
- Section numbering
- Syntax highlighting
- PDF engine options

## Troubleshooting

### Common Issues

**HTML generation fails**
- Check that markdown syntax is valid
- Ensure YAML frontmatter is properly formatted
- Verify relative paths to CSS and images

**PDF generation fails**
- Install required LaTeX packages: `sudo apt-get install texlive-latex-base texlive-latex-extra`
- Check that document doesn't have special characters that LaTeX can't handle
- Review error messages in console output

**Styles not applied**
- Verify CSS files are in `assets/css/`
- Check relative paths in generated HTML
- Clear browser cache

**SVG diagrams not showing**
- Confirm SVG files exist in `assets/svg/`
- Check image paths are correct (relative to HTML location)
- Verify SVG files are valid XML

### Getting Help

For issues or questions:
1. Check this documentation
2. Review brand specifications in `docs/context/01-BRAND-SYSTEM.md`
3. Examine existing SOPs for examples
4. Contact the QMS documentation team

## Examples

### Complete SOP Example

See `docs/sops/SOP-002-Training-Competency-Management-V2.md` for a fully-formatted example with:
- Proper YAML frontmatter
- Styled tables
- Callout boxes
- Section numbering
- Revision history

### Work Instruction Example

See `docs/work-instructions/WI-101-Chassis-Floor-Deck.md` for an example with:
- Technical diagrams
- Step-by-step instructions
- Quality checkpoints
- Hold points

## Best Practices

1. **Use semantic HTML** - Use proper heading hierarchy (H1 → H2 → H3)
2. **Keep it simple** - Markdown is best for content; use HTML only when needed
3. **Test builds** - Always build and review HTML output before committing
4. **Version control** - Track changes in revision history
5. **Consistent formatting** - Follow existing document patterns
6. **Optimize images** - Keep SVGs clean and file sizes reasonable
7. **Document metadata** - Always include complete YAML frontmatter

## Updating the System

### Adding New Diagram Types

1. Create SVG file in `assets/svg/`
2. Follow brand color scheme
3. Use Oswald font family for text
4. Document usage in this guide

### Modifying Styles

1. Edit appropriate CSS file in `assets/css/`
2. Test changes with `npm run build:html`
3. Verify print output still works
4. Update this documentation

### Extending Build Script

Edit `scripts/build-docs.sh` to:
- Add new document types
- Modify pandoc options
- Add preprocessing steps
- Customize output structure

## Version History

- **1.0** (January 2026) - Initial release with HTML/PDF generation, SVG library, and brand-compliant styling

---

**Questions or Issues?** Contact the QMS Documentation Team

**Last Updated:** January 2026  
**Maintained By:** Fort Homes QMS Team
