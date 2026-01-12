#!/usr/bin/env node
/**
 * Fort Homes QMS PDF Generator
 * Generates PDF version of the QMS document
 */
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Load data files
const phases = require('../data/phases.json');
const companyInfo = require('../data/company-info.json');
const holdPoints = require('../data/hold-points.json');

// Colors
const COLORS = {
  primary: '#2C3E50',
  secondary: '#34495E',
  accent: '#3498DB',
  warning: '#E74C3C',
  light: '#F8F9FA',
  holdPoint: '#FFEBEE',
  highlight: '#E8F4FD'
};

const outputDir = process.argv[2] || './output';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, `FHDEV-QMS-BIP-001_v${companyInfo.qms.currentRevision}.pdf`);

// Create PDF document
const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 72, bottom: 72, left: 72, right: 72 },
  info: {
    Title: 'Fort Homes QMS - Quality Management System',
    Author: 'Fort Homes Development LLC',
    Subject: 'Build-in-Place Manufacturing QMS',
    Keywords: 'QMS, Quality, Manufacturing, Modular Homes'
  }
});

// Pipe to file
doc.pipe(fs.createWriteStream(outputPath));

// Helper functions
function addHeader() {
  const y = doc.page.margins.top - 50;
  doc.fontSize(8)
     .fillColor('#666666')
     .text(`${companyInfo.company.legalName} | Quality Management System`,
           doc.page.margins.left, y,
           { width: doc.page.width - doc.page.margins.left - doc.page.margins.right });
}

function addFooter() {
  const pageNumber = doc.bufferedPageRange().count;
  const y = doc.page.height - doc.page.margins.bottom + 20;
  doc.fontSize(8)
     .fillColor('#666666')
     .text(
       `Page ${pageNumber} | FHDEV-QMS-BIP-001 Rev 3.0 | Uncontrolled When Printed`,
       doc.page.margins.left,
       y,
       { width: doc.page.width - doc.page.margins.left - doc.page.margins.right, align: 'center' }
     );
}

// Title Page
doc.fontSize(24)
   .fillColor(COLORS.primary)
   .text(companyInfo.company.legalName.toUpperCase(), { align: 'center' })
   .moveDown(0.5);

doc.fontSize(18)
   .fillColor('#000000')
   .text('Quality Management System', { align: 'center' })
   .moveDown(0.5);

doc.fontSize(14)
   .fillColor(COLORS.warning)
   .text('Build-in-Place (Static Bay) Manufacturing', { align: 'center' })
   .moveDown(2);

// Document info table
const tableStartY = doc.y;
const tableData = [
  ['Document Number:', 'FHDEV-QMS-BIP-001'],
  ['Revision:', companyInfo.qms.currentRevision],
  ['Effective Date:', new Date().toLocaleDateString()],
  ['Prepared By:', `${companyInfo.leadership[2].name}, ${companyInfo.leadership[2].title}`],
  ['Approved By:', `${companyInfo.leadership[0].name}, ${companyInfo.leadership[0].title}`]
];

let currentY = tableStartY;
tableData.forEach(([label, value]) => {
  doc.rect(72, currentY, 234, 25).fillAndStroke(COLORS.light, '#999999');
  doc.rect(306, currentY, 234, 25).stroke('#999999');

  doc.fillColor('#000000')
     .fontSize(10)
     .font('Helvetica-Bold')
     .text(label, 80, currentY + 8, { width: 220 });

  doc.font('Helvetica')
     .text(value, 314, currentY + 8, { width: 220 });

  currentY += 25;
});

// New page for Table of Contents
doc.addPage();
addHeader();

doc.fontSize(16)
   .fillColor(COLORS.primary)
   .font('Helvetica-Bold')
   .text('TABLE OF CONTENTS', { align: 'left' })
   .moveDown();

doc.fontSize(10)
   .fillColor('#000000')
   .font('Helvetica')
   .text('SECTION 1: PRODUCTION PHASES')
   .text('SECTION 2: INSPECTION HOLD POINTS')
   .text('SECTION 3: COMPANY INFORMATION')
   .moveDown();

addFooter();

