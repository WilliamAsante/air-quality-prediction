import React from 'react';
import { format } from 'date-fns';
import { AirQualityReading } from '../types/airQuality';
import { getAQILevel } from '../utils/aqiCalculator';
import { clsx } from 'clsx';

interface DataTableProps {
  data: AirQualityReading[];
  className?: string;
}

export function DataTable({ data, className }: DataTableProps) {
  const recentData = data.slice(-10).reverse(); // Show last 10 readings

  return (
    <div className={clsx('overflow-x-auto', className)}>
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        Recent Readings
      </h3>
      
      <table 
        className="min-w-full bg-white border border-gray-200 rounded-lg"
        role="table"
        aria-label="Recent air quality readings"
      >
        <thead className="bg-gray-50">
          <tr>
            <th 
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Time
            </th>
            <th 
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              AQI
            </th>
            <th 
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              PM2.5
            </th>
            <th 
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Temp
            </th>
            <th 
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Humidity
            </th>
            <th 
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {recentData.map((reading, index) => {
            const { level, color } = getAQILevel(reading.aqi);
            return (
              <tr 
                key={reading.id} 
                className={clsx(
                  'hover:bg-gray-50 transition-colors duration-150',
                  index === 0 && 'bg-blue-50' // Highlight most recent
                )}
              >
                <td className="px-4 py-3 text-sm text-gray-900">
                  {format(new Date(reading.timestamp), 'HH:mm:ss')}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {reading.aqi}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {reading.pm25} μg/m³
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {reading.temperature}°C
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {reading.humidity}%
                </td>
                <td className="px-4 py-3 text-sm">
                  <span 
                    className="inline-block w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: color }}
                    aria-label={`Status: ${level}`}
                  />
                  <span className="capitalize">{level}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {recentData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
}