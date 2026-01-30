# Component Library: KPI Dashboard Cards
## Visual Metric Display Components

---

<div align="center">

| **Library ID** | **COMP-KPI-002** |
|:---|:---|
| **Version** | 1.0 |
| **Created** | January 29, 2026 |
| **Purpose** | Dashboard card components for displaying key performance indicators |

</div>

---

## 🎯 Purpose

This library provides gradient card templates for displaying KPI metrics in a visually striking format. Cards use large typography, color gradients, and trend indicators to make metrics immediately readable.

---

## 📦 Single KPI Card Templates

### Success Metric (Green)

**Use:** Positive metrics, achievements, pass rates

```html
<div style="background:linear-gradient(135deg,#4CAF50 0%,#2E7D32 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);min-width:220px;">
  <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">✅ TPIA Pass Rate</div>
  <div style="font-size:42px;font-weight:bold;margin:12px 0;">98.1%</div>
  <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
    ▲ +1.9% vs Q4 2025
  </div>
</div>
```

**Renders:**

<div style="background:linear-gradient(135deg,#4CAF50 0%,#2E7D32 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);min-width:220px;margin:20px 0;">
  <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">✅ TPIA Pass Rate</div>
  <div style="font-size:42px;font-weight:bold;margin:12px 0;">98.1%</div>
  <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
    ▲ +1.9% vs Q4 2025
  </div>
</div>

---

### Information Metric (Blue)

**Use:** Production volume, counts, informational metrics

```html
<div style="background:linear-gradient(135deg,#2196F3 0%,#1565C0 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);min-width:220px;">
  <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">📦 Units Produced</div>
  <div style="font-size:42px;font-weight:bold;margin:12px 0;">47</div>
  <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
    ▲ +12 units vs Q4 2025
  </div>
</div>
```

**Renders:**

<div style="background:linear-gradient(135deg,#2196F3 0%,#1565C0 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);min-width:220px;margin:20px 0;">
  <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">📦 Units Produced</div>
  <div style="font-size:42px;font-weight:bold;margin:12px 0;">47</div>
  <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
    ▲ +12 units vs Q4 2025
  </div>
</div>

---

### Warning Metric (Orange)

**Use:** Issues requiring attention, NCRs, at-risk metrics

```html
<div style="background:linear-gradient(135deg,#FF9800 0%,#E65100 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);min-width:220px;">
  <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">📋 Open NCRs</div>
  <div style="font-size:42px;font-weight:bold;margin:12px 0;">7</div>
  <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
    ▼ -3 fewer vs Q4 2025
  </div>
</div>
```

**Renders:**

<div style="background:linear-gradient(135deg,#FF9800 0%,#E65100 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);min-width:220px;margin:20px 0;">
  <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">📋 Open NCRs</div>
  <div style="font-size:42px;font-weight:bold;margin:12px 0;">7</div>
  <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
    ▼ -3 fewer vs Q4 2025
  </div>
</div>

---

### Process Metric (Purple)

**Use:** Time-based metrics, cycle times, durations

```html
<div style="background:linear-gradient(135deg,#9C27B0 0%,#6A1B9A 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);min-width:220px;">
  <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">⏱️ Avg Cycle Time</div>
  <div style="font-size:42px;font-weight:bold;margin:12px 0;">12.7d</div>
  <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
    ▲ +0.2d vs Q4 2025
  </div>
</div>
```

**Renders:**

<div style="background:linear-gradient(135deg,#9C27B0 0%,#6A1B9A 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);min-width:220px;margin:20px 0;">
  <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">⏱️ Avg Cycle Time</div>
  <div style="font-size:42px;font-weight:bold;margin:12px 0;">12.7d</div>
  <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
    ▲ +0.2d vs Q4 2025
  </div>
</div>

---

## 📊 Multi-Card Dashboards

### Four-Card Dashboard (Grid Layout)

**Use:** Section overview, process metrics, quarterly reports

