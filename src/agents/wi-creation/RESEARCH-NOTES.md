# Research Notes: Work Instruction Creation Agents

**Date:** 2026-02-04
**Author:** Claude (AI Assistant)
**Purpose:** Document research findings and knowledge gaps for WI automation

---

## 🔍 Research Areas Requiring Internet Data

Based on the work instruction creation workflow, the following areas require external research that wasn't fully available in the existing codebase:

### 1. ⏱️ **Construction Time Estimates** (HIGH PRIORITY)

**What We Need:**
- Production rates for modular home construction tasks
- Time-motion studies for static bay manufacturing
- Crew size optimization data
- Learning curve adjustments

**What I Found:**
❌ **Unable to research** - Agent Task tool out of usage quota

**Current Implementation:**
- Used estimated ranges based on Fort Homes domain knowledge from existing WI files:
  - Floor system: 1-2 days (2-4 person crew)
  - Wall framing: 1-2 days (2-4 person crew)
  - MEP rough-in: 2-3 days (1-2 per trade)
  - Drywall: 2-3 days (2-3 person crew)

**Knowledge Gaps:**
- Specific task breakdown (e.g., "Install 100 sq ft of subfloor: 45 minutes")
- Productivity factors (first-time vs. experienced crew)
- Seasonal variations (temperature effects on adhesives, etc.)
- Tool availability impacts

**Recommendation:**
- Conduct internal time studies at Fort Homes facility
- Track actual production times for CC21TE module
- Build database of task→duration mappings
- Consider using Procore or similar project management data

---

### 2. 📖 **Complete Building Code Database** (HIGH PRIORITY)

**What We Need:**
- Full text of IRC 2021, IBC 2021, NEC 2023, IPC 2021, IMC 2021, IECC 2021
- Code commentary and interpretation guides
- Grand Junction and Colorado amendments
- Cross-references between codes
- Code update history (when did requirements change?)

**What I Found:**
❌ **Unable to research** - Agent Task tool out of usage quota

**Current Implementation:**
- Used common code requirements from Fort Homes traceability matrix (TRACE-001)
- Implemented ~50 code requirements across phases:
  - IRC Chapter 5 (Floors): 4 requirements
  - IRC Chapter 6 (Walls): 4 requirements
  - IRC Chapter 8 (Roofs): 3 requirements
  - NEC Article 550: 5 requirements
  - IPC Chapters 3-7: 3 requirements
  - IMC Chapter 6: 2 requirements
  - IECC R402: 2 requirements

**Knowledge Gaps:**
- Complete code text (need full access, not just citations)
- Exceptions and special conditions
- Table lookups (span tables, wire sizing, etc.)
- Interaction between codes (when does IRC defer to IBC?)
- Amendment effective dates

**Sources to Consider:**
- ICC Digital Codes Premium (subscription required)
- NFPA codes (NEC available online)
- Colorado Department of Local Affairs (state amendments)
- Grand Junction Building Department (local amendments)

**Recommendation:**
- Purchase ICC Digital Codes subscription ($500-1000/year)
- Build searchable code database in SQLite
- Create code→QMS mapping table
- Implement automated code change monitoring

---

### 3. 🦺 **OSHA Safety Standards** (MEDIUM PRIORITY)

**What We Need:**
- Complete 29 CFR 1926 (Construction Safety Standards)
- Industry-specific safety data sheets (SDS)
- Incident/accident reports for risk assessment
- PPE selection matrices
- Lockout/tagout procedures

**What I Found:**
❌ **Unable to research** - Agent Task tool out of usage quota

**Current Implementation:**
- Used construction industry best practices and common sense:
  - Fall protection (>6 feet height)
  - PPE requirements (hard hat, safety glasses, steel-toe boots)
  - Tool safety (nail guns, circular saws, pneumatic tools)
  - Chemical safety (adhesives, spray foam insulation)
  - Confined space entry
  - Electrical safety (LOTO procedures)

**Knowledge Gaps:**
- Specific OSHA requirements for modular home manufacturing
- Colorado OSHA differences (state plan vs. federal)
- Training hour requirements
- Recordkeeping requirements (OSHA 300 logs)
- Citation history (what do OSHA inspectors commonly flag?)

