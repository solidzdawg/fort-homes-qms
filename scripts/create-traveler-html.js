#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');

const INPUT_FILE = path.join(__dirname, '../docs/forms-templates/FORM-QT-001-Quality-Traveler-Checklist-PRINT.md');
const OUTPUT_DIR = path.join(__dirname, '../dist/forms');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'FORM-QT-001-Quality-Traveler-Checklist.html');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read and process markdown
const input = fs.readFileSync(INPUT_FILE, 'utf8');
const { data: metadata, content: markdown } = matter(input);
const html = marked.parse(markdown);

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metadata.title || 'Quality Traveler Checklist'}</title>
  <style>
    @page {
      size: letter;
      margin: 0.5in;
    }
    
    * {
      box-sizing: border-box;
    }
    
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 10pt;
      line-height: 1.4;
      color: #000;
      max-width: 7.5in;
      margin: 0 auto;
      padding: 0.5in;
      background: white;
    }
    
    h1 {
      font-size: 20pt;
      font-weight: bold;
      text-align: center;
      margin-bottom: 10pt;
      page-break-after: avoid;
    }
    
    h2 {
      font-size: 16pt;
      font-weight: bold;
      border-bottom: 2pt solid #000;
      margin-top: 16pt;
      margin-bottom: 8pt;
      page-break-after: avoid;
    }
    
    h3 {
      font-size: 13pt;
      font-weight: bold;
      margin-top: 12pt;
      margin-bottom: 6pt;
      page-break-after: avoid;
    }
    
    h4 {
      font-size: 11pt;
      font-weight: bold;
      margin-top: 10pt;
      margin-bottom: 4pt;
      page-break-after: avoid;
    }
    
    p {
      margin-bottom: 8pt;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10pt 0;
      page-break-inside: avoid;
      font-size: 9pt;
    }
    
    th {
      background-color: #333 !important;
      color: white !important;
      padding: 6pt;
      border: 1pt solid #000;
      font-weight: bold;
      text-align: left;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    td {
      padding: 4pt 6pt;
      border: 1pt solid #333;
      vertical-align: top;
    }
    
    tr:nth-child(even) {
      background-color: #f5f5f5 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    ul {
      list-style-type: none;
      margin: 6pt 0;
      padding-left: 0;
    }
    
    li {
      margin: 3pt 0;
      padding-left: 18pt;
      font-size: 9pt;
      line-height: 1.5;
    }
    
    li:before {
      content: '☐ ';
      position: absolute;
      margin-left: -18pt;
      font-size: 11pt;
    }
    
    strong {
      font-weight: 600;
      color: #000;
    }
    
    hr {
      border: none;
      border-top: 1pt solid #666;
      margin: 12pt 0;
    }
    
    div[align="center"] {
      text-align: center;
      margin: 12pt 0;
    }
    
    div[style] {
      page-break-inside: avoid;
      margin: 10pt 0;
      padding: 10pt;
      border: 1pt solid #ccc;
      background: #f9f9f9 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .page-break {
      page-break-before: always;
    }
    
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        margin: 0;
        padding: 0;
      }
      
      @page {
        margin: 0.5in;
      }
    }
    
    @media screen {
      body {
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        margin: 20px auto;
      }
    }
  </style>
</head>
<body>
${html}

<div style="margin-top: 30pt; padding-top: 20pt; border-top: 2pt solid #000; text-align: center; font-size: 9pt;">
  <p><strong>Fort Homes LLC Quality Management System</strong></p>
  <p>FORM-QT-001 Rev. 1.0 | January 2026</p>
  <p><em>This document must be retained with module records for 7 years per HUD Code requirements.</em></p>
</div>

</body>
</html>`;

fs.writeFileSync(OUTPUT_FILE, fullHtml);

const stats = fs.statSync(OUTPUT_FILE);
const fileSize = (stats.size / 1024).toFixed(2);

console.log('\n✅ HTML FILE CREATED SUCCESSFULLY!');
console.log('================================================');
console.log(`📄 Output: ${OUTPUT_FILE}`);
console.log(`📊 Size: ${fileSize} KB`);
console.log(`🖨️  Ready to print as PDF`);
console.log('================================================');
console.log('\n📖 Instructions:');
console.log('1. Open the HTML file in Chrome/Edge');
console.log('2. Press Ctrl+P (Cmd+P on Mac)');
console.log('3. Select "Save as PDF"');
console.log('4. Set margins to 0.5in');
console.log('5. Enable "Background graphics"');
console.log('6. Save as FORM-QT-001-Quality-Traveler-Checklist.pdf\n');
