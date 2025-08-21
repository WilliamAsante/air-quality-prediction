import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Configure CORS for production
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Serve prediction results from the Python model
app.get('/api/predictions', (req, res) => {
  try {
    // Read the prediction_results.csv file from the parent directory
               const csvPath = path.join(__dirname, '..', 'ml-model', 'prediction_results.csv');
    
    if (!fs.existsSync(csvPath)) {
      return res.json({ predictions: [], message: 'No prediction data available' });
    }
    
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const lines = csvContent.trim().split('\n');
    
    if (lines.length < 2) {
      return res.json({ predictions: [], message: 'No prediction data available' });
    }
    
    // Get the last row (most recent prediction)
    const lastLine = lines[lines.length - 1];
    const values = lastLine.split(',');
    
    console.log('Raw CSV values:', values);
    
    // Parse the forecast arrays - handle multi-column arrays
    let pm25ForecastStr = '';
    let aqiForecastStr = '';
    
    // Reconstruct PM2.5 array from multiple columns
    let pm25Parts = [];
    for (let i = 2; i < values.length; i++) {
      if (values[i].includes('np.float64')) {
        const cleanValue = values[i].replace('np.float64(', '').replace(')', '').trim();
        if (cleanValue) {
          pm25Parts.push(cleanValue);
        }
      }
    }
    pm25ForecastStr = pm25Parts.join(', ');
    
    // Reconstruct AQI array from multiple columns
    let aqiParts = [];
    for (let i = 2; i < values.length; i++) {
      if (values[i].includes('"') && values[i].includes('[')) {
        // Start of AQI array
        const cleanValue = values[i].replace('"[', '').trim();
        if (cleanValue) {
          aqiParts.push(cleanValue);
        }
      } else if (values[i].includes('"') && values[i].includes(']')) {
        // End of AQI array
        const cleanValue = values[i].replace(']"', '').trim();
        if (cleanValue) {
          aqiParts.push(cleanValue);
        }
      } else if (values[i].trim().match(/^\d+$/)) {
        // Middle AQI values
        aqiParts.push(values[i].trim());
      }
    }
    aqiForecastStr = aqiParts.join(', ');
    
    console.log('PM25 forecast string:', pm25ForecastStr);
    console.log('AQI forecast string:', aqiForecastStr);
    
    const pm25Forecast = pm25ForecastStr.split(', ').map(val => 
      parseFloat(val.replace('np.float64(', '').replace(')', ''))
    ).filter(val => !isNaN(val));
    
    const aqiForecast = aqiForecastStr.replace(/"/g, '').replace(/\[|\]/g, '').split(',').map(val => 
      parseInt(val.trim())
    ).filter(val => !isNaN(val));
    
    console.log('Parsed PM25 forecast:', pm25Forecast);
    console.log('Parsed AQI forecast:', aqiForecast);
    
    // Create prediction objects for the next 5 hours
    let timestamp;
    try {
      // Fix: The timestamp is already combined in values[0]
      timestamp = new Date(values[0]).getTime();
      console.log('Parsed timestamp:', new Date(timestamp).toISOString());
    } catch (error) {
      console.error('Error parsing timestamp:', error);
      timestamp = Date.now(); // Use current time as fallback
    }
    const predictions = [];
    
    for (let i = 0; i < 5; i++) {
      const futureTime = timestamp + ((i + 1) * 60 * 60 * 1000); // Add hours
      const predictedAQI = aqiForecast[i] || 0;
      const predictedPM25 = pm25Forecast[i] || 0;
      
      predictions.push({
        timestamp: futureTime,
        predictedAQI: predictedAQI,
        predictedPM25: predictedPM25,
        confidence: Math.max(0.7, 0.95 - (i * 0.05))
      });
    }
    
    console.log('Generated predictions:', predictions);
    
    res.json({ predictions, timestamp: values[0] + ' ' + values[1] });
    
  } catch (error) {
    console.error('Error reading prediction data:', error);
    res.status(500).json({ error: 'Failed to read prediction data' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`Prediction API server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
