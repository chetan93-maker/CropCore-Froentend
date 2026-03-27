import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Search, MapPin, 
  Calendar, ChevronLeft, RefreshCw, Filter,
  ArrowUpDown, Download, IndianRupee
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const MarketPage = () => {
  const [prices, setPrices] = useState([]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [summary, setSummary] = useState({
    highest: 0,
    lowest: 0,
    average: 0,
    totalMarkets: 0
  });
  const [trends, setTrends] = useState({ gainers: [], losers: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'commodity', direction: 'asc' });

  // Get unique commodities and states for filters
  const commodities = [...new Set(prices.map(p => p.commodity))].sort();
  const states = [...new Set(prices.map(p => p.state))].sort();

  useEffect(() => {
    fetchMarketData();
  }, []);

  useEffect(() => {
    filterAndSortPrices();
  }, [prices, searchTerm, selectedCommodity, selectedState, sortConfig]);

  const fetchMarketData = async () => {
    setLoading(true);
    try {
      const [pricesRes, summaryRes, trendsRes] = await Promise.all([
        api.get('/api/market/prices/all'),
        api.get('/api/market/summary'),
        api.get('/api/market/trends')
      ]);

      setPrices(pricesRes.data);
      setFilteredPrices(pricesRes.data);
      setSummary(summaryRes.data);
      setTrends(trendsRes.data);
    } catch (error) {
      console.error('Failed to fetch market data:', error);
      toast.error('Failed to load market data');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortPrices = () => {
    let filtered = [...prices];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.commodity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.market?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.state?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply commodity filter
    if (selectedCommodity) {
      filtered = filtered.filter(item => item.commodity === selectedCommodity);
    }

    // Apply state filter
    if (selectedState) {
      filtered = filtered.filter(item => item.state === selectedState);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'modal_price') {
        aVal = aVal || 0;
        bVal = bVal || 0;
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      aVal = String(aVal || '').toLowerCase();
      bVal = String(bVal || '').toLowerCase();
      
      if (sortConfig.direction === 'asc') {
        return aVal.localeCompare(bVal);
      } else {
        return bVal.localeCompare(aVal);
      }
    });

    setFilteredPrices(filtered);
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const exportToCSV = () => {
    const headers = ['Commodity', 'Market', 'District', 'State', 'Min Price', 'Max Price', 'Modal Price', 'Change', 'Date'];
    const csvRows = [];
    csvRows.push(headers.join(','));

    filteredPrices.forEach(item => {
      const row = [
        item.commodity || '',
        item.market || '',
        item.district || '',
        item.state || '',
        item.min_price || 0,
        item.max_price || 0,
        item.modal_price || 0,
        item.change || '',
        item.arrival_date || ''
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `market-prices-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('CSV exported successfully');
  };

  const formatPrice = (price) => {
    if (!price) return '₹0';
    return `₹${price.toLocaleString('en-IN')}`;
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
              <h1 className="text-2xl font-bold text-gray-800">Market Prices</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={fetchMarketData}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Refresh"
              >
                <RefreshCw size={20} className="text-gray-600" />
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Download size={16} className="mr-2" />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-500 mb-1">Highest Price</p>
            <p className="text-2xl font-bold text-green-600">{formatPrice(summary.highest)}</p>
            <p className="text-xs text-gray-400 mt-2">per quintal</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-500 mb-1">Lowest Price</p>
            <p className="text-2xl font-bold text-orange-600">{formatPrice(summary.lowest)}</p>
            <p className="text-xs text-gray-400 mt-2">per quintal</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-500 mb-1">Average Price</p>
            <p className="text-2xl font-bold text-blue-600">{formatPrice(summary.average)}</p>
            <p className="text-xs text-gray-400 mt-2">per quintal</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-500 mb-1">Markets Tracked</p>
            <p className="text-2xl font-bold text-purple-600">{summary.totalMarkets}</p>
            <p className="text-xs text-gray-400 mt-2">across India</p>
          </div>
        </div>

        {/* Trends Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Top Gainers */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Top Gainers
            </h3>
            <div className="space-y-3">
              {trends.gainers?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.commodity}</p>
                    <p className="text-xs text-gray-500">{item.market}, {item.state}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{formatPrice(item.modal_price)}</p>
                    <p className="text-xs text-green-500">{item.change}</p>
                  </div>
                </div>
              ))}
              {(!trends.gainers || trends.gainers.length === 0) && (
                <p className="text-gray-500 text-center py-4">No gainers data available</p>
              )}
            </div>
          </div>

          {/* Top Losers */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
              <TrendingDown className="w-5 h-5 mr-2" />
              Top Losers
            </h3>
            <div className="space-y-3">
              {trends.losers?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.commodity}</p>
                    <p className="text-xs text-gray-500">{item.market}, {item.state}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">{formatPrice(item.modal_price)}</p>
                    <p className="text-xs text-red-500">{item.change}</p>
                  </div>
                </div>
              ))}
              {(!trends.losers || trends.losers.length === 0) && (
                <p className="text-gray-500 text-center py-4">No losers data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search commodity, market..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">All Commodities</option>
              {commodities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">All States</option>
              {states.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCommodity('');
                setSelectedState('');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Price Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100" onClick={() => handleSort('commodity')}>
                    <div className="flex items-center">
                      Commodity
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100" onClick={() => handleSort('market')}>
                    <div className="flex items-center">
                      Market
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">District</th>
                  <th className="px-4 py-3 text-left">State</th>
                  <th className="px-4 py-3 text-right cursor-pointer hover:bg-gray-100" onClick={() => handleSort('modal_price')}>
                    <div className="flex items-center justify-end">
                      Price (₹/quintal)
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-right">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPrices.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{item.commodity}</td>
                    <td className="px-4 py-3">{item.market}</td>
                    <td className="px-4 py-3">{item.district}</td>
                    <td className="px-4 py-3">{item.state}</td>
                    <td className="px-4 py-3 text-right font-semibold text-green-600">
                      {formatPrice(item.modal_price)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-flex items-center ${
                        item.change?.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.change?.startsWith('+') ? (
                          <TrendingUp size={14} className="mr-1" />
                        ) : (
                          <TrendingDown size={14} className="mr-1" />
                        )}
                        {item.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-sm text-gray-500">
            Showing {filteredPrices.length} of {prices.length} records
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;