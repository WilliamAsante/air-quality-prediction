import React, { useState } from 'react';
import { 
  Activity, 
  Wind, 
  Thermometer, 
  Droplets, 
  Eye,
  Download,
  RefreshCw 
} from 'lucide-react';
import { useAirQualityData } from './hooks/useAirQualityData';
import { MetricCard } from './components/MetricCard';
import { AQIGauge } from './components/AQIGauge';
import { DataChart } from './components/DataChart';
import { AlertBanner } from './components/AlertBanner';
import { DataTable } from './components/DataTable';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const { currentReading, historicalData, predictions, loading, error } = useAirQualityData();
  const [selectedMetric, setSelectedMetric] = useState<'aqi' | 'pm25' | 'temperature' | 'humidity'>('aqi');

  const exportData = () => {
    if (!historicalData.length) return;
    
    const csvContent = [
      'Timestamp,AQI,PM2.5,Temperature,Humidity,CO2',
      ...historicalData.map(reading => 
        `${new Date(reading.timestamp).toISOString()},${reading.aqi},${reading.pm25},${reading.temperature},${reading.humidity},${reading.co2}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `air-quality-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600">Loading air quality data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Connection Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentReading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Air Quality Monitor
                </h1>
                <p className="text-sm text-gray-500">
                  {currentReading.location} • {currentReading.category}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={exportData}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                aria-label="Export data to CSV"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              
              <div className="flex items-center text-sm text-gray-500">
                <RefreshCw className="h-4 w-4 mr-1" />
                Live
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Banner */}
        <AlertBanner aqi={currentReading.aqi} className="mb-8" />

        {/* Current Metrics */}
        <section className="mb-8" aria-labelledby="current-metrics-heading">
          <h2 id="current-metrics-heading" className="text-2xl font-bold text-gray-900 mb-6">
            Current Conditions
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Air Quality Index"
              value={currentReading.aqi}
              status={currentReading.aqi <= 50 ? 'good' : currentReading.aqi <= 100 ? 'moderate' : 'unhealthy'}
              icon={<Activity />}
            />
            <MetricCard
              title="PM2.5 Particles"
              value={currentReading.pm25}
              unit="μg/m³"
              status={currentReading.pm25 <= 12 ? 'good' : currentReading.pm25 <= 35 ? 'moderate' : 'unhealthy'}
              icon={<Wind />}
            />
            <MetricCard
              title="Temperature"
              value={currentReading.temperature}
              unit="°C"
              icon={<Thermometer />}
            />
            <MetricCard
              title="Humidity"
              value={currentReading.humidity}
              unit="%"
              icon={<Droplets />}
            />
          </div>

          {/* AQI Gauge */}
          <div className="flex justify-center mb-8">
            <AQIGauge value={currentReading.aqi} />
          </div>
        </section>

        {/* Charts Section */}
        <section className="mb-8" aria-labelledby="charts-heading">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 id="charts-heading" className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
              Trends & Predictions
            </h2>
            
            <div className="flex space-x-2">
              {[
                { key: 'aqi', label: 'AQI', icon: Activity },
                { key: 'pm25', label: 'PM2.5', icon: Wind },
                { key: 'temperature', label: 'Temp', icon: Thermometer },
                { key: 'humidity', label: 'Humidity', icon: Droplets }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setSelectedMetric(key as any)}
                  className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    selectedMetric === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                  aria-pressed={selectedMetric === key}
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <DataChart
              historicalData={historicalData}
              predictions={predictions}
              metric={selectedMetric}
            />
          </div>
        </section>

        {/* Data Table */}
        <section aria-labelledby="data-table-heading">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <DataTable data={historicalData} />
          </div>
        </section>

        {/* Predictions Summary */}
        <section className="mt-8" aria-labelledby="predictions-heading">
          <h2 id="predictions-heading" className="text-2xl font-bold text-gray-900 mb-6">
            5-Hour Forecast
          </h2>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-5 gap-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">
                    {new Date(prediction.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {Math.round(prediction.predictedAQI)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round(prediction.confidence * 100)}% confidence
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p className="mb-2">
              Data updates every 30 seconds • Predictions powered by machine learning
            </p>
            <p>
              For health advice, consult local health authorities
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;