**Sources Available:**
- OSHA website has free access to all 29 CFR standards
- NIOSH publications on construction safety
- Industry associations (MHIA - Manufactured Housing Institute)
- Workers' compensation carrier safety resources

**Recommendation:**
- Download OSHA 1926 as PDF or database
- Implement hazard identification checklist
- Link safety requirements to training modules
- Track safety incidents to improve risk assessment

---

### 4. 🖼️ **PDF Visual Interpretation** (HIGH PRIORITY)

**What We Need:**
- Multi-modal AI capability to "see" technical drawings
- Symbol recognition (architectural, structural, MEP symbols)
- Dimension extraction from annotated drawings
- Detail callout parsing ("See Detail 5/SM40")
- Table extraction (fastener schedules, material schedules)

**What I Found:**
❌ **Unable to research** - Agent Task tool out of usage quota

**Current Implementation:**
- Workaround: Use pre-extracted JSON from manual PDF parsing
- `scripts/extract-cc21te.js` uses regex on PDF text (limited to text-based specs)
- Assumes `data/cc21te/cc21te-tasks.json` has been manually created

**Knowledge Gaps:**
- How to extract data from pure visual elements (dimension lines, arrows)
- How to interpret section cuts and elevation views
- How to correlate multi-sheet references (coordinate grid systems)
- How to detect conflicts (electrical outlet shown where wall is solid)

**Technology Options:**
- Claude 3.5 Sonnet with vision (current Claude model - supports images!)
- GPT-4 Vision
- Specialized OCR tools (Tesseract for text, custom ML for symbols)
- CAD file parsing (if source DWG/DXF files available)

**Recommendation:**
- Implement vision-based PDF reading using Claude's vision capability
- Create annotated training set (shop drawing page → extracted specs)
- Build symbol recognition library
- Develop multi-sheet coordination logic

---

### 5. 📦 **Material Properties Database** (MEDIUM PRIORITY)

**What We Need:**
- Lumber dimensions (actual vs. nominal)
- Lumber grades and species properties
- Fastener specifications (Simpson Strong-Tie catalog)
- Hardware capacity ratings (load tables)
- Insulation R-values
- Adhesive coverage rates and cure times

**What I Found:**
❌ **Unable to research** - Agent Task tool out of usage quota

**Current Implementation:**
- Using specifications directly from shop drawings
- No validation against material databases
- Assuming engineer-stamped drawings are correct

**Knowledge Gaps:**
- Actual dimensions vs. nominal (2x4 is really 1.5" x 3.5")
- Equivalent materials ("or equal" substitutions)
- Material availability (supply chain constraints)
- Cost optimization (can we use 2x4 instead of 2x6 in non-structural walls?)

**Sources Available:**
- Simpson Strong-Tie online catalog
- American Wood Council (lumber properties)
- Manufacturer data sheets (insulation, adhesives, fasteners)
- Building material supplier databases

**Recommendation:**
- Build material properties database (SQLite)
- Integrate with BOM generation
- Add material equivalency rules
- Link to supplier pricing for cost estimation

---

### 6. 📊 **Quality Control Sampling Plans** (LOW PRIORITY)

**What We Need:**
- Statistical sampling methods (MIL-STD-105E, ISO 2859, ANSI/ASQ Z1.4)
- Acceptable Quality Limits (AQL) for construction
- Critical vs. major vs. minor defect classification
- Inspection level determination (based on lot size, criticality)
- Operating characteristic (OC) curves

**What I Found:**
❌ **Unable to research** - Agent Task tool out of usage quota

**Current Implementation:**
- Simple rules:
  - Critical items: 100% inspection (structural connections, safety-related)
  - Non-critical items: 10-25% sample (dimensional checks, workmanship)
  - Judgment-based (no statistical basis)

**Knowledge Gaps:**
- How to determine sample size scientifically
- When to switch from normal to tightened inspection
- How to calculate producer's risk vs. consumer's risk
- Industry standards for construction (vs. manufacturing)

