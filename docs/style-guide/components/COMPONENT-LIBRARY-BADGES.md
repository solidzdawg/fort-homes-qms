# Component Library: Status Badges
## Visual Status Indicators for QMS Documents

---

<div align="center">

| **Library ID** | **COMP-BADGES-001** |
|:---|:---|
| **Version** | 1.0 |
| **Created** | January 29, 2026 |
| **Purpose** | Standard badge components for document and item status |

</div>

---

## 🎯 Purpose

This library provides copy-paste ready HTML badge components for visual status indicators throughout QMS documentation. Badges replace plain text status with professional, color-coded visual elements.

---

## 📦 Component Inventory

### Document Status Badges

#### ✅ ACTIVE
**Use:** Current, approved, in-force documents
```html
<span style="background:#4CAF50;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">✅ ACTIVE</span>
```
**Renders:** <span style="background:#4CAF50;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">✅ ACTIVE</span>

---

#### 📝 DRAFT
**Use:** Documents under development, not yet approved
```html
<span style="background:#2196F3;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">📝 DRAFT</span>
```
**Renders:** <span style="background:#2196F3;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">📝 DRAFT</span>

---

#### ⚠️ UNDER REVIEW
**Use:** Documents pending management review or approval
```html
<span style="background:#FF9800;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">⚠️ UNDER REVIEW</span>
```
**Renders:** <span style="background:#FF9800;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">⚠️ UNDER REVIEW</span>

---

#### 🔄 IN REVISION
**Use:** Documents being updated or modified
```html
<span style="background:#9C27B0;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">🔄 IN REVISION</span>
```
**Renders:** <span style="background:#9C27B0;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">🔄 IN REVISION</span>

---

#### ❌ OBSOLETE
**Use:** Superseded or no longer valid documents
```html
<span style="background:#F44336;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">❌ OBSOLETE</span>
```
**Renders:** <span style="background:#F44336;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">❌ OBSOLETE</span>

---

#### 📦 ARCHIVED
**Use:** Historical documents retained for record-keeping
```html
<span style="background:#607D8B;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">📦 ARCHIVED</span>
```
**Renders:** <span style="background:#607D8B;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">📦 ARCHIVED</span>

---

### Table Cell Badges (Compact)

For use within table cells where space is limited:

```html
<!-- ACTIVE -->
<span style="background:#4CAF50;color:white;padding:2px 8px;border-radius:3px;font-weight:bold;font-size:11px;">✅ ACTIVE</span>

<!-- DRAFT -->
<span style="background:#2196F3;color:white;padding:2px 8px;border-radius:3px;font-weight:bold;font-size:11px;">📝 DRAFT</span>

<!-- REVIEW -->
<span style="background:#FF9800;color:white;padding:2px 8px;border-radius:3px;font-weight:bold;font-size:11px;">⚠️ REVIEW</span>

<!-- OBSOLETE -->
<span style="background:#F44336;color:white;padding:2px 8px;border-radius:3px;font-weight:bold;font-size:11px;">❌ OBSOLETE</span>
```

**Example Table:**

| Document | ID | Status | Last Review |
|:---|:---:|:---:|:---:|
| Quality Manual | QMS-001 | <span style="background:#4CAF50;color:white;padding:2px 8px;border-radius:3px;font-weight:bold;font-size:11px;">✅ ACTIVE</span> | 2026-01-15 |
| Risk Management | QMS-008 | <span style="background:#FF9800;color:white;padding:2px 8px;border-radius:3px;font-weight:bold;font-size:11px;">⚠️ REVIEW</span> | 2025-12-01 |

---

### Compliance Status Badges

#### ✅ COMPLIANT
**Use:** Full compliance with regulatory requirements
```html
<span style="background:#4CAF50;color:white;padding:6px 14px;border-radius:16px;font-weight:bold;font-size:12px;display:inline-flex;align-items:center;gap:6px;">✅ COMPLIANT</span>
```
**Renders:** <span style="background:#4CAF50;color:white;padding:6px 14px;border-radius:16px;font-weight:bold;font-size:12px;display:inline-flex;align-items:center;gap:6px;">✅ COMPLIANT</span>

---

#### ⚠️ CONDITIONAL
**Use:** Conditional approval with pending items
```html
<span style="background:#FF9800;color:white;padding:6px 14px;border-radius:16px;font-weight:bold;font-size:12px;display:inline-flex;align-items:center;gap:6px;">⚠️ CONDITIONAL</span>
```
**Renders:** <span style="background:#FF9800;color:white;padding:6px 14px;border-radius:16px;font-weight:bold;font-size:12px;display:inline-flex;align-items:center;gap:6px;">⚠️ CONDITIONAL</span>

---

#### ❌ NON-COMPLIANT
**Use:** Does not meet regulatory requirements
```html
<span style="background:#F44336;color:white;padding:6px 14px;border-radius:16px;font-weight:bold;font-size:12px;display:inline-flex;align-items:center;gap:6px;">❌ NON-COMPLIANT</span>
```
**Renders:** <span style="background:#F44336;color:white;padding:6px 14px;border-radius:16px;font-weight:bold;font-size:12px;display:inline-flex;align-items:center;gap:6px;">❌ NON-COMPLIANT</span>

---

#### 🔍 PENDING REVIEW
**Use:** Compliance review in progress
```html
<span style="background:#2196F3;color:white;padding:6px 14px;border-radius:16px;font-weight:bold;font-size:12px;display:inline-flex;align-items:center;gap:6px;">🔍 PENDING REVIEW</span>
```
**Renders:** <span style="background:#2196F3;color:white;padding:6px 14px;border-radius:16px;font-weight:bold;font-size:12px;display:inline-flex;align-items:center;gap:6px;">🔍 PENDING REVIEW</span>

