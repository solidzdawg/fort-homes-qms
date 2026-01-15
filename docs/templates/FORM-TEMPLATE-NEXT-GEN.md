<div class="document-header" style="background: linear-gradient(135deg, #101810 0%, #2D5016 100%); color: white; padding: 40px; text-align: center; border-radius: 8px; margin-bottom: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <div style="font-size: 48px; font-weight: bold; letter-spacing: 2px; margin-bottom: 10px;">
    🏗️ FORT HOMES
  </div>
  <div style="font-size: 24px; font-weight: 300; letter-spacing: 1px; margin-bottom: 5px;">
    INSPECTION FORM TEMPLATE
  </div>
  <div style="font-size: 20px; font-weight: bold; margin-top: 20px; padding-top: 20px; border-top: 2px solid rgba(255,255,255,0.3);">
    Digital-Ready Inspection Forms
  </div>
  <div style="font-size: 16px; margin-top: 10px; opacity: 0.9;">
    Grand Junction, Colorado
  </div>
</div>

# FORM-[TYPE]-[NUMBER]  
## [Form Name/Title]

---

## 📋 FORM CONTROL

| **Attribute** | **Details** |
|:---|:---|
| **Form ID** | FORM-[TYPE]-[NUMBER] |
| **Version** | 1.0 |
| **Effective Date** | [YYYY-MM-DD] |
| **Form Owner** | [Role] |
| **Classification** | CONTROLLED |
| **Retention Period** | [Years per QMS-008] |
| **Storage Location** | [Physical/Electronic] |

---

## 📄 FORM HEADER (Auto-populate where possible)

<div style="background: white; padding: 20px; border: 2px solid #ddd; border-radius: 8px; margin: 20px 0;">

| Field | Value | Data Type |
|:---|:---|:---|
| **Form Number:** | _____________ | `text` |
| **Date:** | ____/____/________ | `date` |
| **Time:** | ____:____ AM/PM | `time` |
| **Module Number:** | _____________ | `text` |
| **Work Order:** | _____________ | `text` |
| **Station/Location:** | _____________ | `dropdown` |
| **Inspector Name:** | _____________ | `text` |
| **Inspector ID:** | _____________ | `text` |

</div>

---

## ✅ INSPECTION CHECKLIST

<div style="background: #f9f9f9; padding: 20px; border: 2px solid #2D5016; border-radius: 8px; margin: 20px 0;">

### Section 1: [Category Name]

| # | Inspection Item | Requirement/Spec | Status | Measurement | Comments |
|:---:|:---|:---|:---:|:---|:---|
| 1.1 | [Item description] | [Spec/Standard] | ☐ Pass<br>☐ Fail<br>☐ N/A | _______ | _______ |
| 1.2 | [Item description] | [Spec/Standard] | ☐ Pass<br>☐ Fail<br>☐ N/A | _______ | _______ |
| 1.3 | [Item description] | [Spec/Standard] | ☐ Pass<br>☐ Fail<br>☐ N/A | _______ | _______ |

**Digital Data Fields:**
```json
{
  "section_1": {
    "item_1_1": {"status": "pass/fail/na", "measurement": "", "comment": ""},
    "item_1_2": {"status": "pass/fail/na", "measurement": "", "comment": ""},
    "item_1_3": {"status": "pass/fail/na", "measurement": "", "comment": ""}
  }
}
```

</div>

<div style="background: #f9f9f9; padding: 20px; border: 2px solid #2D5016; border-radius: 8px; margin: 20px 0;">

### Section 2: [Category Name]

| # | Inspection Item | Requirement/Spec | Status | Measurement | Comments |
|:---:|:---|:---|:---:|:---|:---|
| 2.1 | [Item description] | [Spec/Standard] | ☐ Pass<br>☐ Fail<br>☐ N/A | _______ | _______ |
| 2.2 | [Item description] | [Spec/Standard] | ☐ Pass<br>☐ Fail<br>☐ N/A | _______ | _______ |

</div>

---

## 🔍 HUD CODE COMPLIANCE VERIFICATION

<div style="background: #E7F3FF; padding: 20px; border-left: 4px solid #145B8B; margin: 20px 0;">

### 24 CFR 3280 Requirements

| Subpart | Requirement | Compliant | Evidence/Notes |
|:---|:---|:---:|:---|
| 3280.[X] | [Specific requirement] | ☐ Yes<br>☐ No | _____________ |
| 3280.[Y] | [Specific requirement] | ☐ Yes<br>☐ No | _____________ |

