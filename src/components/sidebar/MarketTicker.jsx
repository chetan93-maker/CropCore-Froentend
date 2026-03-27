import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import api from '../../services/api';
import { motion } from 'framer-motion';

const MarketTicker = () => {
  const [prices, setPrices] = useState([]);
  const [summary, setSummary] = useState({ highest: 0, lowest: 0, average: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    setLoading(true);
    try {
      const [pricesRes, summaryRes] = await Promise.all([
        api.get('/api/market/prices'),
        api.get('/api/market/summary')
      ]);
      setPrices(pricesRes.data.slice(0, 5)); // Show top 5
      setSummary(summaryRes.data);
    } catch (error) {
      console.error('Market data error:', error);
      // Mock data for demo
      setPrices([
        { crop: 'Wheat', price: 2750, change: '+5.2' },
        { crop: 'Rice', price: 3200, change: '+3.1' },
        { crop: 'Cotton', price: 8200, change: '-2.3' },
        { crop: 'Sugarcane', price: 350, change: '+1.8' },
        { crop: 'Maize', price: 2100, change: '+4.2' }
      ]);
      setSummary({ highest: 8200, lowest: 350, average: 3111 });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-center h-20">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-4 shadow-md"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold flex items-center">
          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
          Market Rates
        </h3>
        <button 
          onClick={fetchMarketData}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <RefreshCw size={14} className="text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
        <div className="bg-green-50 p-2 rounded text-center">
          <span className="text-gray-500">Highest</span>
          <p className="font-bold text-green-600">₹{summary.highest}</p>
        </div>
        <div className="bg-orange-50 p-2 rounded text-center">
          <span className="text-gray-500">Lowest</span>
          <p className="font-bold text-orange-600">₹{summary.lowest}</p>
        </div>
        <div className="bg-blue-50 p-2 rounded text-center">
          <span className="text-gray-500">Avg</span>
          <p className="font-bold text-blue-600">₹{summary.average}</p>
        </div>
      </div>

      <div className="space-y-2">
        {prices.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="font-medium">{item.crop}</span>
            <div className="flex items-center">
              <span className="font-semibold mr-2">₹{item.price}</span>
              <span className={`text-xs flex items-center ${
                item.change?.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.change?.startsWith('+') ? (
                  <TrendingUp size={12} className="mr-1" />
                ) : (
                  <TrendingDown size={12} className="mr-1" />
                )}
                {item.change}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => window.location.href = '/app/market-prices'}
        className="w-full mt-3 text-xs text-green-600 hover:text-green-700 font-medium text-center"
      >
        View All Prices →
      </button>
    </motion.div>
  );
};

export default MarketTicker;