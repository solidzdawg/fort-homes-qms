
// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');

const app = express();
const PORT = 3001;
const REPO_PATH = process.cwd(); // Assumes server runs in the repo root
const git = simpleGit(REPO_PATH);

app.use(cors());
app.use(bodyParser.json());

// --- Helpers ---
const getDocType = (filename) => {
  if (filename.includes('SOP')) return 'SOP';
  if (filename.includes('WI')) return 'WI';
  if (filename.includes('POL')) return 'POLICY';
  if (filename.includes('QAM')) return 'MANUAL';
  return 'FORM';
};

const getPhaseFromPath = (filepath) => {
  if (filepath.includes('receiving')) return 'receiving';
  if (filepath.includes('floor')) return 'floor-framing';
  if (filepath.includes('wall')) return 'wall-framing';
  if (filepath.includes('roof')) return 'roof-systems';
  if (filepath.includes('rough')) return 'rough-in';
  if (filepath.includes('weather')) return 'weatherproofing';
  if (filepath.includes('final')) return 'final';
  return null;
};

// 1. GET ALL DOCUMENTS (Scans local file system)
app.get('/api/docs', async (req, res) => {
  try {
    const files = await fg(['**/*.md'], { ignore: ['node_modules/**'] });
    const docs = files.map((file, index) => {
      const content = fs.readFileSync(file, 'utf-8');
      const filename = path.basename(file);
      const titleMatch = content.match(/^# (.*)/m);
      const title = titleMatch ? titleMatch[1] : filename;
      const codeMatch = title.match(/(FH-[A-Z]+-\d+)/);
      const code = codeMatch ? codeMatch[1] : `DOC-${index}`;
      return {
        id: file,
        code: code,
        title: title.replace(/\(FH-.*\)/, '').trim(),
        version: '1.0',
        status: 'APPROVED',
        type: getDocType(filename),
        author: 'System',
        lastModified: fs.statSync(file).mtime.toISOString().split('T')[0],
        content: content,
        standard: 'IRC 2021',
        repoPath: file,
        linkedPhase: getPhaseFromPath(file),
        syncStatus: 'SYNCED'
      };
    });
    const status = await git.status();
    const modifiedFiles = [...status.modified, ...status.not_added, ...status.created];
    const docsWithGitStatus = docs.map(d => ({
      ...d,
      syncStatus: modifiedFiles.includes(d.repoPath) ? 'LOCAL' : 'SYNCED'
    }));
    res.json(docsWithGitStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// 2. CREATE / UPDATE DOCUMENT (Writes to disk)
app.post('/api/docs', async (req, res) => {
  const { repoPath, content } = req.body;
  try {
    const fullPath = path.join(REPO_PATH, repoPath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, content);
    res.json({ success: true, path: repoPath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. GIT SYNC (Add -> Commit -> Push)
app.post('/api/git/sync', async (req, res) => {
  const { filepath, message } = req.body;
  try {
    await git.add(filepath);
    const commitResult = await git.commit(message || `Update ${filepath}`);
    try {
        await git.push('origin', 'main');
    } catch (pushError) {
        console.warn("Push failed (might be no remote or auth issue), but committed locally:", pushError);
        return res.json({ 
            success: true, 
            status: 'COMMITTED_LOCAL_ONLY', 
            hash: commitResult.commit,
            note: "Changes committed locally. Push failed (check remote/auth)." 
        });
    }
    res.json({ success: true, hash: commitResult.commit, status: 'PUSHED' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Fort and Home LLC QMS Server running at http://localhost:${PORT}`);
  console.log(`Pointing to Repo: ${REPO_PATH}`);
});