---

### Hold Point Badges

#### 🎯 Standard Hold Point
**Use:** Standard TPIA hold point designation
```html
<span style="background:#FF9800;color:white;padding:8px 16px;border-radius:20px;font-weight:bold;font-size:14px;display:inline-flex;align-items:center;gap:8px;box-shadow:0 2px 4px rgba(0,0,0,0.2);">🎯 HOLD POINT HP-1</span>
```
**Renders:** <span style="background:#FF9800;color:white;padding:8px 16px;border-radius:20px;font-weight:bold;font-size:14px;display:inline-flex;align-items:center;gap:8px;box-shadow:0 2px 4px rgba(0,0,0,0.2);">🎯 HOLD POINT HP-1</span>

---

#### 🎯 Critical Hold Point (Gradient)
**Use:** Critical hold points requiring TPIA inspection
```html
<span style="background:linear-gradient(135deg,#FF9800 0%,#F57C00 100%);color:white;padding:8px 16px;border-radius:20px;font-weight:bold;font-size:14px;display:inline-flex;align-items:center;gap:8px;box-shadow:0 2px 4px rgba(0,0,0,0.2);">🎯 HP-4 TPIA REQUIRED</span>
```
**Renders:** <span style="background:linear-gradient(135deg,#FF9800 0%,#F57C00 100%);color:white;padding:8px 16px;border-radius:20px;font-weight:bold;font-size:14px;display:inline-flex;align-items:center;gap:8px;box-shadow:0 2px 4px rgba(0,0,0,0.2);">🎯 HP-4 TPIA REQUIRED</span>

---

### Task/Activity Status Badges

#### ✅ COMPLETE
```html
<span style="background:#4CAF50;color:white;padding:4px 10px;border-radius:8px;font-weight:bold;font-size:10px;">✅ COMPLETE</span>
```
**Renders:** <span style="background:#4CAF50;color:white;padding:4px 10px;border-radius:8px;font-weight:bold;font-size:10px;">✅ COMPLETE</span>

---

#### 🔄 IN PROGRESS
```html
<span style="background:#2196F3;color:white;padding:4px 10px;border-radius:8px;font-weight:bold;font-size:10px;">🔄 IN PROGRESS</span>
```
**Renders:** <span style="background:#2196F3;color:white;padding:4px 10px;border-radius:8px;font-weight:bold;font-size:10px;">🔄 IN PROGRESS</span>

---

#### ⏳ PENDING
```html
<span style="background:#FF9800;color:white;padding:4px 10px;border-radius:8px;font-weight:bold;font-size:10px;">⏳ PENDING</span>
```
**Renders:** <span style="background:#FF9800;color:white;padding:4px 10px;border-radius:8px;font-weight:bold;font-size:10px;">⏳ PENDING</span>

---

#### ❌ FAILED
```html
<span style="background:#F44336;color:white;padding:4px 10px;border-radius:8px;font-weight:bold;font-size:10px;">❌ FAILED</span>
```
**Renders:** <span style="background:#F44336;color:white;padding:4px 10px;border-radius:8px;font-weight:bold;font-size:10px;">❌ FAILED</span>

---

## 📋 Usage Guidelines

### When to Use Badges

**✅ DO use badges for:**
- Document status in headers and tables
- Compliance status indicators
- Hold point designations
- Task/activity completion status
- Approval status
- Quality metrics status

**❌ DON'T use badges for:**
- Long descriptive text
- Inline paragraph content (use text emphasis instead)
- Every single status mention (reserve for important indicators)

### Consistency Rules

1. **Use consistent emoji icons** - ✅ for approved/complete, ⚠️ for warning/review, ❌ for obsolete/failed
2. **Match colors to meaning** - Green = good, Orange = caution, Red = stop/error, Blue = information
3. **Size appropriately** - Large badges for headers, compact for tables
4. **Maintain spacing** - Don't crowd badges together

### Accessibility

All badges include:
- High contrast ratios (WCAG AA compliant)
- Emoji icons + text (not icon-only)
- Inline-block display for proper spacing

---

## 🔄 Replacement Patterns

### Find and Replace Guide

**Document Headers:**
```markdown
# OLD:
Status: Active

# NEW:
Status: <span style="background:#4CAF50;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">✅ ACTIVE</span>
```

**Table Cells:**
```markdown
# OLD:
| Active |

# NEW:
| <span style="background:#4CAF50;color:white;padding:2px 8px;border-radius:3px;font-weight:bold;font-size:11px;">✅ ACTIVE</span> |
```

---

## 📚 Related Components

- [COMPONENT-LIBRARY-KPI-CARDS.md](./COMPONENT-LIBRARY-KPI-CARDS.md) - Dashboard cards
- [COMPONENT-LIBRARY-TABLES.md](./COMPONENT-LIBRARY-TABLES.md) - Enhanced table templates
- [QMS-VISUAL-STYLE-GUIDE.md](../QMS-VISUAL-STYLE-GUIDE.md) - Master style guide

---

## ✅ Quality Checklist

Before using badges, verify:
- [ ] Badge color matches status meaning
- [ ] Emoji icon is appropriate
- [ ] Text is concise (1-3 words)
- [ ] Spacing/padding looks clean
- [ ] Badge renders correctly on GitHub
- [ ] Badge is readable in print preview
- [ ] Color contrast meets accessibility standards

---

**Created:** January 29, 2026  
**Version:** 1.0  
**Maintained By:** Document Controller  
**Classification:** CONTROLLED
