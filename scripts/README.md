# Fort Homes QMS - Scripts Documentation

This directory contains utility scripts for generating PDFs, documents, and other QMS outputs.

## PDF Generation Scripts

### Generate SOP-002 V2 PDF

Generates a professional, print-ready PDF from the SOP-002 Training & Competency Management V2 markdown file.

**Usage:**
```bash
npm run pdf:sop-002
```

**Features:**
- ✅ Professional brand-compliant formatting following `01-BRAND-SYSTEM.md`
- ✅ Headers and footers on every page with Fort Homes branding
- ✅ Proper typography with Helvetica/system sans-serif fonts
- ✅ Brand colors: #101810 (text), #181810 (headers/footers), #F8F8F8 (backgrounds), #B8B8B8 (borders)
- ✅ Preserves ASCII art and flowcharts in monospace font
- ✅ Professional table formatting with alternating row colors
- ✅ Emoji icons preserved throughout
- ✅ Page numbers and revision information in footer

**Output:**
- File: `output/pdf/SOP-002-Training-Competency-Management-V2.pdf`
- Format: US Letter (8.5" × 11")
- Margins: Top/Bottom 1.0", Left/Right 0.75"
- Target size: < 5MB (actual ~32KB)

**Script Location:**
`scripts/generate-sop-002-v2-pdf.js`

**Source File:**
`docs/sops/SOP-002-Training-Competency-Management-V2.md`

### Other PDF Scripts

#### generate-pdf.js
Generates the main QMS PDF document with production phases and hold points.

**Usage:**
```bash
npm run generate-pdf
```

#### generate-traveler.js
Generates traveler forms for manufacturing processes.

**Usage:**
```bash
npm run generate-traveler
```

## Development Notes

### Dependencies
- `pdfkit`: PDF generation library
- `fs`: File system operations
- `path`: Path manipulation

### Brand Specifications
All PDF generation scripts follow the brand system defined in:
- `docs/context/01-BRAND-SYSTEM.md`

Key specifications:
- **Typography**: Helvetica (body), Helvetica-Bold (headers), Courier (code)
- **Colors**: Charcoal Olive (#101810), Secondary Dark (#181810), Off-White (#F8F8F8), Neutral Gray (#B8B8B8)
- **Page Setup**: US Letter, 1.0" top/bottom margins, 0.75" left/right margins
- **Header Bar**: 0.5" height, #181810 background, white text
- **Footer Bar**: 0.4" height, #181810 background, white text with page numbers

### Adding New PDF Generators

To create a new PDF generation script:

1. Create a new script file in `scripts/` directory
2. Use `generate-sop-002-v2-pdf.js` as a template
3. Follow the brand specifications from `01-BRAND-SYSTEM.md`
4. Add a new script entry to `package.json`
5. Test the output thoroughly

Example package.json entry:
```json
"pdf:your-doc": "node scripts/generate-your-doc-pdf.js"
```

### Output Directory

All generated PDFs are output to:
- `output/pdf/`

This directory is automatically created if it doesn't exist. The `output/` directory is in `.gitignore` to prevent checking in generated files.

## Troubleshooting

### Module Not Found Error
If you get a "Cannot find module" error, install dependencies:
```bash
npm install
```

### File Size Too Large
If the generated PDF exceeds 5MB:
1. Check for high-resolution images
2. Reduce font sizes where appropriate
3. Optimize table layouts
4. Consider splitting into multiple documents

### Layout Issues
If content is cut off or overlapping:
1. Review margin and padding settings
2. Check page break logic in `checkPageBreak()` function
3. Adjust spacing in section rendering functions

## Support

For questions or issues with PDF generation:
- Review the source markdown file for formatting issues
- Check the console output for parsing errors
- Verify brand specifications in `01-BRAND-SYSTEM.md`
- Contact the Quality Manager or development team
