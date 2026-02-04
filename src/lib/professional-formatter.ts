/**
 * Professional Document Formatter
 * Provides ISO-style formatting utilities for print-friendly QMS documents
 */

export interface DocumentMetadata {
  documentId: string;
  title: string;
  revision: string;
  effectiveDate: string;
  processOwner: string;
  classification: string;
  reviewDate?: string;
  approvedBy?: string;
  approvedDate?: string;
}

export class ProfessionalFormatter {
  /**
   * Generate professional document header with ISO-style layout
   */
  static generateDocumentHeader(metadata: DocumentMetadata): string {
    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    return `<style>
@media print {
  body { 
    font-family: 'Arial', 'Helvetica', sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #000;
    margin: 0;
    padding: 0;
  }
  
  .page {
    page-break-after: always;
    margin: 1in;
  }
  
  .no-break {
    page-break-inside: avoid;
  }
  
  .header-box {
    border: 2px solid #000;
    padding: 0;
    margin-bottom: 20pt;
    page-break-inside: avoid;
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
    page-break-inside: avoid;
  }
  
  th, td {
    border: 1px solid #000;
    padding: 8pt;
    text-align: left;
  }
  
  th {
    background-color: #e0e0e0;
    font-weight: bold;
  }
  
  .signature-block {
    border: 1px solid #000;
    padding: 10pt;
    margin-top: 20pt;
    page-break-inside: avoid;
  }
  
  h1 {
    font-size: 18pt;
    font-weight: bold;
    margin-top: 20pt;
    margin-bottom: 10pt;
    page-break-after: avoid;
  }
  
  h2 {
    font-size: 14pt;
    font-weight: bold;
    margin-top: 16pt;
    margin-bottom: 8pt;
    page-break-after: avoid;
  }
  
  h3 {
    font-size: 12pt;
    font-weight: bold;
    margin-top: 12pt;
    margin-bottom: 6pt;
    page-break-after: avoid;
  }
  
  @page {
    size: letter;
    margin: 1in;
    @bottom-center {
      content: "Page " counter(page) " of " counter(pages);
    }
    @bottom-right {
      content: "${metadata.documentId} Rev. ${metadata.revision}";
      font-size: 9pt;
    }
    @bottom-left {
      content: "${today}";
      font-size: 9pt;
    }
  }
}

@media screen {
  .document-container {
    max-width: 8.5in;
    margin: 20px auto;
    background: white;
    padding: 1in;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
}

.header-box {
  border: 2px solid #333;
  margin-bottom: 20px;
  background: #fff;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 2px solid #333;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
}

.company-info {
  flex: 1;
}

.company-name {
  font-size: 20pt;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 0;
  color: #2D5016;
}

.company-tagline {
  font-size: 11pt;
  color: #666;
  margin: 5px 0 0 0;
}

.logo-placeholder {
  width: 100px;
  height: 60px;
  border: 1px dashed #999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9pt;
  color: #999;
  text-align: center;
}

.document-title-section {
  padding: 20px;
  text-align: center;
  border-bottom: 2px solid #333;
  background: white;
}

.document-title {
  font-size: 16pt;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 0 10px 0;
  letter-spacing: 1px;
}

.document-subtitle {
  font-size: 12pt;
  color: #666;
  margin: 0;
}

.control-info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0;
  border-collapse: collapse;
}

.control-cell {
  padding: 10px 15px;
  border-right: 1px solid #333;
  border-bottom: 1px solid #333;
}

.control-cell:nth-child(3n) {
  border-right: none;
}

.control-cell:nth-last-child(-n+3) {
  border-bottom: none;
}

.control-label {
  font-size: 9pt;
  font-weight: bold;
  text-transform: uppercase;
  color: #666;
  margin-bottom: 3px;
  display: block;
}

.control-value {
  font-size: 11pt;
  font-weight: normal;
  color: #000;
}

.classification-badge {
  background: #4CAF50;
  color: white;
  padding: 3px 12px;
  border-radius: 3px;
  font-weight: bold;
  font-size: 9pt;
  display: inline-block;
}

.signature-block {
  border: 1px solid #333;
  padding: 15px;
  margin-top: 30px;
  page-break-inside: avoid;
}

.signature-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.signature-field {
  flex: 1;
  margin: 0 10px;
}

.signature-label {
  font-size: 10pt;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
}

.signature-line {
  border-bottom: 1px solid #000;
  height: 30px;
  margin-bottom: 5px;
}

.signature-date {
  font-size: 9pt;
  color: #666;
}

table.professional {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
}

table.professional th {
  background: linear-gradient(135deg, #2D5016 0%, #1a2f0d 100%);
  color: white;
  padding: 10px;
  text-align: left;
  font-weight: bold;
  font-size: 10pt;
  border: 1px solid #333;
}

table.professional td {
  padding: 8px 10px;
  border: 1px solid #666;
  font-size: 10pt;
}

table.professional tr:nth-child(even) {
  background-color: #f9f9f9;
}

.document-footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 2px solid #333;
  font-size: 9pt;
  color: #666;
}

.confidentiality-notice {
  background: #fff3cd;
  border-left: 4px solid #ff9800;
  padding: 15px;
  margin: 20px 0;
  page-break-inside: avoid;
}

.section-number {
  font-weight: bold;
  color: #2D5016;
}
</style>

<div class="document-container">
  <div class="header-box no-break">
    <div class="header-top">
      <div class="company-info">
        <div class="company-name">FORT HOMES LLC</div>
        <div class="company-tagline">Quality Management System</div>
      </div>
      <div class="logo-placeholder">
        [Company Logo]
      </div>
    </div>
    
    <div class="document-title-section">
      <div class="document-title">${metadata.title}</div>
      <div class="document-subtitle">Quality Management System Documentation</div>
    </div>
    
    <div class="control-info">
      <div class="control-cell">
        <span class="control-label">Document ID</span>
        <span class="control-value">${metadata.documentId}</span>
      </div>
      <div class="control-cell">
        <span class="control-label">Revision</span>
        <span class="control-value">${metadata.revision}</span>
      </div>
      <div class="control-cell">
        <span class="control-label">Effective Date</span>
        <span class="control-value">${metadata.effectiveDate}</span>
      </div>
      <div class="control-cell">
        <span class="control-label">Process Owner</span>
        <span class="control-value">${metadata.processOwner}</span>
      </div>
      <div class="control-cell">
        <span class="control-label">Classification</span>
        <span class="control-value"><span class="classification-badge">${metadata.classification}</span></span>
      </div>
      <div class="control-cell">
        <span class="control-label">Next Review</span>
        <span class="control-value">${metadata.reviewDate || 'Annual'}</span>
      </div>
    </div>
  </div>
`;
  }

