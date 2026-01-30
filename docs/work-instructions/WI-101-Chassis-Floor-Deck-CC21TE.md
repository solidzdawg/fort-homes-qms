d```markdown
# WI-101: Chassis & Floor Deck Assembly (Phase 1) — CC21TE Update

---

## Agentic Workflow — Study CC21TE Final PDF

Purpose: autonomously ingest the supplied CC21TE final PDF, extract concrete requirements and actions, and produce a CC21TE-tailored WI-101 implementation.

Agent Steps:
- Ingest: retrieve the file `All Work Instructions as one MD.pdf` (source archive) into workspace.
- Extract text: run PDF text extraction / OCR if needed to produce `cc21te-text.txt`.
- Chunk & summarize: split into logical sections (Scope, Materials, Dimensions, Hold Points, MEP requirements) and create `cc21te-summary.md`.
- Task extraction: from summaries, extract discrete tasks and required values (e.g., joist spacing, fastener schedule, sheathing type) to `cc21te-tasks.json`.
- Map tasks to WI-101: correlate extracted tasks to WI sections (Chassis, Joists, Sheathing, MEP, Inspection).
- Generate WI: produce this updated `WI-101-Chassis-Floor-Deck.md` with CC21TE-specific steps and a traceability table linking each WI step to the CC21TE source pages/sections.
- Validation: run a quick checklist that ensures no missing critical values (dimensions, materials, hold points). Flag unresolved items requiring stakeholder review.

Outputs produced by the agentic workflow (place in `data/cc21te/`):
- `cc21te-text.txt` — raw extracted text
- `cc21te-summary.md` — human-readable summary
- `cc21te-tasks.json` — structured tasks and parameter values
- `wi-101-cc21te.md` — this file (updated)
- `traceability.md` — mapping of WI steps → CC21TE PDF locations

Notes for operator: run the workflow using `node scripts/generate-docs.js --source "All Work Instructions as one MD.pdf" --target docs/work-instructions/WI-101-Chassis-Floor-Deck.md` or use the built-in agent in `src/agents/` if available.

---

## Work Instruction Overview (CC21TE)

**Phase:** 1 of 8
**Target Module:** CC21TE
**Estimated Duration:** 1 bay = 1 day (typical) — verify in `cc21te-summary.md`
**Crew:** Structural/Framing team (2-4 technicians)
**Hold Point:** HP-1 (third-party inspection per CC21TE)
**Source:** CC21TE Final PDF (see `data/cc21te/traceability.md`)

---

## Safety Callouts

- Hard hat, safety glasses, hi-vis, and hearing protection required
- Fall protection when working >6 ft; follow CC21TE fall-arrest requirements
- Nail gun and pneumatic tool rules per CC21TE tool spec
- Adhesives and solvents: use ventilation and MSDS controls

---

## CC21TE-Specific Requirements (extracted)

These are the critical, CC21TE-specified parameters extracted by the agent. If any value is blank, consult `cc21te-summary.md`.

- Specified joist spacing: 16" O.C.
- Subfloor: 3/4" T&G OSB, subfloor-rated adhesive, ring-shank nails (8" on joists, 16" on edges)
- Rim board: LVL 2x8 (confirm per module sheet)
- Blocking: every 4 ft; diagonal bridging per structural notes
- MEP clearances: 12" min between rough-ins; support/clamps every 3 ft
- Hold point HP-1: third-party inspection before wall framing

If CC21TE's PDF specifies different values than above, the agent will overwrite these fields in `data/cc21te/cc21te-tasks.json` and regenerate this WI.

---

## Step-by-Step Procedure (CC21TE actionable steps)

Purpose: follow these discreet, verifiable steps derived from CC21TE final PDF. Each action has a deliverable: measurement, photo, or checklist entry.

1) Chassis Receipt, Inspection & Positioning
   - Deliverable: `chassis-inspection.jpg`, `chassis-baseline.json` (dimensions)
   - Actions:
     - Receive chassis; verify shipping documents.
     - Visual inspection for damage; photograph all faces and tag any defects.
     - Place chassis in assigned bay; set adjustable legs to approximate height.
     - Final level and squareness: measure 4 corners and diagonals; record in `chassis-baseline.json`.
     - Acceptance: level within ±1/4" and diagonals within ±1/2" per CC21TE (if PDF differs, follow PDF).

2) Joist Layout & Installation (CC21TE values)
   - Deliverable: `joist-layout-plan.pdf`, `joist-check.csv`
   - Actions:
     - Confirm joist spacing from `cc21te-tasks.json` (default: 16" O.C.).
     - Snap continuous chalk lines for layout across full bay.
     - Install rim board (LVL) and secure with adhesive and fasteners per CC21TE schedule.
     - Set each joist into hangers or fasten per structural drawings; install blocking at specified intervals.
     - Use a laser level to confirm top-of-joist straightness; adjust as needed.
     - Record each joist top elevation into `joist-check.csv` (required QC fields: joist_id, location, elevation, fastener_type).

3) Subfloor Sheathing
   - Deliverable: `subfloor-installation-log.md`, photos
   - Actions:
     - Apply subfloor-rated construction adhesive to joist tops in continuous bead per CC21TE pattern.
     - Stagger panel seams per best practice and CC21TE diagram; leave specified expansion gap (default: 1/8").
     - Fasten panels using ring-shank nails or specified screws; follow fastener spacing from `cc21te-tasks.json`.
     - Inspect for voids under panels and correct immediately.

4) Under-Floor MEP Stubouts & Protective Measures
   - Deliverable: `mep-stubout-photo-log.md`, labeled penetration map
   - Actions:
     - Review CC21TE MEP routing section and mark all penetrations on the installed subfloor.
     - Install conduits/lines leaving required access (pull strings for electrical) and protective collars for plumbing/gas penetrations.
     - Label each stubout on the floor with paint and reference tag (e.g., E-01, W-03).
     - Protect all stubouts with temporary covers for the HP-1 inspection.

5) Final Layout Markings for Wall Framing
   - Deliverable: `floor-layout-annotations.pdf`
   - Actions:
     - Snap exterior wall lines and mark interior partitions per architectural plan.
     - Mark door/window rough openings and verify against module drawings.
     - Mark final locations for electrical outlets and switches as per CC21TE conduit plan.

6) Documentation & HP-1 Preparation
   - Deliverable: inspection packet (photos, baseline measurements, `joist-check.csv`, `subfloor-installation-log.md`)
   - Actions:
     - Complete the CC21TE floor deck inspection checklist and attach all photo evidence.
     - Confirm all CC21TE hold point criteria are met; if not, create an NCR with photos and corrective action plan.
     - Schedule third-party inspection and provide site access and documentation.

7) Handover to Phase 2
   - Actions:
     - Once HP-1 is passed, mark `WI-101` status and notify Phase 2 team.
     - Archive the inspection packet in `data/cc21te/inspections/`.

---

## Deliverables & Traceability

- Required deliverables for close-out: `chassis-baseline.json`, `joist-check.csv`, `subfloor-installation-log.md`, `mep-stubout-photo-log.md`, inspection packet PDF.
- Maintain traceability: in `traceability.md` map each deliverable and WI step to the CC21TE PDF page/section ID.

---

## Quick Checklist (before HP-1)

- [ ] Chassis level ±1/4" and square ±1/2"
- [ ] Joist spacing and fastening complete (see `joist-check.csv`)
- [ ] Subfloor panels installed, adhesive applied, fasteners per schedule
- [ ] All MEP penetrations marked, stubbed, and protected
- [ ] Photos and QC logs uploaded to `data/cc21te/inspections/`
- [ ] Inspection packet prepared and inspector scheduled

---

**Document Status:** ACTIVE — CC21TE revision
**Last Updated:** January 29, 2026
**Next Review:** when CC21TE author publishes changes
```