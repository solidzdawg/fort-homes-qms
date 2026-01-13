# SOP-008: Corrective and Preventive Action (CAPA)

| Document Control | Information |
| :--- | :--- |
| **Document ID** | SOP-008 |
| **Revision** | 1.0 |
| **Effective Date** | 2026-01-13 |
| **Process Owner** | QA Manager (Zach Lamont) |
| **Approval** | Jeff Zimmerman, President |

---

## 1. Purpose
To establish a systematic process for identifying, analyzing, correcting, and preventing quality problems to drive continuous improvement and eliminate root causes of nonconformances.

## 2. Scope
This procedure applies to:
* Corrective actions: Actions to eliminate causes of detected nonconformances
* Preventive actions: Actions to eliminate causes of potential nonconformances

**CAPA triggers include:**
* Recurring NCRs (same issue ≥3 times in 6 months)
* Significant single NCR (safety risk, regulatory violation, customer complaint)
* Internal or external audit findings (Major findings mandatory CAPA)
* Process performance trending below target (KPIs declining)
* Customer complaints
* Near-miss events (potential quality or safety issues)

## 3. Definitions
* **Corrective Action**: Action to eliminate the cause of a detected nonconformance or other undesirable situation
* **Preventive Action**: Action to eliminate the cause of a potential nonconformance or other potential undesirable situation
* **Root Cause**: Fundamental reason for a nonconformance or problem (not just the symptom)
* **Root Cause Analysis (RCA)**: Systematic investigation to identify root causes (methods: 5 Whys, Fishbone Diagram, Fault Tree Analysis)
* **Containment**: Immediate action to address the specific nonconformance (fix the defect, quarantine material)
* **Effectiveness Check**: Verification that corrective action eliminated the root cause and prevented recurrence

## 4. Responsibilities

### 4.1 QA Manager
* Maintains CAPA Log (master list of all CAPAs)
* Initiates CAPA requests based on triggers
* Facilitates root cause analysis
* Reviews and approves CAPA plans
* Tracks CAPA implementation
* Conducts effectiveness checks
* Reports CAPA status at Management Review

### 4.2 Process Owners (COO, Bay Supervisors, etc.)
* Participate in root cause analysis
* Develop and implement corrective/preventive action plans
* Provide resources for implementation
* Report implementation status to QA Manager
* Provide evidence for effectiveness verification

### 4.3 President (Top Management)
* Reviews major CAPAs at Management Review
* Authorizes resources for significant corrective actions (budget, personnel, equipment)
* Holds Process Owners accountable for timely implementation

## 5. Procedure

### 5.1 CAPA Initiation

#### 5.1.1 Triggers
CAPA initiated when any of the following occur:

**Mandatory Triggers:**
* **Recurring NCRs**: Same defect type occurs 3+ times in 6-month period
  * Example: "Electrical boxes improperly secured - occurrence in modules SN-2025-015, SN-2025-022, SN-2025-031"
* **Major Audit Finding**: Internal or external audit identifies major nonconformance
* **Regulatory Violation**: Nonconformance to DOH regulations or building codes that could affect approval
* **Customer Complaint**: Any complaint related to quality or workmanship
* **Safety Incident**: Near-miss or actual incident with quality system contribution

**Discretionary Triggers** (QA Manager or Process Owner judgment):
* Single significant NCR with high impact (structural defect, MEP failure, energy performance miss)
* Process capability trending downward (e.g., HP first-pass yield drops below 90%)
* Supplier chronic performance issues (multiple NCRs, late deliveries)
* Preventive opportunity identified (potential problem spotted during audit or review)

#### 5.1.2 CAPA Request Form
QA Manager (or Process Owner with QA Manager approval) creates CAPA Request (FORM-CAPA01) including:
* CAPA ID: CAPA-YYYY-### (sequential)
* Date Initiated
* Initiated By (name, title)
* CAPA Type: Corrective or Preventive
* Trigger:
  * NCR numbers (if recurring NCRs)
  * Audit Finding ID
  * Customer Complaint reference
  * KPI metric and trend data
  * Description of potential issue (if preventive)
* Problem Statement: Clear, concise description of the issue
  * **Good example**: "Electrical junction boxes found improperly secured (loose, not flush to drywall surface) in 3 modules over past 2 months (SN-2025-015, SN-2025-022, SN-2025-031), all modules framed by Crew A during HP-6 phase. NEC 314.20 requires boxes securely fastened. Potential safety hazard (loose cover plates) and code violation."
  * **Bad example**: "Boxes are loose sometimes."
