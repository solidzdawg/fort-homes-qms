/**
 * AGENT 4: STEP-BY-STEP PROCEDURE WRITER
 *
 * Purpose: Generate detailed step-by-step work instructions
 * Input: Phase specs, code requirements, safety profile
 * Output: Formatted procedure steps with quality checkpoints
 *
 * Key Capabilities:
 * - Write clear, actionable steps at 8th-grade reading level
 * - Embed quality checkpoints within procedures
 * - Reference drawing callouts for each step
 * - Add measurement tolerances
 * - Include time estimates per step
 *
 * RESEARCH NEEDED: Industry standard production rates, time-motion studies
 * Current implementation uses Fort Homes historical data estimates
 */

// ========================================
// TYPES
// ========================================

export interface ProcedureStep {
  step_number: string;
  title: string;
  description: string;
  actions: string[];
  quality_check?: string;
  measurement?: string;
  tolerance?: string;
  drawing_reference?: string;
  time_estimate_minutes?: number;
  tools_needed?: string[];
  crew_size?: number;
  safety_note?: string;
}

export interface PhaseType {
  phase: number;
  phase_name: string;
  sections: ProcedureSection[];
}

export interface ProcedureSection {
  section_number: string;
  section_title: string;
  steps: ProcedureStep[];
  duration_estimate?: string;
}

// ========================================
// CORE PROCEDURE TEMPLATES
// ========================================

export function generatePhase1Procedure(specs: any): ProcedureSection[] {
  return [
    {
      section_number: '1',
      section_title: 'Chassis Positioning & Inspection',
      duration_estimate: '30-45 minutes',
      steps: [
        {
          step_number: '1.1',
          title: 'Receive and inspect chassis',
          description: 'Visual inspection of steel chassis frame for damage during transport',
          actions: [
            'Inspect all welds for cracks or damage',
            'Check I-beam flanges for bending or twisting',
            'Verify chassis dimensions match shop drawings',
            'Document any damage with photos'
          ],
          quality_check: 'Chassis must be free of structural damage before accepting',
          drawing_reference: 'SM10 (chassis dimensions)',
          time_estimate_minutes: 15,
          crew_size: 2,
          safety_note: 'Wear hard hat and steel-toe boots during forklift operations'
        },
        {
          step_number: '1.2',
          title: 'Position chassis in production bay',
          description: 'Use forklift or overhead crane to position chassis in designated bay',
          actions: [
            'Clear bay of obstructions',
            'Position chassis parallel to bay reference lines',
            'Lower onto adjustable support legs or blocking',
            'Leave adequate clearance for worker access (minimum 3 feet all sides)'
          ],
          time_estimate_minutes: 10,
          tools_needed: ['Forklift', 'Spotter'],
          crew_size: 2
        },
        {
          step_number: '1.3',
          title: 'Level and square chassis',
          description: 'Adjust chassis to ensure level and square foundation',
          actions: [
            'Place 4-foot level across chassis width at multiple locations',
            'Adjust support legs until level within tolerance',
            'Measure diagonal corners (should be equal if square)',
            'Record baseline measurements'
          ],
          quality_check: 'Chassis must be level within ±1/4" and square within ±1/2"',
          measurement: 'Diagonal measurements',
          tolerance: '±1/2"',
          time_estimate_minutes: 15,
          tools_needed: ['4-foot level', 'Tape measure'],
          crew_size: 2
        }
      ]
    },
    {
      section_number: '2',
      section_title: 'Floor Joist Layout & Installation',
      duration_estimate: '2-3 hours',
      steps: [
        {
          step_number: '2.1',
          title: 'Install LVL rim boards',
          description: `Install outer rim boards per specifications: ${specs.components?.lvl_outer_rim || '1-3/4" x 9-1/4" LVL'}`,
          actions: [
            'Apply construction adhesive to chassis top flange',
            'Position LVL rim board flush with chassis edge',
            'Secure with fasteners per schedule',
            'Check rim board is level along length',
            'Install corner connections per structural hardware schedule'
          ],
          quality_check: 'Rim board must be level within 1/4" per 10 feet',
          drawing_reference: specs.drawings || 'SM10, SM40 Detail 3',
          measurement: 'Level check',
          tolerance: '±1/4" per 10 feet',
          time_estimate_minutes: 45,
          tools_needed: ['Circular saw', 'Nail gun', 'Level', 'Adhesive gun'],
          crew_size: 2
        },
        {
          step_number: '2.2',
          title: 'Mark joist layout',
          description: `Snap chalk lines for joist spacing: ${specs.spacing || '16" O.C.'}`,
          actions: [
            'Start at one end, mark first joist location',
            `Measure and mark every ${specs.spacing || '16"'} on center`,
            'Use speed square to mark perpendicular lines across rim',
            'Mark both sides of rim board for alignment',
            'Double-check layout before installing joists'
          ],
          quality_check: 'Verify spacing is consistent before proceeding',
          measurement: 'On-center spacing',
          tolerance: '±1/4"',
          time_estimate_minutes: 20,
          tools_needed: ['Chalk line', 'Tape measure', 'Speed square', 'Pencil'],
          crew_size: 1
        },
        {
          step_number: '2.3',
          title: 'Install floor joists',
          description: 'Position and secure floor joists/trusses at marked locations',
          actions: [
            'Position first joist at marked location',
            'Ensure joist seats fully into rim pocket',
            'Check joist is plumb using 2-foot level',
            'Install joist hangers or direct nail per fastener schedule',
            'Repeat for all remaining joists',
            'Install blocking at mid-span if required (span >8 feet per IRC R502.7)'
          ],
          quality_check: 'All joists properly seated, spacing within tolerance',
          drawing_reference: specs.drawings || 'SM10, SM40 Detail 5',
          measurement: 'Spacing check (sample 10%)',
          tolerance: '±1/4"',
          time_estimate_minutes: 90,
          tools_needed: ['Nail gun', '2-foot level', 'Joist hangers', 'Blocking material'],
          crew_size: 3,
          safety_note: 'Use fall protection when working >6 feet above ground'
        }
      ]
    },
    {
      section_number: '3',
      section_title: 'Subfloor Installation',
      duration_estimate: '2-4 hours',
      steps: [
        {
          step_number: '3.1',
          title: 'Apply subfloor adhesive',
          description: 'Apply continuous bead of construction adhesive to joist tops',
          actions: [
            'Load adhesive into caulk gun',
            'Apply 1/4" continuous bead along each joist',
            'Work in sections to prevent adhesive skinning over',
            'Apply adhesive to rim boards as well'
          ],
          time_estimate_minutes: 15,
          tools_needed: ['Caulk gun', 'Subfloor adhesive'],
          crew_size: 1,
          safety_note: 'Use ventilation, avoid skin contact with adhesive'
        },
        {
          step_number: '3.2',
          title: 'Position and fasten subfloor panels',
          description: `Install ${specs.components?.subfloor || '3/4" T&G OSB'} panels`,
          actions: [
            'Start at one corner, position first panel with tongue toward interior',
            'Ensure panel edges land on joist centers',
            'Stagger panel joints (offset by at least 2 joists)',
            'Leave 1/8" gap at panel ends for expansion',
            'Fasten per schedule: edges at 8" O.C., field at 12" O.C.',
            'Tap panels tight with rubber mallet before final fastening'
          ],
          quality_check: 'No gaps between T&G joints, all edges supported',
          drawing_reference: specs.drawings || 'SM40 Detail 5',
          measurement: 'Fastener spacing',
          tolerance: 'Edge 8" O.C. ±1", field 12" O.C. ±1"',
          time_estimate_minutes: 120,
          tools_needed: ['Circular saw', 'Nail gun', 'Rubber mallet', 'Chalk line'],
          crew_size: 3
        },
        {
          step_number: '3.3',
          title: 'Inspect and document',
          description: 'Final QC inspection before proceeding to HP-1',
          actions: [
            'Walk entire floor surface checking for soft spots',
            'Verify all fasteners are flush (no high nails)',
            'Check for voids or unsupported edges',
            'Measure floor diagonals to verify square',
            'Take photos documenting completed floor system',
            'Complete pre-inspection checklist'
          ],
          quality_check: 'Floor must be flat, solid, and square before HP-1',
          time_estimate_minutes: 20,
          tools_needed: ['Tape measure', 'Camera'],
          crew_size: 1
        }
      ]
    }
  ];
}

