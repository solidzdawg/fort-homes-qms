# Carbon QMS Integration with Fort & Homes Data

**Goal:** Use Carbon's QMS framework with Fort and Homes company-specific data

**Date:** January 14, 2026  
**Status:** Configuration Guide for Data-Driven Integration

---

## Overview

Instead of duplicating the entire QMS, we're setting up Carbon's QMS system to **consume your data files** and generate company-specific documentation.

```
┌─────────────────────────────────────────┐
│  Carbon QMS Framework (base templates)  │
│  - Document templates                   │
│  - Process workflows                    │
│  - Form structure                       │
└──────────────────┬──────────────────────┘
                   │
                   ↓ (reads)
┌─────────────────────────────────────────┐
│  Your Data Files (Fort & Homes)         │
│  - company-info.json                    │
│  - phases.json                          │
│  - hold-points.json                     │
│  - itps.json                            │
└──────────────────┬──────────────────────┘
                   │
                   ↓ (generates)
┌─────────────────────────────────────────┐
│  Fort & Homes QMS Documents             │
│  - SOPs (company-specific)              │
│  - Work Instructions (by phase)         │
│  - Forms & Checklists                   │
│  - Training Materials                   │
└─────────────────────────────────────────┘
```

---

## Data Files Structure

Your FH data is in `fort-homes-qms/data/`:

### 1. **company-info.json** 
Contains all company metadata needed for QMS documents:
- Company legal name, DBA, parent company
- Address, contacts
- Leadership structure (President, COO, QA Manager, etc.)
- Responsibilities by role

**Used by Carbon for:**
- Document headers/footers
- Signature authority blocks
- Responsibility assignments

### 2. **phases.json**
Production phase workflow (8 phases):
- Phase name, ID, duration
- Hold points (HP-1 through HP-8)
- Trade crews required
- Work activities
- Key materials
- Equipment needed

**Used by Carbon for:**
- Phase-specific SOP generation
- Work instruction sequencing
- Hold point scheduling
- Crew planning documents

### 3. **hold-points.json**
Quality gate definitions:
- Hold point ID (HP-1 to HP-8)
- Inspection criteria
- Pass/fail conditions
- Documentation requirements
- Third-party inspector needs

**Used by Carbon for:**
- Inspection form generation
- Gate control procedures
- Quality checkpoint scheduling

### 4. **itps.json**
Inspection, Test, and Procedure specifications:
- Per-phase ITP requirements
- Testing procedures
- Pass/fail criteria
- Equipment specifications

**Used by Carbon for:**
- Detailed inspection procedures
- Testing protocols
- Equipment calibration schedules

---

## Implementation Steps

✅ **STEPS 1-4 COMPLETED** (See [CARBON-QMS-SETUP-COMPLETE.md](CARBON-QMS-SETUP-COMPLETE.md) for details)

### Step 1: ✅ Set Up Data Loader Package in Carbon

**COMPLETED:** Created `packages/qms/src/data-loader.ts` in the Carbon repository:

```typescript
// packages/qms/src/data-loader.ts
export class QMSDataLoader {
  loadCompanyInfo(): CompanyInfo { ... }
  loadProductionData(): ProductionData { ... }
  loadHoldPoints(): HoldPoint[] { ... }
  loadITPs(): any { ... }
  getPhase(phaseId: number): Phase | undefined { ... }
  getLeadership(roleFilter: string): any { ... }
  // ... more methods
}
```

**Status:** ✅ Complete in `feat/qms-integration` branch

### Step 2: ✅ Created Template Binding Layer

**COMPLETED:** Created `packages/qms/src/templates.ts` with:

```typescript
// packages/qms/src/templates.ts
export class TemplateBindings {
  getBindings() {
    return {
      company: { name, dba, address, ... },
      leadership: { president, coo, qaManager, ... },
      production: { methodology, phases, bays, ... },
      phase: { byId(), byName(), activities(), crews(), ... },
      quality: { holdPoints, holdPointById(), ... },
    }
  }
}

export class DocumentTemplate {
  generateSOP(phaseId: number): Record<string, any> { ... }
  generateWorkInstruction(phaseId: number): Record<string, any> { ... }
  generateInspectionForm(hpId: string): Record<string, any> { ... }
}
```

**Status:** ✅ Complete in `feat/qms-integration` branch

### Step 3: ✅ Created Configuration Layer

**COMPLETED:** Created `config/qms.config.ts` in Carbon:

```typescript
// carbon/config/qms.config.ts
export const qmsConfig = {
  company: {
    id: 'fort-homes',
    legalName: 'Fort and Homes LLC',
    dataSource: 'Carbon /data directory',
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
};
```

**Status:** ✅ Complete in `feat/qms-integration` branch

