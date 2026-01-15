<div class="document-header" style="background: linear-gradient(135deg, #101810 0%, #8B1414 100%); color: white; padding: 40px; text-align: center; border-radius: 8px; margin-bottom: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <div style="font-size: 48px; font-weight: bold; letter-spacing: 2px; margin-bottom: 10px;">
    🏗️ FORT HOMES
  </div>
  <div style="font-size: 24px; font-weight: 300; letter-spacing: 1px; margin-bottom: 5px;">
    HUMAN APPROVAL WORKFLOWS
  </div>
  <div style="font-size: 20px; font-weight: bold; margin-top: 20px; padding-top: 20px; border-top: 2px solid rgba(255,255,255,0.3);">
    AI Agent Governance Framework
  </div>
  <div style="font-size: 16px; margin-top: 10px; opacity: 0.9;">
    Grand Junction, Colorado
  </div>
</div>

# HUMAN APPROVAL WORKFLOWS
## AI Agent Human-in-the-Loop Governance

---

## 📋 DOCUMENT CONTROL

| **Attribute** | **Details** |
|:---|:---|
| **Document ID** | HUMAN-APPROVAL-WORKFLOWS-2026 |
| **Version** | 1.0 |
| **Effective Date** | 2026-01-15 |
| **Process Owner** | Chief Information Officer |
| **Classification** | CONTROLLED |
| **Review Cycle** | Semi-Annual |
| **Next Review Date** | 2026-07-15 |

---

## 🎯 GOVERNANCE PHILOSOPHY

**"AI Recommends, Humans Decide"**

All AI agent recommendations require human oversight and approval for critical decisions. This ensures:
- **Safety** - Human judgment for critical situations
- **Accountability** - Clear decision ownership
- **Transparency** - Visible reasoning and audit trails
- **Control** - Humans retain ultimate authority

---

## 🔐 APPROVAL AUTHORITY MATRIX

<div style="background: white; padding: 20px; border: 2px solid #ddd; border-radius: 8px; margin: 20px 0;">

| Decision Type | Risk Level | Approval Required | Approver | SLA | Escalation |
|:---|:---:|:---:|:---|:---:|:---|
| **Safety/HUD Compliance** | 🔴 Critical | Required | Quality Manager | 4 hours | → General Manager |
| **Major NCR Disposition** | 🔴 Critical | Required | Quality Manager + NTA TPIA | 8 hours | → General Manager |
| **CAPA Plan (Critical)** | 🔴 Critical | Required | Quality Manager | 24 hours | → General Manager |
| **New Risk to Register** | 🟡 High | Required | Quality Manager | 48 hours | → Operations Mgr |
| **Document Release** | 🟡 High | Required | Process Owner + Quality | 48 hours | → Quality Manager |
| **Training Assignment (Remedial)** | 🟡 High | Required | HR Manager | 48 hours | → Operations Mgr |
| **CAPA Plan (Major)** | 🟡 High | Required | Supervisor | 48 hours | → Quality Manager |
| **Improvement Project** | 🟢 Medium | Required | Department Manager | 5 days | → General Manager |
| **Risk Score Update** | 🟢 Medium | Optional | Risk Owner | 5 days | N/A |
| **Routine Training Assignment** | 🟢 Medium | Optional | Supervisor | 7 days | N/A |
| **Trend Reports/Analytics** | ⚪ Low | Optional | N/A | None | N/A |

</div>

---

## 📋 WORKFLOW 1: NCR DISPOSITION APPROVAL

<div style="background: #F8D7DA; padding: 20px; border-left: 4px solid #8B1414; margin: 20px 0;">

### Trigger
AGENT-002 (CAPA Agent) analyzes NCR and recommends disposition

### Workflow Steps

