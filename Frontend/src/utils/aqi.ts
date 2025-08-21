import { AQICategory } from '../types';

export function calculateAQI(pm25: number): number {
  // EPA AQI calculation for PM2.5
  if (pm25 <= 12) return Math.round(((50 - 0) / (12 - 0)) * (pm25 - 0) + 0);
  if (pm25 <= 35.4) return Math.round(((100 - 51) / (35.4 - 12.1)) * (pm25 - 12.1) + 51);
  if (pm25 <= 55.4) return Math.round(((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5) + 101);
  if (pm25 <= 150.4) return Math.round(((200 - 151) / (150.4 - 55.5)) * (pm25 - 55.5) + 151);
  if (pm25 <= 250.4) return Math.round(((300 - 201) / (250.4 - 150.5)) * (pm25 - 150.5) + 201);
  return Math.round(((500 - 301) / (500 - 250.5)) * (pm25 - 250.5) + 301);
}

export function getAQICategory(aqi: number): AQICategory {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

export function getAQIColor(aqi: number): string {
  if (aqi <= 50) return '#10B981'; // green-500
  if (aqi <= 100) return '#F59E0B'; // amber-500
  if (aqi <= 150) return '#F97316'; // orange-500
  if (aqi <= 200) return '#EF4444'; // red-500
  if (aqi <= 300) return '#8B5CF6'; // violet-500
  return '#7C2D12'; // red-900
}

export function getAQIDescription(category: AQICategory): string {
  const descriptions = {
    'Good': 'Air quality is satisfactory, and air pollution poses little or no risk.',
    'Moderate': 'Air quality is acceptable for most people. However, sensitive people may experience minor respiratory symptoms.',
    'Unhealthy for Sensitive': 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
    'Unhealthy': 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.',
    'Very Unhealthy': 'Health alert: The risk of health effects is increased for everyone.',
    'Hazardous': 'Health warning of emergency conditions: everyone is more likely to be affected.'
  };
  return descriptions[category];
}