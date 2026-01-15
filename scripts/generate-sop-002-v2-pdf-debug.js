#!/usr/bin/env node
/**
 * Fort Homes QMS - SOP-002 V2 PDF Generator
 * Generates professional PDF for Training & Competency Management V2
 */

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// File paths
const SOURCE_FILE = path.join(__dirname, '../docs/sops/SOP-002-Training-Competency-Management-V2.md');
const OUTPUT_DIR = path.join(__dirname, '../output/pdf');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'SOP-002-Training-Competency-Management-V2.pdf');

// Brand Colors from 01-BRAND-SYSTEM.md
const COLORS = {
  charcoalOlive: '#101810',    // Primary text
  secondaryDark: '#181810',    // Header/footer background
  offWhite: '#F8F8F8',         // Table headers, boxes
  neutralGray: '#B8B8B8',      // Borders
  infoBlue: '#145B8B',         // Quality checkpoints
  white: '#FFFFFF'
};

// Page dimensions (US Letter)
const PAGE_WIDTH = 612;  // 8.5" * 72
const PAGE_HEIGHT = 792; // 11" * 72
const MARGIN_TOP = 72;    // 1.0"
const MARGIN_BOTTOM = 72; // 1.0"
const MARGIN_LEFT = 54;   // 0.75"
const MARGIN_RIGHT = 54;  // 0.75"
const HEADER_HEIGHT = 36; // 0.5"
const FOOTER_HEIGHT = 29; // 0.4"

// Content area
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
const CONTENT_START_Y = MARGIN_TOP + HEADER_HEIGHT + 10;
const CONTENT_END_Y = PAGE_HEIGHT - MARGIN_BOTTOM - FOOTER_HEIGHT - 10;

/**
 * Check if source file exists
 */
function checkSourceFile() {
  if (!fs.existsSync(SOURCE_FILE)) {
    console.error(`❌ Error: Source file not found: ${SOURCE_FILE}`);
    process.exit(1);
  }
}

/**
 * Create output directory if it doesn't exist
 */
function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

/**
 * Read and parse markdown content
 */
function readMarkdownContent() {
  return fs.readFileSync(SOURCE_FILE, 'utf8');
}

/**
 * Add header to page
 */
function addHeader(doc) {
  const headerY = MARGIN_TOP - 10;
  
  // Header background
  doc.save();
  doc.rect(0, headerY, PAGE_WIDTH, HEADER_HEIGHT)
     .fill(COLORS.secondaryDark);
  doc.restore();
  
  // Header text
  doc.save();
  doc.fillColor(COLORS.white);
  
  // Left: Logo/Company name
  doc.fontSize(10)
     .font('Helvetica-Bold')
     .text('🏗️ FORT HOMES', MARGIN_LEFT, headerY + 10, {
       width: 150,
       align: 'left'
     });
  
  // Center: QMS title
  doc.fontSize(11)
     .font('Helvetica-Bold')
     .text('QUALITY MANAGEMENT SYSTEM', MARGIN_LEFT, headerY + 10, {
       width: CONTENT_WIDTH,
       align: 'center'
     });
  
  // Right: Document ID
  doc.fontSize(9)
     .font('Helvetica')
     .text('SOP-002', PAGE_WIDTH - MARGIN_RIGHT - 80, headerY + 11, {
       width: 80,
       align: 'right'
     });
  
  doc.restore();
}

/**
 * Add footer to page with page numbers
 */
function addFooter(doc, pageNum, totalPages) {
  const footerY = PAGE_HEIGHT - MARGIN_BOTTOM + 10;
  
  // Footer background
  doc.save();
  doc.rect(0, footerY, PAGE_WIDTH, FOOTER_HEIGHT)
     .fill(COLORS.secondaryDark);
  doc.restore();
  
  // Footer text
  doc.save();
  doc.fillColor(COLORS.white);
  
  // Line 1: Document info
  doc.fontSize(8)
     .font('Helvetica')
     .text(
       `SOP-002 | Rev 2.0 | Page ${pageNum} of ${totalPages} | Eff: January 2026`,
       MARGIN_LEFT,
       footerY + 5,
       { width: CONTENT_WIDTH, align: 'center' }
     );
  
  // Line 2: Uncontrolled warning
  doc.fontSize(7)
     .font('Helvetica-Oblique')
     .text(
       '⚠ UNCONTROLLED WHEN PRINTED - Verify current revision',
       MARGIN_LEFT,
       footerY + 17,
       { width: CONTENT_WIDTH, align: 'center' }
     );
  
  doc.restore();
}

