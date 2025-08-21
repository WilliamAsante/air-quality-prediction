export interface AirQualityReading {
  id: string;
  timestamp: number;
  pm25: number;
  aqi: number;
  humidity: number;
  temperature: number;
  co2: number; // Not available in your Firebase structure, kept for compatibility
  location: string;
  category?: string; // Available in your Firebase structure
}

export interface AirQualityPrediction {
  timestamp: number;
  predictedAQI: number;
  predictedPM25: number;
  confidence: number;
}

export interface AlertLevel {
  level: 'good' | 'moderate' | 'unhealthy' | 'hazardous';
  color: string;
  description: string;
}