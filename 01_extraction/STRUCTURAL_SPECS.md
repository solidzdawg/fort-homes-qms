# CC21TE Structural Specifications Extraction

**Source:** Shop Drawing Package dated 01/19/26  
**Extraction Date:** 02/04/26  
**Extraction Discipline:** Zero-miss extraction with source traceability

---

## 1. GENERAL NOTES & CODES (Source: SM00)

### 1.1 Referenced Codes & Standards

| Code/Standard | Description | Source |
|:---|:---|:---|
| IRC 2024 | International Residential Code | SM00, General Notes |
| IBC | International Building Code | SM00, Abbreviations |
| NDS | National Design Specification | SM00, Abbreviations |
| AWC | America Wood Council | SM00, Abbreviations |
| AISC | American Institute of Steel Construction | SM00, Abbreviations |
| ACI | American Concrete Institute | SM00, Abbreviations |
| ASTM | America Society for Testing and Materials | SM00, Abbreviations |

### 1.2 Design Criteria

| Parameter | Value | Unit | Code Reference | Source |
|:---|:---|:---|:---|:---|
| Seismic Design Category | NOT TO EXCEED B | - | - | SM00, DC |
| Deflection - Floor/Roof (Live) | L/360 | - | - | SM00, DC8 |
| Deflection - Floor/Roof (Total) | L/240 | - | - | SM00, DC8 |
| Deflection - Wall Horizontal | L/240 | - | - | SM00, DC8 |
| Deflection - Wall Vertical | NA | - | - | SM00, DC8 |

### 1.3 Material Grades - Dimensional Lumber

| Material | Species | Grade | Application | Source |
|:---|:---|:---|:---|:---|
| 2x4, 2x6, 2x8 | SPF (Spruce-Pine-Fir) | #2 or better | General framing | SM00, WF8 |
| 2x10, 2x12 | DFL (Douglas Fir-Larch) | #2 | Heavy framing | SM00, WF8 |
| Treated Lumber | DFL | #2 | Foundation contact | SM00, WF8 |

### 1.4 Material Grades - Engineered Lumber

#### 1.4.1 LVL (Laminated Veneer Lumber) - 1-3/4" Thickness

| Property | Value | Unit | Source |
|:---|:---|:---|:---|
| Modulus of Elasticity, E | 2,000,000 | PSI | SM00, WF8 |
| Flexural Stress, Fb | 2,600 | PSI | SM00, WF8 |
| Tension Stress, Ft | 1,300 | PSI | SM00, WF8 |
| Compression Perpendicular to Grain, Fcp | 710 | PSI | SM00, WF8 |
| Compression Parallel to Grain, Fcll | 1,835 | PSI | SM00, WF8 |
| Shear Parallel to Grain, Fv | 425 | PSI | SM00, WF8 |
| Specific Gravity, SG | 0.50 | - | SM00, WF8 |

#### 1.4.2 LSL (Laminated Strand Lumber) - 1-1/2" Thickness

| Property | Value | Unit | Source |
|:---|:---|:---|:---|
| Modulus of Elasticity, E | 1,300,000 | PSI | SM00, WF8 |
| Flexural Stress, Fb | 1,700 | PSI | SM00, WF8 |
| Tension Stress, Ft | 1,300 | PSI | SM00, WF8 |
| Compression Perpendicular to Grain, Fcp | 710 | PSI | SM00, WF8 |
| Compression Parallel to Grain, Fcll | 1,835 | PSI | SM00, WF8 |
| Shear Parallel to Grain, Fv | 425 | PSI | SM00, WF8 |
| Specific Gravity, SG | 0.50 | - | SM00, WF8 |

### 1.5 SIP (Structural Insulated Panel) Specifications

| Parameter | Value | Code Reference | Source |
|:---|:---|:---|:---|
| Referenced Code | IRC 2024 | IRC 2024 | SM00, SP1 |
| Engineering Reference | ESR-4524 | ESR-4524 | SM00, SP2 |
| Manufacturer | NOT FOUND | - | SM00 |
| Panel Thickness | NOT FOUND (to be extracted from details) | - | SM00 |