/**
 * Create title page (Page 1)
 */
function createTitlePage(doc, pageNum, totalPages) {
  addHeader(doc);
  addFooter(doc, pageNum, totalPages);
  
  doc.save();
  
  // Large title
  doc.fontSize(18)
     .font('Helvetica-Bold')
     .fillColor(COLORS.charcoalOlive)
     .text('TRAINING & COMPETENCY', MARGIN_LEFT, CONTENT_START_Y + 80, {
       width: CONTENT_WIDTH,
       align: 'center'
     });
  
  doc.text('MANAGEMENT', MARGIN_LEFT, doc.y, {
    width: CONTENT_WIDTH,
    align: 'center'
  });
  
  doc.moveDown(2);
  
  // Subtitle
  doc.fontSize(12)
     .font('Helvetica')
     .text('Fort and Homes LLC | Mesa County, Colorado', {
       width: CONTENT_WIDTH,
       align: 'center'
     });
  
  doc.moveDown(3);
  
  // Metadata table
  const tableY = doc.y;
  const colWidth = CONTENT_WIDTH / 5;
  
  // Table header
  doc.rect(MARGIN_LEFT, tableY, CONTENT_WIDTH, 25)
     .fillAndStroke(COLORS.offWhite, COLORS.neutralGray);
  
  doc.fillColor(COLORS.charcoalOlive)
     .fontSize(9)
     .font('Helvetica-Bold');
  
  const headers = ['Document ID', 'Revision', 'Effective', 'Process Owner', 'Next Review'];
  headers.forEach((header, i) => {
    doc.text(
      header,
      MARGIN_LEFT + (i * colWidth) + 5,
      tableY + 7,
      { width: colWidth - 10, align: 'center' }
    );
  });
  
  // Table data row
  const dataY = tableY + 25;
  doc.rect(MARGIN_LEFT, dataY, CONTENT_WIDTH, 25)
     .stroke(COLORS.neutralGray);
  
  doc.fontSize(9)
     .font('Helvetica');
  
  const data = ['SOP-002', '2.0', 'Jan 2026', 'Quality Manager', 'Jul 2026'];
  data.forEach((value, i) => {
    doc.text(
      value,
      MARGIN_LEFT + (i * colWidth) + 5,
      dataY + 7,
      { width: colWidth - 10, align: 'center' }
    );
  });
  
  doc.restore();
}

/**
 * Create executive summary page (Page 2)
 */
function createExecutiveSummary(doc) {
  doc.addPage();
  
  doc.save();
  
  // Section title
  doc.fontSize(16)
     .font('Helvetica-Bold')
     .fillColor(COLORS.charcoalOlive)
     .text('📊 EXECUTIVE SUMMARY', MARGIN_LEFT, CONTENT_START_Y, {
       width: CONTENT_WIDTH
     });
  
  doc.moveDown(2);
  
  // Performance Dashboard box
  const boxY = doc.y;
  const boxHeight = 180;
  
  doc.rect(MARGIN_LEFT, boxY, CONTENT_WIDTH, boxHeight)
     .fillAndStroke(COLORS.offWhite, COLORS.neutralGray);
  
  doc.fillColor(COLORS.charcoalOlive)
     .fontSize(12)
     .font('Helvetica-Bold')
     .text('📊 PERFORMANCE DASHBOARD', MARGIN_LEFT + 10, boxY + 15, {
       width: CONTENT_WIDTH - 20
     });
  
  doc.moveDown(1.5);
  
  // Key Metrics
  doc.fontSize(10)
     .font('Helvetica-Bold')
     .text('KEY METRICS', MARGIN_LEFT + 10, doc.y);
  
  doc.fontSize(9)
     .font('Helvetica')
     .moveDown(0.5)
     .text('📈 Training Completion Rate: 98%        🎯 Target: >95%', MARGIN_LEFT + 10, doc.y)
     .text('✅ Competency Verification: 100%        📅 Review:  Quarterly', MARGIN_LEFT + 10, doc.y + 15)
     .text('🔍 Annual Audit Schedule: Q2            📋 Records: 3 years retention', MARGIN_LEFT + 10, doc.y + 30);
  
  const metricsEndY = doc.y + 45;
  
  // Compliance Status
  doc.fontSize(10)
     .font('Helvetica-Bold')
     .text('COMPLIANCE STATUS', MARGIN_LEFT + 10, metricsEndY);
  
  doc.fontSize(9)
     .font('Helvetica')
     .moveDown(0.5)
     .text('✅ CDOH Requirements           ✅ Safety Training', MARGIN_LEFT + 10, doc.y)
     .text('✅ Technical Certifications    ✅ Quality Procedures', MARGIN_LEFT + 10, doc.y + 15);
  
  doc.restore();
}

