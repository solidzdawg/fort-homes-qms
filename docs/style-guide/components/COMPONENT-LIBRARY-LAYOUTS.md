# Component Library: Multi-Column Layouts
## Advanced Layout Patterns for Complex Content

---

<div align="center">

| **Library ID** | **COMP-LAYOUTS-006** |
|:---|:---|
| **Version** | 1.0 |
| **Created** | January 29, 2026 |
| **Purpose** | Multi-column grids, sidebars, and advanced layout components |

</div>

---

## 🎯 Purpose

Advanced layout components that break free from single-column markdown. Features include two-column grids, three-column layouts, sidebar panels, and dashboard grids. Perfect for comparison tables, feature lists, and visual organization.

---

## 📐 Two-Column Grid

### Side-by-Side Content Layout

```html
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0;">
  
  <!-- Left Column -->
  <div style="background:#F5F5F5;padding:20px;border-radius:8px;border:1px solid #E0E0E0;">
    <h4 style="margin-top:0;color:#2D5016;">✅ Strengths</h4>
    <ul style="margin:0;padding-left:20px;">
      <li>HUD Code compliance</li>
      <li>Established processes</li>
      <li>Skilled workforce</li>
      <li>Strong supplier relationships</li>
    </ul>
  </div>
  
  <!-- Right Column -->
  <div style="background:#F5F5F5;padding:20px;border-radius:8px;border:1px solid #E0E0E0;">
    <h4 style="margin-top:0;color:#2D5016;">📈 Opportunities</h4>
    <ul style="margin:0;padding-left:20px;">
      <li>Digital transformation</li>
      <li>Automation opportunities</li>
      <li>New market segments</li>
      <li>Process optimization</li>
    </ul>
  </div>
  
</div>
```

**Renders:**

<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0;">
  
  <div style="background:#F5F5F5;padding:20px;border-radius:8px;border:1px solid #E0E0E0;">
    <h4 style="margin-top:0;color:#2D5016;">✅ Strengths</h4>
    <ul style="margin:0;padding-left:20px;">
      <li>HUD Code compliance</li>
      <li>Established processes</li>
      <li>Skilled workforce</li>
      <li>Strong supplier relationships</li>
    </ul>
  </div>
  
  <div style="background:#F5F5F5;padding:20px;border-radius:8px;border:1px solid #E0E0E0;">
    <h4 style="margin-top:0;color:#2D5016;">📈 Opportunities</h4>
    <ul style="margin:0;padding-left:20px;">
      <li>Digital transformation</li>
      <li>Automation opportunities</li>
      <li>New market segments</li>
      <li>Process optimization</li>
    </ul>
  </div>
  
</div>

---

## 📊 Three-Column Grid

### Triple-Column Comparison Layout

```html
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin:20px 0;">
  
  <!-- Column 1 -->
  <div style="background:linear-gradient(135deg,#E8F5E9 0%,#F1F8F1 100%);padding:20px;border-radius:8px;border:2px solid #4CAF50;text-align:center;">
    <div style="font-size:32px;margin-bottom:10px;">✅</div>
    <h4 style="margin:10px 0;color:#2E7D32;">Compliant</h4>
    <p style="font-size:36px;font-weight:bold;color:#2E7D32;margin:10px 0;">42</p>
    <p style="margin:0;font-size:14px;color:#666;">Documents</p>
  </div>
  
  <!-- Column 2 -->
  <div style="background:linear-gradient(135deg,#FFF3E0 0%,#FFF8F1 100%);padding:20px;border-radius:8px;border:2px solid #FF9800;text-align:center;">
    <div style="font-size:32px;margin-bottom:10px;">⚠️</div>
    <h4 style="margin:10px 0;color:#E65100;">Under Review</h4>
    <p style="font-size:36px;font-weight:bold;color:#E65100;margin:10px 0;">8</p>
    <p style="margin:0;font-size:14px;color:#666;">Documents</p>
  </div>
  
  <!-- Column 3 -->
  <div style="background:linear-gradient(135deg,#FFEBEE 0%,#FFF5F5 100%);padding:20px;border-radius:8px;border:2px solid #F44336;text-align:center;">
    <div style="font-size:32px;margin-bottom:10px;">❌</div>
    <h4 style="margin:10px 0;color:#C62828;">Obsolete</h4>
    <p style="font-size:36px;font-weight:bold;color:#C62828;margin:10px 0;">3</p>
    <p style="margin:0;font-size:14px;color:#666;">Documents</p>
  </div>
  
</div>
```

