# Deploy to Azure - PowerShell Script

Write-Host "=== Time Travelers' Emporium Azure Deployment ===" -ForegroundColor Green
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit for Azure deployment"
    git branch -M main
    
    Write-Host ""
    Write-Host "IMPORTANT: You need to create a GitHub repository and add it as remote:" -ForegroundColor Red
    Write-Host "1. Go to https://github.com and create a new repository"
    Write-Host "2. Run: git remote add origin <your-repo-url>"
    Write-Host "3. Run: git push -u origin main"
    Write-Host ""
    Write-Host "Then follow the deployment guide in DEPLOYMENT.md"
} else {
    Write-Host "Git repository detected. Checking for uncommitted changes..." -ForegroundColor Yellow
    
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Write-Host "Uncommitted changes detected. Committing changes..." -ForegroundColor Yellow
        git add .
        git commit -m "Prepare for Azure deployment - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    }
    
    Write-Host "Pushing to main branch..." -ForegroundColor Yellow
    git push origin main
    
    Write-Host ""
    Write-Host "Code pushed successfully!" -ForegroundColor Green
    Write-Host "Now follow these steps in Azure Portal:" -ForegroundColor Cyan
    Write-Host "1. Go to your resource group: rg-timetravellers-empordium-demo"
    Write-Host "2. Create a new Static Web App"
    Write-Host "3. Connect it to your GitHub repository"
    Write-Host "4. Set build preset to 'React' and output location to 'dist'"
    Write-Host ""
    Write-Host "See DEPLOYMENT.md for detailed instructions."
}

Write-Host ""
Write-Host "=== Deployment files created ===" -ForegroundColor Green
Write-Host "✓ .github/workflows/azure-static-web-apps.yml"
Write-Host "✓ staticwebapp.config.json"
Write-Host "✓ DEPLOYMENT.md"
Write-Host ""
