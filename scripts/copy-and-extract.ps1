Param(
    [string]$source = "$env:USERPROFILE\Downloads\Shop Drawings for CC21TE (SHOP FINAL DONT CONFUSE W OTHER).pdf",
    [string]$dest = ".\data\cc21te\CC21TE-SHOP.pdf"
)

Write-Host "Copying PDF from:`n  $source`n to`n  $dest`n"

if (-not (Test-Path -Path $source)) {
    Write-Error "Source PDF not found: $source`nPlease ensure file exists or provide the full path as -source parameter."
    exit 1
}

$destDir = Split-Path $dest -Parent
if (-not (Test-Path -Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

Copy-Item -Path $source -Destination $dest -Force
if ($?) { Write-Host "Copied PDF to $dest" } else { Write-Error "Copy failed"; exit 2 }

# Ensure node dependencies
if (-not (Test-Path -Path ".\node_modules\pdf-parse")) {
    Write-Host "Installing node dependency pdf-parse... (this requires npm)"
    npm install pdf-parse
    if ($LASTEXITCODE -ne 0) { Write-Error "npm install failed"; exit 3 }
}

# Run the extractor
Write-Host "Running extractor script..."
node .\scripts\extract-cc21te.js
if ($LASTEXITCODE -ne 0) { Write-Error "Extraction script failed with exit code $LASTEXITCODE"; exit 4 }

Write-Host "Extraction completed. Files written to data/cc21te/"