**Renders:**

<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin:20px 0;">
  
  <div style="background:linear-gradient(135deg,#E8F5E9 0%,#F1F8F1 100%);padding:20px;border-radius:8px;border:2px solid #4CAF50;text-align:center;">
    <div style="font-size:32px;margin-bottom:10px;">✅</div>
    <h4 style="margin:10px 0;color:#2E7D32;">Compliant</h4>
    <p style="font-size:36px;font-weight:bold;color:#2E7D32;margin:10px 0;">42</p>
    <p style="margin:0;font-size:14px;color:#666;">Documents</p>
  </div>
  
  <div style="background:linear-gradient(135deg,#FFF3E0 0%,#FFF8F1 100%);padding:20px;border-radius:8px;border:2px solid #FF9800;text-align:center;">
    <div style="font-size:32px;margin-bottom:10px;">⚠️</div>
    <h4 style="margin:10px 0;color:#E65100;">Under Review</h4>
    <p style="font-size:36px;font-weight:bold;color:#E65100;margin:10px 0;">8</p>
    <p style="margin:0;font-size:14px;color:#666;">Documents</p>
  </div>
  
  <div style="background:linear-gradient(135deg,#FFEBEE 0%,#FFF5F5 100%);padding:20px;border-radius:8px;border:2px solid #F44336;text-align:center;">
    <div style="font-size:32px;margin-bottom:10px;">❌</div>
    <h4 style="margin:10px 0;color:#C62828;">Obsolete</h4>
    <p style="font-size:36px;font-weight:bold;color:#C62828;margin:10px 0;">3</p>
    <p style="margin:0;font-size:14px;color:#666;">Documents</p>
  </div>
  
</div>

---

## 📑 Sidebar Layout (70/30 Split)

### Main Content with Right Sidebar

```html
<div style="display:grid;grid-template-columns:2fr 1fr;gap:20px;margin:20px 0;">
  
  <!-- Main Content (70%) -->
  <div style="background:#FFFFFF;padding:25px;border-radius:8px;border:1px solid #E0E0E0;">
    <h3 style="margin-top:0;color:#2D5016;">Main Content Area</h3>
    <p>This is the primary content area. It takes up 70% of the width (2fr) and contains the main information, procedures, or documentation.</p>
    <p>Use this for detailed procedures, process descriptions, or primary content.</p>
  </div>
  
  <!-- Sidebar (30%) -->
  <div style="background:linear-gradient(135deg,#E3F2FD 0%,#F1F8FE 100%);padding:20px;border-radius:8px;border:2px solid #2196F3;">
    <h4 style="margin-top:0;color:#1565C0;">📚 Quick Reference</h4>
    <p style="font-size:14px;margin:10px 0;"><strong>Related Documents:</strong></p>
    <ul style="font-size:14px;margin:0;padding-left:20px;">
      <li>SOP-002</li>
      <li>WI-015</li>
      <li>FORM-QT-001</li>
    </ul>
    <hr style="border:1px solid #2196F3;margin:15px 0;">
    <p style="font-size:14px;margin:10px 0;"><strong>Key Contacts:</strong></p>
    <p style="font-size:13px;margin:5px 0;">📧 quality@forthomes.com</p>
    <p style="font-size:13px;margin:5px 0;">📞 (970) 555-0100</p>
  </div>
  
</div>
```

**Renders:**

<div style="display:grid;grid-template-columns:2fr 1fr;gap:20px;margin:20px 0;">
  
  <div style="background:#FFFFFF;padding:25px;border-radius:8px;border:1px solid #E0E0E0;">
    <h3 style="margin-top:0;color:#2D5016;">Main Content Area</h3>
    <p>This is the primary content area. It takes up 70% of the width (2fr) and contains the main information, procedures, or documentation.</p>
    <p>Use this for detailed procedures, process descriptions, or primary content.</p>
  </div>
  
  <div style="background:linear-gradient(135deg,#E3F2FD 0%,#F1F8FE 100%);padding:20px;border-radius:8px;border:2px solid #2196F3;">
    <h4 style="margin-top:0;color:#1565C0;">📚 Quick Reference</h4>
    <p style="font-size:14px;margin:10px 0;"><strong>Related Documents:</strong></p>
    <ul style="font-size:14px;margin:0;padding-left:20px;">
      <li>SOP-002</li>
      <li>WI-015</li>
      <li>FORM-QT-001</li>
    </ul>
    <hr style="border:1px solid #2196F3;margin:15px 0;">
    <p style="font-size:14px;margin:10px 0;"><strong>Key Contacts:</strong></p>
    <p style="font-size:13px;margin:5px 0;">📧 quality@forthomes.com</p>
    <p style="font-size:13px;margin:5px 0;">📞 (970) 555-0100</p>
  </div>
  
