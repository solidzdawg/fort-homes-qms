# SOP-003: Production and Process Control

| Document Control | Information |
| :--- | :--- |
| **Document ID** | SOP-003 |
| **Revision** | 1.0 |
| **Effective Date** | 2026-01-13 |
| **Process Owner** | COO (Marty Magill) |
| **Approval** | Jeff Zimmerman, President |

---

## 1. Purpose
To define controlled conditions for production operations in the Build-in-Place (Static Bay) manufacturing system, ensuring consistent output that meets specifications, regulatory requirements, and customer expectations.

## 2. Scope
This procedure applies to all production activities from module bay assignment through final inspection and transport authorization, covering all 8 production phases.

## 3. Definitions
* **Build-in-Place Manufacturing**: Production methodology where modules remain stationary in assigned bays while trade crews rotate through sequential phases
* **Module Traveler**: Quality record document accompanying each module through all production phases (template: `templates/traveler/traveler-template.json`)
* **Hold Point**: Mandatory inspection checkpoint where work must stop until QA Manager approval is obtained
* **Bay Quarantine**: Complete work stoppage in a bay due to critical nonconformance
* **TPIA**: Third-Party Inspection Agency (ICC NTA-approved inspector)

## 4. Responsibilities

### 4.1 COO (Chief Operating Officer)
* Schedules module production starts (bay assignments)
* Allocates crew resources to phases
* Monitors overall production flow and cycle time
* Authorizes changes to production sequence

### 4.2 Bay Supervisors
* Verify work orders and engineering plans at phase start
* Coordinate trade crews within their assigned bay
* Pre-inspect work before requesting QA Hold Point inspection
* Maintain 5S housekeeping standards in bay

### 4.3 QA Manager
* Conducts Hold Point inspections (HP-1 through HP-8)
* Authorizes phase transitions after inspection approval
* Issues Red Tags for nonconformances
* Coordinates TPIA inspections (HP-4 and HP-8)
* Applies DOH Construction Insignia at HP-8

### 4.4 Production Crew Leads
* Execute work per approved engineering plans and Work Instructions
* Use specified materials and methods
* Complete phase checklist items on Module Traveler
* Request Bay Supervisor pre-inspection when phase complete
* Rework deficiencies identified during inspections

## 5. Procedure

### 5.1 Production Planning and Bay Assignment

