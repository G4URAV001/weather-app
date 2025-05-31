
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { clearError } from '../store/weatherSlice';
import WeatherSearch from './WeatherSearch';
import WeatherCard from './WeatherCard';
import SearchHistory from './SearchHistory';
import { toast } from 'sonner';

const WeatherApp = () => {
  const { currentWeather, loading, error } = useAppSelector((state) => state.weather);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Weather App
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Get real-time weather information for any city
            </p>
          </div>

          {/* Search */}
          <WeatherSearch />

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}

          {/* Weather Data */}
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center w-full max-w-4xl">
            {currentWeather && (
              <div className="flex-1 flex justify-center">
                <WeatherCard weatherData={currentWeather} />
              </div>
            )}
            
            <div className="flex-1 flex justify-center">
              <SearchHistory />
            </div>
          </div>

          {/* Welcome Message */}
          {!currentWeather && !loading && (
            <div className="text-center text-white/80 max-w-md">
              <p className="text-lg">
                Welcome to Weather App! Search for any city to get started and see the current weather conditions.
              </p>
              <p className="text-sm mt-4 opacity-75">
                Note: This uses real weather data from OpenWeatherMap API.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
