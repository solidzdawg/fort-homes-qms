#!/usr/bin/env node
/**
 * Fort Homes LLC - Quality Traveler PDF Generator
 * 
 * Generates professional, print-ready PDF from Quality Traveler markdown
 * Optimized for: Form printing, checklist completion, signature collection
 */

const puppeteer = require('puppeteer');
const { marked } = require('marked');
const matter = require('gray-matter');
const fs = require('fs');
const path = require('path');

// Paths
const INPUT_FILE = path.join(__dirname, '../docs/forms-templates/FORM-QT-001-Quality-Traveler-Checklist.md');
const DIST_DIR = path.join(__dirname, '../dist/forms');
const OUTPUT_FILE = path.join(DIST_DIR, 'FORM-QT-001-Quality-Traveler-Checklist.pdf');

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: false,
  headerIds: true,
  mangle: false,
});

/**
 * Custom CSS for print-optimized PDF
 */
const PDF_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Open+Sans:wght@300;400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

@page {
  size: letter;
  margin: 0.5in 0.5in 0.75in 0.5in;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 10pt;
  line-height: 1.4;
  color: #101810;
  background: white;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Oswald', Arial, sans-serif;
  font-weight: 600;
  page-break-after: avoid;
  break-after: avoid;
  margin-top: 16px;
  margin-bottom: 8px;
}

h1 {
  font-size: 24pt;
  font-weight: 700;
  color: #101810;
  text-align: center;
  margin-bottom: 6px;
}

h2 {
  font-size: 18pt;
  font-weight: 600;
  color: #101810;
  border-bottom: 3px solid #9C27B0;
  padding-bottom: 4px;
  margin-top: 20px;
  margin-bottom: 12px;
}

h3 {
  font-size: 14pt;
  font-weight: 600;
  color: #2196F3;
  margin-top: 12px;
  margin-bottom: 8px;
}

h4 {
  font-size: 12pt;
  font-weight: 600;
  color: #4CAF50;
  margin-top: 10px;
  margin-bottom: 6px;
}

p {
  margin-bottom: 8px;
}

/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
  page-break-inside: avoid;
  break-inside: avoid;
  font-size: 9pt;
}

thead {
  display: table-header-group;
}

th {
  background: linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%);
  color: white;
  padding: 8px 6px;
  text-align: left;
  font-weight: 600;
  border: 1px solid #7B1FA2;
  font-size: 9pt;
}

td {
  padding: 6px;
  border: 1px solid #ddd;
  vertical-align: top;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* Styled boxes/divs */
div[style*="background"] {
  padding: 12px;
  margin: 12px 0;
  border-radius: 6px;
  page-break-inside: avoid;
  break-inside: avoid;
}

/* Checklists */
ul {
  list-style-type: none;
  margin: 6px 0;
  padding-left: 0;
}

li {
  margin: 3px 0;
  padding-left: 20px;
  position: relative;
  font-size: 9pt;
  line-height: 1.5;
}

li:before {
  content: '☐';
  position: absolute;
  left: 0;
  font-size: 11pt;
  color: #666;
}

/* Strong/Bold text */
strong {
  font-weight: 600;
  color: #101810;
}

/* Horizontal rules */
hr {
  border: none;
  border-top: 2px solid #B8B8B8;
  margin: 16px 0;
}

/* Centered content */
div[align="center"] {
  text-align: center;
  margin: 12px 0;
}

/* Signature blocks - ensure they don't break */
.signature-block {
  page-break-inside: avoid;
  break-inside: avoid;
  margin: 12px 0;
  padding: 10px;
  border: 1px solid #ddd;
  background: #f8f8f8;
}

/* Hold point callouts */
div[style*="#FF9800"],
div[style*="#FFF3E0"] {
  border-left: 4px solid #FF9800 !important;
  background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%) !important;
  padding: 12px !important;
  margin: 12px 0 !important;
  page-break-inside: avoid;
  break-inside: avoid;
}

/* Success/complete boxes */
div[style*="#4CAF50"],
div[style*="#E8F5E9"] {
  border-left: 4px solid #4CAF50 !important;
  background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%) !important;
  padding: 12px !important;
  margin: 12px 0 !important;
  page-break-inside: avoid;
  break-inside: avoid;
}

/* Info boxes */
div[style*="#2196F3"],
div[style*="#E3F2FD"] {
  border-left: 4px solid #2196F3 !important;
  background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%) !important;
  padding: 12px !important;
  margin: 12px 0 !important;
  page-break-inside: avoid;
  break-inside: avoid;
}

