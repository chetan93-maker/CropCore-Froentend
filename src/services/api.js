import axios from 'axios';

// Get API URL based on environment
const getApiUrl = () => {
  // Production (Netlify) - uses environment variable
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://crop-tracker-api.onrender.com';
  }
  // Development (localhost)
  return 'http://localhost:8080';
};

const API_URL = getApiUrl();

console.log(`API URL: ${API_URL} (${import.meta.env.PROD ? 'Production' : 'Development'})`);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 seconds for detailed responses
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      if (error.response.status === 401) {
        // Unauthorized - token expired or invalid
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Only redirect to login if not already there
        if (!window.location.pathname.includes('/login') && 
            !window.location.pathname.includes('/register')) {
          window.location.href = '/login';
        }
      } else if (error.response.status === 403) {
        // Forbidden
        console.error('Access forbidden:', error.response.data);
      } else if (error.response.status === 429) {
        // Rate limit - handled in component
        console.error('Rate limit exceeded:', error.response.data);
      }
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - server might be down');
    } else if (!error.response) {
      console.error('Network error - cannot reach server');
    }
    
    return Promise.reject(error);
  }
);

export default api;