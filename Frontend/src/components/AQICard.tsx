import React from 'react';
import { getAQICategory, getAQIColor, getAQIDescription } from '../utils/aqi';
import { Thermometer, Droplets, Wind } from 'lucide-react';

interface AQICardProps {
  aqi: number;
  pm25: number;
  temperature: number;
  humidity: number;
  location: string;
  timestamp: number;
  batteryStatus: number;
}

const AQICard: React.FC<AQICardProps> = ({
  aqi,
  pm25,
  temperature,
  humidity,
  location,
  timestamp,
  batteryStatus
}) => {
  const category = getAQICategory(aqi);
  const color = getAQIColor(aqi);
  const description = getAQIDescription(category);

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{location}</h3>
          <p className="text-sm text-gray-500">
            {new Date(timestamp).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500">Live</span>
        </div>
      </div>

      {/* AQI Display */}
      <div className="text-center mb-6">
        <div 
          className="inline-flex items-center justify-center w-24 h-24 rounded-full text-white text-2xl font-bold mb-3 shadow-lg"
          style={{ backgroundColor: color }}
        >
          {aqi}
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-2">{category}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Wind className="w-5 h-5 text-blue-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500">PM2.5</p>
          <p className="text-sm font-semibold">{pm25.toFixed(1)} μg/m³</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Thermometer className="w-5 h-5 text-red-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500">Temperature</p>
          <p className="text-sm font-semibold">{temperature.toFixed(1)}°C</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <p className="text-xs text-gray-500">Humidity</p>
          <p className="text-sm font-semibold">{humidity.toFixed(1)}%</p>
        </div>
      </div>

      {/* Battery Status */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Device Battery</span>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-3 border border-gray-300 rounded-sm relative">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-sm transition-all duration-300"
              style={{ width: `${batteryStatus}%` }}
            ></div>
          </div>
          <span>{batteryStatus.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
};

export default AQICard;