---

## 2. FLOOR SYSTEM SPECIFICATIONS

### 2.1 Floor Joists (Source: SM00, SM10)

**From SM00 Open Joist Section:**

| Parameter | Value | Unit | Source |
|:---|:---|:---|:---|
| Joist Type | Open Joist (TJI/I-joist) | - | SM00, Open Joist diagram |
| Overall Length | 44'-10" | feet-inches | SM00, Open Joist diagram |
| Joist Spacing Options | 16" O.C., 19.2" O.C., 24" O.C. | inches | SM00, Joist Splicing table |
| Clear Span Options | 12", 14", 16", 19.2", 24" | inches | SM00, Joist Splicing table |

**Joist Splicing Requirements (from SM00):**

| Joist Spacing | Clear Span | Moment Overhang | Moment Overhang (Spliced) | Source |
|:---|:---|:---|:---|:---|
| 16" O.C. | 12" | 12" | 24" | SM00, Joist Splicing table |
| 16" O.C. | 14" | 14" | 28" | SM00, Joist Splicing table |
| 16" O.C. | 16" | 16" | 32" | SM00, Joist Splicing table |
| 16" O.C. | 19.2" | 19.2" | 38.4" | SM00, Joist Splicing table |
| 16" O.C. | 24" | 24" | 48" | SM00, Joist Splicing table |

**Reaction Criteria (from SM00):**

| Load Type | Joist Depth | Minimum Overhang | Minimum Overhang (Spliced) | Source |
|:---|:---|:---|:---|:---|
| All | 9-1/4" | 1-3/4" | 3-1/2" | SM00, Reaction Criteria table |
| All | 11-7/8" | 1-3/4" | 3-1/2" | SM00, Reaction Criteria table |

**Blocking Criteria (from SM00):**

| Block Type | Joist Depth | Blocking | Source |
|:---|:---|:---|:---|
| Rim Joist | 9-1/4" | 1-1/2" x 9-1/4" | SM00, Blocking Criteria table |
| Rim Joist | 11-7/8" | 1-1/2" x 11-7/8" | SM00, Blocking Criteria table |
| Mid-Span | 9-1/4" | 2x4 or X-bracing | SM00, Blocking Criteria table |
| Mid-Span | 11-7/8" | 2x4 or X-bracing | SM00, Blocking Criteria table |

### 2.2 Floor Loads (Source: SM00)

| Load Type | Value | Unit | Source |
|:---|:---|:---|:---|
| Live Load (Residential) | 40 | PSF | SM00, Loading Plan |
| Dead Load | NOT FOUND (need to extract from loading plan details) | PSF | SM00 |

### 2.3 Subfloor Sheathing

**To be extracted from SM10 details**

---

## 3. WALL SYSTEM SPECIFICATIONS

### 3.1 Wall Framing (Source: SM00, SM10)

**Stud Specifications:**

| Wall Type | Stud Size | Species/Grade | Spacing | Source |
|:---|:---|:---|:---|:---|
| Exterior Load-Bearing | 2x6 | SPF #2 or better | 16" O.C. max | SM00, WF8 |
| Interior Load-Bearing | 2x4 or 2x6 | SPF #2 or better | 16" O.C. max | SM00, WF8 |
| Interior Non-Load-Bearing | 2x4 | SPF #2 or better | 16" O.C. max | SM00, WF8 |

**Wall Heights:**

| Level | Height | Source |
|:---|:---|:---|
| Lower Level | NOT FOUND (to extract from SM10) | SM10 |
| Upper Level | NOT FOUND (to extract from SM11) | SM11 |

### 3.2 Headers (Source: SM10, SM11)

**To be extracted from Header Schedule on SM10/SM11**

### 3.3 Shear Walls

**To be extracted from SM10 Wall Framing Plan**

---

## 4. ROOF SYSTEM SPECIFICATIONS

### 4.1 Roof Framing (Source: SM11, SM30)

