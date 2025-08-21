import React, { useEffect, useState } from 'react';
import { firebaseService } from '../services/firebase';
import { ShapData } from '../types';
import Chart from '../components/Chart';
import { Brain, Info, TrendingUp, TrendingDown } from 'lucide-react';

const Insights: React.FC = () => {
  const [shapData, setShapData] = useState<ShapData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShapData = async () => {
      try {
        const data = await firebaseService.getShapData();
        setShapData(data);
      } catch (error) {
        console.error('Error fetching SHAP data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShapData();
  }, []);

  const chartData = {
    labels: shapData.map(item => item.feature),
    datasets: [
      {
        label: 'Feature Contribution',
        data: shapData.map(item => item.contribution),
        backgroundColor: shapData.map(item => 
          item.contribution > 0 ? 'rgba(239, 68, 68, 0.8)' : 'rgba(59, 130, 246, 0.8)'
        ),
        borderColor: shapData.map(item => 
          item.contribution > 0 ? '#EF4444' : '#3B82F6'
        ),
        borderWidth: 1,
      }
    ]
  };

  const chartOptions = {
    indexAxis: 'y' as const,
    plugins: {
      title: {
        display: true,
        text: 'SHAP Feature Contributions to Air Quality Prediction',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: 20,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Contribution to Prediction',
        },
        grid: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Environmental Features',
        },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Explainable AI Insights</h1>
        </div>
        <p className="text-gray-600">
          Understanding which environmental factors most influence air quality predictions using SHAP analysis
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing feature contributions...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Explanation */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200/50">
            <div className="flex items-start space-x-3">
              <Info className="w-6 h-6 text-purple-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-purple-900 mb-2">What is SHAP?</h3>
                <p className="text-purple-800 mb-3">
                  SHAP (SHapley Additive exPlanations) values show how much each environmental feature 
                  contributes to increasing or decreasing the predicted air quality index.
                </p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-purple-700">Increases AQI (worse air quality)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-purple-700">Decreases AQI (better air quality)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SHAP Chart */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
            <Chart type="bar" data={chartData} options={chartOptions} height={400} />
          </div>

          {/* Feature Analysis Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shapData.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{feature.feature}</h3>
                  {feature.contribution > 0 ? (
                    <TrendingUp className="w-5 h-5 text-red-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-blue-500" />
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Current Value</span>
                    <span className="font-semibold text-gray-900">
                      {feature.value.toFixed(1)} {getFeatureUnit(feature.feature)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Contribution</span>
                    <span className={`font-semibold ${feature.contribution > 0 ? 'text-red-600' : 'text-blue-600'}`}>
                      {feature.contribution > 0 ? '+' : ''}{(feature.contribution * 100).toFixed(1)}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        feature.contribution > 0 ? 'bg-gradient-to-r from-red-400 to-red-600' : 'bg-gradient-to-r from-blue-400 to-blue-600'
                      }`}
                      style={{ width: `${Math.abs(feature.contribution) * 100}%` }}
                    ></div>
                  </div>

                  <p className="text-xs text-gray-600">
                    {getFeatureExplanation(feature.feature, feature.contribution)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Model Interpretability Guide */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Understanding Feature Impacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Primary Pollutant Indicators</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>PM2.5:</strong> Fine particulate matter is the primary component of AQI calculations</p>
                  <p><strong>Temperature:</strong> Higher temperatures can increase chemical reactions and pollutant formation</p>
                  <p><strong>Humidity:</strong> Affects particle formation and atmospheric chemistry</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Environmental Modifiers</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Wind Speed:</strong> Higher winds typically disperse pollutants, improving air quality</p>
                  <p><strong>Pressure:</strong> Atmospheric pressure affects pollutant dispersion patterns</p>
                  <p><strong>Time of Day:</strong> Traffic patterns and atmospheric conditions vary by time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Model Confidence and Limitations */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-3">Model Confidence & Limitations</h3>
            <div className="text-sm text-amber-800 space-y-2">
              <p>• SHAP values are calculated based on current environmental conditions and may change with different scenarios</p>
              <p>• Model predictions are most accurate for conditions similar to training data</p>
              <p>• Extreme weather events or unusual pollution sources may reduce prediction accuracy</p>
              <p>• Feature contributions represent average effects and may vary for individual predictions</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getFeatureUnit = (feature: string): string => {
  switch (feature) {
    case 'PM2.5': return 'μg/m³';
    case 'Temperature': return '°C';
    case 'Humidity': return '%';
    case 'Wind Speed': return 'm/s';
    case 'Pressure': return 'hPa';
    case 'Time of Day': return 'hrs';
    default: return '';
  }
};

const getFeatureExplanation = (feature: string, contribution: number): string => {
  const isPositive = contribution > 0;
  
  const explanations: Record<string, { positive: string; negative: string }> = {
    'PM2.5': {
      positive: 'High PM2.5 concentration directly increases air quality index',
      negative: 'Lower PM2.5 levels contribute to better air quality'
    },
    'Temperature': {
      positive: 'Higher temperatures promote photochemical reactions, worsening air quality',
      negative: 'Cooler temperatures reduce pollutant formation reactions'
    },
    'Humidity': {
      positive: 'High humidity can increase particle formation and reduce visibility',
      negative: 'Lower humidity reduces secondary particle formation'
    },
    'Wind Speed': {
      positive: 'Calm conditions allow pollutants to accumulate',
      negative: 'Higher wind speeds help disperse pollutants'
    },
    'Pressure': {
      positive: 'High pressure systems can trap pollutants near the surface',
      negative: 'Lower pressure promotes vertical mixing and pollutant dispersion'
    },
    'Time of Day': {
      positive: 'Peak traffic hours increase emission sources',
      negative: 'Off-peak hours have reduced emission activity'
    }
  };

  return explanations[feature]?.[isPositive ? 'positive' : 'negative'] || 'Contributing to prediction variance';
};

export default Insights;