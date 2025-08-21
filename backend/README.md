# Air Quality Backend API

This backend server provides REST API endpoints to access your Firebase sensor data.

## 🚀 **Quick Start**

### **1. Install Dependencies:**
```bash
cd backend
npm install
```

### **2. Start the Server:**
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## 📊 **API Endpoints**

### **GET /api/current**
Get the latest sensor reading
```bash
curl http://localhost:3001/api/current
```

**Response:**
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

### **GET /api/history**
Get historical data grouped by date
```bash
curl http://localhost:3001/api/history?timeRange=daily
```

### **GET /api/readings**
Get all raw sensor readings
```bash
curl http://localhost:3001/api/readings
```

### **GET /api/status**
Get system status and connection info
```bash
curl http://localhost:3001/api/status
```

### **GET /health**
Health check endpoint
```bash
curl http://localhost:3001/health
```

## 🔧 **Configuration**

The server is configured to connect to your Firebase database:
- **Host**: `air-quality-8e6d8-default-rtdb.firebaseio.com`
- **Path**: `/sensorLogs`
- **Auth**: Your Firebase secret key

## 📡 **Data Flow**

```
Your ESP32 Sensor → Firebase Database → Backend API → Frontend Dashboard
     ↓                    ↓                    ↓              ↓
  PM2.5: 0         Updates every 15s    REST API        Real-time display
  Temperature: 28.5°C Real-time data    Endpoints       Auto-refresh
  Humidity: 71%     Live readings       JSON format     User interface
```

## 🛠️ **Development**

### **Environment Variables:**
You can set these environment variables:
- `PORT` - Server port (default: 3001)

### **Testing Endpoints:**
1. **Health Check**: `http://localhost:3001/health`
2. **Current Data**: `http://localhost:3001/api/current`
3. **System Status**: `http://localhost:3001/api/status`

## 🔍 **Troubleshooting**

### **Server Won't Start:**
- Check if port 3001 is available
- Verify Node.js is installed
- Check Firebase credentials

### **No Data Returned:**
- Verify Firebase connection
- Check if data exists in `/sensorLogs` path
- Review Firebase authentication

### **CORS Issues:**
- Server includes CORS middleware
- Frontend should connect to `http://localhost:3001`

## 📈 **Performance**

- **Polling**: Frontend polls every 30 seconds
- **Caching**: No caching implemented (real-time data)
- **Error Handling**: Graceful fallbacks and error responses
