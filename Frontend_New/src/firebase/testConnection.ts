import { ref, get } from 'firebase/database';
import { database } from './config';

export async function testFirebaseConnection() {
  try {
    console.log('Testing Firebase connection...');
    const testRef = ref(database, 'sensorLogs');
    const snapshot = await get(testRef);
    
    if (snapshot.exists()) {
      console.log('✅ Firebase connection successful!');
      console.log('Data found:', snapshot.val());
      return true;
    } else {
      console.log('⚠️ Firebase connected but no data found at sensorLogs path');
      return false;
    }
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return false;
  }
}