/**
 * Create table of contents page (Page 3)
 */
function createTableOfContents(doc) {
  doc.addPage();
  
  doc.save();
  
  // Section title
  doc.fontSize(16)
     .font('Helvetica-Bold')
     .fillColor(COLORS.charcoalOlive)
     .text('📋 TABLE OF CONTENTS', MARGIN_LEFT, CONTENT_START_Y, {
       width: CONTENT_WIDTH
     });
  
  doc.moveDown(2);
  
  // TOC items
  const tocItems = [
    '1. Purpose',
    '2. Scope',
    '3. References & Standards',
    '4. Roles & Responsibilities',
    '5. Process Flow',
    '6. Training Needs Assessment',
    '7. Training Program Development',
    '8. Competency Verification',
    '9. Records Management',
    '10. Quality Metrics',
    '11. Approval & Authority',
    '12. Revision History'
  ];
  
  doc.fontSize(11)
     .font('Helvetica');
  
  tocItems.forEach(item => {
    doc.text(item, MARGIN_LEFT + 20, doc.y, {
      width: CONTENT_WIDTH - 20
    });
    doc.moveDown(0.7);
  });
  
  doc.restore();
}

/**
 * Add a section header
 */
function addSectionHeader(doc, text) {
  doc.fontSize(16)
     .font('Helvetica-Bold')
     .fillColor(COLORS.charcoalOlive)
     .text(text, MARGIN_LEFT, doc.y, {
       width: CONTENT_WIDTH
     });
  
  doc.moveDown(1);
}

/**
 * Add body text
 */
function addBodyText(doc, text) {
  doc.fontSize(10)
     .font('Helvetica')
     .fillColor(COLORS.charcoalOlive)
     .text(text, MARGIN_LEFT, doc.y, {
       width: CONTENT_WIDTH,
       align: 'left'
     });
  
  doc.moveDown(0.5);
}

/**
 * Add bullet list
 */
function addBulletList(doc, items) {
  doc.fontSize(10)
     .font('Helvetica')
     .fillColor(COLORS.charcoalOlive);
  
  items.forEach(item => {
    doc.text(`• ${item}`, MARGIN_LEFT + 15, doc.y, {
      width: CONTENT_WIDTH - 15,
      indent: 10
    });
    doc.moveDown(0.3);
  });
  
  doc.moveDown(0.5);
}

/**
 * Add quality checkpoint box
 */
function addQualityCheckpoint(doc, title, items) {
  const boxY = doc.y;
  const boxHeight = 30 + (items.length * 15);
  
  doc.save();
  
  // Box border
  doc.rect(MARGIN_LEFT, boxY, CONTENT_WIDTH, boxHeight)
     .lineWidth(2)
     .fillAndStroke(COLORS.offWhite, COLORS.infoBlue);
  
  // Title
  doc.fillColor(COLORS.charcoalOlive)
     .fontSize(10)
     .font('Helvetica-Bold')
     .text(title, MARGIN_LEFT + 10, boxY + 10, {
       width: CONTENT_WIDTH - 20
     });
  
  // Items
  doc.fontSize(9)
     .font('Helvetica');
  
  let itemY = boxY + 30;
  items.forEach(item => {
    doc.text(`■ ${item}`, MARGIN_LEFT + 15, itemY, {
      width: CONTENT_WIDTH - 25
    });
    itemY += 15;
  });
  
  doc.restore();
  doc.y = boxY + boxHeight + 10;
}

/**
 * Add ASCII diagram with monospace font
 */
function addAsciiDiagram(doc, lines) {
  const boxY = doc.y;
  const lineHeight = 12;
  const boxHeight = lines.length * lineHeight + 20;
  
  doc.save();
  
  // Background
  doc.rect(MARGIN_LEFT, boxY, CONTENT_WIDTH, boxHeight)
     .fill(COLORS.offWhite);
  
  // Text in monospace
  doc.fillColor(COLORS.charcoalOlive)
     .fontSize(8)
     .font('Courier');
  
  let textY = boxY + 10;
  lines.forEach(line => {
    doc.text(line, MARGIN_LEFT + 10, textY, {
      width: CONTENT_WIDTH - 20
    });
    textY += lineHeight;
  });
  
  doc.restore();
  doc.y = boxY + boxHeight + 10;
}