**Digital Field:**
```json
"hud_compliance": {
  "subpart_x": {"compliant": true/false, "evidence": ""},
  "subpart_y": {"compliant": true/false, "evidence": ""}
}
```

</div>

---

## ⚡ NEC 2023 COMPLIANCE (If Applicable)

<div style="background: #FFF3CD; padding: 20px; border-left: 4px solid #8B6914; margin: 20px 0;">

### Article 550 Requirements

| Article | Requirement | Compliant | Test Result | Notes |
|:---|:---|:---:|:---|:---|
| 550.[X] | [Specific requirement] | ☐ Yes<br>☐ No | _______ | _______ |
| 550.[Y] | [Specific requirement] | ☐ Yes<br>☐ No | _______ | _______ |

**Common NEC Checks:**
- [ ] AFCI protection installed and functional
- [ ] GFCI protection where required
- [ ] Grounding and bonding verified
- [ ] Service equipment labeled
- [ ] Box fill calculations documented

</div>

---

## 📊 MEASUREMENTS & DATA

<div style="background: white; padding: 20px; border: 2px solid #ddd; border-radius: 8px; margin: 20px 0;">

### Dimensional Verification

| Dimension | Specification | Tolerance | Actual | Status |
|:---|:---:|:---:|:---:|:---:|
| [Dimension 1] | [Value] | ± [Tolerance] | _______ | ☐ OK<br>☐ Out |
| [Dimension 2] | [Value] | ± [Tolerance] | _______ | ☐ OK<br>☐ Out |
| [Dimension 3] | [Value] | ± [Tolerance] | _______ | ☐ OK<br>☐ Out |

**Digital Data Structure:**
```json
"measurements": [
  {"dimension": "name", "spec": 0.0, "tolerance": 0.0, "actual": 0.0, "status": "ok/out"},
  {"dimension": "name", "spec": 0.0, "tolerance": 0.0, "actual": 0.0, "status": "ok/out"}
]
```

</div>

---

## ⚠️ NONCONFORMANCES

<div style="background: #F8D7DA; padding: 20px; border-left: 4px solid #8B1414; margin: 20px 0;">

### Defects/Issues Found

| NC# | Description | Location | Severity | Photo# | NCR Required |
|:---:|:---|:---|:---:|:---:|:---:|
| 1 | _____________ | _______ | 🔴 🟡 🟢 | _____ | ☐ Yes ☐ No |
| 2 | _____________ | _______ | 🔴 🟡 🟢 | _____ | ☐ Yes ☐ No |
| 3 | _____________ | _______ | 🔴 🟡 🟢 | _____ | ☐ Yes ☐ No |

**Severity Legend:**
- 🔴 **Critical** - Safety/HUD Code violation - Stop work
- 🟡 **Major** - Significant defect - Requires correction
- 🟢 **Minor** - Cosmetic/minor issue - Note for improvement

**If Nonconformances Found:**
1. Document clearly above
2. Take photos (reference photo numbers)
3. Notify supervisor immediately if Critical or Major
4. Initiate NCR per SOP-004 if required
5. Do NOT proceed if Critical nonconformance

</div>

---

## 🔐 NTA TPIA HOLD POINT (If Applicable)

<div style="background: #FFE5B4; padding: 20px; border-left: 4px solid #8B6914; margin: 20px 0;">

### Third-Party Inspection Agency Approval

**Hold Point Type:** [Floor/Wall/Roof/Electrical/Plumbing/Final]

**NTA Inspector Information:**
- Inspector Name: _____________________
- Inspector ID: _______________________
- Date: ____/____/________
- Time: ____:____ AM/PM

**Inspection Result:**
- ☐ **APPROVED** - Release to next station
- ☐ **REJECTED** - Nonconformances must be corrected

**NTA Inspector Signature:** _____________________

**NTA Stamp/Seal:** [Space for official stamp]

**Digital Approval:**
```json
"nta_approval": {
  "hold_point": "type",
  "inspector_name": "",
  "inspector_id": "",
  "date_time": "ISO 8601",
  "result": "approved/rejected",
  "signature_hash": "",
  "stamp_image": "base64"
}
```

</div>

---

## 📝 INSPECTOR COMMENTS

<div style="background: white; padding: 20px; border: 2px solid #ddd; border-radius: 8px; margin: 20px 0;">

**General Comments/Observations:**

________________________________________________________________

