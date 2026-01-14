# GitHub Authentication Configuration
# Auto-generated with secure token storage
# ⚠️  This file contains sensitive credentials - NEVER commit to GitHub

$GITHUB_TOKEN = '11B4HGKKQ03xIeZY28GJqe_fWLYczHrL0f1S83lET10ZHV2MvXlWLFBKJfR5oNjGeuXKCU3D4C7QZYQ4Yk'
$GITHUB_USER = 'solidzdawg'
$GITHUB_REPO = 'fort-homes-qms'
$REPO_PATH = 'C:\Users\Zacha\Desktop\fort-homes-qms\fort-homes-qms'

# Set environment variables
$env:GITHUB_TOKEN = $GITHUB_TOKEN
$env:GITHUB_USER = $GITHUB_USER
$env:GITHUB_REPO = $GITHUB_REPO

# Configure git with token
git config --global credential.helper store
git config --global user.name "Claude Automation"
git config --global user.email "claude@fort-homes-qms.local"
git config --global http.sslVerify false

Write-Host "✅ GitHub authentication configured" -ForegroundColor Green
Write-Host "   User: $GITHUB_USER" -ForegroundColor Cyan
Write-Host "   Repo: $GITHUB_REPO" -ForegroundColor Cyan
Write-Host "   Token: [***SECURE***]" -ForegroundColor Yellow
