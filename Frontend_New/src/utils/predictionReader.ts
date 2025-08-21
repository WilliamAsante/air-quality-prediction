import { AirQualityPrediction } from '../types/airQuality';

// Function to read the latest prediction results from the Python model via API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

export async function readLatestPredictions(): Promise<AirQualityPrediction[]> {
  try {
    // Fetch predictions from the API
    const response = await fetch(`${API_BASE_URL}/api/predictions`);
    const data = await response.json();
    
    if (data.predictions && data.predictions.length > 0) {
      console.log('✅ Using ML model predictions:', {
        count: data.predictions.length,
        predictions: data.predictions.map(p => ({
          timestamp: new Date(p.timestamp).toLocaleTimeString(),
          predictedAQI: p.predictedAQI,
          predictedPM25: p.predictedPM25
        }))
      });
      return data.predictions;
    } else {
      console.log('⚠️ No ML predictions available, using fallback');
      return [];
    }
  } catch (error) {
    console.error('Error fetching ML predictions:', error);
    return [];
  }
}
