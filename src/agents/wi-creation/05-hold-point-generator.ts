/**
 * AGENT 5: HOLD POINT CRITERIA GENERATOR
 *
 * Purpose: Generate objective pass/fail inspection criteria for hold points
 * Input: Phase specs, code requirements
 * Output: Structured inspection checklist with acceptance criteria
 *
 * Key Capabilities:
 * - Create measurable acceptance criteria
 * - Specify inspection methods and tools
 * - Determine sampling requirements (100% vs statistical)
 * - Identify TPIA requirements
 * - Generate NCR triggers
 */

export interface InspectionCriteria {
  id: string;
  category: 'structural' | 'dimensional' | 'workmanship' | 'mep' | 'material';
  item: string;
  requirement: string;
  code_reference?: string;
  method: string;
  acceptance: string;
  sample: string;
  critical: boolean;
  failure_action: string;
}

export interface HoldPointCriteria {
  hold_point: string;
  phase: number;
  phase_name: string;
  tpia_required: boolean;
  estimated_duration_minutes: number;
  criteria: InspectionCriteria[];
}

// ========================================
// HOLD POINT TEMPLATES
// ========================================

export function generateHP1Criteria(specs: any): HoldPointCriteria {
  return {
    hold_point: 'HP-1',
    phase: 1,
    phase_name: 'Floor System Assembly',
    tpia_required: true, // Fort Homes requires TPIA at HP-1
    estimated_duration_minutes: 45,
    criteria: [
      {
        id: 'HP1-STR-01',
        category: 'structural',
        item: 'Floor joist spacing',
        requirement: `${specs.spacing || '16" O.C.'} per shop drawings`,
        code_reference: 'IRC R502.3.1',
        method: 'Tape measure - on-center spacing',
        acceptance: `${specs.spacing || '16" O.C.'} ±1/4"`,
        sample: 'Measure 20% of joists (minimum 5)',
        critical: true,
        failure_action: '❌ STOP - Re-space joists, re-inspect'
      },
      {
        id: 'HP1-STR-02',
        item: 'Joist bearing on rim',
        category: 'structural',
        requirement: 'Minimum 1.5" bearing per IRC R502.6',
        code_reference: 'IRC R502.6',
        method: 'Tape measure at joist ends',
        acceptance: '≥1.5" bearing surface',
        sample: 'Check 10% of joists (minimum 3)',
        critical: true,
        failure_action: '❌ STOP - Adjust joist positions'
      },
      {
        id: 'HP1-STR-03',
        category: 'structural',
        item: 'Blocking installation',
        requirement: 'Blocking at 8-foot intervals per IRC R502.7',
        code_reference: 'IRC R502.7',
        method: 'Tape measure along joist length',
        acceptance: 'Blocking present, no gaps >8 feet',
        sample: '100% visual check',
        critical: false,
        failure_action: '⚠️ REPAIR - Install missing blocking'
      },
      {
        id: 'HP1-STR-04',
        category: 'structural',
        item: 'Subfloor fastening',
        requirement: 'Edge nailing per fastener schedule',
        code_reference: 'IRC R503.2',
        method: 'Visual inspection + nail gauge',
        acceptance: specs.fasteners?.floor_sheathing_edge || '8" O.C. edges ±1"',
        sample: 'Check all panel edges (100%)',
        critical: true,
        failure_action: '❌ STOP - Add missing fasteners'
      },
      {
        id: 'HP1-DIM-01',
        category: 'dimensional',
        item: 'Floor level',
        requirement: 'Level within tolerance',
        method: '4-foot level at multiple locations',
        acceptance: '±1/4" per 10 feet',
        sample: 'Check 4 corners + center',
        critical: false,
        failure_action: '⚠️ REPAIR - Shim/adjust as needed'
      },
      {
        id: 'HP1-DIM-02',
        category: 'dimensional',
        item: 'Floor square',
        requirement: 'Diagonal measurements equal',
        method: 'Tape measure - diagonal corners',
        acceptance: 'Diagonals within 1/2"',
        sample: 'Measure both diagonals',
        critical: true,
        failure_action: '⚠️ REPAIR - Re-square before proceeding'
      },
      {
        id: 'HP1-MAT-01',
        category: 'material',
        item: 'Subfloor material verification',
        requirement: specs.components?.subfloor || '3/4" T&G rated sheathing',
        method: 'Visual check of panel stamps',
        acceptance: 'APA stamp visible, correct thickness',
        sample: 'Check 10% of panels',
        critical: false,
        failure_action: '⚠️ DOCUMENT - Note any non-conforming materials'
      },
      {
        id: 'HP1-WRK-01',
        category: 'workmanship',
        item: 'Gaps and voids',
        requirement: 'T&G joints tight, no gaps',
        method: 'Visual inspection + walk test',
        acceptance: 'No voids, floor solid underfoot',
        sample: 'Walk entire floor surface',
        critical: false,
        failure_action: '⚠️ REPAIR - Fill voids, add fasteners'
      }
    ]
  };
}

