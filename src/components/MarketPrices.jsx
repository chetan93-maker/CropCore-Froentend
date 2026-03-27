// src/components/MarketPrices.jsx
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search,
  MapPin,
  Filter,
  ArrowUpDown,
  Download,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { getMarketPrices, getMarketStats } from '../services/externalApi';

const MarketPrices = () => {
  const [prices, setPrices] = useState([]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'crop', direction: 'asc' });

  // Get unique states for filter
  const [states, setStates] = useState(['all']);

  useEffect(() => {
    fetchMarketData();
  }, []);

  useEffect(() => {
    filterAndSortPrices();
  }, [prices, searchTerm, filterState, sortConfig]);

  const fetchMarketData = async () => {
    setLoading(true);
    try {
      const [pricesData, statsData] = await Promise.all([
        getMarketPrices(),
        getMarketStats()
      ]);
      setPrices(pricesData);
      setFilteredPrices(pricesData);
      setStats(statsData);
      
      // Extract unique states
      const uniqueStates = ['all', ...new Set(pricesData.map(p => p.state))];
      setStates(uniqueStates);
    } catch (error) {
      console.error('Failed to fetch market data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortPrices = () => {
    let filtered = [...prices];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.market.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply state filter
    if (filterState !== 'all') {
      filtered = filtered.filter(item => item.state === filterState);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (sortConfig.key === 'price' || sortConfig.key === 'change') {
        // Numeric sorting
        const aNum = parseFloat(aVal) || 0;
        const bNum = parseFloat(bVal) || 0;
        return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
      } else {
        // String sorting
        return sortConfig.direction === 'asc' 
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
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
    // Create CSV content
    const headers = ['Crop', 'Price (₹/quintal)', 'Change %', 'Market', 'State'];
    const csvRows = [];
    csvRows.push(headers.join(','));
    
    filteredPrices.forEach(item => {
      const row = [
        item.crop,
        item.price,
        item.change,
        item.market,
        item.state
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
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
          Market Prices
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={exportToCSV}
            className="flex items-center px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <Download size={16} className="mr-1" />
            Export CSV
          </button>
          <button
            onClick={fetchMarketData}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600">Highest</p>
            <p className="text-lg font-bold text-green-600">₹{stats.highestPrice}</p>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600">Lowest</p>
            <p className="text-lg font-bold text-orange-600">₹{stats.lowestPrice}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600">Average</p>
            <p className="text-lg font-bold text-blue-600">₹{stats.averagePrice}</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600">Markets</p>
            <p className="text-lg font-bold text-purple-600">{stats.totalMarkets}</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search crops or markets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <select
          value={filterState}
          onChange={(e) => setFilterState(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          {states.map(state => (
            <option key={state} value={state}>
              {state === 'all' ? 'All States' : state}
            </option>
          ))}
        </select>
      </div>

      {/* Price Table */}
      <div className="overflow-x-auto max-h-96 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {['Crop', 'Price', 'Change', 'Market', 'State'].map((header, idx) => (
                <th 
                  key={idx}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort(header.toLowerCase())}
                >
                  <div className="flex items-center">
                    {header}
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPrices.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium">{item.crop}</td>
                <td className="px-4 py-3 font-semibold text-green-600">
                  ₹{item.price.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center ${
                    parseFloat(item.change) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {parseFloat(item.change) >= 0 ? (
                      <TrendingUp size={16} className="mr-1" />
                    ) : (
                      <TrendingDown size={16} className="mr-1" />
                    )}
                    {item.change}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <MapPin size={14} className="text-gray-400 mr-1" />
                    {item.market}
                  </div>
                </td>
                <td className="px-4 py-3">{item.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredPrices.length}</span> of {prices.length} crops
          </p>
          {stats && (
            <p className="text-gray-600">
              Top Gainer: <span className="text-green-600 font-medium">{stats.topGainer.crop} (+{stats.topGainer.change}%)</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;