```mermaid
graph TD
    A[NCR Created] --> B[AGENT-002 Analyzes]
    B --> C{Severity?}
    C -->|Critical| D[Quality Manager<br/>Approval Required]
    C -->|Major| E[Supervisor<br/>Approval Required]
    C -->|Minor| F[Optional Review]
    D --> G{Approved?}
    E --> G
    F --> G
    G -->|Yes| H[Implement Disposition]
    G -->|No| I[Agent Revises<br/>Recommendation]
    I --> B
    H --> J[Track Effectiveness]
    
    style A fill:#f9f9f9,stroke:#333,stroke-width:2px
    style D fill:#F8D7DA,stroke:#8B1414,stroke-width:3px
    style E fill:#FFF3CD,stroke:#8B6914,stroke-width:2px
    style H fill:#D4EDDA,stroke:#2D5016,stroke-width:2px
```

### Approval Criteria

**Critical NCR (Safety, HUD Compliance):**
- Approver: Quality Manager
- SLA: 4 hours
- Required Information:
  - NCR details and evidence
  - Root cause analysis
  - Recommended disposition
  - AI confidence score
  - Regulatory impact assessment

**Major NCR:**
- Approver: Production Supervisor
- SLA: 24 hours
- May require NTA TPIA approval if impacts inspection

**Minor NCR:**
- Approver: Optional (auto-approve with notification)
- Human can review and override

### Escalation Path

If not approved within SLA:
1. Automated reminder at 50% of SLA
2. Escalate to Quality Manager at 100% of SLA
3. Escalate to General Manager at 150% of SLA

</div>

---

## 📋 WORKFLOW 2: CAPA PLAN APPROVAL

<div style="background: #FFF3CD; padding: 20px; border-left: 4px solid #8B6914; margin: 20px 0;">

### Trigger
AGENT-002 (CAPA Agent) drafts corrective/preventive action plan

### Workflow Steps

```mermaid
graph TD
    A[Root Cause Identified] --> B[AGENT-002 Drafts CAPA]
    B --> C[Quality Manager Review]
    C --> D{Approved?}
    D -->|Yes| E[Assign Actions]
    D -->|No| F[Revise Plan]
    F --> B
    E --> G[Track Implementation]
    G --> H[AGENT-002 Monitors]
    H --> I{Effective?}
    I -->|Yes| J[Close CAPA]
    I -->|No| K[Revise Actions]
    K --> E
    
    style A fill:#f9f9f9,stroke:#333,stroke-width:2px
    style C fill:#FFF3CD,stroke:#8B6914,stroke-width:3px
    style J fill:#D4EDDA,stroke:#2D5016,stroke-width:2px
```

### Approval Requirements

**CAPA Owner Reviews:**
- Root cause analysis validity
- Action appropriateness
- Resource feasibility
- Timeline reasonableness
- Expected effectiveness

**Quality Manager Approves:**
- CAPA plan meets QMS standards
- Actions address root cause
- Effectiveness verification defined
- Resources allocated

### Override Authority

Quality Manager can:
- Modify AI-recommended actions
- Adjust priorities and timelines
- Request additional analysis
- Reject plan entirely

</div>

---

## 📋 WORKFLOW 3: RISK MITIGATION APPROVAL

<div style="background: #FFF3CD; padding: 20px; border-left: 4px solid #8B6914; margin: 20px 0;">

### Trigger
AGENT-003 (Risk Agent) identifies high-risk condition (RPN ≥ 200)

### Workflow Steps

```mermaid
graph TD
    A[Risk Identified] --> B[AGENT-003 Calculates RPN]
    B --> C{RPN Level?}
    C -->|≥200 Critical| D[Quality Manager<br/>Immediate Review]
    C -->|125-199 High| E[Risk Owner Review]
    C -->|<125 Medium/Low| F[Auto-Add to Register]
    D --> G[Mitigation Plan Required]
    E --> G
    G --> H{Plan Approved?}
    H -->|Yes| I[Implement Mitigation]
    H -->|No| J[Revise Plan]
    J --> G
    I --> K[AGENT-003 Monitors]
    K --> L{RPN Reduced?}
    L -->|Yes| M[Update Register]
    L -->|No| N[Escalate]
    
    style D fill:#F8D7DA,stroke:#8B1414,stroke-width:3px
    style E fill:#FFF3CD,stroke:#8B6914,stroke-width:2px
    style M fill:#D4EDDA,stroke:#2D5016,stroke-width:2px
```

