import React, { useEffect, useState } from 'react';
import { firebaseService } from '../services/firebase';
import { PredictionData } from '../types';
import Chart from '../components/Chart';
import { TrendingUp, Target, Clock, AlertCircle } from 'lucide-react';

const Forecast: React.FC = () => {
  const [predictionData, setPredictionData] = useState<PredictionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const data = await firebaseService.getPredictionData();
        setPredictionData(data);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
    const interval = setInterval(fetchPredictions, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: predictionData.map(item => 
      new Date(item.timestamp).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    ),
    datasets: [
      {
        label: 'Actual AQI',
        data: predictionData.map(item => item.actual),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Predicted AQI',
        data: predictionData.map(item => item.predicted),
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
        borderDash: [5, 5],
      }
    ]
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Air Quality Index: Actual vs Predicted',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 200,
        title: {
          display: true,
          text: 'Air Quality Index (AQI)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
    },
  };

  const currentPredictions = predictionData.filter(item => item.timestamp > Date.now());
  const avgAccuracy = predictionData
    .filter(item => item.actual !== null)
    .reduce((acc, item, _, arr) => {
      const accuracy = 100 - Math.abs(((item.actual! - item.predicted) / item.actual!) * 100);
      return acc + accuracy / arr.length;
    }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Air Quality Forecast</h1>
        <p className="text-gray-600">
          24-hour predictions using our hybrid LSTM + Random Forest model
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading predictions...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Model Performance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">{avgAccuracy.toFixed(1)}%</span>
              </div>
              <p className="text-sm text-gray-600">Model Accuracy</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">LSTM+RF</span>
              </div>
              <p className="text-sm text-gray-600">Hybrid Model</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-purple-600" />
                <span className="text-2xl font-bold text-gray-900">24h</span>
              </div>
              <p className="text-sm text-gray-600">Forecast Horizon</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="w-8 h-8 text-amber-600" />
                <span className="text-2xl font-bold text-gray-900">
                  {currentPredictions.length > 0 ? 
                    Math.round(currentPredictions.reduce((acc, item) => acc + item.confidence, 0) / currentPredictions.length * 100) : 0}%
                </span>
              </div>
              <p className="text-sm text-gray-600">Avg Confidence</p>
            </div>
          </div>

          {/* Main Prediction Chart */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
            <Chart type="line" data={chartData} options={chartOptions} height={400} />
          </div>

          {/* Hourly Predictions Table */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Next 12 Hours Forecast</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Predicted AQI
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Confidence
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Health Advice
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentPredictions.slice(0, 12).map((prediction, index) => {
                    const category = prediction.predicted <= 50 ? 'Good' : 
                                   prediction.predicted <= 100 ? 'Moderate' :
                                   prediction.predicted <= 150 ? 'Unhealthy for Sensitive' : 'Unhealthy';
                    const categoryColor = prediction.predicted <= 50 ? 'text-green-600 bg-green-50' : 
                                        prediction.predicted <= 100 ? 'text-yellow-600 bg-yellow-50' :
                                        prediction.predicted <= 150 ? 'text-orange-600 bg-orange-50' : 'text-red-600 bg-red-50';
                    const advice = prediction.predicted <= 50 ? 'Safe for all activities' : 
                                 prediction.predicted <= 100 ? 'Sensitive groups should limit exposure' :
                                 prediction.predicted <= 150 ? 'Limit outdoor activities' : 'Avoid outdoor activities';

                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {new Date(prediction.timestamp).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: true
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {Math.round(prediction.predicted)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${categoryColor}`}>
                            {category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {Math.round(prediction.confidence * 100)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {advice}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Model Information */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Our Prediction Model</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">LSTM Neural Network</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Captures long-term temporal dependencies in air quality patterns, learning from 
                  seasonal trends, daily cycles, and weather correlations.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Temporal pattern recognition</li>
                  <li>• Seasonal trend analysis</li>
                  <li>• Weather correlation modeling</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Random Forest Ensemble</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Handles complex non-linear relationships between environmental variables, 
                  providing robust predictions with uncertainty quantification.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Non-linear relationship modeling</li>
                  <li>• Feature importance analysis</li>
                  <li>• Uncertainty quantification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forecast;