* Impact/Risk: What is the consequence if not addressed? (Safety, code compliance, customer satisfaction, cost)
* Priority: High / Medium / Low
  * High: Safety risk, regulatory violation, customer complaint, or significant cost impact
  * Medium: Recurring issue affecting quality but manageable
  * Low: Minor issue or preventive opportunity

### 5.2 Root Cause Analysis (RCA)

#### 5.2.1 RCA Team
* Led by QA Manager or designee
* Includes Process Owner(s) for affected area
* May include subject matter experts (e.g., electrician for electrical issue, structural engineer for framing issue)
* Conducted within 7 days of CAPA initiation for High priority, 14 days for Medium/Low

#### 5.2.2 RCA Methods

**5 Whys:**
Simple iterative questioning to drill down to root cause.

**Example:**
* Problem: Electrical boxes improperly secured (loose)
* Why? Screws not driven fully to engage stud
* Why? Crew using impact driver on low torque setting
* Why? Crew was not trained on correct torque setting for electrical box screws
* Why? Work Instruction WI-007 (Electrical Rough-In) does not specify torque setting for box installation
* **Root Cause**: Work Instruction lacks specific procedural detail on box fastening method and torque

**Fishbone Diagram (Ishikawa):**
Visual tool organizing potential causes into categories (Man, Machine, Method, Material, Measurement, Environment).

**Example for "Electrical Boxes Loose" problem:**
* **Man**: Crew A not trained on proper technique
* **Method**: WI-007 lacks specific fastening procedure
* **Material**: Screws provided are correct per spec
* **Machine**: Impact driver functioning, but torque setting not specified
* **Measurement**: Inspection missed issue until HP-6 (should be caught at HP-4 MEP inspection)
* **Environment**: N/A

Identify root cause: Combination of incomplete Work Instruction and training gap

**Fault Tree Analysis:**
Used for complex issues with multiple potential causes (rarely needed for typical production NCRs)

#### 5.2.3 RCA Documentation
Document RCA on FORM-CAPA01 in "Root Cause Analysis" section:
* Method used (5 Whys, Fishbone, etc.)
* Diagram or notes from session
* Root cause(s) identified (may be multiple)
* Supporting evidence (NCR data, records, observations, measurements)

**Important**: Do not stop at symptom or immediate cause. Dig deeper.
* Symptom: "Box is loose"
* Immediate cause: "Screws not driven fully"
* Root cause: "WI lacks procedure detail" + "Training did not cover technique"

### 5.3 Corrective/Preventive Action Planning

#### 5.3.1 Action Plan Development
For each identified root cause, develop action(s) to eliminate it.

**Corrective Action** (addresses detected nonconformances):
1. **Containment** (Immediate):
   * What must be done right now to address the specific instances?
   * Example: "Re-inspect all 3 affected modules (SN-2025-015, SN-2025-022, SN-2025-031). Verify all electrical boxes secure. If any loose boxes found, reinforce fastening. Document on NCR closure."

2. **Corrective Action** (Systemic - eliminates root cause):
   * Example:
     * Action 1: "Update WI-007 (Electrical Rough-In) Section 4.2 to add procedural step: 'Secure all junction boxes and device boxes with appropriate fasteners (screws or nails per box type). Drive fasteners until box flange is flush with finished drywall surface. Use impact driver on medium torque setting (2.5-3.0) or hand-drive final 1/4 turn to avoid over-torquing and cracking box.'"
     * Action 2: "Retrain all electrical crew members on updated WI-007. Conduct hands-on demonstration of correct box fastening technique. Verify competency with practical skills test (install 3 boxes under supervision, all must be flush and secure)."
     * Action 3: "Add inspection checkpoint to FORM-I004 (MEP Inspection Checklist) item 3.5: 'All electrical boxes securely fastened and flush with drywall plane.' Emphasize this check during HP-4 inspections."

3. **Responsibility and Timeline**:
   * Action 1: QA Manager, target completion 2026-01-20
   * Action 2: Bay Supervisor (Electrical), target completion 2026-01-27
   * Action 3: QA Manager, target completion 2026-01-20 (form update)

**Preventive Action** (addresses potential nonconformances):
* Identifies vulnerabilities before they cause actual failures
* Example: "During equipment calibration audit, noted that moisture meter calibration is due in 30 days. Preventive action: Establish 60-day advance reminder system for all M&TE calibrations to prevent any equipment going past due. Implement calendar alerts in QA Manager Outlook."

