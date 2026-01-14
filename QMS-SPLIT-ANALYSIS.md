# QMS SPLIT ANALYSIS — Factory vs Field Operations
## Fort and Homes LLC (Factory) vs Fort and Homes Development (FHD - Field)

**Document ID:** QMS-SPLIT-ANALYSIS-001  
**Date Prepared:** January 14, 2026  
**Purpose:** Determine structure for splitting QMS into factory and field documentation  
**Status:** RESEARCH & PLANNING

---

## EXECUTIVE SUMMARY

The current QMS repository (fort-homes-qms) focuses **exclusively on factory operations** (Fort and Homes LLC manufacturing in Grand Junction). A separate QMS system is needed for **Fort and Homes Development (FHD)**, which handles on-site field installation, assembly, and customer delivery.

**Key Findings:**
- ✅ Factory QMS is comprehensive and complete (56 documents, 28 SOPs)
- ⚠️ Field QMS does not yet exist in documentation
- 🔄 Some procedures are shared between factory and field
- 📋 Clear separation needed for operational clarity and regulatory compliance

---

## BUSINESS MODEL OVERVIEW

### Fort and Homes LLC (Factory)
**Location:** Grand Junction, Colorado  
**Operation:** Manufacturing/Build-in-Place in static bays  
**Product Scope:** Complete modular home modules  
**Process:** 8 sequential production phases (HP-1 through HP-8)  
**Regulatory:** CDOH manufacturing certification, HUD Code, IRC Chapter 5-6

**Manufacturing Phases:**
1. Chassis & Floor Deck (HP-1)
2. Wall Framing & Sheathing (HP-2)
3. Roof & Ceiling Framing (HP-3)
4. MEP Rough-In & Testing (HP-4 - TPIA)
5. Insulation & Air Sealing (HP-5)
6. Drywall & Interior Shell (HP-6)
7. Interior Trim & Finish (HP-7)
8. Final Inspection & Delivery Prep (HP-8 - TPIA)

---

### Fort and Homes Development (FHD - Field)
**Operation:** On-site field installation and assembly  
**Product Scope:** Delivered modules + on-site assembly/installation  
**Process:** Foundation prep → Transport → Assembly → Utilities → Inspection → Customer handoff

**Estimated Field Phases:**
1. **Pre-Delivery Planning** (Site prep, foundation, utilities roughed)
2. **Module Transport & Setup** (Delivery coordination, placement, leveling)
3. **Module Assembly/Integration** (Connecting modules, sealing joints, MEP final connections)
4. **Utility Completion** (Electrical, plumbing, HVAC final hookup, gas)
5. **Site Finishing** (Skirting, steps, ramps, landscaping, site cleanup)
6. **Final Inspection** (Customer walkthrough, code official approval)
7. **Customer Handoff** (Warranty documentation, training, keys)

---

## CURRENT QMS STRUCTURE (FACTORY-FOCUSED)

### Tier 1: Quality Manual
- **QMS-Manual-Main.md** — Manufacturing focus only

### Tier 2: Standard Operating Procedures (28 total)

#### System & Management (SOP-001-010) — Shared with Field
| SOP | Title | Applicability |
| :--- | :--- | :--- |
| SOP-001 | Document Control | 🔄 **SHARED** (both factories need doc control) |
| SOP-002 | Training & Competency | 🔄 **SHARED** (both need trained staff) |
| SOP-003 | Internal Audits & Management Review | 🔄 **SHARED** (quality assurance for both) |
| SOP-004 | Nonconformance & CAPA | 🔄 **SHARED** (issue tracking for both) |
| SOP-005 | Change Management | 🔄 **SHARED** (change control for both) |
| SOP-006 | Design Control & Plan Review | 🏭 **FACTORY ONLY** (module design) |
| SOP-007 | Procurement & Supplier Management | 🏭 **FACTORY ONLY** (material sourcing) |
| SOP-008 | Equipment Calibration & Maintenance | 🏭 **FACTORY ONLY** + 🏗️ **FIELD** (different equipment) |
| SOP-009 | CDOH Regulatory Compliance | 🔄 **SHARED** (both subject to CDOH) |
| SOP-010 | Module Identification & Data Plate | 🏭 **FACTORY ONLY** |

