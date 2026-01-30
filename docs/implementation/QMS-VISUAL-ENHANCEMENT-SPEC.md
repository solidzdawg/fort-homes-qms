# FORT HOMES QMS VISUAL ENHANCEMENT SPECIFICATION
## Implementation Guide for Cutting-Edge Documentation Design

---

<div align="center">

| **Document ID** | **QMS-VISUAL-SPEC-2026** |
|:---|:---|
| **Version** | 1.0 |
| **Effective Date** | January 29, 2026 |
| **Target Completion** | March 15, 2026 (6 weeks) |
| **Status** | <span style="background:#2196F3;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;">📝 SPECIFICATION</span> |

</div>

---

## 🎯 PURPOSE

This specification defines the complete implementation plan for modernizing Fort Homes QMS visual standards based on research findings. It provides copy-paste ready code templates, implementation priorities, and quality standards for achieving enterprise-grade documentation.

---

## 📊 IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Week 1-2) - 20 Hours

| Task ID | Task | Priority | Effort | Deliverable |
|:---:|:---|:---:|:---:|:---|
| **V1.1** | Create badge component library | 🔴 Critical | 4h | COMPONENT-LIBRARY-BADGES.md |
| **V1.2** | Update all document status indicators | 🔴 Critical | 4h | 56 documents updated |
| **V1.3** | Create KPI dashboard card templates | 🔴 Critical | 6h | COMPONENT-LIBRARY-KPI-CARDS.md |
| **V1.4** | Implement enhanced table styles | 🔴 Critical | 6h | COMPONENT-LIBRARY-TABLES.md |

### Phase 2: Enhancement (Week 3-4) - 22 Hours

| Task ID | Task | Priority | Effort | Deliverable |
|:---:|:---|:---:|:---:|:---|
| **V2.1** | Create collapsible section library | 🟡 High | 4h | COMPONENT-LIBRARY-COLLAPSIBLE.md |
| **V2.2** | Implement multi-column layouts | 🟡 High | 8h | COMPONENT-LIBRARY-LAYOUTS.md |
| **V2.3** | Enhance Mermaid diagram templates | 🟡 High | 6h | Update MERMAID-DIAGRAM-LIBRARY.md |
| **V2.4** | Create progress bar components | 🟡 High | 4h | COMPONENT-LIBRARY-PROGRESS.md |

### Phase 3: Advanced Features (Week 5-6) - 26 Hours

| Task ID | Task | Priority | Effort | Deliverable |
|:---:|:---|:---:|:---:|:---|
| **V3.1** | Build HTML dashboard templates | 🟢 Medium | 12h | templates/html/dashboard-template.html |
| **V3.2** | Create heatmap table generator | 🟢 Medium | 6h | COMPONENT-LIBRARY-HEATMAPS.md |
| **V3.3** | Implement compliance badge system | 🟢 Medium | 4h | COMPONENT-LIBRARY-COMPLIANCE.md |
| **V3.4** | Create tab-style content templates | 🟢 Medium | 4h | COMPONENT-LIBRARY-TABS.md |

**Total Effort:** 68 hours over 6 weeks (11-12 hours/week)

---

## 📦 COMPONENT LIBRARY TEMPLATES

### 1. BADGE COMPONENTS

#### 1.1 Document Status Badges

**File:** `docs/style-guide/components/COMPONENT-LIBRARY-BADGES.md`

```html
<!-- ACTIVE STATUS -->
<span style="background:#4CAF50;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">✅ ACTIVE</span>

<!-- UNDER REVIEW -->
<span style="background:#FF9800;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">⚠️ UNDER REVIEW</span>

<!-- DRAFT -->
<span style="background:#2196F3;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">📝 DRAFT</span>

<!-- IN REVISION -->
<span style="background:#9C27B0;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">🔄 IN REVISION</span>

<!-- OBSOLETE -->
<span style="background:#F44336;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">❌ OBSOLETE</span>

<!-- ARCHIVED -->
<span style="background:#607D8B;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;display:inline-block;">📦 ARCHIVED</span>
```

#### 1.2 Compliance Status Badges

