#!/usr/bin/env tsx
/**
 * Convert All ASCII Diagrams to SVG
 * Scans all QMS documentation and converts ASCII diagrams to high-quality SVG
 */

import fs from 'fs/promises';
import path from 'path';

interface ASCIIDiagram {
  content: string;
  file: string;
  lineStart: number;
  lineEnd: number;
  id: string;
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
  let diagramId = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for code block markers
    if (line.trim() === '```') {
      if (inCodeBlock && diagramLines.length > 0) {
        // Check if this looks like an ASCII diagram
        const diagramContent = diagramLines.join('\n');
        if (/[┌┐└┘├┤┬┴┼─│╔╗╚╝╠╣╦╩╬═║]/.test(diagramContent)) {
          const fileName = path.basename(filePath, '.md');
          diagrams.push({
            content: diagramContent,
            file: filePath,
            lineStart: diagramStart,
            lineEnd: i,
            id: `${fileName}-diagram-${diagramId++}`
          });
        }
        diagramLines = [];
        diagramStart = -1;
      }
      inCodeBlock = !inCodeBlock;
      if (inCodeBlock) {
        diagramStart = i + 1;
      }
      continue;
    }

    // Collect lines in code block
    if (inCodeBlock) {
      diagramLines.push(line);
    }
  }

  return diagrams;
}

/**
 * Convert ASCII diagram to SVG
 */
function asciiToSVG(ascii: string, id: string): string {
  const lines = ascii.split('\n');
  const maxWidth = Math.max(...lines.map(l => l.length), 1);
  const height = lines.length;

  const charWidth = 9;
  const charHeight = 18;
  const padding = 30;

  const svgWidth = maxWidth * charWidth + padding * 2;
  const svgHeight = height * charHeight + padding * 2;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="${svgWidth}"
     height="${svgHeight}"
     viewBox="0 0 ${svgWidth} ${svgHeight}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&amp;display=swap');
      .diagram-background {
        fill: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
      }
      .ascii-text {
        font-family: 'JetBrains Mono', 'Monaco', 'Menlo', 'Consolas', 'Courier New', monospace;
        font-size: 14px;
        fill: #2D5016;
        font-weight: 600;
      }
      .ascii-box {
        fill: none;
        stroke: #2D5016;
        stroke-width: 2.5;
        stroke-linecap: round;
      }
      .ascii-emphasis {
        fill: #101810;
        font-weight: 700;
      }
    </style>
    <filter id="shadow">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="#f8f9fa" rx="8"/>
  <rect x="10" y="10" width="${svgWidth - 20}" height="${svgHeight - 20}"
        fill="white" rx="4" filter="url(#shadow)"/>

  <!-- Diagram Content -->
  <g id="${id}" transform="translate(${padding}, ${padding})">
${lines.map((line, lineIndex) => {
  const y = lineIndex * charHeight + charHeight * 0.8;
  return `    <text x="0" y="${y}" class="ascii-text">${escapeXml(line)}</text>`;
}).join('\n')}
  </g>
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
 * Recursively find all markdown files
 */
async function findMarkdownFiles(dir: string, fileList: string[] = []): Promise<string[]> {
  const files = await fs.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(dir, file.name);

    if (file.isDirectory()) {
      if (file.name !== 'node_modules' && file.name !== 'assets' && file.name !== '.git') {
        await findMarkdownFiles(filePath, fileList);
      }
    } else if (file.isFile() && file.name.endsWith('.md')) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

/**
 * Update markdown file to reference SVG instead of ASCII
 */
async function updateMarkdownWithSVG(filePath: string, diagrams: ASCIIDiagram[], outputDir: string) {
  const content = await fs.readFile(filePath, 'utf-8');
  const lines = content.split('\n');
  let updatedLines = [...lines];

  // Sort diagrams by line number in reverse order to avoid offset issues
  const sortedDiagrams = [...diagrams].sort((a, b) => b.lineStart - a.lineStart);

  for (const diagram of sortedDiagrams) {
    const relativePath = path.relative(path.dirname(filePath), path.join(outputDir, `${diagram.id}.svg`));
    const replacement = [
      '',
      `<div align="center">`,
      `  <img src="${relativePath}" alt="${diagram.id}" width="90%" />`,
      `</div>`,
      '',
      '<details>',
      '<summary>View ASCII Source</summary>',
      '',
      '```',
      diagram.content,
      '```',
      '</details>',
      ''
    ];

    // Replace the code block with SVG reference
    updatedLines.splice(diagram.lineStart - 1, diagram.lineEnd - diagram.lineStart + 2, ...replacement);
  }

  await fs.writeFile(filePath, updatedLines.join('\n'));
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 Fort Homes QMS - ASCII Diagram Converter\n');
  console.log('Converting ASCII diagrams to high-quality SVG images...\n');

  const docsDir = path.join(process.cwd(), 'docs');
  const outputDir = path.join(process.cwd(), 'docs', 'assets', 'diagrams');

  // Create output directory
  await fs.mkdir(outputDir, { recursive: true });

  // Find all markdown files in docs directory
  const docsPath = path.join(process.cwd(), 'docs');
  const markdownFiles = await findMarkdownFiles(docsPath);

  let totalDiagrams = 0;
  let totalFiles = 0;
  const conversionMap: Map<string, ASCIIDiagram[]> = new Map();

  // First pass: Extract and convert all diagrams
  for (const filePath of markdownFiles) {
    try {
      const diagrams = await extractASCIIDiagrams(filePath);

      if (diagrams.length > 0) {
        console.log(`📄 ${path.relative(process.cwd(), filePath)}`);
        console.log(`   Found ${diagrams.length} diagram(s)`);

        for (const diagram of diagrams) {
          const outputPath = path.join(outputDir, `${diagram.id}.svg`);
          const svg = asciiToSVG(diagram.content, diagram.id);
          await fs.writeFile(outputPath, svg);
          console.log(`   ✓ ${diagram.id}.svg`);
          totalDiagrams++;
        }

        conversionMap.set(filePath, diagrams);
        totalFiles++;
        console.log('');
      }
    } catch (error) {
      console.error(`   ✗ Error processing ${path.relative(process.cwd(), filePath)}:`, error);
    }
  }

  // Second pass: Update markdown files to reference SVGs
  console.log('\n📝 Updating markdown files with SVG references...\n');
  for (const [filePath, diagrams] of conversionMap.entries()) {
    try {
      await updateMarkdownWithSVG(filePath, diagrams, outputDir);
      console.log(`   ✓ Updated ${path.relative(process.cwd(), filePath)}`);
    } catch (error) {
      console.error(`   ✗ Error updating ${filePath}:`, error);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Conversion Complete!');
  console.log('='.repeat(60));
  console.log(`📊 Statistics:`);
  console.log(`   • Files processed: ${totalFiles}`);
  console.log(`   • Diagrams converted: ${totalDiagrams}`);
  console.log(`   • Output directory: ${outputDir}`);
  console.log('='.repeat(60) + '\n');
}

main().catch(console.error);
