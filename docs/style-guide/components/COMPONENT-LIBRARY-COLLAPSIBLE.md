# Component Library: Collapsible Sections
## Expandable Detail Sections for Complex Content

---

<div align="center">

| **Library ID** | **COMP-COLLAPSE-004** |
|:---|:---|
| **Version** | 1.0 |
| **Created** | January 29, 2026 |
| **Purpose** | Collapsible/expandable sections for managing document length and complexity |

</div>

---

## 🎯 Purpose

Collapsible sections that hide detailed content until needed, reducing visual clutter and improving document navigation. Perfect for technical details, reference data, and supplementary information.

---

## 📦 Basic Collapsible Section

### Simple Details/Summary Element

```html
<details style="margin:20px 0;border:1px solid #E0E0E0;border-radius:8px;padding:15px;background:#FAFAFA;">
  <summary style="cursor:pointer;font-weight:bold;font-size:16px;color:#2D5016;list-style:none;display:flex;align-items:center;">
    <span style="margin-right:10px;">▶</span> Click to Expand: Technical Details
  </summary>
  <div style="margin-top:15px;padding-top:15px;border-top:1px solid #E0E0E0;">
    <!-- Hidden content goes here -->
    <p>This content is hidden until the user clicks the summary.</p>
    <ul>
      <li>Technical specification 1</li>
      <li>Technical specification 2</li>
      <li>Technical specification 3</li>
    </ul>
  </div>
</details>
```

**Renders:**

<details style="margin:20px 0;border:1px solid #E0E0E0;border-radius:8px;padding:15px;background:#FAFAFA;">
  <summary style="cursor:pointer;font-weight:bold;font-size:16px;color:#2D5016;list-style:none;display:flex;align-items:center;">
    <span style="margin-right:10px;">▶</span> Click to Expand: Technical Details
  </summary>
  <div style="margin-top:15px;padding-top:15px;border-top:1px solid #E0E0E0;">
    <p>This content is hidden until the user clicks the summary.</p>
    <ul>
      <li>Technical specification 1</li>
      <li>Technical specification 2</li>
      <li>Technical specification 3</li>
    </ul>
  </div>
</details>

---

## 🎨 Color Variants

### Success Collapsible (Green)

```html
<details style="margin:20px 0;border:2px solid #4CAF50;border-radius:8px;padding:15px;background:linear-gradient(135deg,#E8F5E9 0%,#F1F8F1 100%);">
  <summary style="cursor:pointer;font-weight:bold;font-size:16px;color:#2E7D32;list-style:none;display:flex;align-items:center;">
    <span style="margin-right:10px;">✅</span> Compliance Details: HUD Code Requirements
  </summary>
  <div style="margin-top:15px;padding-top:15px;border-top:2px solid #4CAF50;">
    <p><strong>Regulation:</strong> 24 CFR Part 3280</p>
    <p><strong>Applicable Sections:</strong> 3280.101, 3280.102, 3280.103</p>
    <p><strong>Compliance Status:</strong> Fully compliant as of January 2026</p>
  </div>
</details>
```

**Renders:**

<details style="margin:20px 0;border:2px solid #4CAF50;border-radius:8px;padding:15px;background:linear-gradient(135deg,#E8F5E9 0%,#F1F8F1 100%);">
  <summary style="cursor:pointer;font-weight:bold;font-size:16px;color:#2E7D32;list-style:none;display:flex;align-items:center;">
    <span style="margin-right:10px;">✅</span> Compliance Details: HUD Code Requirements
  </summary>
  <div style="margin-top:15px;padding-top:15px;border-top:2px solid #4CAF50;">
    <p><strong>Regulation:</strong> 24 CFR Part 3280</p>
    <p><strong>Applicable Sections:</strong> 3280.101, 3280.102, 3280.103</p>
    <p><strong>Compliance Status:</strong> Fully compliant as of January 2026</p>
  </div>
</details>

---

### Warning Collapsible (Orange)

```html
<details style="margin:20px 0;border:2px solid #FF9800;border-radius:8px;padding:15px;background:linear-gradient(135deg,#FFF3E0 0%,#FFF8F1 100%);">
  <summary style="cursor:pointer;font-weight:bold;font-size:16px;color:#E65100;list-style:none;display:flex;align-items:center;">
    <span style="margin-right:10px;">⚠️</span> Important: Special Handling Requirements
  </summary>
  <div style="margin-top:15px;padding-top:15px;border-top:2px solid #FF9800;">
    <p><strong>Warning:</strong> This material requires special handling procedures.</p>
    <ul>
      <li>Use protective equipment at all times</li>
      <li>Store in designated area only</li>
      <li>Review SDS before use</li>
    </ul>
  </div>
</details>
```