```html
<!-- COMPLIANT -->
<span style="background:#4CAF50;color:white;padding:6px 14px;border-radius:16px;font-weight:bold;font-size:12px;display:inline-flex;align-items:center;gap:6px;">
  ✅ COMPLIANT
</span>

<!-- CONDITIONAL -->
<span style="background:#FF9800;color:white;padding:6px 14px;border-radius:16px;font-weight:bold;font-size:12px;display:inline-flex;align-items:center;gap:6px;">
  ⚠️ CONDITIONAL
</span>

<!-- NON-COMPLIANT -->
<span style="background:#F44336;color:white;padding:6px 14px;border-radius:16px;font-weight:bold;font-size:12px;display:inline-flex;align-items:center;gap:6px;">
  ❌ NON-COMPLIANT
</span>

<!-- PENDING REVIEW -->
<span style="background:#2196F3;color:white;padding:6px 14px;border-radius:16px;font-weight:bold;font-size:12px;display:inline-flex;align-items:center;gap:6px;">
  🔍 PENDING REVIEW
</span>
```

#### 1.3 Hold Point Badges

```html
<!-- HOLD POINT -->
<span style="background:#FF9800;color:white;padding:8px 16px;border-radius:20px;font-weight:bold;font-size:14px;display:inline-flex;align-items:center;gap:8px;box-shadow:0 2px 4px rgba(0,0,0,0.2);">
  🎯 HOLD POINT HP-1
</span>

<!-- HOLD POINT WITH TPIA -->
<span style="background:linear-gradient(135deg,#FF9800 0%,#F57C00 100%);color:white;padding:8px 16px;border-radius:20px;font-weight:bold;font-size:14px;display:inline-flex;align-items:center;gap:8px;box-shadow:0 2px 4px rgba(0,0,0,0.2);">
  🎯 HP-4 TPIA REQUIRED
</span>
```

---

### 2. KPI DASHBOARD CARDS

**File:** `docs/style-guide/components/COMPONENT-LIBRARY-KPI-CARDS.md`

#### 2.1 Single KPI Card

```html
<div style="background:linear-gradient(135deg,#4CAF50 0%,#2E7D32 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);min-width:220px;">
  <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">✅ TPIA Pass Rate</div>
  <div style="font-size:42px;font-weight:bold;margin:12px 0;">98.1%</div>
  <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
    ▲ +1.9% vs Q4 2025
  </div>
</div>
```

#### 2.2 Four-Card KPI Dashboard

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
  
  <!-- Card 2: Production Volume -->
  <div style="background:linear-gradient(135deg,#2196F3 0%,#1565C0 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
    <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">📦 Units Produced</div>
    <div style="font-size:42px;font-weight:bold;margin:12px 0;">47</div>
    <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
      ▲ +12 units vs Q4 2025
    </div>
  </div>
  
  <!-- Card 3: Quality Issues -->
  <div style="background:linear-gradient(135deg,#FF9800 0%,#E65100 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
    <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">📋 Open NCRs</div>
    <div style="font-size:42px;font-weight:bold;margin:12px 0;">7</div>
    <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
      ▼ -3 fewer vs Q4 2025
    </div>
  </div>
  
  <!-- Card 4: Cycle Time -->
  <div style="background:linear-gradient(135deg,#9C27B0 0%,#6A1B9A 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
    <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">⏱️ Avg Cycle Time</div>
    <div style="font-size:42px;font-weight:bold;margin:12px 0;">12.7d</div>
    <div style="font-size:13px;opacity:0.85;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.3);">
      ▲ +0.2d vs Q4 2025
    </div>
  </div>