/**
 * Add a simple table
 */
function addSimpleTable(doc, headers, rows) {
  const tableY = doc.y;
  const colWidth = CONTENT_WIDTH / headers.length;
  const rowHeight = 25;
  
  doc.save();
  
  // Header row
  doc.rect(MARGIN_LEFT, tableY, CONTENT_WIDTH, rowHeight)
     .fillAndStroke(COLORS.offWhite, COLORS.neutralGray);
  
  doc.fillColor(COLORS.charcoalOlive)
     .fontSize(9)
     .font('Helvetica-Bold');
  
  headers.forEach((header, i) => {
    doc.text(
      header,
      MARGIN_LEFT + (i * colWidth) + 5,
      tableY + 7,
      { width: colWidth - 10, align: 'left' }
    );
  });
  
  // Data rows
  let currentY = tableY + rowHeight;
  rows.forEach(row => {
    doc.rect(MARGIN_LEFT, currentY, CONTENT_WIDTH, rowHeight)
       .stroke(COLORS.neutralGray);
    
    doc.fontSize(9)
       .font('Helvetica');
    
    row.forEach((cell, i) => {
      doc.text(
        cell,
        MARGIN_LEFT + (i * colWidth) + 5,
        currentY + 7,
        { width: colWidth - 10, align: 'left' }
      );
    });
    
    currentY += rowHeight;
  });
  
  doc.restore();
  doc.y = currentY + 10;
}

/**
 * Create content sections (Pages 4-14)
 */
