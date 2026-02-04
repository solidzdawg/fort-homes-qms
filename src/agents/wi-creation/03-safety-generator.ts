/**
 * AGENT 3: SAFETY REQUIREMENT GENERATOR
 *
 * Purpose: Generate safety callouts and PPE requirements for work instructions
 * Input: Phase number, tasks, tools
 * Output: Safety warnings, PPE requirements, hazard identification
 *
 * Key Capabilities:
 * - Identify hazards by phase (fall protection, electrical, confined space, etc.)
 * - Generate appropriate PPE requirements
 * - Create safety warnings for specific tasks
 * - Reference OSHA standards where applicable
 *
 * RESEARCH NEEDED: OSHA construction standards (29 CFR 1926)
 * Current implementation uses construction industry best practices
 */

// ========================================
// TYPES
// ========================================

export interface SafetyRequirement {
  hazard_type: string;
  severity: 'high' | 'medium' | 'low';
  warning: string;
  ppe_required: string[];
  control_measures: string[];
  osha_reference?: string;
}

export interface PhaseSafetyProfile {
  phase: number;
  phase_name: string;
  primary_hazards: SafetyRequirement[];
  general_ppe: string[];
  special_equipment?: string[];
  emergency_procedures?: string[];
}

// ========================================
// SAFETY DATABASE
// ========================================