export function generateHP2Criteria(specs: any): HoldPointCriteria {
  return {
    hold_point: 'HP-2',
    phase: 2,
    phase_name: 'Wall Framing & Sheathing',
    tpia_required: false,
    estimated_duration_minutes: 60,
    criteria: [
      {
        id: 'HP2-STR-01',
        category: 'structural',
        item: 'Stud spacing',
        requirement: specs.spacing || '16" O.C. per shop drawings',
        code_reference: 'IRC R602.3',
        method: 'Tape measure - on-center spacing',
        acceptance: '16" O.C. ±1/2"',
        sample: 'Check 20% of studs (minimum 5 per wall)',
        critical: true,
        failure_action: '⚠️ REPAIR - Re-space if out of tolerance'
      },
      {
        id: 'HP2-STR-02',
        category: 'structural',
        item: 'Shear wall nailing',
        requirement: 'OSB nailing per structural details',
        code_reference: 'IRC R602.10',
        method: 'Visual inspection + nail pattern gauge',
        acceptance: 'Typically 4" O.C. edges, 12" O.C. field per SM40',
        sample: '100% of shear wall perimeter',
        critical: true,
        failure_action: '❌ STOP - Complete nailing before proceeding'
      },
      {
        id: 'HP2-STR-03',
        category: 'structural',
        item: 'Hurricane clips/anchors',
        requirement: 'Top plate connections per schedule',
        code_reference: 'IRC R602.10.1',
        method: 'Visual count of clips',
        acceptance: 'All required clips installed (e.g., H2.5 at all studs)',
        sample: '100% of exterior walls',
        critical: true,
        failure_action: '❌ STOP - Install missing clips'
      },
      {
        id: 'HP2-STR-04',
        category: 'structural',
        item: 'Hold-down anchors',
        requirement: 'Installed per structural hardware schedule',
        code_reference: 'Shop drawings',
        method: 'Visual inspection + torque check',
        acceptance: 'All anchors installed, proper tension',
        sample: '100% of hold-downs',
        critical: true,
        failure_action: '❌ STOP - Install/tension all hold-downs'
      },
      {
        id: 'HP2-DIM-01',
        category: 'dimensional',
        item: 'Wall plumb',
        requirement: 'Walls within tolerance of vertical',
        method: '6-foot level on both faces',
        acceptance: '±1/4" per 8 feet',
        sample: '100% of exterior walls, 50% of interior',
        critical: true,
        failure_action: '⚠️ REPAIR - Re-plumb and re-brace'
      },
      {
        id: 'HP2-DIM-02',
        category: 'dimensional',
        item: 'Window/door openings',
        requirement: 'Openings match shop drawings',
        method: 'Tape measure - rough opening dimensions',
        acceptance: 'Within 1/4" of specified dimensions',
        sample: '100% of openings',
        critical: true,
        failure_action: '⚠️ REPAIR - Adjust framing'
      },
      {
        id: 'HP2-WRK-01',
        category: 'workmanship',
        item: 'Lumber condition',
        requirement: 'No splits, excessive wane, or damage',
        method: 'Visual inspection',
        acceptance: 'Lumber meets grading standards',
        sample: '10% visual scan',
        critical: false,
        failure_action: '⚠️ REPLACE - Swap out defective lumber'
      }
    ]
  };
}

