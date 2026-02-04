/**
 * Review Agent
 * Fort Homes QMS - Automated document review and improvement suggestions
 */

import { BaseAgent, AgentConfig } from './base-agent';

export interface ReviewResult {
  score: number;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
}

export class ReviewAgent extends BaseAgent {
  constructor() {
    super({
      name: 'ReviewAgent',
      description: 'Automated document review and quality assessment',
      temperature: 0.5,
      maxTokens: 2000,
    });
  }

  /**
   * Execute document review
   */
  async execute(documentContent: string, documentType: string): Promise<ReviewResult> {
    console.log(`Reviewing ${documentType} document...`);

    const strengths: string[] = [];
    const improvements: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    // Check document structure
    if (documentContent.match(/^---\s*$/m)) {
      strengths.push('Has proper YAML frontmatter');
    } else {
      improvements.push('Add YAML frontmatter for metadata');
      score -= 5;
    }

    // Check for headers
    const h1Count = (documentContent.match(/^# /gm) || []).length;
    const h2Count = (documentContent.match(/^## /gm) || []).length;
    
    if (h2Count >= 3) {
      strengths.push('Good use of section headers for organization');
    } else {
      improvements.push('Add more section headers for better organization');
      score -= 3;
    }

    // Check for visual elements
    if (documentContent.includes('```mermaid')) {
      strengths.push('Includes visual diagrams');
    } else {
      suggestions.push('Consider adding Mermaid diagrams for visual clarity');
    }

    // Check for tables
    if (documentContent.includes('|')) {
      strengths.push('Uses tables for structured data');
    }

    // Check content length
    const wordCount = documentContent.split(/\s+/).length;
    if (wordCount < 200) {
      improvements.push('Document seems too brief; consider adding more detail');
      score -= 5;
    } else if (wordCount > 5000) {
      suggestions.push('Consider breaking into multiple documents if possible');
    }

    // Check for emojis (brand style)
    if (documentContent.match(/[📋🎯👥📐🔧📝⚠️🚫📄🔗📊]/)) {
      strengths.push('Uses emoji icons per brand guidelines');
    } else {
      suggestions.push('Add emoji icons for visual consistency with brand');
    }

    // Check for proper hold point references
    if (documentType.includes('SOP') || documentType.includes('WI')) {
      if (documentContent.match(/HP-[1-8]/)) {
        strengths.push('Properly references hold points');
      } else {
        improvements.push('Add hold point references');
        score -= 3;
      }
    }

    // Check for revision history
    if (documentContent.match(/revision\s+history/i)) {
      strengths.push('Includes revision history');
    } else {
      improvements.push('Add revision history section');
      score -= 2;
    }

    // Check for related documents section
    if (documentContent.match(/related\s+documents/i)) {
      strengths.push('Cross-references related documents');
    } else {
      suggestions.push('Add related documents section for traceability');
    }

    score = Math.max(0, Math.min(100, score));

    console.log(`✓ Review complete: Score ${score}/100`);

    return {
      score,
      strengths,
      improvements,
      suggestions,
    };
  }

  /**
   * Generate review report
   */
  generateReport(result: ReviewResult): string {
    let report = `# Document Review Report\n\n`;
    report += `**Quality Score:** ${result.score}/100\n\n`;

    if (result.strengths.length > 0) {
      report += `## ✅ Strengths\n\n`;
      result.strengths.forEach(s => report += `- ${s}\n`);
      report += `\n`;
    }

    if (result.improvements.length > 0) {
      report += `## 🔧 Required Improvements\n\n`;
      result.improvements.forEach(i => report += `- ${i}\n`);
      report += `\n`;
    }

    if (result.suggestions.length > 0) {
      report += `## 💡 Suggestions\n\n`;
      result.suggestions.forEach(s => report += `- ${s}\n`);
      report += `\n`;
    }

    return report;
  }
}

export default ReviewAgent;
