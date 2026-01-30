# WI-104: MEP Rough-In (Phase 4) — CC21TE Update

---

**Source drawing:** Shop Drawings for CC21TE (SHOP FINAL)

Notes: CC21TE shop drawings contain panel locations, conduit runs, drain slopes, and penetration schedules. Confirm exact routing and clearances and update `data/cc21te/traceability.md`.

Deliverables (CC21TE):
- `mep-stubout-photo-log.md` annotated with CC21TE tags
- Updated traceability entries in `data/cc21te/traceability.md`

---

Follow the existing step-by-step MEP procedures, substituting CC21TE dimensions and routing where specified.

---

## Work Instruction Overview

**Phase:** 4 of 8  
**Duration:** 3-4 days per bay  
**Crew:** Electrical, Plumbing, HVAC teams (2-3 per discipline)  
**Hold Point:** HP-4 (MEP rough-in before insulation)  
**Related SOP:** SOP-104-MEP-Rough-In-Testing.md

---

## Safety Callouts

⚠️ **CRITICAL SAFETY ITEMS:**
- Electrical work: De-energize all circuits before testing
- High-voltage hazard: 240V-480V power present on utility systems
- Propane/Natural gas: Shut off supply before work, check for leaks with soapy water
- Ladder safety: Secure ladder on uneven surfaces (attic/crawl)
- Hot water: Isolate water heater before connecting supply
- Confined space: Ventilate crawl spaces and attic during work
- Pressure testing: Wear safety glasses when pressurizing plumbing systems

---

## Step-by-Step Procedure

### Step 1: Electrical Rough-In (Conduit & Boxes)

```
┌────────────────────────────────────────────┐
│    ELECTRICAL LAYOUT - WALL & ATTIC         │
├────────────────────────────────────────────┤
│                                            │
│  Interior Wall Electrical Layout:           │
│  ┌─────────────────────────────────────┐   │
│  │ Attic Level                         │   │
│  │ ┌────────────────────────────────┐ │   │
│  │ │  Wire Run (attic)              │ │   │
│  │ │ ◯─────◯─────◯─────◯─────◯     │ │   │
│  │ │ │     │     │     │     │     │ │   │
│  │ │Outlet Outlet Outlet Outlet Out│ │   │
│  │ └────────────────────────────────┘ │   │
│  │                                     │   │
│  │ Interior Walls (2x4):                │   │
│  │ ┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐       │   │
│  │ │◯│ │◯│ │◯│ │◯│ │◯│ │◯│ │       │   │
│  │ │O│ │O│ │S│ │O│ │O│ │S│ │       │   │
│  │ │U│ │U│ │W│ │U│ │U│ │W│ │       │   │
│  │ └─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘       │   │
│  │ O = Outlet (15-20A)  S = Switch    │   │
│  │ 18" AFF (above finished floor)      │   │
│  │                                     │   │
│  │ Exterior Wall (2x6):                │   │
│  │ ┌───┐ ┌───┐ ┌───┐ ┌───┐            │   │
│  │ │ ◯ │ │ ◯ │ │ ◯ │ │ ◯ │            │   │
│  │ │ O │ │ O │ │ O │ │ O │            │   │
│  │ └───┘ └───┘ └───┘ └───┘            │   │
│  │ 15" AFF (lower for water heater?)   │   │
│  │                                     │   │
│  │ Kitchen Countertop Outlets:         │   │
│  │ ◯──◯──◯──◯──◯──◯──◯──◯──◯──◯      │   │
│  │ 12" AFF, 6" apart (code requirement)│   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                            │
│  Conduit Types:                             │
│  • EMT (1/2" or 3/4") for exposed runs    │
│  • Romex (NM cable) within walls          │
│  • Rigid conduit for outdoor runs         │
│  • THHN/THWN wire in all conduit         │
│                                            │
│  Junction Boxes (all concealed):            │
│  ┌─────────────────────────────────────┐   │
│  │ Accessible for inspection & splicing    │
│  │ Labeled with circuit number & gauge     │
│  │ Never bury without access panel         │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                            │
└────────────────────────────────────────────┘
```