function createContentSections(doc) {
  // Section 1: Purpose
  doc.addPage();
  addSectionHeader(doc, '1. PURPOSE');
  
  addBodyText(doc, 'This procedure establishes the framework for:');
  
  addBulletList(doc, [
    'IDENTIFYING — Training needs for all personnel',
    'DEVELOPING — Comprehensive training programs',
    'DELIVERING — Effective training execution',
    'VERIFYING — Competency assessment and validation',
    'MAINTAINING — Complete training records',
    'MONITORING — Ongoing competency and refresher training'
  ]);
  
  addBodyText(doc, 'Ensures all personnel performing work affecting product quality are competent based on appropriate education, training, skills, and experience. Compliance with CDOH requirements for modular home manufacturing.');
  
  // Section 2: Scope
  doc.moveDown(2);
  addSectionHeader(doc, '2. SCOPE');
  
  addBodyText(doc, 'Applies to: All Fort and Homes LLC personnel including:');
  addBulletList(doc, [
    'Production employees (all phases)',
    'Quality inspectors and QA staff',
    'Maintenance technicians',
    'Supervisors and management',
    'Temporary workers and contractors',
    'TPIA coordinators'
  ]);
  
  addBodyText(doc, 'Training Categories:');
  addBulletList(doc, [
    'New hire orientation and job-specific training',
    'QMS procedures and work instructions',
    'Safety and environmental compliance',
    'Technical certifications (electrical, plumbing, HVAC)',
    'Equipment operation and maintenance',
    'Regulatory compliance (CDOH, HUD Code, IRC)',
    'Continuous improvement and quality tools'
  ]);
  
  // Section 3: References & Standards
  doc.addPage();
  addSectionHeader(doc, '3. REFERENCES & STANDARDS');
  
  addSimpleTable(doc, 
    ['Reference', 'Description'],
    [
      ['CDOH 8 CCR 1302-14', 'Colorado modular home manufacturing regulations'],
      ['HUD 24 CFR 3280', 'Manufactured housing construction standards'],
      ['IRC 2021', 'International Residential Code'],
      ['NEC 2023', 'National Electrical Code'],
      ['OSHA Standards', 'Occupational safety requirements'],
      ['SOP-001', 'Document Control & Records Management'],
      ['Training Matrix', 'Master competency tracking document']
    ]
  );
  
  // Section 4: Roles & Responsibilities
  doc.moveDown(2);
  addSectionHeader(doc, '4. ROLES & RESPONSIBILITIES');
  
  addSimpleTable(doc,
    ['Role', 'Responsibility'],
    [
      ['Quality Manager', 'Overall training program oversight; competency verification approval; audit coordination'],
      ['Department Supervisors', 'Identify training needs; deliver on-the-job training; assess competency; maintain records'],
      ['HR Manager', 'New hire orientation; track certifications; maintain personnel files; coordinate external training'],
      ['Training Coordinator', 'Schedule training sessions; maintain training matrix; coordinate instructors; track completion'],
      ['Production Manager', 'Technical training approval; work instruction training; equipment operation certification'],
      ['Safety Officer', 'Safety training delivery; OSHA compliance; incident investigation training']
    ]
  );
  
  // Section 5: Process Flow
  doc.addPage();
  addSectionHeader(doc, '5. PROCESS FLOW');
  
  const flowchartLines = [
    '                    TRAINING PROCESS FLOWCHART',
    '',
    '   START',
    '     │',
    '     ▼',
    '   ┌─────────────────┐',
    '   │  IDENTIFY       │',
    '   │  Training Need  │',
    '   └────────┬────────┘',
    '            │',
    '            ▼',
    '   ◇─────────────────◇',
    '   │ New Hire or     │',
    '   │ Existing Staff? │',
    '   ◇────────┬────────◇',
    '      NEW   │   EXISTING',
    '            ▼',
    '   ┌─────────────────┐        ┌─────────────────┐',
    '   │  NEW HIRE       │        │  NEEDS          │',
    '   │  Orientation    │        │  Assessment     │',
    '   └────────┬────────┘        └────────┬────────┘',
    '            │                          │',
    '            └──────────┬───────────────┘',
    '                       ▼',
    '              ┌─────────────────┐',
    '              │  DEVELOP        │',
    '              │  Training Plan  │',
    '              └────────┬────────┘',
    '                       │',
    '                       ▼',
    '              ┌─────────────────┐',
    '              │  DELIVER        │',
    '              │  Training       │',
    '              └────────┬────────┘',
    '                       │',
    '                       ▼',
    '              ┌─────────────────┐        ┌─────────────────┐',
    '              │  ASSESS         │───────▶│ ✅ COMPETENCY   │',
    '              │  Competency     │        │    CHECKPOINT   │',
    '              └────────┬────────┘        └────────┬────────┘',
    '                       │                          │',
    '                       ▼                          │',
    '              ◇─────────────────◇                 │',
    '              │  Competent?     │                 │',
    '              ◇────────┬────────◇                 │',
    '                 YES   │   NO                     │',
    '                       │        └─────────────────┘',
    '                       ▼           (Remedial Training)',
    '              ┌─────────────────┐',
    '              │  DOCUMENT       │',
    '              │  Record         │',
    '              └────────┬────────┘',
    '                       │',
    '                       ▼',
    '              ┌─────────────────┐',
    '              │  UPDATE         │',
    '              │  Training Matrix│',
    '              └────────┬────────┘',
    '                       │',
    '                       ▼',
    '                     END'
  ];
  
  addAsciiDiagram(doc, flowchartLines);
  
  // Section 6: Training Needs Assessment
  doc.addPage();
  addSectionHeader(doc, '6. TRAINING NEEDS ASSESSMENT');
  
  doc.fontSize(12)
     .font('Helvetica-Bold')
     .text('6.1 New Hire Assessment', MARGIN_LEFT, doc.y);
  doc.moveDown(1);
  
  addQualityCheckpoint(doc, '✅ QUALITY CHECKPOINT — New Hire Training Requirements', [
    'Company orientation (safety, quality policy, organizational structure)',
    'QMS overview and document control system',
    'Job-specific SOPs and work instructions',
    'Safety training (OSHA, PPE, emergency procedures)',
    'Equipment operation (if applicable)',
    'Regulatory requirements (CDOH, HUD Code, building codes)',
    'Competency assessment before independent work authorization'
  ]);
  
  doc.moveDown(1);
  addBodyText(doc, 'Assessment Process:');
  addBulletList(doc, [
    'HR Manager reviews job description and identifies required competencies',
    'Department Supervisor determines current skill level',
    'Training Coordinator creates individualized training plan',
    'New hire completes orientation checklist (FORM-TR-001)',
    'On-the-job training with mentor assignment (minimum 5 days)',
    'Competency verification before release to independent work'
  ]);
  
  doc.fontSize(12)
     .font('Helvetica-Bold')
     .text('6.2 Ongoing Training Needs', MARGIN_LEFT, doc.y);
  doc.moveDown(1);
  
  addSimpleTable(doc,
    ['Trigger', 'Assessment Method', 'Frequency'],
    [
      ['New procedure/SOP', 'Document change notice', 'As needed'],
      ['Equipment upgrade', 'Technical assessment', 'When installed'],
      ['Audit finding', 'Root cause analysis', 'Per CAPA'],
      ['Performance gap', 'Supervisor observation', 'Ongoing'],
      ['Regulatory change', 'Compliance review', 'As required'],
      ['Annual review', 'Training matrix audit', 'Annually']
    ]
  );
  
  // Section 7: Training Program Development
  doc.addPage();
  addSectionHeader(doc, '7. TRAINING PROGRAM DEVELOPMENT');
  
  doc.fontSize(12)
     .font('Helvetica-Bold')
     .text('7.1 Training Plan Components', MARGIN_LEFT, doc.y);
  doc.moveDown(1);
  
  addBodyText(doc, 'Each training program SHALL include:');
  
  addSimpleTable(doc,
    ['Component', 'Description', 'Responsibility'],
    [
      ['Learning Objectives', 'Clear, measurable outcomes', 'Training Coordinator'],
      ['Training Materials', 'Presentations, handouts, SOPs', 'Subject Matter Expert'],
      ['Hands-On Practice', 'Equipment, mock setups', 'Department Supervisor'],
      ['Assessment Method', 'Test, demonstration, observation', 'Trainer'],
      ['Schedule', 'Date, time, location, duration', 'Training Coordinator'],
      ['Instructor', 'Qualified trainer assignment', 'Quality Manager']
    ]
  );
  
  doc.moveDown(1);
  doc.fontSize(12)
     .font('Helvetica-Bold')
     .text('7.2 Training Delivery Methods', MARGIN_LEFT, doc.y);
  doc.moveDown(1);
  
  const deliveryLines = [
    '                    TRAINING DELIVERY OPTIONS',
    '',
    '   📖 CLASSROOM                    🛠️ ON-THE-JOB',
    '   • Safety training               • Work instruction training',
    '   • QMS procedures                • Equipment operation',
    '   • Regulatory compliance         • Mentor-supervised tasks',
    '',
    '   💻 E-LEARNING                   🎓 EXTERNAL',
    '   • Document control              • Technical certifications',
    '   • Quality awareness             • Licensing (electrical, plumbing)',
    '   • Policy updates                • Industry seminars'
  ];
  
  addAsciiDiagram(doc, deliveryLines);
  
  // Section 8: Competency Verification
  doc.addPage();
  addSectionHeader(doc, '8. COMPETENCY VERIFICATION');
  
  doc.fontSize(12)
     .font('Helvetica-Bold')
     .text('8.1 Assessment Methods', MARGIN_LEFT, doc.y);
  doc.moveDown(1);
  
  addSimpleTable(doc,
    ['Method', 'Application', 'Pass Criteria'],
    [
      ['Written Test', 'Safety, procedures, codes', '≥80% score'],
      ['Practical Demonstration', 'Equipment operation, assembly tasks', 'No errors, meets spec'],
      ['Direct Observation', 'On-the-job performance', 'Supervisor sign-off'],
      ['Certification Exam', 'External licensing (electrical, plumbing)', 'State/industry certification'],
      ['Peer Review', 'Quality inspection tasks', 'QA Manager approval']
    ]
  );
  
  doc.moveDown(1);
  doc.fontSize(12)
     .font('Helvetica-Bold')
     .text('8.2 Competency Documentation', MARGIN_LEFT, doc.y);
  doc.moveDown(1);
  
  const formLines = [
    '   COMPETENCY VERIFICATION RECORD (FORM-TR-002)',
    '',
    ' Employee:  ____________________  Position: ____________________',
    ' Date: ____________  Assessor: ____________________',
    '',
    ' TRAINING COMPLETED:',
    ' [ ] Classroom    [ ] On-the-Job    [ ] E-Learning    [ ] External',
    '',
    ' ASSESSMENT METHOD:',
    ' [ ] Written Test (Score: ___%)','   [ ] Practical Demonstration',
    ' [ ] Direct Observation',
    ' [ ] Certification Received:  ____________________',
    '',
    ' RESULT:',
    ' [ ] ✅ COMPETENT — Authorized for independent work',
    ' [ ] 🟡 REMEDIAL — Additional training required',
    ' [ ] 🔴 NOT COMPETENT — Retraining necessary',
    '',
    ' Assessor Signature: ____________________  Date: ____________',
    ' Supervisor Signature: __________________  Date: ____________'
  ];
  
  addAsciiDiagram(doc, formLines);
  
  doc.moveDown(1);
  doc.fontSize(12)
     .font('Helvetica-Bold')
     .text('8.3 Retraining Requirements', MARGIN_LEFT, doc.y);
  doc.moveDown(1);
  
  addBodyText(doc, '⚠️ RETRAINING TRIGGERS');
  addBodyText(doc, 'Immediate Retraining Required When:');
  addBulletList(doc, [
    'Employee commits quality error affecting product safety',
    'Audit identifies competency gap',
    'Procedure change affects job responsibilities',
    'Equipment modification changes operation',
    'Certification expires',
    'Performance review identifies skill deficiency'
  ]);
  
  // Section 9: Records Management
  doc.addPage();
  addSectionHeader(doc, '9. RECORDS MANAGEMENT');
  
  doc.fontSize(12)
     .font('Helvetica-Bold')
     .text('9.1 Training Records Retention', MARGIN_LEFT, doc.y);
  doc.moveDown(1);
  
  addSimpleTable(doc,
    ['Record Type', 'Retention Period', 'Storage Location'],
    [
      ['Training Matrix', 'Current + 3 years', 'Quality Manager office'],
      ['Training Attendance Sheets', '3 years', 'HR files'],
      ['Competency Assessments', 'Employee tenure + 3 years', 'Personnel file'],
      ['External Certifications', 'Current + 3 years', 'HR & Department files'],
      ['Training Materials', 'Current version + 1 superseded', 'Document control system'],
      ['Training Plans', '3 years', 'Quality records']
    ]
  );
  
  doc.moveDown(1);
  doc.fontSize(12)
     .font('Helvetica-Bold')
     .text('9.2 Training Matrix Requirements', MARGIN_LEFT, doc.y);
  doc.moveDown(1);
  
  addBodyText(doc, 'Master Training Matrix SHALL track:');
  addBulletList(doc, [
    'Employee name and ID',
    'Position/role',
    'Required training items',
    'Completion dates',
    'Trainer/assessor name',
    'Next renewal date',
    'External certification numbers',
    'Competency verification status'
  ]);
  
  addBodyText(doc, 'Update frequency: Real-time upon training completion');
  
  // Section 10: Quality Metrics
  doc.addPage();
  addSectionHeader(doc, '10. QUALITY METRICS');
  
  const metricsLines = [
    '                        📊 TRAINING METRICS',
    '',
    '   METRIC                          TARGET      FREQUENCY      OWNER',
    '   ────────────────────────────────────────────────────────────────',
    '   Training Completion Rate        >95%        Monthly        HR Mgr',
    '   Competency Pass Rate (1st)      >90%        Quarterly      Qual Mgr',
    '   Training On-Time Delivery       >98%        Monthly        Trainer',
    '   Certification Renewal Rate      100%        Monthly        HR Mgr',
    '   Training Effectiveness          >85%        Quarterly      Qual Mgr',
    '   (Quality performance correlation)'
  ];
  
  addAsciiDiagram(doc, metricsLines);
  
  doc.moveDown(1);
  addBodyText(doc, 'Monitoring Methods:');
  addBulletList(doc, [
    'Monthly training matrix review by Quality Manager',
    'Quarterly competency audit by Department Supervisors',
    'Annual effectiveness review during Management Review (SOP-003)',
    'Correlation analysis between training completion and quality metrics'
  ]);
  
  // Section 11: Approval & Authority
  doc.addPage();
  addSectionHeader(doc, '11. APPROVAL & AUTHORITY');
  
  doc.moveDown(1);
  
  addSimpleTable(doc,
    ['Signature', 'Title', 'Date'],
    [
      ['_________________________', 'Quality Manager', '____________'],
      ['_________________________', 'HR Manager', '____________'],
      ['_________________________', 'Production Manager', '____________'],
      ['_________________________', 'Plant Manager', '____________']
    ]
  );
  
  // Section 12: Revision History
  doc.moveDown(2);
  addSectionHeader(doc, '12. REVISION HISTORY');
  
  addSimpleTable(doc,
    ['Revision', 'Date', 'Author', 'Changes'],
    [
      ['1.0', 'January 14, 2026', 'Quality Manager', 'Initial release'],
      ['2.0', 'January 15, 2026', 'Quality Manager', 'Visual design system upgrade; added process flowcharts and executive dashboard']
    ]
  );
}

