import api from './api';

class WeatherService {
  // Get current weather for a city
  async getCurrentWeather(city = 'Mumbai') {
    try {
      const response = await api.get(`/api/weather/current/${city}`);
      return response.data;
    } catch (error) {
      console.error('Weather service error:', error);
      throw error;
    }
  }

  // Get 5-day forecast
  async getForecast(city = 'Mumbai') {
    try {
      const response = await api.get(`/api/weather/forecast/${city}`);
      return response.data;
    } catch (error) {
      console.error('Forecast service error:', error);
      throw error;
    }
  }

  // Get weather for multiple cities
  async getMultipleCitiesWeather(cities = ['Mumbai', 'Delhi', 'Bangalore']) {
    try {
      const promises = cities.map(city => this.getCurrentWeather(city));
      const results = await Promise.allSettled(promises);
      
      return results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);
    } catch (error) {
      console.error('Multiple cities weather error:', error);
      return [];
    }
  }

  // Get weather icon based on condition
  getWeatherIconClass(condition) {
    const icons = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️',
      'Haze': '🌫️'
    };
    return icons[condition] || '☀️';
  }

  // Get weather advice based on condition
  getWeatherAdvice(weather) {
    if (!weather) return '';
    
    const temp = weather.main.temp;
    const condition = weather.weather[0].main;
    
    if (temp > 35) {
      return "🌡️ High temperature - Ensure adequate irrigation for crops";
    } else if (temp < 10) {
      return "❄️ Cold weather - Protect sensitive crops";
    } else if (condition === 'Rain') {
      return "☔ Rain expected - Postpone pesticide spraying";
    } else if (condition === 'Clear') {
      return "☀️ Good day for harvesting and field work";
    } else if (condition === 'Clouds') {
      return "☁️ Ideal for transplanting seedlings";
    }
    
    return "🌱 Normal weather conditions for farming";
  }
}

export default new WeatherService();