# Component Library: Enhanced Tables
## Advanced Table Designs with Trends, Heatmaps & Status

---

<div align="center">

| **Library ID** | **COMP-TABLES-005** |
|:---|:---|
| **Version** | 1.0 |
| **Created** | January 29, 2026 |
| **Purpose** | Modern table templates with visual indicators, trends, and heatmap coloring |

</div>

---

## 🎯 Purpose

Enhanced table components that go beyond basic Markdown tables. Features include status badges, trend indicators, heatmap cells, zebra striping, and responsive layouts. Perfect for KPI dashboards, audit results, and compliance tracking.

---

## 📊 Basic Enhanced Table

### Standard Table with Status Badges

```html
<table style="width:100%;border-collapse:collapse;margin:20px 0;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
  <thead style="background:linear-gradient(135deg,#2D5016 0%,#1a2f0d 100%);color:white;">
    <tr>
      <th style="padding:12px;text-align:left;border:1px solid #ddd;">Document ID</th>
      <th style="padding:12px;text-align:left;border:1px solid #ddd;">Title</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;">Status</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;">Version</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>QMS-001</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">Context & Stakeholders</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
        <span style="background:#4CAF50;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:12px;">✅ ACTIVE</span>
      </td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">2.1</td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>QMS-002</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">Leadership & Policy</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
        <span style="background:#FFC107;color:#000;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:12px;">📝 DRAFT</span>
      </td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">1.0</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>QMS-003</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">Risk Management</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
        <span style="background:#4CAF50;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:12px;">✅ ACTIVE</span>
      </td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">1.8</td>
    </tr>
  </tbody>
</table>
```

**Renders:**

<table style="width:100%;border-collapse:collapse;margin:20px 0;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
  <thead style="background:linear-gradient(135deg,#2D5016 0%,#1a2f0d 100%);color:white;">
    <tr>
      <th style="padding:12px;text-align:left;border:1px solid #ddd;">Document ID</th>
      <th style="padding:12px;text-align:left;border:1px solid #ddd;">Title</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;">Status</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;">Version</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>QMS-001</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">Context & Stakeholders</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
        <span style="background:#4CAF50;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:12px;">✅ ACTIVE</span>
      </td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">2.1</td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>QMS-002</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">Leadership & Policy</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
        <span style="background:#FFC107;color:#000;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:12px;">📝 DRAFT</span>
      </td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">1.0</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>QMS-003</strong></td>
      <td style="padding:10px;border:1px solid #ddd;">Risk Management</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
        <span style="background:#4CAF50;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:12px;">✅ ACTIVE</span>
      </td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">1.8</td>
    </tr>
  </tbody>
</table>

---

## 📈 Table with Trend Indicators

### KPI Tracking Table with Trends

```html
<table style="width:100%;border-collapse:collapse;margin:20px 0;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
  <thead style="background:linear-gradient(135deg,#2D5016 0%,#1a2f0d 100%);color:white;">
    <tr>
      <th style="padding:12px;text-align:left;border:1px solid #ddd;">KPI</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;">Current</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;">Target</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;">Trend</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Customer Satisfaction</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;font-weight:bold;color:#4CAF50;">96.2%</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">≥95%</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;font-size:20px;color:#4CAF50;">▲ +2.1%</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
        <span style="background:#4CAF50;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:12px;">✅ GOOD</span>
      </td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Production Cycle Time</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;font-weight:bold;color:#FF9800;">32 days</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">≤30 days</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;font-size:20px;color:#666;">─ 0%</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
        <span style="background:#FF9800;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:12px;">⚠️ WATCH</span>
      </td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>First-Time Quality</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;font-weight:bold;color:#4CAF50;">94.8%</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">≥95%</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;font-size:20px;color:#4CAF50;">▲ +1.2%</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
        <span style="background:#FF9800;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:12px;">⚠️ WATCH</span>
      </td>
    </tr>
  </tbody>
</table>
```

**Renders:**

<table style="width:100%;border-collapse:collapse;margin:20px 0;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
  <thead style="background:linear-gradient(135deg,#2D5016 0%,#1a2f0d 100%);color:white;">
    <tr>
      <th style="padding:12px;text-align:left;border:1px solid #ddd;">KPI</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;">Current</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;">Target</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;">Trend</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Customer Satisfaction</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;font-weight:bold;color:#4CAF50;">96.2%</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">≥95%</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;font-size:20px;color:#4CAF50;">▲ +2.1%</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
        <span style="background:#4CAF50;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:12px;">✅ GOOD</span>
      </td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Production Cycle Time</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;font-weight:bold;color:#FF9800;">32 days</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">≤30 days</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;font-size:20px;color:#666;">─ 0%</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
        <span style="background:#FF9800;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:12px;">⚠️ WATCH</span>
      </td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>First-Time Quality</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;font-weight:bold;color:#4CAF50;">94.8%</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">≥95%</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;font-size:20px;color:#4CAF50;">▲ +1.2%</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
        <span style="background:#FF9800;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:12px;">⚠️ WATCH</span>
      </td>
    </tr>
  </tbody>
