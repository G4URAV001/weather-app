
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface WeatherData {
  id: number;
  name: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  feelsLike: number;
}

export interface WeatherState {
  currentWeather: WeatherData | null;
  searchHistory: string[];
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  searchHistory: JSON.parse(localStorage.getItem('weatherSearchHistory') || '[]'),
  loading: false,
  error: null,
};

// OpenWeatherMap API key - this is a demo key, users should replace with their own
const API_KEY = '213950697a65c32c0be0f51335c60413';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city: string, { rejectWithValue }) => {
    try {
      console.log(`Fetching weather data for: ${city}`);
      
      // For demo purposes, return mock data since we don't have a real API key
      /*
      const mockWeatherData: WeatherData = {
        id: Math.random(),
        name: city,
        country: 'Demo',
        temperature: Math.floor(Math.random() * 30) + 5,
        description: ['sunny', 'cloudy', 'rainy', 'partly cloudy'][Math.floor(Math.random() * 4)],
        icon: '01d',
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        pressure: Math.floor(Math.random() * 50) + 1000,
        feelsLike: Math.floor(Math.random() * 30) + 3,
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return mockWeatherData;
      */
      // Real API call (uncomment when you have a valid API key):
      
      const response = await axios.get(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      const data = response.data;
      return {
        id: data.id,
        name: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        feelsLike: Math.round(data.main.feels_like),
      };
      
    } catch (error: any) {
      console.error('Weather API error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch weather data');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addToSearchHistory: (state, action: PayloadAction<string>) => {
      const city = action.payload;
      if (!state.searchHistory.includes(city)) {
        state.searchHistory.unshift(city);
        state.searchHistory = state.searchHistory.slice(0, 10); // Keep only last 10 searches
        localStorage.setItem('weatherSearchHistory', JSON.stringify(state.searchHistory));
      }
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
      localStorage.removeItem('weatherSearchHistory');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload;
        state.error = null;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addToSearchHistory, clearSearchHistory, clearError } = weatherSlice.actions;
export default weatherSlice.reducer;