### Step 4: ✅ Copied FH Data to Carbon & Generated Documents

**COMPLETED:** 
- ✅ Copied all data files to `carbon/data/`
- ✅ Created `scripts/generate-qms.js` generation script
- ✅ Generated 24 QMS documents (SOPs, WIs, Forms, manifest)
- ✅ All documents available in `carbon/output/fort-homes-qms/`

**Status:** ✅ Documents generated and deployed

---

## Data Synchronization

### Option 1: Symbolic Links (Recommended)
Point Carbon's data directory to your live data:

```powershell
# In Carbon repo
New-Item -ItemType SymbolicLink -Path "./data/fort-homes" -Target "C:\path\to\fort-homes-qms\data" -Force
```

**Advantage:** Any updates to FH data are immediately available to Carbon  
**Disadvantage:** Requires your repo to be available locally

### Option 2: Git Submodule
Make fort-homes-qms a submodule of Carbon:

```bash
cd carbon
git submodule add https://github.com/solidzdawg/fort-homes-qms.git qms/fort-homes-qms
```

**Advantage:** Clean separation, explicit version control  
**Disadvantage:** Need to update submodule reference when FH data changes

### Option 3: Copy & Sync
Periodically copy FH data into Carbon:

```powershell
# Sync script - run when needed
Copy-Item -Recurse -Force `
  "C:\fort-homes-qms\data\*" `
  "C:\carbon\qms\imports\fort-homes-qms\data\"
```

---

## Implementation Timeline

| Step | Task | Priority | Status |
| :--- | :--- | :---: | :---: |
| 1 | Create QMSDataLoader package | High | ✅ Complete |
| 2 | Create TemplateBindings & DocumentTemplate | High | ✅ Complete |
| 3 | Create QMS configuration layer | High | ✅ Complete |
| 4 | Copy FH data & generate documents | High | ✅ Complete |
| 5 | Deploy feat/qms-integration branch to Carbon | Medium | ✅ Complete |
| 6 | Set up data synchronization mechanism | Medium | 📋 In Progress |
| 7 | Deploy integrated QMS to production | Medium | 📋 Next |

---

## Next Actions

1. ✅ **Carbon QMS package created** - @carbon/qms ready for use
2. ✅ **Documents generated** - 24 JSON documents created from your data
3. ✅ **Branch deployed** - feat/qms-integration ready for review
4. 📋 **Set up data synchronization** - Choose between:
   - Option 1: Symlink (live updates)
   - Option 2: Git submodule (version control)
   - Option 3: Copy & sync script (manual)
5. 📋 **Merge to Carbon main** - Create PR and merge feat/qms-integration
6. 📋 **Integrate with Carbon apps** - Hook MES, ERP, Document systems
7. 📋 **Deploy to production** - Test, validate, go live

---

## Benefits of This Approach

✅ **Separation of Concerns**
- Carbon owns the QMS framework (in packages/qms)
- FH owns the company data (in fort-homes-qms/data)
- Easy to update either independently

✅ **Reusability**
- Carbon can use same framework for multiple companies
- FH can use other QMS systems without duplicate data
- Package can be published to npm

✅ **Maintainability**
- Single source of truth for company info
- No manual document updates needed
- Version control for both framework and data
- TypeScript for type safety

✅ **Scalability**
- Easy to add new phases, hold points, or processes
- Just update JSON files, documents regenerate automatically
- Ready for integration with Carbon's MES, ERP systems

✅ **Flexibility**
- Swap QMS frameworks without losing data
- Use same data with different templates
- Live data binding options available

✅ **Already Complete**
- ✅ Data-driven document generation working
- ✅ 24 documents generated and tested
- ✅ TypeScript package created and ready
- ✅ Integration branch deployed to GitHub

---

## Current State

- ✅ FH data files created and structured (company-info, phases, hold-points, itps)
- ✅ FH QMS documents generated from data (24 JSON documents: 8 SOPs, 8 WIs, 8 Forms + manifest)
- ✅ @carbon/qms package created with full TypeScript implementation
- ✅ Document generation script working (tested and validated)
- ✅ FH repo deployed QMS generation branch to Carbon (feat/qms-integration)
- ✅ Comprehensive documentation created (CARBON-INTEGRATION-GUIDE, CARBON-QMS-SETUP-COMPLETE, DEPLOYMENT-SUMMARY)
- 📋 **NEXT:** Set up data synchronization and merge to Carbon main

---

**Questions to investigate about Carbon:**

1. Does Carbon have template/form system that can read from external data sources?
2. What format does Carbon expect for company-specific data?
3. Are there example implementations of multi-tenant or multi-company QMS in Carbon?
4. What's the best way to hook your data into their document generation?
