# SOP-004: Nonconformance & Corrective/Preventive Action (CAPA)

---

## Document Control

<table style="width:100%;border-collapse:collapse;margin:20px 0;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
  <thead style="background:linear-gradient(135deg,#2D5016 0%,#1a2f0d 100%);color:white;">
    <tr>
      <th style="padding:12px;text-align:left;border:1px solid #ddd;">Field</th>
      <th style="padding:12px;text-align:left;border:1px solid #ddd;">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Document ID</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">SOP-004</td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Revision</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">2.0</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Effective Date</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">January 2026</td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Process Owner</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">Quality Manager</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Status</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
        <span style="background:#4CAF50;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:12px;">✅ ACTIVE</span>
      </td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Next Review</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">July 2026</td>
    </tr>
  </tbody>
</table>

---

## 📊 EXECUTIVE SUMMARY

### KEY METRICS

<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin:20px 0;">
  
  <div style="background:linear-gradient(135deg,#E8F5E9 0%,#C8E6C9 100%);padding:20px;border-radius:8px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    <div style="font-size:28px;margin-bottom:8px;">📈</div>
    <div style="font-size:32px;font-weight:bold;color:#2E7D32;margin:5px 0;">100%</div>
    <div style="font-size:14px;color:#666;margin-top:5px;">Closure Rate</div>
    <div style="font-size:12px;color:#999;margin-top:5px;">Within 30 days</div>
  </div>
  
  <div style="background:linear-gradient(135deg,#E3F2FD 0%,#BBDEFB 100%);padding:20px;border-radius:8px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    <div style="font-size:28px;margin-bottom:8px;">✅</div>
    <div style="font-size:32px;font-weight:bold;color:#1565C0;margin:5px 0;">>95%</div>
    <div style="font-size:14px;color:#666;margin-top:5px;">Effectiveness</div>
    <div style="font-size:12px;color:#999;margin-top:5px;">CAPA verified</div>
  </div>
  
  <div style="background:linear-gradient(135deg,#F3E5F5 0%,#E1BEE7 100%);padding:20px;border-radius:8px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    <div style="font-size:28px;margin-bottom:8px;">📅</div>
    <div style="font-size:32px;font-weight:bold;color:#6A1B9A;margin:5px 0;">Monthly</div>
    <div style="font-size:14px;color:#666;margin-top:5px;">NCR Analysis</div>
    <div style="font-size:12px;color:#999;margin-top:5px;">Trend review</div>
  </div>
  
  <div style="background:linear-gradient(135deg,#FFF3E0 0%,#FFE0B2 100%);padding:20px;border-radius:8px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    <div style="font-size:28px;margin-bottom:8px;">🔍</div>
    <div style="font-size:32px;font-weight:bold;color:#E65100;margin:5px 0;">Quarterly</div>
    <div style="font-size:14px;color:#666;margin-top:5px;">Process Audit</div>
    <div style="font-size:12px;color:#999;margin-top:5px;">CAPA review</div>
  </div>
  
</div>

### CRITICAL SUCCESS FACTORS

- Immediate containment of nonconforming product
- Root cause analysis within 5 days of NCR initiation
- Repeat NCRs <10% per quarter
- Average closure time <15 days

---

## 🎯 1. PURPOSE

To establish systematic procedures for identifying, documenting, investigating, and resolving nonconforming products, services, and processes. This includes root cause analysis, corrective actions to eliminate causes, preventive actions to avoid potential issues, and verification of effectiveness to drive continuous improvement.

---

## 📋 2. SCOPE

### 2.1 Nonconformance Categories

This procedure applies to:

<table style="width:100%;border-collapse:collapse;margin:20px 0;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
  <thead style="background:linear-gradient(135deg,#2D5016 0%,#1a2f0d 100%);color:white;">
    <tr>
      <th style="padding:12px;text-align:left;border:1px solid #ddd;width:30%;">🔧 NC Type</th>
      <th style="padding:12px;text-align:left;border:1px solid #ddd;width:35%;">Description</th>
      <th style="padding:12px;text-align:left;border:1px solid #ddd;width:35%;">Examples</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Product Nonconformances</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">Modules not meeting specifications</td>
      <td style="padding:10px;border:1px solid #ddd;">Dimensional issues, defects</td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Process Nonconformances</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">Procedures not followed correctly</td>
      <td style="padding:10px;border:1px solid #ddd;">Skipped hold points, missing records</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>System Nonconformances</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">QMS failures</td>
      <td style="padding:10px;border:1px solid #ddd;">Document control issues, audit findings</td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Customer Complaints</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">Field issues after delivery</td>
      <td style="padding:10px;border:1px solid #ddd;">Performance issues, defects</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Internal Audit Findings</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">Procedure gaps identified</td>
      <td style="padding:10px;border:1px solid #ddd;">Non-compliance, missing documentation</td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Regulatory Findings</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">Inspection observations</td>
      <td style="padding:10px;border:1px solid #ddd;">CDOH findings, code violations</td>
    </tr>
  </tbody>
