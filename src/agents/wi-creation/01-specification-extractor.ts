/**
 * AGENT 1: SPECIFICATION EXTRACTOR
 *
 * Purpose: Extract structured specifications from shop drawing PDFs and JSON data
 * Input: PDF text, cc21te-tasks.json, traceability.md
 * Output: Structured specifications for work instruction generation
 *
 * Key Capabilities:
 * - Parse fastener schedules from drawing tables
 * - Extract material specifications (dimensions, grades, species)
 * - Identify spacing requirements (16" O.C., etc.)
 * - Parse structural hardware callouts (Simpson connectors, hold-downs)
 * - Extract MEP specifications (wire sizes, pipe sizes, duct dimensions)
 */

import fs from 'fs';
import path from 'path';

// ========================================
// TYPES
// ========================================

export interface ModuleSpecifications {
  module_info: {
    name: string;
    dimensions: string;
    square_footage: number;
    building_type: string;
    occupancy: string;
  };

  floor_system: {
    floor_trusses?: string;
    joist_spacing: string;
    lvl_outer_rim?: string;
    inner_rim?: string;
    floor_beam?: string;
    subfloor: string;
  };

  wall_system: {
    exterior_sip?: string;
    interior_studs: string;
    interior_studs_6?: string;
    shear_wall_sheathing?: string;
    sip_top_plate?: string;
  };

  roof_system: {
    sip_roof?: string;
    ridge_beam?: string;
    roof_pitch: string;
    ceiling_furring?: string;
  };

  fastener_schedule: Record<string, string>;
  structural_hardware: Record<string, string>;

  codes_standards: {
    building_code: string;
    energy_code: string;
    electrical_code: string;
    plumbing_code: string;
    mechanical_code: string;
  };

  drawing_references?: Record<string, string>;
}

// ========================================
// CORE EXTRACTION FUNCTIONS
// ========================================

/**
 * Load module specifications from cc21te-tasks.json
 */
export function loadModuleSpecs(projectPath: string = 'data/cc21te'): ModuleSpecifications {
  const tasksFile = path.join(process.cwd(), projectPath, 'cc21te-tasks.json');

  if (!fs.existsSync(tasksFile)) {
    throw new Error(`Specifications file not found: ${tasksFile}`);
  }

  const data = JSON.parse(fs.readFileSync(tasksFile, 'utf-8'));

  return {
    module_info: data.module_info,
    floor_system: data.floor_system,
    wall_system: data.wall_system,
    roof_system: data.roof_system,
    fastener_schedule: data.fastener_schedule,
    structural_hardware: data.structural_hardware,
    codes_standards: data.codes_standards,
    drawing_references: data.pdf_page_references
  };
}

/**
 * Extract phase-specific specifications
 */
export function extractPhaseSpecs(specs: ModuleSpecifications, phase: number): any {
  switch (phase) {
    case 1: // Floor System
      return {
        system: 'floor',
        components: specs.floor_system,
        fasteners: extractFastenersByPattern(specs.fastener_schedule, ['floor', 'rim', 'lvl']),
        hardware: extractHardwareByPattern(specs.structural_hardware, ['beam', 'bearing']),
        drawings: specs.drawing_references?.floor || 'SM10, SM10.1',
        spacing: specs.floor_system.joist_spacing
      };

    case 2: // Wall System
      return {
        system: 'wall',
        components: specs.wall_system,
        fasteners: extractFastenersByPattern(specs.fastener_schedule, ['sip', 'wall', 'shear']),
        hardware: extractHardwareByPattern(specs.structural_hardware, ['hold_down']),
        drawings: specs.drawing_references?.wall || 'SM10.2-SM10.5, SM40',
        spacing: specs.wall_system.interior_studs
      };

    case 3: // Roof System
      return {
        system: 'roof',
        components: specs.roof_system,
        fasteners: extractFastenersByPattern(specs.fastener_schedule, ['roof', 'sip_roof']),
        hardware: extractHardwareByPattern(specs.structural_hardware, ['ridge']),
        drawings: specs.drawing_references?.roof || 'SM11, SM11.1',
        pitch: specs.roof_system.roof_pitch
      };

    case 4: // MEP (requires different data structure)
      return {
        system: 'mep',
        electrical: 'Per E02 shop drawings',
        plumbing: 'Per P03 shop drawings',
        mechanical: 'Per M02.1 shop drawings',
        drawings: 'E02, M02.1, P03',
        codes: {
          electrical: specs.codes_standards.electrical_code,
          plumbing: specs.codes_standards.plumbing_code,
          mechanical: specs.codes_standards.mechanical_code
        }
      };

    default:
      return { system: `phase_${phase}`, components: {} };
  }
}