#### Support Procedures (SOP-011-020) — Mixed
| SOP | Title | Applicability |
| :--- | :--- | :--- |
| SOP-011 | Production Planning & Scheduling | 🏭 **FACTORY** (factory production schedule) |
| SOP-012 | Material Receiving & Lot Traceability | 🏭 **FACTORY ONLY** |
| SOP-013 | Hold-Point Inspections & Gate Controls | 🏭 **FACTORY** (HP-1-8) + 🏗️ **FIELD** (site inspections) |
| SOP-014 | Module Traveler & Work Package Management | 🏭 **FACTORY** (pre-delivery) + 🏗️ **FIELD** (field install tracking) |
| SOP-015 | TPIA & Third-Party Inspector Coordination | 🏭 **FACTORY** (HP-4, HP-8) + 🏗️ **FIELD** (final site inspection) |
| SOP-016 | Quality Metrics & Performance Reporting | 🔄 **SHARED** (both need metrics) |
| SOP-017 | Customer Service & Support | 🏭 **FACTORY** (order management) + 🏗️ **FIELD** (delivery/install coordination) |
| SOP-018 | Recalls & Field Actions | 🏭 **FACTORY** (manufacturing issues) + 🏗️ **FIELD** (field repairs/issues) |
| SOP-019 | Packaging & Delivery | 🏭 **FACTORY** (module prep) + 🏗️ **FIELD** (receiving/handling) |
| SOP-020 | Continuous Improvement Process | 🔄 **SHARED** (Kaizen for both) |

#### Production Phase Procedures (SOP-101-108) — FACTORY ONLY
| SOP | Title | Applicability |
| :--- | :--- | :--- |
| SOP-101 | Chassis & Floor Deck Assembly (Phase 1) | 🏭 **FACTORY ONLY** |
| SOP-102 | Wall Framing & Sheathing (Phase 2) | 🏭 **FACTORY ONLY** |
| SOP-103 | Roof & Ceiling Framing (Phase 3) | 🏭 **FACTORY ONLY** |
| SOP-104 | MEP Rough-In & Testing (Phase 4) | 🏭 **FACTORY ONLY** |
| SOP-105 | Insulation & Air Sealing (Phase 5) | 🏭 **FACTORY ONLY** |
| SOP-106 | Drywall & Interior Shell (Phase 6) | 🏭 **FACTORY ONLY** |
| SOP-107 | Interior Trim & Finish (Phase 7) | 🏭 **FACTORY ONLY** |
| SOP-108 | Final Inspection & Delivery (Phase 8) | 🏭 **FACTORY** (final factory QC) + 🏗️ **FIELD** (delivery receipt) |

### Tier 3: Work Instructions (8 total)
- **WI-101 through WI-108** — 🏭 **FACTORY ONLY** (factory assembly procedures)

### Tier 4: Inspection Forms (8 total)
- **FORM-I101 through FORM-I108** — 🏭 **FACTORY ONLY** (HP-1 through HP-8)

---

## QMS SPLIT REQUIREMENTS

### FACTORY QMS (Fort and Homes LLC)
**Scope:** Manufacturing in static bays (factory operations)  
**Repository:** `fort-homes-qms` (current)  
**Status:** ✅ Complete

**Should Contain:**
- SOP-001-010 (System/Management) — Factory versions
- SOP-011-020 (Support) — Factory versions
- SOP-101-108 (Production Phases) — All phases
- WI-101-108 (Work Instructions) — All phases
- FORM-I101-I108 (Inspection Forms) — All hold points
- QMS-Manual-Main (Factory focus)

---