export function generatePhase2Procedure(specs: any): ProcedureSection[] {
  return [
    {
      section_number: '1',
      section_title: 'Wall Layout & Bottom Plate Installation',
      duration_estimate: '1-2 hours',
      steps: [
        {
          step_number: '1.1',
          title: 'Snap wall layout lines',
          description: 'Mark wall locations on subfloor per shop drawings',
          actions: [
            'Reference shop drawings for wall locations',
            'Measure and mark wall centerlines',
            'Snap chalk lines for interior and exterior walls',
            'Mark door and window openings',
            'Verify dimensions match shop drawings'
          ],
          quality_check: 'All walls square to each other, dimensions within 1/4"',
          drawing_reference: specs.drawings || 'SM10.2-SM10.5',
          time_estimate_minutes: 30,
          tools_needed: ['Chalk line', 'Tape measure', 'Speed square'],
          crew_size: 2
        },
        {
          step_number: '1.2',
          title: 'Install bottom plates',
          description: 'Fasten bottom plates to subfloor at wall lines',
          actions: [
            'Cut bottom plates to length per layout',
            'Position plates on chalk lines',
            'Fasten to subfloor with construction screws or nails',
            'Leave openings for door locations',
            'Verify plates are straight and on layout'
          ],
          time_estimate_minutes: 45,
          tools_needed: ['Circular saw', 'Drill/impact driver', 'Fasteners'],
          crew_size: 2
        }
      ]
    },
    {
      section_number: '2',
      section_title: 'Wall Framing (for stick-built walls)',
      duration_estimate: '3-5 hours (if applicable)',
      steps: [
        {
          step_number: '2.1',
          title: 'Cut and install studs',
          description: `Install studs at ${specs.spacing || '16" O.C.'}`,
          actions: [
            'Measure wall height (floor to ceiling)',
            `Cut studs to length (deduct plate thickness)`,
            `Mark stud layout on top and bottom plates at ${specs.spacing || '16" O.C.'}`,
            'Install studs using framing nailer',
            'Frame window and door openings per structural details',
            'Install headers over openings per engineering'
          ],
          quality_check: 'Stud spacing within tolerance, openings properly framed',
          drawing_reference: specs.drawings || 'SM10.2-SM10.5',
          measurement: 'Stud spacing',
          tolerance: '±1/2"',
          time_estimate_minutes: 180,
          crew_size: 3
        }
      ]
    },
    {
      section_number: '3',
      section_title: 'SIP Panel Installation (for SIP walls)',
      duration_estimate: '4-6 hours',
      steps: [
        {
          step_number: '3.1',
          title: 'Install SIP wall panels',
          description: `Install ${specs.components?.exterior_sip || '6-3/8" SIP panels'}`,
          actions: [
            'Position first panel at corner',
            'Apply foam adhesive to spline',
            'Set panel plumb using level',
            'Fasten bottom plate per schedule',
            'Install spline between panels',
            'Continue panel installation around perimeter',
            'Cut openings for windows/doors per shop drawings'
          ],
          quality_check: 'Panels plumb within 1/4" per 8 feet',
          drawing_reference: specs.drawings || 'AM10, SM40',
          time_estimate_minutes: 240,
          tools_needed: ['SIP saw', 'Level', 'Foam adhesive', 'Fasteners'],
          crew_size: 3,
          safety_note: 'SIP panels are heavy - use team lift (minimum 2 people)'
        }
      ]
    }
  ];
}

