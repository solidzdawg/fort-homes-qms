/**
 * AGENT 2: CODE REQUIREMENT MAPPER
 *
 * Purpose: Map building code requirements to work instruction steps
 * Input: Phase number, module specs, code database
 * Output: Applicable code requirements with citations
 *
 * Key Capabilities:
 * - Identify applicable IRC, NEC, IPC, IMC, IECC sections for each phase
 * - Parse code requirements into actionable verification items
 * - Generate code references for inspection criteria
 * - Flag critical vs. non-critical code requirements
 *
 * RESEARCH NEEDED: Full IRC, NEC, IPC, IMC, IECC code text database
 * Current implementation uses common code patterns from Fort Homes domain knowledge
 */

import fs from 'fs';
import path from 'path';

// ========================================
// TYPES
// ========================================

export interface CodeRequirement {
  citation: string;
  title: string;
  requirement: string;
  verification_method: string;
  acceptance_criteria: string;
  critical: boolean; // Affects structural/life safety
  inspection_point: 'during' | 'hold_point' | 'final';
  category: 'structural' | 'mep' | 'fire_safety' | 'energy' | 'accessibility';
}

export interface PhaseCodeMap {
  phase: number;
  phase_name: string;
  hold_point: string;
  requirements: CodeRequirement[];
}

// ========================================
// CODE DATABASE (Simplified - Full implementation needs complete code text)
// ========================================

/**
 * IRC Chapter 5: Floors
 * IRC Chapter 6: Wall Construction
 * IRC Chapter 8: Roof-Ceiling Construction
 * NEC Article 550: Mobile/Manufactured Homes (modular analog)
 * IPC Chapters 3-7: Plumbing Systems
 * IMC Chapters 3-6: HVAC Systems
 */

