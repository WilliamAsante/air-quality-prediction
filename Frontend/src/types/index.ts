export interface AirQualityData {
  id: string;
  timestamp: number;
  pm25: number;
  temperature: number;
  humidity: number;
  aqi: number;
  category?: string;
  location: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  deviceId: string;
  batteryStatus: number;
}

export interface PredictionData {
  timestamp: number;
  actual: number;
  predicted: number;
  confidence: number;
}

export interface ShapData {
  feature: string;
  value: number;
  contribution: number;
}

export interface AlertConfig {
  id: string;
  type: 'email' | 'push';
  threshold: number;
  enabled: boolean;
}

export interface HistoricalData {
  date: string;
  avgPM25: number;
  avgAQI: number;
  maxAQI: number;
  minAQI: number;
}

export type AQICategory = 'Good' | 'Moderate' | 'Unhealthy for Sensitive' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';

export type TimeRange = 'daily' | 'weekly' | 'monthly';