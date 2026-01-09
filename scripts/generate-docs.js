#!/usr/bin/env node
/**
 * Fort Homes QMS Document Generator
 * Generates Word documents from JSON data files
 * 
 * Usage: node scripts/generate-docs.js [output-dir]
 */

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  Header,
  Footer,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  WidthType,
  ShadingType,
  PageNumber,
  PageBreak,
  LevelFormat,
  TableOfContents,
  VerticalAlign
} = require("docx");
const fs = require("fs");
const path = require("path");

// Load data files
const phases = require("../data/phases.json");
const companyInfo = require("../data/company-info.json");
const holdPoints = require("../data/hold-points.json");

// Styling constants
const COLORS = {
  primary: "2C3E50",
  secondary: "34495E",
  accent: "3498DB",
  warning: "E74C3C",
  success: "27AE60",
  light: "F8F9FA",
  holdPoint: "FFEBEE",
  highlight: "E8F4FD"
};

const border = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

/**
 * Create a styled header cell
 */
function headerCell(text, width) {
  return new TableCell({
    borders,
    margins: cellMargins,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: COLORS.primary, type: ShadingType.CLEAR },
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold: true, size: 20, color: "FFFFFF" })]
      })
    ]
  });
}

/**
 * Create a standard cell
 */
function cell(text, width, options = {}) {
  const { bold = false, shading = null, align = AlignmentType.LEFT } = options;
  return new TableCell({
    borders,
    margins: cellMargins,
    width: { size: width, type: WidthType.DXA },
    shading: shading ? { fill: shading, type: ShadingType.CLEAR } : undefined,
    children: [
      new Paragraph({
        alignment: align,
        children: [new TextRun({ text, bold, size: 20 })]
      })
    ]
  });
}

/**
 * Generate Phase Summary Table
 */
function generatePhaseSummaryTable() {
  const rows = [
    new TableRow({
      children: [
        headerCell("Phase", 1170),
        headerCell("Description", 2925),
        headerCell("Duration", 1170),
        headerCell("Hold Point", 1170),
        headerCell("TPIA", 1170),
        headerCell("Reference ITP", 1755)
      ]
    })
  ];

  phases.phases.forEach(phase => {
    rows.push(
      new TableRow({
        children: [
          cell(phase.id.toString(), 1170, { bold: true, align: AlignmentType.CENTER }),
          cell(phase.name, 2925),
          cell(phase.durationDays, 1170, { align: AlignmentType.CENTER }),
          cell(phase.holdPoint, 1170, { 
            bold: true, 
            align: AlignmentType.CENTER,
            shading: phase.isHoldPoint ? COLORS.holdPoint : null
          }),
          cell(phase.tpiaRequired ? "REQUIRED" : "Optional", 1170, {
            align: AlignmentType.CENTER,
            shading: phase.tpiaRequired ? COLORS.highlight : null
          }),
          cell(phase.referenceITP, 1755)
        ]
      })
    );
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [1170, 2925, 1170, 1170, 1170, 1755],
    rows
  });
}

/**
 * Generate Hold Point Details Section
 */
function generateHoldPointSection(hp) {
  const content = [];
  
  content.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_3,
      children: [new TextRun({ text: `${hp.id}: ${hp.name}` })]
    })
  );

  // Info table
  const infoRows = [
    new TableRow({
      children: [
        cell("Trigger:", 2340, { bold: true, shading: COLORS.light }),
        cell(hp.trigger, 7020)
      ]
    }),
    new TableRow({
      children: [
        cell("Blocks:", 2340, { bold: true, shading: COLORS.light }),
        cell(hp.blocksPhase ? `Phase ${hp.blocksPhase}` : (hp.blocksAction || "N/A"), 7020)
      ]
    }),
    new TableRow({
      children: [
        cell("TPIA Witness:", 2340, { bold: true, shading: COLORS.light }),
        cell(String(hp.tpiaWitness || "optional").toUpperCase(), 7020, {
          shading: hp.tpiaWitness === "REQUIRED" ? COLORS.highlight : null
        })
      ]
    }),
    new TableRow({
      children: [
        cell("Reference ITP:", 2340, { bold: true, shading: COLORS.light }),
        cell(hp.referenceITP, 7020)
      ]
    })
  ];

  content.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      columnWidths: [2340, 7020],
      rows: infoRows
    })
  );

  content.push(new Paragraph({ children: [] }));

  // Inspection criteria table
  if (hp.inspectionCriteria && hp.inspectionCriteria.length > 0) {
    const criteriaRows = [
      new TableRow({
        children: [
          headerCell("Item", 3120),
          headerCell("Tolerance/Criteria", 3120),
          headerCell("Method", 3120)
        ]
      })
    ];

    hp.inspectionCriteria.forEach(criteria => {
      criteriaRows.push(
        new TableRow({
          children: [
            cell(criteria.item, 3120),
            cell(criteria.tolerance, 3120),
            cell(criteria.method, 3120)
          ]
        })
      );
    });

    content.push(
      new Paragraph({
        children: [new TextRun({ text: "Inspection Criteria:", bold: true, size: 22 })]
      })
    );
    content.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [3120, 3120, 3120],
        rows: criteriaRows
      })
    );
  }

  content.push(new Paragraph({ children: [] }));

  return content;
}

/**
 * Generate the complete QMS document
 */
