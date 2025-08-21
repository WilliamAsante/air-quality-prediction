#!/usr/bin/env python3
"""
Test script to verify Firebase connection and data fetching
"""

import requests
from datetime import datetime

# Firebase configuration
FIREBASE_HOST = "air-quality-8e6d8-default-rtdb.firebaseio.com"
FIREBASE_PATH = "/sensorLogs"
FIREBASE_AUTH = "r5iQokvMXQNMTTDFC6XzcBin1VzWX7JsnvxsIsy6"

# Firebase REST API URL
FIREBASE_URL = f"https://{FIREBASE_HOST}{FIREBASE_PATH}.json"

def test_firebase_connection():
    """Test Firebase connection and data fetching"""
    print("Testing Firebase Connection...")
    print("=" * 50)
    
    try:
        print(f"✅ Firebase configuration loaded")
        print(f"   Host: {FIREBASE_HOST}")
        print(f"   Path: {FIREBASE_PATH}")
        print(f"   URL: {FIREBASE_URL}")
        
        # Test connection using Firebase REST API
        params = {'auth': FIREBASE_AUTH}
        response = requests.get(FIREBASE_URL, params=params)
        
        if response.status_code == 200:
            print(f"✅ Successfully connected to Firebase!")
            
            readings = response.json()
            if readings:
                print(f"   Found {len(readings)} readings in database")
                
                # Find latest reading
                latest_reading = None
                latest_timestamp = None
                
                for reading_id, reading_data in readings.items():
                    if 'timestamp' in reading_data and 'pm25' in reading_data:
                        timestamp_str = reading_data['timestamp']
                        try:
                            timestamp = datetime.strptime(timestamp_str, "%Y-%m-%d %H:%M:%S")
                            if latest_timestamp is None or timestamp > latest_timestamp:
                                latest_timestamp = timestamp
                                latest_reading = reading_data
                        except ValueError:
                            continue
                
                if latest_reading:
                    print(f"✅ Latest reading found:")
                    print(f"   PM2.5: {latest_reading.get('pm25', 'N/A')}")
                    print(f"   AQI: {latest_reading.get('aqi', 'N/A')}")
                    print(f"   Temperature: {latest_reading.get('temperature', 'N/A')}°C")
                    print(f"   Humidity: {latest_reading.get('humidity', 'N/A')}%")
                    print(f"   Timestamp: {latest_reading.get('timestamp', 'N/A')}")
                    print(f"   Category: {latest_reading.get('category', 'N/A')}")
                    
                    return True
                else:
                    print("❌ No valid readings found with PM2.5 data")
                    return False
            else:
                print("❌ No readings found in database")
                return False
        else:
            print(f"❌ Firebase API request failed with status code: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Firebase connection failed: {e}")
        return False

if __name__ == "__main__":
    success = test_firebase_connection()
    
    print("\n" + "=" * 50)
    if success:
        print("🎉 Firebase test successful! Your system is ready to run.")
        print("Run 'python model.py' to start the prediction system.")
    else:
        print("❌ Firebase test failed. Please check your configuration.")