/* Error/critical boxes */
div[style*="#F44336"],
div[style*="#FFEBEE"] {
  border-left: 4px solid #F44336 !important;
  background: linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%) !important;
  padding: 12px !important;
  margin: 12px 0 !important;
  page-break-inside: avoid;
  break-inside: avoid;
}

/* Purple boxes (Phase identification) */
div[style*="#9C27B0"],
div[style*="border: 3px solid #9C27B0"] {
  border: 3px solid #9C27B0 !important;
  padding: 16px !important;
  margin: 12px 0 !important;
  border-radius: 8px !important;
  background: white !important;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
  page-break-inside: avoid;
  break-inside: avoid;
}

/* Phase-specific boxes with colored borders */
div[style*="border: 3px solid"] {
  padding: 16px !important;
  margin: 12px 0 !important;
  border-radius: 8px !important;
  page-break-inside: avoid;
  break-inside: avoid;
}

/* Form fields and blanks */
input[type="text"],
input[type="checkbox"] {
  border-bottom: 1px solid #333;
  min-width: 200px;
}

/* Emoji - ensure they display correctly */
.emoji {
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

/* Page breaks */
.page-break {
  page-break-before: always;
  break-before: always;
}

.no-break {
  page-break-inside: avoid;
  break-inside: avoid;
}

/* Footer with page numbers */
@page {
  @bottom-right {
    content: "Page " counter(page) " of " counter(pages);
    font-size: 8pt;
    color: #666;
  }
  @bottom-left {
    content: "FORM-QT-001 Rev. 1.0 | Fort Homes LLC";
    font-size: 8pt;
    color: #666;
  }
}

/* Optimize for printing */
@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .no-print {
    display: none !important;
  }
}
`;

/**
 * Process markdown content to HTML
 */
function processMarkdown(content) {
  // Parse frontmatter
  const { data, content: markdown } = matter(content);
  
  // Convert markdown to HTML
  const html = marked.parse(markdown);
  
  return { metadata: data, html };
}

/**
 * Create HTML template for PDF
 */
function createHTMLTemplate(metadata, content) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metadata.title || 'Quality Traveler Checklist'}</title>
  <style>${PDF_CSS}</style>
</head>
<body>
  ${content}
</body>
</html>
  `;
}

/**
 * Generate PDF from markdown
 */
async function generatePDF() {
  try {
    console.log('🚀 Fort Homes Quality Traveler PDF Generator');
    console.log('================================================\n');
    
    // Ensure dist directory exists
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR, { recursive: true });
      console.log(`✅ Created output directory: ${DIST_DIR}`);
    }
    
    // Read markdown file
    console.log(`📖 Reading: ${INPUT_FILE}`);
    if (!fs.existsSync(INPUT_FILE)) {
      throw new Error(`Input file not found: ${INPUT_FILE}`);
    }
    
    const markdownContent = fs.readFileSync(INPUT_FILE, 'utf8');
    console.log(`   File size: ${(markdownContent.length / 1024).toFixed(2)} KB`);
    
    // Process markdown
    console.log('🔄 Processing markdown content...');
    const { metadata, html } = processMarkdown(markdownContent);
    
    // Create HTML
    console.log('🎨 Creating HTML template...');
    const fullHTML = createHTMLTemplate(metadata, html);
    
    // Launch browser
    console.log('🌐 Launching headless browser...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set content
    console.log('📝 Rendering HTML content...');
    await page.setContent(fullHTML, {
      waitUntil: 'networkidle0'
    });
    
    // Generate PDF
    console.log('🖨️  Generating PDF...');
    await page.pdf({
      path: OUTPUT_FILE,
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.75in',
        left: '0.5in'
      },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-size: 8pt; color: #666; width: 100%; padding: 0 0.5in; display: flex; justify-content: space-between;">
          <span>FORM-QT-001 Rev. 1.0 | Fort Homes LLC</span>
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `
    });
    
    await browser.close();
    
    // Get file stats
    const stats = fs.statSync(OUTPUT_FILE);
    const fileSize = (stats.size / 1024).toFixed(2);
    
    console.log('\n✅ PDF Generation Complete!');
    console.log('================================================');
    console.log(`📄 Output: ${OUTPUT_FILE}`);
    console.log(`📊 Size: ${fileSize} KB`);
    console.log(`📏 Format: US Letter (8.5" x 11")`);
    console.log(`🎯 Optimized for: Printing & Form Completion`);
    console.log('================================================\n');
    
    return OUTPUT_FILE;
  } catch (error) {
    console.error('\n❌ Error generating PDF:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the generator
if (require.main === module) {
  generatePDF();
}

module.exports = { generatePDF };