#### 5.3.2 Action Plan Approval
* QA Manager reviews action plan for adequacy (actions address root causes, timeline reasonable, resources available)
* For High-priority CAPAs or actions requiring significant resources (>$5,000, >40 labor hours, new equipment): President approval required
* Approved action plan documented on FORM-CAPA01, signatures obtained

### 5.4 Implementation

#### 5.4.1 Execution
* Responsible person(s) implement actions per plan
* Progress updates provided to QA Manager:
  * Weekly for High-priority CAPAs
  * Biweekly for Medium/Low-priority CAPAs
* If timeline slips: Responsible person notifies QA Manager with revised target date and justification

#### 5.4.2 Evidence Collection
As actions are implemented, collect evidence:
* **Document updates**: Before/after versions (e.g., WI-007 revision showing new fastening procedure)
* **Training records**: Attendance rosters, test scores, competency verifications
* **Form revisions**: Updated inspection checklists
* **Records of containment**: Photos of re-inspected modules, NCR closures
* **Supplier actions**: Supplier corrective action response letters, updated certificates

Evidence filed with CAPA record

### 5.5 Effectiveness Verification

#### 5.5.1 Verification Plan
Define how and when effectiveness will be verified. Verification must demonstrate:
* Root cause eliminated (issue no longer occurring)
* Process performance improved (KPIs trending back to target)
* Actions sustained over time (not just temporary fix)

**Example Verification Plan** (for electrical box CAPA):
* Monitor next 10 modules inspected at HP-6 (drywall phase) for loose box occurrences
* Review FORM-I004 (MEP inspection checklist) for next 5 HP-4 inspections to verify box check being performed
* Re-audit Crew A work at 30 days and 90 days post-training to verify proper technique sustained
* Success Criteria: Zero loose box NCRs in 30 days post-implementation, 100% of HP-4 inspections include box fastening check

#### 5.5.2 Verification Execution
* QA Manager conducts effectiveness check per verification plan
* Timing:
  * First check: 30 days after implementation (or after sufficient sample size, e.g., 5-10 modules)
  * Second check: 90 days after implementation (sustained effectiveness)
* Methods:
  * Record review (NCR Log, Traveler inspection records)
  * Process observation (watch crew perform task)
  * Interview (ask crew about procedure)
  * Metric review (KPI trend analysis)

#### 5.5.3 Verification Results
Document on FORM-CAPA01 "Effectiveness Verification" section:
* Date(s) of verification
* Method used
* Data collected (NCR counts, KPI values, observation notes)
* Conclusion:
  * **Effective**: Root cause eliminated, no recurrence, process improved → Close CAPA
  * **Partially Effective**: Some improvement but issue not fully resolved → Revise action plan, extend CAPA
  * **Not Effective**: Issue recurring, root cause not eliminated → Conduct new RCA, revise action plan, or escalate to Management Review

### 5.6 CAPA Closure

#### 5.6.1 Closure Criteria
CAPA may be closed when:
* All planned actions implemented
* Effectiveness verification completed and passed (demonstrated elimination of root cause)
* Documentation complete (evidence on file)

#### 5.6.2 Closure Approval
* QA Manager approves closure for Medium/Low-priority CAPAs
* President approves closure for High-priority CAPAs
* Closure signed and dated on FORM-CAPA01
* CAPA Log updated: Status changed from "Open" to "Closed", closure date recorded

### 5.7 CAPA Tracking and Management

#### 5.7.1 CAPA Log
QA Manager maintains CAPA Log (spreadsheet or database) with columns:
* CAPA ID
* Date Initiated
* Initiated By
* Type (Corrective / Preventive)
* Trigger / Source
* Problem Statement (brief)
* Priority (High / Medium / Low)
* Root Cause(s)
* Action Plan Summary
* Responsible Person(s)
* Target Completion Date
* Implementation Date (actual)
* Effectiveness Check Date
* Status (Open / In Progress / Verification / Closed / Overdue)
* Closure Date

#### 5.7.2 CAPA Metrics
Track and report monthly:
* Number of open CAPAs (by priority)
* Average time to close CAPA (by priority)
  * Target: High ≤30 days, Medium ≤60 days, Low ≤90 days
* % of CAPAs closed on time (Target: ≥90%)
* % of CAPAs effective on first check (Target: ≥80%)
* Top 3 CAPA triggers (NCR types, audit findings, etc.)

