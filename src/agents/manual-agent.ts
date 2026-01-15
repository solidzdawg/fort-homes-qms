/**
 * QMS Manual Agent
 * Generates complete quality manual sections for Fort Homes QMS
 */

import { BaseAgent, AgentConfig, AgentResult } from './types';
import * as fs from 'fs/promises';
import * as path from 'path';

export class QMSManualAgent extends BaseAgent {
  constructor() {
    super({
      name: 'QMSManualAgent',
      description: 'Generates quality manual sections for modular home manufacturing',
      temperature: 0.7,
      maxTokens: 2000,
    });
  }

  async execute(input: any): Promise<AgentResult> {
    try {
      this.log(`Generating quality manual section: ${input.section || 'complete manual'}`);

      // Load company data
      const companyData = await this.loadCompanyData();
      const phasesData = await this.loadPhasesData();

      // Generate manual content based on request
      const content = await this.generateManualContent(input, companyData, phasesData);

      return {
        success: true,
        content,
        metadata: {
          generatedAt: new Date().toISOString(),
          agent: this.config.name,
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
    const dataPath = path.join(process.cwd(), 'data', 'company-info.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  }

  private async loadPhasesData(): Promise<any> {
    const dataPath = path.join(process.cwd(), 'data', 'phases.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  }

  private async generateManualContent(
    input: any,
    companyData: any,
    phasesData: any
  ): Promise<any> {
    const sections = {
      introduction: this.generateIntroduction(companyData),
      scope: this.generateScope(companyData),
      companyOverview: this.generateCompanyOverview(companyData),
      qualityPolicy: this.generateQualityPolicy(companyData),
      organization: this.generateOrganization(companyData),
      documentControl: this.generateDocumentControl(),
      managementResponsibility: this.generateManagementResponsibility(companyData),
      resourceManagement: this.generateResourceManagement(),
      productRealization: this.generateProductRealization(phasesData),
      manufacturingOperations: this.generateManufacturingOperations(phasesData),
      inspectionTesting: this.generateInspectionTesting(phasesData),
      nonconformance: this.generateNonconformance(),
      supplierManagement: this.generateSupplierManagement(),
      training: this.generateTraining(),
      internalAuditing: this.generateInternalAuditing(),
      continuousImprovement: this.generateContinuousImprovement(),
      recordsManagement: this.generateRecordsManagement(),
    };

    if (input.section) {
      return sections[input.section as keyof typeof sections] || sections;
    }

    return sections;
  }

  private generateIntroduction(companyData: any): any {
    return {
      title: '1. Introduction & Scope',
      content: `
# 1. INTRODUCTION & SCOPE

## 1.1 Purpose

This Quality Management System (QMS) Manual establishes the framework for quality assurance and control at ${companyData.company.legalName}. It defines our approach to manufacturing high-quality modular homes in compliance with Colorado Division of Housing (CDOH) regulations and HUD Code standards.

## 1.2 Scope

This QMS applies to:
- Off-site modular home manufacturing
- All production phases from chassis to final inspection
- Third-party inspection coordination with NTA, Inc.
- Quality control and assurance activities
- Supplier management and material control
- Training and competency verification

## 1.3 Regulatory Framework

Our QMS is designed to meet requirements of:
- Colorado Division of Housing (8 CCR 1302-14)
- HUD Manufactured Housing Construction and Safety Standards (24 CFR Part 3280)
- International Residential Code (IRC 2021)
- National Electrical Code (NEC 2023)
- International Plumbing Code (IPC 2021)
- International Energy Conservation Code (IECC 2021)

## 1.4 Third-Party Inspection

${companyData.company.legalName} operates under third-party inspection by NTA, Inc., an approved Inspection Agency (IA) for manufactured and modular housing construction.
      `,
    };
  }

  private generateScope(companyData: any): any {
    return {
      title: '2. Scope',
      content: `
# 2. SCOPE OF QUALITY MANAGEMENT SYSTEM

## 2.1 Manufacturing Facility

**Location:** ${companyData.company.address.street}, ${companyData.company.address.city}, ${companyData.company.address.state} ${companyData.company.address.zip}

**Facility Type:** Static bay modular home manufacturing

## 2.2 Product Scope

- Single-module residential structures
- Multi-module residential structures
- Accessory dwelling units (ADUs)
- Custom modular home designs

## 2.3 Production Methodology

Build-in-Place (Static Bay) approach:
- Modules remain in assigned production bays
- Trade crews rotate through phases
- Phase-based quality gates and hold points
- Clear bay accountability and supervision

## 2.4 Exclusions

This QMS does not cover:
- On-site installation and setup (contractor responsibility)
- Foundation preparation (contractor responsibility)
- Utility connections (contractor responsibility)
- Site-specific permitting (customer/contractor responsibility)
      `,
    };
  }

  private generateCompanyOverview(companyData: any): any {
    return {
      title: '3. Company Overview & Quality Policy',
      content: `
# 3. COMPANY OVERVIEW & QUALITY POLICY

## 3.1 Company Information

**Legal Name:** ${companyData.company.legalName}
**DBA:** ${companyData.company.dba}
**Parent Company:** ${companyData.company.parentCompany}

**Address:**
${companyData.company.address.street}
${companyData.company.address.city}, ${companyData.company.address.state} ${companyData.company.address.zip}

**Contact:**
Phone: ${companyData.company.contact.phone}
Email: ${companyData.company.contact.email}

## 3.2 Quality Policy

${companyData.company.legalName} is committed to:

1. **Excellence in Manufacturing** - Delivering high-quality modular homes that meet or exceed customer expectations and regulatory requirements.

2. **Regulatory Compliance** - Maintaining full compliance with Colorado Division of Housing, HUD Code, and all applicable building codes.

3. **Continuous Improvement** - Systematically improving our processes, reducing defects, and enhancing efficiency.

4. **Customer Focus** - Understanding and meeting customer needs while ensuring product safety and durability.

5. **Employee Development** - Providing comprehensive training and fostering a culture of quality awareness.

6. **Supplier Partnerships** - Working with approved suppliers who share our commitment to quality.

## 3.3 Quality Objectives

- First-pass yield rate: ≥ 95%
- Customer satisfaction: ≥ 4.5/5.0
- NCR rate: ≤ 2 per module
- On-time delivery: ≥ 90%
- Training compliance: 100%
      `,
    };
  }

  private generateQualityPolicy(companyData: any): any {
    return this.generateCompanyOverview(companyData);
  }

  private generateOrganization(companyData: any): any {
    const leadership = companyData.leadership;
    return {
      title: '4. Organizational Structure',
      content: `
# 4. ORGANIZATIONAL STRUCTURE

## 4.1 Leadership Team

**President:** ${leadership.president.name}
${leadership.president.responsibilities.map((r: string) => `- ${r}`).join('\n')}

**Chief Operating Officer:** ${leadership.coo.name}
${leadership.coo.responsibilities.map((r: string) => `- ${r}`).join('\n')}

**Quality Assurance Manager:** ${leadership.qaManager.name}
${leadership.qaManager.responsibilities.map((r: string) => `- ${r}`).join('\n')}

## 4.2 Quality Department

The Quality Assurance Manager reports directly to the COO and has authority to:
- Stop production when quality issues arise
- Reject nonconforming materials or workmanship
- Approve or reject supplier qualifications
- Initiate corrective actions
- Release modules for delivery

## 4.3 Bay Supervisors

Each production bay has a designated supervisor responsible for:
- Crew coordination and scheduling
- Work quality verification
- Hold point preparation
- NCR documentation
- Daily production reporting

## 4.4 Trade Crews

Specialized crews for each production phase:
- Chassis/Floor crew
- Framing crew
- Electrical crew
- Plumbing crew
- HVAC crew
- Drywall crew
- Finish carpentry crew
- QA inspection team
      `,
    };
  }

  private generateDocumentControl(): any {
    return {
      title: '5. Document Control System',
      content: `
# 5. DOCUMENT CONTROL SYSTEM

## 5.1 Document Hierarchy

1. **Quality Manual (QM)** - This document, defining QMS framework
2. **Standard Operating Procedures (SOPs)** - Process-level procedures
3. **Work Instructions (WIs)** - Detailed task-level instructions
4. **Forms and Records** - Data collection and verification documents

## 5.2 Document Numbering

- Quality Manual: QM-001
- SOPs: SOP-001, SOP-002, etc.
- Work Instructions: WI-001, WI-002, etc.
- Forms: FORM-001, FORM-002, etc.

## 5.3 Document Control Process

**Creation:**
- Documents created using approved templates
- Technical review by relevant department
- Quality review by QA Manager
- Approval by COO or President

**Distribution:**
- Controlled copies maintained in digital repository
- Access controls ensure current versions only
- Obsolete documents removed from work areas

**Revision:**
- Change requests documented and reviewed
- Version control maintained (1.0, 1.1, 2.0, etc.)
- Revision history tracked in document footer
- Training conducted for significant changes

## 5.4 Records Management

Quality records retained per regulatory requirements:
- Training records: 7 years
- Inspection records: 20 years (per HUD)
- NCR/CAPA records: 10 years
- Audit records: 5 years
      `,
    };
  }

  private generateManagementResponsibility(companyData: any): any {
    return {
      title: '6. Management Responsibility',
      content: `
# 6. MANAGEMENT RESPONSIBILITY

## 6.1 Management Commitment

Leadership demonstrates commitment to quality through:
- Establishing and communicating quality policy
- Ensuring quality objectives are measurable
- Conducting management reviews quarterly
- Providing adequate resources for QMS
- Promoting continuous improvement culture

## 6.2 Resource Allocation

Management ensures availability of:
- Qualified personnel for all production phases
- Calibrated equipment and tools
- Adequate facility space and environmental controls
- Information systems for quality tracking
- Training programs and materials

## 6.3 Management Review

Quarterly management reviews assess:
- Customer feedback and complaints
- Quality metrics and KPI performance
- Internal audit findings
- External audit results (CDOH, NTA)
- NCR/CAPA effectiveness
- Process improvement opportunities
- Resource needs and allocation

## 6.4 Communication

Management maintains communication through:
- Daily production meetings
- Weekly quality reviews
- Monthly all-hands meetings
- Quality alerts and bulletins
- Performance dashboards
      `,
    };
  }

  private generateResourceManagement(): any {
    return {
      title: '7. Resource Management',
      content: `
# 7. RESOURCE MANAGEMENT

## 7.1 Human Resources

**Competency Requirements:**
- Trade-specific certifications where required
- Minimum 40 hours initial training
- Annual refresher training (8 hours minimum)
- Phase-specific work instruction training
- Safety training (OSHA 10/30)

**Training Program:**
- New hire orientation (QMS, safety, processes)
- On-the-job training with qualified trainers
- Competency assessment and verification
- Continuing education opportunities
- Cross-training for flexibility

## 7.2 Infrastructure

**Production Facility:**
- 5 static production bays (Bay 1-5)
- Climate-controlled environment
- Adequate lighting and ventilation
- Material staging areas
- Inspection zones
- Tool and equipment storage

**Equipment:**
- Power tools (saws, drills, nailers, etc.)
- Measurement devices (levels, squares, tape measures)
- Testing equipment (electrical testers, pressure testers)
- Material handling equipment (forklifts, cranes)
- Safety equipment (PPE, fall protection)

## 7.3 Work Environment

**Environmental Controls:**
- Temperature: 60-85°F during production
- Humidity: 30-60% RH
- Adequate ventilation for welding/painting
- Dust control measures
- Noise mitigation

**Safety:**
- OSHA compliance program
- PPE requirements enforced
- Lockout/tagout procedures
- Emergency response plans
- First aid stations
      `,
    };
  }

  private generateProductRealization(phasesData: any): any {
    return {
      title: '8. Product Realization Process',
      content: `
# 8. PRODUCT REALIZATION PROCESS

## 8.1 Design and Planning

**Customer Requirements:**
- Floor plan review and approval
- Specifications and options selection
- Building code compliance verification
- Engineering calculations and approvals
- Material selection and procurement

**Production Planning:**
- Bay assignment and scheduling
- Material staging and kitting
- Crew assignments per phase
- Hold point scheduling with NTA
- Estimated completion timeline

## 8.2 Build-in-Place Methodology

Modules remain in assigned bays while crews rotate through 8 production phases:

${phasesData.phases.map((phase: any, index: number) => `
**Phase ${index + 1}: ${phase.name}**
- Duration: ${phase.estimatedDuration}
- Hold Point: ${phase.holdPoint}
- Key Activities: ${phase.workActivities.slice(0, 3).join(', ')}
`).join('\n')}

## 8.3 Quality Gates

Each phase includes a quality gate (hold point) where:
1. Bay supervisor performs self-inspection
2. QA team conducts independent inspection
3. Discrepancies documented and resolved
4. NTA notified for TPIA hold points (HP-4, HP-8)
5. Approval granted before proceeding

## 8.4 Module Traveler

Each module has a traveler document that:
- Travels with the module through all phases
- Records inspection results at each hold point
- Documents any NCRs and their resolution
- Captures final inspection sign-offs
- Becomes permanent quality record
      `,
    };
  }

  private generateManufacturingOperations(phasesData: any): any {
    return {
      title: '9. Manufacturing Operations',
      content: `
# 9. MANUFACTURING OPERATIONS

## 9.1 Production Phases

Our 8-phase production process ensures systematic quality control:

${phasesData.phases.map((phase: any, index: number) => `
### Phase ${index + 1}: ${phase.name}

**Hold Point:** ${phase.holdPoint}
**Trades:** ${phase.tradeCrews.join(', ')}
**Duration:** ${phase.estimatedDuration}

**Key Activities:**
${phase.workActivities.map((activity: string) => `- ${activity}`).join('\n')}

**Quality Checks:**
- Dimensional verification
- Material conformance
- Workmanship inspection
- Code compliance review
`).join('\n')}

## 9.2 Work Instructions

Detailed work instructions (WIs) define:
- Step-by-step task procedures
- Required tools and materials
- Quality acceptance criteria
- Safety precautions
- Inspection checkpoints

## 9.3 In-Process Verification

**Self-Inspection:** Tradespeople verify own work
**Peer Review:** Lead tradesperson reviews crew work
**QA Inspection:** QA team conducts independent checks
**Hold Point:** Formal inspection before next phase

## 9.4 Material Control

**Receiving:**
- Incoming inspection per SOP-012
- Lot traceability established
- Material identification and labeling
- Storage in designated areas

**Usage:**
- First-in-first-out (FIFO)
- Material requisition tracking
- Scrap and waste minimization
- Inventory accuracy maintained
      `,
    };
  }

  private generateInspectionTesting(phasesData: any): any {
    return {
      title: '10. Inspection & Testing',
      content: `
# 10. INSPECTION & TESTING

## 10.1 Inspection Program

**Internal Inspections:**
- In-process checks at each phase
- Hold point inspections (HP-1 through HP-8)
- Final quality audit before delivery
- Random sampling for continuous monitoring

**Third-Party Inspections (NTA):**
- HP-4: MEP Rough-In & Testing
- HP-8: Final Inspection & Pre-Ship
- Notified minimum 48 hours in advance
- Full access to modules and records

## 10.2 Testing Requirements

**Electrical Testing:**
- Continuity and ground testing
- Breaker functionality
- GFCI/AFCI operation
- Voltage verification

**Plumbing Testing:**
- Water pressure test (minimum 50 PSI, 30 minutes)
- Drain line testing (air or water)
- Fixture operation verification
- No visible leaks

**HVAC Testing:**
- Duct leakage testing
- Airflow measurement
- Thermostat functionality
- Refrigerant charge verification (split systems)

**Structural Testing:**
- Load bearing verification
- Fastener pull tests (sampling)
- Wind load calculations
- Snow load calculations

## 10.3 Inspection Records

All inspections documented including:
- Date and time of inspection
- Inspector identification
- Inspection criteria and results
- Pass/fail determination
- NCRs generated (if applicable)
- Corrective actions taken
- Re-inspection results
      `,
    };
  }

  private generateNonconformance(): any {
    return {
      title: '11. Nonconformance & Corrective Action',
      content: `
# 11. NONCONFORMANCE & CORRECTIVE ACTION

## 11.1 Nonconformance Identification

Nonconformances may be identified through:
- In-process inspections
- Hold point inspections
- Third-party inspections (NTA)
- Customer feedback
- Internal audits
- Supplier quality issues

## 11.2 NCR Process

**Severity Classification:**
- **Critical:** Safety hazard or code violation
- **Major:** Significant defect affecting function
- **Minor:** Cosmetic or non-critical defect

**NCR Workflow:**
1. Identification and documentation
2. Module placement on hold
3. Root cause analysis
4. Disposition determination:
   - Rework to specification
   - Use as-is (with engineering approval)
   - Scrap (if irreparable)
5. Corrective action implementation
6. Verification and closure
7. Trend analysis

## 11.3 Corrective Action (CA)

Corrective actions address root causes:
- Systemic process improvements
- Training or retraining
- Work instruction updates
- Equipment repair or replacement
- Supplier corrective action requests

## 11.4 Preventive Action (PA)

Proactive measures to prevent issues:
- Trend analysis of NCRs
- Process capability studies
- Failure mode analysis
- Lessons learned reviews
- Best practice sharing

## 11.5 Metrics

**Key Indicators:**
- NCR rate per module
- NCR resolution time
- Repeat NCR rate
- Cost of quality
- First-pass yield rate
      `,
    };
  }

  private generateSupplierManagement(): any {
    return {
      title: '12. Supplier Management',
      content: `
# 12. SUPPLIER MANAGEMENT

## 12.1 Supplier Qualification

**Approval Process:**
- Initial capability assessment
- Quality system review
- Sample evaluation
- References check
- Approval by QA Manager

**Required Documentation:**
- Business license and insurance
- Material certifications
- Product data sheets
- Safety data sheets (SDS)
- Warranty information

## 12.2 Approved Supplier List (ASL)

Maintained categories:
- Lumber and engineered wood
- Electrical materials and fixtures
- Plumbing materials and fixtures
- HVAC equipment
- Windows and doors
- Insulation materials
- Drywall and finishing
- Roofing materials

## 12.3 Supplier Performance

**Evaluation Criteria:**
- Quality: Defect rate, certifications
- Delivery: On-time performance, lead time
- Service: Responsiveness, issue resolution
- Price: Competitiveness, payment terms

**Performance Rating:**
- Quarterly scorecard (0-100 points)
- Annual review and re-qualification
- Corrective action for poor performance
- Recognition for excellent performance

## 12.4 Incoming Inspection

**Material Receipt:**
- Verify quantity against purchase order
- Visual inspection for damage
- Dimensional checks (sampling)
- Certificate of compliance review
- Lot number documentation

**Acceptance Criteria:**
- Material matches specifications
- No visible defects or damage
- Complete documentation
- Proper packaging and labeling
      `,
    };
  }

  private generateTraining(): any {
    return {
      title: '13. Training & Competency',
      content: `
# 13. TRAINING & COMPETENCY

## 13.1 Training Program

**New Hire Training:**
- Company orientation (8 hours)
- QMS overview and quality policy
- Safety training (OSHA 10)
- Phase-specific work instructions
- Hands-on with qualified trainer
- Competency assessment

**Ongoing Training:**
- Annual refresher (8 hours minimum)
- New process or product training
- Regulatory update training
- Cross-training opportunities
- Leadership development

## 13.2 Competency Requirements

**Production Personnel:**
- Trade certification (where applicable)
- Phase-specific WI training
- Equipment operation training
- Quality awareness training
- Safety training current

**Inspectors:**
- QA training program completion
- Regulatory code knowledge
- Inspection technique training
- Root cause analysis training
- NCR documentation training

**Supervisors:**
- Leadership training
- Scheduling and planning
- Performance management
- Problem-solving methods
- Communication skills

## 13.3 Training Records

Documentation maintained:
- Employee training matrix
- Course attendance records
- Competency assessments
- Certifications and expiration dates
- Training effectiveness evaluation

## 13.4 Training Effectiveness

Measured through:
- Competency assessment scores
- Defect rates by operator
- NCR trends by phase
- Employee feedback
- Supervisor observation
      `,
    };
  }

  private generateInternalAuditing(): any {
    return {
      title: '14. Internal Auditing',
      content: `
# 14. INTERNAL AUDITING

## 14.1 Audit Program

**Frequency:**
- Complete QMS audit: Annually
- Process audits: Quarterly
- Product audits: Monthly
- Supplier audits: As scheduled

**Auditor Requirements:**
- Independent of area being audited
- Trained in audit techniques
- Knowledge of QMS requirements
- Objective and impartial

## 14.2 Audit Process

**Planning:**
- Annual audit schedule established
- Audit criteria and scope defined
- Checklist and plan prepared
- Auditees notified in advance

**Execution:**
- Opening meeting with management
- Document review
- Process observation
- Personnel interviews
- Record sampling
- Finding documentation

**Reporting:**
- Findings classified (Major/Minor/Observation)
- Audit report prepared
- Closing meeting conducted
- Corrective action requests issued
- Follow-up scheduled

## 14.3 Audit Findings

**Major Nonconformance:**
- Absence of required system element
- System breakdown or ineffectiveness
- Regulatory violation
- Immediate action required

**Minor Nonconformance:**
- Isolated incident
- Procedural deviation
- Documentation error
- Corrective action required

**Observation:**
- Opportunity for improvement
- Potential issue
- Best practice suggestion
- Optional action

## 14.4 Follow-Up

- Corrective actions reviewed within 30 days
- Effectiveness verified
- Closure documented
- Trends analyzed
- Management review informed
      `,
    };
  }

  private generateContinuousImprovement(): any {
    return {
      title: '15. Continuous Improvement',
      content: `
# 15. CONTINUOUS IMPROVEMENT

## 15.1 Improvement Culture

**Philosophy:**
Continuous improvement is embedded in our culture through:
- Employee suggestion program
- Kaizen events and workshops
- Lessons learned reviews
- Best practice sharing
- Innovation encouragement

**Leadership Role:**
- Champion improvement initiatives
- Allocate resources for improvement
- Recognize and reward contributions
- Remove barriers to change
- Lead by example

## 15.2 Improvement Tools

**Data Analysis:**
- Statistical process control (SPC)
- Pareto analysis
- Control charts
- Capability studies
- Trend analysis

**Problem Solving:**
- Root cause analysis (5 Whys, Fishbone)
- Failure mode and effects analysis (FMEA)
- Process mapping
- Value stream mapping
- Gemba walks

## 15.3 Performance Metrics

**Key Performance Indicators:**

**Quality:**
- First-pass yield rate
- Defect rate per module
- Customer satisfaction score
- NCR rate and trends
- Inspection pass rate

**Efficiency:**
- Cycle time per phase
- On-time completion rate
- Labor hours per module
- Material utilization rate
- Rework hours

**Compliance:**
- Training completion rate
- Audit finding closure rate
- Regulatory compliance rate
- Documentation accuracy

## 15.4 Improvement Projects

**Project Selection:**
- Based on data and metrics
- Aligned with strategic goals
- Customer-focused
- Measurable benefits
- Feasible to implement

**Project Management:**
- Clear objectives and scope
- Team assignments and roles
- Timeline and milestones
- Resource allocation
- Results tracking and reporting

## 15.5 Knowledge Management

**Information Sharing:**
- Lessons learned database
- Best practice repository
- Standard work documentation
- Team meetings and huddles
- Training materials updates
      `,
    };
  }

  private generateRecordsManagement(): any {
    return {
      title: '16. Records Management',
      content: `
# 16. RECORDS MANAGEMENT

## 16.1 Quality Records

**Essential Records:**
- Module travelers with inspection results
- Hold point inspection records
- NTA third-party inspection reports
- NCR and corrective action records
- Training records and certifications
- Calibration records
- Supplier quality records
- Audit reports
- Management review minutes
- Customer complaints and feedback

## 16.2 Retention Requirements

**Regulatory Requirements:**
- Module inspection records: 20 years (HUD)
- Training records: 7 years (CDOH)
- NCR/CAPA records: 10 years
- Audit records: 5 years
- Supplier records: 5 years

**Electronic Records:**
- Backed up daily
- Secure access controls
- Version control maintained
- Audit trail enabled
- Disaster recovery plan

## 16.3 Records Storage

**Organization:**
- Indexed by module number
- Chronological filing
- Easy retrieval system
- Protected from damage
- Access controlled

**Disposal:**
- After retention period expires
- Per approved procedure
- Destruction documented
- Compliance verified

## 16.4 Record Availability

Records accessible to:
- Internal personnel (as needed)
- Management
- Auditors (internal/external)
- Regulatory authorities (CDOH, HUD)
- Third-party inspectors (NTA)
- Customers (module-specific records)

---

## Document Approval

**Prepared by:** Quality Assurance Manager
**Reviewed by:** Chief Operating Officer
**Approved by:** President

**Effective Date:** ${new Date().toLocaleDateString()}
**Version:** 1.0
**Next Review:** ${new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString()}
      `,
    };
  }
}
