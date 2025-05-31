
import React from 'react';
import { Cloud, CloudRain, CloudSnow, CloudDrizzle, CloudSun } from 'lucide-react';
import { WeatherData } from '../store/weatherSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('rain')) return <CloudRain className="h-16 w-16 text-blue-500" />;
    if (desc.includes('snow')) return <CloudSnow className="h-16 w-16 text-blue-200" />;
    if (desc.includes('drizzle')) return <CloudDrizzle className="h-16 w-16 text-blue-400" />;
    if (desc.includes('cloud')) return <Cloud className="h-16 w-16 text-gray-500" />;
    return <CloudSun className="h-16 w-16 text-yellow-500" />;
  };

  const formatDescription = (description: string) => {
    return description.charAt(0).toUpperCase() + description.slice(1);
  };

  return (
    <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800">
          {weatherData.name}, {weatherData.country}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="flex items-center justify-center">
          {getWeatherIcon(weatherData.description)}
        </div>
        
        <div>
          <div className="text-5xl font-bold text-gray-800 mb-2">
            {weatherData.temperature}°C
          </div>
          <div className="text-lg text-gray-600 capitalize">
            {formatDescription(weatherData.description)}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Feels like {weatherData.feelsLike}°C
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-sm text-gray-500">Humidity</div>
            <div className="text-lg font-semibold text-gray-800">{weatherData.humidity}%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Wind</div>
            <div className="text-lg font-semibold text-gray-800">{weatherData.windSpeed} m/s</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Pressure</div>
            <div className="text-lg font-semibold text-gray-800">{weatherData.pressure} hPa</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
