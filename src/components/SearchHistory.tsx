
import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchWeatherData, addToSearchHistory, clearSearchHistory } from '../store/weatherSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SearchHistory = () => {
  const dispatch = useAppDispatch();
  const { searchHistory, loading } = useAppSelector((state) => state.weather);

  const handleHistoryClick = async (city: string) => {
    console.log(`Loading weather from history: ${city}`);
    dispatch(addToSearchHistory(city));
    await dispatch(fetchWeatherData(city));
  };

  const handleClearHistory = () => {
    dispatch(clearSearchHistory());
  };

  if (searchHistory.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Recent Searches
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearHistory}
            className="text-xs"
          >
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {searchHistory.slice(0, 5).map((city, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start text-left hover:bg-blue-50"
              onClick={() => handleHistoryClick(city)}
              disabled={loading}
            >
              {city}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchHistory;
