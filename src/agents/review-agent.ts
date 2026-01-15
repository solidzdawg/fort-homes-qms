/**
 * Review Agent
 * Automated document review and improvement suggestions
 */

import { BaseAgent, AgentConfig, AgentResult } from './types';

export class ReviewAgent extends BaseAgent {
  constructor() {
    super({
      name: 'ReviewAgent',
      description: 'Reviews documents and provides improvement suggestions',
      temperature: 0.4,
      maxTokens: 1500,
    });
  }

  async execute(input: any): Promise<AgentResult> {
    try {
      this.log(`Reviewing document: ${input.documentNumber || 'unknown'}`);

      const review = await this.reviewDocument(input);

      return {
        success: true,
        content: review,
        metadata: {
          reviewedAt: new Date().toISOString(),
          agent: this.config.name,
        },
      };
    } catch (error) {
      this.log(`Error: ${error}`);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private async reviewDocument(input: any): Promise<any> {
    const content = input.content || '';
    const documentType = input.documentType || input.type || 'unknown';

    const issues = [];
    const suggestions = [];

    // Check document completeness
    const completeness = this.checkCompleteness(content, documentType);
    if (!completeness.complete) {
      issues.push(...completeness.missing);
    }

    // Check clarity and readability
    const clarity = this.checkClarity(content);
    suggestions.push(...clarity.suggestions);

    // Check for consistency
    const consistency = this.checkConsistency(content);
    if (!consistency.consistent) {
      issues.push(...consistency.issues);
    }

    // Check for technical accuracy
    const technical = this.checkTechnicalAccuracy(content, documentType);
    suggestions.push(...technical.suggestions);

    // Check formatting and structure
    const formatting = this.checkFormatting(content, documentType);
    if (!formatting.wellFormatted) {
      suggestions.push(...formatting.suggestions);
    }

    // Overall assessment
    const score = this.calculateQualityScore(issues.length, suggestions.length);

    return {
      documentNumber: input.documentNumber,
      documentType,
      reviewDate: new Date().toISOString(),
      qualityScore: score,
      overallAssessment: this.getAssessment(score),
      issues: issues,
      suggestions: suggestions,
      recommendations: this.generateRecommendations(issues, suggestions),
    };
  }

  private checkCompleteness(content: string, docType: string): any {
    const missing = [];

    // Check for required sections based on document type
    if (docType === 'sop' || docType === 'manual') {
      if (!content.includes('PURPOSE') && !content.includes('Purpose')) {
        missing.push('Missing PURPOSE section');
      }
      if (!content.includes('SCOPE') && !content.includes('Scope')) {
        missing.push('Missing SCOPE section');
      }
      if (!content.includes('RESPONSIBILITIES') && !content.includes('Responsibilities')) {
        missing.push('Missing RESPONSIBILITIES section');
      }
      if (!content.includes('PROCEDURE') && !content.includes('Procedure')) {
        missing.push('Missing PROCEDURE section');
      }
      if (!content.includes('REFERENCES') && !content.includes('References')) {
        missing.push('Missing REFERENCES section');
      }
    }

    if (docType === 'wi') {
      if (!content.includes('STEP') && !content.includes('Step')) {
        missing.push('Missing step-by-step instructions');
      }
      if (!content.includes('SAFETY') && !content.includes('Safety')) {
        missing.push('Missing safety precautions');
      }
      if (!content.includes('TOOLS') && !content.includes('Tools')) {
        missing.push('Missing tools and materials list');
      }
    }

    return {
      complete: missing.length === 0,
      missing,
    };
  }

  private checkClarity(content: string): any {
    const suggestions = [];

    // Check sentence length (flag very long sentences)
    const sentences = content.split(/[.!?]+/);
    const longSentences = sentences.filter((s) => s.split(' ').length > 30).length;
    if (longSentences > 3) {
      suggestions.push('Consider breaking down some long sentences for better readability');
    }

    // Check for passive voice indicators
    const passiveIndicators = ['is being', 'was being', 'will be', 'has been', 'have been'];
    const passiveCount = passiveIndicators.filter((ind) =>
      content.toLowerCase().includes(ind)
    ).length;
    if (passiveCount > 5) {
      suggestions.push('Consider using active voice to improve clarity');
    }

    // Check for jargon without explanation
    const jargon = ['TPIA', 'NCR', 'CAPA', 'SOP', 'WI', 'HP'];
    const unexplainedJargon = jargon.filter(
      (term) =>
        content.includes(term) && !content.toLowerCase().includes(term.toLowerCase() + ' (')
    );
    if (unexplainedJargon.length > 0) {
      suggestions.push(
        `Consider defining acronyms on first use: ${unexplainedJargon.join(', ')}`
      );
    }

    return { suggestions };
  }

  private checkConsistency(content: string): any {
    const issues = [];

    // Check for inconsistent terminology
    const terminologyPairs = [
      ['module', 'unit'],
      ['inspection', 'check'],
      ['approval', 'authorization'],
    ];

    for (const [term1, term2] of terminologyPairs) {
      const regex1 = new RegExp(term1, 'gi');
      const regex2 = new RegExp(term2, 'gi');
      const count1 = (content.match(regex1) || []).length;
      const count2 = (content.match(regex2) || []).length;

      if (count1 > 0 && count2 > 0 && Math.abs(count1 - count2) < 3) {
        issues.push(
          `Inconsistent terminology: '${term1}' and '${term2}' both used - standardize on one term`
        );
      }
    }

    return {
      consistent: issues.length === 0,
      issues,
    };
  }

  private checkTechnicalAccuracy(content: string, docType: string): any {
    const suggestions = [];

    // Check for specific measurements
    if (docType === 'wi' || docType === 'sop') {
      if (!content.includes('±') && !content.includes('tolerance')) {
        suggestions.push('Consider adding dimensional tolerances for critical measurements');
      }
    }

    // Check for safety callouts
    if (!content.includes('PPE') && !content.includes('personal protective equipment')) {
      if (docType === 'wi' || content.toLowerCase().includes('safety')) {
        suggestions.push('Consider adding specific PPE requirements');
      }
    }

    // Check for regulatory references
    const hasRegReferences =
      content.includes('IRC') ||
      content.includes('NEC') ||
      content.includes('IPC') ||
      content.includes('HUD') ||
      content.includes('CDOH');

    if (!hasRegReferences && (docType === 'sop' || docType === 'manual')) {
      suggestions.push('Consider adding relevant regulatory code references');
    }

    return { suggestions };
  }

  private checkFormatting(content: string, docType: string): any {
    const suggestions = [];

    // Check for numbered lists
    const hasNumbering = /\d+\./.test(content);
    if (!hasNumbering && docType === 'wi') {
      suggestions.push('Consider using numbered steps for procedures');
    }

    // Check for checkboxes in appropriate docs
    const hasCheckboxes = /\[[ x]\]/.test(content);
    if (!hasCheckboxes && docType === 'form') {
      suggestions.push('Consider adding checkboxes for verification items');
    }

    // Check for headers/sections
    const hasHeaders = /^#{1,6}\s/m.test(content) || /^[A-Z\s]+$/m.test(content);
    if (!hasHeaders) {
      suggestions.push('Consider adding section headers for better organization');
    }

    return {
      wellFormatted: suggestions.length === 0,
      suggestions,
    };
  }

  private calculateQualityScore(issueCount: number, suggestionCount: number): number {
    // Score from 0-100
    const baseScore = 100;
    const issueDeduction = issueCount * 10; // Each issue -10 points
    const suggestionDeduction = suggestionCount * 3; // Each suggestion -3 points

    return Math.max(0, baseScore - issueDeduction - suggestionDeduction);
  }

  private getAssessment(score: number): string {
    if (score >= 90) return 'Excellent - Ready for approval';
    if (score >= 80) return 'Good - Minor improvements suggested';
    if (score >= 70) return 'Acceptable - Revisions recommended';
    if (score >= 60) return 'Needs Improvement - Significant revisions needed';
    return 'Poor - Major rework required';
  }

  private generateRecommendations(issues: string[], suggestions: string[]): string[] {
    const recommendations = [];

    if (issues.length > 0) {
      recommendations.push(
        'Address all identified issues before submitting for approval'
      );
    }

    if (suggestions.length > 3) {
      recommendations.push(
        'Review suggestions and implement those that improve document quality'
      );
    }

    if (issues.length === 0 && suggestions.length === 0) {
      recommendations.push('Document meets quality standards - recommend approval');
    }

    return recommendations;
  }
}