#### 5.1.1 Work Order Generation
2. COO generates work order including:
   * Module Serial Number (format: SN-YYYY-###)
   * Model designation (Aspen Commons 1BR/2BR, Melrose 2BR/3BR, Summit 3BR/4BR, Grand 4BR)
   * Engineering plan set (stamped and DOH-approved)
   * Target completion date
   * Customer/project name

3. Work order triggers automatic Module Traveler creation from template

#### 5.1.2 Bay Assignment
* Facility has 5 production bays (Bay 1 through Bay 5)
* COO assigns module to next available bay
* Bay assignment date and Bay Supervisor name recorded on Traveler header
* Target completion date calculated based on phase durations:

| Phase | Typical Duration | Cumulative Days |
| :--- | :--- | :--- |
| 1: Chassis & Floor | 1-2 days | 2 |
| 2: Wall Framing | 2-4 days | 6 |
| 3: Roof Framing | 1-2 days | 8 |
| 4: MEP Rough-In | 3-5 days | 13 |
| 5: Insulation | 1-2 days | 15 |
| 6: Drywall | 3-4 days | 19 |
| 7: Interior Finish | 5-7 days | 26 |
| 8: Final Inspection | 1-2 days | 28 |
| **Total** | **17-28 days** | **28 average** |

#### 5.1.3 Engineering Plan Verification
* Bay Supervisor receives plan set (physical or digital)
* Verifies stamp and signature from Professional Engineer (PE)
* Verifies DOH approval stamp (if required for this project)
* Confirms match between plan revision and work order
* Reports any discrepancies to COO immediately

### 5.2 Controlled Conditions

#### 5.2.1 Environment
* Facility is climate-controlled (heated/cooled to 50-90°F)
* Adequate lighting (minimum 30 footcandles at work surface)
* Clean, dry conditions (no standing water, excessive dust, or debris)
* Secured facility (controlled access, no unauthorized personnel)

#### 5.2.2 Tools and Equipment
* Only calibrated measurement tools used for quality verification (see SOP-005)
* Power tools inspected daily (cords, guards, function)
* Defective tools red-tagged and removed from service immediately
* Material handling equipment (forklifts) operated only by certified personnel

#### 5.2.3 Materials
* Materials received per SOP-004 (Purchasing and Supplier Management)
* Material certifications verified before use (lumber grading stamps, electrical listing labels, plumbing NSF marks)
* Materials stored per manufacturer requirements (dry, protected from UV, temperature limits)
* FIFO (First In, First Out) inventory rotation to prevent expiration (adhesives, caulks, coatings)

#### 5.2.4 Work Instructions
* Phase-specific Work Instructions available at each bay (tablet access or laminated sheets)
* Crew Leads trained on relevant WIs before phase assignment
* WIs include:
  * Step-by-step procedures
  * Material specifications
  * Tool requirements
  * Quality checkpoints
  * Safety warnings

### 5.3 Production Phases and Hold Points

#### 5.3.1 Phase 1: Chassis & Floor Deck (HP-1)

**Work Scope:**
* Rim joist and floor joist assembly
* Structural steel chassis integration (if applicable to model)
* Subfloor adhesive application and fastening
* Bottom board/rodent barrier installation
* Floor insulation (if specified in plans)

**Work Instructions:**
* WI-001: Floor Joist Assembly
* WI-002: Subfloor Installation

**Materials:**
* Engineered lumber or dimensional lumber per plan (grade-stamped)
* Structural steel (if specified, with mill certifications)
* OSB or plywood subfloor (APA-rated)
* Construction adhesive (PL Premium or equivalent, not expired)
* Bottom board (if specified)

**Hold Point HP-1:**
* **Trigger**: Phase 1 work complete, before wall framing begins
* **Blocks**: Phase 2 (wall framing cannot start)
* **TPIA**: Optional
* **Inspection Criteria**:
  * Frame dimensions within ±1/8"
  * Square check: diagonals within 1/4"
  * Joist spacing per plan
  * Subfloor fastener pattern per schedule
  * Adhesive application visible (squeeze-out)
  * Material certifications on file
* **ITP Reference**: ITP-CS-01
* **Form**: FORM-I001 (Floor Inspection Checklist)

**Traveler Signoff**:
* Crew Lead signs pre-inspection checklist
* QA Manager inspects and signs HP-1 section
* Status: Approved / Approved w/ Comments / Not Approved (NCR)
* Date and time recorded
* Photos attached to digital Traveler

#### 5.3.2 Phase 2: Wall Framing & Sheathing (HP-2)

**Work Scope:**
* Wall panel framing (on floor or vertically)
* Wall erection and bracing
* Sheathing installation
* Weather-resistive barrier (WRB) application
* Window and door rough openings
* Structural connectors (hurricane ties, hold-downs, straps)

**Work Instructions:**
* WI-003: Wall Panel Framing
* WI-004: Sheathing and WRB Installation

**Materials:**
* Studs (grade-stamped dimensional lumber)
* Structural sheathing (OSB or plywood, APA-rated)
* WRB (Tyvek, Typar, or equivalent, ICC-ES report)
* Fasteners per nailing schedule
* Simpson or equivalent structural connectors (with ICC-ES listings)

**Hold Point HP-2:**
* **Trigger**: Phase 2 work complete (walls and sheathing), before roof framing
* **Blocks**: Phase 3 (roof framing cannot start)
* **TPIA**: Optional
* **Inspection Criteria**:
  * Walls plumb (±1/8" per 8')
  * Stud spacing per plan
  * Sheathing nailing pattern per schedule
  * WRB installed with proper lapping (minimum 6" horizontal, 6" vertical)
  * Window/door rough openings ±1/4" of specified size
  * Structural connectors per engineered plans
* **ITP Reference**: ITP-CS-02 (Single-Family) or ITP-CS-03 (Multi-Family)
* **Form**: FORM-I002 (Wall Framing Inspection Checklist)

**Traveler Signoff**:
* Crew Lead signs pre-inspection checklist
* QA Manager inspects and signs HP-2 section
* Status recorded
* Structural connector count verified and documented

#### 5.3.3 Phase 3: Roof/Ceiling Framing (HP-3)

**Work Scope:**
* Truss or rafter installation
* Bearing connections
* Hurricane tie/strap installation
* Roof sheathing
* Underlayment (felt or synthetic)
* Attic ventilation provisions (soffit vents, ridge vent, gable vents)

**Work Instructions:**
* WI-005: Truss/Rafter Installation
* WI-006: Roof Sheathing and Underlayment

**Materials:**
* Trusses (engineered, with truss engineer seal) or rafters per plan
* Roof sheathing (OSB or plywood, APA-rated)
* Underlayment (ASTM D226 felt or ASTM D4869 synthetic)
* Hurricane ties (Simpson H series or equivalent, ICC-ES listed)
* Fasteners per nailing schedule

**Hold Point HP-3:**
* **Trigger**: Phase 3 work complete (roof structure), before MEP rough-in
* **Blocks**: Phase 4 (MEP cannot start)
* **TPIA**: Optional
* **Inspection Criteria**:
  * Truss/rafter spacing per plan
  * Bearing connections per engineered details
  * Hurricane ties at all truss/rafter locations
  * Sheathing nailing pattern per schedule
  * Underlayment lapped per manufacturer specs
  * Attic ventilation NFA per IRC R806 (minimum 1:150 ratio, or 1:300 with balanced vents)
* **ITP Reference**: ITP-CS-04
* **Form**: FORM-I003 (Roof Framing Inspection Checklist)

**Traveler Signoff**:
* Crew Lead signs pre-inspection checklist
* QA Manager inspects and signs HP-3 section
* Hurricane tie count recorded (must match truss count)
* Attic ventilation NFA calculation attached

#### 5.3.4 Phase 4: MEP Rough-In & Testing (HP-4) **[CRITICAL - TPIA REQUIRED]**

**Work Scope:**
* Electrical rough-in (circuits, boxes, cables)
* Plumbing DWV (drain-waste-vent) rough-in
* Plumbing water supply rough-in
* HVAC ductwork and equipment rough-in
* Pressure testing (water supply and DWV)
* Electrical continuity verification

**Work Instructions:**
* WI-007: Electrical Rough-In
* WI-008: Plumbing DWV Rough-In
* WI-009: Plumbing Water Supply Rough-In
* WI-010: HVAC Rough-In
* WI-011: Pressure Testing Procedures

**Materials:**
* Electrical: NM-B cable (UL listed), boxes (UL listed), devices per NEC 2023
* Plumbing: PEX or CPVC (NSF-61), DWV piping (Schedule 40 PVC, ABS, or CI)
* HVAC: Sheet metal ductwork, flex duct (UL 181), equipment (AHRI certified)

**Hold Point HP-4:**
* **Trigger**: Phase 4 work complete (all MEP rough-in and testing), before insulation
* **Blocks**: Phase 5 (insulation cannot start)
* **TPIA**: **REQUIRED** - This is CLOSED CONSTRUCTION (MEP will be concealed)
* **Inspection Criteria**:
  * Water supply pressure test PASSED: 100 PSI, 15 minutes, no drop
  * DWV test PASSED: 10 ft water head OR 5 PSI air, 15 minutes, no leaks/drop
  * Electrical continuity: All circuits verified
  * Wire sizing per load calculations and NEC Table 310.16
  * AFCI/GFCI locations per NEC 2023 (210.12, 210.8)
  * Fixture counts match permit
  * Box fill calculations comply with NEC 314.16
* **ITP Reference**: ITP-E-01 (Electrical Service and Panels), ITP-E-02 (Branch Circuits), ITP-P-01 (DWV), ITP-P-02 (Water Supply), ITP-P-03 (Fixtures), ITP-P-04 (Gas Piping, if applicable), ITP-M-01 (Ductwork), ITP-M-02 (Equipment), ITP-M-03 (Combustion Air/Venting)
* **Form**: FORM-I004 (MEP Rough-In Inspection Checklist)

**Test Requirements:**
* Water Supply Pressure Test:
  * Close all fixtures/valves
  * Attach gauge at main supply connection
  * Pressurize to 100 PSI using manual pump or air compressor
  * Monitor for 15 minutes
  * Pass: No pressure drop (max 2 PSI allowed per some jurisdictions, but target 0 drop)
  * Fail: Visible drop → locate and repair leak → retest

* DWV Test (Water Method):
  * Plug all DWV outlets
  * Fill system with water to 10 ft head (roof level or temporary standpipe)
  * Inspect all joints for leaks
  * Pass: No leaks for 15 minutes

* DWV Test (Air Method, preferred if freezing conditions):
  * Plug all DWV outlets
  * Attach gauge and inflate to 5 PSI
  * Monitor for 15 minutes
  * Pass: Pressure holds (max 1 PSI drop acceptable per IRC P2503.5.1)

**Traveler Signoff:**
* Trade Crews (Electrical, Plumbing, HVAC) sign respective sections
* QA Manager witnesses tests and signs HP-4 section
* **TPIA Inspector** signs HP-4 section (MANDATORY)
* Test data recorded: start/end pressure, duration, pass/fail
* Photos of tests in progress and all rough-in areas

**TPIA Coordination:**
* QA Manager schedules TPIA inspection at least 48 hours in advance
* TPIA invoice and report filed in Module documentation package
* If TPIA finds deficiency: Red Tag issued, work stopped, NCR opened, reinspection scheduled after correction

#### 5.3.5 Phase 5: Insulation & Air Sealing (HP-5)

**Work Scope:**
* Cavity insulation (fiberglass batts, spray foam, or blown-in)
* Rim joist insulation and air sealing
* Penetration sealing (electrical/plumbing penetrations through envelope)
* Vapor retarder installation (if required per IECC climate zone)
* Pre-drywall blower door test (optional but recommended for IHIP projects)

**Work Instructions:**
* WI-012: Insulation Installation
* WI-013: Air Sealing Procedures

**Materials:**
* Insulation: Certified R-value matching plan specs (manufacturer label required)
* Air sealing: Caulk, spray foam, gaskets, tape (ASTM E283 tested products)
* Vapor retarder: Polyethylene film (if required, 6-mil minimum) or kraft-faced batts

**Hold Point HP-5:**
* **Trigger**: Phase 5 work complete (insulation and air barrier), before drywall
* **Blocks**: Phase 6 (drywall cannot start)
* **TPIA**: Optional
* **Inspection Criteria**:
  * Insulation R-values match approved plans and IECC Table R402.1.2
  * Installation quality: RESNET Grade I (no gaps, voids, compression >5%)
  * All penetrations sealed (visual inspection with flashlight from attic/crawl)
  * Vapor retarder installed per IECC R702.7 (if required for climate zone)
  * Rim joist insulation continuous and sealed
* **ITP Reference**: ITP-A-01 (Insulation), ITP-A-02 (Air Sealing)
* **Form**: FORM-I005 (Insulation Inspection Checklist)

**Energy Compliance:**
* IHIP Grant units target: HERS Index ≤50, Air Leakage ≤3.0 ACH50
* Blower door test may be conducted at HP-5 (pre-drywall) or HP-8 (final)
* Test conducted by certified RESNET Rater or equivalent
* If test fails at HP-5, corrective air sealing performed before drywall

**Traveler Signoff:**
* Insulation Crew signs pre-inspection checklist
* QA Manager inspects and signs HP-5 section
* Blower door test results attached (if conducted at this phase)
* Insulation certificate/label photos

#### 5.3.6 Phase 6: Drywall & Interior Shell (HP-6)

**Work Scope:**
* Drywall hanging (walls and ceilings)
* Taping, mudding, and finishing
* Sanding and touch-up
* Box cutouts for electrical and HVAC registers
* Fire-rated assembly verification (if applicable)

**Work Instructions:**
* WI-014: Drywall Installation
* WI-015: Drywall Finishing

**Materials:**
* Drywall: 1/2" standard, 5/8" Type X fire-rated (where required), moisture-resistant (bathrooms/kitchens)
* Joint compound: ASTM C475 compliant
* Fasteners: Per ASTM C1002 (screws) or ASTM F1667 (nails)

**Hold Point HP-6:**
* **Trigger**: Phase 6 work complete (drywall hung and finished), before interior trim
* **Blocks**: Phase 7 (interior finish cannot start)
* **TPIA**: Optional
* **Inspection Criteria**:
  * Fastener spacing per schedule (typically 12" OC ceiling, 16" OC walls)
  * Fire-rated assemblies correct type and thickness (verify markings)
  * Finish quality: Level 4 minimum per ASTM C840 (Level 5 where specified on plans)
  * Box cutouts clean and properly sized
  * No visible defects: no bubbles, ridges, nail pops, gouges
* **ITP Reference**: ITP-A-03 (Drywall)
* **Form**: FORM-I006 (Drywall Inspection Checklist)

**Traveler Signoff:**
* Drywall Crew signs pre-inspection checklist
* QA Manager inspects and signs HP-6 section (conducted under raking light for defect detection)
* Fire-rated assembly locations documented (if applicable)

#### 5.3.7 Phase 7: Interior Finish & Trim (QA-7)

**Work Scope:**
* Paint (primer and finish coats)
* Flooring installation (LVP, carpet, tile)
* Interior doors and hardware
* Cabinets and countertops
* Trim and molding (base, casing, crown)
* Electrical device installation (switches, receptacles, covers)
* Plumbing fixture installation (sinks, toilets, faucets, showerheads)
* HVAC register and grille installation
* Appliance installation (range, refrigerator, microwave, etc.)

**Work Instructions:**
* WI-016: Paint Application
* WI-017: Flooring Installation
* WI-018: Cabinet Installation
* WI-019: Electrical Device Installation
* WI-020: Plumbing Fixture Installation

**Materials:**
* Paint: Low-VOC, manufacturer-specified coverage
* Flooring: Per plan specs (LVP, carpet, tile)
* Cabinets: Pre-manufactured or custom, per customer order
* Fixtures and devices: UL/NSF listed

**Inspection QA-7** (Not a blocking Hold Point, but quality inspection):
* **Trigger**: Phase 7 work substantially complete
* **Blocks**: Does not block Phase 8, but deficiencies documented on punch list
* **TPIA**: Optional
* **Inspection Criteria**:
  * Paint quality: even coverage, no drips, holidays, or roller marks
  * Flooring installation: level, no gaps at transitions, properly adhered
  * Door operation: smooth swing, proper latching, no binding
  * Cabinet alignment: level, plumb, doors aligned and gaps even
  * Fixture operation: all electrical devices functional, all plumbing fixtures flow properly
  * GFCI/AFCI function: all devices trip and reset using test button
* **ITP Reference**: ITP-A-04 (Paint and Finishes), ITP-A-05 (Casework), ITP-E-03 (Device Installation), ITP-P-05 (Fixture Installation)
* **Form**: FORM-I007 (Interior Finish Inspection Checklist)

**Punch List:**
* QA Manager documents all deficiencies on punch list
* Punch list items assigned back to responsible crew for correction
* Punch list cleared before HP-8 final inspection

**Traveler Signoff:**
* Finish Crews sign respective sections
* QA Manager inspects and signs QA-7 section
* Punch list attached to Traveler (paper or digital)

#### 5.3.8 Phase 8: Final Inspection & Pre-Ship (HP-8) **[CRITICAL - TPIA REQUIRED]**

**Work Scope:**
* Punch list completion verification
* Comprehensive system testing (electrical, plumbing, HVAC)
* Final blower door test (if not conducted at HP-5)
* Exterior finish verification
* Weatherproofing for transport
* Module documentation package assembly
* TPIA final inspection
* DOH Construction Insignia application

**Work Instructions:**
* WI-021: Final Inspection Procedures
* WI-022: Blower Door Testing
* WI-023: Weatherproofing for Transport
* WI-024: Documentation Package Assembly

**Hold Point HP-8:**
* **Trigger**: All work complete, punch list items resolved, ready for insignia
* **Blocks**: Bay exit, DOH insignia application, transport authorization
* **TPIA**: **REQUIRED** - Final inspection before insignia
* **Inspection Criteria**:
  * All previous hold points (HP-1 through HP-6) signed off
  * All NCRs closed (verified in NCR Log)
  * Traveler documentation complete (all sections signed)
  * TPIA approval obtained
  * Final blower door test PASSED: ≤3.0 ACH50 (IHIP requirement)
  * All systems functional (comprehensive testing)
  * Transport readiness: weatherproofing complete, no loose materials, tie-downs secure
* **ITP Reference**: ITP-A-06 (Final QA), ITP-CS-05 (Transport Prep)
* **Form**: FORM-I008 (Final Inspection Checklist)

**Final Blower Door Test:**
* Conducted by certified RESNET Rater or HERS Rater
* Test procedure per ANSI/RESNET/ICC 380
* Target: ≤3.0 ACH50 (air changes per hour at 50 Pascals depressurization)
* Test report filed in Module documentation package
* If test fails: identify leakage sources, seal, retest

**TPIA Final Inspection:**
* QA Manager schedules TPIA final inspection at least 48 hours in advance
* TPIA conducts comprehensive review:
  * Verifies all previous inspection points (HP-1 through HP-6)
  * Reviews all documentation (Traveler, test reports, NCR closures, material certs)
  * Conducts final walkthrough inspection
  * Issues final approval letter
* TPIA invoice and final report filed in Module documentation package

**DOH Insignia Application:**
* **Authorized Person**: QA Manager (Zach Lamont) ONLY
* Label Type: DOH Construction Insignia (Red Label) per 8 CCR 1302-14
* Location: Per DOH specifications (typically near electrical panel or main entry door, visible and permanent)
* Insignia Number: Recorded on Traveler and in DOH tracking system/database
* Insignia Log: QA Manager maintains log of all insignia numbers and corresponding module serial numbers

**Traveler Signoff:**
* Production Manager signs final verification
* QA Manager signs HP-8 section
* **TPIA Inspector** signs HP-8 section (MANDATORY)
* DOH insignia number recorded
* Bay exit date and actual days-in-bay calculated
* Traveler sealed and filed in module documentation package

### 5.4 Bay Status and Work Authorization

#### 5.4.1 Bay Status Indicators
Each bay has status board visible from main aisle:
* **GREEN**: Work in progress, on schedule
* **YELLOW**: Minor issue, behind schedule, or awaiting inspection
* **RED**: Bay quarantined due to NCR, work stopped


#### 5.4.2 Work Stoppage Conditions
Work in a phase must STOP if:
* Hold Point inspection is pending (crew has completed work and requested QA inspection)
* NCR issued (Red Tag applied to nonconforming item or area)
* Missing or expired material certification
* Engineering plan discrepancy or ambiguity identified
* Safety hazard present
* Equipment failure affecting quality (e.g., nail gun misfiring)

Bay Supervisor notifies COO immediately of any stoppage condition

#### 5.4.3 Work Authorization to Proceed
Work may resume only when:
* QA Manager signs Hold Point approval on Traveler (transitions to next phase)
* NCR closed and verification inspection passed
* Material certification obtained
* Engineering clarification received from PE (Registered Design Change or RFI response)
* Safety hazard corrected
* Equipment repaired or replaced

### 5.5 Change Control

#### 5.5.1 Engineering Changes
If field conditions require deviation from approved plans:
1. Bay Supervisor documents issue and proposed solution
2. Submits to COO for review
3. If structural, envelope, or MEP-related: requires PE review and stamped approval
4. If DOH-jurisdictional: requires DOH approval (submit via CDOLA portal)
5. Approved change documented on Traveler as "Registered Design Change (RDC)"
6. Copy of RDC filed in module documentation package

#### 5.5.2 Material Substitutions
If specified material is unavailable:
1. Bay Supervisor proposes equivalent substitute
2. QA Manager verifies equal-or-better performance (ratings, certifications)
3. For critical components (structural, fire-rated, MEP), requires PE approval
4. Substitution documented on Traveler
5. Material certification for substitute obtained and filed

### 5.6 Verification and Traceability

#### 5.6.1 Module Traveler
* Traveler is the primary quality record for each module
* Accompanies module through all phases (physical clipboard or tablet/digital)
* Contains:
  * Header information (serial number, model, bay, dates, supervisor)
  * Phase signoff sections (HP-1 through HP-8)
  * Checklist items for each phase
  * Test results (pressure tests, blower door)
  * NCR references (if any)
  * Material certification checklist
  * Photos (minimum 2 per phase)
  * Final signoffs and insignia number

#### 5.6.2 Traceability
* Module Serial Number links to:
  * Engineering plan set (revision)
  * Material lot numbers (recorded during receiving or on Traveler)
  * Inspection records (Traveler, TPIA reports)
  * NCRs (if any, cross-referenced by serial number)
  * Customer order and eventual site address

### 5.7 Production Metrics and Monitoring

#### 5.7.1 Key Performance Indicators (KPIs)
* **Cycle Time**: Days from bay assignment to HP-8 approval (Target: ≤28 days)
* **First-Pass Yield**: % of Hold Point inspections passed without NCR (Target: ≥95%)
* **NCR Rate**: Number of NCRs per module (Target: <2)
* **On-Time Delivery**: % of modules completing by target date (Target: ≥90%)
* **Rework Hours**: Hours spent on NCR corrections (Target: minimize)

#### 5.7.2 Monitoring
* QA Manager reviews Hold Point pass/fail data weekly
* Monthly production meeting reviews KPIs and trends
* Continuous improvement actions initiated for adverse trends

## 6. Records
* Module Traveler (permanent record, filed with module documentation package)
* Hold Point inspection forms (FORM-I001 through FORM-I008)
* Test reports (pressure tests, blower door, HERS rating)
* TPIA inspection reports (HP-4 and HP-8)
* NCRs (cross-referenced to module serial numbers)
* Engineering changes (RDCs)
* Material certifications
* Photos (digital, organized by serial number and phase)
* DOH Insignia Log
* Production KPI reports (monthly)

Retention: 10 years (or per DOH requirements, whichever is longer)

## 7. References
* Fort Homes QMS Manual FHDEV-QMS-BIP-001, Section 8.5 (Production and Service Provision)
* SOP-004: Purchasing and Supplier Management
* SOP-005: Equipment and Measuring Device Control
* SOP-007: Control of Nonconforming Outputs
* All Work Instructions (WI-001 through WI-024)
* All Inspection Test Plans (ITPs)
* Module Traveler Template: `templates/traveler/traveler-template.json`
* Data Files: `data/phases.json`, `data/hold-points.json`, `data/itps.json`
* 2021 IRC (International Residential Code)
* NEC 2023 (National Electrical Code)
* 2021 IPC (International Plumbing Code)
* 2021 IECC (International Energy Conservation Code)
* Colorado DOH Regulations: 8 CCR 1302-14
* ANSI/RESNET/ICC 380 (Blower Door Testing)

---

**Document Approval:**

| Role | Name | Signature | Date |
| :--- | :--- | :--- | :--- |
| Prepared By | Marty Magill, COO | _______________ | 2026-01-13 |
| Approved By | Jeff Zimmerman, President | _______________ | 2026-01-13 |