const SAFETY_PROFILES = {
  phase_1: {
    primary_hazards: [
      {
        hazard_type: 'Fall from height',
        severity: 'high' as const,
        warning: 'Fall protection required when working >6 feet above ground',
        ppe_required: ['Full-body harness', 'Lanyard', 'Anchor points'],
        control_measures: [
          'Install guardrails around floor opening',
          'Use personal fall arrest system',
          'Maintain 3-point contact on ladders',
          'Keep work area clear of tripping hazards'
        ],
        osha_reference: '29 CFR 1926.501 - Fall Protection'
      },
      {
        hazard_type: 'Pneumatic tool operation',
        severity: 'medium' as const,
        warning: 'Nail gun discharge can cause serious injury',
        ppe_required: ['Safety glasses', 'Hearing protection'],
        control_measures: [
          'Keep hands clear of discharge path',
          'Use sequential trigger mode',
          'Maintain proper air pressure (90-120 PSI)',
          'Disconnect air supply before servicing',
          'Never point at people'
        ],
        osha_reference: '29 CFR 1926.302 - Power Tools'
      },
      {
        hazard_type: 'Material handling',
        severity: 'medium' as const,
        warning: 'Heavy materials (LVL beams, joists) require proper lifting techniques',
        ppe_required: ['Work gloves', 'Steel-toe boots'],
        control_measures: [
          'Use team lift for materials >50 lbs',
          'Bend at knees, not waist',
          'Use mechanical assists (forklifts, hoists) when available',
          'Secure loads before transport'
        ],
        osha_reference: '29 CFR 1926.250 - Material Handling'
      },
      {
        hazard_type: 'Chemical exposure',
        severity: 'medium' as const,
        warning: 'Subfloor adhesive contains VOCs',
        ppe_required: ['Nitrile gloves', 'Safety glasses', 'Respirator if ventilation inadequate'],
        control_measures: [
          'Ensure adequate ventilation',
          'Read SDS before use',
          'Avoid skin contact',
          'Store in approved containers',
          'Dispose per local regulations'
        ],
        osha_reference: '29 CFR 1926.55 - Hazard Communication'
      }
    ],
    general_ppe: [
      'Hard hat (ANSI Z89.1)',
      'Safety glasses with side shields (ANSI Z87.1)',
      'Work gloves',
      'Steel-toe boots (ANSI Z41)',
      'Hearing protection (when noise >85 dB)',
      'High-visibility vest'
    ]
  },

  phase_2: {
    primary_hazards: [
      {
        hazard_type: 'Wall tipping during assembly',
        severity: 'high' as const,
        warning: 'Walls can tip unexpectedly causing crush injuries',
        ppe_required: ['Hard hat', 'Steel-toe boots', 'Work gloves'],
        control_measures: [
          'Brace walls immediately after raising',
          'Use wall jacks or temporary bracing',
          'Maintain clear path for personnel',
          'Coordinate with crew - use spotter',
          'Never stand under wall being raised'
        ],
        osha_reference: '29 CFR 1926.706 - Wall Construction'
      },
      {
        hazard_type: 'Power saw operation',
        severity: 'high' as const,
        warning: 'Circular saws can cause severe lacerations',
        ppe_required: ['Safety glasses', 'Hearing protection', 'Cut-resistant gloves'],
        control_measures: [
          'Use blade guard at all times',
          'Secure material before cutting',
          'Keep hands away from blade path',
          'Unplug when changing blades',
          'Inspect blade for damage before use'
        ],
        osha_reference: '29 CFR 1926.304 - Woodworking Tools'
      },
      {
        hazard_type: 'SIP panel handling',
        severity: 'medium' as const,
        warning: 'SIP panels are large and awkward, can cause ergonomic injuries',
        ppe_required: ['Work gloves', 'Steel-toe boots'],
        control_measures: [
          'Use team lift (minimum 2 people)',
          'Use panel cart or mechanical lift',
          'Secure panels to prevent tipping',
          'Watch for wind - panels act as sails'
        ]
      }
    ],
    general_ppe: [
      'Hard hat',
      'Safety glasses',
      'Work gloves',
      'Steel-toe boots',
      'Hearing protection',
      'Dust mask (when cutting)'
    ]
  },

  phase_3: {
    primary_hazards: [
      {
        hazard_type: 'Working at height (roof level)',
        severity: 'high' as const,
        warning: 'Roof work requires fall protection and proper access',
        ppe_required: ['Full-body harness', 'Shock-absorbing lanyard', 'Hard hat'],
        control_measures: [
          'Install roof anchors per OSHA requirements',
          'Use guardrails at roof edges',
          'Maintain 6-foot clearance from edge',
          'Use proper ladder access',
          'Check weather - no work in high wind/rain'
        ],
        osha_reference: '29 CFR 1926.501(b)(13) - Residential Construction'
      },
      {
        hazard_type: 'Truss/beam collapse',
        severity: 'high' as const,
        warning: 'Unsupported ridge beam or trusses can collapse',
        ppe_required: ['Hard hat', 'Steel-toe boots'],
        control_measures: [
          'Install temporary support posts',
          'Follow BCSI (Building Component Safety Information) guidelines',
          'Never remove bracing until permanent connections complete',
          'Do not overload trusses during installation'
        ]
      }
    ],
    general_ppe: [
      'Hard hat',
      'Safety glasses',
      'Work gloves',
      'Steel-toe boots',
      'Fall protection equipment',
      'Hearing protection'
    ]
  },

  phase_4: {
    primary_hazards: [
      {
        hazard_type: 'Electrical shock',
        severity: 'high' as const,
        warning: 'Contact with live circuits can cause electrocution',
        ppe_required: ['Insulated gloves (ASTM D120)', 'Safety glasses', 'Electrical-rated tools'],
        control_measures: [
          'De-energize circuits before work (LOTO)',
          'Test circuits with voltage tester before touching',
          'Keep one hand in pocket (single-hand rule)',
          'Use GFCIs for temporary power',
          'Work must be performed by licensed electrician'
        ],
        osha_reference: '29 CFR 1926.416 - Electrical Safety'
      },
      {
        hazard_type: 'Confined space (crawlspace)',
        severity: 'high' as const,
        warning: 'Limited entry/egress, potential atmospheric hazards',
        ppe_required: ['Respirator (if required)', 'Flashlight', 'Communication device'],
        control_measures: [
          'Test atmosphere before entry',
          'Maintain continuous ventilation',
          'Station attendant outside',
          'Have rescue plan in place',
          'Use mechanical ventilation'
        ],
        osha_reference: '29 CFR 1926.1203 - Confined Spaces'
      },
      {
        hazard_type: 'Plumbing pressure testing',
        severity: 'medium' as const,
        warning: 'Pressurized systems can fail explosively',
        ppe_required: ['Safety glasses', 'Gloves'],
        control_measures: [
          'Use calibrated pressure gauge',
          'Never exceed test pressure (80 PSI typical)',
          'Keep personnel clear during pressurization',
          'Inspect connections before pressurizing',
          'Bleed pressure slowly after test'
        ]
      }
    ],
    general_ppe: [
      'Hard hat',
      'Safety glasses',
      'Work gloves (insulated for electrical)',
      'Steel-toe boots',
      'Respirator (if dust/fumes present)',
      'Knee pads'
    ]
  },

  phase_5: {
    primary_hazards: [
      {
        hazard_type: 'Fiberglass insulation exposure',
        severity: 'medium' as const,
        warning: 'Insulation fibers can irritate skin, eyes, respiratory system',
        ppe_required: ['Dust mask/respirator', 'Safety glasses', 'Long sleeves', 'Gloves'],
        control_measures: [
          'Use N95 respirator minimum',
          'Wear long sleeves and pants',
          'Wash hands before eating/drinking',
          'Shower after shift',
          'Ventilate work area'
        ],
        osha_reference: '29 CFR 1926.1101 - Respiratory Protection'
      },
      {
        hazard_type: 'Spray foam chemicals',
        severity: 'high' as const,
        warning: 'Isocyanates can cause respiratory sensitization',
        ppe_required: ['Full-face respirator', 'Tyvek suit', 'Nitrile gloves'],
        control_measures: [
          'Use NIOSH-approved supplied-air respirator',
          'Ensure adequate ventilation',
          'Clear area of non-essential personnel',
          'Follow manufacturer SDS requirements',
          'Monitor air quality'
        ],
        osha_reference: '29 CFR 1926.55 - Hazard Communication'
      }
    ],
    general_ppe: [
      'Hard hat',
      'Safety glasses',
      'Respirator (N95 minimum)',
      'Long sleeves/pants',
      'Work gloves',
      'Knee pads'
    ]
  }
};

