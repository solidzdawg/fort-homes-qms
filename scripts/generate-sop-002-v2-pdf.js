#!/usr/bin/env node
/**
 * Fort Homes LLC - SOP-002 V2 PDF Generator
 * Generates professional, print-ready PDF from markdown following brand specifications
 */

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Brand Colors (from 01-BRAND-SYSTEM.md)
const COLORS = {
  charcoalOlive: '#101810',    // Primary text
  secondaryDark: '#181810',    // Headers/footers
  offWhite: '#F8F8F8',         // Backgrounds, table headers
  neutralGray: '#B8B8B8',      // Borders
  infoBlue: '#145B8B',         // Callout boxes
  white: '#FFFFFF'
};

// Page dimensions (US Letter)
const PAGE = {
  width: 612,        // 8.5" × 72
  height: 792,       // 11" × 72
  marginTop: 72,     // 1.0"
  marginBottom: 72,  // 1.0"
  marginLeft: 54,    // 0.75"
  marginRight: 54,   // 0.75"
  headerHeight: 36,  // 0.5"
  footerHeight: 29   // 0.4"
};

// Read markdown file
const markdownPath = path.join(__dirname, '../docs/sops/SOP-002-Training-Competency-Management-V2.md');
const markdownContent = fs.readFileSync(markdownPath, 'utf8');

// Create output directory
const outputDir = path.join(__dirname, '../output/pdf');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'SOP-002-Training-Competency-Management-V2.pdf');

// Create PDF document
const doc = new PDFDocument({
  size: 'LETTER',
  margins: {
    top: PAGE.marginTop + PAGE.headerHeight + 10,
    bottom: PAGE.marginBottom + PAGE.footerHeight,
    left: PAGE.marginLeft,
    right: PAGE.marginRight
  },
  info: {
    Title: 'SOP-002 Training & Competency Management V2',
    Author: 'Fort Homes LLC',
    Subject: 'Standard Operating Procedure',
    Keywords: 'QMS, Training, Competency, SOP'
  }
});

// Pipe to file
const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Track page count
let pageCount = 0;

// Helper: Add header bar on every page
function addHeader() {
  const y = PAGE.marginTop - 10;
  
  // Background bar
  doc.save();
  doc.rect(0, y, PAGE.width, PAGE.headerHeight)
     .fill(COLORS.secondaryDark);
  doc.restore();
  
  // Left: Logo text
  doc.save();
  doc.fontSize(11)
     .fillColor(COLORS.white)
     .font('Helvetica-Bold')
     .text('🏗️ FORT HOMES', PAGE.marginLeft, y + 12, { width: 150 });
  doc.restore();
  
  // Center: Title
  doc.save();
  const centerX = PAGE.width / 2;
  doc.fontSize(11)
     .fillColor(COLORS.white)
     .font('Helvetica-Bold')
     .text('QUALITY MANAGEMENT SYSTEM', centerX - 150, y + 12, {
       width: 300,
       align: 'center'
     });
  doc.restore();
  
  // Right: Doc ID
  doc.save();
  doc.fontSize(9)
     .fillColor(COLORS.white)
     .font('Helvetica')
     .text('SOP-002', PAGE.width - PAGE.marginRight - 80, y + 13, {
       width: 80,
       align: 'right'
     });
  doc.restore();
}

// Helper: Add footer bar on every page
function addFooter(currentPage, totalPages) {
  const y = PAGE.height - PAGE.marginBottom + 10;
  
  // Background bar
  doc.save();
  doc.rect(0, y, PAGE.width, PAGE.footerHeight)
     .fill(COLORS.secondaryDark);
  doc.restore();
  
  // Line 1: Document info
  doc.save();
  doc.fontSize(8)
     .fillColor(COLORS.white)
     .font('Helvetica')
     .text(
       `SOP-002 | Rev 2.0 | Page ${currentPage} of ${totalPages} | Eff: January 2026`,
       PAGE.marginLeft,
       y + 5,
       { width: PAGE.width - PAGE.marginLeft - PAGE.marginRight, align: 'center' }
     );
  doc.restore();
  
  // Line 2: Warning
  doc.save();
  doc.fontSize(7)
     .fillColor(COLORS.white)
     .font('Helvetica-Oblique')
     .text(
       '⚠ UNCONTROLLED WHEN PRINTED - Verify current revision',
       PAGE.marginLeft,
       y + 17,
       { width: PAGE.width - PAGE.marginLeft - PAGE.marginRight, align: 'center' }
     );
  doc.restore();
}

// Helper: Start new page with header
function startNewPage() {
  doc.addPage();
  pageCount++;
  addHeader();
}

