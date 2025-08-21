import React from 'react';
import { Brain, Activity, Zap, Shield, Target, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About Our Hybrid Air Quality Prediction System
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Advanced environmental monitoring combining IoT sensors, machine learning, 
          and explainable AI for comprehensive air quality analysis and prediction.
        </p>
      </div>

      <div className="space-y-12">
        {/* System Overview */}
        <section className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">System Architecture</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">IoT Data Collection</h3>
              <p className="text-gray-600 text-sm">
                ESP32-based sensors collect real-time environmental data including PM2.5, 
                temperature, humidity, and atmospheric pressure every 15 seconds.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Machine Learning</h3>
              <p className="text-gray-600 text-sm">
                Hybrid LSTM + Random Forest model processes temporal patterns and 
                environmental correlations to generate accurate air quality predictions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
              <p className="text-gray-600 text-sm">
                Live dashboard with SHAP-based explainable AI insights, 
                providing transparent understanding of prediction factors.
              </p>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hardware & Sensors</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>ESP32 microcontroller with Wi-Fi connectivity</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>PMS5003 laser particle sensor for PM2.5 measurement</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>DHT22 temperature and humidity sensor</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>BMP280 atmospheric pressure sensor</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Software & Algorithms</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>LSTM neural networks for temporal pattern recognition</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Random Forest ensemble for non-linear modeling</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>SHAP (SHapley Additive exPlanations) for model interpretability</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Firebase Realtime Database for data storage</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Model Details */}
        <section className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hybrid Prediction Model</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200/50">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">LSTM Neural Network</h3>
              <p className="text-blue-800 mb-4">
                Long Short-Term Memory networks excel at capturing temporal dependencies 
                in sequential data, making them ideal for time-series air quality prediction.
              </p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Learns seasonal patterns and daily cycles</li>
                <li>• Captures long-term environmental trends</li>
                <li>• Handles complex temporal correlations</li>
                <li>• 95.2% accuracy on validation data</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200/50">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Random Forest Ensemble</h3>
              <p className="text-purple-800 mb-4">
                Ensemble method that combines multiple decision trees to model 
                non-linear relationships between environmental variables.
              </p>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Robust to outliers and noise</li>
                <li>• Provides feature importance rankings</li>
                <li>• Handles missing data gracefully</li>
                <li>• Excellent generalization performance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features & Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Target className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">High Accuracy</h3>
                <p className="text-sm text-gray-600">
                  95%+ prediction accuracy with confidence intervals and uncertainty quantification
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Real-time Updates</h3>
                <p className="text-sm text-gray-600">
                  15-second data refresh rate with live sensor connectivity and status monitoring
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Brain className="w-6 h-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Explainable AI</h3>
                <p className="text-sm text-gray-600">
                  SHAP analysis reveals which environmental factors drive predictions
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Health Alerts</h3>
                <p className="text-sm text-gray-600">
                  Automated notifications when air quality crosses health thresholds
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Activity className="w-6 h-6 text-teal-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Historical Analysis</h3>
                <p className="text-sm text-gray-600">
                  Comprehensive trend analysis with pattern recognition and insights
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Users className="w-6 h-6 text-amber-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Public Health Focus</h3>
                <p className="text-sm text-gray-600">
                  EPA-standard AQI calculations with health recommendations
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Applications & Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Environmental Monitoring</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Urban air quality assessment</li>
                <li>• Industrial emission monitoring</li>
                <li>• Climate change research</li>
                <li>• Environmental policy support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Public Health</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Respiratory health protection</li>
                <li>• Vulnerable population alerts</li>
                <li>• Outdoor activity planning</li>
                <li>• Healthcare decision support</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-sm text-blue-100">
              This system demonstrates the power of combining IoT, machine learning, and explainable AI 
              to address real-world environmental challenges, providing actionable insights for both 
              individual and community-level decision making.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;