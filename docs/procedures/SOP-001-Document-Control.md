# SOP-001: Document and Data Control

| Document Control | Information |
| :--- | :--- |
| **Document ID** | SOP-001 |
| **Revision** | 1.0 |
| **Effective Date** | 2026-01-13 |
| **Process Owner** | QA Manager |
| **Approval** | Jeff Zimmerman, President |

---

## 1. Purpose
To establish controls for the creation, approval, distribution, revision, and obsolescence of QMS documents and data to ensure that current, approved information is available at points of use.

## 2. Scope
This procedure applies to all controlled documents within the Fort Homes QMS, including:
* Quality Manual (FHDEV-QMS-BIP-001)
* Standard Operating Procedures (SOPs)
* Work Instructions (WIs)
* Inspection Test Plans (ITPs)
* Forms and Templates
* Engineering drawings and specifications
* External standards and regulations (reference only)

## 3. Definitions
* **Controlled Document**: A document subject to version control, approval, and distribution management
* **Master Copy**: The official repository version maintained in the QMS system
* **Uncontrolled Copy**: Any printed or distributed copy bearing the "Uncontrolled When Printed" watermark
* **Revision**: A change to document content requiring re-approval
* **Obsolete Document**: A document no longer valid for operational use

## 4. Responsibilities

### 4.1 QA Manager
* Maintains master document repository (GitHub: solidzdawg/fort-homes-qms)
* Reviews and approves document change requests
* Issues document revision numbers
* Ensures obsolete documents are removed from use
* Maintains Document Control Log

### 4.2 Process Owners
* Initiate document creation or revision requests
* Review draft documents for technical accuracy
* Implement document requirements in their areas

### 4.3 President
* Provides final approval for Quality Manual and major procedural changes
* Authorizes policy-level document releases

## 5. Procedure

### 5.1 Document Creation

#### 5.1.1 New Document Request
1. Process Owner identifies need for new controlled document
2. Process Owner drafts document using standard template (Appendix A)
3. Document includes required header information:
   * Document ID (assigned by QA Manager)
   * Revision number (starts at 1.0)
   * Effective Date
   * Process Owner
   * Approval signature line

#### 5.1.2 Review and Approval
1. Process Owner submits draft to QA Manager via GitHub pull request
2. QA Manager reviews for:
   * Compliance with QMS requirements
   * Format consistency
   * Regulatory alignment (DOH, IRC, NEC, IPC, IECC)
   * Traceability to quality objectives
3. QA Manager requests revisions if needed
4. Upon acceptance, QA Manager assigns document ID and forwards to approver
5. Approver (President for SOPs, QA Manager for WIs/Forms) signs and dates
6. QA Manager publishes to master repository and updates Document Control Log

### 5.2 Document Distribution

#### 5.2.1 Master Repository
* All controlled documents maintained in GitHub repository: `/fort-homes-qms`
* Repository structure:
  ```
  /docs
    /procedures      (SOPs)
    /work-instructions
    /forms-templates
  /data             (JSON configuration files)
  /scripts          (Document generation scripts)
  ```

#### 5.2.2 User Access
* Production personnel access documents via:
  * Tablets at production bays (linked to master repository)
  * Printed copies marked "Uncontrolled When Printed"

#### 5.2.3 External Distribution
* TPIA inspectors receive links to specific ITPs via email
* Customers receive generated reports only (not source documents)
* External auditors (DOH, IHIP) receive read-only repository access

### 5.3 Document Revision

#### 5.3.1 Change Request
1. Any employee may submit document change request to Process Owner
2. Process Owner evaluates need and impact
3. If approved, Process Owner creates revised draft with:
   * Incremented revision number (1.0 → 1.1 for minor, 1.0 → 2.0 for major)
   * Updated Effective Date
   * Revision history entry (if space permits, or in Document Control Log)

#### 5.3.2 Approval Process
* Same as Section 5.1.2

#### 5.3.3 Implementation
1. QA Manager commits revision to master repository
2. System automatically timestamps commit (Git version control)
3. Old version archived in Git history (accessible via commit hash)
4. QA Manager notifies affected users via:
   * Email to supervisors
   * Production meeting announcement (for significant changes)

### 5.4 Obsolete Document Control
1. When document is superseded, Git maintains historical version automatically
2. Any printed copies in field must be:
   * Stamped "OBSOLETE" in red
   * Removed from workstations within 48 hours
3. QA Manager verifies removal during weekly facility walkthrough

### 5.5 External Documents
* External standards (IRC, NEC, IPC, IECC) referenced by edition and section
* DOH regulations (8 CCR 1302-14) monitored for updates via CDOLA website
* QA Manager reviews Colorado Register quarterly for regulatory changes
* Changes to external standards trigger internal document review cycle

## 6. Document Identification System

### 6.1 Document Numbering
Format: `TYPE-###-Name`

**Document Types:**
* `FHDEV-QMS-BIP-###`: Quality Manual
* `SOP-###`: Standard Operating Procedure
* `WI-###`: Work Instruction
* `ITP-X-##`: Inspection Test Plan (X = discipline: CS=Construction, E=Electrical, P=Plumbing, M=Mechanical, A=Architectural)
* `FORM-###`: Form or Template

**Examples:**
* `SOP-001`: Document Control
* `ITP-E-01`: Electrical Rough-In Inspection
* `FORM-NCR01`: Nonconformance Report

### 6.2 Revision Numbering
* Initial release: `1.0`
* Minor revisions (clarifications, formatting): increment decimal (1.0 → 1.1 → 1.2)
* Major revisions (process changes, scope expansion): increment integer (1.9 → 2.0)

### 6.3 Page/Section Identification
* Each document page includes footer:
  ```
  Document ID | Revision | Page X of Y | Uncontrolled When Printed
  ```

## 7. Training and Competence
* All employees receive Document Control orientation during onboarding
* Users trained to:
   * Access current documents via repository
  * Recognize "Uncontrolled When Printed" notation
  * Submit change requests to Process Owners
* Records: Training Matrix (maintained by QA Manager)

## 8. Records
* Document Control Log (master list of all controlled documents)
* Document Change Requests
* Distribution Records (Git commit history serves as distribution log)
* Obsolete Document Destruction Log

## 9. References
* Fort Homes QMS Manual FHDEV-QMS-BIP-001, Section 4.2.3 (Document Control)
* GitHub Repository: `https://github.com/solidzdawg/fort-homes-qms`

---

## Appendix A: Document Template Requirements

All controlled documents must include:

1. **Header Table** with:
   * Document ID
   * Revision
   * Effective Date
   * Process Owner
   * Approval (signature line or reference)

2. **Standardized Sections**:
   * Purpose
   * Scope
   * Definitions (if applicable)
   * Responsibilities
   * Procedure
   * Records
   * References

3. **Footer** (auto-generated by PDF script):
   * Document ID | Rev X.X | Page Y | Uncontrolled When Printed

---

**Document Approval:**

| Role | Name | Signature | Date |
| :--- | :--- | :--- | :--- |
| Prepared By | Zach Lamont, QA Manager | _______________ | 2026-01-13 |
| Approved By | Jeff Zimmerman, President | _______________ | 2026-01-13 |