**Actions:**
1. Layout electrical run locations per plans (conduit routing)
2. Install electrical boxes at outlet/switch locations (18" AFF standard, 12" for kitchen)
3. Run conduit (EMT/Romex) from main panel through walls and attic
4. Install boxes with vapor barrier backing (exterior walls)
5. Install low-voltage boxes separate from high-voltage (minimum 12" spacing)
6. Label all conduit runs and junction boxes with circuit number
7. Verify all runs per electrical plans and code

**Quality Gate:** All boxes installed, conduit runs complete, labeled, per code spacing (12" minimum between different voltage systems).

---

### Step 2: Electrical Panel & Service Entry

```
┌────────────────────────────────────────────┐
│    MAIN ELECTRICAL PANEL INSTALLATION       │
├────────────────────────────────────────────┤
│                                            │
│  Service Entry Point:                       │
│  ┌──────────────────────────────────────┐  │
│  │  Roof Line                           │  │
│  │     │                                │  │
│  │  ┌──┴──┐ Service Mast (Conduit)      │  │
│  │  │   SE Cable                        │  │
│  │  │     (Entrance cable)              │  │
│  │  │                                   │  │
│  │  │ 3-4" above roof                   │  │
│  │  │ Weatherproof fitting              │  │
│  │  │                                   │  │
│  │  │ Down wall (4-6 feet minimum rise) │  │
│  │  │                                   │  │
│  │  └──┬──┐                             │  │
│  │     │  SE Cable enters panel         │  │
│  │     ▼                                │  │
│  │  ╔════════════════════════════════╗ │  │
│  │  ║ MAIN PANEL (200-400 AMP)        ║ │  │
│  │  ║ ┌─────────────────────────────┐ ║ │  │
│  │  ║ │ Main Breaker (200A-400A)    │ ║ │  │
│  │  ║ ├─────────────────────────────┤ ║ │  │
│  │  ║ │ Breaker 1: 20A (Kitchen)   │ ║ │  │
│  │  ║ │ Breaker 2: 15A (Living)    │ ║ │  │
│  │  ║ │ Breaker 3: 20A (Bedroom)   │ ║ │  │
│  │  ║ │ Breaker 4: 240V (Water Htr)│ ║ │  │
│  │  ║ │ Breaker 5: 50A (Range)     │ ║ │  │
│  │  ║ │ Breaker 6: 30A (HVAC)      │ ║ │  │
│  │  ║ │ ... (remaining breakers)   │ ║ │  │
│  │  ║ │ Neutral Bus (Silver posts)  │ ║ │  │
│  │  ║ │ Ground Bus (Green screws)   │ ║ │  │
│  │  ║ └─────────────────────────────┘ ║ │  │
│  │  ╚════════════════════════════════╝ │  │
│  │  Panel Location: Garage (accessible) │  │
│  │  Height: 48-60" AFF to center        │  │
│  │  Clear space: 36" wide x 18" deep    │  │
│  │  No obstructions in front            │  │
│  │                                      │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  Grounding:                                │
│  ║  Ground Rod (8' copper rod)             │
│  ║  Bonding cable to panel                 │
│  ║  Connected to neutral & ground bus      │
│  ║                                         │
│  ▼  (Underground to foundation)            │
│                                            │
└────────────────────────────────────────────┘
```

**Actions:**
1. Install service mast (conduit) through roof with weatherproof fitting
2. Run service entrance (SE) cable from utility meter to main panel
3. Install main electrical panel (200-400 AMP rated) in accessible location (garage)
4. Position panel 48-60" AFF to center, with 36"W x 18"D clearance
5. Install main breaker at top of panel
6. Install individual circuit breakers per plan (20A, 30A, 50A as required)
7. Connect grounding rod to panel with bonding cable
8. Label all breakers with circuit numbers and amperage

**Quality Gate:** Main panel installed correctly, SE cable run and secured, service mast weatherproof, grounding bonded, all breakers labeled.

---

### Step 3: Plumbing Rough-In (Supply & Drain)

```
┌────────────────────────────────────────────┐
│    PLUMBING SYSTEM LAYOUT (3-ZONES)         │
├────────────────────────────────────────────┤
│                                            │
│  Water Supply Lines (Hot & Cold):           │
│  ═══════════════════════════════════       │
│  Main Supply:                               │
│  ◄─ Water Meter ─ Main Shutoff Valve       │
│        │              │                    │
│     ┌──┴──┐    ┌──────┴──────┐             │
│  Hot│     │Cold│             │             │
│  ═╤═╡ Tank╞═══╡ Distribution │             │
│   │   │   │    │  Lines      │             │
│   │   └───┘    │             │             │
│   │            │             │             │
│   ├─ Kitchen   ├─ Kitchen    │             │
│   │ (HW+CW)    │ (sink)      │             │
│   │            │             │             │
│   ├─ Bath#1    ├─ Bath#1     │             │
│   │ (shower)   │ (shower)    │             │
│   │            │             │             │
│   ├─ Bath#2    ├─ Bath#2     │             │
│   │ (lavatory) │ (lavatory)  │             │
│   │            │             │             │
│   ├─ Toilet    ├─ Toilet     │             │
│   │ Supply     │ Supply      │             │
│   │            │             │             │
│   ├─ Washer    ├─ Washer     │             │
│   │ (HW+CW)    │ (CW only)   │             │
│   │            │             │             │
│   └─────────────────────────┘             │
│     All PEX (¾" main, ½" branches)         │
│     Supported every 3 feet                 │
│                                            │
│  Drain-Waste-Vent (DWV) Lines:             │
│  ╠═════════════════════════════════╗       │
│  ║  Main Stack (3" or 4" PVC)       ║       │
│  ║  ║                               ║       │
│  ║ ╔╩════╗ Branch to Kitchen       ║       │
│  ║ ║Vent ║ (P-trap under sink)     ║       │
│  ║ ╚╤════╝                          ║       │
│  ║  ║                               ║       │
│  ║ ╔╩════╗ Branch to Bath#1        ║       │
│  ║ ║Vent ║ (Shower + Lavatory)     ║       │
│  ║ ╚╤════╝                          ║       │
│  ║  ║                               ║       │
│  ║ ╔╩════╗ Branch to Bath#2        ║       │
│  ║ ║Vent ║ (Toilet + Lavatory)     ║       │
│  ║ ╚╤════╝                          ║       │
│  ║  ║                               ║       │
│  ║  ║ Slope: 1/4" per 10 feet       ║       │
│  ║  │ (downhill to main stack)      ║       │
│  ║  │                               ║       │
│  ║  ▼                               ║       │
│  ║ ╔════════════════════════════════╗       │
│  ║ ║ Main Cleanout (accessible)      ║       │
│  ║ ║ Trap Arm connects to sewer      ║       │
│  ║ ╚════════════════════════════════╝       │
│  ╚═════════════════════════════════╝       │
│                                            │
│  Water Heater Connection:                  │
│  ┌─────────────────┐                       │
│  │ Cold In ◄─ ⅜" CW line              │
│  │                 │                       │
│  │ Water Heater    │ Relief Valve outlet   │
│  │ (40-50 gal)     ├─ ¾" drain to exterior│
│  │                 │                       │
│  │ Hot Out ─► ½" HW line              │
│  └─────────────────┘                       │
│                                            │
└────────────────────────────────────────────┘
```

**Actions:**
1. Install water meter and main shutoff valve (typically in utility area)
2. Install water heater and connect cold supply inlet
3. Run hot water supply lines (½" PEX from heater to fixtures)
4. Run cold water supply lines (½" PEX from main to fixtures)
5. Support all supply lines every 3 feet with clamps
6. Install 3" or 4" PVC main stack (vertical DWV line)
7. Install branch lines to each fixture with proper slope (1/4" per 10 ft)
8. Install P-traps below all fixtures (under sink, under shower)
9. Vent all branches through roof (2" minimum vent pipe diameter)
10. Install main cleanout (accessible) near foundation

**Quality Gate:** All supply lines pressure-tested (test at 80 psi for 15 minutes), all DWV lines sloped correctly (1/4" per 10 ft), vents extend 2+ feet above roof.

---

### Step 4: HVAC Rough-In (Ducts & Equipment)

```
┌────────────────────────────────────────────┐
│    HVAC SYSTEM LAYOUT - DUCTS & FURNACE     │
├────────────────────────────────────────────┤
│                                            │
│  Furnace/Heat Pump Location:                │
│  ┌─────────────────────────────────┐       │
│  │ Utility Room (Furnace Area)      │       │
│  │                                  │       │
│  │ ┌──────────────────────────────┐│       │
│  │ │ Furnace                       ││       │
│  │ │ (60,000-100,000 BTU)          ││       │
│  │ │ │ Return air inlet (bottom)   ││       │
│  │ │ │                             ││       │
│  │ │ │ Supply air outlet (top)     ││       │
│  │ │ │ (feeds main trunk duct)     ││       │
│  │ │ │                             ││       │
│  │ │ │ Gas inlet (yellow flex)     ││       │
│  │ │ │ │                           ││       │
│  │ │ │ │ Exhaust vent (through roof││       │
│  │ │ │ └─────────────┐             ││       │
│  │ └──────────────────────────────┘│       │
│  │                                  │       │
│  │ Air Handler (if heat pump):      │       │
│  │ ┌──────────────────────────────┐│       │
│  │ │ Wall-mounted or attic unit    ││       │
│  │ │ Refrigerant lines (insulated) ││       │
│  │ │ Condensate drain (to exterior) ││       │
│  │ └──────────────────────────────┘│       │
│  │                                  │       │
│  └─────────────────────────────────┘       │
│                                            │
│  Duct System (8" main trunk):               │
│       ┌─────────────┐                      │
│       │  Main Trunk │                      │
│       │   (8" φ)    │                      │
│       │             │                      │
│  ┌────┴─┐      ┌────┴─┐      ┌────┬─┐    │
│  │6" BR1│      │6" BR2│      │6" LR │    │
│  │      │      │      │      │     │    │
│  │Bed 1 │      │Bed 2 │      │Vent │    │
│  │      │      │      │      │     │    │
│  └──────┘      └──────┘      └─────┴─┘   │
│                                            │
│  Each duct:                                 │
│  • Sized per fixture (6" for bedroom)       │
│  • 1/4" insulation (R-6 minimum)           │
│  • Sealed with mastic (no tape)            │
│  • Supported every 4 feet                  │
│  • No kinks or crushed sections            │
│                                            │
│  Return Air Path:                           │
│  ║  ╔════════════════════════╗            │
│  ║  ║ Return Air Plenum       ║            │
│  ║  ║ (attic or crawl space)   ║            │
│  ║  ║ ║                        ║            │
│  ║  ║ Filters (18x20x1 MERV-8)║            │
│  ║  ║ ║                        ║            │
│  ║  ║ ▼ Furnace inlet          ║            │
│  ║  ╚════════════════════════╝            │
│  ║                                         │
│  ║ Return vents: 1 per room (high wall)   │
│  ║ Grilles: 16" x 8" minimum              │
│  ║                                         │
│  ║ Flex returns from each room to plenum  │
│  ║                                         │
│  ▼ Back to furnace                         │
│                                            │
│  Thermostat (wall-mounted):                 │
│  ┌──────────────┐                          │
│  │ Thermostat   │ 60" AFF, interior wall   │
│  │   Digital    │ Away from heat sources   │
│  │   68°-72°F   │ (sunlight, kitchen)      │
│  │   Setting    │                          │
│  └──────────────┘                          │
│       │                                    │
│  Connected to furnace with low-voltage     │
│  thermostat wire (18-22 AWG, 4-conductor) │
│                                            │
└────────────────────────────────────────────┘
```

**Actions:**
1. Install furnace or air handler in utility space
2. Connect gas supply line (¾" flex line with yellow coating)
3. Install furnace exhaust vent through roof (3-4" duct, min 2 ft above)
4. Install main duct trunk from furnace (8" diameter, insulated)
5. Install branch ducts to each room (6" diameter for bedrooms, 8" for main spaces)
6. Install return air plenum (attic or crawl space)
7. Install return ducts from each room to plenum
8. Install registers/grilles at all supply and return locations
9. Install thermostat on interior wall (60" AFF, away from heat sources)
10. Connect thermostat to furnace with low-voltage wire

**Quality Gate:** All ducts sealed with mastic, supported every 4 feet, insulated, thermostat installed and functional, no duct leaks when pressurized.

---

### Step 5: Gas Line Installation (if applicable)

```
┌────────────────────────────────────────────┐
│    GAS LINE SYSTEM (SAFETY CRITICAL)        │
├────────────────────────────────────────────┤
│                                            │
│  Exterior Gas Meter:                        │
│  ┌────────────────┐                        │
│  │ Utility Meter  │ Gas Supply from street │
│  │   (by utility) │                        │
│  │ ◄─ ¾" pipeline│                        │
│  │                │                        │
│  │ Main shutoff   │ Lever perpendicular    │
│  │    valve       │ to pipe = OFF          │
│  │    ◄───┐       │                        │
│  │        │       │ Label: "GAS SHUTOFF"   │
│  │        ▼       │                        │
│  └────────┬───────┘                        │
│           │                                │
│        ¾" CSST                              │
│        (Corrugated                          │
│         Stainless)                          │
│         Line                                │
│           │                                │
│      ┌────┴──────────────┐                 │
│      │                   │                 │
│    Furnace            Range                │
│     (¾")              (½")                  │
│      │                   │                 │
│   ┌──┴──┐             ┌───┴───┐            │
│   │ In  │             │ Inlet │            │
│   │     │             │       │            │
│   └─────┘             └───────┘            │
│                                            │
│  Gas Line Safety:                           │
│  ✓ CSST (not copper - code requires CSST)  │
│  ✓ Bonding strap (protects from RF)         │
│  ✓ All connections flared or compression   │
│  ✓ Test all joints with soapy water        │
│  ✓ Labeled at furnace & range inlets       │
│  ✓ Shut-off valve accessible               │
│  ✓ Pressure regulator before each appliance│
│                                            │
│  Leak Test:                                │
│  │ Liquid soap + water solution             │
│  │ Apply to all connections                 │
│  │ Bubbles = LEAK (stop work, fix now)     │
│  │ No bubbles = SAFE                        │
│  │                                          │
│  ▼ Repeat test every connection             │
│                                            │
│  Gas Supply Pressure:                       │
│  ½ psi at furnace inlet (typical)           │
│  1 psi at range inlet                       │
│                                            │
└────────────────────────────────────────────┘
```

**Actions:**
1. Coordinate with utility company for gas meter location
2. Install main gas shutoff valve (accessible, labeled)
3. Run CSST (corrugated stainless) line from meter through walls
4. Install bonding strap to CSST (RF protection)
5. Branch CSST lines to furnace and range
6. Install pressure regulator at each appliance inlet
7. Connect furnace gas inlet with ¾" line
8. Connect range gas inlet with ½" line
9. Test all connections with soapy water (no bubbles allowed)
10. Label all shutoff valves "GAS SHUTOFF"

**Quality Gate:** All gas connections tested with soapy water (zero leaks), all valves labeled, main shutoff accessible, pressure verified at appliances.

---

### Step 6: System Pressure Testing & Inspection

```
┌────────────────────────────────────────────┐
│    MEP SYSTEMS PRESSURE TESTING              │
├────────────────────────────────────────────┤
│                                            │
│  Plumbing Pressure Test (Supply):           │
│  ┌──────────────────────────────────────┐  │
│  │ Test Pump (Electric or Manual)        │  │
│  │                                       │  │
│  │   Gauge ────┬─────┬─ 80 PSI           │  │
│  │             │     │ (pressure point)  │  │
│  │   ◄─ Main   │Test │ Hold for 15 min   │  │
│  │     shutoff │pump │ (watch gauge)     │  │
│  │             │     │ No pressure drop  │  │
│  │             └─────┘ = PASS            │  │
│  │                                       │  │
│  │ If pressure drops:                    │  │
│  │ • Isolate zones & find leak           │  │
│  │ • Tighten connections                 │  │
│  │ • Replace failed fitting              │  │
│  │ • Retest until PASS                   │  │
│  │                                       │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  Plumbing DWV Smoke Test:                   │
│  ┌──────────────────────────────────────┐  │
│  │ Smoke Machine (connects to cleanout)  │  │
│  │                                       │  │
│  │   Smoke inlet ─── Main Stack          │  │
│  │          ║            ║               │  │
│  │       ║  ║  ║  ║  ║  ║               │  │
│  │   Visible smoke exits through         │  │
│  │   ALL roof vents (expected)           │  │
│  │   Visible smoke elsewhere = leak      │  │
│  │   (Basement window, exterior wall)    │  │
│  │                                       │  │
│  │ Vents should smoke properly:          │  │
│  │ • Kitchen vent: 1-2 seconds to roof   │  │
│  │ • Bath vents: 2-3 seconds to roof     │  │
│  │ • Toilet vent: 3-4 seconds to roof    │  │
│  │   (longer = vent blockage risk)       │  │
│  │                                       │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  HVAC Duct Pressure Test:                   │
│  ┌──────────────────────────────────────┐  │
│  │ Furnace ON + Door Blower Fan          │  │
│  │                                       │  │
│  │ Measure at:                           │  │
│  │ • Main trunk: 0.3-0.5" water column   │  │
│  │ • Branch ducts: 0.1-0.2" water col.   │  │
│  │                                       │  │
│  │ Target: Balanced airflow, no leaks    │  │
│  │ Check for duct movement (sealing ok)  │  │
│  │                                       │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  Gas System Pressure Test:                  │
│  ┌──────────────────────────────────────┐  │
│  │ Manometer (½" water column):           │  │
│  │                                       │  │
│  │ Supply: 0.4-0.5 psi at meter          │  │
│  │ At furnace: 0.3-0.4 psi                │  │
│  │ At range: 0.3-0.4 psi                  │  │
│  │                                       │  │
│  │ All connections soapy water tested    │  │
│  │ ZERO LEAKS required                   │  │
│  │                                       │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  Electrical Continuity Test:                │
│  ┌──────────────────────────────────────┐  │
│  │ Multimeter (Ohms mode):                │  │
│  │                                       │  │
│  │ Breaker & circuits:                   │  │
│  │ • Main breaker ON: 0 ohms to neutral  │  │
│  │ • Branch circuit: No opens (5 ohms)   │  │
│  │ • Ground: <1 ohm to ground rod        │  │
│  │                                       │  │
│  │ Outlets & switches:                   │  │
│  │ • Continuity at each location         │  │
│  │ • Correct polarity (black=hot)        │  │
│  │                                       │  │
│  └──────────────────────────────────────┘  │
│                                            │
└────────────────────────────────────────────┘
```

**Actions:**
1. Isolate main water shutoff valve
2. Install pressure gauge and test pump at main cleanout
3. Pressurize plumbing system to 80 psi
4. Hold pressure for 15 minutes (verify no drops)
5. Perform DWV smoke test (smoke visible at all roof vents only)
6. Operate furnace, measure duct pressures at trunk and branches
7. Test gas system pressure with manometer (0.4-0.5 psi)
8. Test all gas connections with soapy water (zero leaks)
9. Test electrical continuity with multimeter (0 ohms on live circuits)
10. Document all test results on MEP checklist

**Quality Gate:** Plumbing pressure holds 80 psi for 15 min, DWV smoke exits only at roof vents, HVAC airflow balanced, gas zero leaks, electrical continuity verified.

---

### Step 7: MEP Documentation & HP-4 Inspection Ready

```
┌────────────────────────────────────────────┐
│    MEP ROUGH-IN FINAL CHECKLIST             │
├────────────────────────────────────────────┤
│                                            │
│  Electrical System (Complete):              │
│  ✓ Service mast installed & weatherproof   │
│  ✓ Main panel installed (200-400A rated)   │
│  ✓ All breakers installed & labeled        │
│  ✓ All outlets & switches installed        │
│  ✓ All conduit runs sealed & supported     │
│  ✓ All boxes located per plan              │
│  ✓ Grounding bonded to rod & panel         │
│  ✓ Electrical continuity tested            │
│  ✓ High-low voltage separation (12" min)   │
│                                            │
│  Plumbing System (Complete):                │
│  ✓ Water meter & main shutoff installed    │
│  ✓ All supply lines (hot & cold) run       │
│  ✓ Water heater connected                  │
│  ✓ All DWV lines installed with slope      │
│  ✓ All P-traps under fixtures              │
│  ✓ All vents extend 2+ ft above roof       │
│  ✓ Main cleanout accessible                │
│  ✓ Pressure test PASSED (80 psi, 15 min)   │
│  ✓ Smoke test PASSED (vents only)          │
│                                            │
│  HVAC System (Complete):                    │
│  ✓ Furnace/heat pump installed             │
│  ✓ All ducts run & sealed                  │
│  ✓ All registers & grilles installed       │
│  ✓ Thermostat installed (60" AFF)          │
│  ✓ Furnace vents through roof              │
│  ✓ Return air path complete                │
│  ✓ Furnace operates (temp rise verified)   │
│  ✓ All duct pressures balanced             │
│                                            │
│  Gas System (if applicable):                │
│  ✓ Main shutoff valve installed & labeled  │
│  ✓ CSST lines run to all appliances        │
│  ✓ Bonding strap installed                 │
│  ✓ All connections pressure tested         │
│  ✓ Soapy water test PASSED (zero leaks)    │
│  ✓ Pressure verified at appliances         │
│                                            │
│  HP-4 Third-Party Inspection:               │
│  Inspector will verify:                     │
│  • All MEP systems per code                 │
│  • Proper spacing & support                 │
│  • Test results documented                  │
│  • All safety features in place             │
│  • Module ready for insulation (Phase 5)   │
│                                            │
│  Phase 4 Complete When:                     │
│  ✓ All MEP systems tested & documented     │
│  ✓ Zero major defects found                │
│  ✓ HP-4 inspection PASSED                  │
│  ✓ Ready for Phase 5 (Insulation)           │
│                                            │
└────────────────────────────────────────────┘
```

**Actions:**
1. Compile all MEP test results (pressure, smoke, electrical)
2. Create MEP systems documentation (diagram copies)
3. Document furnace/water heater nameplate info
4. Schedule HP-4 third-party inspection
5. Ensure all systems operational and accessible
6. Take photos of all completed MEP rough-in work
7. Complete module traveler MEP section

**Quality Gate:** All MEP systems tested and documented, HP-4 inspection scheduled, module ready for Phase 5 insulation installation.

---

## Required Tools & Equipment

| Tool | Function | Required |
| :--- | :--- | :--- |
| Water pressure test pump | Test plumbing supply lines | Yes |
| Smoke testing machine | Test DWV system for leaks | Yes |
| Manometer | Measure gas & duct pressure | Yes |
| Multimeter | Test electrical continuity | Yes |
| Propane torch | Sweat copper connections (if used) | Optional |
| Reciprocating saw | Cut conduit & ductwork | Yes |
| Hacksaw | Cut PVC drain pipe | Yes |
| Caulk gun | Seal penetrations & connections | Yes |
| Flashlight/headlamp | Work in attic & crawl spaces | Yes |
| Safety equipment | Respirator, gloves, glasses, harness | Yes |

---

## Common Mistakes & How to Avoid

| Mistake | Impact | Prevention |
| :--- | :--- | :--- |
| Gas line leaks | Dangerous, code violation, fails inspection | Test all connections with soapy water (visible bubbles) |
| Low water pressure | Customer complaint, inadequate flow | Size supply lines per plan, verify water heater inlet |
| DWV slope incorrect | Slow drains, trap seal loss, odors | Measure 1/4" per 10 ft drop, use laser level to verify |
| HVAC duct unsealed | Energy loss, poor comfort | Seal all joints with mastic, no exposed tape |
| Electrical panel not accessible | Violates code, fails inspection | Clear 36"W x 18"D clearance, 60"AFF maximum to center |
| Service mast not weatherproof | Water intrusion, short circuit | Use weatherproof fitting at roof, silicone caulk seal |
| Furnace gas pressure wrong | Improper combustion, inefficiency | Measure at furnace inlet (0.3-0.4 psi), adjust regulator |
| Plumbing pressure drops | Pinhole leaks hidden in walls | Hold pressure 15 min, watch gauge for any movement |

---

## Quality Checkpoints

**Before moving to Phase 5, verify:**
- [ ] All electrical boxes installed per plan
- [ ] Main electrical panel operational
- [ ] All breakers labeled correctly
- [ ] High-low voltage separation (12" minimum)
- [ ] All plumbing supply lines tested (80 psi, 15 min hold)
- [ ] All DWV smoke test passed (vents only)
- [ ] Water heater connected and heating
- [ ] All HVAC ducts sealed and supported
- [ ] Furnace operational and heating
- [ ] Thermostat installed and functional
- [ ] All gas connections tested (zero leaks)
- [ ] Gas pressure verified at appliances
- [ ] All MEP test results documented
- [ ] HP-4 inspection passed with zero major NCRs
- [ ] Module ready for insulation installation

---

## Next Phase

→ **Phase 5: Insulation & Air Sealing** (WI-105)

After HP-4 inspection passes, insulation crew installs cavity insulation, air barriers, and seals all penetrations for thermal and air tightness performance.

---

**Document Status:** ✅ ACTIVE  
**Last Updated:** January 14, 2026  
**Review Date:** July 14, 2026
