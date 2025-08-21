# 🌬️ Air Quality Prediction System

A real-time air quality monitoring and prediction system that uses machine learning to forecast PM2.5 levels and Air Quality Index (AQI) values.

## 🚀 Live Demo

- **Frontend**: [Your Frontend URL] (Coming Soon)
- **API**: [Your API URL] (Coming Soon)

## 📊 Features

- **Real-time Data**: Live sensor readings from Firebase Realtime Database
- **ML Predictions**: 5-step hourly forecasts using Random Forest algorithm
- **Interactive Dashboard**: Beautiful React frontend with real-time charts
- **Accuracy Metrics**: Model performance monitoring and evaluation
- **Firebase Integration**: Seamless cloud database connectivity

## 🏗️ Architecture

```
Firebase Realtime Database
         ↓
   ML Model (Python)
         ↓
  prediction_results.csv
         ↓
  Prediction API (Node.js)
         ↓
  React Frontend
```

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS + Recharts
- **Backend API**: Node.js + Express.js
- **ML Model**: Python + Scikit-learn + Pandas + NumPy
- **Database**: Firebase Realtime Database
- **Hosting**: Render.com (Frontend + API) + Railway (ML Model)

## 📁 Project Structure

```
air-quality-prediction/
├── 📁 backend/
│   ├── 📁 ml-model/           # Machine Learning Model
│   │   ├── model.py           # Main prediction model
│   │   ├── requirements.txt   # Python dependencies
│   │   └── Procfile          # Railway deployment
│   │
│   └── 📁 api/                # Backend API
│       ├── prediction-api.js  # Express.js server
│       ├── package.json       # Node.js dependencies
│       └── render.yaml        # Render deployment config
│
├── 📁 Frontend_New/           # React Frontend
│   ├── src/                   # Source code
│   ├── package.json           # Frontend dependencies
│   ├── render.yaml           # Render deployment config
│   └── env.production        # Production environment
│
├── 📁 data/                   # Data Files
│   └── tarkwa_air_quality_history_synthetic.csv
│
└── 📁 docs/                   # Documentation
    ├── HOSTING_GUIDE.md      # Deployment instructions
    └── PROJECT_STRUCTURE.md  # Project organization
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd air-quality-prediction
   ```

2. **Start ML Model**
   ```bash
   cd backend/ml-model
   pip install -r requirements.txt
   python model.py
   ```

3. **Start Prediction API**
   ```bash
   cd backend/api
   npm install
   node prediction-api.js
   ```

4. **Start Frontend**
   ```bash
   cd Frontend_New
   npm install
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - API: http://localhost:3002/api/predictions

## 🌐 Deployment

### Render.com Deployment (Recommended)

1. **Push code to GitHub**
2. **Connect GitHub to Render**
3. **Deploy Backend API** (Web Service)
4. **Deploy Frontend** (Static Site)
5. **Deploy ML Model** (Railway/Heroku)

See [docs/HOSTING_GUIDE.md](docs/HOSTING_GUIDE.md) for detailed instructions.

## 📊 Model Performance

The Random Forest model provides:
- **Mean Absolute Error (MAE)**: ~2-5 µg/m³
- **R² Score**: 0.85-0.95
- **Cross-validation**: 5-fold validation
- **Feature Importance**: PM2.5 lag features
- **Prediction Confidence**: Tree-based confidence intervals

## 🔧 Configuration

### Environment Variables

**Frontend (.env.production):**
```bash
VITE_API_URL=https://your-api-url.onrender.com
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_DATABASE_URL=your_firebase_database_url
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

**Backend API (.env):**
```bash
NODE_ENV=production
PORT=10000
CORS_ORIGIN=https://your-frontend-url.onrender.com
```

**ML Model (.env):**
```bash
FIREBASE_HOST=your_firebase_host
FIREBASE_PATH=/sensorLogs
FIREBASE_AUTH=your_firebase_auth_secret
```

## 📈 Data Flow

1. **Sensor Data**: IoT devices send readings to Firebase every 15 seconds
2. **ML Model**: Python script fetches latest PM2.5, runs predictions hourly
3. **API**: Node.js server serves predictions via REST API
4. **Frontend**: React app displays real-time data and predictions
5. **Charts**: Interactive visualizations with historical and forecast data

## 🔍 API Endpoints

- `GET /api/predictions` - Get latest ML predictions
- `GET /health` - Health check endpoint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Firebase for real-time database
- Scikit-learn for machine learning
- React and Vite for frontend
- Render.com for hosting

---

**Built with ❤️ for better air quality monitoring**
