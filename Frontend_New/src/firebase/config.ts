// Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBWrayH0WtJq4djwExtOCMFQGtpNG6f4wM",
  authDomain: "air-quality-8e6d8.firebaseapp.com",
  databaseURL: "https://air-quality-8e6d8-default-rtdb.firebaseio.com",
  projectId: "air-quality-8e6d8",
  storageBucket: "air-quality-8e6d8.firebasestorage.app",
  messagingSenderId: "716197245148",
  appId: "1:716197245148:web:ca507824c2d548fdff8419",
  measurementId: "G-KYDW6MZYKZ"
};

// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);