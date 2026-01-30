# VISUAL ENHANCEMENT AGENT - QUICK START GUIDE

## 🚀 Get Started in 5 Minutes

---

### Step 1: Review the Agent Specification

**Read:** [VISUAL-ENHANCEMENT-AGENT.md](./VISUAL-ENHANCEMENT-AGENT.md)

**Key Points:**
- Agent will transform 56+ documents with cutting-edge visuals
- Semi-autonomous (requires human approval at checkpoints)
- Safety mechanisms: backup branches, rollback, quality gates
- Estimated completion: 6 weeks (68 hours)

---

### Step 2: Approve Agent Activation

**Decision Required:** Do you approve the agent to proceed?

✅ **YES - Proceed to Step 3**  
❌ **NO - Review concerns with QMS Lead**

---

### Step 3: Run Your First Test (Dry Run)

**Safe Mode - No Files Modified:**

```bash
# Open terminal and run:
cd vscode-vfs://github/solidzdawg/fort-homes-qms
node scripts/agent-visual-enhance.js --phase prepare --dry-run
```

**What This Does:**
- ✅ Scans all QMS documents
- ✅ Classifies by type (QMS Manual, SOPs, WIs, Forms)
- ✅ Analyzes current visual state
- ✅ Generates transformation plan
- ❌ Does NOT modify any files (dry run)

**Expected Output:**
```
🤖 VISUAL ENHANCEMENT AGENT v1.0.0
===================================

🔍 DRY RUN MODE - No files will be modified

📋 Phase 1: Preparation

🔍 Scanning workspace for QMS documents...
   Found 56 documents

🏷️  Classifying documents by type...
   QMS Manual: 10
   SOPs: 28
   Work Instructions: 16
   Forms: 8

📊 Analyzing current visual state...
   Status badges: 0
   KPI cards: 0
   Enhanced tables: 5

📝 Generating transformation plan...
   Total enhancements: 500+
   Estimated time: 68 hours

✅ Transformation plan saved: docs/ai-agents/reports/VISUAL-TRANSFORM-PLAN-2026-01-29.md
```

---

### Step 4: Review the Transformation Plan

**Open:** `docs/ai-agents/reports/VISUAL-TRANSFORM-PLAN-2026-01-29.md`

**Check:**
- [ ] Document priority order makes sense
- [ ] Enhancement types are appropriate
- [ ] Timeline is acceptable
- [ ] No concerns with approach

---

### Step 5: Create Component Libraries (Auto-Approved)

**This is safe - creates new files only:**

```bash
node scripts/agent-visual-enhance.js --phase components --auto-approve
```

**What This Does:**
- Creates 6 new component library files
- Adds templates for badges, KPI cards, tables, etc.
- Updates style guide with links
- Commits changes to backup branch

**Result:**
```
📦 Phase 2: Creating Component Libraries

📝 Creating COMPONENT-LIBRARY-BADGES.md...
   ✅ COMPONENT-LIBRARY-BADGES.md created
   
[... 5 more components ...]

✅ All component libraries created
```

---

### Step 6: Test on Single Document

**Transform one QMS Manual section:**

```bash
# Pick QMS-002-Leadership-Policy.md for test
node scripts/agent-visual-enhance.js --phase qms-manual --dry-run
```

**Review Output:**
- Check the transformations in preview mode
- Verify quality validation scores
- Confirm no content loss

**If successful, run without dry-run:**

```bash
node scripts/agent-visual-enhance.js --phase qms-manual --batch-size 1
```

**Agent will ask for approval:**
```
🚦 HUMAN APPROVAL REQUIRED - Batch 1/10

Documents in this batch:
  - QMS-002-Leadership-Policy.md

🚦 APPROVE PHASE "batch-1"? (yes/no): 
```

**Type:** `yes`

---

### Step 7: Run Full Workflow (Production)

**Once you're confident:**

```bash
# Full workflow with batch approvals every 5 documents
node scripts/agent-visual-enhance.js --workflow full --human-approval batch
```

**Agent will:**
1. Create backup branch automatically
2. Process documents in batches of 5
3. Ask for human approval between batches
4. Run quality checks on every document
5. Rollback automatically if validation fails
6. Generate progress reports
7. Create final validation report

**You'll see checkpoints like:**
```
📦 Processing batch 1/12 (5 documents)...

  📝 Processing: QMS-001-Context.md
     🔧 Applying transformations...
        ✅ Status badges updated
        ✅ Tables enhanced
        ✅ KPI cards added
        ✅ Collapsible sections added
     🔍 Validating changes...
        ✅ Validation passed (98%)
     💾 Changes saved
  ✅ QMS-001-Context.md completed successfully

[... 4 more documents ...]

🚦 HUMAN APPROVAL REQUIRED - Batch 1/12
Approve? (yes/no): 
```

