import React from 'react';
import { clsx } from 'clsx';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'good' | 'moderate' | 'unhealthy' | 'hazardous';
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  unit, 
  trend, 
  status = 'good', 
  icon, 
  className 
}: MetricCardProps) {
  const statusColors = {
    good: 'border-green-200 bg-green-50',
    moderate: 'border-yellow-200 bg-yellow-50',
    unhealthy: 'border-orange-200 bg-orange-50',
    hazardous: 'border-red-200 bg-red-50'
  };

  const textColors = {
    good: 'text-green-900',
    moderate: 'text-yellow-900',
    unhealthy: 'text-orange-900',
    hazardous: 'text-red-900'
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    stable: '→'
  };

  return (
    <div 
      className={clsx(
        'rounded-lg border-2 p-6 transition-all duration-300 hover:shadow-lg',
        statusColors[status],
        className
      )}
      role="region"
      aria-label={`${title} metric`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className={clsx('text-sm font-medium', textColors[status])}>
          {title}
        </h3>
        {icon && (
          <div className={clsx('text-lg', textColors[status])}>
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className={clsx('text-2xl font-bold', textColors[status])}>
          {value}
        </span>
        {unit && (
          <span className={clsx('text-sm', textColors[status])}>
            {unit}
          </span>
        )}
        {trend && (
          <span 
            className={clsx('text-sm ml-auto', textColors[status])}
            aria-label={`Trend: ${trend}`}
          >
            {trendIcons[trend]}
          </span>
        )}
      </div>
    </div>
  );
}