### Critical Risk Alert

**Immediate Actions (RPN ≥ 200):**
1. Alert Quality Manager (SMS + Email)
2. Hold production if safety-related
3. Notify General Manager within 1 hour
4. Mitigation plan required within 24 hours

**High Risk (RPN 125-199):**
1. Notify Risk Owner
2. Mitigation plan required within 1 week
3. Monthly review until RPN < 125

</div>

---

## 📋 WORKFLOW 4: DOCUMENT RELEASE APPROVAL

<div style="background: #D4EDDA; padding: 20px; border-left: 4px solid #2D5016; margin: 20px 0;">

### Trigger
AGENT-004 (Document Agent) drafts new/revised document

### Workflow Steps

```mermaid
graph TD
    A[Document Need Identified] --> B[AGENT-004 Drafts]
    B --> C[Process Owner Review]
    C --> D{Technically Correct?}
    D -->|No| E[Revise Draft]
    E --> B
    D -->|Yes| F[Quality Manager Review]
    F --> G{Compliant with QMS?}
    G -->|No| E
    G -->|Yes| H[Approve for Release]
    H --> I[Publish Document]
    I --> J[Train Personnel]
    J --> K[Monitor Effectiveness]
    
    style C fill:#E7F3FF,stroke:#145B8B,stroke-width:2px
    style F fill:#FFF3CD,stroke:#8B6914,stroke-width:2px
    style H fill:#D4EDDA,stroke:#2D5016,stroke-width:3px
```

### Two-Stage Approval

**Stage 1: Process Owner**
- Technical accuracy verified
- Procedural steps correct
- Practical and implementable

**Stage 2: Quality Manager**
- QMS standards compliance
- Regulatory requirements met
- Document control requirements
- Cross-references valid

### Auto-Approval for Minor Revisions

Minor revisions (typos, formatting) may be auto-approved if:
- No content changes
- Process Owner notified
- Quality Manager has visibility

</div>

---

## 📋 WORKFLOW 5: TRAINING ASSIGNMENT APPROVAL

<div style="background: #E7F3FF; padding: 20px; border-left: 4px solid #145B8B; margin: 20px 0;">

### Trigger
AGENT-005 (Training Agent) recommends training assignment

### Workflow Types

**Type A: Routine Auto-Assignment**
- New hire onboarding
- Scheduled retraining
- Certification renewals
- NO approval required (notify supervisor)

**Type B: Incident-Based Training**
- NCR involving operator error
- Safety incident
- NTA TPIA rejection
- REQUIRES HR Manager approval

### Workflow Steps (Type B)

```mermaid
graph TD
    A[Incident Occurs] --> B[AGENT-005 Analyzes]
    B --> C[Recommends Remedial Training]
    C --> D[HR Manager Review]
    D --> E{Training Appropriate?}
    E -->|Yes| F[Assign Training]
    E -->|No| G[Investigate Further]
    F --> H[Employee Completes]
    H --> I[Competency Reassessed]
    I --> J{Competent?}
    J -->|Yes| K[Return to Work]
    J -->|No| L[Additional Training]
    L --> H
    
    style D fill:#E7F3FF,stroke:#145B8B,stroke-width:3px
    style K fill:#D4EDDA,stroke:#2D5016,stroke-width:2px
```

</div>

---

## 📋 WORKFLOW 6: IMPROVEMENT PROJECT APPROVAL

<div style="background: #E7F3FF; padding: 20px; border-left: 4px solid #145B8B; margin: 20px 0;">

### Trigger
AGENT-007 (Improvement Agent) identifies opportunity with estimated ROI

### Workflow Steps

