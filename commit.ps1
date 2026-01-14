#!/usr/bin/env pwsh
param(
    [Parameter(Position=0, Mandatory=$true)]
    [string]$Message = ""
)

$ErrorActionPreference = "Stop"

# Load auth config
$configPath = 'C:\Users\Zacha\Desktop\fort-homes-qms\fort-homes-qms\.github-auth.ps1'
if (-not (Test-Path $configPath)) {
    Write-Host "Error: .github-auth.ps1 not found" -ForegroundColor Red
    exit 1
}

. $configPath
Set-Location $REPO_PATH

Write-Host "`nAuto-Commit & Push`n" -ForegroundColor Cyan

# Check for changes
$status = git status --porcelain
if (-not $status) {
    Write-Host "No changes to commit" -ForegroundColor Green
    exit 0
}

Write-Host "Changes detected:" -ForegroundColor Yellow
$status | ForEach-Object { Write-Host "  $_" }

# Stage and commit
Write-Host "`nStaging changes..." -ForegroundColor Yellow
git add -A
git commit -m $Message
Write-Host "Commit created" -ForegroundColor Green

# Push with token
Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
$remoteUrl = "https://$($GITHUB_USER):$($GITHUB_TOKEN)@github.com/$($GITHUB_USER)/$($GITHUB_REPO).git"
git push $remoteUrl main

if ($LASTEXITCODE -eq 0) {
    Write-Host "Push successful!" -ForegroundColor Green
    Write-Host "`nLatest commits:" -ForegroundColor Yellow
    git log --oneline -3 | ForEach-Object { Write-Host "  $_" }
    Write-Host "`nDone!`n" -ForegroundColor Green
} else {
    Write-Host "Push failed!" -ForegroundColor Red
    exit 1
}