</div>
```

---

### 3. ENHANCED TABLE TEMPLATES

**File:** `docs/style-guide/components/COMPONENT-LIBRARY-TABLES.md`

#### 3.1 Status Table with Badges

```markdown
| Document | ID | Owner | Status | Last Review | Next Review |
|:---|:---:|:---|:---:|:---:|:---:|
| Quality Manual | QMS-001 | CEO | <span style="background:#4CAF50;color:white;padding:2px 8px;border-radius:3px;font-weight:bold;font-size:11px;">✅ ACTIVE</span> | 2026-01-15 | 2027-01-15 |
| Operations | QMS-005 | Ops Mgr | <span style="background:#4CAF50;color:white;padding:2px 8px;border-radius:3px;font-weight:bold;font-size:11px;">✅ ACTIVE</span> | 2026-01-15 | 2027-01-15 |
| Risk Management | QMS-008 | QA Mgr | <span style="background:#FF9800;color:white;padding:2px 8px;border-radius:3px;font-weight:bold;font-size:11px;">⚠️ REVIEW</span> | 2025-12-01 | 2026-06-01 |
```

#### 3.2 Metrics Table with Trends

```markdown
| Metric | Q3 2025 | Q4 2025 | Q1 2026 | Trend | Target | Status |
|:---|---:|---:|---:|:---:|---:|:---:|
| **NCR Rate** | 2.4% | 2.1% | 1.8% | <span style="color:#4CAF50;font-weight:bold;">▼ -0.6%</span> | <2.0% | <span style="background:#4CAF50;color:white;padding:2px 6px;border-radius:3px;font-size:10px;">✅</span> |
| **TPIA Pass Rate** | 96.2% | 97.5% | 98.1% | <span style="color:#4CAF50;font-weight:bold;">▲ +1.9%</span> | >97% | <span style="background:#4CAF50;color:white;padding:2px 6px;border-radius:3px;font-size:10px;">✅</span> |
| **On-Time Delivery** | 88.3% | 91.2% | 93.5% | <span style="color:#4CAF50;font-weight:bold;">▲ +5.2%</span> | >90% | <span style="background:#4CAF50;color:white;padding:2px 6px;border-radius:3px;font-size:10px;">✅</span> |
| **Cycle Time (days)** | 13.2 | 12.9 | 12.7 | <span style="color:#4CAF50;font-weight:bold;">▼ -0.5d</span> | <13.0 | <span style="background:#4CAF50;color:white;padding:2px 6px;border-radius:3px;font-size:10px;">✅</span> |
```

#### 3.3 Risk Heatmap Table

```html
<table style="width:100%;border-collapse:collapse;text-align:center;margin:20px 0;">
<thead>
  <tr style="background:#2D5016;color:white;">
    <th style="padding:12px;border:1px solid #ccc;text-align:left;">Process Phase</th>
    <th style="padding:12px;border:1px solid #ccc;">Safety Risk</th>
    <th style="padding:12px;border:1px solid #ccc;">Quality Risk</th>
    <th style="padding:12px;border:1px solid #ccc;">Compliance Risk</th>
    <th style="padding:12px;border:1px solid #ccc;">Schedule Risk</th>
    <th style="padding:12px;border:1px solid #ccc;">Overall Risk</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td style="padding:10px;border:1px solid #ccc;text-align:left;font-weight:bold;">Phase 1: Chassis & Floor</td>
    <td style="padding:10px;border:1px solid #ccc;background:#FFF9C4;">⚠️ Medium</td>
    <td style="padding:10px;border:1px solid #ccc;background:#C8E6C9;">✅ Low</td>
    <td style="padding:10px;border:1px solid #ccc;background:#C8E6C9;">✅ Low</td>
    <td style="padding:10px;border:1px solid #ccc;background:#C8E6C9;">✅ Low</td>
    <td style="padding:10px;border:1px solid #ccc;background:#FFF9C4;font-weight:bold;">MEDIUM</td>
  </tr>
  <tr>
    <td style="padding:10px;border:1px solid #ccc;text-align:left;font-weight:bold;">Phase 2: Wall Framing</td>
    <td style="padding:10px;border:1px solid #ccc;background:#FFCDD2;">🔴 High</td>
    <td style="padding:10px;border:1px solid #ccc;background:#FFF9C4;">⚠️ Medium</td>
    <td style="padding:10px;border:1px solid #ccc;background:#C8E6C9;">✅ Low</td>
    <td style="padding:10px;border:1px solid #ccc;background:#FFF9C4;">⚠️ Medium</td>
    <td style="padding:10px;border:1px solid #ccc;background:#FFCDD2;font-weight:bold;">HIGH</td>
  </tr>
  <tr>
    <td style="padding:10px;border:1px solid #ccc;text-align:left;font-weight:bold;">Phase 4: MEP Rough-In</td>
    <td style="padding:10px;border:1px solid #ccc;background:#FFCDD2;">🔴 High</td>
    <td style="padding:10px;border:1px solid #ccc;background:#FFCDD2;">🔴 High</td>
    <td style="padding:10px;border:1px solid #ccc;background:#FFF9C4;">⚠️ Medium</td>
    <td style="padding:10px;border:1px solid #ccc;background:#FFCDD2;">🔴 High</td>
    <td style="padding:10px;border:1px solid #ccc;background:#B71C1C;color:white;font-weight:bold;">CRITICAL</td>
  </tr>