### FIELD QMS (Fort and Homes Development / FHD)
**Scope:** On-site field installation and assembly  
**Repository:** New `fort-homes-development-qms` or `fort-homes-fhd-qms`  
**Status:** ⏳ To be created

**Should Contain:**
- **Shared SOPs** (001-005, 009, 016, 020) — Adapted for field context
- **Field Installation SOPs** (new numbering: FI-001 through FI-007)
  - FI-001: Site Preparation & Foundation Verification
  - FI-002: Module Transport & Delivery Coordination
  - FI-003: Module Placement & Leveling
  - FI-004: Module Connection & Sealing
  - FI-005: Utility Final Connections (Electrical, Plumbing, HVAC, Gas)
  - FI-006: Site Finishing (Skirting, Steps, Landscaping)
  - FI-007: Final Inspection & Customer Handoff
- **Field Work Instructions** (WI-FI-001 through WI-FI-007)
- **Field Inspection Forms** (FORM-FI-001 through FORM-FI-007)
- **Field Quality Manual** (Field-specific QMS overview)

---

## SHARED DOCUMENTATION STRATEGY

### Option A: "Mirror & Customize" Approach
**Shared SOPs are duplicated and customized for each context**

| SOP | Factory Version | Field Version | Sync Requirement |
| :--- | :--- | :--- | :--- |
| SOP-001 | Documents control in factory | Documents control in field | Keep in sync |
| SOP-002 | Factory training program | Field technician training | Keep in sync |
| SOP-009 | CDOH factory compliance | CDOH field compliance | Keep in sync |

**Pros:**
- ✅ Self-contained repositories
- ✅ Each team sees only relevant content
- ✅ Faster reference (less scrolling)

**Cons:**
- ❌ Duplicate maintenance
- ❌ Risk of version drift
- ❌ More complex updates

---

### Option B: "Single Source with Context Flags" Approach
**Shared SOPs in central location, flagged by applicability**

**Format Example:**
```markdown
## SOP-001: Document Control

**Scope:** 
- 🏭 FACTORY: Manufacturing document control
- 🏗️ FIELD: Field installation documentation
- 🔄 SHARED: Both apply fully

### Section 3.1: Document Types (🔄 SHARED)
[Content applies to both factory and field]

### Section 3.2: Design Document Control (🏭 FACTORY ONLY)
[Content applies to factory design and engineering]

### Section 3.3: Field Service Documentation (🏗️ FIELD ONLY)
[Content applies to field service team]
```

**Pros:**
- ✅ Single source of truth
- ✅ Easier updates (one version)
- ✅ Clear context for each audience

**Cons:**
- ⚠️ More complex documents
- ⚠️ Risk of mixed signals
- ⚠️ Harder to reference (more scrolling)

---

### Option C: "Hybrid" Approach (RECOMMENDED)
**Shared SOPs in central location; each division pulls relevant sections + has custom additions**

**Structure:**
```
fort-homes-qms/
├── shared-docs/
│   ├── SOP-001-Document-Control-SHARED.md
│   ├── SOP-002-Training-SHARED.md
│   └── SOP-009-CDOH-Compliance-SHARED.md
├── factory-docs/
│   ├── sops/
│   │   ├── SOP-001-Document-Control-Factory.md (extends SHARED)
│   │   ├── SOP-006-Design-Control.md
│   │   └── ...SOP-101-108
│   ├── manual/
│   └── forms/
└── field-docs/ (new repository)
    ├── sops/
    │   ├── SOP-001-Document-Control-Field.md (extends SHARED)
    │   ├── FI-001-Site-Preparation.md
    │   └── ...FI-001-007
    ├── manual/
    └── forms/
```

**Pros:**
- ✅ Single source for truly shared content
- ✅ Clear separation for division-specific content
- ✅ Flexibility for customization
- ✅ Manageable synchronization

**Cons:**
- ⚠️ Requires more organizational structure
- ⚠️ Need version control discipline

---

