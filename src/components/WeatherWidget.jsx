// src/components/WeatherWidget.jsx
import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Wind, 
  Droplets,
  MapPin,
  RefreshCw,
  CloudSnow,
  CloudLightning,
  CloudDrizzle
} from 'lucide-react';
import { getWeather, getForecast } from '../services/externalApi';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Mumbai');
  const [error, setError] = useState(null);

  // List of major Indian farming cities
  const cities = [
    'Mumbai', 'Delhi', 'Pune', 'Lucknow', 'Nagpur', 
    'Ahmedabad', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'
  ];

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching weather for:', city);
      const [weatherData, forecastData] = await Promise.all([
        getWeather(city),
        getForecast(city)
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const main = condition?.toLowerCase() || '';
    if (main.includes('clear')) return <Sun className="w-8 h-8 text-yellow-500" />;
    if (main.includes('cloud')) return <Cloud className="w-8 h-8 text-gray-500" />;
    if (main.includes('rain')) return <CloudRain className="w-8 h-8 text-blue-500" />;
    if (main.includes('drizzle')) return <CloudDrizzle className="w-8 h-8 text-blue-400" />;
    if (main.includes('thunder')) return <CloudLightning className="w-8 h-8 text-purple-500" />;
    if (main.includes('snow')) return <CloudSnow className="w-8 h-8 text-blue-200" />;
    if (main.includes('haze')) return <Cloud className="w-8 h-8 text-gray-400" />;
    return <Sun className="w-8 h-8 text-yellow-500" />;
  };

  const getDayName = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center text-red-500">
          <p className="mb-2">{error}</p>
          <button 
            onClick={fetchWeatherData}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Sun className="w-5 h-5 text-yellow-500 mr-2" />
          Weather Forecast
        </h3>
        <div className="flex items-center space-x-2">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            {cities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            onClick={fetchWeatherData}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Current Weather */}
      {weather && (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-5 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm font-medium">{weather.name}, {weather.sys?.country}</span>
              </div>
              <div className="text-4xl font-bold mb-1">
                {Math.round(weather.main?.temp)}°C
              </div>
              <div className="text-sm opacity-90 mb-2">
                Feels like {Math.round(weather.main?.feels_like)}°C
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Wind size={14} className="mr-1" />
                  <span>{weather.wind?.speed} km/h</span>
                </div>
                <div className="flex items-center">
                  <Droplets size={14} className="mr-1" />
                  <span>{weather.main?.humidity}%</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2">
                {getWeatherIcon(weather.weather?.[0]?.main)}
              </div>
              <div className="text-sm capitalize font-medium">
                {weather.weather?.[0]?.description}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5-Day Forecast */}
      {forecast && forecast.list && (
        <div>
          <h4 className="text-sm font-semibold text-gray-600 mb-3">5-Day Forecast</h4>
          <div className="grid grid-cols-5 gap-2">
            {forecast.list.slice(0, 5).map((day, index) => (
              <div key={index} className="text-center p-2 rounded-lg hover:bg-gray-50">
                <p className="text-xs text-gray-500 mb-2 font-medium">
                  {getDayName(day.dt)}
                </p>
                <div className="flex justify-center mb-2">
                  {getWeatherIcon(day.weather?.[0]?.main)}
                </div>
                <p className="text-sm font-semibold">
                  {Math.round(day.main?.temp)}°
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Farming Tip based on weather */}
      {weather && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">🌱 Farming Tip</h4>
          <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
            {weather.main?.temp > 35 ? (
              "🌡️ High temperature today - Ensure adequate irrigation for your crops. Consider mulching to retain soil moisture."
            ) : weather.weather?.[0]?.main === 'Rain' ? (
              "☔ Rain expected - Good for crops! Postpone any pesticide spraying and check drainage systems."
            ) : weather.weather?.[0]?.main === 'Clouds' ? (
              "☁️ Partly cloudy - Ideal for transplanting seedlings and applying fertilizers."
            ) : weather.weather?.[0]?.main === 'Haze' ? (
              "🌫️ Hazy conditions - Limit outdoor work. Good day for planning and record keeping."
            ) : (
              "☀️ Clear skies - Perfect for harvesting and field preparation. Check soil moisture levels."
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;