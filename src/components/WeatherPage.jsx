import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, Cloud, CloudRain, Wind, Droplets, 
  MapPin, Calendar, ChevronLeft, RefreshCw,
  Sunrise, Sunset, Eye, Thermometer, Gauge
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Mumbai');
  const [searchCity, setSearchCity] = useState('');

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata',
    'Pune', 'Ahmedabad', 'Hyderabad', 'Lucknow', 'Nagpur'
  ];

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const weatherRes = await api.get(`/api/weather/current/${city}`);
      setWeather(weatherRes.data);
      
      const forecastRes = await api.get(`/api/weather/forecast/${city}`);
      setForecast(forecastRes.data.list?.slice(0, 5) || []);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Failed to fetch weather data');
      // Set mock data for demo
      setWeather({
        name: city,
        main: { 
          temp: 25, 
          feels_like: 26, 
          humidity: 60, 
          pressure: 1009,
          temp_min: 23,
          temp_max: 27
        },
        weather: [{ main: 'Clear', description: 'clear sky' }],
        wind: { speed: 3.43 },
        visibility: 10000,
        sys: { 
          country: 'IN',
          sunrise: 1772155785,
          sunset: 1772198004
        }
      });
      setForecast([
        { dt: Date.now()/1000 + 86400, main: { temp: 26 }, weather: [{ main: 'Clear' }] },
        { dt: Date.now()/1000 + 172800, main: { temp: 25 }, weather: [{ main: 'Clouds' }] },
        { dt: Date.now()/1000 + 259200, main: { temp: 24 }, weather: [{ main: 'Clear' }] },
        { dt: Date.now()/1000 + 345600, main: { temp: 26 }, weather: [{ main: 'Clear' }] },
        { dt: Date.now()/1000 + 432000, main: { temp: 27 }, weather: [{ main: 'Clear' }] }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      setCity(searchCity.trim());
      setSearchCity('');
    }
  };

  const getWeatherIcon = (condition, size = "w-12 h-12") => {
    const main = condition?.toLowerCase() || '';
    if (main.includes('clear')) return <Sun className={`${size} text-yellow-500`} />;
    if (main.includes('cloud')) return <Cloud className={`${size} text-gray-500`} />;
    if (main.includes('rain')) return <CloudRain className={`${size} text-blue-500`} />;
    return <Sun className={`${size} text-yellow-500`} />;
  };

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/app/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeft size={20} />
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">Weather Forecast</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar size={16} />
              <span>{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and City Selection */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Search for a city..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
            <button
              onClick={fetchWeatherData}
              className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={20} />
            </button>
          </form>

          {/* Popular Cities */}
          <div className="flex flex-wrap gap-2">
            {cities.map(c => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  city === c
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Current Weather */}
        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <MapPin className="w-6 h-6 mr-2" />
                <h2 className="text-3xl font-bold">{weather.name}, {weather.sys?.country}</h2>
              </div>
              {getWeatherIcon(weather.weather[0].main, "w-16 h-16")}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Temperature */}
              <div>
                <div className="text-7xl font-bold mb-2">
                  {Math.round(weather.main.temp)}°C
                </div>
                <p className="text-xl opacity-90 mb-4">
                  Feels like {Math.round(weather.main.feels_like)}°C
                </p>
                <p className="text-lg capitalize">{weather.weather[0].description}</p>
              </div>

              {/* Right Column - Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <Droplets className="w-6 h-6 mb-2 text-blue-200" />
                  <div className="text-sm opacity-75">Humidity</div>
                  <div className="text-2xl font-semibold">{weather.main.humidity}%</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <Wind className="w-6 h-6 mb-2 text-blue-200" />
                  <div className="text-sm opacity-75">Wind Speed</div>
                  <div className="text-2xl font-semibold">{weather.wind.speed} m/s</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <Eye className="w-6 h-6 mb-2 text-blue-200" />
                  <div className="text-sm opacity-75">Visibility</div>
                  <div className="text-2xl font-semibold">{(weather.visibility / 1000).toFixed(1)} km</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <Gauge className="w-6 h-6 mb-2 text-blue-200" />
                  <div className="text-sm opacity-75">Pressure</div>
                  <div className="text-2xl font-semibold">{weather.main.pressure} hPa</div>
                </div>
              </div>
            </div>

            {/* Min/Max Temp */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center">
                <Thermometer className="w-5 h-5 mr-2 text-blue-200" />
                <span className="opacity-75">Min Temperature:</span>
                <span className="ml-2 font-semibold">{Math.round(weather.main.temp_min)}°C</span>
              </div>
              <div className="flex items-center">
                <Thermometer className="w-5 h-5 mr-2 text-blue-200" />
                <span className="opacity-75">Max Temperature:</span>
                <span className="ml-2 font-semibold">{Math.round(weather.main.temp_max)}°C</span>
              </div>
            </div>

            {/* Sunrise/Sunset */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center">
                <Sunrise className="w-5 h-5 mr-2 text-yellow-300" />
                <span className="opacity-75">Sunrise:</span>
                <span className="ml-2 font-semibold">{formatTime(weather.sys.sunrise)}</span>
              </div>
              <div className="flex items-center">
                <Sunset className="w-5 h-5 mr-2 text-orange-300" />
                <span className="opacity-75">Sunset:</span>
                <span className="ml-2 font-semibold">{formatTime(weather.sys.sunset)}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* 5-Day Forecast */}
        {forecast.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">5-Day Forecast</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {forecast.map((day, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {getDayName(day.dt)}
                  </p>
                  <div className="flex justify-center mb-2">
                    {getWeatherIcon(day.weather[0].main, "w-8 h-8")}
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    {Math.round(day.main.temp)}°C
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {day.weather[0].main}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Farming Tips Based on Weather */}
        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-green-50 rounded-2xl p-6 border border-green-200"
          >
            <h3 className="text-lg font-semibold text-green-800 mb-4">🌱 Weather-Based Farming Tips</h3>
            <div className="prose text-green-700">
              {weather.main.temp > 35 ? (
                <p>🌡️ High temperature alert! Ensure adequate irrigation for your crops. Consider mulching to retain soil moisture.</p>
              ) : weather.main.temp < 15 ? (
                <p>❄️ Cold weather - protect sensitive crops with covers. Delay planting if soil temperature is too low.</p>
              ) : weather.weather[0].main === 'Rain' ? (
                <p>☔ Rain expected - good for crops! Postpone pesticide spraying and check drainage systems.</p>
              ) : weather.weather[0].main === 'Clear' ? (
                <p>☀️ Clear skies - perfect for harvesting and field preparation. Check soil moisture levels.</p>
              ) : weather.weather[0].main === 'Clouds' ? (
                <p>☁️ Partly cloudy - ideal for transplanting seedlings and applying fertilizers.</p>
              ) : (
                <p>🌱 Normal weather conditions - continue with regular farming activities.</p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;