</table>

### 2.2 Applicability


**APPLICABILITY SCOPE**

✅ All Departments ✅ All Levels
✅ All Product Types ✅ All Process Nonconformances
✅ Supplier Issues ✅ Customer Complaints

---

## 📚 3. REFERENCES & STANDARDS

<table style="width:100%;border-collapse:collapse;margin:20px 0;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
  <thead style="background:linear-gradient(135deg,#2D5016 0%,#1a2f0d 100%);color:white;">
    <tr>
      <th style="padding:12px;text-align:left;border:1px solid #ddd;">Reference</th>
      <th style="padding:12px;text-align:left;border:1px solid #ddd;">Description</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;">Authority</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>CDOH Requirements</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">Colorado Division of Housing</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
        <span style="background:#2196F3;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:12px;">STATE</span>
      </td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>SOP-001</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">Document Control</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
        <span style="background:#9C27B0;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:12px;">INTERNAL</span>
      </td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>SOP-003</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">Internal Audits</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
        <span style="background:#9C27B0;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:12px;">INTERNAL</span>
      </td>
    </tr>
  </tbody>
</table>

---

## 👥 4. ROLES & RESPONSIBILITIES


**RACI RESPONSIBILITY MATRIX**

- **👤 QUALITY MANAGER (R - Responsible)**
• Oversee CAPA process and approve actions
• Track effectiveness and metrics
• Review root cause analysis and corrective actions
- **👤 DEPARTMENT MANAGER (A - Accountable)**
• Implement corrective actions in department
• Verify changes and effectiveness
• Allocate resources for CAPA implementation
- **👤 EMPLOYEE/TECHNICIAN (C - Consulted)**
• Report issues immediately to supervisor
• Participate in root cause analysis
• Assist with containment actions
- **👤 EXECUTIVE LEADERSHIP (I - Informed / Approver)**
• Approve major system changes
• Resource allocation for significant CAPAs
• Review trending and escalated issues

---

## 🔄 5. NCR WORKFLOW PROCESS


**NONCONFORMANCE REPORT (NCR) WORKFLOW**

START
NONCONFORMANCE
IDENTIFIED
- Production
- Inspection
- Customer
- Audit

** ⚠️ IMMEDIATE ACTION **

 • Notify supervisor 
 • Isolate product 
 • Stop nonconforming work 

**COMPLETE NCR FORM**

(FORM-NCR01)
- Description
- Affected product
- Initial actions
QUALITY MANAGER
REVIEW
- Assess severity
- Initial disposition
 Severity Level? 

**MINOR MAJOR CRITICAL **

Basic Full RCA Comprehensive
Investigation Required Investigation
5-day close 15-day 30-day max

** ✅ QUALITY CHECKPOINT **

 • NCR documented 
 • Product contained 
 • Investigation assigned 
Continue to CAPA

---

## 📝 5. NONCONFORMANCE IDENTIFICATION & REPORTING

### 5.1 Nonconformance Sources


**NONCONFORMANCE IDENTIFICATION SOURCES**


**🔍 PRODUCTION INSPECTION**

Hold point failures, dimensional issues, quality defects

**✅ FINAL INSPECTION**

Defects discovered at module completion before shipment

**📞 CUSTOMER COMPLAINT**

Issues reported after delivery and installation

**📋 INTERNAL AUDIT**

Procedure not followed or records missing

**📊 MANAGEMENT REVIEW**

Process not achieving quality objectives

**📦 SUPPLIER DELIVERY**

Received materials not meeting specifications

**👥 EMPLOYEE REPORT**

Team member identifies issue or potential problem

### 5.2 Nonconformance Report (NCR) Initiation


**✅ QUALITY CHECKPOINT — NCR INITIATION**

■ Supervisor notified immediately upon discovery
■ Affected product isolated (stop work if safety issue)
■ Nonconformance documented with details
■ NCR form completed (FORM-NCR01) and submitted
■ No further nonconforming work performed

**Anyone identifying a nonconformance must:**

