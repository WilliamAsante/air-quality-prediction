# Air Quality Prediction Project - Quick Start Script

Write-Host "🚀 Starting Air Quality Prediction Project..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

# Function to check if a command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Check prerequisites
Write-Host "`n📋 Checking prerequisites..." -ForegroundColor Yellow

if (!(Test-Command "python")) {
    Write-Host "❌ Python not found! Please install Python first." -ForegroundColor Red
    exit 1
}

if (!(Test-Command "node")) {
    Write-Host "❌ Node.js not found! Please install Node.js first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Prerequisites check passed!" -ForegroundColor Green

# Start ML Model
Write-Host "`n🤖 Starting ML Model..." -ForegroundColor Cyan
Write-Host "Running: cd backend\ml-model && python model.py" -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend\ml-model; python model.py" -WindowStyle Normal

# Wait a moment for ML model to start
Start-Sleep -Seconds 3

# Start Prediction API
Write-Host "`n🌐 Starting Prediction API..." -ForegroundColor Cyan
Write-Host "Running: cd backend\api && node prediction-api.js" -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend\api; node prediction-api.js" -WindowStyle Normal

# Wait a moment for API to start
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "`n🎨 Starting Frontend..." -ForegroundColor Cyan
Write-Host "Running: cd Frontend_New && npm run dev" -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Frontend_New; npm run dev" -WindowStyle Normal

Write-Host "`n✅ All components started!" -ForegroundColor Green
Write-Host "`n📊 Access your application:" -ForegroundColor Yellow
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   API: http://localhost:3002/api/predictions" -ForegroundColor White
Write-Host "`n📝 Check the terminal windows for component status and logs." -ForegroundColor Gray

