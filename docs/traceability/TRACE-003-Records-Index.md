<div class="document-header" style="background: linear-gradient(135deg, #101810 0%, #2D5016 100%); color: white; padding: 40px; text-align: center; border-radius: 8px; margin-bottom: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <div style="font-size: 48px; font-weight: bold; letter-spacing: 2px; margin-bottom: 10px;">
    🏗️ FORT HOMES
  </div>
  <div style="font-size: 24px; font-weight: 300; letter-spacing: 1px; margin-bottom: 5px;">
    QUALITY MANAGEMENT SYSTEM
  </div>
  <div style="font-size: 20px; font-weight: bold; margin-top: 20px; padding-top: 20px; border-top: 2px solid rgba(255,255,255,0.3);">
    QUALITY RECORDS INDEX
  </div>
  <div style="font-size: 16px; margin-top: 10px; opacity: 0.9;">
    Complete Catalog of Quality Records with Retention Requirements
  </div>
</div>

# TRACE-003: QUALITY RECORDS INDEX
## Comprehensive Quality Records Catalog & Retention Schedule

---

## 📋 DOCUMENT CONTROL

| Attribute | Value |
|:---|:---|
| **Document ID** | TRACE-003 |
| **Title** | Quality Records Index and Retention Schedule |
| **Revision** | 1.0 |
| **Effective Date** | 2026-01-29 |
| **Process Owner** | Document Controller |
| **Approver** | Quality Manager |
| **Classification** | CONTROLLED |
| **Review Cycle** | Annual |
| **Next Review** | 2027-01-29 |
| **Regulatory Basis** | 8 CCR 1302-14 § 3.5(f), 24 CFR § 3282.11 |

---

## 📑 TABLE OF CONTENTS

