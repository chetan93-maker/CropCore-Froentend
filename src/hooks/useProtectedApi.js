import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const useProtectedApi = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const callApi = async (apiCall, errorMessage = 'Operation failed') => {
    setLoading(true);
    try {
      const response = await apiCall();
      return { success: true, data: response.data };
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        logout();
      } else {
        toast.error(error.response?.data || errorMessage);
      }
      return { success: false, error: error.response?.data || errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { loading, callApi };
};

export default useProtectedApi;