import { AirQualityData, HistoricalData } from '../types';

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export class ApiService {
  // Get current sensor reading
  async getCurrentReading(): Promise<AirQualityData> {
    try {
      const response = await fetch(`${API_BASE_URL}/current`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching current reading:', error);
      throw error;
    }
  }

  // Get historical data
  async getHistoricalData(timeRange: 'daily' | 'weekly' | 'monthly' = 'daily'): Promise<HistoricalData[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/history?timeRange=${timeRange}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  }

  // Get all raw readings
  async getAllReadings(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/readings`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching all readings:', error);
      throw error;
    }
  }

  // Get system status
  async getStatus(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/status`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching status:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export const apiService = new ApiService();
