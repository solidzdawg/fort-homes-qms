# Automated commit script for Fort and Homes QMS
# Usage: .\scripts\auto-commit.ps1 -Message "Your commit message"
# Supports both manual runs and Claude-guided automation

param(
    [Parameter(Mandatory=$true)]
    [string]$Message,
    
    [string]$Author = "Claude Automation",
    [string]$Email = "claude@fort-homes-qms.local",
    [switch]$SkipPush = $false
)

$ErrorActionPreference = "Stop"

# Try to load GitHub auth config if it exists
$configPath = Join-Path (Split-Path $PSScriptRoot) '.github-auth.ps1'
if (Test-Path $configPath) {
    . $configPath
    $hasToken = $true
}
else {
    $hasToken = $false
}

# Get repository root
$repoRoot = (git rev-parse --show-toplevel 2>$null)
if (-not $repoRoot) {
    Write-Host "❌ Error: Not in a Git repository" -ForegroundColor Red
    exit 1
}

Set-Location $repoRoot

Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Auto-Commit Script - Fort and Homes QMS                       ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Step 1: Check for changes
Write-Host "Step 1: Checking for changes..." -ForegroundColor Yellow
$status = & git status --porcelain
if (-not $status) {
    Write-Host "✅ No changes detected - nothing to commit" -ForegroundColor Green
    exit 0
}

Write-Host "📝 Changes detected:" -ForegroundColor Cyan
$status | ForEach-Object { Write-Host "   $_" -ForegroundColor White }

# Step 2: Configure git user
Write-Host "`nStep 2: Configuring git user..." -ForegroundColor Yellow
& git config user.name "$Author"
& git config user.email "$Email"
Write-Host "✅ User: $Author <$Email>" -ForegroundColor Green

# Step 3: Stage all changes
Write-Host "`nStep 3: Staging all changes..." -ForegroundColor Yellow
& git add -A
$stagedCount = @(& git diff --cached --name-only).Count
Write-Host "✅ Staged $stagedCount file(s) for commit" -ForegroundColor Green

# Step 4: Create commit
Write-Host "`nStep 4: Creating commit..." -ForegroundColor Yellow
try {
    & git commit -m $Message
    Write-Host "✅ Commit created: '$Message'" -ForegroundColor Green
}
catch {
    Write-Host "❌ Commit failed: $_" -ForegroundColor Red
    exit 1
}

# Step 5: Push to remote
Write-Host "`nStep 5: Pushing to GitHub..." -ForegroundColor Yellow
try {
    if ($hasToken -and $GITHUB_TOKEN) {
        # Use token authentication
        $remoteUrl = "https://$($GITHUB_USER):$($GITHUB_TOKEN)@github.com/$GITHUB_USER/fort-homes-qms.git"
        & git push "$remoteUrl" main 2>&1 | ForEach-Object {
            if ($_ -match "error|fatal|401|403") {
                Write-Host "❌ $_" -ForegroundColor Red
            }
            else {
                Write-Host "   $_" -ForegroundColor Cyan
            }
        }
    }
    else {
        # Use standard git authentication
        & git push origin main 2>&1 | ForEach-Object {
            if ($_ -match "error|fatal|401|403") {
                Write-Host "❌ $_" -ForegroundColor Red
            }
            else {
                Write-Host "   $_" -ForegroundColor Cyan
            }
        }
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Push successful!" -ForegroundColor Green
    }
    else {
        Write-Host "❌ Push failed with exit code $LASTEXITCODE" -ForegroundColor Red
        exit 1
    }
}
catch {
    Write-Host "❌ Push error: $_" -ForegroundColor Red
    exit 1
}

# Step 6: Display latest commits
Write-Host "`nStep 6: Latest commits:" -ForegroundColor Yellow
& git log --oneline -5 | ForEach-Object { Write-Host "   $_" -ForegroundColor Cyan }

Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  ✅ COMMIT SUCCESSFUL                                          ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Green

Write-Host "View on GitHub:" -ForegroundColor Cyan
Write-Host "https://github.com/solidzdawg/fort-homes-qms/commits/main`n" -ForegroundColor Cyan
