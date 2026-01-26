#!/usr/bin/env tsx
/**
 * ASCII to SVG Converter
 * Converts ASCII box diagrams to high-quality SVG images
 */

import fs from 'fs/promises';
import path from 'path';

interface ASCIIDiagram {
  content: string;
  file: string;
  lineStart: number;
  lineEnd: number;
}

/**
 * Extract ASCII diagrams from markdown files
 */
async function extractASCIIDiagrams(filePath: string): Promise<ASCIIDiagram[]> {
  const content = await fs.readFile(filePath, 'utf-8');
  const lines = content.split('\n');
  const diagrams: ASCIIDiagram[] = [];

  let inCodeBlock = false;
  let diagramStart = -1;
  let diagramLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for code block markers
    if (line.trim() === '```') {
      if (inCodeBlock && diagramLines.length > 0) {
        // End of code block
        diagrams.push({
          content: diagramLines.join('\n'),
          file: filePath,
          lineStart: diagramStart,
          lineEnd: i
        });
        diagramLines = [];
        diagramStart = -1;
      }
      inCodeBlock = !inCodeBlock;
      if (inCodeBlock) {
        diagramStart = i;
      }
      continue;
    }

    // Collect lines in code block that contain box drawing characters
    if (inCodeBlock && /[┌┐└┘├┤┬┴┼─│╔╗╚╝╠╣╦╩╬═║]/.test(line)) {
      if (diagramLines.length === 0) {
        diagramStart = i;
      }
      diagramLines.push(line);
    } else if (inCodeBlock && diagramLines.length > 0 && line.trim() === '') {
      diagramLines.push(line);
    } else if (inCodeBlock && diagramLines.length > 0 && !/[┌┐└┘├┤┬┴┼─│╔╗╚╝╠╣╦╩╬═║]/.test(line) && line.trim() !== '') {
      // Check if we should continue or end
      if (/^[│\s]*[A-Za-z0-9]/.test(line)) {
        diagramLines.push(line);
      }
    }
  }

  return diagrams;
}

/**
 * Convert ASCII diagram to SVG using monospace rendering
 */
function asciiToSVG(ascii: string, outputPath: string, options = {
  charWidth: 8.4,
  charHeight: 16,
  padding: 20,
  fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
  fontSize: 14,
  strokeColor: '#2D5016',
  fillColor: '#101810',
  textColor: '#FFFFFF',
  backgroundColor: 'transparent'
}): string {
  const lines = ascii.split('\n');
  const maxWidth = Math.max(...lines.map(l => l.length));
  const height = lines.length;

  const svgWidth = maxWidth * options.charWidth + options.padding * 2;
  const svgHeight = height * options.charHeight + options.padding * 2;

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="${svgWidth}"
     height="${svgHeight}"
     viewBox="0 0 ${svgWidth} ${svgHeight}">
  <defs>
    <style>
      .ascii-text {
        font-family: ${options.fontFamily};
        font-size: ${options.fontSize}px;
        fill: ${options.textColor};
        white-space: pre;
      }
      .box-char {
        fill: none;
        stroke: ${options.strokeColor};
        stroke-width: 2;
      }
    </style>
  </defs>
  <rect width="100%" height="100%" fill="${options.backgroundColor}"/>
  <g id="ascii-diagram">
`;

  // Render each line
  lines.forEach((line, lineIndex) => {
    const y = options.padding + lineIndex * options.charHeight + options.charHeight * 0.75;

    // Split into box-drawing chars and regular text
    let currentX = options.padding;
    let textBuffer = '';
    let textStartX = currentX;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const x = options.padding + i * options.charWidth;

      // Box drawing characters
      if (/[┌┐└┘├┤┬┴┼─│╔╗╚╝╠╣╦╩╬═║]/.test(char)) {
        // Flush text buffer first
        if (textBuffer) {
          svg += `    <text x="${textStartX}" y="${y}" class="ascii-text">${escapeXml(textBuffer)}</text>\n`;
          textBuffer = '';
        }

        // Draw box character as text (simpler approach)
        svg += `    <text x="${x}" y="${y}" class="ascii-text" fill="${options.strokeColor}">${escapeXml(char)}</text>\n`;
        textStartX = x + options.charWidth;
      } else {
        // Regular character - add to buffer
        if (textBuffer === '') {
          textStartX = x;
        }
        textBuffer += char;
      }
    }

    // Flush remaining text
    if (textBuffer) {
      svg += `    <text x="${textStartX}" y="${y}" class="ascii-text">${escapeXml(textBuffer)}</text>\n`;
    }
  });

  svg += `  </g>
</svg>`;

  return svg;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Main execution
 */
async function main() {
  const docsDir = path.join(process.cwd(), 'docs');
  const outputDir = path.join(process.cwd(), 'docs', 'assets', 'diagrams');

  // Create output directory
  await fs.mkdir(outputDir, { recursive: true });

  // Find all markdown files with ASCII diagrams
  const files = [
    'docs/manual/QMS-000-Master-Index.md',
    'docs/manual/QMS-001-Context-Stakeholders.md',
  ];

  let totalDiagrams = 0;

  for (const file of files) {
    const filePath = path.join(process.cwd(), file);
    try {
      const diagrams = await extractASCIIDiagrams(filePath);
      console.log(`Found ${diagrams.length} diagrams in ${file}`);

      for (let i = 0; i < diagrams.length; i++) {
        const diagram = diagrams[i];
        const fileName = path.basename(file, '.md');
        const outputFileName = `${fileName}-diagram-${i + 1}.svg`;
        const outputPath = path.join(outputDir, outputFileName);

        const svg = asciiToSVG(diagram.content, outputPath);
        await fs.writeFile(outputPath, svg);

        console.log(`  ✓ Generated: ${outputFileName}`);
        totalDiagrams++;
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  console.log(`\n✓ Total diagrams converted: ${totalDiagrams}`);
  console.log(`✓ Output directory: ${outputDir}`);
}

main().catch(console.error);
