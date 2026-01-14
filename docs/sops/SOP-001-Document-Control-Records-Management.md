# SOP-001: Document Control & Records Management

---

## Document Control

| Field | Value |
| :--- | :--- |
| **Document ID** | SOP-001 |
| **Revision** | 1.0 |
| **Effective Date** | January 14, 2026 |
| **Process Owner** | Quality Manager |
| **Last Reviewed** | January 14, 2026 |
| **Next Review** | July 14, 2026 |

---

## 1. Purpose

To establish procedures for creating, reviewing, approving, distributing, updating, and archiving Quality Management System (QMS) documents and records. This SOP ensures that all QMS documentation accurately reflects current processes, maintains version control, and provides evidence of quality compliance.

---

## 2. Scope

This procedure applies to all QMS documents including:
- Standard Operating Procedures (SOPs)
- Work Instructions (WIs)
- Inspection Forms & Test Plans
- Nonconformance Reports (NCRs)
- Quality Records & Module Travelers
- Regulatory Compliance Documentation
- Training Records & Competency Verification

**Applies to:** All departments, all employee levels, contractors performing QMS procedures

---

## 3. References & Standards

- ISO 9001:2015 Section 8.5.2 (Control of Documented Information)
- CDOH HUD Code Regulations
- Fort and Homes LLC Quality Policy
- GitHub Repository (fort-homes-qms)

---

## 4. Roles & Responsibilities

| Role | Responsibility |
| :--- | :--- |
| **Quality Manager** | Overall QMS document authority; approval; version control |
| **Process Owner** | Maintain and update assigned SOP; request changes; training |
| **Department Supervisor** | Ensure team uses current documents; report obsolescence |
| **Employee/Technician** | Follow current approved procedures; report issues |
| **Executive Leadership** | Approve major revisions; policy updates |

---

## 5. Document Types & Naming Convention

### 5.1 Document Classification

| Document Type | Prefix | Purpose | Retention |
| :--- | :--- | :--- | :--- |
| Standard Operating Procedure | SOP | Company-wide processes | 7 years |
| Work Instruction | WI | Production step-by-step guides | 7 years |
| Inspection Form | FORM-I | Hold point & inspection records | 7 years |
| Nonconformance Report | FORM-NCR | Defect documentation | 7 years |
| Module Traveler | Traveler | Module-specific production record | 7 years |
| Quality Manual | QMS-MANUAL | System overview & policy | Indefinite |

### 5.2 Document Naming Standard

```
[TYPE]-[###]-[DESCRIPTION].[EXT]

Examples:
SOP-001-Document-Control-Records-Management.md
WI-101-Floor-Deck-Assembly.md
FORM-I101-Floor-System-Inspection.md
FORM-NCR01-Nonconformance-Report.md
```

---

## 6. Document Development Process

### 6.1 New Document Creation

**Step 1: Identify Need**
- Process Owner or Quality Manager identifies gap or requirement
- Document purpose and scope clearly defined
- Risk assessment completed if regulatory

**Step 2: Draft Document**
- Follow QMS Professional Format Standards (see QMS-Layout-Framework.md)
- Include all required sections for document type
- Use standard templates from docs/templates/

**Step 3: Internal Review**
- Process Owner reviews for technical accuracy
- Department Supervisor reviews for operational feasibility
- Quality Manager reviews for QMS compliance

**Step 4: Approval**
- Quality Manager final approval
- Executive Leadership approval for major procedures
- Signature block completed with date

**Step 5: Publishing**
- Stored in appropriate GitHub directory
- All team members notified
- Old version archived with supersession notice
- Effective date clearly marked

---

## 7. Document Update Process

### 7.1 Revision Types

| Revision Type | Examples | Authority | Version |
| :--- | :--- | :--- | :--- |
| Minor (Formatting/Clarity) | Typo fixes, clarification, examples | Process Owner | 1.1, 1.2 |
| Major (Content/Process) | Procedure changes, new requirements | Quality Manager + Executive | 2.0, 3.0 |
| Emergency (Safety/Compliance) | Regulatory change, safety issue | Quality Manager (immediate) | Per change note |

### 7.2 Change Request Process

**All changes must:**
1. Identify specific change with justification
2. Note impact on other procedures
3. Indicate training requirements
4. Obtain Process Owner approval
5. Obtain Quality Manager approval
6. Update revision history table
7. Increment version number

**Revision History Table Example:**
| Version | Date | Changes | Approved By |
| :--- | :--- | :--- | :--- |
| 1.0 | 01/14/2026 | Initial document | Quality Manager |
| 1.1 | [DATE] | Added clarification on section X | Quality Manager |

---

## 8. Record Management & Retention

### 8.1 Record Types & Retention

