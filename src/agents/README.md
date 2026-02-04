# Fort Homes QMS - AI Agents System

This directory contains the AI agent framework for autonomous QMS document generation and management.

## 🤖 Available Agents

### BaseAgent
Base class providing common functionality for all agents:
- Context loading from data files
- Database operations
- Audit trail creation
- Template and document reading

### ManualAgent
**Purpose:** Generates Quality Manual sections  
**Capabilities:**
- Generate all QMS manual sections (QMS-000 through QMS-009)
- Load existing documents from `docs/manual/`
- Follow QMS framework structure
- Store documents in database with audit trail

**Usage:**
```typescript
import { ManualAgent } from './agents';

const agent = new ManualAgent();
const sections = await agent.execute(); // Generate all sections
const section = await agent.execute('QMS-001'); // Generate specific section
```

### ProcedureAgent
**Purpose:** Generates Standard Operating Procedures (SOPs) and Work Instructions (WIs)  
**Capabilities:**
- Generate phase-specific SOPs (SOP-101 through SOP-108)
- Generate phase-specific Work Instructions (WI-101 through WI-108)
- Include hold point inspection criteria
- Reference TPIA requirements for HP-4 and HP-8
- Load existing documents from `docs/sops/` and `docs/work-instructions/`

**Usage:**
```typescript
import { ProcedureAgent } from './agents';

const agent = new ProcedureAgent();
const sops = await agent.execute('sop'); // Generate all SOPs
const sop = await agent.execute('sop', 4); // Generate SOP for Phase 4
const wis = await agent.execute('wi'); // Generate all WIs
```

### ComplianceAgent
**Purpose:** Validates documents against Colorado DOH regulations and industry standards  
**Capabilities:**
- Check for ISO 9001 references (should not be present)
- Verify Colorado regulation references (8 CCR 1302-14)
- Validate TPIA requirements for critical hold points
- Check document structure and completeness
- Generate compliance scores and reports

**Usage:**
```typescript
import { ComplianceAgent } from './agents';

const agent = new ComplianceAgent();
const result = await agent.execute(documentContent, 'SOP-104');
console.log(`Compliance Score: ${result.score}%`);
console.log(`Is Compliant: ${result.isCompliant}`);
```

### VisualAgent
**Purpose:** Generates Mermaid.js diagrams and visual process documentation  
**Capabilities:**
- Production phase flowcharts
- Sequence diagrams for inspection processes
- Gantt charts for production schedules
- SIPOC diagrams
- Organizational charts
- Phase-specific process flows

**Usage:**
```typescript
import { VisualAgent } from './agents';

const agent = new VisualAgent();
const flowchart = await agent.execute({
  type: 'flowchart',
  title: 'Production Process Flow'
});

const phaseFlow = agent.generatePhaseFlowchart(4);
```

### ReviewAgent
**Purpose:** Automated document review and quality assessment  
**Capabilities:**
- Structure validation
- Content completeness checks
- Style guide compliance
- Cross-reference verification
- Quality scoring (0-100)
- Actionable improvement suggestions

**Usage:**
```typescript
import { ReviewAgent } from './agents';

const agent = new ReviewAgent();
const review = await agent.execute(documentContent, 'SOP-104');
console.log(`Review Score: ${review.score}%`);
console.log('Improvements:', review.improvements);
```

### AuditAgent
**Purpose:** Tracks document versions and maintains comprehensive audit trail  
**Capabilities:**
- Create audit trail entries
- Track document changes
- Generate audit reports
- Version history tracking
- User activity monitoring

**Usage:**
```typescript
import { AuditAgent } from './agents';

const agent = new AuditAgent();
await agent.execute(documentId, 'updated', changes, 'user123', 'John Doe');

const trail = await agent.getAuditTrail(documentId);
const report = await agent.generateReport(documentId);
```

### Orchestrator
**Purpose:** Coordinates all agents for complex workflows  
**Capabilities:**
- Generate complete QMS documentation suite
- Generate specific document types
- Coordinate multi-agent workflows
- Run compliance and review checks
- Generate comprehensive reports

**Usage:**
```typescript
import { orchestrator } from './agents';

// Generate everything
const result = await orchestrator.execute('generate-all');

// Generate specific document types
await orchestrator.execute('generate-manual');
await orchestrator.execute('generate-sops');
await orchestrator.execute('generate-wis');
await orchestrator.execute('generate-phase', { phase: 4 });

// Validate document
const validation = await orchestrator.validateDocument(content, 'SOP-104');
```

## 📋 Command Line Interface

The CLI tool provides easy access to all agent functionality:

```bash
# Generate documents
npx tsx src/cli.ts generate all          # Generate everything
npx tsx src/cli.ts generate manual       # Generate Quality Manual
npx tsx src/cli.ts generate sop          # Generate all SOPs
npx tsx src/cli.ts generate sop 4        # Generate SOP for Phase 4
npx tsx src/cli.ts generate wi           # Generate all Work Instructions
npx tsx src/cli.ts generate wi 4         # Generate WI for Phase 4

# Database operations
npx tsx src/cli.ts db status             # Check database status
npx tsx src/cli.ts db list               # List all documents

# Validation
npx tsx src/cli.ts validate docs/sops/SOP-104.md

# Audit trail
npx tsx src/cli.ts audit                 # Recent activity
npx tsx src/cli.ts audit doc-id-123      # Specific document
```

Or use the npm scripts:

```bash
npm run qms-generate all
npm run qms-generate manual
npm run qms-generate sop 4
npm run qms-generate wi 4
```

## 🗄️ Database Schema

The agents use Prisma ORM with SQLite (development) or PostgreSQL (production):

**Key Models:**
- `Document` - All QMS documents with versioning
- `AuditTrail` - Complete change history
- `Procedure` - Production procedures by phase
- `HoldPoint` - Quality gate definitions
- `NCR` - Nonconformance records
- `CAPA` - Corrective/preventive actions
- `TrainingRecord` - Employee training tracking
- `QualityMetric` - KPIs and performance metrics
- `Supplier` - Approved supplier list
- `Module` - Production tracking

## 🔧 Configuration

### Environment Variables

Required environment variables (`.env`):

```env
DATABASE_URL="file:./dev.db"  # SQLite for dev
# DATABASE_URL="postgresql://..." # PostgreSQL for prod

PDF_OUTPUT_PATH="./output/pdf"
DOCX_OUTPUT_PATH="./output/docx"
```

### Data Files

Agents load context from JSON files in `data/`:
- `company-info.json` - Company details, personnel, regulatory info
- `phases.json` - 8 production phase definitions
- `hold-points.json` - Quality gate inspection criteria
- `itps.json` - Inspection Test Plan specifications

## 📊 Workflow Examples

### Generate Complete QMS Package

```typescript
import { orchestrator } from './agents';

const result = await orchestrator.execute('generate-all');

if (result.success) {
  console.log(`Generated ${result.documents.length} documents`);
} else {
  console.error('Errors:', result.errors);
}
```

### Generate and Validate Single Document

```typescript
import { ProcedureAgent, ComplianceAgent, ReviewAgent } from './agents';

// Generate
const procAgent = new ProcedureAgent();
const [sop] = await procAgent.execute('sop', 4);

// Validate compliance
const compAgent = new ComplianceAgent();
const compliance = await compAgent.execute(sop.content, sop.number);

// Review quality
const reviewAgent = new ReviewAgent();
const review = await reviewAgent.execute(sop.content, sop.number);

// Save if acceptable
if (compliance.isCompliant && review.score >= 80) {
  // Save to file or database
}
```

### Track Document Changes

```typescript
import { AuditAgent } from './agents';

const audit = new AuditAgent();

// Create audit entry
await audit.execute(
  'doc-id-123',
  'updated',
  { title: 'New Title', version: '2.0' },
  'user-id',
  'John Doe'
);

// Get history
const history = await audit.getAuditTrail('doc-id-123');

// Generate report
const report = await audit.generateReport('doc-id-123');
```

## 🎯 Design Principles

### 1. Modular Design
Each agent has a single, well-defined responsibility and can be used independently or orchestrated together.

### 2. Context-Aware
All agents load company-specific data from JSON files, ensuring consistency across generated documents.

### 3. Compliance First
ComplianceAgent ensures all documents meet Colorado DOH regulations and Fort Homes standards.

### 4. Audit Trail
Every document change is tracked in the database for complete traceability.

### 5. Extensible
New agents can be added by extending `BaseAgent` and implementing the `execute()` method.

## 🚀 Performance

- **Quality Manual:** ~10 sections in < 30 seconds
- **SOPs:** 8 procedures in < 60 seconds
- **Work Instructions:** 8 WIs in < 60 seconds
- **Complete Suite:** All documents in < 3 minutes

## 🔒 Security & Compliance

- All documents marked CONTROLLED require formal approval
- Audit trail tracks all changes with user attribution
- Database contains sensitive production data
- No ISO 9001 references (company not ISO certified)
- Enforces Colorado DOH and NTA TPIA requirements

## 📝 Contributing

When adding new agents:

1. Extend `BaseAgent` class
2. Implement `execute()` method
3. Use `this.context` for company data
4. Use `this.createAuditTrail()` for tracking
5. Add to `src/agents/index.ts`
6. Update this README

## 📖 Further Reading

- **Quality Manual:** See `docs/manual/` for manual structure
- **SOPs:** See `docs/sops/` for procedure examples
- **Style Guide:** See `docs/style-guide/` for formatting standards
- **Regulatory:** See `docs/context/02-REGULATORY-REQUIREMENTS.md`

---

**Last Updated:** 2026-02-04  
**Version:** 1.0  
**Maintained By:** Fort Homes QMS Team