// ========================================
// CORE GENERATION FUNCTIONS
// ========================================

export function getPhaseSafetyProfile(phase: number): PhaseSafetyProfile {
  const phaseNames = [
    '',
    'Floor System Assembly',
    'Wall Framing & Sheathing',
    'Roof Framing & Sheathing',
    'MEP Rough-In',
    'Insulation & Air Sealing',
    'Drywall Installation',
    'Interior Trim & Finishes',
    'Final Inspection & Testing'
  ];

  let profile: any = null;

  switch (phase) {
    case 1:
      profile = SAFETY_PROFILES.phase_1;
      break;
    case 2:
      profile = SAFETY_PROFILES.phase_2;
      break;
    case 3:
      profile = SAFETY_PROFILES.phase_3;
      break;
    case 4:
      profile = SAFETY_PROFILES.phase_4;
      break;
    case 5:
      profile = SAFETY_PROFILES.phase_5;
      break;
    default:
      profile = { primary_hazards: [], general_ppe: [] };
  }

  return {
    phase,
    phase_name: phaseNames[phase] || `Phase ${phase}`,
    ...profile
  };
}

export function generateSafetySection(profile: PhaseSafetyProfile): string {
  let section = `## ⚠️ SAFETY REQUIREMENTS\n\n`;
  section += `**Phase:** ${profile.phase_name}\n\n`;

  // General PPE
  section += `### Required Personal Protective Equipment (PPE)\n\n`;
  for (const ppe of profile.general_ppe) {
    section += `- ✅ ${ppe}\n`;
  }
  section += `\n`;

  // Primary Hazards
  section += `### Identified Hazards & Controls\n\n`;

  for (const hazard of profile.primary_hazards) {
    const severityEmoji = hazard.severity === 'high' ? '🔴' : hazard.severity === 'medium' ? '🟡' : '🟢';

    section += `#### ${severityEmoji} ${hazard.hazard_type.toUpperCase()}\n\n`;
    section += `**Warning:** ${hazard.warning}\n\n`;

    if (hazard.ppe_required.length > 0) {
      section += `**Additional PPE:**\n`;
      for (const ppe of hazard.ppe_required) {
        section += `- ${ppe}\n`;
      }
      section += `\n`;
    }

    section += `**Control Measures:**\n`;
    for (const control of hazard.control_measures) {
      section += `- ${control}\n`;
    }
    section += `\n`;

    if (hazard.osha_reference) {
      section += `**Reference:** ${hazard.osha_reference}\n\n`;
    }

    section += `---\n\n`;
  }

  return section;
}

// ========================================
// EXPORT MAIN FUNCTION
// ========================================

export default async function generateSafetyRequirements(phase: number): Promise<PhaseSafetyProfile> {
  console.log('⚠️  Safety Requirement Generator Agent');
  console.log('=====================================');

  const profile = getPhaseSafetyProfile(phase);

  console.log(`✅ Generated safety profile for ${profile.phase_name}`);
  console.log(`   Identified hazards: ${profile.primary_hazards.length}`);
  console.log(`   General PPE items: ${profile.general_ppe.length}`);

  const highSeverity = profile.primary_hazards.filter(h => h.severity === 'high').length;
  if (highSeverity > 0) {
    console.log(`   ⚠️  HIGH SEVERITY hazards: ${highSeverity}`);
  }

  return profile;
}

// ========================================
// CLI INTERFACE
// ========================================

if (require.main === module) {
  const phase = parseInt(process.argv[2] || '1');

  generateSafetyRequirements(phase)
    .then(result => {
      console.log('\n📋 Safety Requirements:');
      console.log(generateSafetySection(result));
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}