---

### Step 8: Monitor Progress

**Track in real-time:**

```bash
# View agent progress dashboard
cat docs/ai-agents/reports/VISUAL-TRANSFORM-PROGRESS.md
```

**Or check checkpoint file:**
```bash
cat .agent-checkpoint.json
```

---

### Step 9: Handle Issues

**If agent encounters errors:**

```bash
# View error log
node scripts/agent-visual-enhance.js --phase validate
```

**Agent will automatically:**
- ✅ Rollback failed documents
- ✅ Log errors for review
- ✅ Continue with remaining documents
- ✅ Generate error report

**You can:**
- Review failed documents manually
- Re-run specific phase
- Resume from checkpoint

---

### Step 10: Final Review & Merge

**After completion:**

```bash
# Generate final audit report
node scripts/agent-visual-enhance.js --phase validate --generate-report
```

**Review:**
- `docs/ai-agents/reports/VISUAL-TRANSFORM-AUDIT-2026-02.md`
- Check quality scores (target: 98%)
- Verify all enhancements applied
- Spot-check sample documents

**If satisfied:**
```bash
# Merge backup branch
git checkout main
git merge feature/visual-enhancement-2026
git push origin main
```

**Celebrate! 🎉**

---

## 🆘 Common Issues & Solutions

### Issue 1: "Cannot find module 'glob'"

**Solution:**
```bash
npm install glob
```

### Issue 2: Agent hangs waiting for input

**Solution:** Press `Ctrl+C` and re-run with `--auto-approve` flag

### Issue 3: Quality validation fails

**Solution:** Check `.agent-checkpoint.json` for specific error, review document manually

### Issue 4: Want to undo changes

**Solution:**
```bash
git checkout main  # Switch back to main branch
git branch -D feature/visual-enhancement-2026  # Delete backup branch
```

---

## 📊 Success Metrics

**Monitor these:**
- **Documents transformed:** 56/56 (100%)
- **Quality score:** ≥98%
- **Validation pass rate:** ≥95%
- **Failed documents:** 0

**Agent will report:**
```
=============================================================
AGENT MISSION SUMMARY
=============================================================
Phase: validate
Documents processed: 56
✅ Succeeded: 55
❌ Failed: 1
⏱️  Time elapsed: 3842s
=============================================================
```

---

## 🎯 Expected Timeline

| Phase | Duration | Human Effort |
|:---|:---:|:---:|
| **Phase 1: Prepare** | 1 hour | 15 min review |
| **Phase 2: Components** | 2 hours | Auto-approved |
| **Phase 3: Templates** | 1 hour | Auto-approved |
| **Phase 4: QMS Manual** | 8 hours | 30 min approvals |
| **Phase 5: Core SOPs** | 16 hours | 1 hour approvals |
| **Phase 6: Production SOPs** | 6 hours | 30 min approvals |
| **Phase 7: Work Instructions** | 12 hours | 1 hour approvals |
| **Phase 8: Forms** | 6 hours | 30 min approvals |
| **Phase 9: Validation** | 4 hours | 1 hour review |
| **TOTAL** | **56 hours** | **5 hours human** |

**Calendar time:** 6-8 weeks (running agent during off-hours)

---

## ✅ Approval Checklist

Before activating the agent, confirm:

- [ ] I have reviewed VISUAL-ENHANCEMENT-AGENT.md
- [ ] I understand the agent will modify 56+ documents
- [ ] I approve the visual enhancement specification
- [ ] I have tested dry-run mode successfully
- [ ] Backup branch creation is approved
- [ ] I will monitor agent progress regularly
- [ ] I commit to providing approvals at checkpoints
- [ ] I understand rollback mechanisms are in place
- [ ] Quality gates (95%+ validation) are acceptable
- [ ] Final review and merge approval process is clear

**Authorized By:**
- Name: ___________________
- Role: ___________________
- Date: ___________________
- Signature: ___________________

---

## 🚀 Ready to Start?

**Run this command:**

```bash
node scripts/agent-visual-enhance.js --workflow full --human-approval batch
```

**The agent will guide you through the rest!**

---

**Questions? Contact:**
- QMS Lead: [contact]
- Document Controller: [contact]
- IT Support: [contact]

**Last Updated:** January 29, 2026  
**Version:** 1.0