```mermaid
graph TD
    A[Opportunity Identified] --> B[AGENT-007 Analyzes]
    B --> C[Estimates ROI]
    C --> D{ROI > Threshold?}
    D -->|Yes| E[Draft Project Proposal]
    D -->|No| F[Add to Backlog]
    E --> G[Department Manager Review]
    G --> H{Approve Resources?}
    H -->|Yes| I[General Manager Approval]
    H -->|No| F
    I --> J{Approved?}
    J -->|Yes| K[Implement Project]
    J -->|No| F
    K --> L[Track Results]
    L --> M{ROI Achieved?}
    M -->|Yes| N[Document Success]
    M -->|No| O[Lessons Learned]
    
    style G fill:#E7F3FF,stroke:#145B8B,stroke-width:2px
    style I fill:#FFF3CD,stroke:#8B6914,stroke-width:3px
    style N fill:#D4EDDA,stroke:#2D5016,stroke-width:2px
```

### Approval Thresholds

| Investment | ROI Requirement | Approver |
|---:|---:|:---|
| < $5,000 | > 100% (1 year) | Department Manager |
| $5,000 - $25,000 | > 150% (1 year) | General Manager |
| > $25,000 | > 200% (1 year) | Executive Team |

</div>

---

## 🔒 SECURITY & AUDIT CONTROLS

<div style="background: #F8D7DA; padding: 20px; border-left: 4px solid #8B1414; margin: 20px 0;">

### Audit Trail Requirements

**Every AI agent action must log:**
- Timestamp (ISO 8601)
- Agent ID and version
- Input data and sources
- Recommendation/output
- Confidence score
- Human approver (if required)
- Approval decision and timestamp
- Rationale for approval/rejection

### Override Procedures

**Humans can always:**
- Reject AI recommendations
- Modify recommendations
- Request additional analysis
- Escalate to higher authority
- Pause AI agent temporarily
- Report AI errors/issues

### Emergency Stop

Quality Manager or General Manager can:
- Immediately suspend any AI agent
- Revert to manual processes
- Investigate AI behavior
- Require review before restart

</div>

---

## 📊 APPROVAL METRICS & MONITORING

<div style="background: white; padding: 20px; border: 2px solid #ddd; border-radius: 8px; margin: 20px 0;">

### Key Metrics

| Metric | Target | Alert Threshold |
|:---|---:|---:|
| **Approval Rate** | > 70% | < 50% |
| **SLA Compliance** | > 95% | < 85% |
| **Override Rate** | < 15% | > 30% |
| **Time to Approval** | Within SLA | > 150% of SLA |
| **Escalation Rate** | < 10% | > 20% |

### Monthly Review

Management reviews:
- Approval patterns and trends
- SLA compliance by approver
- Override reasons and frequency
- AI recommendation quality
- Process improvements needed

</div>

---

## 🔄 CONTINUOUS IMPROVEMENT

### AI Learning from Approvals

- **Approved recommendations** → Reinforce AI model
- **Modified recommendations** → Learn from human judgment
- **Rejected recommendations** → Identify AI weaknesses
- **Overrides** → Understand human reasoning

### Quarterly Calibration

- Review AI performance metrics
- Adjust confidence thresholds
- Update approval workflows
- Refine SLAs based on data
- Train approvers on new patterns

---

## 🔄 REVISION HISTORY

| Version | Date | Description | Author | Approved By |
|:---|:---|:---|:---|:---|
| 1.0 | 2026-01-15 | Initial human approval workflows | CIO + Quality Manager | Executive Leadership |

---

## ✅ APPROVAL SIGNATURES

| Role | Name | Signature | Date |
|:---|:---|:---|:---|
| **Prepared By** | Chief Information Officer | _________________ | 2026-01-15 |
| **Reviewed By** | Quality Manager | _________________ | 2026-01-15 |
| **Approved By** | General Manager | _________________ | 2026-01-15 |

---

**Document Classification:** CONTROLLED  
**Distribution:** Executive Leadership, IT, Quality  
**Next Review Date:** 2026-07-15

---

*These human approval workflows ensure Fort Homes maintains control and accountability over AI agent decisions while maximizing efficiency and safety.*