/**
 * Create end page (Page 15)
 */
function createEndPage(doc) {
  doc.addPage();
  
  doc.save();
  
  const centerY = (PAGE_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM) / 2 + MARGIN_TOP;
  
  // END OF DOCUMENT
  doc.fontSize(14)
     .font('Helvetica-Bold')
     .fillColor(COLORS.charcoalOlive)
     .text('END OF DOCUMENT', MARGIN_LEFT, centerY - 80, {
       width: CONTENT_WIDTH,
       align: 'center'
     });
  
  doc.moveDown(2);
  
  // Company info
  doc.fontSize(11)
     .font('Helvetica')
     .text('Fort and Homes LLC | Quality Management System', {
       width: CONTENT_WIDTH,
       align: 'center'
     });
  
  doc.fontSize(10)
     .text('Mesa County, Colorado', {
       width: CONTENT_WIDTH,
       align: 'center'
     });
  
  doc.moveDown(2);
  
  // Tagline
  doc.fontSize(12)
     .font('Helvetica-Bold')
     .text('Quality Without Compromise™', {
       width: CONTENT_WIDTH,
       align: 'center'
     });
  
  doc.moveDown(3);
  
  // Footer text
  doc.fontSize(9)
     .font('Helvetica')
     .text('Document Classification: CONTROLLED | Training Required: Annual', {
       width: CONTENT_WIDTH,
       align: 'center'
     });
  
  doc.fontSize(9)
     .text('Regulatory Compliance: CDOH 8 CCR 1302-14, HUD 24 CFR 3280', {
       width: CONTENT_WIDTH,
       align: 'center'
     });
  
  doc.restore();
}

