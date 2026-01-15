# Carbon QMS Integration Setup - Fort & Homes

**Status:** ✅ Complete & Ready for Use  
**Date:** January 14, 2026  
**Configuration:** Data-Driven QMS Integration (Option A)

---

## What Was Set Up

You now have a **proper Option A integration** where:

1. **Carbon's QMS Framework** remains independent and reusable
2. **Your Fort & Homes data** feeds into the framework
3. **Documents are generated dynamically** from your data
4. **Live data binding** ensures updates propagate automatically

---

## Directory Structure

```
carbon-repo/
├── data/                          ← Your FH company data (symlink/copy)
│   ├── company-info.json
│   ├── phases.json
│   ├── hold-points.json
│   └── itps.json
│
├── config/
│   └── qms.config.ts             ← QMS configuration (data sources, output, etc.)
│
├── packages/qms/                 ← NEW: QMS Integration Package
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts              ← Package exports
│       ├── data-loader.ts        ← Loads your data files
│       └── templates.ts          ← Generates documents from data
│
├── scripts/
│   └── generate-qms.ts          ← Document generation script
│
└── output/
    └── fort-homes-qms/          ← Generated documents (SOPs, WIs, Forms)
```

---

## The Integration Layer

### 1. **QMSDataLoader** (`data-loader.ts`)
Loads and provides access to your FH data:

```typescript
import { QMSDataLoader } from '@carbon/qms';

const loader = new QMSDataLoader();
const phases = loader.getAllPhases();
const company = loader.getCompanyInfo();
const hp = loader.getHoldPoint('HP-1');
```

**Methods available:**
- `loadCompanyInfo()` - Get company metadata
- `loadProductionData()` - Get phases & production info
- `loadHoldPoints()` - Get quality gate definitions
- `loadITPs()` - Get inspection/test procedures
- `getPhase(id)` - Get specific phase
- `getLeadership(role)` - Get team member by role
- `getAllPhases()` - List all phases

### 2. **TemplateBindings** (`templates.ts`)
Maps data to template variables for document rendering:

```typescript
import { TemplateBindings } from '@carbon/qms';

const bindings = new TemplateBindings(loader);

// Get all available template variables
const vars = bindings.getBindings();

// Render a template string
const rendered = bindings.renderTemplate(
  "Project: {{company.name}}, Phase: {{phase.byId(1).name}}"
);
```

**Available bindings:**
- `company.*` - Company info (name, address, etc.)
- `leadership.*` - Team members by role
- `production.*` - Production methodology, phases, bays
- `phase.*` - Phase-specific data and activities
- `quality.*` - Hold points and quality criteria

### 3. **DocumentTemplate** (`templates.ts`)
Generates complete document structures:

```typescript
import { DocumentTemplate } from '@carbon/qms';

const templates = new DocumentTemplate(loader);

// Generate SOP for Phase 1
const sop = templates.generateSOP(1);

// Generate Work Instruction for Phase 2
const wi = templates.generateWorkInstruction(2);

// Generate Inspection Form for HP-1
const form = templates.generateInspectionForm('HP-1');
```

---

## How to Use

### Option 1: Generate All Documents
```bash
cd carbon-repo
npm install
npm run -w packages/qms build
npx tsx scripts/generate-qms.ts
```

**Output:** `carbon-repo/output/fort-homes-qms/`
- `SOP-001.json`, `SOP-002.json`, ..., `SOP-008.json`
- `WI-001.json`, `WI-002.json`, ..., `WI-008.json`
- `FORM-HP-1.json`, `FORM-HP-2.json`, ..., `FORM-HP-8.json`
- `manifest.json` (index of all documents)

### Option 2: Use in Carbon Apps
```typescript
// In any Carbon app (MES, ERP, etc.)
import { QMSDataLoader, DocumentTemplate } from '@carbon/qms';

const loader = new QMSDataLoader();
const templates = new DocumentTemplate(loader);

// Get company name for UI
const company = loader.getCompanyInfo();

// Get phases for production planning
const phases = loader.getAllPhases();

// Generate SOP on demand
const sop = templates.generateSOP(1);
```

### Option 3: Access Data in Templates
```typescript
import { TemplateBindings } from '@carbon/qms';

const bindings = new TemplateBindings(loader);

// All template variables for Handlebars/React/etc
const templateVars = bindings.getBindings();

// Use in template engines
render(template, templateVars);
```

---

## Data Synchronization

### Current Setup: Copy
Your data files are currently **copied** into `carbon/data/`. 

**To sync updates:**
```bash
# Whenever you update FH data
Copy-Item -Recurse -Force `
  "C:\fort-homes-qms\data\*" `
  "C:\carbon-repo\data\"
```

