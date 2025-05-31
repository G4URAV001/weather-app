
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchWeatherData, addToSearchHistory } from '../store/weatherSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const WeatherSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.weather);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log(`Searching for weather in: ${searchQuery.trim()}`);
      dispatch(addToSearchHistory(searchQuery.trim()));
      await dispatch(fetchWeatherData(searchQuery.trim()));
      setSearchQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Enter city name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white/90 backdrop-blur-sm border-white/20 focus:border-blue-300"
          disabled={loading}
        />
      </div>
      <Button 
        type="submit" 
        disabled={loading || !searchQuery.trim()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6"
      >
        {loading ? 'Searching...' : 'Search'}
      </Button>
    </form>
  );
};

export default WeatherSearch;
