# SOP-016: Quality Metrics & Performance Reporting

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
      <td style="padding:10px;border:1px solid #ddd;">SOP-016</td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Revision</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">1.0</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Effective Date</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">January 14, 2026</td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Process Owner</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">Quality Manager</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Classification</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">
        <span style="background:#4CAF50;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:12px;">✅ ACTIVE</span>
      </td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Last Reviewed</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">January 14, 2026</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Next Review</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">July 14, 2026</td>
    </tr>
  </tbody>
</table>

---

## 1. Purpose

To establish procedures for tracking quality metrics, performance indicators, defect analysis, and yield tracking. This SOP ensures visibility into production quality trends, identifies improvement opportunities, and provides management with data-driven performance reports for decision-making and strategic planning.

---

## 2. Scope

This procedure applies to:
- Key performance indicator (KPI) definition and tracking
- Quality defect data collection and categorization
- Yield rate calculations and trend analysis
- Weekly and monthly performance reporting
- Management review data and presentation

**Applies to:** Quality Manager, Production Supervisor, Quality Inspectors, Plant Management

---

## 3. References & Standards

- Hold Point Inspection Records (SOP-013)
- Nonconformance Reports (SOP-004)
- Module Traveler Documentation (SOP-014)

---

## 4. Roles & Responsibilities

| Role | Responsibility |
| :--- | :--- |
| **Quality Manager** | KPI definition; report generation; trend analysis; improvement actions |
| **Quality Inspector** | Accurate defect documentation; timely data entry; SPC participation |
| **Production Supervisor** | Provide production data; investigate root causes; implement corrections |
| **Plant Manager** | Review performance reports; approve improvement initiatives |

---

## 5. Key Performance Indicators (KPIs)

### 5.1 Production Quality Metrics

<table style="width:100%;border-collapse:collapse;margin:20px 0;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
  <thead style="background:linear-gradient(135deg,#2D5016 0%,#1a2f0d 100%);color:white;">
    <tr>
      <th style="padding:12px;text-align:left;border:1px solid #ddd;width:25%;">KPI</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;width:15%;">Target</th>
      <th style="padding:12px;text-align:left;border:1px solid #ddd;width:45%;">Calculation</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;width:15%;">Review</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>First Pass Yield</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">90%</td>
      <td style="padding:10px;border:1px solid #ddd;">(Modules passing HP-8 / Total modules started) × 100</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">Weekly</td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Defect Rate</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;"><2%</td>
      <td style="padding:10px;border:1px solid #ddd;">(Total defects / Total modules) × 100</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">Weekly</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Inspection Pass Rate</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">95%</td>
      <td style="padding:10px;border:1px solid #ddd;">(Hold points passed first attempt / Total hold points) × 100</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">Weekly</td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Schedule Adherence</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">95%</td>
      <td style="padding:10px;border:1px solid #ddd;">(On-time completions / Total completions) × 100</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">Weekly</td>
    </tr>
  </tbody>
</table>

### 5.2 Customer Quality Metrics

| KPI | Target | Calculation | Review |
| :--- | :--- | :--- | :--- |
| Field Failure Rate | <1% | (Warranty claims / Modules delivered) × 100 | Monthly |
| Customer Returns | <5 modules | Modules returned for defects | Monthly |
| Warranty Cost | <$5K/month | Total warranty rework costs | Monthly |

---

## 6. Defect Tracking & Analysis

### 6.1 Defect Categorization
- Structural defects (framing, fastening, alignment)
- System defects (electrical, plumbing, HVAC)
- Cosmetic defects (finishing, paint, trim)
- Documentation defects (traveler, inspection records)

### 6.2 Root Cause Analysis
Defects trending above target trigger SPC (Statistical Process Control) investigation. Quality Manager analyzes by phase, work center, and time period. Root causes identified and corrective actions assigned per SOP-004.

---

## 7. Performance Reporting

Weekly metrics email to supervisors and plant manager. Monthly performance report includes KPI trends, defect Pareto analysis, and improvement recommendations. Quarterly management review presents data for strategic decisions.

---

## Metrics & Performance Indicators

| Metric | Target | Frequency |
| :--- | :--- | :--- |
| KPI Data Accuracy | 100% | Weekly |
| Report Timeliness | On schedule | Weekly |
| Trend Analysis Completion | 100% | Monthly |
| Improvement Action Closure | 90% | Monthly |

---

## Approval & Authority

| Signature | Title | Date |
| :--- | :--- | :--- |
| _____________________ | Quality Manager | _________ |
| _____________________ | Production Manager | _________ |
| _____________________ | Plant Manager | _________ |

---

## Revision History

| Revision | Date | Author | Changes |
| :--- | :--- | :--- | :--- |
| 1.0 | January 14, 2026 | Quality Manager | Initial creation |