#### 5.7.3 CAPA Review Meetings
* QA Manager reviews CAPA Log weekly: Identify overdue actions, prioritize resources
* Monthly production meeting: COO and QA Manager review CAPA status, discuss systemic issues
* Quarterly Management Review: President reviews CAPA metrics and major CAPA effectiveness

### 5.8 Special CAPA Scenarios

#### 5.8.1 Customer Complaint-Driven CAPA
* Complaint received → logged in Customer Complaint Log → CAPA initiated within 24 hours
* Priority: High (customer satisfaction impact)
* Response to customer within 5 business days: Acknowledge complaint, describe investigation and corrective actions planned
* Effectiveness verification includes customer follow-up (if possible) to confirm satisfaction

#### 5.8.2 Regulatory/Safety-Related CAPA
* If nonconformance affects DOH compliance, life safety (structural, fire, electrical shock hazard), or IHIP grant terms:
  * Priority: High
  * Notify President immediately
  * May require notification to DOH or IHIP (consult with QA Manager and legal counsel)
  * Containment includes quarantine of any affected modules (no shipment until corrective action verified)
  * External expertise engaged if needed (PE, code official consultation)

#### 5.8.3 Supplier-Caused CAPA
* If root cause is supplier issue (defective material, missing cert, etc.):
  * Issue Supplier Corrective Action Request (FORM-SUP03) per SOP-004
  * Supplier provides response: root cause, corrective action, preventive action
  * Fort Homes QA Manager verifies supplier action effectiveness (monitor next 3-5 deliveries for improvement)
  * If supplier action ineffective: Consider alternate supplier, increase receiving inspection rigor, or remove from ASL

#### 5.8.4 Preventive Action from Risk Analysis
* During Management Review, process audits, or design reviews, potential risks identified
* Initiate preventive CAPA to address vulnerability before it causes actual nonconformance
* Example: "Trend analysis shows HP-1 (floor) inspection pass rate declining from 98% to 92% over 6 months. No recurring specific defect, but overall craftsmanship slipping. Preventive CAPA: Refresher training for all Phase 1 crew members on quality standards. Review and update WI-001 and WI-002 with additional quality checkpoints."

## 6. Continuous Improvement

### 6.1 Lessons Learned
* After CAPA closure, QA Manager documents lessons learned:
  * What worked well in RCA process?
  * What could be improved in CAPA process?
  * Are there other areas at risk for similar root cause?
* Lessons shared at production meetings and incorporated into training

### 6.2 Preventive Mindset
* Encourage all employees to report potential issues (not just actual defects)
* "If you see something, say something" culture
* Reward proactive problem identification (recognition in meetings, small incentive)

### 6.3 Best Practices Sharing
* When CAPA resolves issue, consider if solution applies to other processes or bays
* Example: If improved Work Instruction for electrical boxes in Phase 4, review all other phase WIs for similar gaps

## 7. Records
* CAPA Requests (FORM-CAPA01) - complete lifecycle documentation
* CAPA Log (master list)
* Root Cause Analysis worksheets and diagrams
* Evidence of implementation (document revisions, training records, inspection records, photos)
* Effectiveness verification reports
* CAPA metrics reports (monthly, quarterly)
* Supplier Corrective Action Requests (FORM-SUP03) - if applicable

Retention: 10 years (regulatory requirement, demonstrate continuous improvement to auditors)

## 8. Forms Referenced
* FORM-CAPA01: Corrective and Preventive Action Request (full lifecycle form)
* FORM-NCR01: Nonconformance Report (triggers for CAPA)
* FORM-AUD03: Audit Corrective Action Plan (may be linked to CAPA)
* FORM-SUP03: Supplier Corrective Action Request

## 9. References
* Fort Homes QMS Manual FHDEV-QMS-BIP-001, Section 10.2 (Nonconformance and Corrective Action), Section 10.3 (Continual Improvement)
* SOP-006: Internal Quality Audits (audit findings trigger CAPA)
* SOP-007: Control of Nonconforming Outputs (NCRs trigger CAPA)
* SOP-009: Management Review (CAPA metrics reported)
* ISO 9001:2015 Clause 10 (Improvement) - reference framework

---

**Document Approval:**

| Role | Name | Signature | Date |
| :--- | :--- | :--- | :--- |
| Prepared By | Zach Lamont, QA Manager | _______________ | 2026-01-13 |
| Approved By | Jeff Zimmerman, President | _______________ | 2026-01-13 |