// SECTION 1: Production Phases
doc.addPage();
addHeader();

doc.fontSize(16)
   .fillColor(COLORS.primary)
   .font('Helvetica-Bold')
   .text('SECTION 1: PRODUCTION PHASES')
   .moveDown();

doc.fontSize(10)
   .fillColor('#000000')
   .font('Helvetica')
   .text(`Fort Homes employs a ${phases.methodology} manufacturing process with ${phases.phases.length} sequential phases.`)
   .moveDown();

// Phase Summary Table Header
const colWidths = [40, 180, 60, 60, 60, 100];
const tableX = 72;
let tableY = doc.y;

// Header row
doc.rect(tableX, tableY, 500, 25).fillAndStroke(COLORS.primary, '#999999');
doc.fillColor('#FFFFFF')
   .fontSize(8)
   .font('Helvetica-Bold');

let xPos = tableX + 5;
['Phase', 'Description', 'Duration', 'Hold Point', 'TPIA', 'Reference ITP'].forEach((header, i) => {
  doc.text(header, xPos, tableY + 8, { width: colWidths[i] - 10 });
  xPos += colWidths[i];
});

tableY += 25;

// Phase rows
phases.phases.forEach(phase => {
  if (tableY > 700) {
    addFooter();
    doc.addPage();
    addHeader();
    tableY = 100;
  }

  const rowHeight = 35;

  // Background color for hold points
  if (phase.isHoldPoint) {
    doc.rect(tableX, tableY, 500, rowHeight).fillAndStroke(COLORS.holdPoint, '#999999');
  } else {
    doc.rect(tableX, tableY, 500, rowHeight).stroke('#999999');
  }

  doc.fillColor('#000000')
     .fontSize(8)
     .font('Helvetica');

  xPos = tableX + 5;

  // Phase ID
  doc.font('Helvetica-Bold')
     .text(phase.id.toString(), xPos, tableY + 8, { width: colWidths[0] - 10 });
  xPos += colWidths[0];

  // Description
  doc.font('Helvetica')
     .text(phase.name, xPos, tableY + 8, { width: colWidths[1] - 10 });
  xPos += colWidths[1];

  // Duration
  doc.text(phase.durationDays, xPos, tableY + 8, { width: colWidths[2] - 10, align: 'center' });
  xPos += colWidths[2];

  // Hold Point
  doc.font('Helvetica-Bold')
     .text(phase.holdPoint, xPos, tableY + 8, { width: colWidths[3] - 10, align: 'center' });
  xPos += colWidths[3];

  // TPIA
  doc.font('Helvetica')
     .text(phase.tpiaRequired ? 'REQUIRED' : 'Optional', xPos, tableY + 8, { width: colWidths[4] - 10, align: 'center' });
  xPos += colWidths[4];

  // Reference ITP
  doc.fontSize(7)
     .text(phase.referenceITP, xPos, tableY + 8, { width: colWidths[5] - 10 });

  tableY += rowHeight;
});

addFooter();

// SECTION 2: Hold Points
doc.addPage();
addHeader();

doc.fontSize(16)
   .fillColor(COLORS.primary)
   .font('Helvetica-Bold')
   .text('SECTION 2: INSPECTION HOLD POINTS')
   .moveDown();

doc.fontSize(10)
   .fillColor('#000000')
   .font('Helvetica')
   .text('The following hold points require QA Manager approval before work may proceed to the next phase.')
   .moveDown();

