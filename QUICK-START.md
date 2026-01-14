# ⚡ QUICK START - GitHub Setup & Claude Integration

## 🚀 One-Time Setup (5 minutes)

### Step 1: Create Fine-Grained GitHub Token

```
https://github.com/settings/tokens?type=fine-grained
```

**Configure:**
- **Name:** `claude-fort-homes-qms`
- **Expiration:** 90 days
- **Repository:** Select `fort-homes-qms` only
- **Permissions:**
  - Contents: Read and Write
  - Workflows: Read and Write

**Click "Generate token" and COPY it**

### Step 2: Run Complete Setup Script

Open **PowerShell as Administrator**:

```powershell
cd C:\Users\Zacha\Desktop\fort-homes-qms\fort-homes-qms

# Run the complete setup
.\scripts\setup-complete-github-auth.ps1

# Paste your token when prompted
```

**This script will:**
- ✅ Store your token securely
- ✅ Configure Git authentication
- ✅ Test connection to GitHub
- ✅ Create `.github-auth.ps1` configuration file
- ✅ Set up auto-push script

### Step 3: Verify It Works

```powershell
# Test auto-commit
.\scripts\auto-commit.ps1 -Message "test: Verify setup complete"

# Should see: "✅ COMMIT SUCCESSFUL" with no 401 errors
```

---

## 💪 Now You Can Work With Claude

### Workflow:

**You:** "Create Phase 3 Roof Framing SOP"

**Claude:** Creates `SOP-003-Roof-Framing.md` in your workspace

**You:** Run one command:
```powershell
.\scripts\auto-commit.ps1 -Message "docs: Add Phase 3 Roof Framing SOP"
```

**Result:** Changes automatically committed and pushed to GitHub ✅

---

## 📝 Available Commands

### Auto-Commit (Create commit and push)
```powershell
.\scripts\auto-commit.ps1 -Message "Your commit message"
```

### Just Push (If Claude created files and you staged them)
```powershell
.\scripts\auto-push.ps1
```

### View Status
```powershell
git status
```

### View Recent Commits
```powershell
git log --oneline -10
```

---

## 🔐 Security

Your token is:
- ✅ Stored only in `.github-auth.ps1` (local machine)
- ✅ Encrypted by Windows when possible
- ✅ Scoped to only `fort-homes-qms` repo
- ✅ Revocable anytime at GitHub settings
- ✅ Expires after 90 days

**⚠️ Never commit `.github-auth.ps1` to GitHub** (it's in .gitignore)

---

## ❓ Troubleshooting

### Still getting 401?

```powershell
# Delete and recreate config
rm .github-auth.ps1

# Re-run setup
.\scripts\setup-complete-github-auth.ps1
```

### Need to change token?

1. Create new token at: https://github.com/settings/tokens
2. Delete `.github-auth.ps1`
3. Run setup script again with new token

### Check token validity

```powershell
# Token details at:
https://github.com/settings/tokens

# Verify it hasn't expired
```

---

## 🎯 What's Created

| File | Purpose |
| :--- | :--- |
| `.github-auth.ps1` | Stores your token & config (local only) |
| `scripts/auto-commit.ps1` | Stages, commits, and pushes changes |
| `scripts/auto-push.ps1` | Just pushes to GitHub |
| `scripts/setup-complete-github-auth.ps1` | Initial setup script |

---

## ✨ That's It!

Once you run the setup script, you're ready to:
1. Have Claude create/modify files
2. Run `.\scripts\auto-commit.ps1 -Message "..."`
3. Changes go live on GitHub instantly

No more 401 errors. No more manual git commands. Just seamless integration.

**Start with Step 1 above!** 🚀
