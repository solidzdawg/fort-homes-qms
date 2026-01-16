#!/usr/bin/env node
/**
 * Fort Homes LLC - Professional PDF Generator
 * 
 * Generates professional, print-ready PDFs from SOP markdown files using:
 * - Puppeteer for HTML-to-PDF conversion with full CSS support
 * - Marked for markdown parsing
 * - Gray-matter for frontmatter extraction
 * 
 * Features:
 * - Proper table pagination with header repetition
 * - Professional typography and spacing
 * - Intelligent page break handling
 * - No ASCII art - clean, modern styling
 */

const puppeteer = require('puppeteer');
const { marked } = require('marked');
const matter = require('gray-matter');
const fs = require('fs');
const path = require('path');

// Paths
const DOCS_DIR = path.join(__dirname, '../docs/sops');
const DIST_DIR = path.join(__dirname, '../dist/sops');
const TEMPLATE_PATH = path.join(__dirname, '../templates/sop-template.html');
const CSS_PATH = path.join(__dirname, '../assets/styles/qms-pdf.css');

/**
 * Configure marked options for better HTML output
 */
marked.setOptions({
  gfm: true,
  breaks: false,
  headerIds: true,
  mangle: false,
});

/**
 * Custom renderer to add classes to elements for better styling
 */
const renderer = new marked.Renderer();

// Add classes to tables for styling
const originalTable = renderer.table;
renderer.table = function(header, body) {
  return '<table class="sop-table">\n' +
    '<thead>\n' + header + '</thead>\n' +
    '<tbody>\n' + body + '</tbody>\n' +
    '</table>\n';
};

marked.use({ renderer });

/**
 * Process markdown content to remove ASCII art and clean up formatting
 */
function cleanMarkdown(content) {
  // Remove ASCII box drawing characters
  content = content.replace(/```[\s\S]*?╔.*?╝[\s\S]*?```/g, '');
  content = content.replace(/```[\s\S]*?┌.*?┘[\s\S]*?```/g, '');
  
  // Remove centered div wrappers that contain ASCII art
  content = content.replace(/<div align="center">[\s\S]*?<\/div>/g, (match) => {
    if (match.includes('╔') || match.includes('┌')) {
      return '';
    }
    return match;
  });
  
  // Remove Unicode box drawing lines
  content = content.replace(/[━─│║═╔╗╚╝╠╣╦╩╬┌┐└┘├┤┬┴┼]/g, '');
  
  return content;
}

/**
 * Extract metadata from markdown file
 */
function extractMetadata(content) {
  const parsed = matter(content);
  
  // Try to extract metadata from content if not in frontmatter
  const metadata = {
    title: '',
    docId: '',
    revision: '1.0',
    effectiveDate: '',
    processOwner: '',
    nextReview: '',
  };
  
  // Extract from table if present
  const tableMatch = content.match(/\|\s*\*\*Document ID\*\*\s*\|\s*([^|]+)\|/i);
  if (tableMatch) {
    metadata.docId = tableMatch[1].trim();
  }
  
  const revMatch = content.match(/\|\s*\*\*Revision\*\*\s*\|\s*([^|]+)\|/i);
  if (revMatch) {
    metadata.revision = revMatch[1].trim();
  }
  
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    metadata.title = titleMatch[1].trim();
  }
  
  // Also check for SOP-XXX pattern in title
  if (!metadata.docId) {
    const sopMatch = content.match(/SOP[-\s]?(\d+)/i);
    if (sopMatch) {
      metadata.docId = `SOP-${sopMatch[1]}`;
    }
  }
  
  return { ...metadata, ...parsed.data };
}

/**
 * Convert markdown to HTML with professional styling
 */