export function generateHP4Criteria(specs: any): HoldPointCriteria {
  return {
    hold_point: 'HP-4',
    phase: 4,
    phase_name: 'MEP Rough-In',
    tpia_required: true, // TPIA required for MEP
    estimated_duration_minutes: 90,
    criteria: [
      // ELECTRICAL
      {
        id: 'HP4-ELEC-01',
        category: 'mep',
        item: 'Service panel sizing',
        requirement: 'Per shop drawings (typically 225A)',
        code_reference: 'NEC Article 550',
        method: 'Visual inspection of panel label',
        acceptance: 'Panel rating matches approved plans',
        sample: '100% check',
        critical: true,
        failure_action: '❌ STOP - Replace panel'
      },
      {
        id: 'HP4-ELEC-02',
        category: 'mep',
        item: 'Grounding conductor',
        requirement: '8 AWG copper minimum',
        code_reference: 'NEC 550.16',
        method: 'Visual inspection of wire size',
        acceptance: 'Minimum 8 AWG copper (insulated or bare)',
        sample: '100% check',
        critical: true,
        failure_action: '❌ STOP - Upgrade to 8 AWG minimum'
      },
      {
        id: 'HP4-ELEC-03',
        category: 'mep',
        item: 'GFCI protection',
        requirement: 'Kitchen, bath, exterior outlets',
        code_reference: 'NEC 210.8',
        method: 'Check breaker panel for GFCI breakers',
        acceptance: 'All required circuits have GFCI',
        sample: '100% check',
        critical: true,
        failure_action: '❌ STOP - Install GFCI protection'
      },
      {
        id: 'HP4-ELEC-04',
        category: 'mep',
        item: 'Cable support (Romex)',
        requirement: 'Within 8" of boxes, 4.5 feet along run',
        code_reference: 'NEC 334.30',
        method: 'Visual inspection of cable staples',
        acceptance: 'All cables properly secured',
        sample: '25% sample inspection',
        critical: false,
        failure_action: '⚠️ REPAIR - Add missing staples'
      },
      {
        id: 'HP4-ELEC-05',
        category: 'mep',
        item: 'Insulation resistance test',
        requirement: 'Megger test of circuits',
        method: 'Megohmmeter (500V)',
        acceptance: '>25 MΩ minimum',
        sample: 'Test all circuits',
        critical: true,
        failure_action: '❌ STOP - Identify and repair short'
      },
      // PLUMBING
      {
        id: 'HP4-PLMB-01',
        category: 'mep',
        item: 'Water supply pressure test',
        requirement: '80 PSI for 30 minutes',
        code_reference: 'IPC 312.2',
        method: 'Pressure gauge test',
        acceptance: 'Holds 80 PSI, max 5 PSI drop',
        sample: 'Test entire system',
        critical: true,
        failure_action: '❌ STOP - Locate and repair leaks'
      },
      {
        id: 'HP4-PLMB-02',
        category: 'mep',
        item: 'PEX support spacing',
        requirement: '32" for 1/2", 48" for 3/4"',
        code_reference: 'IPC 305.4.1',
        method: 'Tape measure between supports',
        acceptance: 'Supports within required intervals',
        sample: '25% sample inspection',
        critical: false,
        failure_action: '⚠️ REPAIR - Add supports as needed'
      },
      {
        id: 'HP4-PLMB-03',
        category: 'mep',
        item: 'Drain slope',
        requirement: 'Minimum 1/4" per foot',
        code_reference: 'IPC 704.1',
        method: 'Level and measurement',
        acceptance: '≥1/4" per foot slope',
        sample: 'Check all horizontal drain runs',
        critical: true,
        failure_action: '❌ STOP - Re-pitch drains'
      },
      {
        id: 'HP4-PLMB-04',
        category: 'mep',
        item: 'Drain water test',
        requirement: 'Fill drains with water, check for leaks',
        method: 'Visual inspection after 30 min hold',
        acceptance: 'No visible leaks',
        sample: 'Test entire DWV system',
        critical: true,
        failure_action: '❌ STOP - Repair leaks'
      },
      // MECHANICAL
      {
        id: 'HP4-MECH-01',
        category: 'mep',
        item: 'Duct sizing',
        requirement: 'Per shop drawings',
        code_reference: 'M02.1',
        method: 'Measure duct dimensions',
        acceptance: 'Ducts match specified sizes',
        sample: 'Verify main trunk + 3 branches',
        critical: false,
        failure_action: '⚠️ DOCUMENT - Note deviations'
      },
      {
        id: 'HP4-MECH-02',
        category: 'mep',
        item: 'Duct sealing',
        requirement: 'All joints sealed with mastic + foil tape',
        code_reference: 'IMC 603.9',
        method: 'Visual inspection',
        acceptance: 'All joints fully sealed',
        sample: '100% visual check',
        critical: true,
        failure_action: '⚠️ REPAIR - Seal all joints'
      },
      {
        id: 'HP4-MECH-03',
        category: 'mep',
        item: 'Duct leakage test',
        requirement: '<6 CFM25 per 100 sq ft',
        code_reference: 'IECC R403.3.6',
        method: 'Duct blaster test at 25 Pa',
        acceptance: 'Leakage within limit',
        sample: 'Test entire duct system',
        critical: true,
        failure_action: '❌ STOP - Seal leaks, re-test'
      }
    ]
  };
}

