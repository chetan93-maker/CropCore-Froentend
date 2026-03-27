import React, { useState, useEffect } from 'react';
import { 
  Sun, Cloud, CloudRain, Wind, Droplets, 
  MapPin, RefreshCw, CloudLightning, CloudSnow,
  CloudDrizzle, CloudFog, Thermometer
} from 'lucide-react';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const WeatherWidget = ({ location = 'Mumbai', compact = false }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchWeather();
    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [location]);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/weather/current/${location}`);
      setWeather(response.data);
      setError(null);
      
      // Also fetch forecast
      const forecastRes = await api.get(`/api/weather/forecast/${location}`);
      setForecast(forecastRes.data.list?.slice(0, 3) || []);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Could not load weather');
      // Set mock data for demo
      setWeather({
        name: location,
        main: { temp: 28, feels_like: 30, humidity: 75, pressure: 1012 },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        wind: { speed: 3.6 },
        sys: { country: 'IN' }
      });
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition, size = 'w-8 h-8') => {
    const main = condition?.toLowerCase() || '';
    const iconClass = `${size} transition-all duration-300`;
    
    if (main.includes('clear')) return <Sun className={`${iconClass} text-yellow-500`} />;
    if (main.includes('cloud')) return <Cloud className={`${iconClass} text-gray-500`} />;
    if (main.includes('rain')) return <CloudRain className={`${iconClass} text-blue-500`} />;
    if (main.includes('drizzle')) return <CloudDrizzle className={`${iconClass} text-blue-400`} />;
    if (main.includes('thunder')) return <CloudLightning className={`${iconClass} text-purple-500`} />;
    if (main.includes('snow')) return <CloudSnow className={`${iconClass} text-blue-200`} />;
    if (main.includes('fog') || main.includes('mist')) return <CloudFog className={`${iconClass} text-gray-400`} />;
    return <Sun className={`${iconClass} text-yellow-500`} />;
  };

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg"
      >
        <div className="flex items-center justify-center h-24">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        </div>
      </motion.div>
    );
  }

  if (error && !weather) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white shadow-lg"
      >
        <div className="text-center">
          <p className="text-sm opacity-90">{error}</p>
          <button 
            onClick={fetchWeather}
            className="mt-2 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
          >
            Retry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Header with Location and Refresh */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <MapPin size={14} className="mr-1" />
          <span className="text-sm font-medium">{weather?.name}, {weather?.sys?.country}</span>
        </div>
        <button 
          onClick={fetchWeather}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
          title="Refresh weather"
        >
          <RefreshCw size={14} className="transform hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>

      {/* Main Weather Info */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-baseline">
            <span className="text-4xl font-bold">
              {Math.round(weather?.main?.temp)}°
            </span>
            <span className="text-sm ml-1">C</span>
          </div>
          <div className="text-xs opacity-90 mt-1 flex items-center">
            <Thermometer size={12} className="mr-1" />
            Feels like {Math.round(weather?.main?.feels_like)}°
          </div>
        </div>
        <div className="text-right">
          {getWeatherIcon(weather?.weather[0]?.main, 'w-10 h-10')}
          <div className="text-xs mt-1 capitalize">
            {weather?.weather[0]?.description}
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
        <div className="flex items-center bg-white/10 rounded-lg p-2">
          <Droplets size={14} className="mr-1 text-blue-200" />
          <div>
            <span className="opacity-75">Humidity</span>
            <span className="ml-1 font-semibold">{weather?.main?.humidity}%</span>
          </div>
        </div>
        <div className="flex items-center bg-white/10 rounded-lg p-2">
          <Wind size={14} className="mr-1 text-blue-200" />
          <div>
            <span className="opacity-75">Wind</span>
            <span className="ml-1 font-semibold">{weather?.wind?.speed} m/s</span>
          </div>
        </div>
      </div>

      {/* Pressure and Visibility (Optional) */}
      {!compact && (
        <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
          <div className="flex items-center bg-white/10 rounded-lg p-2">
            <div className="w-full text-center">
              <span className="opacity-75">Pressure</span>
              <span className="ml-1 font-semibold">{weather?.main?.pressure} hPa</span>
            </div>
          </div>
          <div className="flex items-center bg-white/10 rounded-lg p-2">
            <div className="w-full text-center">
              <span className="opacity-75">Visibility</span>
              <span className="ml-1 font-semibold">{(weather?.visibility / 1000).toFixed(1)} km</span>
            </div>
          </div>
        </div>
      )}

      {/* 3-Day Forecast */}
      {forecast.length > 0 && !compact && (
        <div className="mt-4 pt-3 border-t border-white/20">
          <div className="text-xs font-semibold mb-2 opacity-90">3-Day Forecast</div>
          <div className="grid grid-cols-3 gap-2">
            {forecast.map((day, index) => (
              <div key={index} className="text-center bg-white/10 rounded-lg p-2">
                <div className="text-xs font-medium">{getDayName(day.dt)}</div>
                <div className="flex justify-center my-1">
                  {getWeatherIcon(day.weather[0].main, 'w-5 h-5')}
                </div>
                <div className="text-sm font-bold">{Math.round(day.main.temp)}°</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sunrise & Sunset */}
      {!compact && weather?.sys?.sunrise && weather?.sys?.sunset && (
        <div className="mt-3 pt-2 border-t border-white/20 flex justify-between text-xs">
          <div className="flex items-center">
            <Sun size={12} className="mr-1 text-yellow-300" />
            <span>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex items-center">
            <Sun size={12} className="mr-1 text-orange-300" />
            <span>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      )}

      {/* View Details Button */}
      {!compact && (
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full mt-3 text-xs bg-white/20 hover:bg-white/30 rounded-lg py-2 transition-colors"
        >
          {showDetails ? 'Hide Details' : 'More Details'}
        </button>
      )}

      {/* Detailed View */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-white/20 text-xs space-y-2"
          >
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="opacity-75">Min Temp:</span>
                <span className="ml-1 font-semibold">{Math.round(weather.main.temp_min)}°C</span>
              </div>
              <div>
                <span className="opacity-75">Max Temp:</span>
                <span className="ml-1 font-semibold">{Math.round(weather.main.temp_max)}°C</span>
              </div>
              <div>
                <span className="opacity-75">Sea Level:</span>
                <span className="ml-1 font-semibold">{weather.main.sea_level || weather.main.pressure} hPa</span>
              </div>
              <div>
                <span className="opacity-75">Ground Level:</span>
                <span className="ml-1 font-semibold">{weather.main.grnd_level || weather.main.pressure} hPa</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WeatherWidget;