// src/services/externalApi.js
// Demo data service - No real API keys needed!

// Simulate network delay (looks realistic in demo)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ==================== WEATHER DATA ====================

// Mock weather database for Indian cities
const weatherDatabase = {
  Mumbai: {
    name: 'Mumbai',
    main: { temp: 32, feels_like: 34, humidity: 65, pressure: 1012 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    wind: { speed: 12 },
    sys: { country: 'IN' }
  },
  Delhi: {
    name: 'Delhi',
    main: { temp: 28, feels_like: 27, humidity: 45, pressure: 1013 },
    weather: [{ main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
    wind: { speed: 8 },
    sys: { country: 'IN' }
  },
  Pune: {
    name: 'Pune',
    main: { temp: 26, feels_like: 25, humidity: 55, pressure: 1014 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    wind: { speed: 10 },
    sys: { country: 'IN' }
  },
  Lucknow: {
    name: 'Lucknow',
    main: { temp: 30, feels_like: 32, humidity: 50, pressure: 1011 },
    weather: [{ main: 'Haze', description: 'hazy sunshine', icon: '50d' }],
    wind: { speed: 6 },
    sys: { country: 'IN' }
  },
  Nagpur: {
    name: 'Nagpur',
    main: { temp: 34, feels_like: 36, humidity: 40, pressure: 1010 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    wind: { speed: 14 },
    sys: { country: 'IN' }
  },
  Ahmedabad: {
    name: 'Ahmedabad',
    main: { temp: 35, feels_like: 38, humidity: 35, pressure: 1009 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    wind: { speed: 16 },
    sys: { country: 'IN' }
  },
  Chennai: {
    name: 'Chennai',
    main: { temp: 33, feels_like: 36, humidity: 75, pressure: 1008 },
    weather: [{ main: 'Rain', description: 'light rain', icon: '10d' }],
    wind: { speed: 18 },
    sys: { country: 'IN' }
  },
  Bangalore: {
    name: 'Bangalore',
    main: { temp: 24, feels_like: 23, humidity: 70, pressure: 1015 },
    weather: [{ main: 'Clouds', description: 'partly cloudy', icon: '02d' }],
    wind: { speed: 8 },
    sys: { country: 'IN' }
  },
  Kolkata: {
    name: 'Kolkata',
    main: { temp: 29, feels_like: 31, humidity: 80, pressure: 1010 },
    weather: [{ main: 'Rain', description: 'light rain', icon: '10d' }],
    wind: { speed: 10 },
    sys: { country: 'IN' }
  },
  Hyderabad: {
    name: 'Hyderabad',
    main: { temp: 31, feels_like: 32, humidity: 55, pressure: 1011 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    wind: { speed: 12 },
    sys: { country: 'IN' }
  }
};

// Mock forecast data
const forecastDatabase = {
  Mumbai: [
    { dt: Date.now() + 86400000, main: { temp: 31 }, weather: [{ main: 'Clear' }] },
    { dt: Date.now() + 172800000, main: { temp: 30 }, weather: [{ main: 'Clouds' }] },
    { dt: Date.now() + 259200000, main: { temp: 29 }, weather: [{ main: 'Rain' }] },
    { dt: Date.now() + 345600000, main: { temp: 32 }, weather: [{ main: 'Clear' }] },
    { dt: Date.now() + 432000000, main: { temp: 33 }, weather: [{ main: 'Clear' }] }
  ],
  Delhi: [
    { dt: Date.now() + 86400000, main: { temp: 27 }, weather: [{ main: 'Clear' }] },
    { dt: Date.now() + 172800000, main: { temp: 26 }, weather: [{ main: 'Clouds' }] },
    { dt: Date.now() + 259200000, main: { temp: 28 }, weather: [{ main: 'Clear' }] },
    { dt: Date.now() + 345600000, main: { temp: 29 }, weather: [{ main: 'Haze' }] },
    { dt: Date.now() + 432000000, main: { temp: 27 }, weather: [{ main: 'Clouds' }] }
  ]
};

// Get weather for a city
export const getWeather = async (city = 'Mumbai') => {
  console.log(`🌤️ Fetching weather for ${city}...`);
  await delay(800); // Simulate network delay
  
  // Return weather data for the requested city, or Mumbai as default
  return weatherDatabase[city] || weatherDatabase.Mumbai;
};

// Get 5-day forecast
export const getForecast = async (city = 'Mumbai') => {
  console.log(`📅 Fetching forecast for ${city}...`);
  await delay(1000);
  
  // Return forecast for the city or generate default
  if (forecastDatabase[city]) {
    return { list: forecastDatabase[city] };
  }
  
  // Generate generic forecast for other cities
  return {
    list: [
      { dt: Date.now() + 86400000, main: { temp: 28 }, weather: [{ main: 'Clear' }] },
      { dt: Date.now() + 172800000, main: { temp: 29 }, weather: [{ main: 'Clouds' }] },
      { dt: Date.now() + 259200000, main: { temp: 27 }, weather: [{ main: 'Rain' }] },
      { dt: Date.now() + 345600000, main: { temp: 30 }, weather: [{ main: 'Clear' }] },
      { dt: Date.now() + 432000000, main: { temp: 31 }, weather: [{ main: 'Clear' }] }
    ]
  };
};

// ==================== MARKET PRICES DATA ====================

// Mock market prices database
const marketPricesDatabase = [
  { 
    id: 1, 
    crop: 'Wheat', 
    price: 2750, 
    unit: 'quintal', 
    change: '+5.2', 
    market: 'Azadpur Mandi', 
    state: 'Delhi',
    trend: 'up',
    volume: '2,500 tons'
  },
  { 
    id: 2, 
    crop: 'Rice', 
    price: 3200, 
    unit: 'quintal', 
    change: '+3.1', 
    market: 'Koyambedu', 
    state: 'Tamil Nadu',
    trend: 'up',
    volume: '3,200 tons'
  },
  { 
    id: 3, 
    crop: 'Cotton', 
    price: 8200, 
    unit: 'quintal', 
    change: '-2.3', 
    market: 'Guntur', 
    state: 'Andhra Pradesh',
    trend: 'down',
    volume: '1,800 tons'
  },
  { 
    id: 4, 
    crop: 'Sugarcane', 
    price: 350, 
    unit: 'quintal', 
    change: '+1.8', 
    market: 'Modinagar', 
    state: 'Uttar Pradesh',
    trend: 'up',
    volume: '5,000 tons'
  },
  { 
    id: 5, 
    crop: 'Maize', 
    price: 2100, 
    unit: 'quintal', 
    change: '+4.2', 
    market: 'Gultekdi', 
    state: 'Maharashtra',
    trend: 'up',
    volume: '2,100 tons'
  },
  { 
    id: 6, 
    crop: 'Potato', 
    price: 1850, 
    unit: 'quintal', 
    change: '-1.5', 
    market: 'Agra', 
    state: 'Uttar Pradesh',
    trend: 'down',
    volume: '3,500 tons'
  },
  { 
    id: 7, 
    crop: 'Onion', 
    price: 2450, 
    unit: 'quintal', 
    change: '+8.3', 
    market: 'Lasalgaon', 
    state: 'Maharashtra',
    trend: 'up',
    volume: '2,800 tons'
  },
  { 
    id: 8, 
    crop: 'Tomato', 
    price: 1650, 
    unit: 'quintal', 
    change: '-3.7', 
    market: 'Kolar', 
    state: 'Karnataka',
    trend: 'down',
    volume: '1,900 tons'
  },
  { 
    id: 9, 
    crop: 'Groundnut', 
    price: 5600, 
    unit: 'quintal', 
    change: '+2.1', 
    market: 'Rajkot', 
    state: 'Gujarat',
    trend: 'up',
    volume: '1,500 tons'
  },
  { 
    id: 10, 
    crop: 'Mustard', 
    price: 4850, 
    unit: 'quintal', 
    change: '-1.2', 
    market: 'Jaipur', 
    state: 'Rajasthan',
    trend: 'down',
    volume: '1,200 tons'
  },
  { 
    id: 11, 
    crop: 'Jowar', 
    price: 2350, 
    unit: 'quintal', 
    change: '+2.5', 
    market: 'Solapur', 
    state: 'Maharashtra',
    trend: 'up',
    volume: '1,100 tons'
  },
  { 
    id: 12, 
    crop: 'Bajra', 
    price: 1980, 
    unit: 'quintal', 
    change: '+1.8', 
    market: 'Jaipur', 
    state: 'Rajasthan',
    trend: 'up',
    volume: '1,300 tons'
  }
];

// Get all market prices
export const getMarketPrices = async () => {
  console.log('📊 Fetching market prices...');
  await delay(1200);
  return marketPricesDatabase;
};

// Get market prices by crop name
export const getMarketPricesByCrop = async (cropName) => {
  console.log(`🔍 Searching for crop: ${cropName}`);
  await delay(500);
  return marketPricesDatabase.filter(item => 
    item.crop.toLowerCase().includes(cropName.toLowerCase())
  );
};

// Get market prices by state
export const getMarketPricesByState = async (state) => {
  console.log(`📍 Filtering by state: ${state}`);
  await delay(500);
  return marketPricesDatabase.filter(item => 
    item.state.toLowerCase().includes(state.toLowerCase())
  );
};

// Get market statistics
export const getMarketStats = async () => {
  await delay(600);
  const prices = marketPricesDatabase;
  
  return {
    highestPrice: Math.max(...prices.map(p => p.price)),
    lowestPrice: Math.min(...prices.map(p => p.price)),
    averagePrice: Math.round(prices.reduce((sum, p) => sum + p.price, 0) / prices.length),
    totalMarkets: new Set(prices.map(p => p.market)).size,
    totalStates: new Set(prices.map(p => p.state)).size,
    topGainer: prices.reduce((max, p) => parseFloat(p.change) > parseFloat(max.change) ? p : max),
    topLoser: prices.reduce((min, p) => parseFloat(p.change) < parseFloat(min.change) ? p : min)
  };
};

export default {
  getWeather,
  getForecast,
  getMarketPrices,
  getMarketPricesByCrop,
  getMarketPricesByState,
  getMarketStats
};