</div>

---

## 📊 Four-Column Dashboard Grid

### Equal-Width Dashboard Metrics

```html
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin:20px 0;">
  
  <!-- Card 1 -->
  <div style="background:linear-gradient(135deg,#E8F5E9 0%,#C8E6C9 100%);padding:20px;border-radius:8px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    <div style="font-size:28px;margin-bottom:8px;">✅</div>
    <div style="font-size:32px;font-weight:bold;color:#2E7D32;margin:5px 0;">98%</div>
    <div style="font-size:14px;color:#666;margin-top:5px;">Quality Rate</div>
  </div>
  
  <!-- Card 2 -->
  <div style="background:linear-gradient(135deg,#E3F2FD 0%,#BBDEFB 100%);padding:20px;border-radius:8px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    <div style="font-size:28px;margin-bottom:8px;">📋</div>
    <div style="font-size:32px;font-weight:bold;color:#1565C0;margin:5px 0;">142</div>
    <div style="font-size:14px;color:#666;margin-top:5px;">Documents</div>
  </div>
  
  <!-- Card 3 -->
  <div style="background:linear-gradient(135deg,#FFF3E0 0%,#FFE0B2 100%);padding:20px;border-radius:8px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    <div style="font-size:28px;margin-bottom:8px;">🎯</div>
    <div style="font-size:32px;font-weight:bold;color:#E65100;margin:5px 0;">28</div>
    <div style="font-size:14px;color:#666;margin-top:5px;">Active ITPs</div>
  </div>
  
  <!-- Card 4 -->
  <div style="background:linear-gradient(135deg,#F3E5F5 0%,#E1BEE7 100%);padding:20px;border-radius:8px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    <div style="font-size:28px;margin-bottom:8px;">👥</div>
    <div style="font-size:32px;font-weight:bold;color:#6A1B9A;margin:5px 0;">87</div>
    <div style="font-size:14px;color:#666;margin-top:5px;">Trained Staff</div>
  </div>
  
</div>
```

**Renders:**

<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin:20px 0;">
  
  <div style="background:linear-gradient(135deg,#E8F5E9 0%,#C8E6C9 100%);padding:20px;border-radius:8px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    <div style="font-size:28px;margin-bottom:8px;">✅</div>
    <div style="font-size:32px;font-weight:bold;color:#2E7D32;margin:5px 0;">98%</div>
    <div style="font-size:14px;color:#666;margin-top:5px;">Quality Rate</div>
  </div>
  
  <div style="background:linear-gradient(135deg,#E3F2FD 0%,#BBDEFB 100%);padding:20px;border-radius:8px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    <div style="font-size:28px;margin-bottom:8px;">📋</div>
    <div style="font-size:32px;font-weight:bold;color:#1565C0;margin:5px 0;">142</div>
    <div style="font-size:14px;color:#666;margin-top:5px;">Documents</div>
  </div>
  
  <div style="background:linear-gradient(135deg,#FFF3E0 0%,#FFE0B2 100%);padding:20px;border-radius:8px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    <div style="font-size:28px;margin-bottom:8px;">🎯</div>
    <div style="font-size:32px;font-weight:bold;color:#E65100;margin:5px 0;">28</div>
    <div style="font-size:14px;color:#666;margin-top:5px;">Active ITPs</div>
  </div>
  
  <div style="background:linear-gradient(135deg,#F3E5F5 0%,#E1BEE7 100%);padding:20px;border-radius:8px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    <div style="font-size:28px;margin-bottom:8px;">👥</div>
    <div style="font-size:32px;font-weight:bold;color:#6A1B9A;margin:5px 0;">87</div>
    <div style="font-size:14px;color:#666;margin-top:5px;">Trained Staff</div>
  </div>
  
</div>

---

## 🎨 Customization Templates

### Two-Column Template

```html
<div style="display:grid;grid-template-columns:1fr 1fr;gap:{gap}px;margin:20px 0;">
  <div style="background:{bg1};padding:20px;border-radius:8px;border:1px solid {border1};">
    {content1}
  </div>
  <div style="background:{bg2};padding:20px;border-radius:8px;border:1px solid {border2};">
    {content2}
  </div>
</div>
```

