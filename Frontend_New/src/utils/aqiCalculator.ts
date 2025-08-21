export function getAQILevel(aqi: number): {
  level: 'good' | 'moderate' | 'unhealthy' | 'hazardous';
  color: string;
  description: string;
} {
  if (aqi <= 50) {
    return {
      level: 'good',
      color: '#10B981',
      description: 'Good - Air quality is satisfactory'
    };
  } else if (aqi <= 100) {
    return {
      level: 'moderate',
      color: '#F59E0B',
      description: 'Moderate - Acceptable for most people'
    };
  } else if (aqi <= 150) {
    return {
      level: 'unhealthy',
      color: '#EF4444',
      description: 'Unhealthy - May cause health issues'
    };
  } else {
    return {
      level: 'hazardous',
      color: '#7C2D12',
      description: 'Hazardous - Health emergency'
    };
  }
}

export function calculateAQIFromPM25(pm25: number): number {
  // EPA AQI calculation for PM2.5
  if (pm25 <= 12) return Math.round((50 / 12) * pm25);
  if (pm25 <= 35.4) return Math.round(((100 - 51) / (35.4 - 12.1)) * (pm25 - 12.1) + 51);
  if (pm25 <= 55.4) return Math.round(((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5) + 101);
  if (pm25 <= 150.4) return Math.round(((200 - 151) / (150.4 - 55.5)) * (pm25 - 55.5) + 151);
  return Math.min(300, Math.round(((300 - 201) / (250.4 - 150.5)) * (pm25 - 150.5) + 201));
}