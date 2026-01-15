# QMS-003 PLANNING & RISK
## Enterprise Risk Management and Quality Planning

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ███████╗ ██████╗ ██████╗ ████████╗    ██╗  ██╗ ██████╗ ███╗   ███╗███████╗ ║
║   ██╔════╝██╔═══██╗██╔══██╗╚══██╔══╝    ██║  ██║██╔═══██╗████╗ ████║██╔════╝ ║
║   █████╗  ██║   ██║██████╔╝   ██║       ███████║██║   ██║██╔████╔██║█████╗   ║
║   ██╔══╝  ██║   ██║██╔══██╗   ██║       ██╔══██║██║   ██║██║╚██╔╝██║██╔══╝   ║
║   ██║     ╚██████╔╝██║  ██║   ██║       ██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗ ║
║   ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝ ║
║                                                                              ║
║                       PLANNING & RISK                                        ║
║                        Grand Junction, Colorado                              ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## 📋 DOCUMENT CONTROL

| **Attribute** | **Details** |
|:---|:---|
| **Document ID** | QMS-003-PLANNING-RISK |
| **Version** | 1.0 |
| **Effective Date** | 2026-01-15 |
| **Process Owner** | Quality Manager |
| **Classification** | CONTROLLED |
| **Review Cycle** | Semi-Annual |
| **Next Review Date** | 2026-07-15 |

---

## 📑 TABLE OF CONTENTS