</tbody>
</table>
```

---

### 4. PROGRESS BAR COMPONENTS

**File:** `docs/style-guide/components/COMPONENT-LIBRARY-PROGRESS.md`

#### 4.1 Basic Progress Bar

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

#### 4.2 Multi-Bar Comparison

```html
<div style="margin:20px 0;">
  <!-- Bar 1: Excellent -->
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
  
  <!-- Bar 2: Good -->
  <div style="margin:15px 0;">
    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
      <span style="font-weight:600;">⚠️ Document Control (Current)</span>
      <span style="font-weight:600;color:#FF9800;">93.1% (Target: 100%)</span>
    </div>
    <div style="background:#E0E0E0;height:24px;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(90deg,#FF9800 0%,#E65100 100%);width:93.1%;height:100%;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;color:white;font-weight:bold;font-size:12px;">
        93.1%
      </div>
    </div>
  </div>
  
  <!-- Bar 3: Needs Improvement -->
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

---

### 5. COLLAPSIBLE SECTIONS

**File:** `docs/style-guide/components/COMPONENT-LIBRARY-COLLAPSIBLE.md`

#### 5.1 Basic Collapsible

```html
<details>
<summary style="cursor:pointer;background:#E3F2FD;padding:12px;border-radius:6px;font-weight:bold;margin:10px 0;">
📋 Click to Expand: Detailed Material Specifications
</summary>
<div style="padding:15px;background:#F5F5F5;border-left:4px solid #2196F3;">

[Content goes here]

</div>
</details>
```

#### 5.2 Hold Point Collapsible (Orange Theme)

```html
<details>
<summary style="cursor:pointer;background:#FFF3E0;padding:12px 16px;border-radius:6px;font-weight:bold;margin:10px 0;border-left:4px solid #FF9800;">
🎯 Click to Expand: HP-1 HOLD POINT Requirements
</summary>
<div style="padding:20px;background:#FFF8E1;border-left:4px solid #FF9800;">

**MANDATORY INSPECTION CRITERIA:**

1. ✅ Floor system structural integrity verified
2. ✅ Joist spacing within ±¼" tolerance
3. ✅ Rim board fastening per schedule (100% coverage)
4. ✅ Subfloor sheathing gaps within spec
5. ✅ Adhesive coverage >90%

**TPIA MUST SIGN-OFF BEFORE PROCEEDING**

</div>
</details>
```

---

### 6. MULTI-COLUMN LAYOUTS

**File:** `docs/style-guide/components/COMPONENT-LIBRARY-LAYOUTS.md`

#### 6.1 Sidebar + Main Content

```html
<div style="display:grid;grid-template-columns:250px 1fr;gap:20px;margin:20px 0;">
  <!-- Sidebar -->
  <aside style="background:#F5F5F5;padding:20px;border-radius:8px;">
    <h4 style="margin-top:0;color:#2D5016;">📋 Quick Links</h4>
    <ul style="list-style:none;padding:0;">
      <li style="margin:10px 0;"><a href="#references">→ References</a></li>
      <li style="margin:10px 0;"><a href="#roles">→ Roles & RACI</a></li>
      <li style="margin:10px 0;"><a href="#procedure">→ Procedure</a></li>
      <li style="margin:10px 0;"><a href="#holdpoints">→ Hold Points</a></li>
    </ul>
    <hr style="border:1px solid #ddd;margin:20px 0;">
    <h4 style="color:#2D5016;">⏱️ Timeline</h4>
    <p style="font-size:14px;"><strong>Standard:</strong> 2.0 days</p>
    <p style="font-size:14px;"><strong>Hold Point:</strong> HP-2</p>
  </aside>
  
  <!-- Main Content -->
  <main>
    <h3>7. Detailed Procedure</h3>
    <p>Main content goes here...</p>
  </main>
</div>
```

