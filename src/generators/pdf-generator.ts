/**
 * PDF Generator
 * Generates professional PDF documents from QMS content
 */

import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

export interface PDFGeneratorOptions {
  title: string;
  documentNumber: string;
  version: string;
  effectiveDate: string;
  status?: string;
  author?: string;
  company?: string;
  watermark?: string;
}

export class PDFGenerator {
  /**
   * Generate a PDF document
   */
  async generatePDF(
    content: any,
    outputPath: string,
    options: PDFGeneratorOptions
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Create PDF document
        const doc = new PDFDocument({
          size: 'LETTER',
          margins: {
            top: 72,
            bottom: 72,
            left: 72,
            right: 72,
          },
          info: {
            Title: options.title,
            Author: options.author || 'Fort Homes LLC',
            Subject: `QMS Document: ${options.documentNumber}`,
            Keywords: 'QMS, Quality Management, Modular Homes, Fort Homes',
          },
        });

        // Pipe to file
        const stream = fs.createWriteStream(outputPath);
        doc.pipe(stream);

        // Add cover page
        this.addCoverPage(doc, options);

        // Add content
        this.addContent(doc, content);

        // Add footer on each page
        this.addFooter(doc, options);

        // Add watermark if needed
        if (options.watermark) {
          this.addWatermark(doc, options.watermark);
        }

        // Finalize PDF
        doc.end();

        stream.on('finish', () => resolve());
        stream.on('error', reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  private addCoverPage(doc: PDFKit.PDFDocument, options: PDFGeneratorOptions): void {
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // Draw border
    doc
      .rect(50, 50, pageWidth - 100, pageHeight - 100)
      .lineWidth(2)
      .stroke('#003366');

    // Title section
    doc
      .fontSize(24)
      .font('Helvetica-Bold')
      .fillColor('#003366')
      .text('QUALITY MANAGEMENT SYSTEM', 72, 150, {
        align: 'center',
        width: pageWidth - 144,
      });

    doc
      .fontSize(20)
      .text(options.title.toUpperCase(), 72, 190, {
        align: 'center',
        width: pageWidth - 144,
      });

    // Company section
    doc
      .fontSize(16)
      .font('Helvetica')
      .fillColor('#000000')
      .text(options.company || 'FORT HOMES LLC', 72, 280, {
        align: 'center',
        width: pageWidth - 144,
      });

    doc
      .fontSize(12)
      .text('Off-Site Modular Home Manufacturing', 72, 310, {
        align: 'center',
        width: pageWidth - 144,
      });

    doc.text('Grand Junction, Colorado', 72, 330, {
      align: 'center',
      width: pageWidth - 144,
    });

    // Document information box
    const boxY = 400;
    const boxHeight = 140;
    doc
      .rect(150, boxY, pageWidth - 300, boxHeight)
      .lineWidth(1)
      .stroke('#003366');

    doc
      .fontSize(11)
      .font('Helvetica-Bold')
      .text(`Document No: ${options.documentNumber}`, 170, boxY + 20);
    
    doc.text(`Revision: ${options.version}`, 170, boxY + 45);
    
    doc.text(`Effective Date: ${options.effectiveDate}`, 170, boxY + 70);
    
    if (options.status) {
      doc.text(`Status: ${options.status.toUpperCase()}`, 170, boxY + 95);
    }

    // Footer section
    doc
      .fontSize(10)
      .font('Helvetica')
      .text('Third-Party Inspector: NTA, Inc.', 72, pageHeight - 150, {
        align: 'center',
        width: pageWidth - 144,
      });

    doc.text('Regulatory Authority: Colorado Division of Housing', 72, pageHeight - 130, {
      align: 'center',
      width: pageWidth - 144,
    });

    // Add new page for content
    doc.addPage();
  }

  private addContent(doc: PDFKit.PDFDocument, content: any): void {
    // If content is a string (markdown), parse and format
    if (typeof content === 'string') {
      this.addMarkdownContent(doc, content);
    } else if (typeof content === 'object') {
      // If content is structured object
      if (content.sections) {
        this.addStructuredContent(doc, content.sections);
      } else {
        // Convert object to readable text
        this.addMarkdownContent(doc, JSON.stringify(content, null, 2));
      }
    }
  }

  private addMarkdownContent(doc: PDFKit.PDFDocument, markdown: string): void {
    const lines = markdown.split('\n');
    let currentY = doc.y;

    for (const line of lines) {
      // Check if we need a new page
      if (currentY > doc.page.height - 100) {
        doc.addPage();
        currentY = 72;
      }

      const trimmedLine = line.trim();

      // Heading 1
      if (trimmedLine.startsWith('# ')) {
        doc
          .fontSize(18)
          .font('Helvetica-Bold')
          .fillColor('#003366')
          .text(trimmedLine.substring(2), 72, currentY);
        currentY = doc.y + 10;
      }
      // Heading 2
      else if (trimmedLine.startsWith('## ')) {
        doc
          .fontSize(14)
          .font('Helvetica-Bold')
          .fillColor('#003366')
          .text(trimmedLine.substring(3), 72, currentY);
        currentY = doc.y + 8;
      }
      // Heading 3
      else if (trimmedLine.startsWith('### ')) {
        doc
          .fontSize(12)
          .font('Helvetica-Bold')
          .fillColor('#000000')
          .text(trimmedLine.substring(4), 72, currentY);
        currentY = doc.y + 6;
      }
      // List item
      else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        doc
          .fontSize(10)
          .font('Helvetica')
          .fillColor('#000000')
          .text('• ' + trimmedLine.substring(2), 90, currentY);
        currentY = doc.y + 4;
      }
      // Bold text
      else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        doc
          .fontSize(10)
          .font('Helvetica-Bold')
          .fillColor('#000000')
          .text(trimmedLine.slice(2, -2), 72, currentY);
        currentY = doc.y + 4;
      }
      // Regular text
      else if (trimmedLine.length > 0) {
        doc
          .fontSize(10)
          .font('Helvetica')
          .fillColor('#000000')
          .text(trimmedLine, 72, currentY, { width: doc.page.width - 144 });
        currentY = doc.y + 4;
      }
      // Empty line
      else {
        currentY += 10;
      }
    }
  }