| Parameter | Value | Unit | Source |
|:---|:---|:---|:---|
| Ridge Height | 15'-11 1/2" | feet-inches | SM30, Building Sections |
| Roof Bearing Height | 8'-0" | feet-inches | SM30, Building Sections |
| Ground Floor Elevation | 0'-0" | feet-inches | SM30, Building Sections |
| Roof Pitch | NOT FOUND (to extract from elevations) | rise:run | AM20 |

**Roof Framing Members:**

| Member Type | Size | Species/Grade | Spacing | Source |
|:---|:---|:---|:---|:---|
| Rafters/Trusses | NOT FOUND | - | NOT FOUND | SM11 |
| Ridge Beam | NOT FOUND | - | - | SM11 |
| Ceiling Joists | NOT FOUND | - | NOT FOUND | SM11 |

---

## 5. FASTENER SPECIFICATIONS

### 5.1 General Fastener Notes (Source: SM00)

**To be extracted from General Notes and detail callouts**

---

## 6. HARDWARE SPECIFICATIONS

### 6.1 Connectors & Straps (Source: SM10, SM11, SM40, SM41)

**From Wood I-Joist Strapping Schedule (SM10, SM11):**

| Mark | Stud Type | Qty | Strap Type | Capacity | Detail | Source |
|:---|:---|:---|:---|:---|:---|:---|
| 14C1 | (2) STUD TOTAL @ SPLICES/ENDS | NOT FOUND | (6) 0.131"Ø x 3-1/2" NAILS TO EACH JOIST @ 0.131"Ø x 2-1/2" NAILS TO STUD | (2) STRAP, 0.5 KIP | 5 / SM40 | SM10, SM11 |
| 14C2 | (2) STUD TOTAL @ SPLICES/ENDS | NOT FOUND | (6) 0.131"Ø x 3-1/2" NAILS TO EACH JOIST @ 0.131"Ø x 2-1/2" NAILS TO STUD | (2) STRAP, 0.5 KIP | 5 / SM40 | SM10, SM11 |

**BC-T1, BC-T2, BC-L Connectors:**

| Connector | Application | Source |
|:---|:---|:---|
| BC-T1 | Joist-to-rim connections | SM40, Detail callouts |
| BC-T2 | Ridge beam connections | SM41, Detail callouts |
| BC-L | High bearing connections | SM41, Detail callouts |

---

## 7. HOLDDOWN & LINE LOAD REQUIREMENTS (Source: SM00)

### 7.1 Holddown Key

| Mark | Load | Unit | Engagement Requirement | Source |
|:---|:---|:---|:---|:---|
| A | 0.6WL = 3,950 | lb | Must engage wall | SM00, Holddown Key |
| B | 0.6WL = 2,700 | lb | Engage rim band | SM00, Holddown Key |

### 7.2 Line Load Key

| Location | Load | Unit | Source |
|:---|:---|:---|:---|
| West Wall | 0.6WL = 1,300 | lb | SM00, Line Load Key |
| East Wall | 0.6WL = 1,200 | lb | SM00, Line Load Key |
| Grid A & Grid B Beam | 0.6WL = 750 | lb | SM00, Line Load Key |
| Grid B Beam | 0.6WL = 750 | lb | SM00, Line Load Key |

---

## EXTRACTION STATUS

### Completed:
- ✅ SM00 General Notes
- ✅ Material grades (dimensional lumber, LVL, LSL)
- ✅ Design criteria
- ✅ I-joist general specifications
- ✅ Holddown and line load requirements

### Next Steps:
- ⏳ SM10 Floor Framing Plan (detailed joist layout, subfloor specs)
- ⏳ SM10 Wall Framing Plan (stud layout, header details)
- ⏳ SM11 Ceiling/Roof Framing Plan (rafter/truss layout)
- ⏳ SM40/SM41 Connection Details (fastener patterns, hardware)
- ⏳ Header Schedule extraction
- ⏳ Wall Schedule extraction
- ⏳ Fastener Schedule extraction

