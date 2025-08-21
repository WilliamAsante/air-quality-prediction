# Firebase Frontend Setup Guide

## 🔥 **Firebase Configuration**

Your frontend is now configured to connect to your Firebase database and fetch real sensor readings!

### **Current Configuration:**
- **Database URL**: `https://air-quality-8e6d8-default-rtdb.firebaseio.com`
- **Data Path**: `/sensorLogs` (your actual Firebase structure)
- **Readings**: Temperature, Humidity, PM2.5, AQI
- **Auth Secret**: `r5iQokvMXQNMTTDFC6XzcBin1VzWX7JsnvxsIsy6`

### **Environment Variables Setup:**

1. **Create `.env.local` file** in the Frontend folder:
```bash
cd Frontend
touch .env.local
```

2. **Add your Firebase credentials** to `.env.local`:
```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=air-quality-8e6d8.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://air-quality-8e6d8-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=air-quality-8e6d8
VITE_FIREBASE_STORAGE_BUCKET=air-quality-8e6d8.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### **How to Get Firebase Credentials:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `air-quality-8e6d8`
3. Go to **Project Settings** (gear icon)
4. Scroll down to **Your apps** section
5. Click **Add app** → **Web app**
6. Copy the configuration values

### **What the Frontend Now Does:**

✅ **Real-time Data**: Fetches live sensor readings from Firebase  
✅ **Auto-updates**: Refreshes every 15 seconds when new data arrives  
✅ **Fallback**: Uses mock data if Firebase is unavailable  
✅ **Error Handling**: Graceful error handling and logging  

### **Data Flow:**
```
Your Sensor → Firebase Database → Frontend Dashboard
     ↓              ↓                    ↓
  PM2.5: 25    Updates every 15s    Displays live
  AQI: 75      Real-time data       Updates automatically
  Temp: 28°C   Live readings        Shows current values
```

### **To Run the Frontend:**
```bash
cd Frontend
npm install
npm run dev
```

The dashboard will now show your actual sensor readings from Firebase!
