# Setup GitHub Authentication for Fort and Homes QMS
# Fixes 401 errors and configures automated commits
# Run as Administrator

param(
    [string]$GitHubToken = "",
    [string]$GitHubUsername = "solidzdawg"
)

$ErrorActionPreference = "Stop"

Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  GitHub Authentication Setup - Fort and Homes QMS              ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Step 1: Prompt for token if not provided
if (-not $GitHubToken) {
    Write-Host "Step 1: GitHub Personal Access Token" -ForegroundColor Yellow
    Write-Host "─────────────────────────────────────" -ForegroundColor Yellow
    Write-Host "Go to: https://github.com/settings/tokens" -ForegroundColor Cyan
    Write-Host "Create a NEW token (classic) with these scopes:" -ForegroundColor White
    Write-Host "  ✅ repo (Full control of private repositories)" -ForegroundColor Green
    Write-Host "  ✅ workflow (Update GitHub Action workflows)" -ForegroundColor Green
    Write-Host ""
    
    $GitHubToken = Read-Host "Paste your GitHub token here (or press Enter to skip)"
    
    if (-not $GitHubToken) {
        Write-Host "`n❌ Token is required. Cannot proceed without authentication." -ForegroundColor Red
        exit 1
    }
}

Write-Host "`n✅ Token received" -ForegroundColor Green

# Step 2: Clear old credentials
Write-Host "`nStep 2: Clearing old credentials..." -ForegroundColor Yellow
try {
    & git credential-manager erase https://github.com 2>$null
    Write-Host "✅ Old credentials cleared" -ForegroundColor Green
}
catch {
    Write-Host "⚠️  Could not clear old credentials (may not exist)" -ForegroundColor Yellow
}

# Step 3: Configure git to use Credential Manager
Write-Host "`nStep 3: Configuring Git Credential Manager..." -ForegroundColor Yellow
& git config --global credential.helper manager-core
Write-Host "✅ Git configured to use manager-core" -ForegroundColor Green

# Step 4: Store token in Credential Manager
Write-Host "`nStep 4: Storing token in Windows Credential Manager..." -ForegroundColor Yellow
$credentialManagerCmd = "cmdkey /add:github.com /user:$GitHubUsername /pass:$GitHubToken"
Invoke-Expression $credentialManagerCmd | Out-Null
Write-Host "✅ Token stored in Credential Manager for user: $GitHubUsername" -ForegroundColor Green

# Step 5: Configure git remote URL to HTTPS
Write-Host "`nStep 5: Verifying remote URL..." -ForegroundColor Yellow
$currentRemote = & git config --get remote.origin.url
Write-Host "Current remote: $currentRemote" -ForegroundColor Cyan

if ($currentRemote -like "git@*") {
    Write-Host "Converting SSH to HTTPS..." -ForegroundColor Yellow
    & git remote set-url origin "https://github.com/$GitHubUsername/fort-homes-qms.git"
    Write-Host "✅ Remote updated to HTTPS" -ForegroundColor Green
}
else {
    Write-Host "✅ Remote is already HTTPS" -ForegroundColor Green
}

# Step 6: Test authentication
Write-Host "`nStep 6: Testing authentication..." -ForegroundColor Yellow
try {
    $testOutput = & git ls-remote https://github.com/$GitHubUsername/fort-homes-qms.git 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Authentication successful!" -ForegroundColor Green
        Write-Host "   Repository is accessible" -ForegroundColor Cyan
    }
    else {
        Write-Host "❌ Authentication test failed" -ForegroundColor Red
        Write-Host "Error: $testOutput" -ForegroundColor Red
        exit 1
    }
}
catch {
    Write-Host "❌ Authentication test failed: $_" -ForegroundColor Red
    exit 1
}

# Step 7: Configure git user (for automation)
Write-Host "`nStep 7: Configuring Git user for automation..." -ForegroundColor Yellow
& git config --global user.name "Claude Automation"
& git config --global user.email "claude@fort-homes-qms.local"
Write-Host "✅ Git user configured for automated commits" -ForegroundColor Green

# Step 8: Set environment variables for future scripts
Write-Host "`nStep 8: Setting environment variables..." -ForegroundColor Yellow
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", $GitHubToken, "User")
[Environment]::SetEnvironmentVariable("GITHUB_USER", $GitHubUsername, "User")
Write-Host "✅ Environment variables set:" -ForegroundColor Green
Write-Host "   GITHUB_USER = $GitHubUsername" -ForegroundColor Cyan
Write-Host "   GITHUB_TOKEN = [***hidden***]" -ForegroundColor Cyan

# Step 9: Verify configuration
Write-Host "`nStep 9: Verifying configuration..." -ForegroundColor Yellow
$credHelper = & git config --global credential.helper
$gitUser = & git config --global user.name
$gitEmail = & git config --global user.email

Write-Host "Git credential helper: $credHelper" -ForegroundColor Cyan
Write-Host "Git user name: $gitUser" -ForegroundColor Cyan
Write-Host "Git user email: $gitEmail" -ForegroundColor Cyan

if ($credHelper -eq "manager-core") {
    Write-Host "✅ All configurations verified" -ForegroundColor Green
}
else {
    Write-Host "⚠️  Credential helper may not be configured correctly" -ForegroundColor Yellow
}

# Step 10: Summary
Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  ✅ SETUP COMPLETE                                             ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Green

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "───────────" -ForegroundColor Yellow
Write-Host "1. Test with a push:" -ForegroundColor White
Write-Host "   git push origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Use auto-commit script:" -ForegroundColor White
Write-Host "   .\scripts\auto-commit.ps1 -Message 'Your commit message'" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. View your commits:" -ForegroundColor White
Write-Host "   https://github.com/$GitHubUsername/fort-homes-qms/commits/main" -ForegroundColor Cyan

Write-Host "`nAuthentication is now configured! ✅" -ForegroundColor Green
Write-Host ""
