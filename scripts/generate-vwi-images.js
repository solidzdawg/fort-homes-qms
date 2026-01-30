#!/usr/bin/env node
/**
 * FORT HOMES - Visual Work Instruction Image Generator
 * 
 * Automatically generates all images for CC21TE Visual Work Instructions
 * using OpenAI's DALL-E 3 API.
 * 
 * SETUP:
 * 1. Get an OpenAI API key from https://platform.openai.com/api-keys
 * 2. Run: npm install openai
 * 3. Set your API key: set OPENAI_API_KEY=sk-your-key-here (Windows)
 *    Or: export OPENAI_API_KEY=sk-your-key-here (Mac/Linux)
 * 4. Run: node scripts/generate-vwi-images.js
 * 
 * COST: ~$0.04-0.08 per image (DALL-E 3 standard)
 * TOTAL: ~$2.50-$4.50 for all 56 images
 */

const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const CONFIG = {
  outputDir: path.join(__dirname, '..', 'assets', 'images', 'work-instructions', 'CC21TE'),
  model: 'dall-e-3',
  size: '1792x1024', // 16:9 landscape for work instructions
  quality: 'standard', // 'standard' or 'hd' (hd costs 2x)
  style: 'natural', // 'natural' or 'vivid'
  delayBetweenRequests: 2000, // 2 seconds to avoid rate limits
};

