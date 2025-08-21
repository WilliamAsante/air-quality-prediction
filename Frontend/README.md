# Hybrid Air Quality Prediction System

A comprehensive web application for real-time air quality monitoring, prediction, and analysis using IoT sensors and machine learning.

## Features

- **Real-time Monitoring**: Live air quality data from IoT sensors with 15-second updates
- **Predictive Analytics**: 24-hour forecasts using hybrid LSTM + Random Forest model
- **Explainable AI**: SHAP-based feature analysis showing prediction drivers
- **Historical Trends**: Comprehensive trend analysis with pattern recognition
- **Health Alerts**: Color-coded AQI status with automated notifications
- **Mobile-first Design**: Responsive interface optimized for all devices

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Chart.js** for data visualizations
- **React Router** for navigation
- **Lucide React** for icons

### Backend & Data
- **Firebase Realtime Database** for live data storage
- **Environmental sensors**: PM2.5, temperature, humidity, pressure
- **IoT devices**: ESP32-based sensor nodes

### Machine Learning
- **LSTM Neural Networks** for temporal pattern recognition
- **Random Forest** ensemble for non-linear modeling
- **SHAP** for model interpretability and explainable AI

## Getting Started

### Prerequisites
- Node.js 18+ 
- Firebase project with Realtime Database
- Environmental sensor hardware (optional - demo data available)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd air-quality-prediction-system
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a `.env` file based on `.env.example`
   - Add your Firebase project credentials
   - Enable Firebase Realtime Database

4. Start the development server:
```bash
npm run dev
```

### Firebase Setup

1. Create a new Firebase project at https://console.firebase.google.com
2. Enable Realtime Database
3. Set up database security rules for your sensor data
4. Copy your project configuration to the `.env` file

### Sensor Hardware (Optional)

The system works with demo data by default. For real sensor integration:

- **ESP32 microcontroller**
- **PMS5003** PM2.5 sensor
- **DHT22** temperature/humidity sensor  
- **BMP280** pressure sensor

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── services/           # Firebase and data services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx            # Main application component
```

## Key Components

- **Dashboard**: Real-time monitoring with live sensor data
- **Forecast**: 24-hour predictions with model performance metrics
- **Insights**: SHAP-based explainable AI feature analysis
- **Trends**: Historical data analysis with pattern recognition
- **About**: System architecture and model documentation

## Model Architecture

### LSTM Neural Network
- Captures long-term temporal dependencies
- Learns seasonal patterns and daily cycles
- Handles complex environmental correlations
- 95%+ prediction accuracy

### Random Forest Ensemble
- Models non-linear relationships
- Provides feature importance rankings
- Robust to outliers and missing data
- Excellent generalization performance

### SHAP Analysis
- Explains individual predictions
- Shows feature contribution importance
- Provides transparency in AI decision-making
- Enables model debugging and validation

## API Integration

The system uses Firebase Realtime Database for:
- Live sensor data streaming
- Historical data storage
- Real-time synchronization
- Offline capability

## Deployment

The application is optimized for deployment on:
- **Vercel** (recommended)
- **Netlify**
- **Firebase Hosting**

Build for production:
```bash
npm run build
```

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for:
- New features
- Bug fixes  
- Documentation improvements
- Performance optimizations

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions, collaboration, or deployment assistance:
- Email: contact@airqualityai.com
- Project discussions: GitHub Issues
- Documentation: Built-in help system

## Acknowledgments

- Environmental monitoring research community
- Open source contributors
- Public health organizations
- Smart city initiatives

Built with ❤️ for environmental monitoring and public health.