#### 6.2 Two-Column Comparison Layout

```html
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0;">
  <!-- Column 1 -->
  <div style="background:#E8F5E9;padding:20px;border-radius:8px;border-left:4px solid #4CAF50;">
    <h4 style="margin-top:0;color:#2E7D32;">✅ DO: Correct Procedure</h4>
    <ul>
      <li>Apply adhesive in continuous ¼" bead</li>
      <li>Verify joist crown orientation (up)</li>
      <li>Check spacing with tape measure (±¼")</li>
      <li>Install fasteners per schedule</li>
    </ul>
  </div>
  
  <!-- Column 2 -->
  <div style="background:#FFEBEE;padding:20px;border-radius:8px;border-left:4px solid #F44336;">
    <h4 style="margin-top:0;color:#C62828;">❌ DON'T: Common Mistakes</h4>
    <ul>
      <li>Skipping adhesive application</li>
      <li>Ignoring joist crown direction</li>
      <li>Eyeballing spacing without measurement</li>
      <li>Under-driving or over-driving fasteners</li>
    </ul>
  </div>
</div>
```

---

## 🎯 IMPLEMENTATION INSTRUCTIONS

### Step 1: Create Component Library (Week 1)

1. **Create folder structure:**
   ```
   docs/style-guide/components/
   ├── COMPONENT-LIBRARY-BADGES.md
   ├── COMPONENT-LIBRARY-KPI-CARDS.md
   ├── COMPONENT-LIBRARY-TABLES.md
   ├── COMPONENT-LIBRARY-PROGRESS.md
   ├── COMPONENT-LIBRARY-COLLAPSIBLE.md
   └── COMPONENT-LIBRARY-LAYOUTS.md
   ```

2. **Copy templates from this specification** into each file

3. **Add usage examples** to each component library file

4. **Update QMS-VISUAL-STYLE-GUIDE.md** with links to new components

### Step 2: Update Existing Documents (Week 2)

**Priority Order:**
1. QMS Manual sections (QMS-001 through QMS-010) - **10 documents**
2. Core SOPs (SOP-001 through SOP-020) - **20 documents**
3. Production SOPs (SOP-101 through SOP-108) - **8 documents**
4. Work Instructions (WI-001 through WI-016) - **16 documents**
5. Inspection Forms (FORM-I001 through FORM-I008) - **8 documents**

**Changes per document:**
- Replace text status with badge components
- Add KPI dashboard card to header (if metrics available)
- Convert basic tables to enhanced tables with trends
- Add progress bars for completion metrics
- Implement collapsible sections for detailed content

**Estimated time:** 30 minutes per document × 56 documents = **28 hours**  
**Actual Phase 1-2 allocation:** 20 hours (focus on high-impact documents first)

### Step 3: Create Template Updates (Week 3-4)

1. **Update SOP-TEMPLATE.md** with new components
2. **Update WI-TEMPLATE.md** with enhanced visuals
3. **Update FORM-TEMPLATE.md** with new tables
4. **Update MANUAL-SECTION-TEMPLATE.md** with KPI cards

### Step 4: Build HTML Dashboards (Week 5-6)

1. **Create template:** `templates/html/qms-dashboard-template.html`
2. **Integrate Chart.js** for interactive charts
3. **Add export-to-image functionality**
4. **Link from QMS Manual sections**

---

## 📋 QUALITY CHECKLIST

Before marking any document as complete, verify:

### Visual Quality
- [ ] All status indicators use badge components (not plain text)
- [ ] KPI metrics displayed in dashboard cards (where applicable)
- [ ] Tables use appropriate styling (badges, trends, heatmaps)
- [ ] Progress bars used for completion percentages
- [ ] Collapsible sections used for detailed/optional content
- [ ] Multi-column layouts used for comparisons
- [ ] Color coding follows Fort Homes palette
- [ ] Typography hierarchy is clear and consistent

### Technical Quality
- [ ] HTML renders correctly on GitHub
- [ ] Markdown fallback works if HTML fails
- [ ] Links are functional
- [ ] Images load properly
- [ ] Print-friendly (test with browser print preview)
- [ ] Mobile-responsive (test on narrow screen)
- [ ] Accessibility: color contrast meets WCAG AA
- [ ] No broken formatting or syntax errors

