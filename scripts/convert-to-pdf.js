#!/usr/bin/env node
/**
 * Convert DOCX to PDF
 */
const docxConverter = require('docx-pdf');
const path = require('path');

const inputFile = path.join(__dirname, '../output/FHDEV-QMS-BIP-001_v3.0.docx');
const outputFile = path.join(__dirname, '../output/FHDEV-QMS-BIP-001_v3.0.pdf');

console.log('Converting DOCX to PDF...');
console.log('Input:', inputFile);
console.log('Output:', outputFile);

docxConverter(inputFile, outputFile, (err, result) => {
  if (err) {
    console.error('Error converting to PDF:', err);
    process.exit(1);
  }
  console.log('PDF generated successfully:', outputFile);
});
