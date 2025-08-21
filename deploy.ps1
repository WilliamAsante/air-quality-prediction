# Air Quality Prediction Project - Deployment Helper

Write-Host "🚀 Air Quality Prediction Project - Deployment Helper" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Green

Write-Host "`n📋 Pre-deployment Checklist:" -ForegroundColor Yellow

# Check if Git is initialized
if (!(Test-Path ".git")) {
    Write-Host "❌ Git repository not initialized!" -ForegroundColor Red
    Write-Host "   Run: git init" -ForegroundColor Gray
    Write-Host "   Run: git add ." -ForegroundColor Gray
    Write-Host "   Run: git commit -m 'Initial commit'" -ForegroundColor Gray
} else {
    Write-Host "✅ Git repository found" -ForegroundColor Green
}

# Check if files are ready for deployment
Write-Host "`n🔧 Checking deployment files..." -ForegroundColor Cyan

$deploymentFiles = @(
    "backend/api/render.yaml",
    "Frontend_New/render.yaml", 
    "backend/ml-model/Procfile",
    "Frontend_New/env.production"
)

foreach ($file in $deploymentFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file (missing)" -ForegroundColor Red
    }
}

Write-Host "`n🌐 Deployment Options:" -ForegroundColor Yellow
Write-Host "1. Render.com (Recommended - Free)" -ForegroundColor White
Write-Host "2. Vercel + Railway" -ForegroundColor White
Write-Host "3. Heroku" -ForegroundColor White
Write-Host "4. AWS/GCP/Azure" -ForegroundColor White

Write-Host "`n📖 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Push your code to GitHub" -ForegroundColor White
Write-Host "2. Choose a hosting platform" -ForegroundColor White
Write-Host "3. Follow the HOSTING_GUIDE.md instructions" -ForegroundColor White
Write-Host "4. Update environment variables with your URLs" -ForegroundColor White

Write-Host "`n📚 Documentation:" -ForegroundColor Yellow
Write-Host "📖 Read: docs/HOSTING_GUIDE.md" -ForegroundColor White
Write-Host "📖 Read: docs/PROJECT_STRUCTURE.md" -ForegroundColor White

Write-Host "`n💡 Quick Commands:" -ForegroundColor Yellow
Write-Host "git add ." -ForegroundColor Gray
Write-Host "git commit -m 'Prepare for deployment'" -ForegroundColor Gray
Write-Host "git push origin main" -ForegroundColor Gray

Write-Host "`n🎯 Ready to deploy! Check docs/HOSTING_GUIDE.md for detailed instructions." -ForegroundColor Green