---

**Note:** All "NOT FOUND" entries indicate specifications that exist in the drawings but have not yet been extracted. No values have been invented or assumed.


---

## 8. DETAILED FLOOR SYSTEM (Source: SM10)

### 8.1 Floor Framing Plan Dimensions

| Parameter | Value | Unit | Source |
|:---|:---|:---|:---|
| Overall Length | 44'-10" | feet-inches | SM10, Floor Framing Plan |
| Grid 1 to Grid 2 | 16'-11 1/2" | feet-inches | SM10, Floor Framing Plan |
| Grid 2 to Grid 3 | 14'-10" | feet-inches | SM10, Floor Framing Plan |
| Grid 3 to Grid 4 | 16'-2" | feet-inches | SM10, Floor Framing Plan |
| Grid A to Grid B | 12'-5" | feet-inches | SM10, Floor Framing Plan |
| Grid B to Grid C | NOT FOUND (need to measure from plan) | feet-inches | SM10 |

### 8.2 Floor Joist Specifications (SM10)

| Parameter | Value | Unit | Source |
|:---|:---|:---|:---|
| Joist Type | Open Joist (I-joist/TJI) | - | SM10, Floor Framing Plan |
| Joist Depth | 11-7/8" (typical) | inches | SM10, Floor Framing Plan callout |
| Joist Spacing | 16" O.C. | inches | SM10, Floor Framing Plan |
| Joist Direction | East-West (perpendicular to long walls) | - | SM10, Floor Framing Plan |
| Rim Joist | 11-7/8" depth matching joist | inches | SM10, Floor Framing Plan |

### 8.3 Floor Framing Details Reference

| Detail Number | Description | Sheet | Source |
|:---|:---|:---|:---|
| 1 / SM40 | Floor Framing - Long Wall | SM40 | SM10, Floor Framing Plan |
| 2 / SM40 | Floor Framing - Short Wall | SM40 | SM10, Floor Framing Plan |
| 3 / SM40 | Floor Framing - Rim Corner | SM40 | SM10, Floor Framing Plan |

---

## 9. DETAILED WALL SYSTEM (Source: SM10)

### 9.1 Wall Schedule (from SM10)

| Mark | Type | Wall Properties | Sheathing | Code | Source |
|:---|:---|:---|:---|:---|:---|
| S1 | Exterior Load-Bearing | 6-3/8" Structural Insulated Panels (SIPS) | 7/16" OSB sheathing ea face, 5-1/2" EPS foam, lumber splines req'd | (reference) | SM10, Wall Schedule |
| S2 | Exterior Load-Bearing | 6-3/8" Structural Insulated Panels (SIPS) | 7/16" OSB sheathing ea face, 5-1/2" EPS foam, lumber splines req'd, spline locations shown on plan | (reference) | SM10, Wall Schedule |
| W1 | Interior Shear Wall | Interior Wood Framed Shear Walls | 7/16" OSB one side, 0.131" Ø nails @ 4" O.C. @ panel edge, 12" O.C. panel field, 2x4 studs @ 16" O.C., (3) 2x4 @ ea end of shear wall | (reference) | SM10, Wall Schedule |

**Note:** If SIPS are spliced within 2'-0" of an opening, use lumber splines (per SM10 note)

### 9.2 Header Schedule (from SM10)

| Mark | Size | Detail | Source |
|:---|:---|:---|:---|
| H0 | SIPS HEADER w/ (1) 2x6 JACK @ EACH JAMB, BOTH ACCEPTABLE | 13 / SM40 | SM10, Header Schedule |
| H1 | (3) 2x6 HEADER w/ (1) 2x6 JACK @ EA. JAMB & (2) KING STUDS @ EA JAMB | 13 / SM40 | SM10, Header Schedule |
| H2 | (3) 2x6 HEADER w/ (1) 2x6 JACK @ EA. JAMB & (2) 2x6 KING STUD @ EA JAMB, WALL PANEL SIPS HEADER | 14 / SM40 | SM10, Header Schedule |