/**
 * Add headers and footers to all pages
 */
function addHeadersAndFooters(doc) {
  const pages = doc.bufferedPageRange();
  console.log('DEBUG: bufferedPageRange =', JSON.stringify(pages));
  
  for (let i = 0; i < pages.count; i++) {
    console.log(`DEBUG: Processing page ${i + 1} of ${pages.count}`);
    doc.switchToPage(i);
    
    // Add header and footer to all pages
    addHeader(doc);
    addFooter(doc, i + 1, pages.count);
  }
}

/**
 * Main generation function
 */
function generatePDF() {
  console.log('🎨 Generating Fort Homes QMS SOP-002 V2 PDF...');
  
  try {
    // Check prerequisites
    checkSourceFile();
    ensureOutputDir();
    
    // Read markdown content
    const markdownContent = readMarkdownContent();
    
    // Create PDF document
    const doc = new PDFDocument({
      size: 'LETTER',
      margins: {
        top: CONTENT_START_Y,
        bottom: MARGIN_BOTTOM + FOOTER_HEIGHT + 10,
        left: MARGIN_LEFT,
        right: MARGIN_RIGHT
      },
      bufferPages: true,
      info: {
        Title: 'SOP-002 Training & Competency Management V2',
        Author: 'Fort and Homes LLC',
        Subject: 'Quality Management System - Standard Operating Procedure',
        Keywords: 'Training, Competency, QMS, Fort Homes'
      }
    });
    
    // Pipe to file
    const writeStream = fs.createWriteStream(OUTPUT_FILE);
    doc.pipe(writeStream);
    
    // Generate pages
    createTitlePage(doc);
    createExecutiveSummary(doc);
    createTableOfContents(doc);
    createContentSections(doc);
    createEndPage(doc);
    
    // Get page count BEFORE adding headers/footers
    const totalPages = doc.bufferedPageRange().count;
    console.log('DEBUG: Pages before headers/footers:', totalPages);
    
    // Add headers and footers to all pages
    addHeadersAndFooters(doc);
    
    // Get page count AFTER adding headers/footers
    const finalPages = doc.bufferedPageRange().count;
    console.log('DEBUG: Pages after headers/footers:', finalPages);
    
    // Finalize PDF
    doc.end();
    
    // Wait for file to be written
    writeStream.on('finish', () => {
      const stats = fs.statSync(OUTPUT_FILE);
      const fileSizeKB = (stats.size / 1024).toFixed(2);
      
      console.log('✅ PDF generated successfully!');
      console.log(`📄 File: ${OUTPUT_FILE}`);
      console.log(`📊 Size: ${fileSizeKB} KB`);
      console.log(`📋 Pages: ${finalPages}`);
    });
    
    writeStream.on('error', (err) => {
      console.error('❌ Error writing PDF file:', err);
      process.exit(1);
    });
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    process.exit(1);
  }
}

// Run the generator
generatePDF();
