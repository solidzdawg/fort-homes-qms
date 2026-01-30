const fs = require('fs');
const path = require('path');
let pdfParse;
try {
  pdfParse = require('pdf-parse');
} catch (e) {
  console.error('Missing dependency: pdf-parse. Run `npm install pdf-parse` and retry.');
  process.exit(2);
}

const pdfPath = path.join(__dirname, '..', 'data', 'cc21te', 'CC21TE-SHOP.pdf');
const outDir = path.join(__dirname, '..', 'data', 'cc21te');

if (!fs.existsSync(pdfPath)) {
  console.error('PDF not found at', pdfPath);
  process.exit(1);
}

const data = fs.readFileSync(pdfPath);

(async () => {
  try {
    const result = await pdfParse(data);
    const text = result.text || '';
    fs.writeFileSync(path.join(outDir, 'cc21te-text.txt'), text, 'utf8');
    console.log('Wrote cc21te-text.txt');

    // Basic extraction heuristics
    const getFirstMatch = (rx) => {
      const m = text.match(rx);
      return m ? m[1] || m[0] : null;
    };

    const joist = getFirstMatch(/(\d+\s*\"\s*O\.C\.|\d+\s*"\s*O\.C\.|joist spacing[:\s]*\d+\"?)/i);
    const subfloor = getFirstMatch(/(3\/?4\"\s*(T&G|T&G|TG)?\s*(OSB|ply|plywood)?|subfloor[:\s]*3\/?4\")/i);
    const rim = getFirstMatch(/(LVL\s*2x\d+|rim board[:\s]*LVL\s*2x\d+)/i);
    const blocking = getFirstMatch(/(blocking every\s*\d+\s*ft|blocking[:\s]*every\s*\d+\s*ft|block every\s*\d+\s*ft)/i);
    const mep = getFirstMatch(/(MEP clearances[:\s]*\d+\"|clearance[:\s]*\d+\"|spacing[:\s]*\d+\")/i);
    const hold = getFirstMatch(/(HP-\d+|Hold Point[:\s]*HP-?\d+)/i);

    // Load existing tasks json if present
    const tasksPath = path.join(outDir, 'cc21te-tasks.json');
    let tasks = {};
    if (fs.existsSync(tasksPath)) {
      try { tasks = JSON.parse(fs.readFileSync(tasksPath,'utf8')); } catch(e) { tasks = {}; }
    }

    if (joist) tasks.joist_spacing = joist.trim();
    if (subfloor) tasks.subfloor = subfloor.trim();
    if (rim) tasks.rim_board = rim.trim();
    if (blocking) tasks.blocking_interval_ft = parseInt((blocking.match(/(\d+)/)||[])[0]||tasks.blocking_interval_ft||4,10);
    if (mep) tasks.mep_clearance_in = parseInt((mep.match(/(\d+)/)||[])[0] || tasks.mep_clearance_in || 12,10);

    tasks.source_pdf = pdfPath;
    tasks.extracted_on = (new Date()).toISOString();

    fs.writeFileSync(tasksPath, JSON.stringify(tasks, null, 2), 'utf8');
    console.log('Updated cc21te-tasks.json');

    // Traceability: produce a naive map by searching for section headers/figures
    const tracePath = path.join(outDir, 'traceability.md');
    let trace = '# CC21TE Traceability\n\nSource: ' + pdfPath + '\n\n';

    const addIfFound = (label, rx) => {
      const idx = text.search(rx);
      if (idx >= 0) {
        // approximate page by counting form feed characters or by estimated position
        const prefix = text.slice(0, idx);
        const approxPage = (prefix.match(/\f/g) || []).length + 1;
        trace += `- ${label}: approx page ${approxPage} (first match)\n`;
      } else {
        trace += `- ${label}: TBD\n`;
      }
    };

    addIfFound('WI-101: Chassis & Floor', /chassis|floor deck|joist/i);
    addIfFound('WI-102: Wall Framing', /wall framing|studs|headers/i);
    addIfFound('WI-103: Roof Framing', /truss|roof|pitch/i);
    addIfFound('WI-104: MEP Rough-In', /electrical|plumb|conduit|drain/i);
    addIfFound('WI-105: Insulation & Air Sealing', /insulation|blower door|air seal/i);
    addIfFound('WI-108: Final Inspection', /inspection|tolerance|final acceptance/i);

    fs.writeFileSync(tracePath, trace, 'utf8');
    console.log('Wrote traceability.md');

    console.log('Extraction complete. Review data/cc21te/*.');

  } catch (err) {
    console.error('Extraction failed:', err);
    process.exit(3);
  }
})();
