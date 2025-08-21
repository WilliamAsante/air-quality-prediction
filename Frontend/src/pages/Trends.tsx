import React, { useEffect, useState } from 'react';
import { firebaseService } from '../services/firebase';
import { HistoricalData, TimeRange } from '../types';
import Chart from '../components/Chart';
import { Calendar, TrendingUp, BarChart3, Activity } from 'lucide-react';

const Trends: React.FC = () => {
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setLoading(true);
      try {
        const data = await firebaseService.getHistoricalData(timeRange);
        setHistoricalData(data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [timeRange]);

  const chartData = {
    labels: historicalData.map(item => {
      const date = new Date(item.date);
      return timeRange === 'daily' 
        ? date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
        : timeRange === 'weekly'
        ? `Week of ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
        : date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }),
    datasets: [
      {
        label: 'Average AQI',
        data: historicalData.map(item => item.avgAQI),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Max AQI',
        data: historicalData.map(item => item.maxAQI),
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Min AQI',
        data: historicalData.map(item => item.minAQI),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: `Air Quality Trends - ${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} View`,
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
        title: {
          display: true,
          text: 'Air Quality Index (AQI)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time Period',
        },
      },
    },
  };

  const avgAQI = historicalData.length > 0 
    ? historicalData.reduce((sum, item) => sum + item.avgAQI, 0) / historicalData.length 
    : 0;

  const maxAQI = historicalData.length > 0 
    ? Math.max(...historicalData.map(item => item.maxAQI)) 
    : 0;

  const minAQI = historicalData.length > 0 
    ? Math.min(...historicalData.map(item => item.minAQI)) 
    : 0;

  const trend = historicalData.length > 1
    ? historicalData[historicalData.length - 1].avgAQI - historicalData[0].avgAQI
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Historical Trends</h1>
            <p className="text-gray-600 mt-1">
              Analyze air quality patterns and trends over time
            </p>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as TimeRange)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="daily">Last 7 Days</option>
              <option value="weekly">Last 4 Weeks</option>
              <option value="monthly">Last 12 Months</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading historical data...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-2">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">{avgAQI.toFixed(1)}</span>
              </div>
              <p className="text-sm text-gray-600">Average AQI</p>
              <div className="mt-2 flex items-center space-x-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((avgAQI / 150) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-red-600" />
                <span className="text-2xl font-bold text-gray-900">{maxAQI.toFixed(0)}</span>
              </div>
              <p className="text-sm text-gray-600">Peak AQI</p>
              <div className="mt-2 flex items-center space-x-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((maxAQI / 200) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-2">
                <Activity className="w-8 h-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">{minAQI.toFixed(0)}</span>
              </div>
              <p className="text-sm text-gray-600">Best AQI</p>
              <div className="mt-2 flex items-center space-x-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((minAQI / 100) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className={`w-8 h-8 ${trend >= 0 ? 'text-red-600' : 'text-green-600'}`} />
                <span className={`text-2xl font-bold ${trend >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {trend >= 0 ? '+' : ''}{trend.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-gray-600">Trend</p>
              <p className="text-xs text-gray-500 mt-1">
                {trend >= 0 ? 'Worsening' : 'Improving'} over period
              </p>
            </div>
          </div>

          {/* Main Trend Chart */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
            <Chart type="line" data={chartData} options={chartOptions} height={400} />
          </div>

          {/* Data Quality Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Air Quality Distribution */}
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Air Quality Distribution</h3>
              <div className="space-y-4">
                {getAQIDistribution(historicalData).map(({ category, percentage, color }) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded ${color}`}></div>
                      <span className="text-sm font-medium text-gray-700">{category}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${color}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{percentage.toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights and Patterns */}
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Average Conditions:</strong> Air quality has been mostly {avgAQI <= 50 ? 'good' : avgAQI <= 100 ? 'moderate' : 'unhealthy'} 
                    with an average AQI of {avgAQI.toFixed(1)}
                  </p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>Peak Events:</strong> Highest recorded AQI was {maxAQI.toFixed(0)}, indicating 
                    {maxAQI > 150 ? ' unhealthy conditions' : maxAQI > 100 ? ' moderate pollution levels' : ' acceptable air quality'}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>Best Conditions:</strong> Cleanest air recorded at AQI {minAQI.toFixed(0)}, 
                    showing the area can achieve {minAQI <= 50 ? 'excellent' : 'good'} air quality
                  </p>
                </div>
                {trend !== 0 && (
                  <div className={`p-3 rounded-lg border ${trend > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                    <p className={`text-sm ${trend > 0 ? 'text-red-800' : 'text-green-800'}`}>
                      <strong>Trend:</strong> Air quality is {trend > 0 ? 'deteriorating' : 'improving'} 
                      by {Math.abs(trend).toFixed(1)} AQI points over the selected period
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getAQIDistribution = (data: HistoricalData[]) => {
  if (data.length === 0) return [];
  
  const categories = [
    { name: 'Good (0-50)', color: 'bg-green-500', min: 0, max: 50 },
    { name: 'Moderate (51-100)', color: 'bg-yellow-500', min: 51, max: 100 },
    { name: 'Unhealthy for Sensitive (101-150)', color: 'bg-orange-500', min: 101, max: 150 },
    { name: 'Unhealthy (151-200)', color: 'bg-red-500', min: 151, max: 200 },
  ];

  return categories.map(category => {
    const count = data.filter(item => 
      item.avgAQI >= category.min && item.avgAQI <= category.max
    ).length;
    
    return {
      category: category.name,
      percentage: (count / data.length) * 100,
      color: category.color,
    };
  });
};

export default Trends;