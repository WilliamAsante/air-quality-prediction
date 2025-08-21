import React from 'react';
import { clsx } from 'clsx';
import { getAQILevel } from '../utils/aqiCalculator';

interface AQIGaugeProps {
  value: number;
  className?: string;
}

export function AQIGauge({ value, className }: AQIGaugeProps) {
  const { level, color, description } = getAQILevel(value);
  const percentage = Math.min(100, (value / 300) * 100);
  const circumference = 2 * Math.PI * 90;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div 
      className={clsx('flex flex-col items-center', className)}
      role="img"
      aria-label={`Air Quality Index: ${value}, ${description}`}
    >
      <div className="relative">
        <svg width="200" height="200" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="#E5E7EB"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">
            {value}
          </span>
          <span className="text-sm text-gray-600 uppercase tracking-wide">
            AQI
          </span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <div 
          className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
          style={{ backgroundColor: color }}
        >
          {level.toUpperCase()}
        </div>
        <p className="text-sm text-gray-600 mt-2 max-w-xs">
          {description}
        </p>
      </div>
    </div>
  );
}