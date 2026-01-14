# GitHub Authentication Setup Guide

## Quick Start (5 minutes)

### Step 1: Create GitHub Personal Access Token

1. Go to: **https://github.com/settings/tokens**
2. Click **"Generate new token" → "Generate new token (classic)"**
3. Configure:
   - **Token name:** `fort-homes-qms`
   - **Expiration:** 90 days
   - **Scopes:** Check these only:
     - ✅ `repo` (Full control of repositories)
     - ✅ `workflow` (Update workflows)
4. Click **"Generate token"**
5. **COPY THE TOKEN** (you won't see it again)

Token format: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 2: Run Setup Script

Open **PowerShell as Administrator** and run:

```powershell
cd C:\Users\Zacha\Desktop\fort-homes-qms\fort-homes-qms

# Run setup script
.\scripts\setup-github-auth.ps1

# When prompted, paste your token from Step 1
```

The script will:
- ✅ Clear old credentials
- ✅ Configure Git Credential Manager
- ✅ Store your token securely
- ✅ Test authentication
- ✅ Set up environment variables

### Step 3: Test It Works

```powershell
# Make a test file
echo "# Test" > TEST.md

# Commit and push
.\scripts\auto-commit.ps1 -Message "test: Verify authentication"

# Should complete without 401 errors
```

### Step 4: Clean Up Test File

```powershell
# Remove test file
git rm TEST.md
git commit -m "test: Remove verification file"
git push origin main
```

---

## Using Auto-Commit Script

After setup, you can automatically commit changes:

```powershell
# Navigate to repo
cd C:\Users\Zacha\Desktop\fort-homes-qms\fort-homes-qms

# Commit all changes
.\scripts\auto-commit.ps1 -Message "docs: Update Phase 3 SOPs"

# Or with custom author
.\scripts\auto-commit.ps1 -Message "feat: Add new feature" -Author "Your Name" -Email "your@email.com"
```

---

## Troubleshooting

### Issue: Still getting 401 error

**Solution:**

```powershell
# 1. Clear all stored credentials
cmdkey /list
cmdkey /delete:github.com

# 2. Re-run setup script
.\scripts\setup-github-auth.ps1

# 3. Verify token hasn't expired
# Go to: https://github.com/settings/tokens
```

### Issue: "Not in a git repository"

**Solution:**

```powershell
# Make sure you're in the correct directory
cd C:\Users\Zacha\Desktop\fort-homes-qms\fort-homes-qms
git status  # Should work

# Then run auto-commit
.\scripts\auto-commit.ps1 -Message "Your message"
```

### Issue: Remote URL is wrong

**Solution:**

```powershell
# Check current remote
git remote -v

# If it shows SSH (git@github.com...), fix it:
git remote set-url origin https://github.com/solidzdawg/fort-homes-qms.git

# Verify
git remote -v
```

### Issue: "cmdkey not found"

**Solution:**

Your version of Windows doesn't have cmdkey. Use this instead:

```powershell
# Store token in environment variable
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_xxxxx", "User")

# Then configure git to use token from environment
git config --global credential.useHttpPath false

# When pushing, git will use the token from GITHUB_TOKEN env var
```

---

## What the Scripts Do

### setup-github-auth.ps1

Configures GitHub authentication:

1. Takes your Personal Access Token
2. Clears old credentials
3. Configures Git Credential Manager
4. Stores token securely in Windows Credential Manager
5. Tests authentication with `git ls-remote`
6. Sets up environment variables
7. Verifies everything works

### auto-commit.ps1

Automates commits and pushes:

1. Checks for uncommitted changes
2. Configures git user info
3. Stages all changes (`git add -A`)
4. Creates commit with message
5. Pushes to GitHub main branch
6. Shows latest commits

---

## Security Notes

- ✅ Token stored in **Windows Credential Manager** (encrypted by Windows)
- ✅ Never stored in plain text in files
- ✅ Token expires after 90 days (configurable)
- ✅ Can be revoked anytime at https://github.com/settings/tokens
- ✅ Scripts use standard Git authentication mechanisms

---

## Environment Variables (Optional)

After setup, these are automatically set:

```powershell
$env:GITHUB_TOKEN      # Your Personal Access Token
$env:GITHUB_USER       # solidzdawg
```

You can reference these in other scripts:

```powershell
Write-Host "GitHub user: $env:GITHUB_USER"
# Other tools can use $env:GITHUB_TOKEN
```

---

## Getting Help

If you encounter issues:

1. **Check token:**
   - Go to https://github.com/settings/tokens
   - Verify token hasn't expired
   - Verify it has `repo` and `workflow` scopes

2. **Test authentication:**
   ```powershell
   git ls-remote https://github.com/solidzdawg/fort-homes-qms.git
   ```
   Should return refs without 401 error

3. **Check credentials:**
   ```powershell
   cmdkey /list
   ```
   Should show `github.com` entry

4. **View git config:**
   ```powershell
   git config --global --list | grep credential
   git config --global --list | grep user
   ```

---

**Setup Complete!** You can now use automated commits with `.\scripts\auto-commit.ps1`
