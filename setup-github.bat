@echo off
REM Ultra-simple GitHub setup launcher for Windows
REM This batch file does all the heavy lifting

cls
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║  Fort and Homes QMS - GitHub Setup                             ║
echo ║  One-Click Automation Configuration                            ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check if PowerShell is available
powershell -Command "Write-Host 'Checking PowerShell...' -ForegroundColor Cyan" >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ERROR: PowerShell not found. Please install PowerShell 5.0 or later.
    pause
    exit /b 1
)

REM Get admin rights
net session >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo.
    echo This script needs Administrator privileges.
    echo Right-click this file and select "Run as administrator"
    pause
    exit /b 1
)

echo ✓ Prerequisites OK
echo.

REM Navigate to repo
cd /d "C:\Users\Zacha\Desktop\fort-homes-qms\fort-homes-qms" || (
    echo ERROR: Repository not found
    pause
    exit /b 1
)

echo ✓ Repository found
echo.
echo Starting setup...
echo.

REM Launch PowerShell setup script with admin privileges
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$params = @{}; " ^
    ". '%cd%\scripts\setup-complete-github-auth.ps1' @params"

if %ERRORLEVEL% neq 0 (
    echo.
    echo Setup failed. Please try again or check the PowerShell output above.
    pause
    exit /b 1
)

echo.
echo Setup complete!
pause
