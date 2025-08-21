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
import { AirQualityReading } from '../types/airQuality';

interface ActualDataChartProps {
  historicalData: AirQualityReading[];
  metric: 'aqi' | 'pm25' | 'temperature' | 'humidity';
  className?: string;
}

export function ActualDataChart({ historicalData, metric, className }: ActualDataChartProps) {
  const metricConfig = {
    aqi: { 
      key: 'aqi', 
      label: 'Air Quality Index', 
      color: '#3B82F6',
      unit: 'AQI'
    },
    pm25: { 
      key: 'pm25', 
      label: 'PM2.5', 
      color: '#EF4444',
      unit: 'μg/m³'
    },
    temperature: { 
      key: 'temperature', 
      label: 'Temperature', 
      color: '#F59E0B',
      unit: '°C'
    },
    humidity: { 
      key: 'humidity', 
      label: 'Humidity', 
      color: '#10B981',
      unit: '%'
    }
  };

  const config = metricConfig[metric];
  
  // Prepare chart data for actual readings only
  const chartData = historicalData.map(reading => ({
    timestamp: reading.timestamp,
    value: reading[config.key as keyof AirQualityReading] as number
  })).sort((a, b) => a.timestamp - b.timestamp);

  const formatXAxis = (timestamp: number) => {
    return format(new Date(timestamp), 'HH:mm');
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">
            {format(new Date(label), 'MMM d, HH:mm')}
          </p>
          <p style={{ color: config.color }}>
            Actual: {payload[0].value} {config.unit}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        Actual {config.label} Data
      </h3>
      
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ left: 20, right: 20, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="timestamp"
            tickFormatter={formatXAxis}
            stroke="#6B7280"
            type="number"
            scale="time"
            tickCount={6}
          />
          <YAxis 
            stroke="#6B7280"
            label={{ value: config.unit, angle: -90, position: 'insideLeft' }}
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
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
