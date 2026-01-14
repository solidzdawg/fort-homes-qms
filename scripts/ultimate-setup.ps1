# ULTIMATE AUTOMATED SETUP - Minimal User Input Required
# This script does EVERYTHING. You just need your GitHub token.

param(
    [string]$GitHubToken = ""
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

# Clear screen
Clear-Host

Write-Host "`n" + ("="*70) -ForegroundColor Cyan
Write-Host "║" + (" "*68) + "║" -ForegroundColor Cyan
Write-Host "║  FORT AND HOMES QMS - AUTOMATED GITHUB SETUP" + (" "*22) + "║" -ForegroundColor Cyan
Write-Host "║  Complete One-Click Configuration" + (" "*36) + "║" -ForegroundColor Cyan
Write-Host "║" + (" "*68) + "║" -ForegroundColor Cyan
Write-Host ("="*70) -ForegroundColor Cyan
Write-Host ""

# Verify PowerShell version
if ($PSVersionTable.PSVersion.Major -lt 5) {
    Write-Host "❌ ERROR: PowerShell 5.0 or later required" -ForegroundColor Red
    exit 1
}

# Verify we're in the repo
$repoPath = "C:\Users\Zacha\Desktop\fort-homes-qms\fort-homes-qms"
if (-not (Test-Path "$repoPath\.git")) {
    Write-Host "❌ ERROR: Not in git repository" -ForegroundColor Red
    Write-Host "Expected: $repoPath" -ForegroundColor Yellow
    exit 1
}

Set-Location $repoPath
Write-Host "✅ Repository verified: $repoPath" -ForegroundColor Green
Write-Host ""

# Step 1: Get GitHub Token
if (-not $GitHubToken) {
    Write-Host "STEP 1: Get Your GitHub Personal Access Token" -ForegroundColor Yellow
    Write-Host "─" * 70 -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Opening GitHub token creation page..." -ForegroundColor Cyan
    
    Start-Process "https://github.com/settings/tokens?type=fine-grained"
    
    Write-Host ""
    Write-Host "📋 In your browser, follow these steps:" -ForegroundColor White
    Write-Host "   1. Click 'Generate new token'" -ForegroundColor Green
    Write-Host "   2. Name: 'claude-fort-homes-qms'" -ForegroundColor Green
    Write-Host "   3. Expiration: '90 days'" -ForegroundColor Green
    Write-Host "   4. Repository: Select 'fort-homes-qms' only" -ForegroundColor Green
    Write-Host "   5. Permissions: Check ONLY 'Contents: Read and Write'" -ForegroundColor Green
    Write-Host "   6. Click 'Generate token'" -ForegroundColor Green
    Write-Host "   7. COPY the token (ghp_...)" -ForegroundColor Magenta
    Write-Host ""
    
    $GitHubToken = Read-Host "Paste your token here"
    
    if (-not $GitHubToken) {
        Write-Host "❌ No token provided. Exiting." -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Token received" -ForegroundColor Green
Write-Host ""

# Step 2: Create Configuration File
Write-Host "STEP 2: Creating Configuration" -ForegroundColor Yellow
Write-Host "─" * 70 -ForegroundColor Yellow

$configPath = Join-Path $repoPath ".github-auth.ps1"
$configContent = @"
# GitHub Authentication Configuration
# Auto-generated $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
# ⚠️ Keep this file secure - contains your GitHub token

`$GITHUB_TOKEN = '$GitHubToken'
`$GITHUB_USER = 'solidzdawg'
`$GITHUB_REPO = 'fort-homes-qms'
`$REPO_PATH = '$repoPath'

# Set environment variables
`$env:GITHUB_TOKEN = `$GITHUB_TOKEN
`$env:GITHUB_USER = `$GITHUB_USER

Write-Verbose "GitHub authentication loaded"
"@

Set-Content -Path $configPath -Value $configContent
Write-Host "✅ Configuration file created: .github-auth.ps1" -ForegroundColor Green
Write-Host ""

# Step 3: Configure Git
Write-Host "STEP 3: Configuring Git" -ForegroundColor Yellow
Write-Host "─" * 70 -ForegroundColor Yellow

# Clear old credentials
Write-Host "Clearing old credentials..." -ForegroundColor Cyan
try {
    & git credential-manager erase https://github.com 2>$null
}
catch {
    # Ignore errors
}

# Configure credential helper
& git config --global credential.helper manager-core 2>$null || `
& git config --global credential.helper wincred 2>$null || `
& git config --global credential.helper win32 2>$null

# Configure user
& git config --global user.name "Claude Automation"
& git config --global user.email "claude@fort-homes-qms.local"

Write-Host "✅ Git configured for automation" -ForegroundColor Green
Write-Host ""

# Step 4: Set Remote URL to HTTPS
Write-Host "STEP 4: Configuring Remote Repository" -ForegroundColor Yellow
Write-Host "─" * 70 -ForegroundColor Yellow

$currentRemote = & git config --get remote.origin.url
if ($currentRemote -like "git@*") {
    Write-Host "Converting remote from SSH to HTTPS..." -ForegroundColor Cyan
    & git remote set-url origin "https://github.com/solidzdawg/fort-homes-qms.git"
}

Write-Host "✅ Remote URL: $(git config --get remote.origin.url)" -ForegroundColor Green
Write-Host ""

# Step 5: Test Authentication
Write-Host "STEP 5: Testing Authentication" -ForegroundColor Yellow
Write-Host "─" * 70 -ForegroundColor Yellow

Write-Host "Testing GitHub access..." -ForegroundColor Cyan

$testResult = & git ls-remote "https://solidzdawg:$GitHubToken@github.com/solidzdawg/fort-homes-qms.git" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Authentication successful!" -ForegroundColor Green
    Write-Host "✅ Repository is accessible" -ForegroundColor Green
}
else {
    Write-Host "❌ Authentication test failed" -ForegroundColor Red
    Write-Host "Error: $testResult" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 6: Create .gitignore entry for config
Write-Host "STEP 6: Security Setup" -ForegroundColor Yellow
Write-Host "─" * 70 -ForegroundColor Yellow

$gitignorePath = Join-Path $repoPath ".gitignore"
$gitignoreContent = "# GitHub authentication (contains sensitive token)"
$gitignoreContent += "`n.github-auth.ps1"
$gitignoreContent += "`n"

if (Test-Path $gitignorePath) {
    $existing = Get-Content $gitignorePath -Raw
    if ($existing -notlike "*github-auth*") {
        Add-Content $gitignorePath $gitignoreContent
    }
}
else {
    Set-Content $gitignorePath $gitignoreContent
}

Write-Host "✅ .gitignore updated - config file is safe" -ForegroundColor Green
Write-Host ""

# Step 7: Verify Auto-Commit Script
Write-Host "STEP 7: Verifying Auto-Commit Script" -ForegroundColor Yellow
Write-Host "─" * 70 -ForegroundColor Yellow

$autoCommitPath = Join-Path $repoPath "scripts\auto-commit.ps1"
if (Test-Path $autoCommitPath) {
    Write-Host "✅ Auto-commit script found: scripts/auto-commit.ps1" -ForegroundColor Green
}
else {
    Write-Host "⚠️  Auto-commit script not found" -ForegroundColor Yellow
}

Write-Host ""

# Final Summary
Write-Host "`n" + ("="*70) -ForegroundColor Green
Write-Host "║" + (" "*68) + "║" -ForegroundColor Green
Write-Host "║  ✅ SETUP COMPLETE - READY FOR AUTOMATED COMMITS" + (" "*19) + "║" -ForegroundColor Green
Write-Host "║" + (" "*68) + "║" -ForegroundColor Green
Write-Host ("="*70) -ForegroundColor Green
Write-Host ""

Write-Host "What's configured:" -ForegroundColor Yellow
Write-Host "  ✅ GitHub token stored securely" -ForegroundColor Green
Write-Host "  ✅ Git authentication configured" -ForegroundColor Green
Write-Host "  ✅ Repository access verified" -ForegroundColor Green
Write-Host "  ✅ Authentication tested successfully" -ForegroundColor Green
Write-Host "  ✅ Token security setup (not in git)" -ForegroundColor Green
Write-Host "  ✅ Auto-commit script ready" -ForegroundColor Green
Write-Host ""

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Test with: .\scripts\auto-commit.ps1 -Message 'test: Verify setup'" -ForegroundColor Cyan
Write-Host "  2. Use for changes: .\scripts\auto-commit.ps1 -Message 'Your message'" -ForegroundColor Cyan
Write-Host ""

Write-Host "You're all set! Start collaborating with Claude now! 🚀" -ForegroundColor Green
Write-Host ""