| Step | Action | Responsible |
|:---:|:---|:---|
| 1️⃣ | Immediately notify supervisor | Employee |
| 2️⃣ | Isolate affected product (stop work if safety issue) | Employee/Supervisor |
| 3️⃣ | Document what was observed | Employee |
| 4️⃣ | Complete Nonconformance Report form (FORM-NCR01) | Employee |
| 5️⃣ | Submit to Quality Manager | Employee |
| 6️⃣ | Ensure no further nonconforming work | Supervisor |

### 5.3 NCR Form Contents


**NONCONFORMANCE REPORT (FORM-NCR01)**

NCR Number: _________ Date Reported: ______________
Reporter: ________________ Department: ______________

**NONCONFORMANCE DESCRIPTION**

What doesn't conform? _________________________________
Which requirement is violated? _______________________
SOP Reference: _________ Standard: _________________
Severity: [ ] Minor [ ] Major [ ] Critical

**AFFECTED PRODUCT/PROCESS**

Module(s) Involved: _________ Serial Number(s): _________
Quantity Affected: _________ Production Date: _________
Phase/Process: _____________ Location: ______________

**IMMEDIATE CONTAINMENT**

What action was taken? ________________________________
Are more modules affected? _________ How many? _______
Supervisor Signature: _________________ Date: _________
INITIAL DISPOSITION (Quality Manager)
[ ] Accept as-is (with justification)
[ ] Rework to specification
[ ] Return to supplier
[ ] Scrap/Destroy
[ ] Investigate & Determine
Quality Manager Signature: _________________ Date: _________

---

## 🔍 6. NONCONFORMANCE INVESTIGATION & ANALYSIS

### 6.1 Root Cause Analysis Process

**Within 5 days of NCR initiation:**


**ROOT CAUSE ANALYSIS PROCESS**


**STEP 1: GATHER DATA**

• Collect all relevant information
• Review work instructions and actual practice
• Interview involved personnel
• Examine similar products/processes

**STEP 2: IDENTIFY CONTRIBUTING FACTORS**

• Equipment failure?
• Procedure not clear or followed?
• Training/competency issue?
• Environmental factor?
• Supplier material issue?

**STEP 3: DETERMINE ROOT CAUSE**

• Use "5 Why" analysis
• Ask: Why did nonconformance occur?
• Keep asking "Why" until true cause found
• Avoid symptom-fixing

### 6.2 5 Why Analysis Example


**5 WHY ANALYSIS EXAMPLE**

🔴 ISSUE: Floor deck assembled with ¾" gap between joists
Why 1: Installer didn't measure spacing
→ Why didn't they measure?
Why 2: Tape measure not available at workstation
→ Why not available?
Why 3: Tools not issued at shift start
→ Why not procedure?
Why 4: No tool management system exists
→ Why no system?
✅ ROOT CAUSE: Lack of formal tool management procedure

### 6.3 Root Cause Analysis Form


**ROOT CAUSE ANALYSIS**

NCR Number: _________ Date: ______________
Analysis Lead: _____________________

**PROBLEM STATEMENT**

What exactly is not conforming? ___________________________
When did it first occur? ________________
How many times has it occurred? ____
IMMEDIATE CAUSE
Why did nonconformance occur (surface reason)? _________
__________________________________________________________
ROOT CAUSE ANALYSIS (5 Why)
Why 1: __________________________________________________
Why 2: __________________________________________________
Why 3: __________________________________________________
Why 4: __________________________________________________
Why 5 (ROOT): ___________________________________________

**ROOT CAUSE CONFIRMED**

Root Cause: ________________________________
Evidence: _________________________________________________
__________________________________________________________
Approved by: _________________ Date: _________


**✅ QUALITY CHECKPOINT — ROOT CAUSE ANALYSIS**

■ Analysis completed within 5 days of NCR initiation
■ 5 Why analysis performed to identify true root cause
■ Root cause confirmed with objective evidence
■ Analysis approved by Quality Manager

---

## 🔄 7. CAPA WORKFLOW PROCESS


**CORRECTIVE/PREVENTIVE ACTION (CAPA) WORKFLOW**

START
(Root Cause Known)

**DEVELOP CAPA PLAN**

- Action to eliminate
- Owner assigned
- Timeline set
- Resources allocated

** ✅ QUALITY CHECKPOINT **

 • CAPA plan documented 
 • Resources confirmed 
 • QM approval obtained 
IMPLEMENT

**CORRECTIVE ACTION**

- Execute plan
- Update procedures
- Provide training
 Procedure Change 
 Required? 

**YES NO**


**UPDATE SOP/WI CONTINUE TO**