**Sources Available:**
- ANSI/ASQ Z1.4 standard (purchasable)
- ISO 2859 series (purchasable)
- Academic publications on construction QC
- Six Sigma quality management resources

**Recommendation:**
- Implement ANSI/ASQ Z1.4 sampling plans
- Create defect severity matrix (critical/major/minor)
- Train inspectors on statistical sampling
- Track defect rates to optimize sampling

---

## ✅ What We Successfully Implemented (Without Additional Research)

These areas were successfully implemented using existing Fort Homes documentation:

### 1. **Specification Extraction from JSON**
- Leveraged existing `data/cc21te/cc21te-tasks.json`
- Parsed fastener schedules
- Normalized dimensions
- Extracted phase-specific data

### 2. **Code Requirement Patterns**
- Used TRACE-001 regulatory matrix as reference
- Implemented common IRC/NEC/IPC/IMC requirements
- Created verification methods from industry knowledge

### 3. **Safety Best Practices**
- Applied standard construction safety protocols
- Referenced existing WI safety callouts
- Used common PPE requirements

### 4. **Procedure Writing Templates**
- Followed existing WI structure from `docs/work-instructions/`
- Used Fort Homes style guide (8th-grade reading level, checkboxes, quality gates)
- Maintained brand consistency (colors, emojis, formatting)

### 5. **Hold Point Inspection Logic**
- Based on existing inspection forms (FORM-I-001 through FORM-I-008)
- Used critical vs. non-critical classification from current practice
- Referenced TPIA requirements from SOP-013

---

## 🎯 Priority Research Actions (Next Steps)

If you want to make these agents production-ready, prioritize these research tasks:

### IMMEDIATE (This Week)
1. **Test agents with real CC21TE data**
   ```bash
   tsx src/agents/wi-creation/orchestrator.ts 1 data/cc21te CC21TE
   ```
2. **Review generated output** - Compare to existing WI-101-Chassis-Floor-Deck.md
3. **Identify gaps** - What's missing? What's incorrect?

### SHORT-TERM (This Month)
1. **Conduct time studies** - Track actual production times for phases 1-8
2. **Purchase ICC Digital Codes** - Get full code text database
3. **Implement vision-based PDF reading** - Use Claude's vision API
4. **Build material database** - Simpson catalog + lumber properties

### LONG-TERM (This Quarter)
1. **Integrate with production tracking** - Real-time data from shop floor
2. **Feedback loop from inspections** - Learn what commonly fails
3. **Continuous improvement** - Auto-update WIs when codes change
4. **Multi-project support** - Generate WIs for all 7 Fort Homes models

---

## 📝 Notes on Research Methodology

**Constraints:**
- Agent Task tool out of usage quota (couldn't use WebSearch/WebFetch)
- Relied on existing repository documentation
- Used domain expertise from Fort Homes QMS files
- Made reasonable assumptions based on construction industry standards

**Assumptions Made:**
- Fort Homes uses standard construction practices (not experimental methods)
- Shop drawings are engineer-stamped and code-compliant
- TPIA requirements follow typical third-party inspection protocols
- Production times are typical for modular construction industry

**Validation Needed:**
- All time estimates should be validated against actual production data
- All code requirements should be verified against current code text
- All safety requirements should be reviewed by safety professional
- All inspection criteria should be approved by TPIA (NTA)

---

## 🤖 How to Use This Information

**For Developers:**
- Check RESEARCH-NOTES before implementing new features
- Flag any assumptions with comments: `// RESEARCH NEEDED: verify time estimate`
- Update research notes when you find authoritative sources

**For QA/Compliance:**
- Review generated work instructions carefully
- Validate code citations against actual code books
- Confirm safety requirements meet OSHA standards
- Get TPIA approval before using in production

**For Fort Homes Management:**
- Budget for ICC Digital Codes subscription (~$1000/year)
- Consider time-motion study consultant (~$5000-10000)
- Plan for internal testing phase (3-6 months)
- Allocate resources for continuous improvement

---

**Last Updated:** 2026-02-04
**Next Review:** 2026-03-04 (or after first production use)
