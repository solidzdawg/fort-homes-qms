# Component Library: Progress Bars
## Visual Progress & Completion Indicators

---

<div align="center">

| **Library ID** | **COMP-PROGRESS-003** |
|:---|:---|
| **Version** | 1.0 |
| **Created** | January 29, 2026 |
| **Purpose** | Progress bar components for percentages and completion metrics |

</div>

---

## 🎯 Purpose

Visual progress bars that transform percentage data into intuitive, color-coded horizontal bars. Perfect for completion rates, compliance metrics, and goal tracking.

---

## 📊 Basic Progress Bar

### Single Progress Bar (Success - Green)

```html
<div style="margin:15px 0;">
  <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
    <span style="font-weight:600;">Training Compliance</span>
    <span style="font-weight:600;color:#4CAF50;">98.2%</span>
  </div>
  <div style="background:#E0E0E0;height:24px;border-radius:12px;overflow:hidden;">
    <div style="background:linear-gradient(90deg,#4CAF50 0%,#2E7D32 100%);width:98.2%;height:100%;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;color:white;font-weight:bold;font-size:12px;">
      98.2%
    </div>
  </div>
</div>
```

**Renders:**

<div style="margin:15px 0;">
  <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
    <span style="font-weight:600;">Training Compliance</span>
    <span style="font-weight:600;color:#4CAF50;">98.2%</span>
  </div>
  <div style="background:#E0E0E0;height:24px;border-radius:12px;overflow:hidden;">
    <div style="background:linear-gradient(90deg,#4CAF50 0%,#2E7D32 100%);width:98.2%;height:100%;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;color:white;font-weight:bold;font-size:12px;">
      98.2%
    </div>
  </div>
</div>

---

## 🎨 Color Variants

### Warning Progress Bar (Orange)

```html
<div style="margin:15px 0;">
  <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
    <span style="font-weight:600;">Document Control (Current)</span>
    <span style="font-weight:600;color:#FF9800;">93.1% (Target: 100%)</span>
  </div>
  <div style="background:#E0E0E0;height:24px;border-radius:12px;overflow:hidden;">
    <div style="background:linear-gradient(90deg,#FF9800 0%,#E65100 100%);width:93.1%;height:100%;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;color:white;font-weight:bold;font-size:12px;">
      93.1%
    </div>
  </div>
</div>
```

**Renders:**

<div style="margin:15px 0;">
  <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
    <span style="font-weight:600;">Document Control (Current)</span>
    <span style="font-weight:600;color:#FF9800;">93.1% (Target: 100%)</span>
  </div>
  <div style="background:#E0E0E0;height:24px;border-radius:12px;overflow:hidden;">
    <div style="background:linear-gradient(90deg,#FF9800 0%,#E65100 100%);width:93.1%;height:100%;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;color:white;font-weight:bold;font-size:12px;">
      93.1%
    </div>
  </div>
</div>

---

### Error Progress Bar (Red)

```html
<div style="margin:15px 0;">
  <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
    <span style="font-weight:600;">Calibration Status</span>
    <span style="font-weight:600;color:#F44336;">86.4% (Target: 100%)</span>
  </div>
  <div style="background:#E0E0E0;height:24px;border-radius:12px;overflow:hidden;">
    <div style="background:linear-gradient(90deg,#F44336 0%,#C62828 100%);width:86.4%;height:100%;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;color:white;font-weight:bold;font-size:12px;">
      86.4%
    </div>
  </div>
</div>
```

**Renders:**

<div style="margin:15px 0;">
  <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
    <span style="font-weight:600;">Calibration Status</span>
    <span style="font-weight:600;color:#F44336;">86.4% (Target: 100%)</span>
  </div>
  <div style="background:#E0E0E0;height:24px;border-radius:12px;overflow:hidden;">
    <div style="background:linear-gradient(90deg,#F44336 0%,#C62828 100%);width:86.4%;height:100%;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;color:white;font-weight:bold;font-size:12px;">
      86.4%
    </div>
  </div>
</div>

---

## 📊 Multi-Bar Comparison

### Three Progress Bars (Comparison View)

