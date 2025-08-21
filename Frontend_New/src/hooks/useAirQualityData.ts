import { useState, useEffect, useCallback } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase/config';
import { AirQualityReading, AirQualityPrediction } from '../types/airQuality';
import { calculateAQIFromPM25 } from '../utils/aqiCalculator';
import { readLatestPredictions } from '../utils/predictionReader';

// Helper function to parse Firebase data
function parseFirebaseReading(firebaseData: any, id: string): AirQualityReading {
  return {
    id,
    timestamp: new Date(firebaseData.timestamp).getTime(),
    pm25: firebaseData.pm25 || 0,
    aqi: firebaseData.aqi || calculateAQIFromPM25(firebaseData.pm25 || 0),
    humidity: firebaseData.humidity || 0,
    temperature: firebaseData.temperature || 0,
    co2: 0, // CO2 not available in your Firebase structure
    location: 'Air Quality Station', // Using default value instead of process.env
    category: firebaseData.category || 'Unknown'
  };
}

function generatePredictions(currentReading: AirQualityReading): AirQualityPrediction[] {
  const predictions: AirQualityPrediction[] = [];
  const now = currentReading.timestamp; // Start from current reading time
  
  for (let i = 1; i <= 5; i++) {
    const futureTime = now + (i * 60 * 60 * 1000); // hourly predictions
    
    // Simple prediction based on current values (you can replace this with your ML model)
    const predictedPM25 = Math.max(0, currentReading.pm25);
    const predictedAQI = calculateAQIFromPM25(predictedPM25);
    
    predictions.push({
      timestamp: futureTime,
      predictedAQI,
      predictedPM25: Math.round(predictedPM25 * 10) / 10,
      confidence: Math.max(0.7, 0.95 - (i * 0.05)) // decreasing confidence over time
    });
  }
  
  return predictions;
}

export function useAirQualityData() {
  const [currentReading, setCurrentReading] = useState<AirQualityReading | null>(null);
  const [historicalData, setHistoricalData] = useState<AirQualityReading[]>([]);
  const [predictions, setPredictions] = useState<AirQualityPrediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounced update function to reduce state update frequency
  const debouncedUpdate = useCallback(async (data: any) => {
    if (data) {
      // Find the latest reading by timestamp
      let latestReading: AirQualityReading | null = null;
      let latestTimestamp = 0;
      
      Object.keys(data).forEach(key => {
        const reading = data[key];
        if (reading && reading.timestamp) {
          const timestamp = new Date(reading.timestamp).getTime();
          if (timestamp > latestTimestamp) {
            latestTimestamp = timestamp;
            latestReading = parseFirebaseReading(reading, key);
          }
        }
      });
      
      if (latestReading) {
        setCurrentReading(latestReading);
        
        // Try to get predictions from Python model, fallback to simple predictions
        try {
          const mlPredictions = await readLatestPredictions();
          console.log('ML Predictions received:', mlPredictions);
          if (mlPredictions.length > 0) {
            setPredictions(mlPredictions);
          } else {
            console.log('No ML predictions, using fallback');
            setPredictions(generatePredictions(latestReading));
          }
        } catch (error) {
          console.log('Error getting ML predictions, using fallback:', error);
          setPredictions(generatePredictions(latestReading));
        }
        
        // Create historical data from Firebase readings (limit to last 5)
        const historical: AirQualityReading[] = [];
        const sortedKeys = Object.keys(data)
          .filter(key => data[key] && data[key].timestamp)
          .sort((a, b) => new Date(data[a].timestamp).getTime() - new Date(data[b].timestamp).getTime()) // Chronological order
          .slice(-5); // Take the last 5 readings (most recent)
        
        sortedKeys.forEach(key => {
          const reading = data[key];
          historical.push(parseFirebaseReading(reading, key));
        });
        
        console.log('Historical timestamps:', historical.map(h => new Date(h.timestamp).toLocaleTimeString()));
        
        console.log('Historical data for chart:', {
          count: historical.length,
          data: historical.map(h => ({
            timestamp: new Date(h.timestamp).toLocaleTimeString(),
            aqi: h.aqi,
            pm25: h.pm25,
            temperature: h.temperature,
            humidity: h.humidity
          }))
        });
        
        // Log all Firebase data for debugging
        console.log('All Firebase data:', Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })));
        
        setHistoricalData(historical);
      }
    }
    
    setLoading(false);
    setError(null);
  }, []);

  useEffect(() => {
    // Set up Firebase listener for real-time data
    const sensorLogsRef = ref(database, 'sensorLogs');
    
    const unsubscribe = onValue(sensorLogsRef, (snapshot) => {
      try {
        const data = snapshot.val();
        debouncedUpdate(data).catch(err => {
          console.error('Error in debounced update:', err);
        });
      } catch (err) {
        console.error('Error processing Firebase data:', err);
        setError('Failed to load air quality data');
        setLoading(false);
      }
    }, (error) => {
      console.error('Firebase connection error:', error);
      console.error('Error details:', error.message);
      setError(`Failed to connect to data source: ${error.message}`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    currentReading,
    historicalData,
    predictions,
    loading,
    error
  };
}