// All image prompts organized by phase
const IMAGE_PROMPTS = {
  // ═══════════════════════════════════════════════════════════════════
  // PHASE 1: FLOOR SYSTEM
  // ═══════════════════════════════════════════════════════════════════
  'step-01-floor': [
    {
      filename: '01-01-material-staging.png',
      prompt: 'Isometric view of organized material staging area in modular home factory. LVL rim boards stacked with grade stamps visible reading "2.0E LVL", floor trusses bundled at 9-1/4 inch depth with metal connector plates, 23/32 inch tongue-and-groove OSB subfloor panels on vertical rack. Labels showing "CC21TE FLOOR KIT". Clean industrial concrete floor, bright LED factory lighting from above. Professional construction documentation photography style, highly detailed, photorealistic, 16:9 aspect ratio. No text overlays.'
    },
    {
      filename: '01-02-position-rim.png',
      prompt: 'Two factory workers in hard hats, safety glasses, and hi-vis vests positioning 1-3/4 x 9-1/4 inch LVL rim board onto steel chassis ledger in modular home factory. Grade stamp "2.0E LVL" visible on wood grain. Workers aligning board to blue chalk line on chassis. Bright factory lighting from skylights, construction tools nearby. Camera angle from 45 degrees above. Professional documentation photography, photorealistic, detailed wood grain texture. No text overlays.'
    },
    {
      filename: '01-02-flush-correct.png',
      prompt: 'Close-up construction photo of combination square checking LVL rim board flush alignment to steel chassis edge. Zero gap visible between wood and steel. Proper alignment demonstrated with ruler showing exact flush fit. Worker gloved hand holding square steady. Bright work lighting, sharp focus on measurement. Professional QC inspection photo style, photorealistic. Green check mark visual implied by perfect alignment. No text overlays.'
    },
    {
      filename: '01-02-flush-wrong.png',
      prompt: 'Close-up construction photo showing INCORRECT installation - LVL rim board overhanging steel chassis edge by 1/4 inch. Combination square revealing gap and misalignment. Red warning implied by visible error. Demonstrates what NOT to do. Same factory setting, work lighting. Professional QC documentation showing defect example, photorealistic. No text overlays.'
    },
    {
      filename: '01-03-check-square.png',
      prompt: 'Carpenter framing square positioned at corner of two LVL rim boards checking 90 degree angle. Steel chassis visible below. Workers gloved hands holding square. Close-up showing proper square verification technique. Chalk marks visible. Factory lighting, construction setting. Professional documentation photo showing QC measurement technique, photorealistic, sharp detail. No text overlays.'
    },
    {
      filename: '01-04-drive-screws.png',
      prompt: 'Close-up of impact driver driving Simpson SDWS22400 structural screw through LVL rim board into steel chassis in modular home factory. Wood shavings visible from screw entry. Screw head countersinking into LVL wood grain. Worker wearing safety glasses, gloved hands operating DeWalt impact driver. Professional construction documentation, photorealistic, detailed focus on fastener installation. No text overlays.'
    },
    {
      filename: '01-05-position-truss.png',
      prompt: 'Two factory workers in hard hats lowering 9-1/4 inch pre-engineered floor truss between LVL rim boards in modular home factory. Metal connector plates visible on truss. Truss aligned to layout mark on rim board. Workers supporting truss at both ends. Steel chassis below, bright factory lighting. Professional construction documentation, photorealistic, showing proper two-person truss handling. No text overlays.'
    },
    {
      filename: '01-06-check-spacing.png',
      prompt: 'Close-up of tape measure hooked on floor truss web, extended to next truss showing exactly 16 inches on center spacing. Clear view of tape measure markings at 16 inch mark aligned with truss centerline. LVL rim board visible below. Factory lighting, construction setting. Professional QC measurement documentation photo, photorealistic, sharp focus on measurement. No text overlays.'
    },
    {
      filename: '01-07-toenail.png',
      prompt: 'Pneumatic framing nailer driving 16d nail at 45 degree angle through floor truss bottom chord into LVL rim board. Toe-nail connection technique demonstrated. Worker in safety glasses operating nailer. Dust particles visible from nail impact. Close-up showing proper angle and placement. Factory construction setting, bright work lighting. Professional documentation photo, photorealistic. No text overlays.'
    },
    {
      filename: '01-08-apply-adhesive.png',
      prompt: 'Worker applying 1/4 inch bead of PL Premium construction adhesive from caulk gun onto top chord of floor truss in serpentine pattern. Adhesive tube clearly visible. Clean continuous bead with no gaps. Floor truss system below, modular home factory setting. Professional construction documentation showing proper adhesive application technique, photorealistic. No text overlays.'
    },
    {
      filename: '01-09-position-subfloor.png',
      prompt: 'Two workers in hard hats positioning 4x8 foot OSB subfloor panel onto floor trusses with adhesive. Tongue edge of T&G panel visible. Staggered joint pattern visible on already-installed panels. Workers lowering panel carefully. Modular home factory setting, bright lighting. Professional construction documentation, photorealistic. No text overlays.'
    },
    {
      filename: '01-10-tongue-groove.png',
      prompt: 'Close-up of tongue and groove OSB subfloor joint being seated with rubber mallet. Cross-section detail showing tongue engaging groove. Worker gloved hand holding mallet. 23/32 inch panel thickness visible at edge. Proper T&G connection technique demonstrated. Construction setting, good lighting. Professional documentation photo, photorealistic, detailed wood texture. No text overlays.'
    },
    {
      filename: '01-11-nail-pattern.png',
      prompt: 'Overhead view of completed subfloor showing proper nail pattern. 6 inch on center nailing visible at panel edges, 12 inch on center in field. Blue chalk lines marking truss locations underneath. Ring-shank nail heads visible in straight rows. Completed modular floor deck. Professional QC documentation photo from above, photorealistic. No text overlays.'
    },
    {
      filename: '01-12-stagger-pattern.png',
      prompt: 'Aerial view of partially completed subfloor showing staggered panel layout pattern. End joints offset minimum 24 inches between adjacent rows clearly visible. Multiple 4x8 OSB panels installed. Chalk layout lines visible. Factory floor visible at edges. Professional construction documentation showing proper panel stagger, photorealistic. No text overlays.'
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // PHASE 2: WALL SYSTEM
  // ═══════════════════════════════════════════════════════════════════
  'step-02-walls': [
    {
      filename: '02-01-sip-crosssection.png',
      prompt: 'Close-up cross-section of 6-3/8 inch SIP wall panel showing three distinct layers: 7/16 inch OSB outer skin, 5-1/2 inch white EPS expanded polystyrene foam core, 7/16 inch OSB inner skin. Clean cut edge showing material composition. Precise dimensions implied. Professional product documentation photography, photorealistic, studio-quality lighting showing material texture. No text overlays.'
    },
    {
      filename: '02-02-attach-rigging.png',
      prompt: 'Factory worker attaching yellow nylon lifting straps to large SIP panel for crane lift. Panel on wheeled cart in modular home factory. Strap positions at 1/3 points along panel length for proper balance. Worker in hard hat, safety vest. Gantry crane hook visible above. Professional industrial documentation, photorealistic. No text overlays.'
    },
    {
      filename: '02-03-lift-panel.png',
      prompt: 'Large 8-foot tall SIP wall panel suspended vertical from gantry crane in modular home factory. Four workers with guide ropes controlling panel movement. All workers in hard hats, safety vests, steel-toe boots. Panel showing OSB exterior face and EPS foam core visible at edge. High ceiling factory interior, industrial lighting. Professional safety documentation photo, photorealistic. No text overlays.'
    },
    {
      filename: '02-04-lower-panel.png',
      prompt: 'SIP wall panel being lowered toward subfloor deck, bottom edge approaching blue chalk layout line. Workers guiding panel with ropes. Crane cable visible above. Partially completed modular home structure visible. Factory setting with bright lighting. Professional construction documentation showing proper panel placement technique, photorealistic. No text overlays.'
    },
    {
      filename: '02-05-align-layout.png',
      prompt: 'Close-up of SIP panel bottom plate edge aligned precisely to blue chalk line on OSB subfloor. Worker boot kicking panel into final position. Gap-free alignment demonstrated. Chalk line crisp and straight. Factory floor setting. Professional QC documentation showing proper panel alignment, photorealistic, sharp detail. No text overlays.'
    },
    {
      filename: '02-06-temp-braces.png',
      prompt: '2x4 diagonal temporary brace attached from SIP wall panel top to subfloor stake. 4-foot level pressed against panel face showing plumb bubble centered. Brace at 45 degree angle. Worker securing brace with screws. Modular home factory interior. Professional construction documentation showing proper temporary bracing technique, photorealistic. No text overlays.'
    },
    {
      filename: '02-07-install-a34.png',
      prompt: 'Close-up of Simpson A34 framing angle being nailed at SIP wall-to-floor connection. Metal clip straddling joint between wall and rim board. Pneumatic nailer driving 10d nail through pre-punched hole. 4 nails visible per leg. Professional hardware installation documentation, photorealistic, detailed view of connection. No text overlays.'
    },
    {
      filename: '02-08-install-cs16.png',
      prompt: 'Simpson CS16 coiled strap being installed across SIP panel joint. Metal strap centered on vertical joint between two panels. Worker nailing through pre-punched holes with pneumatic nailer. Strap connecting adjacent panels. Factory construction setting. Professional structural connection documentation, photorealistic. No text overlays.'
    },
    {
      filename: '02-09-apply-foam.png',
      prompt: 'Worker applying expanding foam sealant into SIP panel joint using foam gun applicator. Yellow foam dispensing into joint gap, full depth application visible. Worker in safety glasses. EPS foam core visible at joint edge. Factory interior setting. Professional air sealing documentation, photorealistic. No text overlays.'
    },
    {
      filename: '02-10-install-spline.png',
      prompt: 'Close-up of 2x lumber spline being pressed into routed channel at SIP panel joint. Wood spline fitting into recessed channel in EPS foam. Construction adhesive visible. Two SIP panels meeting at joint. Professional connection detail documentation, photorealistic, showing proper spline installation technique. No text overlays.'
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // PHASE 3: ROOF SYSTEM
  // ═══════════════════════════════════════════════════════════════════
  'step-03-roof': [
    {
      filename: '03-01-stage-ridge.png',
      prompt: 'Three individual 1-3/4 x 11-7/8 inch LVL beam plies laid parallel on factory floor. Grade stamps visible on each ply. 1/2 inch through-bolt hardware and washers laid out nearby. Clean factory floor, organized staging. Professional material documentation, photorealistic, showing beam components before assembly. No text overlays.'
    },
    {
      filename: '03-02-assemble-beam.png',
      prompt: 'Workers assembling 3-ply LVL ridge beam on factory floor. Clamps holding plies together while worker drives SDWS structural screws. Straightedge checking edge alignment. Crowns all facing same direction marked with chalk. Professional beam assembly documentation, photorealistic. No text overlays.'
    },
    {
      filename: '03-03-lift-ridge.png',
      prompt: 'Assembled 3-ply LVL ridge beam being lifted by gantry crane toward roof peak of modular home. Workers on scissor lifts at elevated positions guiding beam. Long beam spanning width of structure. Fall protection harnesses visible on elevated workers. High-ceiling factory interior. Professional heavy lift documentation, photorealistic. No text overlays.'
    },
    {
      filename: '03-04-position-roof.png',
      prompt: 'Large 12-1/8 inch thick SIP roof panel being positioned at 12:12 pitch angle on modular home structure. Panel edge meeting wall top plate. Workers on scaffolding guiding panel into position. Steep roof angle visible. Factory interior with gantry crane. Professional roof installation documentation, photorealistic. No text overlays.'
    },
    {
      filename: '03-05-check-overhang.png',
      prompt: 'Close-up of tape measure checking roof panel overhang at eave. Measure showing 12 inches from exterior wall face to panel edge. SIP roof panel extending beyond wall below. Proper eave detail demonstrated. Professional QC measurement documentation, photorealistic, clear measurement visible. No text overlays.'
    },
    {
      filename: '03-06-fasten-roof.png',
      prompt: 'Worker driving 8-inch SDWS structural screw through SIP roof panel into wall top plate at steep roof angle. Impact driver in use. Screw countersinking into OSB face of roof panel. Fall protection harness visible on worker. Roof pitch demonstrated. Professional fastener installation documentation, photorealistic. No text overlays.'
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // PHASE 4: MEP ROUGH-IN
  // ═══════════════════════════════════════════════════════════════════
  'step-04-mep': [
    {
      filename: '04-01-mark-outlets.png',
      prompt: 'Electrician marking outlet box location on SIP wall interior at 12 inches above finished floor. Using template and torpedo level for accurate placement. Pencil marks on OSB. Tape measure extended from floor. Worker in hard hat, safety glasses, tool belt. Factory interior lighting. Professional electrical layout documentation, photorealistic. No text overlays.'
    },
    {
      filename: '04-02-route-wire.png',
      prompt: 'Electrician fishing 14/2 NM-B Romex wire through factory-routed chase in SIP wall foam core. Fish tape visible pulling wire through horizontal chase. 1-1/2 inch access hole drilled at top plate. Wire coil on floor. Professional electrical rough-in documentation, photorealistic. No text overlays.'
    },
    {
      filename: '04-03-install-trap.png',
      prompt: 'Plumber connecting 1-1/2 inch PVC P-trap under lavatory rough-in location. Trap, tailpiece, and cleanout access visible. PVC primer and cement nearby. Worker in safety glasses and gloves. Floor cavity visible with drain line. Professional plumbing rough-in documentation, photorealistic. No text overlays.'
    },
    {
      filename: '04-04-mini-split.png',
      prompt: 'HVAC technician routing insulated refrigerant line set through SIP wall for mini-split system. Copper lines with foam insulation visible. Penetration through wall for outdoor condenser connection. Line set clipped to framing. Professional mechanical rough-in documentation, photorealistic. No text overlays.'
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // VERIFICATION & QC IMAGES
  // ═══════════════════════════════════════════════════════════════════
  'verification': [
    {
      filename: 'hp-1-inspection.png',
      prompt: 'QA inspector in hard hat and safety vest with clipboard inspecting completed modular floor system. Tape measure and 4-foot level nearby. Inspector checking connection hardware. Inspection form on clipboard. Completed subfloor deck visible. Factory lighting. Professional QC inspection documentation, photorealistic. No text overlays.'
    },
    {
      filename: 'hp-2-inspection.png',
      prompt: 'QA inspector using 4-foot level checking wall plumb on installed SIP panel. Clipboard with checklist in other hand. Wall-to-floor connection visible below. Inspector in full PPE. Modular home interior during production. Professional wall inspection documentation, photorealistic. No text overlays.'
    },
    {
      filename: 'hp-3-inspection.png',
      prompt: 'QA inspector on scaffolding inspecting SIP roof panel connection to ridge beam. Fall protection harness worn. Checking SIP screw penetration depth. Clipboard and inspection form. Completed roof assembly visible. Factory interior lighting from above. Professional roof inspection documentation, photorealistic. No text overlays.'
    },
    {
      filename: 'hp-4-inspection.png',
      prompt: 'QA inspector examining electrical panel installation in modular home. Checking for solar-ready label and proper wiring. Flashlight illuminating panel interior. Inspector in hard hat with clipboard. Factory production setting. Professional MEP inspection documentation, photorealistic. No text overlays.'
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // COMMON DEFECTS REFERENCE
  // ═══════════════════════════════════════════════════════════════════
  'defects': [
    {
      filename: 'defect-overdriven-screw.png',
      prompt: 'Close-up comparison showing INCORRECT over-driven screw in wood - screw head sunk too deep with crushed wood fibers around head indicating structural damage. Wood surface showing depression and damage. Red warning implied. Professional defect documentation for QC training, photorealistic. No text overlays.'
    },
    {
      filename: 'defect-correct-screw-depth.png',
      prompt: 'Close-up showing CORRECT screw installation in wood - screw head sitting 1/8 inch below surface with intact wood fibers around head. Proper countersink depth demonstrated. Clean installation. Green approval implied. Professional QC reference documentation, photorealistic. No text overlays.'
    },
    {
      filename: 'defect-wall-plumb.png',
      prompt: '4-foot level against wall showing bubble perfectly centered indicating plumb wall. Proper installation demonstrated. Level clearly visible with centered bubble. SIP wall surface behind. Professional QC reference showing correct plumb, photorealistic. No text overlays.'
    },
    {
      filename: 'defect-wall-out-plumb.png',
      prompt: '4-foot level against wall showing bubble off-center indicating out-of-plumb wall DEFECT. Visible lean in wall implied by bubble position. Red warning implied by defective condition. Professional defect documentation for QC training, photorealistic. No text overlays.'
    },
    {
      filename: 'defect-unsealed-joint.png',
      prompt: 'Close-up of SIP panel joint showing GAP without foam sealant - DEFECT condition. Daylight visible through joint gap. Air barrier breach demonstrated. EPS foam core visible at edge. Red warning implied. Professional defect documentation for QC training, photorealistic. No text overlays.'
    },
    {
      filename: 'defect-sealed-joint.png',
      prompt: 'Close-up of SIP panel joint properly sealed with expanding foam. No gaps visible. Continuous yellow foam sealant filling joint completely. Proper air barrier demonstrated. Green approval implied. Professional QC reference showing correct seal, photorealistic. No text overlays.'
    },
  ],
};

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper function to download image from URL
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete partial file
      reject(err);
    });
  });
}

// Helper function for delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate single image
async function generateImage(prompt, outputPath) {
  try {
    console.log(`  📸 Generating: ${path.basename(outputPath)}`);
    
    const response = await openai.images.generate({
      model: CONFIG.model,
      prompt: prompt,
      n: 1,
      size: CONFIG.size,
      quality: CONFIG.quality,
      style: CONFIG.style,
    });

    const imageUrl = response.data[0].url;
    await downloadImage(imageUrl, outputPath);
    
    console.log(`  ✅ Saved: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return false;
  }
}

// Main execution
async function main() {
  console.log('\n');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  🏗️  FORT HOMES - Visual Work Instruction Image Generator');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('\n');

  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ ERROR: OPENAI_API_KEY environment variable not set!\n');
    console.log('To set your API key:\n');
    console.log('  Windows (PowerShell):');
    console.log('    $env:OPENAI_API_KEY = "sk-your-key-here"\n');
    console.log('  Windows (CMD):');
    console.log('    set OPENAI_API_KEY=sk-your-key-here\n');
    console.log('  Mac/Linux:');
    console.log('    export OPENAI_API_KEY=sk-your-key-here\n');
    console.log('Get your API key at: https://platform.openai.com/api-keys\n');
    process.exit(1);
  }

  // Count total images
  let totalImages = 0;
  for (const folder in IMAGE_PROMPTS) {
    totalImages += IMAGE_PROMPTS[folder].length;
  }

  console.log(`📊 Total images to generate: ${totalImages}`);
  console.log(`💰 Estimated cost: $${(totalImages * 0.04).toFixed(2)} - $${(totalImages * 0.08).toFixed(2)}`);
  console.log(`📁 Output directory: ${CONFIG.outputDir}`);
  console.log('\n');

  // Create output directories
  for (const folder in IMAGE_PROMPTS) {
    const folderPath = path.join(CONFIG.outputDir, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`📁 Created: ${folder}/`);
    }
  }
  console.log('\n');

  // Generate images
  let successCount = 0;
  let failCount = 0;
  let currentImage = 0;

  for (const folder in IMAGE_PROMPTS) {
    console.log(`\n📂 ${folder.toUpperCase()}`);
    console.log('─'.repeat(50));

    for (const image of IMAGE_PROMPTS[folder]) {
      currentImage++;
      const outputPath = path.join(CONFIG.outputDir, folder, image.filename);

      // Skip if already exists
      if (fs.existsSync(outputPath)) {
        console.log(`  ⏭️  Skipping (exists): ${image.filename}`);
        successCount++;
        continue;
      }

      console.log(`\n  [${currentImage}/${totalImages}]`);
      
      const success = await generateImage(image.prompt, outputPath);
      
      if (success) {
        successCount++;
      } else {
        failCount++;
      }

      // Delay between requests to avoid rate limits
      if (currentImage < totalImages) {
        await delay(CONFIG.delayBetweenRequests);
      }
    }
  }

  // Summary
  console.log('\n');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  📊 GENERATION COMPLETE');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(`  ✅ Successful: ${successCount}`);
  console.log(`  ❌ Failed: ${failCount}`);
  console.log(`  📁 Images saved to: ${CONFIG.outputDir}`);
  console.log('\n');

  if (failCount > 0) {
    console.log('💡 TIP: Run the script again to retry failed images.\n');
  }
}

// Run
main().catch(console.error);