## FIELD INSTALLATION SOP OUTLINE

### FI-001: Site Preparation & Foundation Verification
**Scope:** Site assessment, foundation readiness, utility rough-in verification  
**Applies to:** Field Installation Manager, General Contractor, Site Supervisor  
**Key Activities:**
- Site survey and measurements verification
- Foundation inspection and leveling preparation
- Utility rough-in verification (electrical panel, water inlet, gas line, sewer/septic)
- Access preparation (ramps, equipment paths)
- Weather and seasonal considerations

### FI-002: Module Transport & Delivery Coordination
**Scope:** Module delivery logistics, inspection upon arrival, placement planning  
**Applies to:** Logistics Manager, Field Installation Manager, Site Supervisor  
**Key Activities:**
- Delivery coordination with transportation
- Module arrival inspection (condition, serial number verification)
- Placement location preparation (leveling blocks, support points)
- Safety setup (crane staging, spotters, closure areas)

### FI-003: Module Placement & Leveling
**Scope:** Physical placement of modules, leveling, securing  
**Applies to:** Field Installation Manager, Equipment Operator, Site Supervisor  
**Key Activities:**
- Crane/equipment setup for module placement
- Module lowering onto foundation/leveling blocks
- Final leveling verification (diagonals, slope)
- Temporary bracing and securing

### FI-004: Module Connection & Sealing
**Scope:** Connecting multiple modules, sealing interior connections  
**Applies to:** Field Installation Team, Carpenter, MEP Technician  
**Key Activities:**
- Module-to-module connections (bolting, bracket installation)
- Interior wall sealing (drywall joints, caulking)
- Roof sealing if multiple modules
- Weather-proofing of connections

### FI-005: Utility Final Connections
**Scope:** Electrical, plumbing, HVAC, and gas final connections  
**Applies to:** Licensed Electrician, Licensed Plumber, HVAC Technician, Gas Technician  
**Key Activities:**
- Electrical final connections and breaker testing
- Plumbing final connections and water pressure testing
- HVAC final connections and system testing
- Gas line connections and leak testing
- Utility code inspections

### FI-006: Site Finishing
**Scope:** Exterior finishing and site cleanup  
**Applies to:** Field Installation Team, Site Supervisor  
**Key Activities:**
- Skirting installation (foundation closure)
- Exterior steps and ramps installation
- Grading and drainage verification
- Landscaping and cleanup
- Removal of packaging and temporary materials

### FI-007: Final Inspection & Customer Handoff
**Scope:** Final quality verification and customer delivery  
**Applies to:** Field Quality Inspector, Field Installation Manager, Customer Service  
**Key Activities:**
- Complete system walkthrough (all utilities, fixtures)
- Code official final inspection coordination
- Customer orientation and training
- Warranty documentation delivery
- Keys, documents, and final sign-off

---

## REGULATORY COMPLIANCE SPLIT

### CDOH Manufacturing Compliance (Factory)
- Module design and engineering
- Manufacturing facility certification
- TPIA coordination during manufacturing (HP-4, HP-8)
- Module data plate and labeling
- Factory quality assurance

### CDOH Installation Compliance (Field)
- Installation according to manufacturer instructions
- Site-built foundation verification
- Final installation inspection
- Utility connections per code
- Customer documentation

### Shared Compliance Elements
- Training and competency documentation
- Quality audit procedures
- Nonconformance management
- Document control and records retention

---

## IMPLEMENTATION ROADMAP

### Phase 1: Planning & Preparation (Week 1)
- [ ] Confirm business model with leadership
- [ ] Define exact scope of FHD operations
- [ ] Identify FHD team members and stakeholders
- [ ] Choose split strategy (Option A, B, or C - recommend C)

### Phase 2: Create Field QMS Repository (Week 2)
- [ ] Create new GitHub repository: `fort-homes-development-qms`
- [ ] Set up directory structure
- [ ] Create FHD Quality Manual
- [ ] Define field-specific organization chart