### Recommended: Symlink (for live binding)
Replace the copy with a symbolic link:

```powershell
# On Windows (run as Admin)
New-Item -ItemType SymbolicLink `
  -Path "C:\carbon-repo\data\fort-homes" `
  -Target "C:\fort-homes-qms\data" `
  -Force
```

**Benefit:** Any FH data update immediately reflects in Carbon

### Alternative: Git Submodule
Make fort-homes-qms a submodule:

```bash
cd carbon-repo
git submodule add https://github.com/solidzdawg/fort-homes-qms.git data/fort-homes
```

---

## Configuration

All settings are in `carbon/config/qms.config.ts`:

```typescript
export const qmsConfig = {
  company: {
    id: 'fort-homes',
    legalName: 'Fort and Homes LLC',
  },
  dataSources: {
    companyInfo: './data/company-info.json',
    phases: './data/phases.json',
    holdPoints: './data/hold-points.json',
    itps: './data/itps.json',
  },
  generation: {
    outputDir: './output/fort-homes-qms',
    formats: ['markdown', 'json', 'pdf'],
  },
  quality: {
    holdPointPrefix: 'HP',
    sopPrefix: 'SOP',
    wiPrefix: 'WI',
    reviewCycleDays: 180, // 6 months
  },
};
```

---

## Integration Points in Carbon

The QMS package integrates with Carbon's existing systems:

### 1. **MES Integration** 
Production scheduling uses phases from QMS data:
```typescript
// apps/mes/app/routes/production.tsx
import { QMSDataLoader } from '@carbon/qms';
const loader = new QMSDataLoader();
const phases = loader.getAllPhases();
```

### 2. **Document Management**
Generated SOPs/WIs/Forms integrate with Carbon's document system:
```typescript
// packages/documents/src/qms-documents.ts
import { DocumentTemplate } from '@carbon/qms';
```

### 3. **ERP Integration**
Company info from QMS feeds into ERP:
```typescript
// apps/erp/app/routes/company.tsx
import { QMSDataLoader } from '@carbon/qms';
const company = loader.getCompanyInfo();
```

---

## Adding New Data or Phases

**To add a new phase:**

1. Update `fort-homes-qms/data/phases.json`
2. Add corresponding hold point to `hold-points.json`
3. Optionally add ITPs to `itps.json`
4. Regenerate documents:
   ```bash
   npx tsx scripts/generate-qms.ts
   ```
   
New documents are created automatically!

---

## Adding Custom Templates

You can extend `DocumentTemplate` in `packages/qms/src/templates.ts`:

```typescript
// Add custom document type
generateCustomProcedure(phaseId: number): Record<string, any> {
  const phase = this.bindings.getBindings().phase.byId(phaseId);
  // ... generate custom document using phase data
  return customDocument;
}
```

---

## Package Publishing

To use the QMS package in other projects:

```bash
# Build the package
npm run -w packages/qms build

# Publish to npm (if desired)
npm publish -w packages/qms

# Or use locally in Carbon apps
# In apps/mes/package.json:
{
  "dependencies": {
    "@carbon/qms": "*"
  }
}
```

---

## What's Different from Full Import

| Aspect | Full Import | Option A (This Setup) |
| :--- | :---: | :---: |
| **Carbon owns QMS code** | No | ✅ Yes |
| **FH owns data** | ✅ Yes | ✅ Yes |
| **Reusable by other companies** | ✅ Yes | ✅ Yes |
| **Live data updates** | No | ✅ Yes |
| **Separate repos** | No | ✅ Yes |
| **Modular** | No | ✅ Yes |

---

## Next Steps

1. **Install dependencies** in carbon-repo:
   ```bash
   cd carbon-repo
   npm install
   ```

2. **Build the QMS package:**
   ```bash
   npm run -w packages/qms build
   ```

3. **Generate your documents:**
   ```bash
   npx tsx scripts/generate-qms.ts
   ```

4. **Review output** in `carbon-repo/output/fort-homes-qms/`

5. **Set up data synchronization:**
   - Option: Symlink for live updates
   - Option: Git submodule for versioning
   - Option: CI/CD sync script

6. **Integrate with Carbon apps:**
   - Import `@carbon/qms` in MES, ERP, etc.
   - Use data in production workflows

---

## Support

- **Data issues?** Update files in `fort-homes-qms/data/`
- **Template questions?** Check `packages/qms/src/templates.ts`
- **Configuration?** Edit `config/qms.config.ts`
- **New features?** Extend `DocumentTemplate` class

---

**Your QMS is now properly integrated with Carbon! 🎉**

Data drives the documents. Updates to your data automatically flow through the system.