| Record Type | Location | Retention | Retrieval |
| :--- | :--- | :--- | :--- |
| Module Travelers | Physical files + GitHub | 7 years | By module ID |
| Inspection Forms | Physical + Digital archive | 7 years | By module & date |
| NCR Reports | Physical + Digital archive | 7 years | By NCR number |
| Training Records | HR database | 3 years minimum | By employee |
| Audit Reports | Digital archive | 7 years | By audit date |
| Calibration Records | Equipment log | Life of equipment | By equipment ID |

### 8.2 Record Storage Standards

**Physical Records:**
- Stored in locked filing cabinets
- Organized by date and document type
- Temperature/humidity controlled
- Protected from damage and unauthorized access

**Digital Records:**
- Stored in GitHub repository (docs/records/)
- Backed up weekly
- Access controlled by role
- Searchable by metadata tags

---

## 9. Document Distribution & Access Control

### 9.1 Distribution Methods

**Paper Distribution:**
- Printed copies to production floor (laminated where needed)
- Posted in work areas with revision date clearly visible
- Emergency procedures at each workstation
- Superseded versions removed and destroyed

**Digital Distribution:**
- All documents available in GitHub repository
- Accessible via mobile devices on production floor
- QR codes link to digital versions
- Email notifications when documents update

### 9.2 Access Control

| User Type | Access Level | Documents |
| :--- | :--- | :--- |
| Production Staff | Read-only | Current SOPs, WIs, Forms |
| Supervisors | Read + Print | All production documents |
| Quality Staff | Read + Print + Comment | All QMS documents |
| Management | Full Access | All documents + approval authority |
| External Auditors | Read-only | Designated procedures |

---

## 10. Document Obsolescence & Archive

### 10.1 Supersession Process

When a document is updated:
1. Old version marked "SUPERSEDED" with date
2. Moved to /archive/ folder
3. Supersession notice added at top indicating replacement document
4. Hyperlink to new version provided
5. All copies removed from production areas within 1 week

### 10.2 Archive Retention

- All superseded documents retained for 7 years
- Searchable archive for historical reference
- Used to track procedure evolution
- Required for regulatory audits

---

## 11. Quality Metrics & Performance Indicators

| Metric | Target | Frequency |
| :--- | :--- | :--- |
| Document Review Completion | Within 5 business days | Per submission |
| Approval Turnaround | Within 2 business days | Per submission |
| Supersession Implementation | 100% within 1 week | Per update |
| Record Retention Compliance | 100% | Quarterly audit |
| Unauthorized Document Usage | 0 incidents | Monthly audit |

---

## 12. Nonconforming Documents

**If an employee identifies an error or gap in a procedure:**
1. Notify supervisor immediately
2. Complete a Document Change Request form
3. Supervisor forwards to Quality Manager
4. Quality Manager assesses urgency
5. Interim controls implemented if safety-related
6. Document updated and redistributed
7. Root cause analysis completed

---

## 13. Training & Competency

**Required Training:**
- New employees: QMS overview + document navigation
- Supervisors: Document control procedures (annually)
- Quality staff: Full SOP-001 (on hire + annually)

**Competency Verification:**
- Quiz on document usage procedures
- Practical demonstration of record filing
- Annual refresher training

---

## 14. Safety & Environment

**Document Storage Safety:**
- Filing cabinets secured to prevent tipping
- Paper storage prevents fire hazard accumulation
- Confidential records stored securely
- No use of document storage for other items

---

## 15. Appendices

### Appendix A: Document Control Checklist
- [ ] Document ID assigned
- [ ] Revision number assigned
- [ ] All required sections completed
- [ ] Internal review completed
- [ ] Approval signatures obtained
- [ ] Effective date clearly marked
- [ ] Team members notified
- [ ] Old versions archived

### Appendix B: Revision History Template

| Version | Date | Author | Changes | Approved By |
| :--- | :--- | :--- | :--- | :--- |
| 1.0 | [DATE] | [Name] | Initial document | [Signature] |

### Appendix C: Document Change Request Form

```
DOCUMENT CHANGE REQUEST

Document ID: _______________________
Current Version: ___________________
Requested Change: __________________________________________________
Justification: __________________________________________________
Impact on Other Documents: __________________________________________
Training Required: [ ] Yes [ ] No
Requested Effective Date: ___________
Submitted By: _________________ Date: _______
```

---

## Approval & Authority

| Role | Name | Signature | Date |
| :--- | :--- | :--- | :--- |
| **Process Owner** | Quality Manager | _________________ | _________ |
| **Department Lead** | Quality Director | _________________ | _________ |
| **Executive Authority** | Operations Director | _________________ | _________ |

---

## Revision History

| Version | Date | Changes | Approved By |
| :--- | :--- | :--- | :--- |
| 1.0 | 01/14/2026 | Initial QMS document control procedure | Quality Manager |

---

**DOCUMENT EFFECTIVE:** January 14, 2026  
**NEXT SCHEDULED REVIEW:** July 14, 2026  
**DOCUMENT STATUS:** ✅ ACTIVE