### 9.3 Wood I-Joist Strapping Schedule (from SM10)

| Mark | Stud Configuration | Strap Type | Capacity | Detail | Source |
|:---|:---|:---|:---|:---|:---|
| 14C1 | (3) STUDS TOTAL @ HOLD-DOWN | (8) 0.131" Ø x 2-1/2" NAILS TO LVL BEAM, (8) 0.131" Ø x 2-1/2" NAILS TO STUD | (3) CS16 x 2'-0", 3,147 LB (ASD) | 9 / SM40 | SM10, Wood I-Joist Strapping Schedule |
| 14C2 | (3) STUDS TOTAL @ HOLD-DOWN | (8) 0.131" Ø x 2-1/2" NAILS TO LVL BEAM, (8) 0.131" Ø x 2-1/2" NAILS TO STUD | (2) CS16 x 2'-0", 3,147 LB (ASD) | 9 / SM40 | SM10, Wood I-Joist Strapping Schedule |

### 9.4 Wall Framing Plan Dimensions

| Parameter | Value | Unit | Source |
|:---|:---|:---|:---|
| Overall Length | 44'-10" | feet-inches | SM10, Wall Framing Plan |
| Overall Width | 12'-5" | feet-inches | SM10, Wall Framing Plan |
| Wall Height | NOT FOUND (to extract from sections) | feet-inches | SM30 |

### 9.5 Wall Framing Details Reference

| Detail Number | Description | Sheet | Source |
|:---|:---|:---|:---|
| 6 / SM40 | Wall Framing - Perimeter SIP Base | SM40 | SM10, Wall Framing Plan |
| 7 / SM40 | Wood Wall Assembly | SM40 | SM10, Wall Framing Plan |
| 8 / SM40 | Wall Framing - Interior Wall Base | SM40 | SM10, Wall Framing Plan |
| 9 / SM40 | Wall Framing - C516 Strap | SM40 | SM10, Wall Framing Plan |
| 10 / SM40 | Low Bear Connections | SM40 | SM10, Wall Framing Plan |
| 11 / SM40 | SIP Splices | SM40 | SM10, Wall Framing Plan |
| 12 / SM40 | Rough Openings - SIP Header | SM40 | SM10, Wall Framing Plan |
| 13 / SM40 | Rough Opening - SIP Header w/ Rings | SM40 | SM10, Wall Framing Plan |
| 14 / SM40 | Rough Opening - Lumber Header | SM40 | SM10, Wall Framing Plan |
| 15 / SM40 | SIP Corner | SM40 | SM10, Wall Framing Plan |
| 16 / SM40 | Wall Framing - Perimeter SIP Top | SM40 | SM10, Wall Framing Plan |

### 9.6 Typical Colors & Hatches Legend (SM10)

| Color/Hatch | Material | Source |
|:---|:---|:---|
| Solid Brown | 2x Lumber - Joists/Framing | SM10, Legend |
| Light Brown | LVL - Engineered Lumber | SM10, Legend |
| White/Blank | Sheathing | SM10, Legend |

---

## EXTRACTION STATUS UPDATE

### Completed:
- ✅ SM00 General Notes
- ✅ Material grades (dimensional lumber, LVL, LSL)
- ✅ Design criteria
- ✅ I-joist general specifications
- ✅ Holddown and line load requirements
- ✅ SM10 Floor Framing Plan (joist specs, dimensions)
- ✅ SM10 Wall Framing Plan (wall types, headers)
- ✅ SM10 Header Schedule
- ✅ SM10 Wall Schedule
- ✅ SM10 Wood I-Joist Strapping Schedule

### Next Steps:
- ⏳ SM11 Ceiling/Roof Framing Plan (rafter/truss layout, ridge beam)
- ⏳ SM30 Building Sections (wall heights, roof pitch)
- ⏳ SM40 Connection Details (fastener patterns, hardware details)
- ⏳ SM41 Roof Connection Details
- ⏳ Architectural schedules (doors, windows)
- ⏳ MEP specifications
