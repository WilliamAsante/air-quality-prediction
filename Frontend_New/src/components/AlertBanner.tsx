import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { getAQILevel } from '../utils/aqiCalculator';

interface AlertBannerProps {
  aqi: number;
  className?: string;
}

export function AlertBanner({ aqi, className }: AlertBannerProps) {
  const { level, color, description } = getAQILevel(aqi);
  
  const alertConfig = {
    good: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      title: 'Air Quality is Good',
      action: 'Perfect time for outdoor activities!'
    },
    moderate: {
      icon: AlertCircle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      title: 'Moderate Air Quality',
      action: 'Generally safe, but sensitive individuals should limit prolonged outdoor exposure.'
    },
    unhealthy: {
      icon: AlertTriangle,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-800',
      title: 'Unhealthy Air Quality',
      action: 'Everyone should limit outdoor activities and consider wearing masks.'
    },
    hazardous: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      title: 'Hazardous Air Quality',
      action: 'Avoid all outdoor activities. Stay indoors with air purifiers if available.'
    }
  };

  const config = alertConfig[level];
  const IconComponent = config.icon;

  return (
    <div 
      className={clsx(
        'rounded-lg border-l-4 p-4',
        config.bgColor,
        config.borderColor,
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start">
        <IconComponent 
          className={clsx('h-5 w-5 mt-0.5 mr-3', config.textColor)}
          aria-hidden="true"
        />
        <div className="flex-1">
          <h3 className={clsx('text-sm font-medium', config.textColor)}>
            {config.title} (AQI: {aqi})
          </h3>
          <p className={clsx('text-sm mt-1', config.textColor)}>
            {config.action}
          </p>
          <p className={clsx('text-xs mt-2', config.textColor)}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}