Train affected VERIFICATION
personnel 
VERIFY
EFFECTIVENESS
- 30-day monitor
- Check results
 Effective? 

**YES NO**


**CLOSE NCR REVISE CAPA**

Document success Re-implement
END

---

## 📋 7. CORRECTIVE ACTION DEVELOPMENT

### 7.1 CAPA Plan Requirements

For each root cause, document:

| 📋 Element | Description |
|:---|:---|
| **🎯 Corrective Action** | Specific action to eliminate root cause |
| **👤 Owner** | Who will implement |
| **⏱️ Timeline** | Start and completion dates |
| **💰 Resources** | What's needed (people, budget, training) |
| **✅ Verification Method** | How we'll know it worked |
| **📝 Procedure Change** | If SOP/WI needs updating |

### 7.2 Corrective Action Plan


**CORRECTIVE ACTION PLAN**

NCR Number: _________ Root Cause: ___________________

**CORRECTIVE ACTION**

What action will eliminate the root cause? _______________
__________________________________________________________
Why will this be effective? _____________________________
__________________________________________________________
IMPLEMENTATION
Start Date: _________ Completion Date: _________
Responsible Person: __________________
Resources Needed: _____________________________________
Training Required: [ ] Yes [ ] No

**PROCEDURE CHANGES**

Will SOP/WI need updating? [ ] Yes [ ] No
Which procedure(s)? ____________________________________
Approval Date: __________

**VERIFICATION OF EFFECTIVENESS**

How will we verify correction worked? ___________________
__________________________________________________________
Verification Date: _________ Verification By: ___________
Result: [ ] Effective [ ] Not Effective [ ] Partial
Approval Signature: _________________ Date: _________

---

## 🛡️ 8. PREVENTIVE ACTION (PACTION)

### 8.1 Preventive Action Triggers


**PREVENTIVE ACTION TRIGGERS**


**🔍 AUDIT OBSERVATIONS**

Potential issues identified in audits (observations, not findings)

**🔄 PROCESS CHANGES**

New methods or procedures being implemented

**🆕 NEW PRODUCT VARIATIONS**

New floor plans or module configurations

**📦 SUPPLIER CHANGES**

New vendors or material specifications

**⚙️ EQUIPMENT UPGRADES**

New tools, machinery, or technology

**⚠️ HIGH-RISK AREAS**

Processes with potential for significant impact

### 8.2 PACTION Process

Same as corrective action but focused on preventing potential issues:

| Step | Action | Purpose |
|:---:|:---|:---|
| 1️⃣ | **Identify potential problem** (before it occurs) | Proactive risk management |
| 2️⃣ | **Analyze root cause** of why it might happen | Understanding risk factors |
| 3️⃣ | **Develop preventive action** to eliminate risk | Risk mitigation |
| 4️⃣ | **Implement change** | Risk elimination |
| 5️⃣ | **Verify effectiveness** that problem doesn't occur | Confirmation |

---

## ✅ 9. CORRECTIVE ACTION FOLLOW-UP & CLOSURE

### 9.1 Implementation Tracking

**During implementation:**


**IMPLEMENTATION MONITORING**


**📊 PROGRESS TRACKING**

Monitor progress against timeline and milestones

**🚧 OBSTACLE MANAGEMENT**

Address obstacles and barriers immediately
📢 COMMUNICATION
Communicate status to stakeholders regularly
- **🔄 ADAPTATION**
Adjust plan as needed based on progress

### 9.2 Effectiveness Verification

**After implementation:**

| Verification Step | Description | Timeline |
|:---|:---|:---:|
| ✅ **Implementation Confirmed** | Verify corrective action was implemented | Completion date |
| 📝 **Procedure Updated** | Check that procedure was changed (if needed) | Within 5 days |
| 🎓 **Training Completed** | Verify training was completed | Within 10 days |
| 📊 **Process Monitoring** | Monitor process for recurrence | 30 days minimum |
| 🔍 **Issue Resolution** | Look for recurrence of issue | Ongoing |

### 9.3 NCR Closure Criteria


**✅ QUALITY CHECKPOINT — NCR CLOSURE**

■ Corrective action implemented
■ Effectiveness verified (issue resolved)
■ Related procedure updated and trained
■ No recurrence within 30-day monitoring period
■ Quality Manager approval obtained

---

## 📊 10. NONCONFORMANCE METRICS & TRENDS

### 10.1 Tracking & Trending


**METRICS TO TRACK**

