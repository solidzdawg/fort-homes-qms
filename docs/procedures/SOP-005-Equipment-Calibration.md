# SOP-005: Equipment and Measuring Device Control

| Document Control | Information |
| :--- | :--- |
| **Document ID** | SOP-005 |
| **Revision** | 1.0 |
| **Effective Date** | 2026-01-13 |
| **Process Owner** | QA Manager (Zach Lamont) |
| **Approval** | Jeff Zimmerman, President |

---

## 1. Purpose
To ensure that equipment used to measure, test, or inspect products is properly maintained, calibrated, and verified to provide accurate and reliable results.

## 2. Scope
This procedure applies to:
* Measuring and test equipment (M&TE) used for Hold Point inspections and verification
* Production equipment affecting product quality
* Monitoring and test equipment (environmental, safety)

## 3. Definitions
* **Calibration**: Comparison of a measurement device to a known standard and adjustment to bring within tolerance
* **Verification**: Confirmation that equipment meets specified requirements (may not include adjustment)
* **M&TE (Measuring and Test Equipment)**: Devices used to quantify dimensions, forces, pressures, or other measurable characteristics
* **Traceability**: Ability to relate measurement to national/international standards (NIST)
* **Calibration Status**: Indication showing whether equipment is in calibration, when due, or out-of-calibration

## 4. Responsibilities

### 4.1 QA Manager
* Maintains Master Equipment List
* Establishes calibration schedules and requirements
* Coordinates calibration services (internal or external)
* Verifies calibration certificates and traceability
* Labels equipment with calibration status
* Quarantines out-of-calibration equipment
* Investigates impact of out-of-tolerance findings

### 4.2 Bay Supervisors
* Ensure crews use only calibrated M&TE for inspections
* Perform pre-use checks on critical equipment
* Report damaged or suspect equipment immediately
* Ensure production equipment is maintained per schedules

### 4.3 Equipment Users (Crew Leads, Inspectors)
* Verify calibration status before use (check label)
* Handle equipment per manufacturer instructions
* Report damage, malfunction, or suspected inaccuracy immediately
* Never use equipment marked "OUT OF CALIBRATION" or "DO NOT USE"

## 5. Procedure

### 5.1 Equipment Identification and Inventory

#### 5.1.1 Master Equipment List
QA Manager maintains list including:

**Measuring and Test Equipment (M&TE):**
| Equipment ID | Description | Manufacturer/Model | Serial Number | Location | Calibration Frequency | Last Cal Date | Next Due Date | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| MTE-001 | 25' Tape Measure | Stanley FatMax | SN12345 | Bay 1 Toolbox | Annual | 2025-12-15 | 2026-12-15 | IN CAL |
| MTE-002 | 4' Level (Digital) | Stabila TECH 196 | SN67890 | QA Office | Annual | 2025-11-20 | 2026-11-20 | IN CAL |
| MTE-003 | Moisture Meter | Protimeter Surveymaster | SN24680 | QA Office | Annual | 2026-01-05 | 2027-01-05 | IN CAL |
| MTE-004 | Pressure Gauge (0-200 PSI) | Wika 232.50 | SN13579 | Plumbing Cart | Annual | 2025-09-10 | 2026-09-10 | DUE SOON |
| MTE-005 | Blower Door System | Minneapolis BlowerDoor Model 4 | SN55555 | QA Storage | Annual | 2025-10-01 | 2026-10-01 | DUE SOON |
| MTE-006 | Continuity Tester | Fluke T6-600 | SN98765 | Electrical Cart | Biennial | 2024-06-15 | 2026-06-15 | IN CAL |
| MTE-007 | GFCI/AFCI Tester | Ideal SureTest 61-165 | SN11223 | Electrical Cart | Biennial | 2025-03-20 | 2027-03-20 | IN CAL |
| MTE-008 | Digital Calipers (6") | Mitutoyo 500-196-30 | SN33445 | QA Office | Annual | 2025-12-01 | 2026-12-01 | IN CAL |

**Critical Production Equipment:**
| Equipment ID | Description | Maintenance Frequency | Last Service | Next Due | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PROD-001 | Pneumatic Framing Nailer (Bay 1) | Quarterly inspection | 2025-12-10 | 2026-03-10 | OK |
| PROD-002 | Pneumatic Framing Nailer (Bay 2) | Quarterly inspection | 2025-11-15 | 2026-02-15 | OK |
| PROD-003 | Air Compressor (Main) | Monthly filter, Annual overhaul | 2025-12-20 | 2026-01-20 | OK |
| PROD-004 | Forklift (Toyota 8FGU25) | Annual PM + OSHA inspection | 2025-08-05 | 2026-08-05 | OK |
| PROD-005 | Panel Saw | Semi-annual blade/guard inspection | 2025-10-10 | 2026-04-10 | OK |

#### 5.1.2 Equipment Categorization

**Category A: Critical M&TE** (used for Hold Point acceptance decisions)
* Tape measures (25', 100')
* Levels (4', 6', laser levels)
* Squares (framing square, speed square)
* Pressure gauges (water, air, gas)
* Electrical testers (continuity, GFCI/AFCI, voltage)
* Blower door equipment (fan, manometer, digital gauge)
* Moisture meters
* Calipers and micrometers (for dimensional verification)

**Calibration Required:** Yes, per schedule in Section 5.2

**Category B: Reference Standards** (used to verify Category A equipment)
* Certified tape measure (100', NIST-traceable)
* Calibration weights (for pressure gauge verification)
* Known voltage sources (for electrical tester verification)

**Calibration Required:** Yes, by external NIST-traceable lab

**Category C: Production Equipment** (affects quality but not direct measurement)
* Nail guns, saws, drills
* Air compressors
* Forklifts and material handling
* Ladders and scaffolding

**Calibration Required:** No, but preventive maintenance per schedule

#### 5.1.3 Equipment Labeling
Each M&TE device has tamper-evident label affixed showing:
* Equipment ID (MTE-###)
* Last Calibration Date
* Next Calibration Due Date
* Calibrated By (initials or company name)
* Status:
  * **GREEN label**: "IN CALIBRATION" - OK to use
  * **YELLOW label**: "CALIBRATION DUE SOON" (within 30 days) - OK to use but schedule calibration
  * **RED label**: "OUT OF CALIBRATION - DO NOT USE" - Quarantine immediately

### 5.2 Calibration Requirements and Frequency

#### 5.2.1 Calibration Frequency Table

| Equipment Type | Frequency | Calibration Method | Performed By |
| :--- | :--- | :--- | :--- |
| Tape Measures (25', 100') | Annual | Compare to certified reference tape at 1', 10', 25', 50', 100' marks. Tolerance: ±1/16" at any point | Internal (QA Manager) using NIST-traceable reference tape |
| Levels (Bubble and Digital) | Annual | Verify bubble centering or digital reading on known flat and plumb surfaces. Tolerance: ±0.05° | Internal (QA Manager) using calibrated level table or laser level |
| Squares (Framing, Speed) | Annual | Verify 90° angle using precision square or trigonometry (3-4-5 triangle, measure hypotenuse). Tolerance: ±1/32" over 24" | Internal (QA Manager) |
| Pressure Gauges (Water, Air) | Annual | Compare to calibrated reference gauge at 0, 50, 100, 150, 200 PSI. Tolerance: ±2 PSI or ±2% of reading, whichever greater | External (certified calibration lab) or Internal if reference gauge NIST-traceable |
| Moisture Meters | Annual | Verify using calibration blocks provided by manufacturer (known moisture content standards) | Internal (QA Manager) using manufacturer blocks, OR External lab |
| Electrical Testers (Continuity, Voltage) | Biennial | Verify continuity detection and voltage reading accuracy against known sources. Tolerance: ±5% of reading | External (certified electrical cal lab) |
| GFCI/AFCI Testers | Biennial | Verify trip times within NFPA 70 (NEC) specifications (GFCI: 5mA ± 1mA trip, <40ms; AFCI: per UL 1699 arcing simulation) | External (certified electrical cal lab) |
| Blower Door Equipment | Annual | Fan flow calibration per ANSI/RESNET/ICC 380. Pressure transducer verified with known pressures (10, 25, 50, 75 Pa). Tolerance: ±3% of reading | External (manufacturer or accredited blower door cal service) |
| Digital Calipers/Micrometers | Annual | Compare readings to gauge blocks (NIST-traceable). Tolerance: ±0.001" | External (metrology lab) or Internal if gauge blocks certified |

#### 5.2.2 New Equipment Calibration
* All new M&TE calibrated before first use
* Equipment purchased from calibration-capable supplier may be accepted with calibration certificate (verify NIST traceability and calibration date <30 days old)

### 5.3 Calibration Process

#### 5.3.1 Internal Calibration (Category A equipment, select items)
1. QA Manager schedules calibration 30 days before due date
2. Remove equipment from service (apply YELLOW label "CALIBRATION IN PROGRESS")
3. Perform calibration procedure using reference standards:
   * Record readings at specified points
   * Compare to reference standards
   * If within tolerance: Document "PASS"
   * If out-of-tolerance: Adjust if possible and retest, OR send to external lab for repair/calibration
4. Complete Calibration Record (FORM-CAL01) including:
   * Equipment ID
   * Calibration date
   * Reference standard used (with its calibration certificate number)
   * As-found readings
   * As-left readings (if adjustment made)
   * Pass/Fail status
   * Calibrated by (signature)
   * Next due date
5. Apply GREEN label to equipment
6. Update Master Equipment List

#### 5.3.2 External Calibration (Category B reference standards, complex equipment)
1. QA Manager packages equipment and ships to accredited calibration lab
2. Lab must provide:
   * NIST-traceable calibration certificate
   * As-found and as-left data
   * Statement of uncertainty
   * Standards used (with their NIST traceability chain)
3. Upon return, QA Manager verifies:
   * Certificate completeness
   * Calibration date and due date
   * Equipment passed calibration (if failed, see Section 5.5)
4. File certificate in equipment calibration folder
5. Apply GREEN label
6. Update Master Equipment List

### 5.4 Pre-Use Verification

Before each use for critical measurements (Hold Point inspections), user performs quick functionality check:

**Tape Measure:**
* Extend and retract smoothly
* Hook end secure (not bent or loose)
* Markings legible
* Check calibration label: IN CALIBRATION

**Level:**
* Bubble vials not cracked or cloudy
* Bubble centers when on known flat/plumb surface
* Digital level: battery OK, powers on, reads reasonably
* Check calibration label: IN CALIBRATION

**Pressure Gauge:**
* Needle returns to zero when not pressurized
* No visible damage to gauge face
* Fittings not leaking
* Check calibration label: IN CALIBRATION

**Electrical Tester:**
* Battery OK (perform self-test if available)
* Test on known live circuit (120V receptacle) - reads correctly
* Test GFCI tester on actual GFCI - trips device
* Check calibration label: IN CALIBRATION

If any check fails: **DO NOT USE - Report to Bay Supervisor or QA Manager immediately**

### 5.5 Out-of-Calibration Equipment

#### 5.5.1 Discovery
If equipment found out-of-calibration:
* During calibration: As-found readings exceed tolerance
* During use: User suspects inaccuracy (readings inconsistent, equipment damaged)
* Due date passed: QA Manager identifies during Master List review

#### 5.5.2 Immediate Actions
1. Remove equipment from service immediately
2. Apply RED label: "OUT OF CALIBRATION - DO NOT USE"
3. Quarantine equipment (locked cabinet in QA office)
4. Notify QA Manager

#### 5.5.3 Investigation and Impact Assessment
QA Manager determines:
* When did equipment go out-of-calibration? (estimate based on as-found data and usage)
* What inspections or measurements were performed with this equipment since last calibration?
* What is the magnitude of error? (e.g., tape measure reading 1/8" long)
* Could this error have caused acceptance of nonconforming product? (compare error magnitude to acceptance tolerances)

**Example:**
* Tape measure found reading 1/8" long at 10' mark during annual calibration
* Last calibration: 12 months ago
* Inspections using this tape: HP-1 (floor squaring), HP-2 (stud spacing), etc.
* Impact: Floor squaring tolerance is ±1/8", so a 1/8" tape error could result in out-of-tolerance condition not being detected
* Action: Review all modules inspected with this tape in past 12 months (identify via Module Traveler records showing which tape used). Re-inspect critical dimensions on any modules still in-house. For shipped modules: Evaluate risk (if no field reports of issues, close with note; if issues reported, investigate and correct).

#### 5.5.4 Corrective Actions
* Equipment repaired/recalibrated by qualified source
* If beyond repair: Scrap and procure replacement
* If significant impact on product: Initiate CAPA (SOP-008)

### 5.6 Equipment Maintenance (Category C Production Equipment)

#### 5.6.1 Preventive Maintenance
* Bay Supervisors maintain PM schedule for production equipment
* Manufacturer-recommended maintenance intervals followed
* PM tasks documented on Equipment Maintenance Log (FORM-MAINT01)

**Examples:**
* Nail guns: Daily visual inspection, weekly lubrication, quarterly depth adjustment check
* Air compressor: Daily condensate drain, monthly filter change, annual motor/pump inspection
* Forklift: Daily pre-use inspection, annual OSHA inspection by certified technician
* Panel saw: Semi-annual blade sharpness and guard function check

#### 5.6.2 Repair
* Malfunctioning equipment red-tagged immediately
* Repairs performed by qualified technician (in-house if competent, or external service)
* Repair documented: Date, issue, actions taken, parts replaced, tested by
* Equipment re-labeled "IN SERVICE" after successful post-repair test

### 5.7 Handling, Storage, and Transportation

* M&TE stored in dedicated locations (toolboxes, QA office cabinet)
* Protect from impacts, moisture, temperature extremes, and magnetic fields
* Transport in padded cases when moving between bays
* Never drop or throw precision equipment
* Clean after use (remove sawdust, adhesive, etc.)

### 5.8 Records and Traceability

#### 5.8.1 Calibration Records
For each M&TE device, maintain folder containing:
* Calibration certificates (external) or Calibration Records FORM-CAL01 (internal)
* Purchase receipt (proof of original source)
* Manufacturer calibration data (if provided new)
* Repair history
* Traceability: Each calibration certificate references NIST-traceable standards used

Retention: Life of equipment + 3 years

#### 5.8.2 Equipment Usage Logs (for critical measurements)
Module Travelers note which M&TE device used for Hold Point inspection (e.g., "HP-1 inspection performed with MTE-001 (tape), MTE-002 (level)"). Provides traceability if out-of-tolerance equipment discovered.

### 5.9 Control of Customer-Supplied or External Test Equipment

If TPIA or other external inspector uses their own M&TE on Fort Homes modules:
* Fort Homes may request to see calibration certificate (verify current)
* If inspector's equipment suspect, Fort Homes may re-inspect with Fort Homes M&TE
* Fort Homes is not responsible for calibration of external inspector's equipment, but may raise concern if obvious inaccuracy observed

## 6. Exceptions

**Non-Critical Measurement Tools:**
* Tape measures, levels, and squares used for rough layout (not final verification) do NOT require formal calibration, but must be visually inspected for damage
* These tools marked "LAYOUT ONLY - NOT FOR QA INSPECTION"

**Off-the-Shelf Rulers/Gauges:**
* If purchased from reputable source with manufacturer certification, may be accepted without additional calibration if used within manufacturer's stated accuracy limits (e.g., a commercial 6' folding rule stamped "Accurate to 1/16"" used for rough measurements)

## 7. Records
* Master Equipment List (updated continuously)
* Calibration Certificates (external labs)
* Calibration Records FORM-CAL01 (internal calibrations)
* Equipment Maintenance Logs FORM-MAINT01 (production equipment)
* Out-of-Calibration Investigation Reports
* Purchase records (M&TE and reference standards)

Retention: Life of equipment + 3 years (calibration records), 3 years (maintenance logs)

## 8. References
* Fort Homes QMS Manual FHDEV-QMS-BIP-001, Section 7.1.5 (Monitoring and Measuring Resources)
* SOP-003: Production and Process Control (measurement requirements by phase)
* SOP-007: Control of Nonconforming Outputs (NCR process for out-of-cal impact)
* SOP-008: Corrective and Preventive Action (CAPA for systemic calibration issues)
* ANSI/NCSL Z540.3 (Calibration requirements, NIST traceability)
* ANSI/RESNET/ICC 380 (Blower door calibration)
* OSHA 29 CFR 1910.178 (Forklift inspection and maintenance)

---

**Document Approval:**

| Role | Name | Signature | Date |
| :--- | :--- | :--- | :--- |
| Prepared By | Zach Lamont, QA Manager | _______________ | 2026-01-13 |
| Approved By | Jeff Zimmerman, President | _______________ | 2026-01-13 |