________________________________________________________________

________________________________________________________________

________________________________________________________________

**Recommendations:**

________________________________________________________________

________________________________________________________________

**Follow-up Required:**
- ☐ Yes - Description: _____________________________________
- ☐ No

</div>

---

## 📋 SUMMARY & DISPOSITION

<div style="background: #D4EDDA; padding: 20px; border-left: 4px solid #2D5016; margin: 20px 0;">

### Inspection Summary

**Total Items Inspected:** _______  
**Items Passed:** _______  
**Items Failed:** _______  
**Items N/A:** _______

**Overall Result:**
- ☐ **PASS** - All requirements met
- ☐ **PASS WITH MINOR ISSUES** - Acceptable with notes
- ☐ **CONDITIONAL PASS** - Correct items and re-inspect
- ☐ **FAIL** - Major nonconformances - Do not proceed

**Disposition:**
- ☐ Release to next station
- ☐ Hold for correction
- ☐ Rework required
- ☐ NCR initiated (NCR #: ________)

</div>

---

## ✅ APPROVALS & SIGN-OFFS

<div style="background: white; padding: 20px; border: 2px solid #ddd; border-radius: 8px; margin: 20px 0;">

| Role | Name (Print) | Signature | Date | Time |
|:---|:---|:---|:---|:---|
| **Inspector** | _____________ | _____________ | ___/___/___ | ___:___ |
| **Supervisor** | _____________ | _____________ | ___/___/___ | ___:___ |
| **NTA TPIA** (if req'd) | _____________ | _____________ | ___/___/___ | ___:___ |
| **Quality Manager** (if req'd) | _____________ | _____________ | ___/___/___ | ___:___ |

</div>

---

## 📎 ATTACHMENTS

**Photos Attached:**
- Photo 1: ___________________ (Description)
- Photo 2: ___________________ (Description)
- Photo 3: ___________________ (Description)

**Related Documents:**
- Module Traveler #: ___________
- NCR #: ___________ (if applicable)
- CAPA #: ___________ (if applicable)

---

## 🔄 FORM REVISION HISTORY

| Version | Date | Changes | Author |
|:---|:---|:---|:---|
| 1.0 | [Date] | Initial creation | [Name] |

---

## 📱 DIGITAL FORM SCHEMA

**For Digital Implementation (JSON Schema):**

```json
{
  "form_id": "FORM-[TYPE]-[NUMBER]",
  "version": "1.0",
  "module_number": "",
  "date_time": "ISO 8601",
  "inspector": {
    "name": "",
    "id": "",
    "signature_hash": ""
  },
  "sections": [
    {
      "section_id": "1",
      "items": [
        {
          "item_id": "1.1",
          "status": "pass/fail/na",
          "measurement": "",
          "comment": ""
        }
      ]
    }
  ],
  "hud_compliance": {},
  "nec_compliance": {},
  "measurements": [],
  "nonconformances": [],
  "nta_approval": {},
  "summary": {
    "total_items": 0,
    "passed": 0,
    "failed": 0,
    "na": 0,
    "overall_result": "",
    "disposition": ""
  },
  "approvals": [],
  "attachments": []
}
```

---

**Form Classification:** CONTROLLED  
**Distribution:** Work Station, Quality Office  
**Retention:** Per QMS-008 Schedule

---

## 📝 FORM USAGE GUIDELINES

**Completing This Form:**

1. **Pre-Inspection:**
   - Verify form version is current
   - Gather required measuring tools
   - Have module traveler available
   - Review previous inspection notes

2. **During Inspection:**
   - Complete ALL applicable items
   - Document measurements precisely
   - Take photos of any issues
   - Mark N/A clearly for non-applicable items

3. **Nonconformances:**
   - Document immediately
   - Classify severity correctly
   - Notify supervisor for Critical/Major
   - Initiate NCR if required

4. **NTA TPIA Hold Points:**
   - Do NOT proceed without approval
   - Ensure inspector signs and stamps
   - File NTA inspection report with form

5. **Post-Inspection:**
   - Sign and date form
   - Obtain supervisor approval
   - Attach to module traveler
   - File per retention schedule

**Digital Form Benefits:**
- Auto-calculation of pass/fail totals
- Automatic alerts for failures
- Digital signatures with timestamps
- Photo upload integration
- Data export for analytics
- Integration with CAPA system

---

*This digital-ready inspection form template follows Fort Homes QMS standards with structured data fields for future automation and AI agent integration.*