- **📈 NUMBER OF NCRs By month and quarter**
- **🔍 TYPES OF NONCONFORMANCES Product, process, system**
- **🔄 REPEAT ISSUES NCRs for same problem**
⏱️ AVERAGE CLOSURE TIME Days from open to close
- **🎯 MOST COMMON ROOT CAUSES Trending patterns**
📍 DEPARTMENT/AREA TRENDS Location analysis

### 10.2 Metrics Review


**KEY PERFORMANCE INDICATORS**


**METRIC TARGET FREQUENCY**

- **📈 NCR Closure Rate 100% within Monthly review**
30 days
- **🔄 Repeat NCRs <10% Quarterly analysis**
⏱️ Average days to close <15 days Monthly calculation
✅ CAPA Effectiveness >95% Quarterly verification

### 10.3 Trend Analysis

**If trends show:**

| Trend | Action Required |
|:---|:---|
| 📈 **Increase in NCRs** | Escalate issue; request increased resources |
| 🔄 **Repeat NCRs** | Previous CAPA not effective; reassess root cause |
| 🎯 **Same root cause** | System-level improvement needed |
| 🆕 **New area of concern** | Target additional training/auditing |


**✅ QUALITY CHECKPOINT — METRICS & TRENDING**

■ NCR metrics reviewed monthly by Quality Manager
■ Trend analysis completed quarterly
■ Corrective actions initiated for adverse trends
■ Management review briefed on NCR performance

---

## 📞 11. CUSTOMER COMPLAINT HANDLING

### 11.1 Customer Issue Process

For complaints received after delivery:


**CUSTOMER COMPLAINT WORKFLOW**

STEP 1: INITIAL CONTACT (within 24 hours)
• Listen to customer concern
• Document details
• Empathize and acknowledge
• Explain process
STEP 2: INVESTIGATION (within 5 days)
• Inspect returned module or photograph
• Determine if manufacturing defect
• If yes → Open NCR
• If no → Customer education/support

**STEP 3: RESOLUTION**

• If defect → Follow CAPA process
• If not defect → Document and close
• Keep customer informed
STEP 4: FOLLOW-UP (after resolution)
• Verify customer satisfaction
• Document outcome
• Share learnings with team

---

## 🔧 12. NONCONFORMING PRODUCT DISPOSITION

### 12.1 Options for Nonconforming Product

| 📋 Option | When Used | Approval Required |
|:---|:---|:---|
| ✅ **Use as-is** | Doesn't affect safety/function | Quality Manager + Customer (if applicable) |
| 🔧 **Rework** | Can be corrected | Quality Manager |
| 📦 **Return to Supplier** | Supplier error | Quality Manager + Finance |
| 🗑️ **Scrap/Destroy** | Cannot be corrected safely | Quality Manager + Supervisor |

### 12.2 Rework Authorization


**REWORK REQUIREMENTS**

📝 DOCUMENTATION
Document rework procedure in detail
✅ COMPETENCY
Verify competency of rework personnel
- **🔍 INSPECTION**
Inspect after rework completion
✔️ VERIFICATION
Verify meets original specification
- **📋 COMPLETION**
Document completion and sign-off


**✅ QUALITY CHECKPOINT — PRODUCT DISPOSITION**

■ Disposition decision documented on NCR form
■ Required approvals obtained before action
■ Rework procedures documented and followed
■ Post-rework inspection completed and recorded

---

## 📎 13. APPENDICES

### Appendix A: NCR Form Template (FORM-NCR01)
**Location:** `docs/forms/FORM-NCR01-Nonconformance-Report.md`

### Appendix B: Root Cause Analysis Template
**Location:** `docs/forms/Root-Cause-Analysis-Template.md`

### Appendix C: CAPA Tracking Log Template
**Location:** `docs/forms/CAPA-Tracking-Log-Template.md`

---

## ✍️ APPROVAL & AUTHORITY

| Role | Name | Signature | Date |
|:---|:---|:---:|:---:|
| **Quality Manager** | Quality Manager | _________________ | _________ |
| **Executive Authority** | Operations Director | _________________ | _________ |

---

## 📅 REVISION HISTORY

| Version | Date | Changes | Approved By |
|:---:|:---|:---|:---|
| 1.0 | 01/14/2026 | Initial nonconformance and CAPA procedure | Quality Manager |
| 2.0 | 01/15/2026 | Applied visual design system upgrade | Quality Manager |

---

<div align="center">

```
 END OF DOCUMENT

 Fort and Homes LLC | Quality Management System
 Mesa County, Colorado

 Quality Without Compromise™
```

**DOCUMENT STATUS:** ✅ ACTIVE 
**EFFECTIVE DATE:** January 2026 
**NEXT REVIEW:** July 2026

</div>
