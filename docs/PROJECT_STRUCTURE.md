# Air Quality Prediction Project - Project Structure

## 📁 Project Organization

```
air-quality-prediction/
├── 📁 backend/
│   ├── 📁 ml-model/           # Machine Learning Model
│   │   ├── model.py           # Main prediction model with Firebase integration
│   │   ├── test_firebase.py   # Firebase connection testing
│   │   ├── firebase_config.py # Firebase configuration
│   │   ├── requirements.txt   # Python dependencies
│   │   └── prediction_results.csv # Model output (auto-generated)
│   │
│   └── 📁 api/                # Backend API Services
│       ├── prediction-api.js  # Node.js API for serving predictions
│       └── package-prediction.json # API dependencies
│
├── 📁 Frontend_New/           # React Frontend Application
│   ├── src/                   # Source code
│   ├── package.json           # Frontend dependencies
│   └── ...                    # React/Vite configuration files
│
├── 📁 data/                   # Data Files
│   └── tarkwa_air_quality_history_synthetic.csv # Training dataset
│
├── 📁 docs/                   # Documentation
│   ├── README.md              # Main project documentation
│   ├── SETUP_GUIDE.md         # Setup instructions
│   └── PROJECT_STRUCTURE.md   # This file
│
├── 📁 screenshots/            # Project Screenshots
│   └── Screenshot*.png        # UI and system screenshots
│
└── 📁 Frontend/               # Legacy Frontend (if exists)
```

## 🔧 How to Run the Project

### 1. **Start the ML Model (Backend)**
```powershell
cd backend/ml-model
python model.py
```
- Runs hourly predictions
- Connects to Firebase for live data
- Saves results to `prediction_results.csv`

### 2. **Start the Prediction API**
```powershell
cd backend/api
npm install
node prediction-api.js
```
- Serves predictions on `http://localhost:3002`
- Reads from `prediction_results.csv`

### 3. **Start the Frontend**
```powershell
cd Frontend_New
npm install
npm run dev
```
- Runs on `http://localhost:5173`
- Connects to Firebase for real-time data
- Fetches predictions from API

## 📊 Data Flow

```
Firebase Realtime Database
         ↓
   ML Model (model.py)
         ↓
   prediction_results.csv
         ↓
   Prediction API (prediction-api.js)
         ↓
   Frontend (Frontend_New)
```

## 🔗 Key File Relationships

### **ML Model Dependencies:**
- `model.py` → `../data/tarkwa_air_quality_history_synthetic.csv`
- `model.py` → Firebase Realtime Database
- `model.py` → `prediction_results.csv` (output)

### **API Dependencies:**
- `prediction-api.js` → `../ml-model/prediction_results.csv`
- `prediction-api.js` → Frontend (serves predictions)

### **Frontend Dependencies:**
- `Frontend_New` → Firebase Realtime Database (live data)
- `Frontend_New` → `http://localhost:3002/api/predictions` (predictions)

## 🚀 Quick Start Commands

```powershell
# Terminal 1: ML Model
cd backend/ml-model
python model.py

# Terminal 2: Prediction API  
cd backend/api
node prediction-api.js

# Terminal 3: Frontend
cd Frontend_New
npm run dev
```

## 📝 File Descriptions

### **Backend/ML-Model:**
- **`model.py`**: Core prediction engine with Firebase integration
- **`test_firebase.py`**: Firebase connection testing utility
- **`firebase_config.py`**: Firebase configuration settings
- **`requirements.txt`**: Python package dependencies
- **`prediction_results.csv`**: Generated prediction outputs

### **Backend/API:**
- **`prediction-api.js`**: Express.js server serving predictions
- **`package-prediction.json`**: Node.js dependencies for API

### **Data:**
- **`tarkwa_air_quality_history_synthetic.csv`**: Training dataset for ML model

### **Documentation:**
- **`README.md`**: Main project overview
- **`SETUP_GUIDE.md`**: Detailed setup instructions
- **`PROJECT_STRUCTURE.md`**: This structure documentation

## 🔄 Update Paths After Reorganization

If you need to update file paths in the future:

1. **ML Model**: Update CSV path in `model.py`
2. **API**: Update CSV path in `prediction-api.js`
3. **Frontend**: Update API endpoint URLs if needed

## 📋 Maintenance Notes

- **Backup**: Keep copies of important files before major changes
- **Testing**: Test each component after path updates
- **Documentation**: Update this file when structure changes

