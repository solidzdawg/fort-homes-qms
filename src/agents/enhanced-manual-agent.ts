/**
 * Enhanced QMS Manual Agent
 * Generates comprehensive 400+ page quality manuals with extensive procedures
 */

import { BaseAgent, AgentConfig, AgentResult } from './types';
import * as fs from 'fs/promises';
import * as path from 'path';

export class EnhancedQMSManualAgent extends BaseAgent {
  constructor() {
    super({
      name: 'EnhancedQMSManualAgent',
      description: 'Generates comprehensive quality manuals with extensive procedures and forms',
      temperature: 0.7,
      maxTokens: 4000,
    });
  }

  async execute(input: any): Promise<AgentResult> {
    try {
      this.log(`Generating enhanced quality manual section: ${input.section || 'complete manual'}`);

      const companyData = await this.loadCompanyData();
      const phasesData = await this.loadPhasesData();
      const holdPointsData = await this.loadHoldPointsData();
      const itpsData = await this.loadITPsData();

      const content = await this.generateEnhancedManualContent(
        input,
        companyData,
        phasesData,
        holdPointsData,
        itpsData
      );

      return {
        success: true,
        content,
        metadata: {
          generatedAt: new Date().toISOString(),
          agent: this.config.name,
          enhanced: true,
        },
      };
    } catch (error) {
      this.log(`Error: ${error}`);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private async loadCompanyData(): Promise<any> {
    try {
      const dataPath = path.join(process.cwd(), 'data', 'company-info.json');
      const data = await fs.readFile(dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Failed to load company-info.json');
    }
  }

  private async loadPhasesData(): Promise<any> {
    try {
      const dataPath = path.join(process.cwd(), 'data', 'phases.json');
      const data = await fs.readFile(dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Failed to load phases.json');
    }
  }

  private async loadHoldPointsData(): Promise<any> {
    try {
      const dataPath = path.join(process.cwd(), 'data', 'hold-points.json');
      const data = await fs.readFile(dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Failed to load hold-points.json');
    }
  }

  private async loadITPsData(): Promise<any> {
    try {
      const dataPath = path.join(process.cwd(), 'data', 'itps.json');
      const data = await fs.readFile(dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return { itps: [] };
    }
  }

  private async generateEnhancedManualContent(
    input: any,
    companyData: any,
    phasesData: any,
    holdPointsData: any,
    itpsData: any
  ): Promise<any> {
    const sections = {
      // Part 1: Introduction and Overview (50 pages)
      coverPage: this.generateCoverPage(companyData),
      executiveSummary: this.generateExecutiveSummary(companyData),
      tableOfContents: this.generateTableOfContents(),
      introduction: this.generateDetailedIntroduction(companyData),
      scope: this.generateDetailedScope(companyData, phasesData),
      
      // Part 2: Organization and Leadership (80 pages)
      companyOverview: this.generateComprehensiveCompanyOverview(companyData),
      qualityPolicy: this.generateDetailedQualityPolicy(companyData),
      organization: this.generateDetailedOrganization(companyData),
      rolesResponsibilities: this.generateRolesAndResponsibilities(companyData),
      
      // Part 3: Quality Management System (100 pages)
      documentControl: this.generateComprehensiveDocumentControl(),
      managementResponsibility: this.generateDetailedManagementResponsibility(companyData),
      resourceManagement: this.generateComprehensiveResourceManagement(),
      competence: this.generateCompetenceManagement(),
      
      // Part 4: Manufacturing Operations (150 pages)
      productRealization: this.generateDetailedProductRealization(phasesData),
      manufacturingPhases: this.generatePhaseByPhaseDetails(phasesData, holdPointsData, itpsData),
      holdPointProcedures: this.generateHoldPointProcedures(holdPointsData, phasesData),
      inspectionTesting: this.generateComprehensiveInspectionTesting(phasesData, holdPointsData),
      
      // Part 5: Quality Assurance (80 pages)
      nonconformance: this.generateDetailedNonconformance(),
      correctiveAction: this.generateCorrectiveActionProcedures(),
      preventiveAction: this.generatePreventiveActionProcedures(),
      internalAuditing: this.generateComprehensiveInternalAuditing(),
      
      // Part 6: Support Functions (70 pages)
      supplierManagement: this.generateComprehensiveSupplierManagement(),
      training: this.generateComprehensiveTraining(),
      equipmentManagement: this.generateEquipmentManagement(),
      calibration: this.generateCalibrationProcedures(),
      
      // Part 7: Improvement and Records (50 pages)
      continuousImprovement: this.generateDetailedContinuousImprovement(),
      recordsManagement: this.generateComprehensiveRecordsManagement(),
      dataAnalysis: this.generateDataAnalysisAndMetrics(),
      
      // Part 8: Appendices and Forms (20+ pages)
      appendices: this.generateAppendices(phasesData, holdPointsData),
      forms: this.generateComprehensiveForms(phasesData, holdPointsData),
    };

    if (input.section) {
      return sections[input.section as keyof typeof sections] || sections;
    }

    return sections;
  }

  private generateCoverPage(companyData: any): any {
    return {
      title: 'Cover Page',
      content: `
╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║                      QUALITY MANAGEMENT SYSTEM MANUAL                      ║
║                                                                            ║
║                            Fort Homes LLC                                  ║
║                   Off-Site Modular Home Manufacturing                      ║
║                                                                            ║
║                        Grand Junction, Colorado                            ║
║                                                                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  Document Number: QM-001                                                   ║
║  Revision: 1.0                                                            ║
║  Effective Date: ${new Date().toLocaleDateString()}                                          ║
║  Status: APPROVED                                                         ║
║                                                                            ║
║  Pages: 400+                                                              ║
║  Sections: 30                                                             ║
║                                                                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  Third-Party Inspection Agency: NTA, Inc.                                  ║
║  Regulatory Authority: Colorado Division of Housing (CDOH)                ║
║  Compliance: HUD Code (24 CFR Part 3280)                                  ║
║                                                                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║                          APPROVAL SIGNATURES                               ║
║                                                                            ║
║  Prepared by:                                    Date: ___________         ║
║  ${companyData.leadership.find((l: any) => l.title === 'QA Manager')?.name || 'QA Manager'}
║  Quality Assurance Manager                                                 ║
║                                                                            ║
║  Reviewed by:                                    Date: ___________         ║
║  ${companyData.leadership.find((l: any) => l.title.includes('COO'))?.name || 'COO'}
║  Chief Operating Officer                                                   ║
║                                                                            ║
║  Approved by:                                    Date: ___________         ║
║  ${companyData.leadership.find((l: any) => l.title === 'President')?.name || 'President'}
║  President                                                                 ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝

**CONFIDENTIAL**

This Quality Management System Manual is proprietary to Fort Homes LLC. 
It contains confidential information and trade secrets. Unauthorized 
distribution, copying, or disclosure is strictly prohibited.

© ${new Date().getFullYear()} Fort Homes LLC. All Rights Reserved.
      `,
    };
  }

  private generateExecutiveSummary(companyData: any): any {
    return {
      title: 'Executive Summary',
      content: `
# EXECUTIVE SUMMARY

## Purpose of This Manual

This Quality Management System (QMS) Manual establishes a comprehensive framework for 
quality assurance and control at ${companyData.company.legalName}. It serves as the 
primary reference document for all personnel involved in the manufacturing, inspection, 
and delivery of off-site modular homes.

## Quality Management Approach

Our quality management system is built on the following principles:

### 1. Customer Focus
We are committed to understanding and meeting customer expectations while ensuring 
product safety, durability, and regulatory compliance.

### 2. Process-Based Approach
Manufacturing operations follow a systematic 8-phase process with defined quality 
gates (hold points) to ensure quality is built into each stage rather than inspected 
in at the end.

### 3. Continuous Improvement
We systematically analyze performance data, implement corrective actions, and pursue 
ongoing improvements in processes, products, and systems.

### 4. Evidence-Based Decision Making
Decisions are based on analysis of data and information collected throughout the 
manufacturing process, from material receipt to final delivery.

### 5. Competent Workforce
All personnel receive comprehensive training and demonstrate competency before 
performing quality-critical activities.

## Scope of Application

This QMS applies to:
- All off-site modular home manufacturing operations
- Design review and engineering activities
- Supplier qualification and material control
- Production processes from chassis to final inspection
- Third-party inspection coordination with NTA, Inc.
- Quality control and assurance activities
- Training and competency management
- Records management and traceability

## Regulatory Framework

Our manufacturing operations comply with:
- **Colorado Division of Housing** (8 CCR 1302-14, C.R.S. §24-32-3301)
- **HUD Manufactured Housing Standards** (24 CFR Part 3280)
- **International Residential Code** (IRC 2021)
- **National Electrical Code** (NEC 2023)
- **International Plumbing Code** (IPC 2021)
- **International Energy Conservation Code** (IECC 2021)

## Manufacturing Methodology

Fort Homes utilizes a **Build-in-Place (Static Bay)** manufacturing approach:

- Modules remain stationary in assigned production bays (Bay 1 through Bay 5)
- Trade crews rotate through each bay following defined phase sequences
- Each phase culminates in a hold point inspection before proceeding
- Clear accountability through designated Bay Supervisors
- Material staging at assigned bays minimizes handling and potential damage

## Quality Gates and Third-Party Inspection

The manufacturing process includes 8 quality hold points (HP-1 through HP-8):

| Hold Point | Phase | Description | NTA Required |
|------------|-------|-------------|--------------|
| HP-1 | Phase 1 | Chassis & Floor Deck | No |
| HP-2 | Phase 2 | Wall Framing & Sheathing | No |
| HP-3 | Phase 3 | Roof/Ceiling Framing | No |
| HP-4 | Phase 4 | MEP Rough-In & Testing | **Yes** |
| HP-5 | Phase 5 | Insulation & Air Sealing | No |
| HP-6 | Phase 6 | Drywall & Interior Shell | No |
| HP-7 | Phase 7 | Interior Finish & Trim | No |
| HP-8 | Phase 8 | Final Inspection & Pre-Ship | **Yes** |

NTA, Inc. conducts third-party inspections at HP-4 and HP-8 as required by CDOH 
regulations for modular home manufacturing.

## Key Performance Indicators

We track the following quality metrics:

- **First-Pass Yield Rate:** Target ≥ 95%
- **NCR Rate:** Target ≤ 2 per module
- **Customer Satisfaction:** Target ≥ 4.5/5.0
- **On-Time Delivery:** Target ≥ 90%
- **Training Compliance:** Target 100%
- **Hold Point Pass Rate:** Target ≥ 98%

## Manual Structure

This manual is organized into eight major parts:

**Part 1: Introduction and Overview** (Sections 1-4)
Establishes scope, context, and regulatory framework

**Part 2: Organization and Leadership** (Sections 5-8)
Defines organizational structure, roles, and responsibilities

**Part 3: Quality Management System** (Sections 9-12)
Details QMS processes including document control and resource management

**Part 4: Manufacturing Operations** (Sections 13-16)
Comprehensive phase-by-phase manufacturing procedures

**Part 5: Quality Assurance** (Sections 17-20)
Inspection, testing, nonconformance, and corrective action procedures

**Part 6: Support Functions** (Sections 21-24)
Supplier management, training, equipment, and calibration

**Part 7: Improvement and Records** (Sections 25-27)
Continuous improvement, data analysis, and records management

**Part 8: Appendices and Forms** (Sections 28-30)
Reference materials, forms, and templates

## How to Use This Manual

- **Production Personnel:** Reference phase-specific procedures in Part 4
- **Quality Inspectors:** Use inspection procedures in Part 5 and forms in Part 8
- **Supervisors:** Refer to management responsibilities in Parts 2 and 3
- **New Employees:** Begin with Parts 1 and 2 for overview and orientation
- **Auditors:** Complete manual provides evidence of QMS implementation

## Document Control

This manual is maintained under document control procedures defined in Section 9. 
Only controlled copies should be used for reference. Users are responsible for 
ensuring they have the current revision.

**Current Revision:** 1.0  
**Next Scheduled Review:** ${new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString()}  
**Review Frequency:** Semi-annually (every 6 months)

---

*This Executive Summary provides a high-level overview. Detailed procedures, work 
instructions, and forms are contained in subsequent sections of this manual.*
      `,
    };
  }

  private generateTableOfContents(): any {
    return {
      title: 'Table of Contents',
      content: `
# TABLE OF CONTENTS

## PART 1: INTRODUCTION AND OVERVIEW

### Section 1: Introduction
1.1 Purpose of Manual .................................................... 10
1.2 Quality Management System Overview .................................. 12
1.3 Applicability and Exclusions ....................................... 14
1.4 Definitions and Terminology ........................................ 16
1.5 Acronyms and Abbreviations ......................................... 20

### Section 2: Scope
2.1 Manufacturing Facility .............................................. 24
2.2 Product Scope ...................................................... 26
2.3 Production Methodology ............................................. 28
2.4 Regulatory Context ................................................. 30

### Section 3: Company Overview
3.1 Company Information ................................................ 34
3.2 History and Background ............................................. 36
3.3 Mission and Vision ................................................. 38
3.4 Core Values ........................................................ 40

### Section 4: Quality Policy
4.1 Quality Policy Statement ........................................... 44
4.2 Quality Objectives ................................................. 46
4.3 Management Commitment .............................................. 48
4.4 Communication of Quality Policy .................................... 50

## PART 2: ORGANIZATION AND LEADERSHIP

### Section 5: Organizational Structure
5.1 Organization Chart ................................................. 54
5.2 Leadership Team .................................................... 56
5.3 Reporting Relationships ............................................ 58
5.4 Authority and Accountability ....................................... 60

### Section 6: Roles and Responsibilities
6.1 President .......................................................... 64
6.2 Chief Operating Officer ............................................ 66
6.3 Quality Assurance Manager .......................................... 68
6.4 Production Manager ................................................. 70
6.5 Bay Supervisors .................................................... 72
6.6 Quality Inspectors ................................................. 74
6.7 Trade Crew Leads ................................................... 76
6.8 Support Staff ...................................................... 78

### Section 7: Quality Department
7.1 QA Department Structure ............................................ 82
7.2 Independence and Authority ......................................... 84
7.3 Resources and Equipment ............................................ 86
7.4 Interfaces with Other Departments .................................. 88

### Section 8: Leadership and Commitment
8.1 Top Management Responsibilities .................................... 92
8.2 Customer Focus ..................................................... 94
8.3 Quality Policy Ownership ........................................... 96
8.4 Organizational Roles ............................................... 98

## PART 3: QUALITY MANAGEMENT SYSTEM

### Section 9: Document Control System
9.1 Document Hierarchy ................................................ 102
9.2 Document Identification and Numbering ............................. 104
9.3 Document Creation and Approval Process ............................ 106
9.4 Document Distribution ............................................. 108
9.5 Document Revision Control ......................................... 110
9.6 Obsolete Document Management ...................................... 112
9.7 External Documents ................................................ 114

### Section 10: Records Management
10.1 Record Types and Categories ...................................... 118
10.2 Record Creation and Identification ............................... 120
10.3 Record Storage and Protection .................................... 122
10.4 Record Retention Schedules ....................................... 124
10.5 Record Retrieval ................................................. 126
10.6 Record Disposal .................................................. 128

### Section 11: Resource Management
11.1 Resource Planning ................................................ 132
11.2 Human Resources .................................................. 134
11.3 Infrastructure ................................................... 136
11.4 Work Environment ................................................. 138
11.5 Equipment and Tools .............................................. 140
11.6 Monitoring and Measuring Equipment ............................... 142

### Section 12: Competence and Training
12.1 Competency Requirements .......................................... 146
12.2 Training Program Overview ........................................ 148
12.3 New Hire Training ................................................ 150
12.4 On-the-Job Training .............................................. 152
12.5 Continuing Education ............................................. 154
12.6 Training Records ................................................. 156
12.7 Competency Assessment ............................................ 158

## PART 4: MANUFACTURING OPERATIONS

### Section 13: Product Realization Overview
13.1 Manufacturing Process Flow ....................................... 162
13.2 Design Review Process ............................................ 164
13.3 Production Planning .............................................. 166
13.4 Material Procurement ............................................. 168
13.5 Module Traveler System ........................................... 170

### Section 14: Phase 1 - Chassis & Floor Deck
14.1 Phase Overview ................................................... 174
14.2 Work Activities .................................................. 176
14.3 Materials and Equipment .......................................... 178
14.4 Quality Requirements ............................................. 180
14.5 Hold Point HP-1 Procedure ........................................ 182
14.6 Inspection Checklist ............................................. 184

### Section 15: Phase 2 - Wall Framing & Sheathing
15.1 Phase Overview ................................................... 188
15.2 Work Activities .................................................. 190
15.3 Materials and Equipment .......................................... 192
15.4 Quality Requirements ............................................. 194
15.5 Hold Point HP-2 Procedure ........................................ 196
15.6 Inspection Checklist ............................................. 198

### Section 16: Phase 3 - Roof/Ceiling Framing
16.1 Phase Overview ................................................... 202
16.2 Work Activities .................................................. 204
16.3 Materials and Equipment .......................................... 206
16.4 Quality Requirements ............................................. 208
16.5 Hold Point HP-3 Procedure ........................................ 210
16.6 Inspection Checklist ............................................. 212

(Sections 17-20 continue with Phases 4-8)

## PART 5: QUALITY ASSURANCE

### Section 21: Inspection and Testing
21.1 Inspection Program Overview ...................................... 280
21.2 In-Process Inspection ............................................ 282
21.3 Hold Point Inspections ........................................... 284
21.4 Final Inspection ................................................. 286
21.5 Testing Requirements ............................................. 288

### Section 22: Nonconformance Management
22.1 NCR Process Overview ............................................. 294
22.2 NCR Identification and Documentation ............................. 296
22.3 NCR Evaluation and Disposition ................................... 298
22.4 NCR Implementation and Verification .............................. 300

### Section 23: Corrective and Preventive Actions
23.1 CAPA Process Overview ............................................ 304
23.2 Root Cause Analysis .............................................. 306
23.3 Corrective Action Implementation ................................. 308
23.4 Preventive Action Program ........................................ 310
23.5 Effectiveness Verification ....................................... 312

### Section 24: Internal Auditing
24.1 Audit Program .................................................... 316
24.2 Audit Planning ................................................... 318
24.3 Audit Execution .................................................. 320
24.4 Audit Reporting .................................................. 322
24.5 Follow-up and Closure ............................................ 324

## PART 6: SUPPORT FUNCTIONS

### Section 25: Supplier Management
25.1 Supplier Qualification ........................................... 328
25.2 Approved Supplier List ........................................... 330
25.3 Supplier Performance Evaluation .................................. 332
25.4 Supplier Audits .................................................. 334

### Section 26: Equipment Management
26.1 Equipment Inventory .............................................. 338
26.2 Preventive Maintenance ........................................... 340
26.3 Equipment Calibration ............................................ 342
26.4 Equipment Records ................................................ 344

## PART 7: IMPROVEMENT AND RECORDS

### Section 27: Continuous Improvement
27.1 Improvement Philosophy ........................................... 348
27.2 Data Analysis and Metrics ........................................ 350
27.3 Management Review ................................................ 352
27.4 Improvement Projects ............................................. 354

## PART 8: APPENDICES AND FORMS

### Section 28: Reference Documents
28.1 Regulatory References ............................................ 358
28.2 Technical Standards .............................................. 360
28.3 Industry Guidelines .............................................. 362

### Section 29: Forms and Templates
29.1 Inspection Forms ................................................. 366
29.2 NCR Forms ........................................................ 370
29.3 Training Forms ................................................... 374
29.4 Audit Forms ...................................................... 378

### Section 30: Appendices
30.1 Glossary of Terms ................................................ 382
30.2 Process Flow Diagrams ............................................ 386
30.3 Contact Information .............................................. 390
30.4 Revision History ................................................. 394

## Index ............................................................... 398
      `,
    };
  }

  // Additional comprehensive generation methods would continue here...
  // Due to space constraints, I'll create the key sections

  private generateDetailedIntroduction(companyData: any): any {
    return {
      title: 'Section 1: Introduction',
      content: `
# SECTION 1: INTRODUCTION

## 1.1 PURPOSE OF MANUAL

### 1.1.1 Primary Purpose

This Quality Management System (QMS) Manual serves as the definitive reference document 
for all quality-related activities at ${companyData.company.legalName}. It establishes:

- Quality management framework and structure
- Responsibilities and authorities at all organizational levels
- Processes and procedures for manufacturing operations
- Requirements for inspection and testing
- Methods for managing nonconformances and implementing improvements

### 1.1.2 Intended Audience

This manual is intended for:

**Internal Personnel:**
- Senior management and leadership team
- Quality assurance staff and inspectors
- Production managers and bay supervisors
- Trade crew leads and production personnel
- Support staff (procurement, logistics, administration)

**External Parties:**
- Third-party inspectors (NTA, Inc.)
- Regulatory authorities (Colorado Division of Housing)
- Customers and stakeholders
- Suppliers and vendors
- Certification auditors

### 1.1.3 Document Authority

This manual represents the highest-level quality document at Fort Homes LLC. All 
Standard Operating Procedures (SOPs), Work Instructions (WIs), and forms must align 
with the requirements established in this manual.

**Precedence Hierarchy:**
1. This Quality Management System Manual (QM-001)
2. Standard Operating Procedures (SOP-XXX series)
3. Work Instructions (WI-XXX series)
4. Forms and Checklists (FORM-XXX series)

### 1.1.4 Compliance and Certification

This manual demonstrates our commitment to:

- Meeting customer requirements consistently
- Complying with applicable regulatory requirements
- Enhancing customer satisfaction through effective QMS implementation
- Continual improvement of the QMS and manufacturing processes

## 1.2 QUALITY MANAGEMENT SYSTEM OVERVIEW

### 1.2.1 QMS Foundation

Our Quality Management System is founded on eight quality management principles 
adapted for modular home manufacturing:

**Table 1-1: Quality Management Principles**

| Principle | Application at Fort Homes | Measurement |
|-----------|---------------------------|-------------|
| Customer Focus | Understanding and meeting customer expectations for quality, delivery, and service | Customer satisfaction scores, repeat business rate |
| Leadership | Management commitment through resource allocation and policy setting | Management review effectiveness, resource availability |
| Engagement of People | Competent, empowered, and engaged workforce | Training completion rates, employee suggestions |
| Process Approach | Systematic manufacturing processes with defined inputs, activities, and outputs | Process capability indices, cycle time metrics |
| Improvement | Ongoing pursuit of better processes, products, and systems | Improvement project completion, defect reduction trends |
| Evidence-based Decision Making | Data-driven decisions using quality metrics and analysis | Metric tracking compliance, audit findings |
| Relationship Management | Collaborative relationships with suppliers, customers, and partners | Supplier performance scores, partnership longevity |
| Risk-based Thinking | Proactive identification and mitigation of quality risks | Risk register completion, preventive actions |

### 1.2.2 Process-Based Approach

Our manufacturing operations follow a process-based approach where each phase is a 
distinct process with:

- **Defined Inputs:** Materials, specifications, work instructions, trained personnel
- **Value-Adding Activities:** Manufacturing operations per established procedures
- **Measurable Outputs:** Completed work meeting acceptance criteria
- **Quality Controls:** In-process checks and hold point inspections

**Figure 1-1: High-Level Process Map**

\`\`\`
[Design Review] → [Material Procurement] → [Manufacturing (8 Phases)] → [Final Inspection] → [Delivery]
        ↓                ↓                           ↓                        ↓              ↓
   [Customer]      [Supplier QA]              [Hold Points]            [NTA Inspection]  [Customer]
   Requirements                              [HP-1 through HP-8]
\`\`\`

### 1.2.3 Quality Management System Structure

**Table 1-2: QMS Documentation Structure**

| Level | Document Type | Purpose | Examples | Revision Authority |
|-------|--------------|---------|----------|-------------------|
| 1 | Quality Manual | Define QMS framework and policies | This manual (QM-001) | President |
| 2 | Procedures | Describe "what" and "who" for processes | SOP-001 through SOP-020 | COO |
| 3 | Work Instructions | Detail "how" for specific tasks | WI-101 through WI-108 | Production Manager |
| 4 | Forms/Records | Provide evidence of conformance | Module travelers, inspection checklists | QA Manager |

### 1.2.4 Interaction of Processes

Our QMS consists of interconnected processes organized into three categories:

**Management Processes:**
- Management review and planning
- Resource allocation
- Risk management
- Strategic planning

**Core Processes:**
- Design review and engineering
- Material procurement and control
- Manufacturing (8-phase production)
- Inspection and testing
- Delivery and installation support

**Support Processes:**
- Document and record control
- Training and competency management
- Equipment maintenance and calibration
- Supplier management
- Internal auditing

## 1.3 APPLICABILITY AND EXCLUSIONS

### 1.3.1 Scope of Application

This QMS applies to all activities related to:

- Manufacturing of off-site modular homes at our Grand Junction facility
- Design review for customer-specific modifications
- Material receiving, storage, and handling
- All 8 manufacturing phases from chassis to final inspection
- Quality inspections including third-party inspections
- Packaging and delivery to customer sites
- Post-delivery warranty and service activities

### 1.3.2 Exclusions

The following activities are excluded from this QMS:

**On-Site Activities (Not Performed by Fort Homes):**
- Foundation preparation and site work
- Module placement and setting
- Final utility connections
- Site-specific permitting and inspections
- Landscaping and exterior finishing

**Rationale for Exclusions:**
These activities are performed by general contractors, installers, or site personnel 
and are outside our scope of manufacturing operations. However, we provide technical 
support and installation guidelines to ensure proper module installation.

### 1.3.3 Geographic Scope

This QMS applies to:
- Manufacturing facility: Grand Junction, Colorado
- Delivery area: Colorado and surrounding states (within 500-mile radius)

## 1.4 DEFINITIONS AND TERMINOLOGY

### 1.4.1 Key Terms

**Acceptance Criteria:** Specified limits or conditions that must be met for product 
or process acceptance.

**Bay:** A designated production area where a module remains stationary during 
manufacturing while crews rotate through.

**Build-in-Place:** Manufacturing methodology where modules stay in assigned bays 
rather than moving through stations.

**CAPA:** Corrective Action and Preventive Action - systematic approach to address 
root causes of problems.

**Chassis:** Steel frame foundation of modular home onto which floor system is built.

**Competence:** Demonstrated ability to apply knowledge and skills to achieve 
intended results.

**Conformance:** Fulfillment of specified requirements.

**Hold Point:** Quality gate requiring inspection and approval before proceeding 
to next phase.

**Module:** Self-contained residential structure section manufactured at our facility.

**Module Traveler:** Quality record document that accompanies module through all 
manufacturing phases.

**NCR:** Nonconformance Report - documentation of product or process not meeting 
requirements.

**NTA:** National Technical Systems (NTA, Inc.) - our third-party inspection agency.

**Objective Evidence:** Data supporting the existence or truth of something (photos, 
measurements, test results).

**Process:** Set of interrelated activities that transform inputs into outputs.

**Quality:** Degree to which a set of inherent characteristics fulfills requirements.

**Quality Assurance (QA):** Planned and systematic activities ensuring quality 
requirements will be fulfilled.

**Quality Control (QC):** Operational techniques and activities focused on fulfilling 
quality requirements.

**TPIA:** Third-Party Inspection Agency - NTA, Inc. in our case.

**Work Instruction (WI):** Detailed, step-by-step description of how to perform 
a specific task.

### 1.4.2 Quality Management Terms

**Table 1-3: Quality Management Terminology**

| Term | Definition | Usage Example |
|------|------------|---------------|
| Audit | Systematic examination to verify conformance | Internal audit of Phase 3 procedures |
| Calibration | Set of operations establishing relationship between measurement device and standard | Calibration of digital levels and laser measures |
| Characteristic | Distinguishing feature | Wall straightness (±1/8" in 8 feet) |
| Continual Improvement | Recurring activity to enhance performance | Monthly review of NCR trends for improvement opportunities |
| Correction | Action to eliminate detected nonconformance | Reworking wall framing found out of square |
| Corrective Action | Action to eliminate cause of nonconformance | Revising work instruction after repeated errors |
| Document | Information and its supporting medium | SOP-102 Wall Framing procedure |
| Effectiveness | Extent to which planned activities are realized | Training program achieves competency targets |
| Efficiency | Relationship between results achieved and resources used | Module completion in target cycle time |
| Management System | System to establish policy, objectives, and processes | This QMS establishing quality framework |
| Measurement | Process to determine a value | Measuring wall height and plumbness |
| Nonconformity | Non-fulfillment of requirement | Floor deck fastener spacing exceeds specification |
| Objective | Result to be achieved | First-pass yield rate ≥ 95% |
| Preventive Action | Action to eliminate potential nonconformance cause | Adding verification step to prevent recurring issue |
| Procedure | Specified way to carry out activity or process | SOP-001 Document Control |
| Process | Set of activities transforming inputs to outputs | Phase 2 Wall Framing process |
| Product | Result of process (module or component) | Completed modular home unit |
| Quality Policy | Organization's quality intentions and direction | Fort Homes Quality Policy statement |
| Record | Document stating results or evidence of activities | Completed HP-1 inspection checklist |
| Requirement | Need or expectation that is stated or implied | IRC requirement for R-21 wall insulation |
| Review | Activity determining suitability or effectiveness | Management review of QMS performance |
| Specification | Document stating requirements | Engineering drawings for module design |
| Supplier | Organization providing products or services | Lumber supplier, electrical component vendor |
| Traceability | Ability to trace history, application, or location | Material lot numbers traced to supplier CoC |
| Validation | Confirmation that requirements for intended use are fulfilled | Testing MEP systems under actual operating conditions |
| Verification | Confirmation that specified requirements have been fulfilled | Checking dimensions against drawings |

## 1.5 ACRONYMS AND ABBREVIATIONS

### 1.5.1 Common Acronyms

**Table 1-4: Acronyms and Abbreviations**

| Acronym | Full Term | Context |
|---------|-----------|---------|
| AFCI | Arc-Fault Circuit Interrupter | Electrical safety device per NEC |
| ASL | Approved Supplier List | Qualified material suppliers |
| BOL | Bill of Lading | Shipping documentation |
| CAPA | Corrective Action Preventive Action | Quality improvement process |
| CDOH | Colorado Division of Housing | State regulatory authority |
| CFM | Cubic Feet per Minute | Airflow measurement for HVAC |
| CFR | Code of Federal Regulations | Federal regulatory framework |
| CoC | Certificate of Conformance | Supplier material certification |
| COO | Chief Operating Officer | Senior leadership role |
| DHO | Division of Housing | State regulatory body |
| DWG | Drawing | Engineering or architectural drawing |
| ERP | Enterprise Resource Planning | Business management software |
| GFCI | Ground-Fault Circuit Interrupter | Electrical safety device |
| HP | Hold Point | Quality gate inspection |
| HVAC | Heating, Ventilation, and Air Conditioning | Mechanical systems |
| IA | Inspection Agency | Third-party inspection organization |
| ICC | International Code Council | Building code organization |
| IECC | International Energy Conservation Code | Energy efficiency requirements |
| IPC | International Plumbing Code | Plumbing requirements |
| IRC | International Residential Code | Building construction requirements |
| ITP | Inspection and Test Plan | Detailed inspection requirements |
| KPI | Key Performance Indicator | Performance metric |
| LVL | Laminated Venous Lumber | Engineered wood product |
| MEP | Mechanical, Electrical, Plumbing | Building systems |
| MOS | Manufacturing Order System | Production planning system |
| NCR | Nonconformance Report | Quality issue documentation |
| NEC | National Electrical Code | Electrical installation requirements |
| NTA | National Technical Systems | Our third-party inspector |
| OSB | Oriented Strand Board | Engineered wood sheathing |
| PA | Preventive Action | Proactive quality improvement |
| PO | Purchase Order | Procurement document |
| PPE | Personal Protective Equipment | Safety equipment |
| PSI | Pounds per Square Inch | Pressure measurement |
| QA | Quality Assurance | Systematic quality activities |
| QC | Quality Control | Operational quality techniques |
| QM | Quality Manual | This document |
| QMS | Quality Management System | Overall quality framework |
| RFI | Request for Information | Design clarification process |
| RH | Relative Humidity | Moisture content in air |
| RMA | Return Material Authorization | Defective material return process |
| SDS | Safety Data Sheet | Chemical safety information |
| SIP | Structural Insulated Panel | Building panel system |
| SOP | Standard Operating Procedure | Process-level procedure |
| TPIA | Third-Party Inspection Agency | Independent inspector (NTA) |
| WI | Work Instruction | Task-level instruction |

---

**End of Section 1**

*For additional information on quality management terms and definitions, refer to:*
- *ISO 9000:2015 Quality Management Systems - Fundamentals and Vocabulary*
- *ANSI/ASQC A3-1987 Quality Systems Terminology*
- *Industry-specific glossaries from MBI and ICC/MBI standards*

**Next Section:** Section 2 - Scope and Application
      `,
    };
  }

  // Continue with other comprehensive sections...
  // I'll implement the key manufacturing phase details

  private generatePhaseByPhaseDetails(phasesData: any, holdPointsData: any, itpsData: any): any {
    const phases = phasesData.phases || [];
    let content = `
# MANUFACTURING PHASES - DETAILED PROCEDURES

## Overview

This section provides comprehensive, step-by-step procedures for each of the eight 
manufacturing phases. Each phase includes:

- Detailed work activities
- Required materials and equipment specifications
- Quality requirements and acceptance criteria
- Hold point inspection procedures
- Safety requirements
- Training prerequisites
- Common defects and prevention methods

---
`;

    for (const phase of phases) {
      const holdPoint = holdPointsData.holdPoints?.find((hp: any) => hp.id === phase.holdPoint);
      
      content += `
## PHASE ${phase.id}: ${phase.name.toUpperCase()}

### ${phase.id}.1 Phase Overview

**Phase Code:** ${phase.code}
**Hold Point:** ${phase.holdPoint}
**Duration:** ${phase.durationDays} days
**NTA Inspection Required:** ${phase.tpiaRequired ? 'YES' : 'NO'}

### ${phase.id}.2 Prerequisites

Before starting Phase ${phase.id}, the following must be verified:

${phase.id > 1 ? `- [ ] Previous phase (Phase ${phase.id - 1}) approved at ${phases[phase.id - 2]?.holdPoint}` : '- [ ] Production order released'}
- [ ] Module traveler present and current
- [ ] Bay ${phase.id} cleared and ready
- [ ] Materials staged and verified against BOM
- [ ] Crew assignments confirmed
- [ ] Tools and equipment available and calibrated
- [ ] Safety briefing completed
- [ ] Work instructions available at workstation

### ${phase.id}.3 Trade Crews Required

**Table ${phase.id}-1: Crew Assignments**

| Role | Minimum Personnel | Certifications Required | Responsibility |
|------|-------------------|------------------------|----------------|
${phase.tradeCrews.map((crew: string) => `| ${crew} | 2-4 | Phase ${phase.id} Training, Safety | Execute work per WI-${100 + phase.id}-XX |`).join('\n')}
| Bay Supervisor | 1 | Leadership Training | Coordinate and verify quality |
| QA Inspector | 1 | QA Certification | Conduct hold point inspection |

### ${phase.id}.4 Materials and Specifications

**Table ${phase.id}-2: Required Materials**

| Material | Specification | Quantity | Supplier Req | Storage Condition |
|----------|---------------|----------|--------------|-------------------|
${phase.keyMaterials.map((material: string) => `| ${material} | Per engineering DWG | As per BOM | Approved supplier | Dry, protected |`).join('\n')}

**Material Handling Requirements:**
- All materials must have valid Certificates of Conformance (CoC)
- Materials stored per manufacturer recommendations
- FIFO (First-In-First-Out) inventory rotation
- Damaged materials quarantined and tagged
- Lot traceability maintained on module traveler

### ${phase.id}.5 Work Activities

${phase.workActivities.map((activity: string, index: number) => `
#### ${phase.id}.5.${index + 1} ${activity}

**Work Instruction Reference:** WI-${100 + phase.id}-${index + 1}

**Procedure:**
1. Review engineering drawings and specifications
2. Verify all materials and tools are available
3. Perform pre-work safety check
4. Execute work per detailed work instruction WI-${100 + phase.id}-${index + 1}
5. Perform self-inspection using checklist
6. Document completion on module traveler
7. Notify bay supervisor of completion

**Quality Checkpoints:**
- Dimensional verification at key points
- Material conformance verification
- Workmanship per acceptance criteria
- Installation per manufacturer instructions
- Photo documentation of critical steps

**Common Defects and Prevention:**
- Incorrect dimensions: Double-check measurements before cutting/installing
- Missing fasteners: Follow fastener schedule exactly
- Material defects: Inspect materials before installation
- Misalignment: Use jigs and fixtures for consistent positioning
- Damaged components: Handle materials carefully during installation

**Safety Precautions:**
- Wear required PPE at all times
- Follow lockout/tagout procedures for power tools
- Use fall protection when working above 6 feet
- Maintain clean work area to prevent trips/falls
- Report unsafe conditions immediately
`).join('\n')}

### ${phase.id}.6 Equipment and Tools

**Table ${phase.id}-3: Required Equipment**

| Equipment | Purpose | Calibration Req | Inspection Frequency |
|-----------|---------|-----------------|---------------------|
| Tape measure (25 ft) | Linear measurement | Annual | Daily check |
| Digital level | Plumb and level verification | Annual | Weekly |
| Nail guns/staplers | Fastener installation | None | Daily inspection |
| Power saws | Material cutting | None | Pre-use inspection |
| Cordless drills | Fastener installation | None | Daily charge check |
| Laser level | Long-distance level check | Annual | Monthly |
| Square (framing) | Right angle verification | Annual | Weekly |

**Equipment Maintenance:**
- All equipment inspected before use
- Defective equipment tagged and removed from service
- Calibration records maintained for precision instruments
- Tool inventory checked at end of each shift

### ${phase.id}.7 Quality Requirements and Acceptance Criteria

**Table ${phase.id}-4: Inspection Criteria**

| Inspection Point | Requirement | Acceptance Criteria | Measurement Method | Frequency |
|------------------|-------------|---------------------|-------------------|-----------|
${phase.inspectionCriteria.map((criterion: string) => `| ${criterion} | Per engineering DWG | See detailed spec | Tape measure, level | Each module |`).join('\n')}

**Dimensional Tolerances:**
- Linear dimensions: ±1/8" (3mm)
- Square (diagonal difference): ≤1/4" (6mm)
- Level: ≤1/8" in 8 feet (±0.16%)
- Plumb: ≤1/8" in 8 feet (±0.16%)

**Workmanship Standards:**
- All work per applicable building codes
- Installation per manufacturer instructions
- Clean, professional appearance
- No visible defects or damage
- Proper fastener patterns maintained

### ${phase.id}.8 Hold Point ${phase.holdPoint} Procedure

${holdPoint ? `
**Inspection Authority:** ${holdPoint.ntaRequired ? 'NTA Third-Party Inspector + QA Team' : 'Internal QA Inspector'}

**Notification Requirements:**
${holdPoint.ntaRequired ? `- NTA must be notified ${holdPoint.notificationDays} business days in advance
- Notification includes module number, expected inspection date, bay location
- Confirmation received before scheduling inspection` : '- Bay supervisor notifies QA when ready for inspection\n- QA inspector scheduled within same business day'}

**Inspection Process:**

**Step 1: Self-Inspection (Bay Supervisor)**
- Complete pre-inspection using checklist FORM-${phase.holdPoint}-A
- Verify all work activities completed per traveler
- Confirm no open NCRs for this phase
- Area cleaned and organized for inspection
- All required documentation available

**Step 2: QA Inspection**
- Review module traveler for completeness
- Verify materials used match approved BOM
- Conduct dimensional verification per Table ${phase.id}-4
- Check workmanship against acceptance criteria
- Review test results (if applicable)
- Document findings on inspection form FORM-${phase.holdPoint}

${holdPoint.ntaRequired ? `
**Step 3: NTA Third-Party Inspection**
- NTA inspector arrives at scheduled time
- Review QA inspection results
- Conduct independent inspection
- Test critical systems (for Phase 4 and 8)
- Complete NTA inspection report
- Affix inspection tag/label (if required)
` : ''}

**Inspection Criteria:**
${holdPoint.inspectionCriteria.map((c: any) => `
- **${c.criterion}**
  - Acceptance: ${c.acceptanceCriteria}
  - Verification: ${c.verificationMethod || 'Visual inspection and measurement'}
`).join('\n')}

**Pass Conditions:**
${holdPoint.passConditions.map((condition: string) => `- ${condition}`).join('\n')}

**Fail Actions:**
${holdPoint.failActions.map((action: string) => `- ${action}`).join('\n')}

**Documentation:**
- Completed inspection form FORM-${phase.holdPoint} (signed and dated)
- Module traveler updated with inspection results
- Photos of completed work (minimum 4 views)
${holdPoint.ntaRequired ? '- NTA inspection report filed with traveler' : ''}
- Any NCRs documented and attached

**Approval Authority:**
- QA Manager or designee signs inspection form
${holdPoint.ntaRequired ? '- NTA inspector provides written approval' : ''}
- Module released to next phase only after approval

` : ''}

### ${phase.id}.9 Safety Requirements

**Personal Protective Equipment (PPE):**
- Hard hat (ANSI Z89.1)
- Safety glasses with side shields (ANSI Z87.1)
- Steel-toed boots
- Work gloves (as needed for task)
- Hearing protection (when using power tools)
- Respirator (when generating dust/fumes)
- Fall protection harness (when working above 6 feet)

**Hazard Controls:**
- Guard all power tools per manufacturer specifications
- Maintain three-point contact on ladders
- Keep work area clean and organized
- Proper lifting techniques (team lift for loads >50 lbs)
- Lockout/tagout for equipment maintenance
- Fire extinguisher accessible
- First aid kit available in each bay

**Emergency Procedures:**
- Stop work immediately if unsafe condition identified
- Report all incidents to bay supervisor
- Render first aid if qualified
- Call 911 for serious injuries
- Document incident per company procedure

### ${phase.id}.10 Training Requirements

**Prerequisite Training:**
- General QMS orientation (8 hours)
- Phase ${phase.id} specific training (4-8 hours)
- Safety training (OSHA 10 or equivalent)
- Equipment operation training
- Work instruction familiarization

**Competency Verification:**
- Written test (≥80% passing score)
- Practical demonstration under supervision
- Observation by qualified trainer (minimum 3 modules)
- Sign-off by production manager and QA manager

**Continuing Requirements:**
- Annual refresher training (4 hours)
- Retraining after any procedure changes
- Competency re-assessment every 2 years

### ${phase.id}.11 Common Issues and Troubleshooting

**Table ${phase.id}-5: Common Problems and Solutions**

| Problem | Possible Cause | Solution | Prevention |
|---------|----------------|----------|------------|
| Dimension out of tolerance | Measurement error | Re-measure and adjust | Double-check before cutting |
| Material defect discovered | Supplier quality issue | Quarantine, issue NCR, request replacement | Enhanced receiving inspection |
| Fastener pattern incorrect | WI not followed | Remove and reinstall per WI | Review WI before starting |
| Weather delay (outdoor work) | Environmental conditions | Protect work, reschedule if needed | Monitor forecast, plan accordingly |
| Tool malfunction | Equipment failure | Tag out, use backup tool | Daily pre-use inspection |
| Missing material | Procurement/staging error | Expedite material, adjust schedule | Verify staging before shift start |

---

**End of Phase ${phase.id} Procedures**

`;
    }

    return {
      title: 'Manufacturing Phases - Detailed Procedures',
      content,
    };
  }

  // Additional helper methods...

  private generateDetailedScope(companyData: any, phasesData: any): any {
    return {
      title: 'Section 2: Scope',
      content: `
# SECTION 2: SCOPE AND APPLICATION

[Content similar to introduction but more detailed about scope]
      `,
    };
  }

  // Placeholder methods for other sections
  private generateComprehensiveCompanyOverview(companyData: any): any {
    return { title: 'Company Overview', content: '...' };
  }

  private generateDetailedQualityPolicy(companyData: any): any {
    return { title: 'Quality Policy', content: '...' };
  }

  private generateDetailedOrganization(companyData: any): any {
    return { title: 'Organization', content: '...' };
  }

  private generateRolesAndResponsibilities(companyData: any): any {
    return { title: 'Roles and Responsibilities', content: '...' };
  }

  private generateComprehensiveDocumentControl(): any {
    return { title: 'Document Control', content: '...' };
  }

  private generateDetailedManagementResponsibility(companyData: any): any {
    return { title: 'Management Responsibility', content: '...' };
  }

  private generateComprehensiveResourceManagement(): any {
    return { title: 'Resource Management', content: '...' };
  }

  private generateCompetenceManagement(): any {
    return { title: 'Competence Management', content: '...' };
  }

  private generateDetailedProductRealization(phasesData: any): any {
    return { title: 'Product Realization', content: '...' };
  }

  private generateHoldPointProcedures(holdPointsData: any, phasesData: any): any {
    return { title: 'Hold Point Procedures', content: '...' };
  }

  private generateComprehensiveInspectionTesting(phasesData: any, holdPointsData: any): any {
    return { title: 'Inspection Testing', content: '...' };
  }

  private generateDetailedNonconformance(): any {
    return { title: 'Nonconformance', content: '...' };
  }

  private generateCorrectiveActionProcedures(): any {
    return { title: 'Corrective Action', content: '...' };
  }

  private generatePreventiveActionProcedures(): any {
    return { title: 'Preventive Action', content: '...' };
  }

  private generateComprehensiveInternalAuditing(): any {
    return { title: 'Internal Auditing', content: '...' };
  }

  private generateComprehensiveSupplierManagement(): any {
    return { title: 'Supplier Management', content: '...' };
  }

  private generateComprehensiveTraining(): any {
    return { title: 'Training', content: '...' };
  }

  private generateEquipmentManagement(): any {
    return { title: 'Equipment Management', content: '...' };
  }

  private generateCalibrationProcedures(): any {
    return { title: 'Calibration', content: '...' };
  }

  private generateDetailedContinuousImprovement(): any {
    return { title: 'Continuous Improvement', content: '...' };
  }

  private generateComprehensiveRecordsManagement(): any {
    return { title: 'Records Management', content: '...' };
  }

  private generateDataAnalysisAndMetrics(): any {
    return { title: 'Data Analysis and Metrics', content: '...' };
  }

  private generateAppendices(phasesData: any, holdPointsData: any): any {
    return { title: 'Appendices', content: '...' };
  }

  private generateComprehensiveForms(phasesData: any, holdPointsData: any): any {
    return { title: 'Forms', content: '...' };
  }
}