1. [Purpose & Scope](#1-purpose--scope)
2. [Record Classification System](#2-record-classification-system)
3. [Product-Related Records (20-Year Retention)](#3-product-related-records-20-year-retention)
4. [Quality System Records (7-Year Retention)](#4-quality-system-records-7-year-retention)
5. [Training & Competency Records](#5-training--competency-records)
6. [Regulatory & Compliance Records](#6-regulatory--compliance-records)
7. [Record Storage & Retrieval](#7-record-storage--retrieval)
8. [Record Retention Matrix](#8-record-retention-matrix)

---

## 1. PURPOSE & SCOPE

### 1.1 Purpose

This index provides a **comprehensive catalog** of all quality records generated within the Fort Homes QMS, enabling:

- ✅ **Compliance:** Meet CDOH 20-year product record retention requirement
- ✅ **Traceability:** Rapid retrieval for audits, complaints, or recalls
- ✅ **Accountability:** Clear record ownership and responsibilities
- ✅ **Risk Management:** Ensure critical records are never lost
- ✅ **Efficiency:** Eliminate redundant or obsolete record types

### 1.2 Scope

Covers all quality records:
- **Product Records:** Module-specific documentation (20-year retention)
- **Quality System Records:** Process evidence, audits, CAPA (7-year retention)
- **Training Records:** Competency documentation (duration of employment + 7 years)
- **Regulatory Records:** CDOH submissions, TPIA reports (indefinite retention)

### 1.3 Retention Requirements

Per **8 CCR 1302-14 § 3.5(f)**:
> "Records of tests, inspections, and other work performed to ensure conformance... shall be retained for not less than **twenty (20) years** from the date of manufacture."

**Fort Homes retention policy:**
- **Product records:** **20 years** minimum (module serial number as key)
- **QMS records:** **7 years** minimum
- **Training records:** **Duration of employment + 7 years**
- **Regulatory submissions:** **Indefinite** (permanent archive)

---

## 2. RECORD CLASSIFICATION SYSTEM

### 2.1 Record Type Codes

| Code | Category | Retention | Example |
|:---:|:---|:---:|:---|
| **REC-P** | Product Records | 20 years | Module travelers, inspection forms |
| **REC-Q** | Quality System Records | 7 years | Audit reports, NCRs, CAPAs |
| **REC-T** | Training Records | Employment + 7 years | Training logs, competency evaluations |
| **REC-R** | Regulatory Records | Indefinite | CDOH submissions, TPIA reports |
| **REC-D** | Design Records | 20 years | Engineering plans, calculations |
| **REC-M** | Material Records | 7 years | Material certs, receiving inspections |
| **REC-S** | Supplier Records | 7 years | Supplier audits, ASL evaluations |

### 2.2 Record Format & Storage

| Format | Storage Location | Backup Method | Access Control |
|:---|:---|:---|:---|
| **Paper (Physical)** | File room, fireproof cabinets | Digital scan backup | Locked, restricted access |
| **Digital (PDF)** | Network server `/QMS_Records/` | Cloud backup (daily) | Role-based permissions |
| **Database (Prisma/SQLite)** | Production database | Automated backup (hourly) | Application-level auth |
| **Photos/Video** | Network server `/Inspection_Photos/` | Cloud backup (daily) | Read-only for non-QA |

---

## 3. PRODUCT-RELATED RECORDS (20-YEAR RETENTION)

### 3.1 Module Production Records (REC-P-100 Series)

| Record ID | Record Name | Generating Procedure | Responsible | Format | Storage Location |
|:---:|:---|:---|:---|:---:|:---|
| **REC-P-101** | Module Traveler (Complete Packet) | SOP-014 Module Traveler | Production Supervisor | Paper + PDF | `/Product_Records/[Year]/[SerialNo]/Traveler.pdf` |
| **REC-P-102** | Engineering Plans (Stamped) | SOP-006 Design Control | Design Engineer | PDF | `/Product_Records/[Year]/[SerialNo]/Plans.pdf` |
| **REC-P-103** | Truss Engineering (if applicable) | SOP-006 | Design Engineer | PDF | `/Product_Records/[Year]/[SerialNo]/Truss_Eng.pdf` |
| **REC-P-104** | Module Serial Number Assignment | SOP-010 Module ID | QA Manager | Database | Prisma `modules` table |
| **REC-P-105** | DOH Insignia Tracking Log | SOP-010, SOP-108 | QA Manager | Spreadsheet + PDF | `/Regulatory/Insignia_Log_[Year].xlsx` |

### 3.2 Hold Point Inspection Records (REC-P-200 Series)

| Record ID | Record Name | Generating Procedure | Responsible | Format | Storage Location |
|:---:|:---|:---|:---|:---:|:---|
| **REC-P-201** | HP-1: Chassis & Floor Inspection | SOP-101, WI-101 | QA Inspector | FORM-I-101 (PDF) | `/Product_Records/[Year]/[SerialNo]/HP1.pdf` |
| **REC-P-202** | HP-2: Wall Framing Inspection | SOP-102, WI-102 | QA Inspector | FORM-I-102 (PDF) | `/Product_Records/[Year]/[SerialNo]/HP2.pdf` |
| **REC-P-203** | HP-3: Roof Framing Inspection | SOP-103, WI-103 | QA Inspector | FORM-I-103 (PDF) | `/Product_Records/[Year]/[SerialNo]/HP3.pdf` |
| **REC-P-204** | HP-4: MEP Rough-In Inspection | SOP-104, WI-104 | QA Inspector | FORM-I-104 (PDF) | `/Product_Records/[Year]/[SerialNo]/HP4.pdf` |
| **REC-P-205** | HP-5: Insulation/Air Sealing Inspection | SOP-105, WI-105 | QA Inspector | FORM-I-105 (PDF) | `/Product_Records/[Year]/[SerialNo]/HP5.pdf` |
| **REC-P-206** | HP-6: Drywall Inspection | SOP-106, WI-106 | QA Inspector | FORM-I-106 (PDF) | `/Product_Records/[Year]/[SerialNo]/HP6.pdf` |
| **REC-P-207** | HP-7: Interior Trim/Finish Inspection | SOP-107, WI-107 | QA Inspector | FORM-I-107 (PDF) | `/Product_Records/[Year]/[SerialNo]/HP7.pdf` |
| **REC-P-208** | HP-8: Final Inspection & DOH Insignia | SOP-108, WI-108 | QA Inspector | FORM-I-108 (PDF) | `/Product_Records/[Year]/[SerialNo]/HP8.pdf` |

### 3.3 Testing & Verification Records (REC-P-300 Series)

| Record ID | Record Name | Generating Procedure | Responsible | Format | Storage Location |
|:---:|:---|:---|:---|:---:|:---|
| **REC-P-301** | Water Pressure Test Results | SOP-104 MEP Rough-In | QA Inspector | Test report (PDF) | `/Product_Records/[Year]/[SerialNo]/Water_Test.pdf` |
| **REC-P-302** | DWV Pressure Test Results | SOP-104 | QA Inspector | Test report (PDF) | `/Product_Records/[Year]/[SerialNo]/DWV_Test.pdf` |
| **REC-P-303** | Gas Pressure Test Results (if applicable) | SOP-104 | QA Inspector | Test report (PDF) | `/Product_Records/[Year]/[SerialNo]/Gas_Test.pdf` |
| **REC-P-304** | Blower Door Test Results (IHIP homes) | SOP-105, SOP-108 | QA Inspector | Blower door report (PDF) | `/Product_Records/[Year]/[SerialNo]/Blower_Door.pdf` |
| **REC-P-305** | Electrical Continuity Tests | SOP-104 | QA Inspector | Test log (PDF) | `/Product_Records/[Year]/[SerialNo]/Electrical_Tests.pdf` |

### 3.4 Material Traceability Records (REC-P-400 Series)

| Record ID | Record Name | Generating Procedure | Responsible | Format | Storage Location |
|:---:|:---|:---|:---|:---:|:---|
| **REC-P-401** | Material Lot Numbers (per Traveler) | SOP-012, SOP-014 | Materials Manager | Traveler section (PDF) | Included in REC-P-101 |
| **REC-P-402** | Material Certifications (lumber, sheathing) | SOP-012 | Materials Manager | Certs (PDF) | `/Product_Records/[Year]/[SerialNo]/Material_Certs.pdf` |
| **REC-P-403** | Insulation Certifications | SOP-012 | Materials Manager | Certs (PDF) | Included in REC-P-402 |
| **REC-P-404** | Electrical Material Certifications | SOP-012 | Materials Manager | Certs (PDF) | Included in REC-P-402 |
| **REC-P-405** | Plumbing Material Certifications | SOP-012 | Materials Manager | Certs (PDF) | Included in REC-P-402 |

### 3.5 TPIA Inspection Records (REC-P-500 Series)

| Record ID | Record Name | Generating Procedure | Responsible | Format | Storage Location |
|:---:|:---|:---|:---|:---:|:---|
| **REC-P-501** | TPIA Plan Review Approval | SOP-006 Design, SOP-015 TPIA | Design Engineer | TPIA-stamped plans (PDF) | Included in REC-P-102 |
| **REC-P-502** | TPIA HP-4 Inspection Report | SOP-015 TPIA Coordination | TPIA Inspector | TPIA report (PDF) | `/Product_Records/[Year]/[SerialNo]/TPIA_HP4.pdf` |
| **REC-P-503** | TPIA HP-8 Final Inspection Report | SOP-015 | TPIA Inspector | TPIA report (PDF) | `/Product_Records/[Year]/[SerialNo]/TPIA_HP8.pdf` |

### 3.6 Module Documentation Package (REC-P-600 Series)

| Record ID | Record Name | Generating Procedure | Responsible | Format | Storage Location |
|:---:|:---|:---|:---|:---:|:---|
| **REC-P-601** | Module Documentation Package (Complete) | SOP-108 Final Inspection | QA Inspector | PDF packet | `/Product_Records/[Year]/[SerialNo]/Complete_Package.pdf` |
| **REC-P-602** | Installation Manual (supplied with unit) | SOP-019 Packaging/Delivery | Quality Manager | Printed booklet + PDF | Shipped with unit + archive copy |
| **REC-P-603** | Homeowner Manual (supplied with unit) | SOP-019 | Quality Manager | Printed booklet + PDF | Shipped with unit + archive copy |

---

## 4. QUALITY SYSTEM RECORDS (7-YEAR RETENTION)

### 4.1 Audit Records (REC-Q-100 Series)

| Record ID | Record Name | Generating Procedure | Responsible | Format | Storage Location |
|:---:|:---|:---|:---|:---:|:---|
| **REC-Q-101** | Internal Audit Plan (Annual) | SOP-003 Internal Audits | Quality Manager | PDF | `/QMS_Records/Audits/[Year]/Audit_Plan.pdf` |
| **REC-Q-102** | Internal Audit Reports | SOP-003 | Lead Auditor | PDF | `/QMS_Records/Audits/[Year]/Audit_[ID].pdf` |
| **REC-Q-103** | Internal Audit Checklists | SOP-003 | Lead Auditor | PDF | Attached to REC-Q-102 |
| **REC-Q-104** | Audit Findings & Observations | SOP-003 | Lead Auditor | PDF | Included in REC-Q-102 |
| **REC-Q-105** | Audit Follow-Up & Closure Evidence | SOP-003 | Quality Manager | PDF | `/QMS_Records/Audits/[Year]/Closure_[ID].pdf` |

### 4.2 Nonconformance & CAPA Records (REC-Q-200 Series)

| Record ID | Record Name | Generating Procedure | Responsible | Format | Storage Location |
|:---:|:---|:---|:---|:---:|:---|
| **REC-Q-201** | Nonconformance Report (NCR) | SOP-004 NCR/CAPA | QA Inspector / Anyone | FORM-NCR-001 (PDF) | `/QMS_Records/NCR/[Year]/NCR-[Year]-[NNN].pdf` |
| **REC-Q-202** | NCR Disposition & Approval | SOP-004 | Quality Manager | Disposition section of REC-Q-201 | Included in REC-Q-201 |
| **REC-Q-203** | Corrective Action Request (CAR) | SOP-004 | Quality Manager | FORM-CA-001 (PDF) | `/QMS_Records/CAPA/[Year]/CAR-[Year]-[NNN].pdf` |
| **REC-Q-204** | Preventive Action Request (PAR) | SOP-004 | Quality Manager | FORM-CA-001 (PDF) | `/QMS_Records/CAPA/[Year]/PAR-[Year]-[NNN].pdf` |
| **REC-Q-205** | Root Cause Analysis (RCA) | SOP-004 | Quality Manager | RCA report (PDF) | Attached to REC-Q-203 |
| **REC-Q-206** | CAPA Effectiveness Verification | SOP-004 | Quality Manager | FORM-CA-002 (PDF) | `/QMS_Records/CAPA/[Year]/Effectiveness_[ID].pdf` |

### 4.3 Management Review Records (REC-Q-300 Series)

| Record ID | Record Name | Generating Procedure | Responsible | Format | Storage Location |
|:---:|:---|:---|:---|:---:|:---|
| **REC-Q-301** | Management Review Meeting Agenda | SOP-006 Management Review | Quality Manager | PDF | `/QMS_Records/Mgmt_Review/[Year]/Agenda_[Date].pdf` |
| **REC-Q-302** | Management Review Minutes | SOP-006 | Quality Manager | PDF | `/QMS_Records/Mgmt_Review/[Year]/Minutes_[Date].pdf` |
| **REC-Q-303** | Management Review Input Data | SOP-006 | Quality Manager | PDF packet | Attached to REC-Q-302 |
| **REC-Q-304** | Management Review Action Items | SOP-006 | Quality Manager | Spreadsheet + PDF | `/QMS_Records/Mgmt_Review/[Year]/Actions_[Date].pdf` |
| **REC-Q-305** | Management Review Attendance | SOP-006 | Quality Manager | Sign-in sheet (PDF) | Included in REC-Q-302 |

### 4.4 Quality Metrics Records (REC-Q-400 Series)

| Record ID | Record Name | Generating Procedure | Responsible | Format | Storage Location |
|:---:|:---|:---|:---|:---:|:---|
| **REC-Q-401** | Monthly Quality Metrics Dashboard | SOP-016 Quality Metrics | Quality Manager | PDF/Excel | `/QMS_Records/Metrics/[Year]/Metrics_[Month].pdf` |
| **REC-Q-402** | NCR Trend Analysis | SOP-016 | Quality Manager | Charts/graphs (PDF) | `/QMS_Records/Metrics/[Year]/NCR_Trends_[Quarter].pdf` |
| **REC-Q-403** | Hold Point Pass/Fail Rates | SOP-016 | QA Inspector | Spreadsheet + PDF | `/QMS_Records/Metrics/[Year]/HP_Rates_[Quarter].pdf` |
| **REC-Q-404** | Customer Complaint Log | SOP-017 Customer Service | Quality Manager | Spreadsheet + PDF | `/QMS_Records/Customer/Complaint_Log_[Year].pdf` |
| **REC-Q-405** | Supplier Performance Scorecards | SOP-007 Procurement | Purchasing Manager | PDF | `/QMS_Records/Supplier/Scorecards_[Year].pdf` |

### 4.5 Change Management Records (REC-Q-500 Series)

| Record ID | Record Name | Generating Procedure | Responsible | Format | Storage Location |
|:---:|:---|:---|:---|:---:|:---|
| **REC-Q-501** | Change Request Form | SOP-005 Change Management | Process Owner | PDF | `/QMS_Records/Changes/[Year]/CR-[Year]-[NNN].pdf` |
| **REC-Q-502** | Change Impact Assessment | SOP-005 | Quality Manager | PDF | Attached to REC-Q-501 |
| **REC-Q-503** | Change Approval Record | SOP-005 | Approver | Signature on REC-Q-501 | Included in REC-Q-501 |
| **REC-Q-504** | Change Implementation Verification | SOP-005 | Process Owner | PDF | `/QMS_Records/Changes/[Year]/Verification_[ID].pdf` |

---

## 5. TRAINING & COMPETENCY RECORDS

### 5.1 Training Records (REC-T-100 Series)

| Record ID | Record Name | Generating Procedure | Responsible | Format | Storage Location |
|:---:|:---|:---|:---|:---:|:---|
| **REC-T-101** | Employee Training Matrix (Master) | SOP-002 Training/Competency | Training Coordinator | Spreadsheet + PDF | `/QMS_Records/Training/Training_Matrix_Master.xlsx` |
| **REC-T-102** | Individual Training Record | SOP-002 | Training Coordinator | FORM-TR-001 (PDF) | `/QMS_Records/Training/Employees/[Name]/Training_Record.pdf` |
| **REC-T-103** | Training Attendance Sheets | SOP-002 | Training Coordinator | PDF | `/QMS_Records/Training/[Year]/Attendance_[Course]_[Date].pdf` |
| **REC-T-104** | Training Materials & Presentations | SOP-002 | Training Coordinator | PDF/PPT | `/QMS_Records/Training/Materials/[Course_Name]/` |
| **REC-T-105** | Training Acknowledgment Forms | SOP-002 | Trainee | FORM-TR-003 (PDF) | `/QMS_Records/Training/Employees/[Name]/Acknowledgments.pdf` |

### 5.2 Competency Records (REC-T-200 Series)

| Record ID | Record Name | Generating Procedure | Responsible | Format | Storage Location |
|:---:|:---|:---|:---|:---:|:---|
| **REC-T-201** | Competency Evaluation Forms | SOP-002 Training/Competency | Supervisor | FORM-TR-002 (PDF) | `/QMS_Records/Training/Employees/[Name]/Competency_Evals.pdf` |
| **REC-T-202** | Skills Assessment Checklists | SOP-002 | Supervisor | PDF | Attached to REC-T-201 |
| **REC-T-203** | On-the-Job Training (OJT) Records | SOP-002 | Supervisor | PDF | `/QMS_Records/Training/Employees/[Name]/OJT_Records.pdf` |
| **REC-T-204** | Certification Records (external) | SOP-002 | Training Coordinator | Certificates (PDF) | `/QMS_Records/Training/Employees/[Name]/Certifications.pdf` |
| **REC-T-205** | Annual Competency Review | SOP-002 | Training Coordinator | PDF | `/QMS_Records/Training/Annual_Review_[Year].pdf` |

---

## 6. REGULATORY & COMPLIANCE RECORDS

### 6.1 CDOH Records (REC-R-100 Series) - Indefinite Retention

| Record ID | Record Name | Generating Procedure | Responsible | Format | Storage Location |
|:---:|:---|:---|:---|:---:|:---|
| **REC-R-101** | CDOH Approval Letter (QMS Manual) | SOP-009 CDOH Compliance | Compliance Officer | PDF | `/Regulatory/CDOH/Approval_Letter_[Year].pdf` |
| **REC-R-102** | CDOH Annual Submissions | SOP-009 | Compliance Officer | PDF | `/Regulatory/CDOH/Annual_Submission_[Year].pdf` |
| **REC-R-103** | CDOH Inspection Reports | SOP-009 | Compliance Officer | PDF | `/Regulatory/CDOH/Inspections/Inspection_[Date].pdf` |
| **REC-R-104** | CDOH Correspondence (all) | SOP-009 | Compliance Officer | Email/PDF | `/Regulatory/CDOH/Correspondence/` |
| **REC-R-105** | Manufacturer Registration Renewal | SOP-009 | Compliance Officer | PDF | `/Regulatory/CDOH/Registration_[Year].pdf` |

### 6.2 TPIA Records (REC-R-200 Series) - Indefinite Retention

| Record ID | Record Name | Generating Procedure | Responsible | Format | Storage Location |
|:---:|:---|:---|:---|:---:|:---|
| **REC-R-201** | TPIA Contract & Agreement (NTA) | SOP-015 TPIA Coordination | Compliance Officer | PDF | `/Regulatory/TPIA/Contract_[Year].pdf` |
| **REC-R-202** | TPIA Inspection Schedule | SOP-015 | Compliance Officer | PDF | `/Regulatory/TPIA/Schedule_[Year].pdf` |
| **REC-R-203** | TPIA Annual Report | SOP-015 | Compliance Officer | PDF | `/Regulatory/TPIA/Annual_Report_[Year].pdf` |
| **REC-R-204** | TPIA Correspondence | SOP-015 | Compliance Officer | Email/PDF | `/Regulatory/TPIA/Correspondence/` |

### 6.3 Design Approval Records (REC-R-300 Series) - 20 Years

| Record ID | Record Name | Generating Procedure | Responsible | Format | Storage Location |
|:---:|:---|:---|:---|:---:|:---|
| **REC-R-301** | TPIA-Approved Design Plans (Master) | SOP-006 Design Control | Design Engineer | PDF (stamped) | `/Regulatory/Design/Approved_Plans/[Model]/[Revision]/` |
| **REC-R-302** | Design Approval Letters (TPIA) | SOP-006 | Design Engineer | PDF | `/Regulatory/Design/Approval_Letters/` |
| **REC-R-303** | Engineering Calculations | SOP-006 | Design Engineer | PDF | `/Regulatory/Design/Calcs/[Project]/` |
| **REC-R-304** | Design Change Notices | SOP-006 | Design Engineer | PDF | `/Regulatory/Design/Change_Notices/DCN-[Year]-[NNN].pdf` |

---

## 7. RECORD STORAGE & RETRIEVAL

### 7.1 Storage Methods

```mermaid
graph TD
    A[Quality Record Generated] --> B{Record Type?}
    B -->|Product| C[File in Module Folder<br/>/Product_Records/YYYY/SerialNo/]
    B -->|QMS| D[File in QMS Records<br/>/QMS_Records/Category/]
    B -->|Training| E[File in Training Records<br/>/QMS_Records/Training/]
    B -->|Regulatory| F[File in Regulatory<br/>/Regulatory/Authority/]
    
    C --> G[Paper Original in File Room]
    C --> H[Digital Scan to Server]
    D --> H
    E --> H
    F --> H
    
    H --> I[Cloud Backup (Daily)]
    G --> J[Fireproof Cabinet<br/>Locked Storage]
    
    style A fill:#145B8B,color:#fff
    style C fill:#2D5016,color:#fff
    style D fill:#2D5016,color:#fff
    style E fill:#2D5016,color:#fff
    style F fill:#2D5016,color:#fff
    style I fill:#8B6914,color:#fff
    style J fill:#8B6914,color:#fff
```

### 7.2 Retrieval Process

| Request Type | Requester | Approval Required | Response Time | Method |
|:---|:---|:---:|:---:|:---|
| **Audit (Internal)** | Auditor | Quality Manager | Same day | Digital copy or physical access |
| **Audit (External)** | CDOH/TPIA | General Manager | Same day | Supervised access, copy provided |
| **Customer Complaint** | Customer Service | Quality Manager | 2 business days | Digital copy reviewed internally first |
| **Recall Investigation** | Quality Manager | General Manager | Immediate | Full access granted |
| **Legal/Warranty** | Legal Counsel | General Manager | 1 business day | Certified copies provided |

### 7.3 Access Control

| Role | Product Records | QMS Records | Training Records | Regulatory Records |
|:---|:---:|:---:|:---:|:---:|
| **Quality Manager** | Full access | Full access | Full access | Full access |
| **QA Inspector** | Read/Write own | Read-only | Read-only | Read-only |
| **Production Supervisor** | Read/Write assigned modules | Read-only | Read own | No access |
| **Document Controller** | Full access (admin) | Full access (admin) | Full access (admin) | Full access (admin) |
| **General Manager** | Full access | Full access | Full access | Full access |
| **Compliance Officer** | Read-only | Read-only | Read-only | Full access |

---

## 8. RECORD RETENTION MATRIX

### 8.1 Summary Table

| Record Category | Retention Period | Trigger Date | Disposal Method | Authority |
|:---|:---:|:---|:---|:---|
| **Product Records (REC-P)** | 20 years | Date of manufacture (module serial date) | Shred paper, secure delete digital | 8 CCR 1302-14 § 3.5(f) |
| **Quality System (REC-Q)** | 7 years | Record creation date | Shred paper, secure delete digital | Industry best practice |
| **Training Records (REC-T)** | Employment + 7 years | Employee termination date | Shred paper, secure delete digital | EEOC, industry practice |
| **Regulatory Records (REC-R)** | Indefinite | N/A (permanent) | Never destroy | CDOH requirement |
| **Design Records (REC-D)** | 20 years | Design approval date | Shred paper, secure delete digital | Product liability |
| **Material Certs (REC-M)** | 7 years | Receipt date | Shred paper, secure delete digital | Traceability requirement |
| **Supplier Records (REC-S)** | 7 years | Audit/evaluation date | Shred paper, secure delete digital | Procurement requirement |

### 8.2 Retention Schedule Monitoring

| Activity | Frequency | Responsible | Output |
|:---|:---:|:---|:---|
| **Review for Retention Eligibility** | Annual | Document Controller | List of records eligible for disposal |
| **Disposal Authorization** | As needed | Quality Manager | Signed disposal authorization form |
| **Disposal Execution** | As needed | Document Controller | Disposal certificate (with witness) |
| **Retention Audit** | Annual | Internal Auditor | Audit finding: compliant or non-compliant |

### 8.3 Record Disposition Process

```mermaid
graph LR
    A[Record Reaches<br/>Retention Limit] --> B[Document Controller<br/>Reviews]
    B --> C{Permanent<br/>Record?}
    C -->|Yes| D[Retain Indefinitely]
    C -->|No| E[Generate Disposal List]
    E --> F[Quality Manager<br/>Approves]
    F --> G[Execute Disposal<br/>Shred/Secure Delete]
    G --> H[Document Disposal<br/>Certificate]
    H --> I[Archive Certificate<br/>7 Years]
    
    style A fill:#145B8B,color:#fff
    style D fill:#2D5016,color:#fff
    style G fill:#8B1414,color:#fff
    style I fill:#B8B8B8,color:#000
```

---

## ✅ APPROVAL SIGNATURES

| Role | Name | Signature | Date |
|:---|:---|:---|:---|
| **Prepared By** | Document Controller | _________________ | 2026-01-29 |
| **Technical Review** | Quality Manager | _________________ | 2026-01-29 |
| **Approved By** | General Manager | _________________ | 2026-01-29 |

---

## 📅 REVISION HISTORY

| Revision | Date | Author | Description | Approved By |
|:---:|:---|:---|:---|:---|
| 1.0 | 2026-01-29 | Document Controller | Initial comprehensive records index | Quality Manager |

---

**Document Classification:** CONTROLLED  
**Distribution:** Quality Manager, Document Controller, Compliance Officer  
**Next Review Date:** 2027-01-29  

> ℹ️ **NOTE:** This index is a living document. New record types are added as procedures are created or revised.