**Renders:**

<details style="margin:20px 0;border:2px solid #FF9800;border-radius:8px;padding:15px;background:linear-gradient(135deg,#FFF3E0 0%,#FFF8F1 100%);">
  <summary style="cursor:pointer;font-weight:bold;font-size:16px;color:#E65100;list-style:none;display:flex;align-items:center;">
    <span style="margin-right:10px;">⚠️</span> Important: Special Handling Requirements
  </summary>
  <div style="margin-top:15px;padding-top:15px;border-top:2px solid #FF9800;">
    <p><strong>Warning:</strong> This material requires special handling procedures.</p>
    <ul>
      <li>Use protective equipment at all times</li>
      <li>Store in designated area only</li>
      <li>Review SDS before use</li>
    </ul>
  </div>
</details>

---

### Information Collapsible (Blue)

```html
<details style="margin:20px 0;border:2px solid #2196F3;border-radius:8px;padding:15px;background:linear-gradient(135deg,#E3F2FD 0%,#F1F8FE 100%);">
  <summary style="cursor:pointer;font-weight:bold;font-size:16px;color:#1565C0;list-style:none;display:flex;align-items:center;">
    <span style="margin-right:10px;">ℹ️</span> Reference Information: Related Documents
  </summary>
  <div style="margin-top:15px;padding-top:15px;border-top:2px solid #2196F3;">
    <p><strong>Related SOPs:</strong></p>
    <ul>
      <li>SOP-002: Document Control</li>
      <li>SOP-005: Internal Audits</li>
      <li>SOP-007: Corrective Actions</li>
    </ul>
  </div>
</details>
```

**Renders:**

<details style="margin:20px 0;border:2px solid #2196F3;border-radius:8px;padding:15px;background:linear-gradient(135deg,#E3F2FD 0%,#F1F8FE 100%);">
  <summary style="cursor:pointer;font-weight:bold;font-size:16px;color:#1565C0;list-style:none;display:flex;align-items:center;">
    <span style="margin-right:10px;">ℹ️</span> Reference Information: Related Documents
  </summary>
  <div style="margin-top:15px;padding-top:15px;border-top:2px solid #2196F3;">
    <p><strong>Related SOPs:</strong></p>
    <ul>
      <li>SOP-002: Document Control</li>
      <li>SOP-005: Internal Audits</li>
      <li>SOP-007: Corrective Actions</li>
    </ul>
  </div>
</details>

---

## 📚 Nested Collapsible Sections

### Parent-Child Collapsible Structure

```html
<details style="margin:20px 0;border:2px solid #2D5016;border-radius:8px;padding:15px;background:#F5F5F5;">
  <summary style="cursor:pointer;font-weight:bold;font-size:18px;color:#2D5016;list-style:none;">
    <span style="margin-right:10px;">📂</span> Section 4: Quality Objectives
  </summary>
  <div style="margin-top:15px;padding-left:15px;">
    
    <!-- Child Collapsible 1 -->
    <details style="margin:15px 0;border:1px solid #4CAF50;border-radius:6px;padding:12px;background:white;">
      <summary style="cursor:pointer;font-weight:600;font-size:16px;color:#2E7D32;list-style:none;">
        <span style="margin-right:8px;">▶</span> 4.1 Customer Satisfaction
      </summary>
      <div style="margin-top:12px;padding-top:12px;border-top:1px solid #E0E0E0;">
        <p><strong>Target:</strong> ≥95% customer satisfaction score</p>
        <p><strong>Measurement:</strong> Annual customer surveys</p>
      </div>
    </details>
    
    <!-- Child Collapsible 2 -->
    <details style="margin:15px 0;border:1px solid #4CAF50;border-radius:6px;padding:12px;background:white;">
      <summary style="cursor:pointer;font-weight:600;font-size:16px;color:#2E7D32;list-style:none;">
        <span style="margin-right:8px;">▶</span> 4.2 Production Efficiency
      </summary>
      <div style="margin-top:12px;padding-top:12px;border-top:1px solid #E0E0E0;">
        <p><strong>Target:</strong> ≤30 days production cycle time</p>
        <p><strong>Measurement:</strong> Weekly production reports</p>
      </div>
    </details>
    
  </div>
</details>
```

**Renders:** (See nested collapsible structure above)

---

## 🎨 Customization Template

```html
<details style="margin:20px 0;border:{borderWidth} solid {borderColor};border-radius:8px;padding:15px;background:{backgroundColor};">
  <summary style="cursor:pointer;font-weight:bold;font-size:16px;color:{textColor};list-style:none;display:flex;align-items:center;">
    <span style="margin-right:10px;">{icon}</span> {title}
  </summary>
  <div style="margin-top:15px;padding-top:15px;border-top:{borderWidth} solid {borderColor};">
    {content}
  </div>
</details>
```

