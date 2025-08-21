import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Brain, TrendingUp, Shield, Zap, Globe } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full text-blue-600 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Real-time Air Quality Monitoring</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Hybrid Air Quality
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Prediction System
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Advanced IoT-powered environmental monitoring with machine learning predictions 
              and explainable AI insights for better air quality understanding.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Activity className="w-5 h-5 mr-2" />
              View Live Dashboard
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Real-time Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Prediction Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">15s</div>
              <div className="text-gray-600">Update Frequency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">AI</div>
              <div className="text-gray-600">Explainable Insights</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Environmental Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Combining IoT sensors, machine learning, and explainable AI for comprehensive air quality analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Monitoring</h3>
              <p className="text-gray-600 mb-4">
                Live data from IoT sensors updating every 15 seconds with PM2.5, temperature, humidity, and device status.
              </p>
              <Link to="/dashboard" className="text-blue-600 font-semibold hover:text-blue-700">
                View Dashboard →
              </Link>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Predictive Analytics</h3>
              <p className="text-gray-600 mb-4">
                Hybrid LSTM + Random Forest model providing accurate short-term air quality forecasts with confidence intervals.
              </p>
              <Link to="/forecast" className="text-purple-600 font-semibold hover:text-purple-700">
                View Forecasts →
              </Link>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Explainable AI</h3>
              <p className="text-gray-600 mb-4">
                SHAP-based feature analysis showing which environmental factors most influence air quality predictions.
              </p>
              <Link to="/insights" className="text-indigo-600 font-semibold hover:text-indigo-700">
                View Insights →
              </Link>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Alerts</h3>
              <p className="text-gray-600 mb-4">
                Color-coded AQI status with customizable notifications when air quality crosses health thresholds.
              </p>
              <Link to="/dashboard" className="text-teal-600 font-semibold hover:text-teal-700">
                Configure Alerts →
              </Link>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Historical Analysis</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive trend analysis with daily, weekly, and monthly air quality patterns and insights.
              </p>
              <Link to="/trends" className="text-amber-600 font-semibold hover:text-amber-700">
                View Trends →
              </Link>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-rose-600 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile First</h3>
              <p className="text-gray-600 mb-4">
                Fully responsive design with accessibility features, optimized for phones, tablets, and desktop devices.
              </p>
              <span className="text-rose-600 font-semibold">Available Everywhere</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Monitoring Air Quality Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Access real-time environmental data, AI-powered predictions, and actionable insights 
            to make informed decisions about air quality.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
          >
            <Activity className="w-5 h-5 mr-2" />
            Launch Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;