const CODE_DATABASE = {
  // PHASE 1: FLOOR SYSTEM (IRC Chapter 5)
  phase_1: [
    {
      citation: 'IRC R502.3.1',
      title: 'Floor joist spacing',
      requirement: 'Floor joists shall not be spaced more than 24 inches on center',
      verification_method: 'Measure on-center spacing with tape measure',
      acceptance_criteria: 'Spacing within specified dimension ±1/2"',
      critical: true,
      inspection_point: 'hold_point',
      category: 'structural'
    },
    {
      citation: 'IRC R502.6',
      title: 'Floor joist bearing',
      requirement: 'Floor joists shall have minimum 1.5 inches bearing on wood or metal, 3 inches on masonry',
      verification_method: 'Measure bearing surface at joist ends',
      acceptance_criteria: 'Minimum 1.5" bearing achieved',
      critical: true,
      inspection_point: 'hold_point',
      category: 'structural'
    },
    {
      citation: 'IRC R502.7',
      title: 'Floor joist blocking',
      requirement: 'Bridging or blocking shall be installed at supports and at intervals not exceeding 8 feet',
      verification_method: 'Visual inspection + tape measurement',
      acceptance_criteria: 'Blocking present at all required locations, no gaps >8 feet',
      critical: false,
      inspection_point: 'hold_point',
      category: 'structural'
    },
    {
      citation: 'IRC R503.2',
      title: 'Floor sheathing fastening',
      requirement: 'Floor sheathing shall be attached with minimum 8d nails at 6" O.C. at edges',
      verification_method: 'Visual inspection of nail pattern',
      acceptance_criteria: 'Edge nailing at 6" O.C. ±1/2", field nailing per schedule',
      critical: true,
      inspection_point: 'hold_point',
      category: 'structural'
    }
  ],

  // PHASE 2: WALL SYSTEM (IRC Chapter 6)
  phase_2: [
    {
      citation: 'IRC R602.3',
      title: 'Stud spacing',
      requirement: 'Studs shall be spaced not more than 16 inches on center for load-bearing walls',
      verification_method: 'Measure on-center spacing',
      acceptance_criteria: '16" O.C. ±1/2" tolerance',
      critical: true,
      inspection_point: 'hold_point',
      category: 'structural'
    },
    {
      citation: 'IRC R602.3.1',
      title: 'Stud size',
      requirement: 'Exterior walls: minimum 2x4 studs, 2x6 if supporting more than one floor',
      verification_method: 'Visual inspection of stud dimensions',
      acceptance_criteria: 'Studs meet minimum dimension per design',
      critical: true,
      inspection_point: 'hold_point',
      category: 'structural'
    },
    {
      citation: 'IRC R602.10',
      title: 'Wall bracing/shear walls',
      requirement: 'Braced wall lines required per R602.10, shear walls per engineered design',
      verification_method: 'Check shear wall nailing per approved plans',
      acceptance_criteria: 'Nailing pattern matches SM40 details (4" O.C. edges typical)',
      critical: true,
      inspection_point: 'hold_point',
      category: 'structural'
    },
    {
      citation: 'IRC R602.10.1',
      title: 'Wall anchorage',
      requirement: 'Wall top plates shall be anchored to resist wind uplift',
      verification_method: 'Verify hurricane clips/straps at all connections',
      acceptance_criteria: 'All required clips installed per schedule (e.g., H2.5)',
      critical: true,
      inspection_point: 'hold_point',
      category: 'structural'
    }
  ],

  // PHASE 3: ROOF SYSTEM (IRC Chapter 8)
  phase_3: [
    {
      citation: 'IRC R802.3',
      title: 'Roof framing member spacing',
      requirement: 'Rafters/trusses shall not exceed spacing shown in span tables',
      verification_method: 'Measure rafter/truss spacing',
      acceptance_criteria: 'Spacing per approved plans (typically 24" O.C.)',
      critical: true,
      inspection_point: 'hold_point',
      category: 'structural'
    },
    {
      citation: 'IRC R802.11',
      title: 'Roof tie-down',
      requirement: 'Roof assembly shall be anchored to resist wind uplift per approved design',
      verification_method: 'Verify hurricane clips at all rafter-to-plate connections',
      acceptance_criteria: 'All clips installed, minimum 12 nails per clip',
      critical: true,
      inspection_point: 'hold_point',
      category: 'structural'
    },
    {
      citation: 'IRC R803.2',
      title: 'Roof sheathing fastening',
      requirement: 'Roof sheathing attached with 8d nails at 6" O.C. edges, 12" O.C. field',
      verification_method: 'Visual inspection of nail pattern',
      acceptance_criteria: 'Edge nailing 6" O.C., field nailing 12" O.C.',
      critical: true,
      inspection_point: 'hold_point',
      category: 'structural'
    }
  ],

  // PHASE 4: MEP ROUGH-IN
  phase_4_electrical: [
    {
      citation: 'NEC 550.16',
      title: 'Grounding conductor size',
      requirement: 'Grounding conductors shall be 8 AWG copper minimum for manufactured housing',
      verification_method: 'Visual inspection of grounding conductor',
      acceptance_criteria: 'Minimum 8 AWG copper, insulated or bare',
      critical: true,
      inspection_point: 'hold_point',
      category: 'mep'
    },
    {
      citation: 'NEC 210.8',
      title: 'GFCI protection',
      requirement: 'GFCI protection required for kitchen, bathroom, outdoor, garage receptacles',
      verification_method: 'Check circuit breaker panel for GFCI breakers',
      acceptance_criteria: 'All required circuits have GFCI protection',
      critical: true,
      inspection_point: 'hold_point',
      category: 'mep'
    },
    {
      citation: 'NEC 334.30',
      title: 'NM cable (Romex) support',
      requirement: 'Cables shall be secured within 8" of boxes and at 4.5 feet intervals',
      verification_method: 'Visual inspection of cable staples/straps',
      acceptance_criteria: 'All cables secured per code requirements',
      critical: false,
      inspection_point: 'hold_point',
      category: 'mep'
    }
  ],

  phase_4_plumbing: [
    {
      citation: 'IPC 305.4.1',
      title: 'PEX tubing support',
      requirement: 'PEX tubing shall be supported at 32" intervals for 1/2", 48" for 3/4"',
      verification_method: 'Measure support spacing',
      acceptance_criteria: 'Supports within required intervals',
      critical: false,
      inspection_point: 'hold_point',
      category: 'mep'
    },
    {
      citation: 'IPC 312.2',
      title: 'Water pressure test',
      requirement: 'Water distribution system shall be tested at 80 PSI for minimum 30 minutes',
      verification_method: 'Pressure gauge test',
      acceptance_criteria: 'Holds 80 PSI for 30 min, max 5 PSI drop',
      critical: true,
      inspection_point: 'hold_point',
      category: 'mep'
    },
    {
      citation: 'IPC 704.1',
      title: 'Drain slope',
      requirement: 'Drainage piping shall have minimum 1/4" per foot slope',
      verification_method: 'Level measurement',
      acceptance_criteria: 'Minimum 1/4" per foot achieved',
      critical: true,
      inspection_point: 'hold_point',
      category: 'mep'
    }
  ],

  phase_4_mechanical: [
    {
      citation: 'IMC 603.9',
      title: 'Duct support',
      requirement: 'Ducts shall be supported at intervals not exceeding 10 feet',
      verification_method: 'Measure support spacing',
      acceptance_criteria: 'Supports within 10 feet intervals',
      critical: false,
      inspection_point: 'hold_point',
      category: 'mep'
    },
    {
      citation: 'IECC R403.3.6',
      title: 'Duct leakage testing',
      requirement: 'Duct leakage shall not exceed 6 CFM25 per 100 sq ft conditioned area',
      verification_method: 'Duct blaster test at 25 Pa',
      acceptance_criteria: 'Leakage <6 CFM25/100 sq ft',
      critical: true,
      inspection_point: 'hold_point',
      category: 'energy'
    }
  ],

  // PHASE 5: INSULATION & AIR SEALING (IECC)
  phase_5: [
    {
      citation: 'IECC R402.4.1',
      title: 'Air barrier',
      requirement: 'Continuous air barrier required at building thermal envelope',
      verification_method: 'Visual inspection of air barrier continuity',
      acceptance_criteria: 'No visible gaps, all penetrations sealed',
      critical: true,
      inspection_point: 'hold_point',
      category: 'energy'
    },
    {
      citation: 'IECC R402.2.1',
      title: 'Insulation R-values',
      requirement: 'Insulation shall meet minimum R-values for Climate Zone 5',
      verification_method: 'Check insulation labels/markings',
      acceptance_criteria: 'Roof R-45, Wall R-23, Floor R-30 per approved plans',
      critical: true,
      inspection_point: 'hold_point',
      category: 'energy'
    }
  ]
};