</table>

---

## 🌡️ Heatmap Table

### Risk Assessment Matrix with Color-Coded Cells

```html
<table style="width:100%;border-collapse:collapse;margin:20px 0;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
  <thead style="background:linear-gradient(135deg,#2D5016 0%,#1a2f0d 100%);color:white;">
    <tr>
      <th style="padding:12px;text-align:left;border:1px solid #ddd;">Risk Category</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;">Likelihood</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;">Impact</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;">Risk Score</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Supply Chain Disruption</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;background:#FFF3E0;"><strong>Medium</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;background:#FFCDD2;"><strong>High</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;background:#FF9800;color:white;font-weight:bold;font-size:16px;">12</td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Regulatory Non-Compliance</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;background:#E8F5E9;"><strong>Low</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;background:#FFCDD2;"><strong>High</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;background:#FFC107;color:#000;font-weight:bold;font-size:16px;">6</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Quality Defects</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;background:#E8F5E9;"><strong>Low</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;background:#FFF3E0;"><strong>Medium</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;background:#4CAF50;color:white;font-weight:bold;font-size:16px;">3</td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;"><strong>Data Loss</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;background:#FFCDD2;"><strong>High</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;background:#FFCDD2;"><strong>High</strong></td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;background:#F44336;color:white;font-weight:bold;font-size:16px;">20</td>
    </tr>
  </tbody>
</table>
```

**Heatmap Color Legend:**
- **Green (#4CAF50)**: Low risk (1-5)
- **Yellow (#FFC107)**: Medium risk (6-10)
- **Orange (#FF9800)**: High risk (11-15)
- **Red (#F44336)**: Critical risk (16-25)

---

## 🎨 Customization Templates

### Basic Enhanced Table Template

```html
<table style="width:100%;border-collapse:collapse;margin:20px 0;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
  <thead style="background:linear-gradient(135deg,#2D5016 0%,#1a2f0d 100%);color:white;">
    <tr>
      <th style="padding:12px;text-align:left;border:1px solid #ddd;">{Column 1}</th>
      <th style="padding:12px;text-align:center;border:1px solid #ddd;">{Column 2}</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#ffffff;">
      <td style="padding:10px;border:1px solid #ddd;">{Data}</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">{Data}</td>
    </tr>
    <tr style="background:#f9f9f9;">
      <td style="padding:10px;border:1px solid #ddd;">{Data}</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">{Data}</td>
    </tr>
  </tbody>
</table>
```

---

## 📊 Table Style Guide

### Header Styles

| Style Type | Background | Text Color | Use Case |
|:---|:---|:---|:---|
| **Fort Homes Brand** | #2D5016 gradient | White | Primary tables |
| **Success** | #4CAF50 gradient | White | Compliance tables |
| **Information** | #2196F3 gradient | White | Reference tables |
| **Warning** | #FF9800 gradient | White | Alert tables |

### Cell Coloring (Heatmap)

| Risk/Status Level | Background | Text | Value Range |
|:---|:---:|:---:|:---:|
| **Low/Good** | #E8F5E9 | #2E7D32 | 0-5 |
| **Medium/Fair** | #FFF3E0 | #E65100 | 6-10 |
| **High/Warning** | #FFCDD2 | #C62828 | 11-15 |
| **Critical** | #F44336 | White | 16+ |

---

## 📋 Usage Guidelines

### When to Use Enhanced Tables

**✅ DO use for:**
- Multi-column data with status indicators
- KPI tracking with trends
- Risk assessment matrices
- Compliance tracking
- Audit results
- Document registers

**❌ DON'T use for:**
- Simple lists (use bullets instead)
- Single-column data (use cards instead)
- Very wide tables (consider splitting)
- Highly complex data (use charts)

### Best Practices

1. **Zebra striping** - Alternate row colors (#ffffff and #f9f9f9)
2. **Gradient headers** - Fort Homes brand colors
3. **Status badges** - Use badge components in Status columns
4. **Trend indicators** - Use ▲▼─ symbols with colors
5. **Heatmap coloring** - Color-code cells by value
6. **Responsive design** - Keep tables under 6 columns
7. **Centered numbers** - Align numeric data center/right

---

## ✅ Quality Checklist

Before using enhanced tables, verify:
- [ ] Header has gradient background (#2D5016)
- [ ] Rows alternate white/gray (zebra striping)
- [ ] Status badges use correct colors
- [ ] Trend indicators (▲▼─) are color-coded
- [ ] Numeric columns are center-aligned
- [ ] Heatmap colors match value ranges
- [ ] Box shadow is applied (0 2px 4px)
- [ ] Table width is 100% or appropriate
- [ ] All cells have 1px solid #ddd borders

---

**Created:** January 29, 2026  
**Version:** 1.0  
**Maintained By:** Document Controller  
**Classification:** CONTROLLED