  /**
   * Generate signature block for document approval
   */
  static generateSignatureBlock(roles: string[]): string {
    const fields = roles.map(role => `
    <div class="signature-field">
      <div class="signature-label">${role}</div>
      <div class="signature-line"></div>
      <div class="signature-date">Name: ___________________ Date: ___________</div>
    </div>
    `).join('');

    return `
<div class="signature-block no-break">
  <h3 style="margin-top: 0;">Document Approval</h3>
  <p style="font-size: 10pt; margin-bottom: 20px;">
    I certify that this document has been reviewed and approved in accordance with 
    Fort Homes LLC Quality Management System procedures.
  </p>
  <div class="signature-row">
    ${fields}
  </div>
</div>
`;
  }

  /**
   * Generate professional table
   */
  static generateTable(headers: string[], rows: string[][]): string {
    const headerRow = headers.map(h => `<th>${h}</th>`).join('');
    const bodyRows = rows.map(row => 
      `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
    ).join('');

    return `
<table class="professional no-break">
  <thead>
    <tr>${headerRow}</tr>
  </thead>
  <tbody>
    ${bodyRows}
  </tbody>
</table>
`;
  }

  /**
   * Generate document footer
   */
  static generateDocumentFooter(metadata: DocumentMetadata): string {
    return `
<div class="document-footer">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <div>
      <strong>Document Control Information</strong><br>
      Document ID: ${metadata.documentId} | Revision: ${metadata.revision}<br>
      Printed: ${new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}
    </div>
    <div style="text-align: right;">
      <strong>Fort Homes LLC</strong><br>
      Grand Junction, Colorado<br>
      Quality Management System
    </div>
  </div>
  
  <div class="confidentiality-notice" style="margin-top: 15px;">
    <strong>CONFIDENTIALITY NOTICE:</strong> This document contains proprietary information 
    and is intended only for authorized Fort Homes LLC personnel. Unauthorized distribution, 
    copying, or disclosure is strictly prohibited.
  </div>
</div>
</div>
`;
  }

  /**
   * Format section number in ISO style (e.g., 4.2.1)
   */
  static formatSectionNumber(major: number, minor?: number, sub?: number): string {
    let number = `<span class="section-number">${major}`;
    if (minor !== undefined) number += `.${minor}`;
    if (sub !== undefined) number += `.${sub}`;
    number += '</span>';
    return number;
  }

  /**
   * Generate form with professional layout
   */
  static generateFormLayout(formId: string, title: string, fields: any[]): string {
    return `
${this.generateDocumentHeader({
  documentId: formId,
  title: title,
  revision: '2.0',
  effectiveDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  processOwner: 'QA Manager',
  classification: 'CONTROLLED'
})}

<div style="margin: 30px 0;">
  ${fields.map(field => this.generateFormField(field)).join('\n')}
</div>

${this.generateDocumentFooter({
  documentId: formId,
  title: title,
  revision: '2.0',
  effectiveDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  processOwner: 'QA Manager',
  classification: 'CONTROLLED'
})}
`;
  }

  /**
   * Generate individual form field
   */
  private static generateFormField(field: any): string {
    return `
<div class="no-break" style="margin: 15px 0; padding: 10px; border: 1px solid #ddd; background: #fafafa;">
  <label style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 10pt;">
    ${field.label}${field.required ? '<span style="color: red;">*</span>' : ''}
  </label>
  <div style="border-bottom: 1px solid #333; min-height: 25px; padding: 5px;">
    ${field.placeholder || ''}
  </div>
  ${field.helpText ? `<div style="font-size: 9pt; color: #666; margin-top: 3px;">${field.helpText}</div>` : ''}
</div>
`;
  }
}

export default ProfessionalFormatter;