/**
 * Extract fasteners matching pattern keywords
 */
function extractFastenersByPattern(schedule: Record<string, string>, patterns: string[]): Record<string, string> {
  const filtered: Record<string, string> = {};

  for (const [key, value] of Object.entries(schedule)) {
    if (patterns.some(pattern => key.toLowerCase().includes(pattern))) {
      filtered[key] = value;
    }
  }

  return filtered;
}

/**
 * Extract hardware matching pattern keywords
 */
function extractHardwareByPattern(hardware: Record<string, string>, patterns: string[]): Record<string, string> {
  const filtered: Record<string, string> = {};

  for (const [key, value] of Object.entries(hardware)) {
    if (patterns.some(pattern => key.toLowerCase().includes(pattern))) {
      filtered[key] = value;
    }
  }

  return filtered;
}

/**
 * Parse fastener specification into components
 */
export function parseFastenerSpec(spec: string): {
  type: string;
  size: string;
  spacing_edge?: string;
  spacing_field?: string;
  quantity?: number;
} {
  // Example: "0.131\" x 2-1/2\" nails @ 6\" O.C."
  const sizeMatch = spec.match(/(\d+\.\d+["']?\s*x\s*[\d-/]+["']?)/);
  const typeMatch = spec.match(/(nails?|screws?|bolts?|clips?)/i);
  const spacingMatch = spec.match(/@\s*([\d-/]+["']?\s*O\.C\.)/i);
  const quantityMatch = spec.match(/\((\d+)\)/);

  return {
    type: typeMatch?.[1] || 'fastener',
    size: sizeMatch?.[1] || spec,
    spacing_edge: spacingMatch?.[1],
    quantity: quantityMatch ? parseInt(quantityMatch[1]) : undefined
  };
}

/**
 * Normalize dimension strings
 */
export function normalizeDimension(dim: string): {
  value: number;
  unit: string;
  display: string;
} {
  // Handle formats: 16" O.C., 2x4, 1-3/4" x 9-1/4"
  const inchMatch = dim.match(/([\d-/]+)\s*["']/);

  if (inchMatch) {
    const value = evaluateFraction(inchMatch[1]);
    return { value, unit: 'inch', display: `${inchMatch[1]}"` };
  }

  return { value: 0, unit: 'unknown', display: dim };
}

/**
 * Evaluate fractional dimensions (e.g., "1-3/4" → 1.75)
 */
function evaluateFraction(frac: string): number {
  if (frac.includes('-')) {
    const [whole, fraction] = frac.split('-');
    return parseInt(whole) + evaluateFraction(fraction);
  }
  if (frac.includes('/')) {
    const [num, denom] = frac.split('/');
    return parseInt(num) / parseInt(denom);
  }
  return parseFloat(frac);
}

// ========================================
// EXPORT MAIN FUNCTION
// ========================================

export default async function extractSpecifications(
  projectPath: string = 'data/cc21te',
  phase?: number
): Promise<any> {
  console.log('🔍 Specification Extractor Agent');
  console.log('================================');

  const specs = loadModuleSpecs(projectPath);

  console.log(`✅ Loaded specifications for: ${specs.module_info.name}`);
  console.log(`   Dimensions: ${specs.module_info.dimensions}`);
  console.log(`   Square Footage: ${specs.module_info.square_footage} SF`);

  if (phase) {
    const phaseSpecs = extractPhaseSpecs(specs, phase);
    console.log(`✅ Extracted Phase ${phase} specifications: ${phaseSpecs.system}`);
    return phaseSpecs;
  }

  return specs;
}

// ========================================
// CLI INTERFACE
// ========================================

if (require.main === module) {
  const phase = process.argv[2] ? parseInt(process.argv[2]) : undefined;
  extractSpecifications('data/cc21te', phase)
    .then(result => {
      console.log('\n📋 Extracted Specifications:');
      console.log(JSON.stringify(result, null, 2));
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}