  private addStructuredContent(doc: PDFKit.PDFDocument, sections: any[]): void {
    for (const section of sections) {
      // Add section title
      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .fillColor('#003366')
        .text(section.title, 72, doc.y);

      // Add section content
      if (section.content) {
        doc
          .fontSize(10)
          .font('Helvetica')
          .fillColor('#000000')
          .text(section.content, 72, doc.y + 10, { width: doc.page.width - 144 });
      }

      doc.moveDown(2);
    }
  }

  private addFooter(doc: PDFKit.PDFDocument, options: PDFGeneratorOptions): void {
    const pages = doc.bufferedPageRange();
    
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);
      
      const pageHeight = doc.page.height;
      const pageWidth = doc.page.width;
      
      // Footer line
      doc
        .moveTo(72, pageHeight - 60)
        .lineTo(pageWidth - 72, pageHeight - 60)
        .lineWidth(0.5)
        .stroke('#CCCCCC');
      
      // Footer text
      doc
        .fontSize(8)
        .font('Helvetica')
        .fillColor('#666666')
        .text(
          `${options.documentNumber} Rev. ${options.version}`,
          72,
          pageHeight - 50,
          { align: 'left' }
        );
      
      doc.text(
        `Page ${i + 1} of ${pages.count}`,
        72,
        pageHeight - 50,
        { align: 'center', width: pageWidth - 144 }
      );
      
      doc.text(
        options.effectiveDate,
        pageWidth - 144,
        pageHeight - 50,
        { align: 'right' }
      );
    }
  }

  private addWatermark(doc: PDFKit.PDFDocument, watermarkText: string): void {
    const pages = doc.bufferedPageRange();
    
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);
      
      const pageWidth = doc.page.width;
      const pageHeight = doc.page.height;
      
      // Add watermark in center at 45-degree angle
      doc.save();
      doc
        .translate(pageWidth / 2, pageHeight / 2)
        .rotate(-45, { origin: [0, 0] })
        .fontSize(60)
        .font('Helvetica-Bold')
        .fillColor('#EEEEEE', 0.3)
        .text(watermarkText, -200, 0, { align: 'center', width: 400 });
      doc.restore();
    }
  }
}

export const pdfGenerator = new PDFGenerator();
