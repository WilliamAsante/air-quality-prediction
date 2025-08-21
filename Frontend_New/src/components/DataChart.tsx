import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { format } from 'date-fns';
import { AirQualityReading, AirQualityPrediction } from '../types/airQuality';

interface DataChartProps {
  historicalData: AirQualityReading[];
  predictions: AirQualityPrediction[];
  metric: 'aqi' | 'pm25' | 'temperature' | 'humidity';
  className?: string;
}

export function DataChart({ historicalData, predictions, metric, className }: DataChartProps) {
  const metricConfig = {
    aqi: { 
      key: 'aqi', 
      predictedKey: 'predictedAQI',
      label: 'Air Quality Index', 
      color: '#3B82F6',
      unit: 'AQI'
    },
    pm25: { 
      key: 'pm25', 
      predictedKey: null,
      label: 'PM2.5', 
      color: '#EF4444',
      unit: 'μg/m³'
    },
    temperature: { 
      key: 'temperature', 
      predictedKey: null,
      label: 'Temperature', 
      color: '#F59E0B',
      unit: '°C'
    },
    humidity: { 
      key: 'humidity', 
      predictedKey: null,
      label: 'Humidity', 
      color: '#10B981',
      unit: '%'
    }
  };

  const config = metricConfig[metric];
  
  // Create uniform time distribution for all 10 data points
  const totalTimeSpan = 4 * 60 * 60 * 1000; // 4 hours total span
  const timeStep = totalTimeSpan / 9; // 9 intervals for 10 points
  const startTime = Date.now() - (2 * 60 * 60 * 1000); // Start 2 hours ago
  
  const chartData = [
    // Historical data with uniform spacing
    ...historicalData.map((reading, index) => {
      const uniformTimestamp = startTime + (index * timeStep);
      
      return {
        timestamp: uniformTimestamp,
        value: reading[config.key as keyof AirQualityReading] as number,
        type: 'historical',
        originalTimestamp: reading.timestamp
      };
    }),
    // Prediction data with uniform spacing
    ...(config.predictedKey ? predictions.map((pred, index) => {
      const uniformTimestamp = startTime + ((index + historicalData.length) * timeStep);
      
      return {
        timestamp: uniformTimestamp,
        predicted: pred[config.predictedKey as keyof AirQualityPrediction] as number,
        type: 'predicted'
      };
    }) : [])
  ].sort((a, b) => a.timestamp - b.timestamp);

  console.log('Raw chart data timestamps:', chartData.map(d => ({
    timestamp: new Date(d.timestamp).toLocaleTimeString(),
    type: d.type,
    value: 'value' in d ? d.value : undefined,
    predicted: 'predicted' in d ? d.predicted : undefined,
    originalTimestamp: 'originalTimestamp' in d ? new Date(d.originalTimestamp).toLocaleTimeString() : undefined
  })));

  // Remove duplicates based on timestamp and ensure proper separation
  const uniqueChartData = chartData.filter((item, index, self) => 
    index === self.findIndex(t => t.timestamp === item.timestamp)
  );
  
  // Ensure we have exactly 10 data points
  if (uniqueChartData.length !== 10) {
    console.warn(`⚠️ Expected 10 data points but got ${uniqueChartData.length}!`);
    console.warn('Historical data:', historicalData.length);
    console.warn('Predictions:', predictions.length);
    
    // If we don't have 10 points, create placeholder data to show the structure
    if (uniqueChartData.length < 10) {
      console.warn('Creating placeholder data to show 10-point structure');
    }
  }

  console.log(`Chart data for ${metric}:`, {
    historicalCount: historicalData.length,
    predictionsCount: predictions.length,
    totalChartData: chartData.length,
    uniqueChartData: uniqueChartData.length,
    expectedTotal: 10,
    data: uniqueChartData.map(d => ({
      timestamp: new Date(d.timestamp).toLocaleTimeString(),
      value: 'value' in d ? d.value : undefined,
      predicted: 'predicted' in d ? d.predicted : undefined,
      type: d.type
    }))
  });
  
  // Ensure we have exactly 10 data points
  if (uniqueChartData.length !== 10) {
    console.warn(`⚠️ Expected 10 data points but got ${uniqueChartData.length}!`);
    console.warn('Historical data:', historicalData.length);
    console.warn('Predictions:', predictions.length);
  }

  // Calculate domain to show both historical and prediction data
  const allTimestamps = uniqueChartData.map(d => d.timestamp);
  const minTime = Math.min(...allTimestamps);
  const maxTime = Math.max(...allTimestamps);
  const timeRange = maxTime - minTime;
  const padding = timeRange * 0.05; // 5% padding on each side
  
  // Calculate Y-axis domain
  const allValues = uniqueChartData.map(d => {
    if ('value' in d) return d.value;
    if ('predicted' in d) return d.predicted;
    return 0;
  }).filter(v => !isNaN(v));
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const valueRange = maxValue - minValue;
  const valuePadding = Math.max(valueRange * 0.1, 1); // 10% padding or at least 1

  const formatXAxis = (timestamp: number) => {
    return format(new Date(timestamp), 'HH:mm');
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = uniqueChartData.find(d => d.timestamp === label);
      const isHistorical = dataPoint && 'originalTimestamp' in dataPoint;
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">
            {format(new Date(label), 'MMM d, HH:mm')}
            {isHistorical && (
              <span className="text-sm text-gray-500 ml-2">
                (Original: {format(new Date(dataPoint.originalTimestamp), 'HH:mm')})
              </span>
            )}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === 'value' ? 'Actual' : 'Predicted'}: {entry.value} {config.unit}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        {config.label} Trends
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={uniqueChartData} margin={{ left: 20, right: 20, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="timestamp"
            tickFormatter={formatXAxis}
            stroke="#6B7280"
            domain={[minTime - padding, maxTime + padding]}
            type="number"
            scale="time"
            tickCount={10}
            interval={0}
          />
          <YAxis 
            stroke="#6B7280"
            label={{ value: config.unit, angle: -90, position: 'insideLeft' }}
            domain={[Math.max(0, minValue - valuePadding), maxValue + valuePadding]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          <Line
            type="monotone"
            dataKey="value"
            stroke={config.color}
            strokeWidth={3}
            dot={{ fill: config.color, strokeWidth: 2, r: 5 }}
            name="Actual"
            connectNulls={false}
          />
          
          {config.predictedKey && (
            <Line
              type="monotone"
              dataKey="predicted"
              stroke={config.color}
              strokeWidth={3}
              strokeDasharray="8 4"
              dot={{ fill: config.color, strokeWidth: 2, r: 4 }}
              name="Predicted"
              connectNulls={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}