// Helper: Check if we need a new page
function checkPageBreak(spaceNeeded = 100) {
  const remainingSpace = PAGE.height - PAGE.marginBottom - PAGE.footerHeight - doc.y;
  if (remainingSpace < spaceNeeded) {
    startNewPage();
    return true;
  }
  return false;
}

// Helper: Parse markdown into sections
function parseMarkdown(content) {
  const sections = [];
  const lines = content.split('\n');
  let currentSection = { type: 'text', content: [] };
  let inCodeBlock = false;
  let inTable = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Code block detection
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        sections.push({ type: 'code', content: currentSection.content });
        currentSection = { type: 'text', content: [] };
        inCodeBlock = false;
      } else {
        // Start code block
        if (currentSection.content.length > 0) {
          sections.push(currentSection);
        }
        currentSection = { type: 'code', content: [] };
        inCodeBlock = true;
      }
      continue;
    }
    
    if (inCodeBlock) {
      currentSection.content.push(line);
      continue;
    }
    
    // Table detection
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (!inTable) {
        if (currentSection.content.length > 0) {
          sections.push(currentSection);
        }
        currentSection = { type: 'table', content: [] };
        inTable = true;
      }
      currentSection.content.push(line);
      continue;
    } else if (inTable && line.trim() === '') {
      sections.push(currentSection);
      currentSection = { type: 'text', content: [] };
      inTable = false;
      continue;
    }
    
    // Headers
    if (line.startsWith('## ')) {
      if (currentSection.content.length > 0) {
        sections.push(currentSection);
      }
      sections.push({ type: 'h2', content: line.substring(3).trim() });
      currentSection = { type: 'text', content: [] };
      continue;
    }
    
    if (line.startsWith('# ')) {
      if (currentSection.content.length > 0) {
        sections.push(currentSection);
      }
      sections.push({ type: 'h1', content: line.substring(2).trim() });
      currentSection = { type: 'text', content: [] };
      continue;
    }
    
    // Dividers
    if (line.trim().match(/^[-─═━]{3,}$/)) {
      if (currentSection.content.length > 0) {
        sections.push(currentSection);
        currentSection = { type: 'text', content: [] };
      }
      sections.push({ type: 'divider', content: '' });
      continue;
    }
    
    // Empty lines
    if (line.trim() === '') {
      if (currentSection.content.length > 0) {
        sections.push(currentSection);
        currentSection = { type: 'text', content: [] };
      }
      continue;
    }
    
    // Regular text
    currentSection.content.push(line);
  }
  
  if (currentSection.content.length > 0) {
    sections.push(currentSection);
  }
  
  return sections;
}

// Helper: Render text with basic markdown formatting
function renderText(text, fontSize = 10, fontName = 'Helvetica') {
  // Remove markdown artifacts
  text = text.replace(/<div[^>]*>/gi, '').replace(/<\/div>/gi, '');
  text = text.replace(/\*\*([^\*]+)\*\*/g, '$1'); // Remove bold markers for now
  
  doc.fontSize(fontSize)
     .fillColor(COLORS.charcoalOlive)
     .font(fontName)
     .text(text, { align: 'left', lineGap: 2 });
}

// Helper: Render code block (ASCII art)
function renderCodeBlock(lines) {
  checkPageBreak(lines.length * 10 + 40);
  
  // Light gray background
  const startY = doc.y;
  const blockHeight = lines.length * 10 + 20;
  
  doc.save();
  doc.rect(PAGE.marginLeft - 5, startY - 5, PAGE.width - PAGE.marginLeft - PAGE.marginRight + 10, blockHeight)
     .fill(COLORS.offWhite);
  doc.restore();
  
  // Render text in monospace
  doc.fontSize(8)
     .fillColor(COLORS.charcoalOlive)
     .font('Courier');
  
  lines.forEach(line => {
    doc.text(line);
  });
  
  doc.moveDown(0.5);
}

