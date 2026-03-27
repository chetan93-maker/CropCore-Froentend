import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// 🔥 SAFE ERROR EXTRACTOR (NEW)
const getErrorMessage = (error, fallback) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    (typeof error?.response?.data === 'string'
      ? error.response.data
      : null) ||
    error?.message ||
    fallback
  );
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);
const login = async (email, password) => {
  try {
    const response = await api.post('/farmers/login', { email, password });

    if (response.data.token) {
      const userData = {
        id: response.data.farmerId || response.data.id,
        name: response.data.farmerName || response.data.name,
        email: response.data.email,
        mobile: response.data.mobile,
      };

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(userData));

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.token}`;

      setUser(userData);

      toast.success(`Welcome back, ${userData.name}! 🌾`);
      navigate('/app/dashboard');
      return true;
    } else {
      toast.error('Invalid response from server');
      return false;
    }
  } catch (error) {
    console.error('Login error:', error);

    const errorMessage = getErrorMessage(
      error,
      'Login failed. Please check your credentials.'
    );

    toast.error(errorMessage);
    return false;
  }
};

  // ✅ REGISTER
  const register = async (userData) => {
  try {
    const response = await api.post('/farmers/register', userData);

    if (response.status === 200 || response.status === 201) {
      toast.success('Registration successful! Please login to continue.');
      navigate('/login');
      return true;
    } else {
      toast.error('Unexpected response from server');
      return false;
    }
  } catch (error) {
    console.error('Registration error:', error);

    const errorMessage = getErrorMessage(error, 'Registration failed');

    toast.error(errorMessage);

    if (error.response?.status === 409) {
      toast.error('Email or mobile number already registered');
    }

    return false;
  }
};
  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('token');
  };

  const refreshSession = () => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};