// Generate each hold point
holdPoints.holdPoints.forEach((hp, index) => {
  if (doc.y > 650) {
    addFooter();
    doc.addPage();
    addHeader();
  }

  doc.fontSize(12)
     .fillColor(COLORS.secondary)
     .font('Helvetica-Bold')
     .text(`${hp.id}: ${hp.name}`)
     .moveDown(0.3);

  doc.fontSize(9)
     .fillColor('#000000')
     .font('Helvetica-Bold')
     .text('Trigger: ', { continued: true })
     .font('Helvetica')
     .text(hp.trigger)
     .moveDown(0.3);

  doc.font('Helvetica-Bold')
     .text('Blocks: ', { continued: true })
     .font('Helvetica')
     .text(hp.blocksPhase ? `Phase ${hp.blocksPhase}` : (hp.blocksAction || 'N/A'))
     .moveDown(0.3);

  doc.font('Helvetica-Bold')
     .text('TPIA Witness: ', { continued: true })
     .font('Helvetica')
     .text(String(hp.tpiaWitness || 'optional').toUpperCase())
     .moveDown(0.3);

  doc.font('Helvetica-Bold')
     .text('Reference ITP: ', { continued: true })
     .font('Helvetica')
     .text(hp.referenceITP)
     .moveDown(0.5);

  // Inspection criteria
  if (hp.inspectionCriteria && hp.inspectionCriteria.length > 0) {
    doc.fontSize(9)
       .font('Helvetica-Bold')
       .text('Inspection Criteria:')
       .moveDown(0.2);

    hp.inspectionCriteria.forEach(criteria => {
      doc.fontSize(8)
         .font('Helvetica')
         .text(`• ${criteria.item}: ${criteria.tolerance} (${criteria.method})`, { indent: 10 });
    });

    doc.moveDown(0.5);
  }

  doc.moveDown(0.5);
});

addFooter();

// SECTION 3: Company Information
doc.addPage();
addHeader();

doc.fontSize(16)
   .fillColor(COLORS.primary)
   .font('Helvetica-Bold')
   .text('SECTION 3: COMPANY INFORMATION')
   .moveDown();

doc.fontSize(12)
   .fillColor(COLORS.secondary)
   .text('Company Details')
   .moveDown(0.5);

const companyData = [
  ['Legal Name:', companyInfo.company.legalName],
  ['DBA:', companyInfo.company.dba],
  ['Address:', `${companyInfo.company.address.street}, ${companyInfo.company.address.city}, ${companyInfo.company.address.state} ${companyInfo.company.address.zip}`],
  ['Manufacturing Methodology:', companyInfo.qms.methodology],
  ['Production Bays:', companyInfo.facility.productionBays.toString()]
];

currentY = doc.y;
companyData.forEach(([label, value]) => {
  doc.rect(72, currentY, 200, 20).fillAndStroke(COLORS.light, '#999999');
  doc.rect(272, currentY, 268, 20).stroke('#999999');

  doc.fillColor('#000000')
     .fontSize(9)
     .font('Helvetica-Bold')
     .text(label, 77, currentY + 6, { width: 190 });

  doc.font('Helvetica')
     .text(value, 277, currentY + 6, { width: 258 });

  currentY += 20;
});

doc.moveDown();

// Leadership
doc.fontSize(12)
   .fillColor(COLORS.secondary)
   .font('Helvetica-Bold')
   .text('Leadership')
   .moveDown(0.5);

const leadershipY = doc.y;
const leadershipColWidths = [150, 150, 168];

// Header
doc.rect(72, leadershipY, 468, 20).fillAndStroke(COLORS.primary, '#999999');
doc.fillColor('#FFFFFF')
   .fontSize(9)
   .font('Helvetica-Bold');

let leadXPos = 77;
['Name', 'Title', 'Email'].forEach((header, i) => {
  doc.text(header, leadXPos, leadershipY + 6, { width: leadershipColWidths[i] - 10 });
  leadXPos += leadershipColWidths[i];
});

currentY = leadershipY + 20;

// Leadership rows
companyInfo.leadership.forEach(person => {
  doc.rect(72, currentY, 468, 20).stroke('#999999');

  doc.fillColor('#000000')
     .fontSize(9)
     .font('Helvetica-Bold');

  leadXPos = 77;
  doc.text(person.name, leadXPos, currentY + 6, { width: leadershipColWidths[0] - 10 });
  leadXPos += leadershipColWidths[0];

  doc.font('Helvetica')
     .text(person.title, leadXPos, currentY + 6, { width: leadershipColWidths[1] - 10 });
  leadXPos += leadershipColWidths[1];

  doc.text(person.email, leadXPos, currentY + 6, { width: leadershipColWidths[2] - 10 });

  currentY += 20;
});

addFooter();

// Finalize PDF
doc.end();

console.log(`PDF generated: ${outputPath}`);