### Content Quality
- [ ] All data is accurate and current
- [ ] Metrics have target values specified
- [ ] Trends show correct direction (▲▼─)
- [ ] Status badges reflect actual document state
- [ ] Compliance information is up-to-date
- [ ] Cross-references are accurate
- [ ] No ISO 9001 references (unless in meta-documentation)

---

## 📊 SUCCESS METRICS

Track progress using this dashboard:

| Metric | Target | Current | Status |
|:---|:---:|:---:|:---:|
| **Documents Updated** | 56 | 0 | <span style="background:#F44336;color:white;padding:2px 8px;border-radius:3px;font-size:10px;">0%</span> |
| **Component Libraries Created** | 6 | 0 | <span style="background:#F44336;color:white;padding:2px 8px;border-radius:3px;font-size:10px;">0%</span> |
| **Templates Updated** | 4 | 0 | <span style="background:#F44336;color:white;padding:2px 8px;border-radius:3px;font-size:10px;">0%</span> |
| **HTML Dashboards** | 3 | 0 | <span style="background:#F44336;color:white;padding:2px 8px;border-radius:3px;font-size:10px;">0%</span> |
| **Quality Checks Passed** | 100% | 0% | <span style="background:#F44336;color:white;padding:2px 8px;border-radius:3px;font-size:10px;">0%</span> |

**Update this dashboard weekly during implementation.**

---

## 🚀 QUICK START GUIDE

### For Document Authors

**To add a status badge:**
```html
<span style="background:#4CAF50;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:11px;">✅ ACTIVE</span>
```

**To add a KPI card:**
```html
<div style="background:linear-gradient(135deg,#4CAF50 0%,#2E7D32 100%);color:white;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);min-width:220px;">
  <div style="font-size:14px;opacity:0.9;margin-bottom:8px;font-weight:500;">✅ Metric Name</div>
  <div style="font-size:42px;font-weight:bold;margin:12px 0;">98.1%</div>
  <div style="font-size:13px;opacity:0.85;margin-top:8px;">▲ +1.9% vs baseline</div>
</div>
```

**To add a progress bar:**
```html
<div style="background:#E0E0E0;height:24px;border-radius:12px;overflow:hidden;">
  <div style="background:linear-gradient(90deg,#4CAF50 0%,#2E7D32 100%);width:98.2%;height:100%;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;color:white;font-weight:bold;font-size:12px;">
    98.2%
  </div>
</div>
```

**To add collapsible content:**
```html
<details>
<summary style="cursor:pointer;background:#E3F2FD;padding:12px;border-radius:6px;font-weight:bold;">
📋 Click to Expand
</summary>
<div style="padding:15px;background:#F5F5F5;">
Content here
</div>
</details>
```

---

## 📚 REFERENCES

- [QMS-VISUAL-MODERNIZATION-RESEARCH.md](./QMS-VISUAL-MODERNIZATION-RESEARCH.md) - Research findings
- [QMS-VISUAL-STYLE-GUIDE.md](../style-guide/QMS-VISUAL-STYLE-GUIDE.md) - Base style standards
- [MERMAID-DIAGRAM-LIBRARY.md](../style-guide/MERMAID-DIAGRAM-LIBRARY.md) - Chart templates
- Material Design 3 (Google) - Component design principles
- WCAG 2.1 Level AA - Accessibility standards

---

## ✅ APPROVAL

| Role | Name | Signature | Date |
|:---|:---|:---|:---|
| **Document Controller** | — | — | — |
| **Quality Manager** | — | — | — |
| **IT/Systems** | — | — | — |

---

**Document Status:** <span style="background:#2196F3;color:white;padding:4px 12px;border-radius:12px;font-weight:bold;">📝 READY FOR IMPLEMENTATION</span>

**Next Actions:**
1. Review specification with Document Controller
2. Approve 6-week implementation timeline
3. Assign component library creation (Week 1)
4. Schedule training session for document authors
5. Begin Phase 1 implementation

---

**Created:** January 29, 2026  
**Version:** 1.0  
**Classification:** CONTROLLED