### Three-Column Template

```html
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:{gap}px;margin:20px 0;">
  <div style="background:{bg1};padding:20px;border-radius:8px;border:2px solid {border1};text-align:center;">
    {content1}
  </div>
  <div style="background:{bg2};padding:20px;border-radius:8px;border:2px solid {border2};text-align:center;">
    {content2}
  </div>
  <div style="background:{bg3};padding:20px;border-radius:8px;border:2px solid {border3};text-align:center;">
    {content3}
  </div>
</div>
```

### Sidebar Template (Main + Sidebar)

```html
<div style="display:grid;grid-template-columns:2fr 1fr;gap:20px;margin:20px 0;">
  <div style="background:#FFFFFF;padding:25px;border-radius:8px;border:1px solid #E0E0E0;">
    {mainContent}
  </div>
  <div style="background:{sidebarBg};padding:20px;border-radius:8px;border:2px solid {sidebarBorder};">
    {sidebarContent}
  </div>
</div>
```

---

## 📊 Layout Guide

### Column Distribution Patterns

| Layout Type | Grid Template | Use Case |
|:---|:---|:---|
| **Equal 2-Column** | `1fr 1fr` | Side-by-side comparison |
| **Equal 3-Column** | `1fr 1fr 1fr` | Status categories, metrics |
| **Equal 4-Column** | `repeat(4,1fr)` | Dashboard KPIs |
| **70/30 Sidebar** | `2fr 1fr` | Main content + quick reference |
| **60/40 Split** | `3fr 2fr` | Content + detailed sidebar |
| **25/50/25** | `1fr 2fr 1fr` | Featured center content |

### Gap Sizing Recommendations

| Gap Size | Use Case |
|:---:|:---|
| **15px** | Tight spacing (4-column grids) |
| **20px** | Standard spacing (2-3 columns) |
| **30px** | Loose spacing (emphasis) |
| **40px** | Very loose (distinct sections) |

---

## 📋 Usage Guidelines

### When to Use Multi-Column Layouts

**✅ DO use for:**
- SWOT analysis (2x2 or 4-column)
- Before/after comparisons
- Dashboard metrics (4-column)
- Main content with sidebar references
- Status category summaries (3-column)
- Feature comparison tables

**❌ DON'T use for:**
- Long continuous text (hard to read)
- Mobile-first content (won't collapse well)
- Simple lists (overkill)
- Very wide content (6+ columns)

### Best Practices

1. **Limit to 4 columns max** - More becomes cluttered
2. **Use consistent gap spacing** - 15-20px standard
3. **Balance content length** - Columns should be similar height
4. **Color-code by meaning** - Green=good, orange=warning, etc.
5. **Responsive consideration** - May break on narrow screens
6. **Border and shadow** - Add visual separation
7. **Center-align numbers** - For metric cards

---

## 📚 Usage Examples

### QMS Manual - SWOT Analysis Section

```markdown
## 4. Strategic Context

Our current strategic position:

<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0;">
  
  <div style="background:#E8F5E9;padding:20px;border-radius:8px;border:2px solid #4CAF50;">
    <h4 style="margin-top:0;color:#2E7D32;">✅ Strengths</h4>
    [... content ...]
  </div>
  
  <div style="background:#FFF3E0;padding:20px;border-radius:8px;border:2px solid #FF9800;">
    <h4 style="margin-top:0;color:#E65100;">⚠️ Weaknesses</h4>
    [... content ...]
  </div>
  
</div>
```

### SOP - Dashboard Metrics

```markdown
## 9. Performance Metrics

Current quality metrics overview:

<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin:20px 0;">
  [... 4 metric cards ...]
</div>
```

---

## ✅ Quality Checklist

Before using multi-column layouts, verify:
- [ ] Column count is ≤4 for readability
- [ ] Gap spacing is consistent (15-20px)
- [ ] Content length is balanced across columns
- [ ] Border colors match content purpose
- [ ] Background gradients are subtle
- [ ] Text is left-aligned (except metric cards)
- [ ] Box shadows are applied (if appropriate)
- [ ] Grid template columns use `fr` units
- [ ] Margin is 20px top/bottom

---

**Created:** January 29, 2026  
**Version:** 1.0  
**Maintained By:** Document Controller  
**Classification:** CONTROLLED