### Phase 3: Develop Field Shared SOPs (Week 3)
- [ ] Create Field versions of SOP-001-005, 009, 016, 020
- [ ] Adapt language to field context
- [ ] Define field-specific roles
- [ ] Commit to field repository

### Phase 4: Create Field Installation SOPs (Week 4-5)
- [ ] FI-001: Site Preparation
- [ ] FI-002: Module Transport
- [ ] FI-003: Module Placement & Leveling
- [ ] FI-004: Module Connection & Sealing
- [ ] FI-005: Utility Completion
- [ ] FI-006: Site Finishing
- [ ] FI-007: Final Inspection & Handoff

### Phase 5: Create Field Work Instructions & Forms (Week 6-7)
- [ ] Work Instructions: WI-FI-001 through WI-FI-007
- [ ] Inspection Forms: FORM-FI-001 through FORM-FI-007
- [ ] Field-specific checklists and templates

### Phase 6: Field Team Training (Week 8)
- [ ] Field QMS orientation
- [ ] Role-specific training
- [ ] Competency assessment
- [ ] Pilot deployment

---

## REPOSITORY STRUCTURE RECOMMENDATION

### Factory QMS (Current - No Change)
```
fort-homes-qms/
├── docs/
│   ├── manual/          # Factory QMS Manual
│   ├── sops/            # 28 SOPs (001-010, 011-020, 101-108)
│   ├── work-instructions/   # 8 WIs (101-108)
│   └── forms-templates/     # 8 Forms (I101-I108)
└── ...
```

### Field QMS (New Repository)
```
fort-homes-development-qms/
├── docs/
│   ├── manual/          # FHD QMS Manual
│   ├── sops/
│   │   ├── shared/      # Adapted SOP-001-005, 009, 016, 020
│   │   └── field/       # FI-001 through FI-007
│   ├── work-instructions/   # WI-FI-001 through WI-FI-007
│   └── forms-templates/     # FORM-FI-001 through FORM-FI-007
└── ...
```

### Shared Documentation (Optional Central Repo)
```
fort-homes-qms-shared/
├── sops/
│   ├── SOP-001-Document-Control-SHARED.md
│   ├── SOP-002-Training-SHARED.md
│   ├── SOP-004-CAPA-SHARED.md
│   ├── SOP-009-CDOH-SHARED.md
│   ├── SOP-016-Metrics-SHARED.md
│   └── SOP-020-Improvement-SHARED.md
└── standards/            # Shared standards, regulations, references
```

---

## NEXT STEPS FOR YOUR DECISION

**Please provide clarification on:**

1. **Business Scope for FHD:**
   - Is FHD currently installing modules? If so, how many installations/month?
   - What is the geographic scope? (Colorado only or other states?)
   - Are there state-specific installation regulations beyond CDOH?

2. **Team Structure:**
   - How many people on FHD field installation team?
   - Do they have previous QMS documentation?
   - Who will own/manage the FHD QMS going forward?

3. **Regulatory Requirements:**
   - Does FHD need separate CDOH licensing as an installer?
   - Are there state contractor licensing requirements?
   - Are there building official inspection requirements by jurisdiction?

4. **Integration Points:**
   - How do modules transfer from Factory to FHD? (Ownership, responsibility handoff?)
   - Does FHD source any custom components or only use completed factory modules?
   - Who handles warranty issues - Factory or FHD?

5. **Split Strategy Preference:**
   - Option A: Completely separate repositories (cleanest separation)
   - Option B: Single repository with context flags (easier maintenance)
   - Option C: Hybrid with shared documentation repository (best of both)

---

## DOCUMENT APPROVALS

Once you provide the above information, I can immediately:
1. Create FHD QMS repository structure
2. Develop complete field documentation set
3. Establish synchronization procedures between factory and field QMS
4. Train both teams on their respective systems

**Next Steps:** Review this analysis and provide feedback on business scope and preferences.

