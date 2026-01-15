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

### Step 1: Set Up Data References in Carbon

Create a `config/fort-homes-data.js` in the Carbon repository that imports your data:

```javascript
// carbon/config/fort-homes-data.js
const companyInfo = require('./imports/fort-homes-qms/data/company-info.json');
const phases = require('./imports/fort-homes-qms/data/phases.json');
const holdPoints = require('./imports/fort-homes-qms/data/hold-points.json');
const itps = require('./imports/fort-homes-qms/data/itps.json');

module.exports = {
  company: companyInfo,
  production: phases,
  quality: holdPoints,
  procedures: itps,
  
  // Helper methods for template rendering
  getPhase: (phaseId) => phases.phases.find(p => p.id === phaseId),
  getHoldPoint: (hpId) => holdPoints.find(hp => hp.id === hpId),
  getLeadership: (role) => companyInfo.leadership.find(l => l.title.includes(role)),
};
```

### Step 2: Update Carbon's Document Generator

Modify Carbon's generation scripts to use FH data:

```javascript
// carbon/scripts/generate-qms.js (example)
const FHData = require('../config/fort-homes-data');

function generatePhaseSOPs() {
  FHData.production.phases.forEach(phase => {
    // Generate SOP using phase data
    const sop = {
      id: `SOP-${String(phase.id).padStart(3, '0')}`,
      title: phase.name,
      holdPoint: phase.holdPoint,
      duration: phase.durationDays,
      crews: phase.tradeCrews,
      // ... rest of SOP structure
    };
    // Write to file
  });
}
```

### Step 3: Create Data Integration Layer

Set up a file in Carbon that maps templates to your data:

**File:** `carbon/qms/data-integration/fort-homes-binding.js`

```javascript
module.exports = {
  // Map template variables to your data structure
  templateBindings: {
    // Company info
    'COMPANY_NAME': () => FHData.company.company.legalName,
    'COMPANY_DBA': () => FHData.company.company.dba,
    'COMPANY_ADDRESS': () => FHData.company.company.address,
    
    // Leadership
    'QA_MANAGER': () => FHData.getLeadership('Quality Manager'),
    'PRODUCTION_MANAGER': () => FHData.getLeadership('Production Manager'),
    
    // Production phases
    'PHASE_LIST': () => FHData.production.phases.map(p => ({
      id: p.id,
      name: p.name,
      code: p.code,
      holdPoint: p.holdPoint,
    })),
    
    // Hold points
    'HOLD_POINTS': () => FHData.quality,
  },
  
  // Filter functions for complex queries
  filters: {
    getPhaseByName: (name) => FHData.getPhase(name),
    getCrewsByPhase: (phaseId) => FHData.getPhase(phaseId)?.tradeCrews || [],
    getHoldPointCriteria: (hpId) => FHData.getHoldPoint(hpId)?.criteria || [],
  }
};
```

### Step 4: Configure Carbon to Use FH Data

In Carbon's main configuration file, register FH data source:

**File:** `carbon/.env` or `carbon/config/qms.config.js`

```env
# QMS Data Source Configuration
QMS_DATA_SOURCE=fort-homes
QMS_DATA_PATH=./imports/fort-homes-qms/data
QMS_COMPANY_ID=fort-homes
QMS_OUTPUT_DIR=./output/fort-homes-qms
```

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
| 1 | Review Carbon's QMS structure & find data hooks | High | 📋 Pending |
| 2 | Create FH data adapter/binding layer | High | 📋 Pending |
| 3 | Test data integration with sample generation | High | 📋 Pending |
| 4 | Set up data synchronization mechanism | Medium | 📋 Pending |
| 5 | Document template variables used by Carbon | Medium | 📋 Pending |
| 6 | Create validation tests for data mapping | Medium | 📋 Pending |
| 7 | Deploy integrated QMS to staging | Medium | 📋 Pending |

---

## Next Actions

1. **Examine Carbon's QMS structure** to understand:
   - Where templates are stored
   - What variables they expect
   - How documents are generated
   - What data sources they currently use

2. **Create adapter layer** that maps Carbon's templates to FH data

3. **Test generation** of sample documents using FH data

4. **Set up synchronization** between repos

---

## Benefits of This Approach

✅ **Separation of Concerns**
- Carbon owns the QMS framework
- FH owns the company data
- Easy to update either independently

✅ **Reusability**
- Carbon can use same framework for multiple companies
- FH can use other QMS systems without duplicate data

✅ **Maintainability**
- Single source of truth for company info
- No manual document updates needed
- Version control for both framework and data

✅ **Scalability**
- Easy to add new phases, hold points, or processes
- Just update JSON files, documents regenerate automatically

✅ **Flexibility**
- Swap QMS frameworks without losing data
- Use same data with different templates

---

## Current State

- ✅ FH data files created and structured (company-info, phases, hold-points, itps)
- ✅ FH QMS documents generated from data (SOPs, WIs, Forms)
- ✅ FH repo deployed to Carbon's `qms/setup` branch
- 📋 **NEXT:** Examine Carbon's QMS structure to set up data-driven integration

---

**Questions to investigate about Carbon:**

1. Does Carbon have template/form system that can read from external data sources?
2. What format does Carbon expect for company-specific data?
3. Are there example implementations of multi-tenant or multi-company QMS in Carbon?
4. What's the best way to hook your data into their document generation?