```html
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin:30px 0;">
  <!-- Card 1: Success Metric -->
  <div style="background:linear-gradient(135deg,#4CAF50 0%,#2E7D32 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
    <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">✅ TPIA Pass Rate</div>
    <div style="font-size:42px;font-weight:bold;margin:12px 0;">98.1%</div>
    <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
      ▲ +1.9% vs Q4 2025
    </div>
  </div>
  
  <!-- Card 2: Information Metric -->
  <div style="background:linear-gradient(135deg,#2196F3 0%,#1565C0 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
    <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">📦 Units Produced</div>
    <div style="font-size:42px;font-weight:bold;margin:12px 0;">47</div>
    <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
      ▲ +12 units vs Q4 2025
    </div>
  </div>
  
  <!-- Card 3: Warning Metric -->
  <div style="background:linear-gradient(135deg,#FF9800 0%,#E65100 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
    <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">📋 Open NCRs</div>
    <div style="font-size:42px;font-weight:bold;margin:12px 0;">7</div>
    <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
      ▼ -3 fewer vs Q4 2025
    </div>
  </div>
  
  <!-- Card 4: Process Metric -->
  <div style="background:linear-gradient(135deg,#9C27B0 0%,#6A1B9A 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
    <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">⏱️ Avg Cycle Time</div>
    <div style="font-size:42px;font-weight:bold;margin:12px 0;">12.7d</div>
    <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
      ▲ +0.2d vs Q4 2025
    </div>
  </div>
</div>
```

**Renders:**

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin:30px 0;">
  <div style="background:linear-gradient(135deg,#4CAF50 0%,#2E7D32 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
    <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">✅ TPIA Pass Rate</div>
    <div style="font-size:42px;font-weight:bold;margin:12px 0;">98.1%</div>
    <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
      ▲ +1.9% vs Q4 2025
    </div>
  </div>
  <div style="background:linear-gradient(135deg,#2196F3 0%,#1565C0 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
    <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">📦 Units Produced</div>
    <div style="font-size:42px;font-weight:bold;margin:12px 0;">47</div>
    <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
      ▲ +12 units vs Q4 2025
    </div>
  </div>
  <div style="background:linear-gradient(135deg,#FF9800 0%,#E65100 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
    <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">📋 Open NCRs</div>
    <div style="font-size:42px;font-weight:bold;margin:12px 0;">7</div>
    <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
      ▼ -3 fewer vs Q4 2025
    </div>
  </div>
  <div style="background:linear-gradient(135deg,#9C27B0 0%,#6A1B9A 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
    <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">⏱️ Avg Cycle Time</div>
    <div style="font-size:42px;font-weight:bold;margin:12px 0;">12.7d</div>
    <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
      ▲ +0.2d vs Q4 2025
    </div>
  </div>
</div>

---

## 🎨 Color Reference

| Metric Type | Gradient Colors | Use Case |
|:---|:---|:---|
| **Success** | #4CAF50 → #2E7D32 | Pass rates, achievements, goals met |
| **Information** | #2196F3 → #1565C0 | Production volume, counts, neutral data |
| **Warning** | #FF9800 → #E65100 | NCRs, issues, metrics needing attention |
| **Process** | #9C27B0 → #6A1B9A | Time metrics, cycle times, durations |
| **Critical** | #F44336 → #C62828 | Critical failures, safety incidents |

---

## 📋 Customization Template

```html
<div style="background:linear-gradient(135deg,{color1} 0%,{color2} 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);min-width:220px;">
  <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">{icon} {title}</div>
  <div style="font-size:42px;font-weight:bold;margin:12px 0;">{value}</div>
  <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
    {trend_symbol} {trend_text} vs {baseline}
  </div>
</div>
```

**Variables:**
- `{color1}`, `{color2}`: Gradient colors from table above
- `{icon}`: Emoji icon (✅ 📦 📋 ⏱️ etc.)
- `{title}`: Metric name (e.g., "TPIA Pass Rate")
- `{value}`: Large metric value (e.g., "98.1%")
- `{trend_symbol}`: ▲ (up), ▼ (down), ─ (flat)
- `{trend_text}`: Change amount (e.g., "+1.9%")
- `{baseline}`: Comparison period (e.g., "Q4 2025")

---

## 📚 Usage Examples

### QMS Manual Section Header

```markdown
## 6. Performance Evaluation

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin:30px 0;">
  [... 4 KPI cards showing section metrics ...]
</div>

### 6.1 Monitoring and Measurement
```

### SOP Metrics Section

```markdown
## 9. Metrics & KPIs

This SOP tracks the following key performance indicators:

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin:30px 0;">
  [... 2-3 KPI cards showing SOP-specific metrics ...]
</div>
```

---

## ✅ Quality Checklist

Before using KPI cards, verify:
- [ ] Gradient colors match metric type
- [ ] Large number (42px font) is readable
- [ ] Trend indicator (▲▼─) is correct
- [ ] Icon matches metric meaning
- [ ] Baseline comparison is clear
- [ ] Cards render properly on GitHub
- [ ] Grid layout works on mobile
- [ ] Data is current and accurate

---

**Created:** January 29, 2026  
**Version:** 1.0  
**Maintained By:** Document Controller  
**Classification:** CONTROLLED