// Helper: Render table
function renderTable(lines) {
  // Parse table
  const rows = lines.filter(l => !l.includes(':---') && !l.includes(':--:'));
  if (rows.length === 0) return;
  
  const parsedRows = rows.map(row => {
    return row.split('|')
      .filter(cell => cell.trim() !== '')
      .map(cell => cell.trim());
  });
  
  if (parsedRows.length < 2) return;
  
  const headers = parsedRows[0];
  const dataRows = parsedRows.slice(1);
  const colCount = headers.length;
  const tableWidth = PAGE.width - PAGE.marginLeft - PAGE.marginRight;
  const colWidth = tableWidth / colCount;
  const rowHeight = 25;
  
  checkPageBreak(rowHeight * (dataRows.length + 1) + 20);
  
  let tableY = doc.y;
  
  // Header row
  doc.save();
  doc.rect(PAGE.marginLeft, tableY, tableWidth, rowHeight)
     .fillAndStroke(COLORS.offWhite, COLORS.neutralGray);
  doc.restore();
  
  doc.fontSize(9)
     .fillColor(COLORS.charcoalOlive)
     .font('Helvetica-Bold');
  
  headers.forEach((header, i) => {
    const x = PAGE.marginLeft + (i * colWidth) + 5;
    doc.text(header, x, tableY + 8, { width: colWidth - 10, lineBreak: false });
  });
  
  tableY += rowHeight;
  
  // Data rows
  doc.font('Helvetica').fontSize(9);
  
  dataRows.forEach((row, rowIndex) => {
    if (tableY > PAGE.height - PAGE.marginBottom - PAGE.footerHeight - 50) {
      startNewPage();
      tableY = doc.y;
    }
    
    const bgColor = rowIndex % 2 === 0 ? COLORS.white : '#FAFAFA';
    doc.save();
    doc.rect(PAGE.marginLeft, tableY, tableWidth, rowHeight)
       .fillAndStroke(bgColor, COLORS.neutralGray);
    doc.restore();
    
    row.forEach((cell, i) => {
      const x = PAGE.marginLeft + (i * colWidth) + 5;
      // Remove markdown formatting from cells
      const cleanCell = cell.replace(/\*\*([^\*]+)\*\*/g, '$1')
                            .replace(/`([^`]+)`/g, '$1')
                            .replace(/^[•■▶✅🔴⚠️📋👤📊🎯🏗️🛑🔍📄📅📈📚🛠️💻🎓]+\s*/, '');
      doc.fillColor(COLORS.charcoalOlive);
      doc.text(cleanCell, x, tableY + 8, { width: colWidth - 10, lineBreak: false });
    });
    
    tableY += rowHeight;
  });
  
  doc.y = tableY + 10;
  doc.moveDown(0.5);
}

// Main rendering function
function renderDocument() {
  console.log('📄 Parsing markdown...');
  const sections = parseMarkdown(markdownContent);
  
  console.log(`📊 Found ${sections.length} sections to render`);
  
  // First page with header
  pageCount = 1;
  addHeader();
  
  // Process each section
  sections.forEach((section, index) => {
    try {
      switch (section.type) {
        case 'h1':
          checkPageBreak(50);
          doc.fontSize(16)
             .fillColor(COLORS.charcoalOlive)
             .font('Helvetica-Bold')
             .text(section.content, { align: 'left' })
             .moveDown(1);
          break;
          
        case 'h2':
          checkPageBreak(50);
          doc.fontSize(14)
             .fillColor(COLORS.charcoalOlive)
             .font('Helvetica-Bold')
             .text(section.content, { align: 'left' })
             .moveDown(0.8);
          break;
          
        case 'code':
          renderCodeBlock(section.content);
          break;
          
        case 'table':
          renderTable(section.content);
          break;
          
        case 'divider':
          checkPageBreak(20);
          doc.moveDown(0.3);
          doc.save();
          doc.moveTo(PAGE.marginLeft, doc.y)
             .lineTo(PAGE.width - PAGE.marginRight, doc.y)
             .lineWidth(1)
             .strokeColor(COLORS.neutralGray)
             .stroke();
          doc.restore();
          doc.moveDown(0.3);
          break;
          
        case 'text':
          if (section.content.length > 0) {
            const text = section.content.join('\n');
            // Skip empty or HTML-only lines
            if (text.trim() && !text.trim().match(/^<[^>]+>$/)) {
              checkPageBreak(30);
              renderText(text, 10, 'Helvetica');
              doc.moveDown(0.3);
            }
          }
          break;
      }
    } catch (err) {
      console.error(`Error rendering section ${index}:`, err);
    }
  });
  
  // Store total pages for footer generation
  const totalPages = pageCount;
  
  console.log('📝 Adding footers...');
  
  // Now go back and add footers to all pages
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    addFooter(i + 1, totalPages);
  }
  
  console.log(`✅ PDF generation complete!`);
  console.log(`📄 Total pages: ${totalPages}`);
}

// Generate the document
try {
  renderDocument();
  
  // Finalize PDF
  doc.end();
  
  writeStream.on('finish', () => {
    const stats = fs.statSync(outputPath);
    console.log(`✅ PDF generated successfully: ${outputPath}`);
    console.log(`📄 Total pages: ${pageCount}`);
    console.log(`📊 File size: ${stats.size} bytes (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    
    if (stats.size > 5 * 1024 * 1024) {
      console.warn('⚠️  Warning: File size exceeds 5MB target for printing');
    }
  });
  
  writeStream.on('error', (err) => {
    console.error('❌ Error writing PDF:', err);
    process.exit(1);
  });
  
} catch (err) {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
}
