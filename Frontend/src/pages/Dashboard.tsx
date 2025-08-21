import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { AirQualityData } from '../types';
import AQICard from '../components/AQICard';
import { RefreshCw, Settings, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [currentData, setCurrentData] = useState<AirQualityData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Dashboard: Setting up API data fetching');
    setIsConnected(true);
    
    const fetchData = async () => {
      try {
        console.log('Dashboard: Fetching data from API...');
        const data = await apiService.getCurrentReading();
        console.log('Dashboard: Received data from API:', data);
        setCurrentData(data);
        setLastUpdate(new Date());
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.error('Dashboard: Error fetching data:', error);
        setError('Failed to fetch sensor data');
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling every 30 seconds
    const interval = setInterval(fetchData, 30000);

    return () => {
      console.log('Dashboard: Cleaning up API polling');
      clearInterval(interval);
      setIsConnected(false);
    };
  }, []);

  const getConnectionStatus = () => {
    if (!isConnected) return { color: 'bg-red-500', text: 'Disconnected' };
    if (lastUpdate && Date.now() - lastUpdate.getTime() > 30000) {
      return { color: 'bg-yellow-500', text: 'Delayed' };
    }
    return { color: 'bg-green-500', text: 'Connected' };
  };

  const status = getConnectionStatus();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Live Monitoring Dashboard</h1>
            <p className="text-gray-600 mt-1">Real-time air quality data from IoT sensors</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${status.color} animate-pulse`}></div>
              <span className="text-sm font-medium text-gray-600">{status.text}</span>
            </div>
            <button 
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={async () => {
                try {
                  const apiStatus = await apiService.getStatus();
                  console.log('API Status:', apiStatus);
                } catch (error) {
                  console.error('API Status Error:', error);
                }
              }}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {lastUpdate && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <RefreshCw className="w-4 h-4" />
            <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sensor data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
            <span className="text-red-800">Error: {error}</span>
          </div>
        </div>
      )}

      {currentData ? (
        <div className="space-y-8">
          {/* Main AQI Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AQICard
                aqi={currentData.aqi}
                pm25={currentData.pm25}
                temperature={currentData.temperature}
                humidity={currentData.humidity}
                location={currentData.location.name}
                timestamp={currentData.timestamp}
                batteryStatus={currentData.batteryStatus}
              />
            </div>
            
            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Device ID</span>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      {currentData.deviceId}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="text-sm text-right">
                      {currentData.location.coordinates.lat.toFixed(4)}, {currentData.location.coordinates.lng.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Signal Strength</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((bar) => (
                        <div
                          key={bar}
                          className={`w-1 h-4 rounded ${
                            bar <= 3 ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Alerts</h3>
                <div className="space-y-3">
                  {currentData.aqi > 100 ? (
                    <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-orange-800">
                          Unhealthy for Sensitive Groups
                        </p>
                        <p className="text-xs text-orange-600">
                          Consider limiting outdoor activities
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-green-800">Air Quality is Good</p>
                        <p className="text-xs text-green-600">Safe for all activities</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-600">PM2.5 Particles</h4>
                <div className="text-xs text-gray-500">μg/m³</div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">{currentData.pm25.toFixed(1)}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((currentData.pm25 / 50) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-600">Temperature</h4>
                <div className="text-xs text-gray-500">°C</div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">{currentData.temperature.toFixed(1)}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((currentData.temperature / 40) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-600">Humidity</h4>
                <div className="text-xs text-gray-500">%</div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">{currentData.humidity.toFixed(1)}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${currentData.humidity}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-600">Air Quality Index</h4>
                <div className="text-xs text-gray-500">AQI</div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">{currentData.aqi}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min((currentData.aqi / 200) * 100, 100)}%`,
                    background: `linear-gradient(to right, #10B981, #F59E0B, #EF4444)`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Connecting to sensors...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;