// ========================================
// FORMATTING
// ========================================

export function formatHoldPointChecklist(hp: HoldPointCriteria): string {
  let output = `# ${hp.hold_point} INSPECTION CRITERIA\n\n`;
  output += `**Phase:** ${hp.phase_name}\n`;
  output += `**TPIA Required:** ${hp.tpia_required ? '✅ Yes (NTA inspector must sign off)' : '❌ No (internal QA only)'}\n`;
  output += `**Estimated Duration:** ${hp.estimated_duration_minutes} minutes\n\n`;

  // Group by category
  const byCategory: Record<string, InspectionCriteria[]> = {};
  for (const criteria of hp.criteria) {
    if (!byCategory[criteria.category]) {
      byCategory[criteria.category] = [];
    }
    byCategory[criteria.category].push(criteria);
  }

  for (const [category, items] of Object.entries(byCategory)) {
    output += `## ${category.toUpperCase()}\n\n`;

    for (const item of items) {
      const criticalFlag = item.critical ? '❌ CRITICAL' : '⚠️ STANDARD';
      output += `### ${item.id}: ${item.item}\n\n`;
      output += `**Requirement:** ${item.requirement}\n`;
      if (item.code_reference) {
        output += `**Code:** ${item.code_reference}\n`;
      }
      output += `**Method:** ${item.method}\n`;
      output += `**Acceptance:** ${item.acceptance}\n`;
      output += `**Sample:** ${item.sample}\n`;
      output += `**Severity:** ${criticalFlag}\n`;
      output += `**If Failed:** ${item.failure_action}\n\n`;
      output += `- [ ] PASS\n`;
      output += `- [ ] FAIL\n\n`;
      output += `---\n\n`;
    }
  }

  return output;
}

// ========================================
// EXPORT MAIN FUNCTION
// ========================================

export default async function generateHoldPointCriteria(
  phase: number,
  specs: any
): Promise<HoldPointCriteria> {
  console.log('🔍 Hold Point Criteria Generator Agent');
  console.log('=======================================');

  let criteria: HoldPointCriteria;

  switch (phase) {
    case 1:
      criteria = generateHP1Criteria(specs);
      break;
    case 2:
      criteria = generateHP2Criteria(specs);
      break;
    case 4:
      criteria = generateHP4Criteria(specs);
      break;
    default:
      throw new Error(`Hold point criteria not yet implemented for Phase ${phase}`);
  }

  const criticalCount = criteria.criteria.filter(c => c.critical).length;
  console.log(`✅ Generated ${criteria.criteria.length} inspection criteria for ${criteria.hold_point}`);
  console.log(`   Critical items: ${criticalCount}`);
  console.log(`   TPIA required: ${criteria.tpia_required ? 'Yes' : 'No'}`);

  return criteria;
}

// ========================================
// CLI INTERFACE
// ========================================

if (require.main === module) {
  const phase = parseInt(process.argv[2] || '1');

  const mockSpecs = {
    spacing: '16" O.C.',
    components: { subfloor: '3/4" T&G OSB' },
    fasteners: { floor_sheathing_edge: '8" O.C. edges' }
  };

  generateHoldPointCriteria(phase, mockSpecs)
    .then(result => {
      console.log('\n📋 Hold Point Criteria:\n');
      console.log(formatHoldPointChecklist(result));
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}