```html
<div style="margin:20px 0;">
  <!-- Bar 1: Excellent (Green) -->
  <div style="margin:15px 0;">
    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
      <span style="font-weight:600;">✅ Training Compliance</span>
      <span style="font-weight:600;color:#4CAF50;">98.2% (Target: 95%)</span>
    </div>
    <div style="background:#E0E0E0;height:24px;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(90deg,#4CAF50 0%,#2E7D32 100%);width:98.2%;height:100%;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;color:white;font-weight:bold;font-size:12px;">
        98.2%
      </div>
    </div>
  </div>
  
  <!-- Bar 2: Good (Orange) -->
  <div style="margin:15px 0;">
    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
      <span style="font-weight:600;">⚠️ Document Control</span>
      <span style="font-weight:600;color:#FF9800;">93.1% (Target: 100%)</span>
    </div>
    <div style="background:#E0E0E0;height:24px;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(90deg,#FF9800 0%,#E65100 100%);width:93.1%;height:100%;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;color:white;font-weight:bold;font-size:12px;">
        93.1%
      </div>
    </div>
  </div>
  
  <!-- Bar 3: Needs Improvement (Red) -->
  <div style="margin:15px 0;">
    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
      <span style="font-weight:600;">❌ Calibration Status</span>
      <span style="font-weight:600;color:#F44336;">86.4% (Target: 100%)</span>
    </div>
    <div style="background:#E0E0E0;height:24px;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(90deg,#F44336 0%,#C62828 100%);width:86.4%;height:100%;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;color:white;font-weight:bold;font-size:12px;">
        86.4%
      </div>
    </div>
  </div>
</div>
```

**Renders:** (See three bars above with green, orange, red variants)

---

## 🎨 Customization Template

```html
<div style="margin:15px 0;">
  <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
    <span style="font-weight:600;">{label}</span>
    <span style="font-weight:600;color:{color};">{value}%{target_text}</span>
  </div>
  <div style="background:#E0E0E0;height:24px;border-radius:12px;overflow:hidden;">
    <div style="background:linear-gradient(90deg,{color} 0%,{darkColor} 100%);width:{value}%;height:100%;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;color:white;font-weight:bold;font-size:12px;">
      {value}%
    </div>
  </div>
</div>
```

**Variables:**
- `{label}`: Metric name (e.g., "Training Compliance")
- `{value}`: Percentage value (e.g., "98.2")
- `{target_text}`: Optional target (e.g., " (Target: 95%)")
- `{color}`: Bar color (#4CAF50, #FF9800, #F44336, #2196F3)
- `{darkColor}`: Darker gradient end (#2E7D32, #E65100, #C62828, #1565C0)

---

## 📊 Color Selection Guide

| Percentage Range | Color | Gradient | Status |
|:---:|:---|:---|:---|
| **95-100%** | #4CAF50 (Green) | #4CAF50 → #2E7D32 | ✅ Excellent |
| **85-94%** | #FF9800 (Orange) | #FF9800 → #E65100 | ⚠️ Good |
| **70-84%** | #FF5722 (Deep Orange) | #FF5722 → #D84315 | ⚠️ Fair |
| **<70%** | #F44336 (Red) | #F44336 → #C62828 | ❌ Needs Attention |
| **N/A (Info)** | #2196F3 (Blue) | #2196F3 → #1565C0 | ℹ️ Information |

---

## 📋 Usage Guidelines

### When to Use Progress Bars

**✅ DO use for:**
- Completion percentages
- Compliance rates
- Goal achievement tracking
- Audit scores
- Training completion rates
- Quality metrics with targets

**❌ DON'T use for:**
- Absolute counts (use KPI cards instead)
- Binary yes/no status (use badges instead)
- Complex multi-dimensional data (use tables)

### Best Practices

1. **Always show target** - Include target percentage in label when applicable
2. **Use emoji indicators** - ✅ ⚠️ ❌ for quick visual status
3. **Color by threshold** - Green for meeting targets, orange for close, red for missing
4. **Label clearly** - Metric name should be specific and unambiguous
5. **Group related bars** - Stack multiple bars for comparison

---

## 📚 Usage Examples

### QMS Manual - Training Section

```markdown
## 7.2 Competence

Current training compliance metrics:

<div style="margin:20px 0;">
  <div style="margin:15px 0;">
    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
      <span style="font-weight:600;">✅ Production Staff Training</span>
      <span style="font-weight:600;color:#4CAF50;">98.2% (Target: 95%)</span>
    </div>
    <div style="background:#E0E0E0;height:24px;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(90deg,#4CAF50 0%,#2E7D32 100%);width:98.2%;height:100%;[...]
    </div>
  </div>
  
  [... more bars ...]
</div>
```

### SOP - Audit Compliance

```markdown
## 10. Audit & Compliance

Internal audit completion status:

<div style="margin:20px 0;">
  [... progress bars for each audit area ...]
</div>
```

---

## ✅ Quality Checklist

Before using progress bars, verify:
- [ ] Percentage value is accurate
- [ ] Color matches performance level
- [ ] Target (if applicable) is specified
- [ ] Label is clear and specific
- [ ] Bar width matches percentage exactly
- [ ] Gradient colors are correct
- [ ] Text inside bar is readable
- [ ] Emoji indicator matches status

---

**Created:** January 29, 2026  
**Version:** 1.0  
**Maintained By:** Document Controller  
**Classification:** CONTROLLED