function markdownToHtml(markdownContent, metadata) {
  // Clean the markdown
  const cleaned = cleanMarkdown(markdownContent);
  
  // Convert to HTML
  let html = marked.parse(cleaned);
  
  // Wrap tables in a container for better control
  html = html.replace(/<table>/g, '<div class="table-container"><table>');
  html = html.replace(/<\/table>/g, '</table></div>');
  
  // Add document control header if metadata exists
  if (metadata.docId) {
    const docControlHtml = `
      <div class="document-control">
        <h1>${metadata.title || metadata.docId}</h1>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>Document ID</strong></td><td>${metadata.docId}</td></tr>
            <tr><td><strong>Revision</strong></td><td>${metadata.revision}</td></tr>
            ${metadata.effectiveDate ? `<tr><td><strong>Effective Date</strong></td><td>${metadata.effectiveDate}</td></tr>` : ''}
            ${metadata.processOwner ? `<tr><td><strong>Process Owner</strong></td><td>${metadata.processOwner}</td></tr>` : ''}
            ${metadata.nextReview ? `<tr><td><strong>Next Review</strong></td><td>${metadata.nextReview}</td></tr>` : ''}
          </tbody>
        </table>
      </div>
    `;
    html = docControlHtml + html;
  }
  
  return html;
}

/**
 * Generate PDF from HTML content
 */
async function generatePDF(htmlContent, outputPath, metadata) {
  let browser;
  try {
    // Launch browser
    browser = await puppeteer.launch({
      headless: 'new',
      executablePath: '/usr/bin/chromium',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
    
    const page = await browser.newPage();
    
    // Read CSS
    const css = fs.readFileSync(CSS_PATH, 'utf8');
    
    // Create full HTML document
    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metadata.title || metadata.docId}</title>
  <style>${css}</style>
</head>
<body>
  ${htmlContent}
</body>
</html>
    `;
    
    // Set content
    await page.setContent(fullHtml, {
      waitUntil: 'networkidle0',
    });
    
    // Generate PDF
    await page.pdf({
      path: outputPath,
      format: 'Letter',
      margin: {
        top: '0.75in',
        right: '0.75in',
        bottom: '1in',
        left: '0.75in',
      },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 9px; color: #3498db; text-align: center; width: 100%; margin: 0 0.75in; border-bottom: 2px solid #3498db; padding-bottom: 5px;">
          Fort Homes LLC | Quality Management System
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 8px; color: #7f8c8d; text-align: center; width: 100%; margin: 0 0.75in;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span> | ${metadata.docId} Rev ${metadata.revision} | Uncontrolled When Printed
        </div>
      `,
    });
    
    console.log(`✅ Generated: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error generating PDF for ${metadata.docId}:`, error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Process a single SOP file
 */
async function processSOP(sopFile) {
  const inputPath = path.join(DOCS_DIR, sopFile);
  const outputFileName = sopFile.replace('.md', '.pdf');
  const outputPath = path.join(DIST_DIR, outputFileName);
  
  console.log(`\n📄 Processing: ${sopFile}`);
  
  // Read markdown file
  const markdownContent = fs.readFileSync(inputPath, 'utf8');
  
  // Extract metadata
  const metadata = extractMetadata(markdownContent);
  console.log(`   Document ID: ${metadata.docId}`);
  console.log(`   Revision: ${metadata.revision}`);
  
  // Convert to HTML
  const htmlContent = markdownToHtml(markdownContent, metadata);
  
  // Generate PDF
  await generatePDF(htmlContent, outputPath, metadata);
}

/**
 * Main function
 */
async function main() {
  console.log('🏗️  Fort Homes LLC - Professional PDF Generator\n');
  console.log('================================================\n');
  
  // Ensure output directory exists
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
    console.log(`✅ Created output directory: ${DIST_DIR}\n`);
  }
  
  // Get command line arguments
  const args = process.argv.slice(2);
  const sopsOnly = args.includes('--sops');
  
  // Get all SOP files
  const sopFiles = fs.readdirSync(DOCS_DIR)
    .filter(file => file.endsWith('.md'))
    .filter(file => file.startsWith('SOP-'))
    .sort();
  
  console.log(`Found ${sopFiles.length} SOP files\n`);
  
  // Process each SOP file
  let successCount = 0;
  let errorCount = 0;
  
  for (const sopFile of sopFiles) {
    try {
      await processSOP(sopFile);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to process ${sopFile}:`, error.message);
      errorCount++;
    }
  }
  
  // Summary
  console.log('\n================================================');
  console.log('📊 Generation Summary\n');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📁 Output directory: ${DIST_DIR}`);
  console.log('\n✨ Done!\n');
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { processSOP, markdownToHtml, extractMetadata };
