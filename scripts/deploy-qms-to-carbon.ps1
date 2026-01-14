# Deploy QMS to Carbon Repo
# Creates a qms/setup branch with all QMS content

param(
    [string]$SourceRepo = "https://github.com/solidzdawg/fort-homes-qms.git",
    [string]$TargetRepo = "https://github.com/solidzdawg/carbon.git",
    [string]$Token = ""
)

$ErrorActionPreference = "Stop"

# Load token from .github-auth.ps1 if not provided
if (-not $Token) {
    $authPath = Join-Path -Path $PSScriptRoot -ChildPath '..\.github-auth.ps1'
    if (Test-Path $authPath) {
        . $authPath
        $Token = $GITHUB_TOKEN
    }
}

if (-not $Token) {
    Write-Host "Error: GitHub token not found" -ForegroundColor Red
    exit 1
}

$TMP_SRC = "./tmp-src-qms"
$TMP_TGT = "./tmp-tgt-carbon"
$BRANCH = "qms/setup"

Write-Host "`n=== QMS Deployment to Carbon ===" -ForegroundColor Cyan
Write-Host "Source: $SourceRepo" -ForegroundColor Yellow
Write-Host "Target: $TargetRepo" -ForegroundColor Yellow
Write-Host "Branch: $BRANCH`n" -ForegroundColor Yellow

# Clean up prior runs
Remove-Item -Recurse -Force $TMP_SRC -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force $TMP_TGT -ErrorAction SilentlyContinue

# Prepare auth
$srcUrl = $SourceRepo -replace "https://", "https://$($GITHUB_USER):$Token@"
$tgtUrl = $TargetRepo -replace "https://", "https://$($GITHUB_USER):$Token@"

Write-Host "Cloning source repo..." -ForegroundColor Yellow
git clone --depth 1 $srcUrl $TMP_SRC
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "Cloning target repo..." -ForegroundColor Yellow
git clone $tgtUrl $TMP_TGT
if ($LASTEXITCODE -ne 0) { exit 1 }

Push-Location $TMP_TGT

Write-Host "Creating branch $BRANCH..." -ForegroundColor Yellow
git checkout -b $BRANCH
if ($LASTEXITCODE -ne 0) { exit 1 }

# Create QMS structure
Write-Host "Creating QMS structure..." -ForegroundColor Yellow
@(
    "qms/imports/fort-homes"
    "qms/policies"
    "qms/procedures"
    "qms/forms"
    "qms/training"
    "docs/quality-manual"
) | ForEach-Object {
    $null = New-Item -ItemType Directory -Path $_ -Force
}

# Copy QMS content
Write-Host "Copying QMS content..." -ForegroundColor Yellow
$itemsToCopy = @(
    @{ src = "docs"; dest = "qms/imports/fort-homes/docs" }
    @{ src = "data"; dest = "qms/imports/fort-homes/data" }
    @{ src = "scripts"; dest = "qms/imports/fort-homes/scripts" }
    @{ src = "README.md"; dest = "qms/imports/fort-homes/README.md" }
    @{ src = "package.json"; dest = "qms/imports/fort-homes/package.json" }
)

foreach ($item in $itemsToCopy) {
    $srcPath = Join-Path $TMP_SRC $item.src
    if (Test-Path $srcPath) {
        Write-Host "  - Importing $($item.src)" -ForegroundColor Cyan
        $destDir = Split-Path $item.dest
        if (-not (Test-Path $destDir)) {
            $null = New-Item -ItemType Directory -Path $destDir -Force
        }
        
        if ((Get-Item $srcPath) -is [System.IO.DirectoryInfo]) {
            Copy-Item -Recurse -Path "$srcPath/*" -Destination $item.dest -Force -ErrorAction SilentlyContinue
        } else {
            Copy-Item -Path $srcPath -Destination $item.dest -Force
        }
    }
}

# Create QMS workflow
Write-Host "Creating CI/CD workflow..." -ForegroundColor Yellow
$workflowDir = ".github/workflows"
$null = New-Item -ItemType Directory -Path $workflowDir -Force

$workflowContent = @"
name: QMS Validation

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check QMS structure
        run: |
          test -d qms/imports/fort-homes/docs
          test -d qms/policies
          test -d qms/procedures
"@

$workflowContent | Out-File -FilePath "$workflowDir/qms-ci.yml" -Encoding UTF8

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Yellow
git add -A
git commit -m "feat: Import QMS from fort-homes-qms repository

- Added complete Quality Management System from fort-homes-qms
- Created qms/imports/fort-homes with all documentation
- Added CI/CD workflow for QMS validation
- Organized structure: policies, procedures, forms, training"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Nothing to commit" -ForegroundColor Green
}

# Push branch
Write-Host "Pushing branch to GitHub..." -ForegroundColor Yellow
git push -u origin $BRANCH
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Branch pushed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Push failed" -ForegroundColor Red
    Pop-Location
    exit 1
}

Pop-Location

# Generate PR URL
$prUrl = "$($TargetRepo.Replace('.git', ''))/compare/main...$BRANCH?expand=1"
$prUrl = $prUrl -replace "https://", ""

Write-Host "`n✅ Deployment Complete!`n" -ForegroundColor Green
Write-Host "Create Pull Request:" -ForegroundColor Cyan
Write-Host $prUrl -ForegroundColor Yellow
Write-Host "`nOr visit:" -ForegroundColor Cyan
Write-Host "https://github.com/crbnos/carbon/pull/new/$BRANCH" -ForegroundColor Yellow

# Cleanup
Write-Host "`nCleaning up temp directories..." -ForegroundColor Yellow
Pop-Location
Remove-Item -Recurse -Force $TMP_SRC -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force $TMP_TGT -ErrorAction SilentlyContinue

Write-Host "Done!`n" -ForegroundColor Green