1. [Risk Management Framework](#1-risk-management-framework)
2. [Enterprise Risk Register](#2-enterprise-risk-register)
3. [Opportunity Register](#3-opportunity-register)
4. [Quality Objectives Planning](#4-quality-objectives-planning)
5. [Change Planning Framework](#5-change-planning-framework)
6. [Risk Monitoring and Review](#6-risk-monitoring-and-review)

---

## 1. RISK MANAGEMENT FRAMEWORK

### 1.1 Risk Management Process

```
┌────────────────────────────────────────────────────────────────────────────┐
│  RISK MANAGEMENT PROCESS FLOW                                              │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌──────────────┐                                                         │
│  │   IDENTIFY   │  • Context analysis (internal/external)                 │
│  │    RISKS     │  • Stakeholder input                                    │
│  │              │  • Process analysis                                     │
│  └──────┬───────┘  • Historical data review                               │
│         │                                                                  │
│         ↓                                                                  │
│  ┌──────────────┐                                                         │
│  │   ANALYZE    │  • Severity rating (1-10)                               │
│  │    RISKS     │  • Occurrence probability (1-10)                        │
│  │              │  • Detection capability (1-10)                          │
│  └──────┬───────┘  • Calculate RPN (Risk Priority Number)                 │
│         │                                                                  │
│         ↓                                                                  │
│  ┌──────────────┐                                                         │
│  │  EVALUATE    │  • Compare against risk appetite                        │
│  │    RISKS     │  • Prioritize by RPN                                    │
│  │              │  • Determine acceptability                              │
│  └──────┬───────┘  • Identify treatment needs                             │
│         │                                                                  │
│         ↓                                                                  │
│  ┌──────────────┐                                                         │
│  │    TREAT     │  • Avoid (eliminate activity)                           │
│  │    RISKS     │  • Reduce (implement controls)                          │
│  │              │  • Transfer (insurance, contracts)                      │
│  └──────┬───────┘  • Accept (with justification)                          │
│         │                                                                  │
│         ↓                                                                  │
│  ┌──────────────┐                                                         │
│  │   MONITOR    │  • Regular risk reviews                                 │
│  │  & REVIEW    │  • KPI tracking                                         │
│  │              │  • Effectiveness evaluation                             │
│  └──────┬───────┘  • Update risk register                                 │
│         │                                                                  │
│         └──────────► Continuous Improvement Loop                          │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Risk Rating Methodology (FMEA-Style)

#### Severity Rating (S)

| Score | Severity Level | Description | Impact |
|:---:|:---|:---|:---|
| **10** | Catastrophic | Life safety hazard | Fatality or critical injury |
| **9** | Critical | Major regulatory violation | HUD decertification risk |
| **8** | Very High | Significant regulatory issue | CDOH enforcement action |
| **7** | High | Major customer impact | Product recall required |
| **6** | Moderate-High | Significant quality issue | Major rework/warranty claim |
| **5** | Moderate | Customer dissatisfaction | Complaint, minor rework |
| **4** | Low-Moderate | Noticeable defect | Customer notices, no impact |
| **3** | Low | Minor defect | Rarely noticed by customer |
| **2** | Very Low | Minimal impact | Internal only, easily corrected |
| **1** | Negligible | No real impact | Insignificant |

#### Occurrence Rating (O)

| Score | Probability | Frequency | Statistical Likelihood |
|:---:|:---|:---|:---|
| **10** | Almost Certain | Daily/Weekly | >30% of the time |
| **9** | Very High | Weekly/Monthly | 20-30% of the time |
| **8** | High | Monthly | 10-20% of the time |
| **7** | Moderate-High | Quarterly | 5-10% of the time |
| **6** | Moderate | Semi-annually | 2-5% of the time |
| **5** | Low-Moderate | Annually | 1-2% of the time |
| **4** | Low | Every 2-3 years | 0.5-1% of the time |
| **3** | Very Low | Every 3-5 years | 0.1-0.5% of the time |
| **2** | Remote | Rarely (>5 years) | <0.1% of the time |
| **1** | Nearly Impossible | Almost never | <0.01% of the time |

#### Detection Rating (D)

| Score | Detection Capability | Description | Control Effectiveness |
|:---:|:---|:---|:---|
| **10** | Almost Impossible | No detection method exists | No controls in place |
| **9** | Very Low | Detection highly unlikely | Weak, unreliable controls |
| **8** | Low | Detection unlikely | Manual, inconsistent checks |
| **7** | Moderate-Low | Detection possible but difficult | Some manual controls |
| **6** | Moderate | May detect with effort | Periodic sampling/inspection |
| **5** | Moderate-Good | Reasonable chance of detection | Regular inspection |
| **4** | Good | Likely to detect | Statistical process control |
| **3** | Very Good | Very likely to detect | Automated alerts/checks |
| **2** | Extremely Good | Almost certain detection | Mistake-proofing (poka-yoke) |
| **1** | Absolutely Certain | Detection guaranteed | Automatic prevention |

#### Risk Priority Number (RPN)

```
RPN = Severity × Occurrence × Detection

RPN Range: 1 - 1,000

┌────────────────────────────────────────────────────────────────────────────┐
│  RPN INTERPRETATION & ACTION REQUIREMENTS                                  │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  🔴 CRITICAL (RPN 200-1000)                                                │
│     • Immediate action required                                           │
│     • Executive approval needed                                           │
│     • Cannot proceed without mitigation                                   │
│     • Document risk acceptance if unavoidable                             │
│                                                                            │
│  🟠 HIGH (RPN 100-199)                                                     │
│     • Action plan required within 30 days                                 │
│     • Management approval needed                                          │
│     • Monitor closely until reduced                                       │
│                                                                            │
│  🟡 MEDIUM (RPN 50-99)                                                     │
│     • Action plan recommended                                             │
│     • Process owner approval                                              │
│     • Regular monitoring                                                  │
│                                                                            │
│  🟢 LOW (RPN 1-49)                                                         │
│     • Monitor periodically                                                │
│     • Standard controls sufficient                                        │
│     • Review during annual planning                                       │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. ENTERPRISE RISK REGISTER

### 2.1 Risk Register Template

**Instructions:** All identified risks are documented in this register and reviewed quarterly.

| Risk ID | Risk Category | Risk Description | S | O | D | RPN | Risk Owner | Mitigation Actions | Target RPN | Status |
|:---|:---|:---|:---:|:---:|:---:|:---:|:---|:---|:---:|:---|
| Example format ↓ |
| R-001 | Regulatory | HUD Code non-compliance in design | 9 | 4 | 3 | 108 | Quality Mgr | DAPIA review, design checklist | <50 | Open |

### 2.2 Current Risk Register

#### REGULATORY & COMPLIANCE RISKS

| Risk ID | Risk Description | S | O | D | RPN | Mitigation Actions | Owner |
|:---|:---|:---:|:---:|:---:|:---:|:---|:---|
| **R-REG-001** | HUD Code violation in manufactured home design | 9 | 3 | 2 | 54 | • DAPIA-approved designs only<br>• Design review checklist<br>• Quality Manager approval required | Quality Manager |
| **R-REG-002** | Loss of NTA inspection approval | 9 | 2 | 3 | 54 | • Maintain strong NTA relationship<br>• Monthly compliance self-audits<br>• Proactive corrective actions | Quality Manager |
| **R-REG-003** | CDOH regulatory violation (8 CCR 1302-14) | 8 | 2 | 3 | 48 | • Quarterly compliance audits<br>• Stay current on regulation changes<br>• Documentation verification | Quality Manager |
| **R-REG-004** | Installation not meeting 24 CFR 3285 | 7 | 4 | 3 | 84 | • Installation checklist mandatory<br>• Installer training/certification<br>• Third-party verification | Install Manager |
| **R-REG-005** | Missing or invalid material certifications | 8 | 3 | 4 | 96 | • Approved supplier list<br>• Incoming cert verification<br>• Material traceability system | Purchasing Mgr |

#### SAFETY RISKS

| Risk ID | Risk Description | S | O | D | RPN | Mitigation Actions | Owner |
|:---|:---|:---:|:---:|:---:|:---:|:---|:---|
| **R-SAF-001** | Worker injury during production | 9 | 3 | 4 | 108 | • Comprehensive safety training<br>• PPE enforcement<br>• Regular safety audits<br>• Equipment guarding | Operations Mgr |
| **R-SAF-002** | Electrical safety violation in product | 10 | 2 | 2 | 40 | • Licensed electricians only<br>• 100% electrical inspection<br>• Testing protocols<br>• NTA verification | Operations Mgr |
| **R-SAF-003** | Gas system leak in finished product | 10 | 1 | 2 | 20 | • Pressure testing 100%<br>• Licensed plumbers<br>• Leak detection verification | Operations Mgr |
| **R-SAF-004** | Structural failure (roof, floor, walls) | 10 | 1 | 1 | 10 | • Engineering-approved designs<br>• Material specifications<br>• Inspection at critical stages | Operations Mgr |
| **R-SAF-005** | Installation accident/injury | 9 | 3 | 4 | 108 | • Site safety assessment<br>• Installation safety procedures<br>• Trained installers<br>• Safety equipment | Install Manager |

#### QUALITY RISKS

| Risk ID | Risk Description | S | O | D | RPN | Mitigation Actions | Owner |
|:---|:---|:---:|:---:|:---:|:---:|:---|:---|
| **R-QUA-001** | Defect not detected until customer delivery | 6 | 5 | 6 | 180 | • Multi-stage inspection process<br>• Pre-delivery checklist<br>• Quality hold points | Quality Manager |
| **R-QUA-002** | Supplier provides nonconforming materials | 7 | 4 | 5 | 140 | • Incoming inspection<br>• Supplier quality agreements<br>• Approved supplier list | Purchasing Mgr |
| **R-QUA-003** | Process change causes quality degradation | 6 | 3 | 5 | 90 | • Change control process<br>• Trial run verification<br>• Management approval | Quality Manager |
| **R-QUA-004** | Inadequate employee training | 6 | 4 | 5 | 120 | • Competency-based training<br>• Skills verification<br>• Refresher training<br>• Training records | HR Manager |
| **R-QUA-005** | Design doesn't meet customer needs | 7 | 3 | 6 | 126 | • Customer requirement review<br>• Design approval process<br>• Prototype review | Operations Mgr |

#### OPERATIONAL RISKS

| Risk ID | Risk Description | S | O | D | RPN | Mitigation Actions | Owner |
|:---|:---|:---:|:---:|:---:|:---:|:---|:---|
| **R-OPS-001** | Production equipment failure/downtime | 5 | 5 | 6 | 150 | • Preventive maintenance program<br>• Spare parts inventory<br>• Backup equipment for critical tools | Operations Mgr |
| **R-OPS-002** | Material shortage delays production | 5 | 4 | 6 | 120 | • Safety stock levels<br>• Multiple supplier sources<br>• Lead time management | Purchasing Mgr |
| **R-OPS-003** | Weather delays installation | 4 | 6 | 7 | 168 | • Weather monitoring<br>• Flexible scheduling<br>• Customer communication | Install Manager |
| **R-OPS-004** | Inability to meet delivery commitments | 6 | 4 | 5 | 120 | • Realistic scheduling<br>• Buffer time in schedules<br>• Proactive communication | Operations Mgr |
| **R-OPS-005** | Key personnel turnover | 5 | 4 | 7 | 140 | • Cross-training program<br>• Documentation of knowledge<br>• Succession planning | HR Manager |

#### CUSTOMER RISKS

| Risk ID | Risk Description | S | O | D | RPN | Mitigation Actions | Owner |
|:---|:---|:---:|:---:|:---:|:---:|:---|:---|
| **R-CUS-001** | Customer dissatisfaction/complaints | 6 | 4 | 5 | 120 | • Clear communication process<br>• Quality pre-delivery check<br>• Post-delivery follow-up | Quality Manager |
| **R-CUS-002** | Warranty claim costs exceed budget | 5 | 4 | 6 | 120 | • Quality improvement initiatives<br>• Root cause analysis<br>• Preventive actions | Quality Manager |
| **R-CUS-003** | Site not ready for installation | 5 | 5 | 6 | 150 | • Pre-installation site checklist<br>• Customer site prep guide<br>• Site inspection before delivery | Install Manager |
| **R-CUS-004** | Miscommunication of customer expectations | 6 | 4 | 6 | 144 | • Documented requirements review<br>• Customer approval checkpoints<br>• Clear contract specifications | Operations Mgr |

#### FINANCIAL RISKS

| Risk ID | Risk Description | S | O | D | RPN | Mitigation Actions | Owner |
|:---|:---|:---:|:---:|:---:|:---:|:---|:---|
| **R-FIN-001** | Material cost increases | 5 | 6 | 8 | 240 | • Fixed-price contracts<br>• Multiple supplier quotes<br>• Value engineering | Purchasing Mgr |
| **R-FIN-002** | Rework costs exceed budget | 5 | 5 | 5 | 125 | • First-time quality focus<br>• Process controls<br>• Root cause analysis | Operations Mgr |
| **R-FIN-003** | Liability insurance cost increase | 6 | 4 | 8 | 192 | • Strong safety program<br>• Quality track record<br>• Risk mitigation documentation | CEO |

### 2.3 Risk Treatment Plans

**Critical Risks Requiring Immediate Action:**

```
┌────────────────────────────────────────────────────────────────────────────┐
│  RISK TREATMENT PRIORITY LIST                                              │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  🔴 R-FIN-001: Material Cost Increases (RPN 240)                           │
│     Actions: Negotiate annual contracts, diversify suppliers              │
│     Owner: Purchasing Manager                                             │
│     Target Date: 2026-03-01                                               │
│     Target RPN: <150                                                      │
│                                                                            │
│  🔴 R-FIN-003: Insurance Cost Increase (RPN 192)                           │
│     Actions: Document safety record, implement additional controls        │
│     Owner: CEO                                                            │
│     Target Date: 2026-04-01                                               │
│     Target RPN: <125                                                      │
│                                                                            │
│  🔴 R-QUA-001: Late Defect Detection (RPN 180)                             │
│     Actions: Enhance inspection process, add quality gates               │
│     Owner: Quality Manager                                                │
│     Target Date: 2026-02-15                                               │
│     Target RPN: <100                                                      │
│                                                                            │
│  🔴 R-OPS-003: Weather Installation Delays (RPN 168)                       │
│     Actions: Develop weather contingency procedures                       │
│     Owner: Installation Manager                                           │
│     Target Date: 2026-03-01                                               │
│     Target RPN: <120                                                      │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. OPPORTUNITY REGISTER

### 3.1 Opportunity Identification Framework

```
┌────────────────────────────────────────────────────────────────────────────┐
│  OPPORTUNITY IDENTIFICATION & PURSUIT                                      │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  OPPORTUNITY SOURCES:                                                     │
│                                                                            │
│  📈 Market Opportunities                                                   │
│     • Growing demand for affordable housing                               │
│     • New geographic markets                                              │
│     • Product line expansion                                              │
│                                                                            │
│  🔧 Process Improvements                                                   │
│     • Efficiency enhancements                                             │
│     • Technology adoption                                                 │
│     • Waste reduction                                                     │
│                                                                            │
│  🤝 Stakeholder Needs                                                      │
│     • Customer feedback and requests                                      │
│     • Supplier innovations                                                │
│     • Regulatory incentives                                               │
│                                                                            │
│  💡 Innovation                                                             │
│     • New construction techniques                                         │
│     • Material innovations                                                │
│     • Digital tools and automation                                        │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Current Opportunity Register

| Opp ID | Opportunity Description | Potential Benefit | Feasibility | Priority | Owner | Target Date |
|:---|:---|:---|:---:|:---|:---|:---|
| **O-001** | Implement lean manufacturing principles | Reduce waste 20%, increase throughput 15% | High | 🔴 HIGH | Operations Mgr | 2026-Q2 |
| **O-002** | AI-powered quality inspection system | Reduce inspection time 30%, improve consistency | Medium | 🟡 MEDIUM | Quality Mgr | 2026-Q3 |
| **O-003** | Expand into northern Colorado market | Increase revenue 25% | Medium | 🔴 HIGH | CEO | 2026-Q4 |
| **O-004** | Supplier partnership for pre-assembled components | Reduce labor costs 15%, improve quality | High | 🟡 MEDIUM | Purchasing Mgr | 2026-Q3 |
| **O-005** | Employee skills development program | Reduce defects 20%, improve retention | High | 🔴 HIGH | HR Manager | 2026-Q2 |
| **O-006** | Customer portal for order tracking | Improve satisfaction, reduce inquiries | Medium | 🟢 LOW | Operations Mgr | 2026-Q4 |
| **O-007** | Energy-efficient home designs | Market differentiation, premium pricing | High | 🟡 MEDIUM | Operations Mgr | 2026-Q3 |
| **O-008** | Automated material cutting system | Reduce waste 10%, improve accuracy | Medium | 🟢 LOW | Operations Mgr | 2027-Q1 |

### 3.3 Opportunity Evaluation Criteria

| Criterion | Weight | Scoring (1-5) |
|:---|:---:|:---|
| **Strategic Alignment** | 30% | 5=Perfect fit, 1=Poor fit |
| **Financial Benefit** | 25% | 5=High ROI, 1=Minimal ROI |
| **Feasibility** | 20% | 5=Easy, 1=Very difficult |
| **Risk Level** | 15% | 5=Low risk, 1=High risk |
| **Timeline** | 10% | 5=Quick win, 1=Long-term |

---

## 4. QUALITY OBJECTIVES PLANNING

### 4.1 SMART Objectives Framework

```
┌────────────────────────────────────────────────────────────────────────────┐
│  SMART OBJECTIVES CRITERIA                                                 │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  S - SPECIFIC:      Clear, unambiguous, well-defined                      │
│  M - MEASURABLE:    Quantifiable with metrics and KPIs                    │
│  A - ACHIEVABLE:    Realistic given resources and constraints             │
│  R - RELEVANT:      Aligned with strategic goals and QMS                  │
│  T - TIME-BOUND:    Specific deadline or timeframe                        │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 2026 Quality Objectives

| Objective | Metric | Baseline | Target | Measurement | Owner | Review Frequency |
|:---|:---|:---:|:---:|:---|:---|:---|
| **Regulatory Compliance** | HUD violations | Current: 0 | 0 | Violation count | Quality Mgr | Monthly |
| **Customer Satisfaction** | CSAT Score | 85% | ≥90% | Post-delivery survey | Quality Mgr | Quarterly |
| **Defect Rate** | Defects per unit | 4.2% | <2% | Inspection reports | Operations Mgr | Monthly |
| **First-Pass Yield** | % units no rework | 92% | ≥98% | Production tracking | Operations Mgr | Weekly |
| **On-Time Delivery** | % on promised date | 88% | ≥95% | Delivery schedule | Operations Mgr | Monthly |
| **Safety Performance** | Lost-time accidents | 2 (2025) | 0 | Safety records | Operations Mgr | Monthly |
| **Installation Quality** | First-time complete | 90% | ≥95% | Installation checklist | Install Mgr | Per installation |
| **Supplier Quality** | Incoming defect rate | 2.5% | <1% | Receiving inspection | Purchasing Mgr | Monthly |
| **CAPA Effectiveness** | % effective closures | 85% | ≥90% | CAPA review | Quality Mgr | Monthly |
| **Audit Performance** | Major findings | 3 (2025) | 0 | Audit reports | Quality Mgr | Per audit |

### 4.3 Objectives Deployment Plan

```
┌────────────────────────────────────────────────────────────────────────────┐
│  OBJECTIVES DEPLOYMENT CASCADE                                             │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ORGANIZATIONAL OBJECTIVE: Customer Satisfaction ≥90%                      │
│                                                                            │
│     ├──> OPERATIONS: Defect rate <2%                                      │
│     │       └──> FRAMING: Square/level 100% within tolerance              │
│     │       └──> ELECTRICAL: Zero rework                                  │
│     │       └──> PLUMBING: Zero leaks                                     │
│     │       └──> FINISH: <1% cosmetic defects                             │
│     │                                                                      │
│     ├──> INSTALLATION: First-time complete ≥95%                            │
│     │       └──> SITE PREP: 100% checklist compliance                     │
│     │       └──> INSTALLATION: 24 CFR 3285 compliance 100%                │
│     │       └──> HANDOVER: Complete documentation 100%                    │
│     │                                                                      │
│     ├──> QUALITY: CAPA effectiveness ≥90%                                  │
│     │       └──> Root cause analysis complete                             │
│     │       └──> Corrective actions verified                              │
│     │       └──> Preventive actions effective                             │
│     │                                                                      │
│     └──> PURCHASING: Supplier defect rate <1%                              │
│            └──> Incoming inspection 100%                                  │
│            └──> Supplier audits quarterly                                 │
│            └──> Cert verification 100%                                    │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Objectives Action Plans

**Example: Defect Rate Reduction from 4.2% to <2%**

| Action | Responsibility | Resources Needed | Target Date | Status |
|:---|:---|:---|:---|:---|
| 1. Implement enhanced inspection checklist | Quality Manager | Checklist development, training | 2026-02-15 | Planned |
| 2. Provide additional training to finish crew | HR Manager | Training materials, instructor | 2026-02-28 | Planned |
| 3. Install additional lighting in finish area | Operations Manager | LED lighting, installation | 2026-02-10 | Planned |
| 4. Implement peer review before final inspection | Operations Manager | Process documentation | 2026-03-01 | Planned |
| 5. Weekly defect analysis meetings | Quality Manager | Meeting time | 2026-02-01 | Planned |

---

## 5. CHANGE PLANNING FRAMEWORK

### 5.1 Change Control Process

```
┌────────────────────────────────────────────────────────────────────────────┐
│  CHANGE MANAGEMENT PROCESS                                                 │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Step 1: CHANGE REQUEST                                                   │
│  ──────────────────────                                                   │
│  • Anyone can propose a change                                            │
│  • Submit FORM-CHANGE-001                                                 │
│  • Describe current state, proposed state, rationale                      │
│                                                                            │
│  Step 2: IMPACT ASSESSMENT                                                │
│  ─────────────────────────                                                │
│  • Quality Manager evaluates                                              │
│  • Assess impact on: Quality, Compliance, Cost, Schedule, Resources       │
│  • Identify risks and opportunities                                       │
│  • Determine approval level needed                                        │
│                                                                            │
│  Step 3: APPROVAL                                                         │
│  ────────────────                                                         │
│  • Minor changes: Process Owner                                           │
│  • Moderate changes: Quality Manager                                      │
│  • Major changes: CEO or Management Committee                             │
│                                                                            │
│  Step 4: PLANNING                                                         │
│  ──────────────                                                           │
│  • Develop implementation plan                                            │
│  • Identify training needs                                                │
│  • Update documentation                                                   │
│  • Communicate to affected personnel                                      │
│                                                                            │
│  Step 5: IMPLEMENTATION                                                   │
│  ──────────────────────                                                   │
│  • Execute change as planned                                              │
│  • Provide training                                                       │
│  • Update QMS documents                                                   │
│  • Monitor initial results                                                │
│                                                                            │
│  Step 6: VERIFICATION                                                     │
│  ────────────────────                                                     │
│  • Verify intended results achieved                                       │
│  • Check for unintended consequences                                      │
│  • Evaluate effectiveness                                                 │
│  • Document lessons learned                                               │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Change Classification

| Change Type | Examples | Approval Required | Impact Assessment |
|:---|:---|:---|:---|
| **MINOR** | • Form updates<br>• Clarifications to procedures<br>• Typographical corrections | Process Owner | Quick review |
| **MODERATE** | • Process modifications<br>• New work instructions<br>• Supplier changes<br>• Equipment changes | Quality Manager + Process Owner | Detailed assessment |
| **MAJOR** | • New products/designs<br>• Policy changes<br>• Facility changes<br>• Organizational changes<br>• Major process redesign | CEO or Management Committee | Comprehensive assessment |
| **EMERGENCY** | • Safety-critical fixes<br>• Regulatory compliance urgency | CEO (retroactive approval) | Expedited assessment |

### 5.3 Change Impact Assessment Template

**To be completed for Moderate and Major changes:**

| Impact Area | Questions to Consider | Assessment |
|:---|:---|:---|
| **Quality** | Will product/service quality be affected?<br>Will customer satisfaction be impacted? | |
| **Compliance** | Are regulatory requirements affected?<br>Do certifications need updating? | |
| **Processes** | Which processes are impacted?<br>Are procedures/WIs affected? | |
| **Resources** | What resources are needed?<br>Budget, personnel, equipment, time? | |
| **Risks** | What new risks are introduced?<br>What existing risks are affected? | |
| **Training** | Who needs training?<br>What competencies required? | |
| **Documentation** | Which QMS documents need updates?<br>Forms, procedures, work instructions? | |
| **Communication** | Who needs to be informed?<br>What communication method? | |

### 5.4 Planned Changes for 2026

| Change | Type | Description | Expected Benefit | Approval | Target Date |
|:---|:---|:---|:---|:---|:---|
| New design model launch | MAJOR | Introduce 2-bedroom ranch design | Expand product line | CEO | 2026-Q2 |
| Lean manufacturing implementation | MAJOR | Adopt lean principles in production | Reduce waste, improve efficiency | Management Committee | 2026-Q2 |
| Quality inspection software | MODERATE | Implement digital inspection checklists | Improve consistency, tracking | Quality Manager | 2026-Q3 |
| Supplier consolidation | MODERATE | Reduce supplier base, strengthen partnerships | Better quality, pricing | Purchasing Manager | 2026-Q2 |
| Training program enhancement | MODERATE | Competency-based training for all roles | Improved quality, retention | HR Manager | 2026-Q3 |

---

## 6. RISK MONITORING AND REVIEW

### 6.1 Risk Review Schedule

```
┌────────────────────────────────────────────────────────────────────────────┐
│  RISK MONITORING SCHEDULE                                                  │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  DAILY:                                                                   │
│  • Monitor safety incidents                                               │
│  • Track quality defects                                                  │
│  • Review production issues                                               │
│                                                                            │
│  WEEKLY:                                                                  │
│  • Review high-priority risks (RPN >200)                                  │
│  • Update mitigation action status                                        │
│  • Identify new risks                                                     │
│                                                                            │
│  MONTHLY:                                                                 │
│  • Risk register review meeting                                           │
│  • Update RPN based on new data                                           │
│  • Review mitigation effectiveness                                        │
│  • Report to management                                                   │
│                                                                            │
│  QUARTERLY:                                                               │
│  • Comprehensive risk assessment                                          │
│  • Management review of risk profile                                      │
│  • Update risk appetite as needed                                         │
│  • Opportunity register review                                            │
│                                                                            │
│  ANNUALLY:                                                                │
│  • Complete risk register refresh                                         │
│  • Strategic risk planning                                                │
│  • Risk management process audit                                          │
│  • Update risk management framework                                       │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Risk KPIs

| KPI | Target | Measurement | Frequency |
|:---|:---|:---|:---|
| **Average RPN** | Trending downward | Total RPN / # risks | Monthly |
| **% Critical Risks Mitigated** | ≥80% within 30 days | Closed critical / total critical | Monthly |
| **New Risks Identified** | Continuous identification | Count new risks added | Monthly |
| **Mitigation Plan Completion** | ≥90% on time | Completed on time / total | Monthly |
| **Risk Reviews Completed** | 100% on schedule | Completed / scheduled | Quarterly |

### 6.3 Risk Reporting

**Monthly Risk Report Contents:**
- Executive summary of risk profile
- Top 10 risks by RPN
- New risks identified
- Mitigation actions completed
- Mitigation actions overdue
- Risk trends and analysis
- Recommendations for management

**Distribution:** CEO, Quality Manager, Operations Manager, All Department Managers

---

## 📚 REVISION HISTORY

| Version | Date | Author | Changes |
|:---|:---|:---|:---|
| 1.0 | 2026-01-15 | Quality Manager | Initial release - Risk management and planning framework established |

---

## ✍️ APPROVAL SIGNATURES

| Role | Name | Signature | Date |
|:---|:---|:---|:---|
| **Chief Executive Officer** | | _________________ | ________ |
| **Quality Manager** | | _________________ | ________ |
| **Operations Manager** | | _________________ | ________ |

---

## 📎 RELATED DOCUMENTS

- QMS-000-Master-Index.md - QMS Navigation
- QMS-001-Context-Stakeholders.md - Organization Context
- QMS-002-Leadership-Policy.md - Risk Appetite Statement
- QMS-006-Performance-Evaluation.md - Risk KPI Monitoring
- QMS-007-Improvement.md - Risk-Based CAPA Process
- FORM-CHANGE-001 - Change Request Form

---

**Document Location:** `/docs/manual/QMS-003-Planning-Risk.md`

**Controlled Document:** This is a controlled document. Electronic copy is the only controlled version. Printed copies are uncontrolled.

---

*Fort Homes LLC - Quality Management System*  
*Grand Junction, Colorado*  
*Building Quality Homes, Building Strong Communities*
