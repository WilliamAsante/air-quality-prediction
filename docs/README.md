# Air Quality Prediction System with Firebase Integration

This system automatically fetches PM2.5 sensor data from Firebase Realtime Database and runs hourly predictions using a machine learning model.

## Features

- 🔥 **Firebase Integration**: Automatically fetches latest PM2.5 readings from Firebase
- ⏰ **Hourly Scheduling**: Runs predictions every hour at the top of the hour
- 🤖 **ML Predictions**: 5-step PM2.5 and AQI forecasts using Random Forest
- 📊 **Data Logging**: Saves all prediction results to CSV files
- 🔄 **Real-time Updates**: Works with Firebase's 15-second update frequency

## Firebase Database Structure

The system expects your Firebase Realtime Database to have this structure:

```
readings
  -OY6GSJHOqE1CqGwxY5e
    aqi: 0
    category: "Good"
    humidity: 71
    pm25: 0
    temperature: 28.5
    timestamp: "2025-08-20 11:38:17"
```

**Your Firebase Configuration:**
- Host: `air-quality-8e6d8-default-rtdb.firebaseio.com`
- Path: `/readings`
- Authentication: Database secret configured

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Firebase Configuration

✅ **Already Configured!** Your Firebase credentials have been set up in the model:

- **Host**: `air-quality-8e6d8-default-rtdb.firebaseio.com`
- **Path**: `/readings`
- **Authentication**: Database secret configured

The system is ready to connect to your Firebase database and fetch PM2.5 readings automatically.

### 3. Run the System

```bash
python model.py
```

The system will:
- Connect to Firebase
- Start the hourly scheduler
- Run predictions every hour at the top of the hour
- Save results to `prediction_results.csv`

## How It Works

1. **Data Fetching**: Every hour, the system fetches the latest PM2.5 reading from Firebase
2. **Model Training**: Trains a Random Forest model on historical data
3. **Prediction**: Generates 5-step forecasts for PM2.5 and AQI
4. **Logging**: Saves results with timestamps for analysis

## Output Files

- `prediction_results.csv`: Contains all prediction results with timestamps
- Console output: Real-time status and prediction results

## Scheduling

- **Frequency**: Every hour at the top of the hour (1:00, 2:00, 3:00, etc.)
- **Firebase Updates**: Works with 15-second Firebase updates
- **Consistent Timing**: Predictions run regardless of Firebase update frequency

## Troubleshooting

### Firebase Connection Issues
- Verify your credentials file path is correct
- Check your Firebase project ID and database URL
- Ensure your service account has read permissions

### Missing Dependencies
```bash
pip install firebase-admin schedule pandas scikit-learn
```

### Permission Issues
- Ensure your Firebase service account has read access to the `sensorLogs` node
- Check file permissions for the credentials JSON file

## Security Notes

- Keep your Firebase credentials file secure and never commit it to version control
- Use environment variables for production deployments
- Regularly rotate your Firebase service account keys

## Support

For issues or questions, check:
1. Firebase Console for database connectivity
2. Console output for error messages
3. `prediction_results.csv` for successful predictions