// ========================================
// FORMATTING FUNCTIONS
// ========================================

export function formatProcedureStep(step: ProcedureStep): string {
  let output = `### STEP ${step.step_number}: ${step.title}\n\n`;

  if (step.drawing_reference) {
    output += `**Drawing Reference:** ${step.drawing_reference}\n`;
  }
  if (step.time_estimate_minutes) {
    output += `**Time Estimate:** ${step.time_estimate_minutes} minutes`;
    if (step.crew_size) {
      output += ` (${step.crew_size}-person crew)`;
    }
    output += `\n`;
  }
  output += `\n`;

  if (step.safety_note) {
    output += `⚠️ **SAFETY:** ${step.safety_note}\n\n`;
  }

  output += `**Procedure:**\n`;
  for (const action of step.actions) {
    output += `- [ ] ${action}\n`;
  }
  output += `\n`;

  if (step.quality_check) {
    output += `✅ **Quality Checkpoint:** ${step.quality_check}\n`;
    if (step.measurement && step.tolerance) {
      output += `📏 **Measurement:** ${step.measurement} (Tolerance: ${step.tolerance})\n`;
    }
    output += `\n`;
  }

  if (step.tools_needed && step.tools_needed.length > 0) {
    output += `🧰 **Tools:** ${step.tools_needed.join(', ')}\n\n`;
  }

  output += `---\n\n`;

  return output;
}

export function formatProcedureSection(section: ProcedureSection): string {
  let output = `## ${section.section_number}. ${section.section_title}\n\n`;

  if (section.duration_estimate) {
    output += `**Duration:** ${section.duration_estimate}\n\n`;
  }

  for (const step of section.steps) {
    output += formatProcedureStep(step);
  }

  return output;
}

// ========================================
// EXPORT MAIN FUNCTION
// ========================================

export default async function generateProcedure(phase: number, specs: any): Promise<ProcedureSection[]> {
  console.log('📝 Step-by-Step Procedure Writer Agent');
  console.log('======================================');

  let sections: ProcedureSection[] = [];

  switch (phase) {
    case 1:
      sections = generatePhase1Procedure(specs);
      break;
    case 2:
      sections = generatePhase2Procedure(specs);
      break;
    default:
      console.log(`⚠️  Procedure template not yet implemented for Phase ${phase}`);
      return [];
  }

  const totalSteps = sections.reduce((sum, section) => sum + section.steps.length, 0);
  console.log(`✅ Generated ${sections.length} sections with ${totalSteps} total steps`);

  return sections;
}

// ========================================
// CLI INTERFACE
// ========================================

if (require.main === module) {
  const phase = parseInt(process.argv[2] || '1');

  // Mock specs for demonstration
  const mockSpecs = {
    system: 'floor',
    components: {
      lvl_outer_rim: '1-3/4" x 9-1/4" LVL',
      subfloor: '3/4" T&G OSB'
    },
    spacing: '16" O.C.',
    drawings: 'SM10, SM10.1'
  };

  generateProcedure(phase, mockSpecs)
    .then(sections => {
      console.log('\n📋 Generated Procedure:\n');
      for (const section of sections) {
        console.log(formatProcedureSection(section));
      }
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}
