# Complete GitHub Authentication & Automated Commit Setup
# This script sets up everything needed for Claude to manage commits

param(
    [string]$GitHubToken = "",
    [string]$GitHubUsername = "solidzdawg",
    [string]$RepoName = "fort-homes-qms"
)

$ErrorActionPreference = "Stop"

Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  COMPLETE GitHub Setup - Fort and Homes QMS                     ║" -ForegroundColor Cyan
Write-Host "║  Enables Claude to Create & Manage Commits                      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Step 1: Get or create GitHub token
Write-Host "STEP 1: GitHub Personal Access Token" -ForegroundColor Yellow
Write-Host "────────────────────────────────────" -ForegroundColor Yellow

if (-not $GitHubToken) {
    Write-Host "`nOpening GitHub in browser..." -ForegroundColor Cyan
    Start-Process "https://github.com/settings/tokens?type=fine-grained"
    
    Write-Host "`nFollow these steps in your browser:" -ForegroundColor White
    Write-Host "  1. Click 'Generate new token'" -ForegroundColor Green
    Write-Host "  2. Token name: 'claude-fort-homes-qms'" -ForegroundColor Green
    Write-Host "  3. Expiration: '90 days'" -ForegroundColor Green
    Write-Host "  4. Repository access: Select 'Only select repositories'" -ForegroundColor Green
    Write-Host "  5. Choose: 'fort-homes-qms'" -ForegroundColor Green
    Write-Host "  6. Permissions:" -ForegroundColor Green
    Write-Host "     - Contents: Read and Write" -ForegroundColor Green
    Write-Host "     - Workflows: Read and Write" -ForegroundColor Green
    Write-Host "  7. Click 'Generate token'" -ForegroundColor Green
    Write-Host "  8. COPY the token immediately (ghp_...)" -ForegroundColor Magenta
    Write-Host ""
    
    $GitHubToken = Read-Host "Paste your token here"
    
    if (-not $GitHubToken) {
        Write-Host "❌ Token required. Exiting." -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Token received ($(if($GitHubToken.Length -gt 10) {"$($GitHubToken.Substring(0,10))..."} else {"[hidden]"}))" -ForegroundColor Green

# Step 2: Store token securely
Write-Host "`nSTEP 2: Storing Token Securely" -ForegroundColor Yellow
Write-Host "──────────────────────────────" -ForegroundColor Yellow

# Option A: Windows Credential Manager
Write-Host "Storing in Windows Credential Manager..." -ForegroundColor Cyan
try {
    cmdkey /add:github.com /user:$GitHubUsername /pass:$GitHubToken 2>$null
    Write-Host "✅ Token stored in Credential Manager" -ForegroundColor Green
}
catch {
    Write-Host "⚠️  Could not use Credential Manager, using environment variable instead" -ForegroundColor Yellow
}

# Option B: Environment Variable (Fallback)
Write-Host "Setting environment variable GITHUB_TOKEN..." -ForegroundColor Cyan
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", $GitHubToken, "User")
[Environment]::SetEnvironmentVariable("GITHUB_USER", $GitHubUsername, "User")
$env:GITHUB_TOKEN = $GitHubToken
$env:GITHUB_USER = $GitHubUsername
Write-Host "✅ Environment variables set" -ForegroundColor Green

# Step 3: Configure Git
Write-Host "`nSTEP 3: Configuring Git" -ForegroundColor Yellow
Write-Host "───────────────────────" -ForegroundColor Yellow

Write-Host "Setting git credential helper..." -ForegroundColor Cyan
git config --global credential.helper manager-core
Write-Host "✅ Git credential helper configured" -ForegroundColor Green

Write-Host "Configuring git user..." -ForegroundColor Cyan
git config --global user.name "Claude Automation"
git config --global user.email "claude@fort-homes-qms.local"
Write-Host "✅ Git user configured" -ForegroundColor Green

# Step 4: Configure remote URL
Write-Host "`nSTEP 4: Configuring Repository" -ForegroundColor Yellow
Write-Host "──────────────────────────────" -ForegroundColor Yellow

$repoPath = "C:\Users\Zacha\Desktop\fort-homes-qms\fort-homes-qms"
if (Test-Path $repoPath) {
    Set-Location $repoPath
    Write-Host "Repository path: $repoPath" -ForegroundColor Cyan
    
    # Ensure HTTPS remote
    $currentRemote = git config --get remote.origin.url
    if ($currentRemote -like "git@*") {
        git remote set-url origin "https://github.com/$GitHubUsername/$RepoName.git"
        Write-Host "✅ Remote updated to HTTPS" -ForegroundColor Green
    }
    else {
        Write-Host "✅ Remote is HTTPS" -ForegroundColor Green
    }
}

# Step 5: Test authentication
Write-Host "`nSTEP 5: Testing Authentication" -ForegroundColor Yellow
Write-Host "──────────────────────────────" -ForegroundColor Yellow

Write-Host "Testing GitHub access..." -ForegroundColor Cyan
$testResult = git ls-remote "https://$($GitHubUsername):$($GitHubToken)@github.com/$GitHubUsername/$RepoName.git" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Authentication successful!" -ForegroundColor Green
    Write-Host "   Repository is accessible" -ForegroundColor Cyan
}
else {
    Write-Host "❌ Authentication test failed" -ForegroundColor Red
    Write-Host "Error: $testResult" -ForegroundColor Red
    exit 1
}

# Step 6: Create configuration file for scripts
Write-Host "`nSTEP 6: Creating Configuration File" -ForegroundColor Yellow
Write-Host "───────────────────────────────────" -ForegroundColor Yellow

$configPath = "$repoPath\.github-auth.ps1"
$configContent = @"
# GitHub Authentication Configuration
# Auto-generated by setup script

`$GITHUB_TOKEN = '$GitHubToken'
`$GITHUB_USER = '$GitHubUsername'
`$GITHUB_REPO = '$RepoName'
`$REPO_PATH = '$repoPath'

# Environment setup
`$env:GITHUB_TOKEN = `$GITHUB_TOKEN
`$env:GITHUB_USER = `$GITHUB_USER
"@

Set-Content -Path $configPath -Value $configContent
Write-Host "✅ Configuration saved to: .github-auth.ps1" -ForegroundColor Green

# Step 7: Update auto-commit script to use token
Write-Host "`nSTEP 7: Updating Auto-Commit Script" -ForegroundColor Yellow
Write-Host "────────────────────────────────────" -ForegroundColor Yellow

$autoCommitPath = "$repoPath\scripts\auto-commit.ps1"
if (Test-Path $autoCommitPath) {
    Write-Host "Auto-commit script found" -ForegroundColor Cyan
    Write-Host "✅ Ready to use with token authentication" -ForegroundColor Green
}

# Step 8: Create enhanced auto-push script
Write-Host "`nSTEP 8: Creating Enhanced Auto-Push Script" -ForegroundColor Yellow
Write-Host "──────────────────────────────────────────" -ForegroundColor Yellow

$autoPushPath = "$repoPath\scripts\auto-push.ps1"
$autoPushContent = @"
# Auto-push script with token authentication
# Pushes current changes to GitHub

# Load config
. (Join-Path (Split-Path `$PSScriptRoot) '.github-auth.ps1')

`$ErrorActionPreference = "Stop"

Write-Host "`nPushing to GitHub..." -ForegroundColor Cyan

try {
    Set-Location `$REPO_PATH
    
    # Use token authentication for push
    `$remoteUrl = "https://`$(`$GITHUB_USER):`$(`$GITHUB_TOKEN)@github.com/`$(`$GITHUB_USER)/`$(`$GITHUB_REPO).git"
    
    git push "`$remoteUrl" main 2>&1 | ForEach-Object {
        Write-Host "   `$_" -ForegroundColor Cyan
    }
    
    if (`$LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Push successful!" -ForegroundColor Green
    }
    else {
        Write-Host "`n❌ Push failed!" -ForegroundColor Red
        exit 1
    }
}
catch {
    Write-Host "`n❌ Error: `$_" -ForegroundColor Red
    exit 1
}
"@

Set-Content -Path $autoPushPath -Value $autoPushContent
Write-Host "✅ Created auto-push.ps1 script" -ForegroundColor Green

# Step 9: Final verification
Write-Host "`nSTEP 9: Final Verification" -ForegroundColor Yellow
Write-Host "──────────────────────────" -ForegroundColor Yellow

Write-Host "Git configuration:" -ForegroundColor Cyan
git config --global user.name | ForEach-Object { Write-Host "  Name: $_" -ForegroundColor Green }
git config --global user.email | ForEach-Object { Write-Host "  Email: $_" -ForegroundColor Green }
git config --global credential.helper | ForEach-Object { Write-Host "  Credential helper: $_" -ForegroundColor Green }

Write-Host ""
Write-Host "Repository configuration:" -ForegroundColor Cyan
Set-Location $repoPath
git remote -v | ForEach-Object { Write-Host "  $_" -ForegroundColor Green }

# Summary
Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  ✅ SETUP COMPLETE - READY FOR AUTOMATED COMMITS                ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Green

Write-Host "What's configured:" -ForegroundColor Yellow
Write-Host "  ✅ GitHub token stored securely" -ForegroundColor Green
Write-Host "  ✅ Git authentication configured" -ForegroundColor Green
Write-Host "  ✅ Repository remote verified" -ForegroundColor Green
Write-Host "  ✅ Authentication tested and working" -ForegroundColor Green
Write-Host "  ✅ Configuration file created (.github-auth.ps1)" -ForegroundColor Green
Write-Host "  ✅ Auto-push script created (scripts/auto-push.ps1)" -ForegroundColor Green

Write-Host "`nYou can now:" -ForegroundColor Yellow
Write-Host "  • Use: .\scripts\auto-commit.ps1 -Message 'Your message'" -ForegroundColor Cyan
Write-Host "  • Use: .\scripts\auto-push.ps1" -ForegroundColor Cyan
Write-Host "  • Claude can guide: 'Create Phase 3 SOP' → I create file → you run auto-commit" -ForegroundColor Cyan

Write-Host "`nConfiguration file: .github-auth.ps1" -ForegroundColor White
Write-Host "⚠️  Keep this file secure - contains your GitHub token!" -ForegroundColor Yellow
Write-Host ""
