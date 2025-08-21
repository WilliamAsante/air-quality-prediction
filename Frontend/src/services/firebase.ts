import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, get } from 'firebase/database';
import { AirQualityData } from '../types';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export class FirebaseService {
  private listeners: Map<string, () => void> = new Map();

  // Subscribe to live sensor data from Firebase
  subscribeToLiveData(callback: (data: AirQualityData) => void): () => void {
    const dataRef = ref(database, 'sensorLogs'); // Your actual Firebase path
    
    console.log('Attempting to connect to Firebase at path:', 'sensorLogs');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Firebase data received:', data);
      console.log('Snapshot exists:', snapshot.exists());
      console.log('Snapshot key:', snapshot.key);
      
      if (data) {
        // Find the most recent reading
        const latestReading = this.getLatestReading(data);
        console.log('Latest reading:', latestReading);
        
        if (latestReading) {
          const airQualityData: AirQualityData = {
            id: latestReading.id || `sensor-${Date.now()}`,
            timestamp: this.parseTimestamp(latestReading.timestamp),
            pm25: latestReading.pm25 || 0,
            temperature: latestReading.temperature || 0,
            humidity: latestReading.humidity || 0,
            aqi: latestReading.aqi || this.calculateAQI(latestReading.pm25 || 0),
            location: {
              name: process.env.VITE_STATION_NAME || 'Air Quality Station',
              coordinates: { 
                lat: parseFloat(process.env.VITE_STATION_LAT || '0'), 
                lng: parseFloat(process.env.VITE_STATION_LNG || '0') 
              }
            },
            deviceId: process.env.VITE_DEVICE_ID || 'ESP32-001',
            batteryStatus: parseInt(process.env.VITE_BATTERY_STATUS || '85')
          };
          
          console.log('Processed air quality data:', airQualityData);
          callback(airQualityData);
        } else {
          console.log('No valid readings found, using mock data');
          this.generateMockData(callback);
        }
      } else {
        console.log('No data in Firebase, using mock data');
        this.generateMockData(callback);
      }
    }, (error) => {
      console.error('Error fetching live data:', error);
      // Fallback to mock data if Firebase fails
      this.generateMockData(callback);
    });

    this.listeners.set('liveData', unsubscribe);
    
    return () => {
      unsubscribe();
      this.listeners.delete('liveData');
    };
  }

  // Get the latest reading from Firebase data
  private getLatestReading(data: any): any {
    if (!data) return null;
    
    let latestReading: any = null;
    let latestTimestamp: number | null = null;
    
    // Iterate through all sensor logs to find the most recent
    Object.keys(data).forEach(key => {
      const reading = data[key];
      if (reading && reading.timestamp) {
        const timestamp = this.parseTimestamp(reading.timestamp);
        if (!latestTimestamp || timestamp > latestTimestamp) {
          latestTimestamp = timestamp;
          latestReading = { ...reading, id: key };
        }
      }
    });
    
    return latestReading;
  }

  // Parse timestamp string to number
  private parseTimestamp(timestampStr: string): number {
    try {
      return new Date(timestampStr).getTime();
    } catch (error) {
      console.error('Error parsing timestamp:', error);
      return Date.now();
    }
  }

  // Fallback data generator
  private generateMockData(callback: (data: AirQualityData) => void) {
    const mockData: AirQualityData = {
      id: `sensor-${Date.now()}`,
      timestamp: Date.now(),
      pm25: 0,
      temperature: 0,
      humidity: 0,
      aqi: 0,
      location: {
        name: process.env.VITE_STATION_NAME || 'Air Quality Station',
        coordinates: { 
          lat: parseFloat(process.env.VITE_STATION_LAT || '0'), 
          lng: parseFloat(process.env.VITE_STATION_LNG || '0') 
        }
      },
      deviceId: process.env.VITE_DEVICE_ID || 'ESP32-001',
      batteryStatus: parseInt(process.env.VITE_BATTERY_STATUS || '85')
    };
    
    mockData.aqi = this.calculateAQI(mockData.pm25);
    callback(mockData);
  }

  // Calculate AQI from PM2.5
  private calculateAQI(pm25: number): number {
    if (pm25 <= 12) return Math.round(((50 - 0) / (12 - 0)) * (pm25 - 0) + 0);
    if (pm25 <= 35.4) return Math.round(((100 - 51) / (35.4 - 12.1)) * (pm25 - 12.1) + 51);
    if (pm25 <= 55.4) return Math.round(((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5) + 101);
    if (pm25 <= 150.4) return Math.round(((200 - 151) / (150.4 - 55.5)) * (pm25 - 55.5) + 151);
    if (pm25 <= 250.4) return Math.round(((300 - 201) / (250.4 - 150.5)) * (pm25 - 150.5) + 201);
    return Math.round(((500 - 301) / (500 - 250.5)) * (pm25 - 250.5) + 301);
  }

  // Get historical data from Firebase
  async getHistoricalData(timeRange: 'daily' | 'weekly' | 'monthly') {
    try {
      const dataRef = ref(database, 'sensorLogs');
      const snapshot = await get(dataRef);
      const data = snapshot.val();
      
      if (data) {
        // Process historical data from Firebase
        return this.processHistoricalData(data, timeRange);
      }
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
    
    // Fallback to mock data
    return this.generateMockHistoricalData(timeRange);
  }

  // Process Firebase data into historical format
  private processHistoricalData(data: any, _timeRange: 'daily' | 'weekly' | 'monthly') {
    const readings = Object.values(data).map((reading: any) => ({
      timestamp: this.parseTimestamp(reading.timestamp),
      pm25: reading.pm25 || 0,
      aqi: reading.aqi || this.calculateAQI(reading.pm25 || 0)
    }));

    // Group by date and calculate averages
    const groupedData = new Map();
    
    readings.forEach(reading => {
      const date = new Date(reading.timestamp).toISOString().split('T')[0];
      if (!groupedData.has(date)) {
        groupedData.set(date, []);
      }
      groupedData.get(date).push(reading);
    });

    return Array.from(groupedData.entries()).map(([date, dayReadings]: [string, any]) => {
      const pm25Values = dayReadings.map((r: any) => r.pm25);
      const aqiValues = dayReadings.map((r: any) => r.aqi);
      
      return {
        date,
        avgPM25: pm25Values.reduce((a: number, b: number) => a + b, 0) / pm25Values.length,
        avgAQI: aqiValues.reduce((a: number, b: number) => a + b, 0) / aqiValues.length,
        maxAQI: Math.max(...aqiValues),
        minAQI: Math.min(...aqiValues)
      };
    });
  }

  // Generate historical data
  private generateMockHistoricalData(timeRange: 'daily' | 'weekly' | 'monthly') {
    const now = Date.now();
    const data = [];
    const days = timeRange === 'daily' ? 7 : timeRange === 'weekly' ? 4 : 12;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now - i * (timeRange === 'daily' ? 24 * 60 * 60 * 1000 : 
                                       timeRange === 'weekly' ? 7 * 24 * 60 * 60 * 1000 : 
                                       30 * 24 * 60 * 60 * 1000));
      data.push({
        date: date.toISOString().split('T')[0],
        avgPM25: 0,
        avgAQI: 0,
        maxAQI: 0,
        minAQI: 0
      });
    }
    
    return data;
  }

  // Get prediction data
  async getPredictionData() {
    try {
      // Connect to your Python model's prediction results here
      const now = Date.now();
      const data = [];
      
      for (let i = 0; i < 24; i++) {
        const timestamp = now + i * 60 * 60 * 1000;
        data.push({
          timestamp,
          actual: null,
          predicted: 0,
          confidence: 0
        });
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching prediction data:', error);
      return [];
    }
  }

  // Get SHAP data for model explainability
  async getShapData() {
    return [
      { feature: 'PM2.5', value: 0, contribution: 0 },
      { feature: 'Temperature', value: 0, contribution: 0 },
      { feature: 'Humidity', value: 0, contribution: 0 },
      { feature: 'Wind Speed', value: 0, contribution: 0 },
      { feature: 'Pressure', value: 0, contribution: 0 },
      { feature: 'Time of Day', value: 0, contribution: 0 }
    ];
  }

  // Cleanup all listeners
  cleanup() {
    this.listeners.forEach(unsubscribe => unsubscribe());
    this.listeners.clear();
  }

  // Test function to manually fetch and display Firebase data
  async testFirebaseConnection() {
    try {
      const dataRef = ref(database, 'sensorLogs');
      const snapshot = await get(dataRef);
      const data = snapshot.val();
      
      console.log('=== FIREBASE DATA TEST ===');
      console.log('Raw Firebase data:', data);
      
      if (data) {
        console.log('Number of readings:', Object.keys(data).length);
        console.log('All readings:', data);
        
        const latestReading = this.getLatestReading(data);
        console.log('Latest reading:', latestReading);
        
        if (latestReading) {
          console.log('Latest PM2.5:', latestReading.pm25);
          console.log('Latest Temperature:', latestReading.temperature);
          console.log('Latest Humidity:', latestReading.humidity);
          console.log('Latest AQI:', latestReading.aqi);
          console.log('Latest Timestamp:', latestReading.timestamp);
        }
      } else {
        console.log('No data found in Firebase');
      }
      console.log('=== END TEST ===');
    } catch (error) {
      console.error('Firebase test failed:', error);
    }
  }
}

export const firebaseService = new FirebaseService();