async function generateQMSDocument(outputPath) {
  console.log("Generating QMS Document...");

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Arial", size: 22 }
        }
      },
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { size: 36, bold: true, font: "Arial", color: COLORS.primary },
          paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 }
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { size: 28, bold: true, font: "Arial", color: COLORS.secondary },
          paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 }
        },
        {
          id: "Heading3",
          name: "Heading 3",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { size: 24, bold: true, font: "Arial", color: COLORS.secondary },
          paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 }
        }
      ]
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: `${companyInfo.company.legalName} | Quality Management System`, size: 18, color: "666666" })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: "Page ", size: 18, color: "666666" }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "666666" }),
                  new TextRun({ text: " | FHDEV-QMS-BIP-001 Rev 3.0 | Uncontrolled When Printed", size: 18, color: "666666" })
                ]
              })
            ]
          })
        },
        children: [
          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: companyInfo.company.legalName.toUpperCase(), bold: true, size: 48, color: COLORS.primary })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Quality Management System", size: 36 })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Build-in-Place (Static Bay) Manufacturing", bold: true, size: 28, color: COLORS.warning })
            ]
          }),
          new Paragraph({ children: [] }),
          new Paragraph({ children: [] }),

          // Document info table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            columnWidths: [4680, 4680],
            rows: [
              new TableRow({
                children: [
                  cell("Document Number:", 4680, { bold: true, shading: COLORS.light }),
                  cell("FHDEV-QMS-BIP-001", 4680)
                ]
              }),
              new TableRow({
                children: [
                  cell("Revision:", 4680, { bold: true, shading: COLORS.light }),
                  cell(companyInfo.qms.currentRevision, 4680)
                ]
              }),
              new TableRow({
                children: [
                  cell("Effective Date:", 4680, { bold: true, shading: COLORS.light }),
                  cell(new Date().toLocaleDateString(), 4680)
                ]
              }),
              new TableRow({
                children: [
                  cell("Prepared By:", 4680, { bold: true, shading: COLORS.light }),
                  cell(`${companyInfo.leadership[2].name}, ${companyInfo.leadership[2].title}`, 4680)
                ]
              }),
              new TableRow({
                children: [
                  cell("Approved By:", 4680, { bold: true, shading: COLORS.light }),
                  cell(`${companyInfo.leadership[0].name}, ${companyInfo.leadership[0].title}`, 4680)
                ]
              })
            ]
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // Table of Contents
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: "TABLE OF CONTENTS" })]
          }),
          new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-3" }),

          new Paragraph({ children: [new PageBreak()] }),

          // Section 1: Production Phases
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: "SECTION 1: PRODUCTION PHASES" })]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Fort Homes employs a ${phases.methodology} manufacturing process with ${phases.phases.length} sequential phases.`, size: 22 })
            ]
          }),
          new Paragraph({ children: [] }),
          
          // Phase summary table
          generatePhaseSummaryTable(),

          new Paragraph({ children: [new PageBreak()] }),

          // Section 2: Hold Points
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: "SECTION 2: INSPECTION HOLD POINTS" })]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "The following hold points require QA Manager approval before work may proceed to the next phase.", size: 22 })
            ]
          }),
          new Paragraph({ children: [] }),

          // Generate each hold point section
          ...holdPoints.holdPoints.flatMap(hp => generateHoldPointSection(hp)),

          new Paragraph({ children: [new PageBreak()] }),

          // Section 3: Company Information
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: "SECTION 3: COMPANY INFORMATION" })]
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "Company Details" })]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            columnWidths: [4680, 4680],
            rows: [
              new TableRow({
                children: [
                  cell("Legal Name:", 4680, { bold: true, shading: COLORS.light }),
                  cell(companyInfo.company.legalName, 4680)
                ]
              }),
              new TableRow({
                children: [
                  cell("DBA:", 4680, { bold: true, shading: COLORS.light }),
                  cell(companyInfo.company.dba, 4680)
                ]
              }),
              new TableRow({
                children: [
                  cell("Address:", 4680, { bold: true, shading: COLORS.light }),
                  cell(`${companyInfo.company.address.street}, ${companyInfo.company.address.city}, ${companyInfo.company.address.state} ${companyInfo.company.address.zip}`, 4680)
                ]
              }),
              new TableRow({
                children: [
                  cell("Manufacturing Methodology:", 4680, { bold: true, shading: COLORS.light }),
                  cell(companyInfo.qms.methodology, 4680)
                ]
              }),
              new TableRow({
                children: [
                  cell("Production Bays:", 4680, { bold: true, shading: COLORS.light }),
                  cell(companyInfo.facility.productionBays.toString(), 4680)
                ]
              })
            ]
          }),
          new Paragraph({ children: [] }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "Leadership" })]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            columnWidths: [3120, 3120, 3120],
            rows: [
              new TableRow({
                children: [
                  headerCell("Name", 3120),
                  headerCell("Title", 3120),
                  headerCell("Email", 3120)
                ]
              }),
              ...companyInfo.leadership.map(person => 
                new TableRow({
                  children: [
                    cell(person.name, 3120, { bold: true }),
                    cell(person.title, 3120),
                    cell(person.email, 3120)
                  ]
                })
              )
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document generated: ${outputPath}`);
}

// Main execution
const outputDir = process.argv[2] || "./output";
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, `FHDEV-QMS-BIP-001_v${companyInfo.qms.currentRevision}.docx`);
generateQMSDocument(outputPath)
  .then(() => console.log("Generation complete!"))
  .catch(err => console.error("Error generating document:", err));
