# 🚀 Complete Air Quality Monitoring System Setup

This guide will help you set up the complete system with API backend and frontend using a single data source.

## 📋 **System Architecture**

```
ESP32 Sensor → Firebase Database → Backend API → Frontend Dashboard
     ↓              ↓                ↓              ↓
  Live Data    Real-time DB    REST Endpoints   React UI
  PM2.5: 0     Updates 15s     JSON API        Auto-refresh
  Temp: 28.5°C Live readings   Error handling  Single data source
  Humidity: 71% Data storage   CORS enabled    Clean architecture
```

## 🛠️ **Setup Instructions**

### **1. Backend API Server**

#### **Install Dependencies:**
```bash
cd backend
npm install
```

#### **Start the Server:**
```bash
npm start
```

**Expected Output:**
```
🚀 Backend server running on port 3001
📊 Firebase: air-quality-8e6d8-default-rtdb.firebaseio.com/sensorLogs
🔗 API endpoints:
   GET /api/current - Latest sensor reading
   GET /api/history - Historical data
   GET /api/readings - All raw readings
   GET /api/status - System status
   GET /health - Health check
```

### **2. Frontend Dashboard**

#### **Install Dependencies:**
```bash
cd Frontend
npm install
```

#### **Start the Development Server:**
```bash
npm run dev
```

**Expected Output:**
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## 🔗 **API Endpoints**

### **Data Source (Backend API):**
- **Current Data**: `http://localhost:3001/api/current`
- **Historical Data**: `http://localhost:3001/api/history`
- **All Readings**: `http://localhost:3001/api/readings`
- **System Status**: `http://localhost:3001/api/status`

## 📊 **Data Flow**

### **Backend API**
- ✅ **Clean REST endpoints**
- ✅ **Error handling**
- ✅ **Data processing**
- ✅ **CORS support**
- ✅ **Single source of truth**

## 🧪 **Testing the System**

### **1. Test Backend API:**
```bash
# Health check
curl http://localhost:3001/health

# Current sensor data
curl http://localhost:3001/api/current

# System status
curl http://localhost:3001/api/status
```

### **2. Test Frontend:**
1. Open `http://localhost:5173/` in your browser
2. Check browser console for data flow logs
3. Click the Settings button to test API connection
4. Verify real-time updates every 30 seconds

### **3. Expected Data Structure:**
```json
{
  "id": "-OY6GSJHOqE1CqGwxY5e",
  "timestamp": 1734773897000,
  "pm25": 0,
  "temperature": 28.5,
  "humidity": 71,
  "aqi": 0,
  "category": "Good",
  "location": {
    "name": "Tarkwa Air Quality Station",
    "coordinates": { "lat": 5.3018, "lng": -1.9931 }
  },
  "deviceId": "ESP32-Tarkwa-001",
  "batteryStatus": 85
}
```

## 🔍 **Troubleshooting**

### **Backend Issues:**
- **Port 3001 in use**: Change `PORT` environment variable
- **Firebase connection failed**: Check credentials in `server.js`
- **CORS errors**: Backend includes CORS middleware

### **Frontend Issues:**
- **No data displayed**: Check browser console for errors
- **API connection failed**: Frontend will fallback to Firebase
- **Firebase connection failed**: Check Firebase configuration

### **Data Source Priority:**
1. **API Backend** (Primary)
2. **Firebase Direct** (Fallback)
3. **Mock Data** (Last resort)

## 📈 **Performance Features**

- **Polling**: Frontend refreshes every 30 seconds
- **Fallback**: Automatic switch between data sources
- **Error Handling**: Graceful degradation
- **Real-time**: Live data from your ESP32 sensor

## 🎯 **Success Indicators**

✅ **Backend running** on port 3001
✅ **Frontend running** on port 5173
✅ **Dashboard displays** real sensor data
✅ **Auto-refresh** every 30 seconds
✅ **Fallback working** if API fails
✅ **Console logs** show data flow

## 🔧 **Configuration Files**

- **Backend**: `backend/server.js` (Firebase credentials)
- **Frontend**: `Frontend/src/services/api.ts` (API endpoints)
- **Types**: `Frontend/src/types/index.ts` (TypeScript interfaces)

## 🚀 **Next Steps**

1. **Monitor the dashboard** for live data
2. **Check console logs** for debugging info
3. **Test fallback** by stopping the backend
4. **Customize UI** as needed
5. **Add more features** (alerts, predictions, etc.)

Your system is now ready to display real-time air quality data from your Firebase database! 🎉
