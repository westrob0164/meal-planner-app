@echo off
:: utilities/deploy_push.bat
:: Background Windows Automation Script with Repository path protection.

:: 1. Force the script to run from the root directory of your project folder
cd /d "%~dp0.."

:: 2. 🛡️ REPOSITORY PATH PROTECTION CHECK
:: Searches your local git setup to verify it contains your meal-planner-app destination link
git remote -v | findstr /I "meal-planner-app" >nul
if %errorlevel% neq 0 (
    echo 🚨 ERROR: Git path verification failed! 
    echo This directory is not tracking the meal-planner-app repository.
    echo Deployment cancelled to protect your base files.
    pause
    exit /b 1
)

:: 3. Stage the newly updated JSON profile data layer 
git add data/meal_state.json

:: 4. Generate a silent, timestamped snapshot package
git commit -m "data: automated desktop tracking profile update - %date% %time%" >nul 2>&1

:: 5. Push upstream to update your live phone link layout
git push origin main >nul 2>&1

exit /b 0