**Variables:**
- `{borderWidth}`: Border thickness (1px or 2px)
- `{borderColor}`: Border color (#4CAF50, #FF9800, #2196F3, #E0E0E0)
- `{backgroundColor}`: Background gradient or solid color
- `{textColor}`: Title text color
- `{icon}`: Emoji or symbol (✅ ⚠️ ℹ️ 📂 ▶)
- `{title}`: Section title
- `{content}`: Hidden content (HTML or Markdown)

---

## 📊 Color Selection Guide

| Purpose | Border Color | Background | Text Color | Icon |
|:---|:---:|:---:|:---:|:---:|
| **Success/Compliance** | #4CAF50 | #E8F5E9 gradient | #2E7D32 | ✅ |
| **Warning/Caution** | #FF9800 | #FFF3E0 gradient | #E65100 | ⚠️ |
| **Information** | #2196F3 | #E3F2FD gradient | #1565C0 | ℹ️ |
| **Neutral/General** | #E0E0E0 | #FAFAFA | #333333 | ▶ |
| **Fort Homes Brand** | #2D5016 | #F5F5F5 | #2D5016 | 🏗️ |

---

## 📋 Usage Guidelines

### When to Use Collapsible Sections

**✅ DO use for:**
- Technical specifications and details
- Reference data and appendices
- Regulatory compliance details
- Supplementary information
- Long lists or tables
- Optional reading content
- Historical context

**❌ DON'T use for:**
- Critical safety information (must be visible)
- Mandatory procedures (should be prominent)
- Brief content (not worth hiding)
- Primary navigation (use TOC instead)

### Best Practices

1. **Clear summary text** - Title should describe what's hidden
2. **Use appropriate icons** - Visual indicators for content type
3. **Consistent styling** - Match color to content importance
4. **Logical nesting** - Max 2 levels deep for usability
5. **Accessibility** - Ensure keyboard navigation works
6. **Default state** - Usually closed; open if critical

---

## 📚 Usage Examples

### QMS Manual - Technical Appendix

```markdown
## Appendix A: HUD Code Requirements

<details style="margin:20px 0;border:2px solid #4CAF50;border-radius:8px;padding:15px;background:#E8F5E9;">
  <summary style="cursor:pointer;font-weight:bold;font-size:16px;color:#2E7D32;list-style:none;">
    <span style="margin-right:10px;">✅</span> 24 CFR Part 3280 - Full Requirements
  </summary>
  <div style="margin-top:15px;">
    [... detailed regulatory text ...]
  </div>
</details>
```

### SOP - Troubleshooting Section

```markdown
## 8. Troubleshooting

<details style="margin:20px 0;border:2px solid #FF9800;border-radius:8px;padding:15px;background:#FFF3E0;">
  <summary style="cursor:pointer;font-weight:bold;font-size:16px;color:#E65100;list-style:none;">
    <span style="margin-right:10px;">⚠️</span> Problem: Equipment Won't Start
  </summary>
  <div style="margin-top:15px;">
    <p><strong>Possible Causes:</strong></p>
    <ol>
      <li>Power supply disconnected</li>
      <li>Safety interlock engaged</li>
      <li>Emergency stop activated</li>
    </ol>
    <p><strong>Solutions:</strong> [...]</p>
  </div>
</details>
```

---

## 🔄 JavaScript-Enhanced Collapsible (Advanced)

### With Animated Icons

```html
<details style="margin:20px 0;border:2px solid #2D5016;border-radius:8px;padding:15px;background:#F5F5F5;" ontoggle="this.querySelector('span').innerText = this.open ? '▼' : '▶'">
  <summary style="cursor:pointer;font-weight:bold;font-size:16px;color:#2D5016;list-style:none;display:flex;align-items:center;">
    <span style="margin-right:10px;transition:transform 0.3s;">▶</span> Animated Expansion
  </summary>
  <div style="margin-top:15px;padding-top:15px;border-top:2px solid #2D5016;">
    <p>Content with animated icon toggle.</p>
  </div>
</details>
```

---

## ✅ Quality Checklist

Before using collapsible sections, verify:
- [ ] Summary text clearly describes hidden content
- [ ] Icon matches content type (✅ ⚠️ ℹ️)
- [ ] Border color matches severity/type
- [ ] Background gradient is subtle
- [ ] Nested sections (if any) are ≤2 levels deep
- [ ] Critical content is NOT hidden
- [ ] Keyboard navigation works (Tab key)
- [ ] Content inside is properly formatted

---

**Created:** January 29, 2026  
**Version:** 1.0  
**Maintained By:** Document Controller  
**Classification:** CONTROLLED
