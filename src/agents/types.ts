/**
 * Agent Types and Interfaces
 * Core types for the AI agent framework
 */

export interface AgentConfig {
  name: string;
  description: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AgentMemory {
  shortTerm: Map<string, any>;
  longTerm: Map<string, any>;
}

export interface AgentToolkit {
  name: string;
  description: string;
  execute: (input: any) => Promise<any>;
}

export interface AgentResult {
  success: boolean;
  content?: any;
  error?: string;
  metadata?: Record<string, any>;
}

export interface DocumentGenerationRequest {
  type: 'manual' | 'sop' | 'wi' | 'form';
  phase?: number;
  holdPointId?: string;
  customData?: Record<string, any>;
}

export interface ComplianceCheckRequest {
  documentType: string;
  content: string;
  regulations: string[];
}

export interface VisualGenerationRequest {
  type: 'flowchart' | 'checklist' | 'diagram' | 'chart';
  data: any;
  format: 'mermaid' | 'svg' | 'png';
}

export abstract class BaseAgent {
  protected config: AgentConfig;
  protected memory: AgentMemory;

  constructor(config: AgentConfig) {
    this.config = config;
    this.memory = {
      shortTerm: new Map(),
      longTerm: new Map(),
    };
  }

  abstract execute(input: any): Promise<AgentResult>;

  protected log(message: string): void {
    console.log(`[${this.config.name}] ${message}`);
  }

  protected setMemory(key: string, value: any, longTerm: boolean = false): void {
    if (longTerm) {
      this.memory.longTerm.set(key, value);
    } else {
      this.memory.shortTerm.set(key, value);
    }
  }

  protected getMemory(key: string, longTerm: boolean = false): any {
    return longTerm
      ? this.memory.longTerm.get(key)
      : this.memory.shortTerm.get(key);
  }
}
