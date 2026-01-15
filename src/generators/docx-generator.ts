/**
 * DOCX Generator
 * Generates editable Microsoft Word documents from QMS content
 */

import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import * as fs from 'fs/promises';

export interface DOCXGeneratorOptions {
  title: string;
  documentNumber: string;
  version: string;
  effectiveDate: string;
  status?: string;
  author?: string;
  company?: string;
}

export class DOCXGenerator {
  /**
   * Generate a DOCX document
   */
  async generateDOCX(
    content: any,
    outputPath: string,
    options: DOCXGeneratorOptions
  ): Promise<void> {
    const sections = [];

    // Create cover page
    const coverPage = this.createCoverPage(options);
    sections.push(...coverPage);

    // Add page break
    sections.push(
      new Paragraph({
        pageBreakBefore: true,
      })
    );

    // Add content
    if (typeof content === 'string') {
      sections.push(...this.parseMarkdownContent(content));
    } else if (typeof content === 'object') {
      if (content.sections) {
        sections.push(...this.createStructuredContent(content.sections));
      } else if (content.content) {
        sections.push(...this.parseMarkdownContent(content.content));
      }
    }

    // Create document
    const doc = new Document({
      creator: options.author || 'Fort Homes LLC',
      title: options.title,
      subject: `QMS Document: ${options.documentNumber}`,
      keywords: ['QMS', 'Quality Management', 'Modular Homes'],
      sections: [
        {
          properties: {},
          headers: {
            default: this.createHeader(options),
          },
          footers: {
            default: this.createFooter(options),
          },
          children: sections,
        },
      ],
    });

    // Write to file
    const buffer = await doc.save();
    await fs.writeFile(outputPath, buffer);
  }

  private createCoverPage(options: DOCXGeneratorOptions): Paragraph[] {
    return [
      // Title
      new Paragraph({
        text: 'QUALITY MANAGEMENT SYSTEM',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { before: 2000, after: 400 },
      }),
      new Paragraph({
        text: options.title.toUpperCase(),
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 800 },
      }),
      
      // Company info
      new Paragraph({
        text: options.company || 'FORT HOMES LLC',
        alignment: AlignmentType.CENTER,
        spacing: { before: 1000, after: 200 },
        style: 'strong',
      }),
      new Paragraph({
        text: 'Off-Site Modular Home Manufacturing',
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: 'Grand Junction, Colorado',
        alignment: AlignmentType.CENTER,
        spacing: { after: 1000 },
      }),
      
      // Document info table
      ...this.createDocumentInfoTable(options),
      
      // Regulatory info
      new Paragraph({
        text: 'Third-Party Inspector: NTA, Inc.',
        alignment: AlignmentType.CENTER,
        spacing: { before: 1000, after: 200 },
      }),
      new Paragraph({
        text: 'Regulatory Authority: Colorado Division of Housing',
        alignment: AlignmentType.CENTER,
      }),
    ];
  }

  private createDocumentInfoTable(options: DOCXGeneratorOptions): Paragraph[] {
    // For simplicity, create paragraphs instead of a table
    // In a full implementation, you'd use the Table class
    return [
      new Paragraph({
        text: `Document No: ${options.documentNumber}`,
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 200 },
      }),
      new Paragraph({
        text: `Revision: ${options.version}`,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: `Effective Date: ${options.effectiveDate}`,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: `Status: ${(options.status || 'DRAFT').toUpperCase()}`,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      }),
    ];
  }

  private parseMarkdownContent(markdown: string): Paragraph[] {
    const paragraphs: Paragraph[] = [];
    const lines = markdown.split('\n');

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        paragraphs.push(new Paragraph({ text: '' }));
        continue;
      }

      // Heading 1
      if (trimmedLine.startsWith('# ')) {
        paragraphs.push(
          new Paragraph({
            text: trimmedLine.substring(2),
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          })
        );
      }
      // Heading 2
      else if (trimmedLine.startsWith('## ')) {
        paragraphs.push(
          new Paragraph({
            text: trimmedLine.substring(3),
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 150 },
          })
        );
      }
      // Heading 3
      else if (trimmedLine.startsWith('### ')) {
        paragraphs.push(
          new Paragraph({
            text: trimmedLine.substring(4),
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 200, after: 100 },
          })
        );
      }
      // List item
      else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        paragraphs.push(
          new Paragraph({
            text: trimmedLine.substring(2),
            bullet: { level: 0 },
          })
        );
      }
      // Numbered list
      else if (/^\d+\.\s/.test(trimmedLine)) {
        paragraphs.push(
          new Paragraph({
            text: trimmedLine.replace(/^\d+\.\s/, ''),
            numbering: { reference: 'default', level: 0 },
          })
        );
      }
      // Checkbox
      else if (trimmedLine.startsWith('- [ ]') || trimmedLine.startsWith('- [x]')) {
        const checked = trimmedLine.includes('[x]');
        paragraphs.push(
          new Paragraph({
            text: (checked ? '☑ ' : '☐ ') + trimmedLine.substring(6),
          })
        );
      }
      // Bold text (simple case)
      else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: trimmedLine.slice(2, -2),
                bold: true,
              }),
            ],
          })
        );
      }
      // Regular paragraph
      else {
        paragraphs.push(
          new Paragraph({
            text: trimmedLine,
          })
        );
      }
    }

    return paragraphs;
  }

  private createStructuredContent(sections: any[]): Paragraph[] {
    const paragraphs: Paragraph[] = [];

    for (const section of sections) {
      // Section title
      paragraphs.push(
        new Paragraph({
          text: section.title,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
        })
      );

      // Section content
      if (section.content) {
        if (typeof section.content === 'string') {
          paragraphs.push(...this.parseMarkdownContent(section.content));
        } else {
          paragraphs.push(
            new Paragraph({
              text: JSON.stringify(section.content, null, 2),
            })
          );
        }
      }

      paragraphs.push(new Paragraph({ text: '' })); // Spacing
    }

    return paragraphs;
  }

  private createHeader(options: DOCXGeneratorOptions): any {
    return {
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: `${options.documentNumber} - ${options.title}`,
              size: 18,
            }),
          ],
          alignment: AlignmentType.CENTER,
        }),
      ],
    };
  }

  private createFooter(options: DOCXGeneratorOptions): any {
    return {
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: `${options.documentNumber} Rev. ${options.version}`,
              size: 16,
            }),
            new TextRun({
              text: '   |   ',
              size: 16,
            }),
            new TextRun({
              text: options.effectiveDate,
              size: 16,
            }),
          ],
          alignment: AlignmentType.CENTER,
        }),
      ],
    };
  }
}

export const docxGenerator = new DOCXGenerator();