// ========================================
// CORE MAPPING FUNCTIONS
// ========================================

/**
 * Get code requirements for specific phase
 */
export function getPhaseCodeRequirements(phase: number): PhaseCodeMap {
  const phaseNames = [
    '', // 0-index placeholder
    'Floor System Assembly',
    'Wall Framing & Sheathing',
    'Roof Framing & Sheathing',
    'MEP Rough-In',
    'Insulation & Air Sealing',
    'Drywall Installation',
    'Interior Trim & Finishes',
    'Final Inspection & Testing'
  ];

  const holdPoints = ['', 'HP-1', 'HP-2', 'HP-3', 'HP-4', 'HP-5', 'HP-6', 'HP-7', 'HP-8'];

  let requirements: CodeRequirement[] = [];

  switch (phase) {
    case 1:
      requirements = CODE_DATABASE.phase_1;
      break;
    case 2:
      requirements = CODE_DATABASE.phase_2;
      break;
    case 3:
      requirements = CODE_DATABASE.phase_3;
      break;
    case 4:
      requirements = [
        ...CODE_DATABASE.phase_4_electrical,
        ...CODE_DATABASE.phase_4_plumbing,
        ...CODE_DATABASE.phase_4_mechanical
      ];
      break;
    case 5:
      requirements = CODE_DATABASE.phase_5;
      break;
    default:
      requirements = [];
  }

  return {
    phase,
    phase_name: phaseNames[phase] || `Phase ${phase}`,
    hold_point: holdPoints[phase] || `HP-${phase}`,
    requirements
  };
}

/**
 * Filter critical requirements (structural/life safety)
 */
export function getCriticalRequirements(phaseMap: PhaseCodeMap): CodeRequirement[] {
  return phaseMap.requirements.filter(req => req.critical);
}

/**
 * Group requirements by category
 */
export function groupRequirementsByCategory(phaseMap: PhaseCodeMap): Record<string, CodeRequirement[]> {
  const grouped: Record<string, CodeRequirement[]> = {};

  for (const req of phaseMap.requirements) {
    if (!grouped[req.category]) {
      grouped[req.category] = [];
    }
    grouped[req.category].push(req);
  }

  return grouped;
}

/**
 * Generate inspection checklist from code requirements
 */
export function generateInspectionChecklist(phaseMap: PhaseCodeMap): string {
  let checklist = `# ${phaseMap.hold_point} INSPECTION CHECKLIST\n\n`;
  checklist += `**Phase:** ${phaseMap.phase_name}\n\n`;

  const grouped = groupRequirementsByCategory(phaseMap);

  for (const [category, requirements] of Object.entries(grouped)) {
    checklist += `## ${category.toUpperCase()}\n\n`;

    for (const req of requirements) {
      const criticalFlag = req.critical ? '❌ CRITICAL' : '⚠️ STANDARD';
      checklist += `- [ ] **${req.citation}** ${criticalFlag}\n`;
      checklist += `  - Requirement: ${req.requirement}\n`;
      checklist += `  - Method: ${req.verification_method}\n`;
      checklist += `  - Acceptance: ${req.acceptance_criteria}\n\n`;
    }
  }

  return checklist;
}

// ========================================
// EXPORT MAIN FUNCTION
// ========================================

export default async function mapCodeRequirements(phase: number): Promise<PhaseCodeMap> {
  console.log('📖 Code Requirement Mapper Agent');
  console.log('=================================');

  const phaseMap = getPhaseCodeRequirements(phase);

  console.log(`✅ Mapped ${phaseMap.requirements.length} code requirements for ${phaseMap.phase_name}`);

  const critical = getCriticalRequirements(phaseMap);
  console.log(`   Critical requirements: ${critical.length}`);
  console.log(`   Hold point: ${phaseMap.hold_point}`);

  return phaseMap;
}

// ========================================
// CLI INTERFACE
// ========================================

if (require.main === module) {
  const phase = parseInt(process.argv[2] || '1');

  mapCodeRequirements(phase)
    .then(result => {
      console.log('\n📋 Code Requirements:');
      console.log(generateInspectionChecklist(result));
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}
