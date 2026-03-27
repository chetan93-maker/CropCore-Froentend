import { useState, useEffect } from 'react';
import { 
  Sprout, 
  IndianRupee, 
  TrendingUp, 
  Calendar,
  ArrowUp,
  ArrowDown,
  PieChart as PieChartIcon,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import api from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalCrops: 0,
    totalIncome: 0,
    totalExpenses: 0,
    totalProfit: 0,
    monthlyExpense: 0,
    monthlyIncome: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentCrops, setRecentCrops] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setError(null);
      
      // Fetch data with proper error handling for each request
      const [summaryRes, cropsRes, expensesRes] = await Promise.allSettled([
        api.get('/dashboard/summary'),
        api.get('/crop/all'),
        api.get('/expense/all')
      ]);

      // Handle summary data
      if (summaryRes.status === 'fulfilled' && summaryRes.value?.data) {
        setSummary(prev => ({
          ...prev,
          ...summaryRes.value.data
        }));
      } else {
        console.warn('Summary data not available, using defaults');
      }

      // Handle crops data
      if (cropsRes.status === 'fulfilled' && Array.isArray(cropsRes.value?.data)) {
        setRecentCrops(cropsRes.value.data.slice(0, 5));
      } else {
        setRecentCrops([]);
      }

      // Handle expenses data
      if (expensesRes.status === 'fulfilled' && Array.isArray(expensesRes.value?.data)) {
        const sortedExpenses = [...expensesRes.value.data]
          .sort((a, b) => new Date(b.expenseDate || 0) - new Date(a.expenseDate || 0))
          .slice(0, 5);
        setRecentExpenses(sortedExpenses);
      } else {
        setRecentExpenses([]);
      }

    } catch (error) {
      console.error('Dashboard fetch error:', error);
      setError('Failed to load dashboard data. Please refresh the page.');
      if (error.response?.status !== 401) {
        toast.error('Failed to fetch dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  // Safe number formatting with validation
  const formatIndianNumber = (num) => {
    if (num === undefined || num === null) return '0';
    try {
      const number = typeof num === 'string' ? parseFloat(num.replace(/,/g, '')) : num;
      if (isNaN(number)) return '0';
      return number.toLocaleString('en-IN');
    } catch (e) {
      return '0';
    }
  };

  const formatCurrency = (num) => {
    const formatted = formatIndianNumber(num);
    return `₹${formatted}`;
  };

  const formatProfitLoss = (num) => {
    try {
      const number = typeof num === 'string' ? parseFloat(num.replace(/,/g, '')) : num;
      if (isNaN(number)) return '₹0';
      const formatted = formatIndianNumber(Math.abs(number));
      return number >= 0 ? `₹${formatted}` : `-₹${formatted}`;
    } catch (e) {
      return '₹0';
    }
  };

  const getNumericValue = (val) => {
    try {
      if (val === undefined || val === null) return 0;
      if (typeof val === 'string') return parseFloat(val.replace(/,/g, '')) || 0;
      return val || 0;
    } catch (e) {
      return 0;
    }
  };

  // Safe numeric summary
  const numericSummary = {
    totalIncome: getNumericValue(summary.totalIncome),
    totalExpenses: getNumericValue(summary.totalExpenses),
    totalProfit: getNumericValue(summary.totalProfit),
    monthlyIncome: getNumericValue(summary.monthlyIncome),
    monthlyExpense: getNumericValue(summary.monthlyExpense)
  };

  const stats = [
    {
      title: 'Total Crops',
      value: formatIndianNumber(summary.totalCrops),
      icon: Sprout,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Income',
      value: formatCurrency(summary.totalIncome),
      icon: IndianRupee,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(summary.totalExpenses),
      icon: TrendingUp,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    {
      title: 'Net Profit',
      value: formatProfitLoss(summary.totalProfit),
      icon: Calendar,
      bgColor: numericSummary.totalProfit >= 0 ? 'bg-green-100' : 'bg-red-100',
      textColor: numericSummary.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'
    },
  ];

  // Safe monthly data with fallback
  const monthlyData = [
    { name: 'Jan', income: numericSummary.monthlyIncome || 0, expense: numericSummary.monthlyExpense || 0 },
    { name: 'Feb', income: 0, expense: 0 },
    { name: 'Mar', income: 0, expense: 0 },
    { name: 'Apr', income: 0, expense: 0 },
    { name: 'May', income: 0, expense: 0 },
    { name: 'Jun', income: 0, expense: 0 }
  ];

  // Safe pie data
  const pieData = [
    { 
      name: 'Income', 
      value: Math.abs(numericSummary.totalIncome || 0), 
      color: '#2E7D32',
      displayName: 'Income',
      displayValue: formatCurrency(numericSummary.totalIncome)
    },
    { 
      name: 'Expenses', 
      value: Math.abs(numericSummary.totalExpenses || 0), 
      color: '#FF8F00',
      displayName: 'Expenses',
      displayValue: formatCurrency(numericSummary.totalExpenses)
    }
  ];

  // Only add profit/loss if value exists
  if (Math.abs(numericSummary.totalProfit || 0) > 0) {
    pieData.push({
      name: numericSummary.totalProfit >= 0 ? 'Profit' : 'Loss', 
      value: Math.abs(numericSummary.totalProfit || 0), 
      color: numericSummary.totalProfit >= 0 ? '#0277BD' : '#C62828',
      displayName: numericSummary.totalProfit >= 0 ? 'Profit' : 'Loss',
      displayValue: formatProfitLoss(numericSummary.totalProfit),
      isNegative: numericSummary.totalProfit < 0
    });
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length && payload[0].payload) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
          <p className="font-semibold" style={{ color: data.color }}>{data.displayName}</p>
          <p className="text-gray-600">Amount: {data.displayValue}</p>
          {data.isNegative && <p className="text-xs text-red-500 mt-1">Loss</p>}
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (!percent || percent < 0.05) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-medium">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchDashboardData}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
          <Calendar size={16} className="text-green-600" />
          <span>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              {numericSummary.monthlyIncome > numericSummary.monthlyExpense ? (
                <ArrowUp className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500" />
              )}
              <span className="text-sm text-gray-600">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expense Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Monthly Overview
          </h2>
          <div className="h-80 w-full">
            {monthlyData.some(item => item.income > 0 || item.expense > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#666' }} />
                  <YAxis tick={{ fill: '#666' }} />
                  <Tooltip 
                    formatter={(value) => [`₹${value?.toLocaleString?.('en-IN') || '0'}`, '']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="income" fill="#2E7D32" name="Income" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" fill="#FF8F00" name="Expense" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No monthly data available
              </div>
            )}
          </div>
        </div>

        {/* Financial Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <PieChartIcon className="w-5 h-5 mr-2 text-green-600" />
            Financial Distribution
          </h2>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-green-50 p-3 rounded-lg text-center border border-green-100">
              <p className="text-xs text-gray-600">Income</p>
              <p className="text-lg font-bold text-green-600">{formatCurrency(numericSummary.totalIncome)}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg text-center border border-orange-100">
              <p className="text-xs text-gray-600">Expenses</p>
              <p className="text-lg font-bold text-orange-600">{formatCurrency(numericSummary.totalExpenses)}</p>
            </div>
            <div className={`${numericSummary.totalProfit >= 0 ? 'bg-blue-50 border-blue-100' : 'bg-red-50 border-red-100'} p-3 rounded-lg text-center border`}>
              <p className="text-xs text-gray-600">{numericSummary.totalProfit >= 0 ? 'Profit' : 'Loss'}</p>
              <p className={`text-lg font-bold ${numericSummary.totalProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {formatProfitLoss(numericSummary.totalProfit)}
              </p>
            </div>
          </div>

          {pieData.filter(item => item.value > 0).length > 0 ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData.filter(item => item.value > 0)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {pieData.filter(item => item.value > 0).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    wrapperStyle={{ paddingTop: '20px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No financial data available
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Crops */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Crops</h2>
            <Sprout className="text-green-600" size={24} />
          </div>
          <div className="space-y-3">
            {Array.isArray(recentCrops) && recentCrops.length > 0 ? (
              recentCrops.map((crop) => {
                const profit = getNumericValue(crop?.profit);
                return (
                  <div key={crop?.id || Math.random()} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-gray-800">{crop?.cropName || 'Unknown Crop'}</p>
                      <p className="text-sm text-gray-500">Season: {crop?.season || 'N/A'}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{formatCurrency(crop?.income)}</p>
                      <p className={`text-xs ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {profit >= 0 ? 'Profit: ' : 'Loss: '}{formatCurrency(Math.abs(profit))}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <Sprout className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No crops added yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Expenses</h2>
            <TrendingUp className="text-orange-500" size={24} />
          </div>
          <div className="space-y-3">
            {Array.isArray(recentExpenses) && recentExpenses.length > 0 ? (
              recentExpenses.map((expense) => (
                <div key={expense?.id || Math.random()} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">{expense?.type || 'Unknown Expense'}</p>
                    <p className="text-sm text-gray-500">Crop: {expense?.cropName || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-600">{formatCurrency(expense?.amount)}</p>
                    <p className="text-xs text-gray-500">{expense?.expenseDate || 'N/A'}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No expenses added yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Farming Wisdom Quote */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
        <p className="text-sm text-green-800 italic text-center">
          "The farmer is the only man in our economy who buys everything at retail, 
          sells everything at wholesale, and pays the freight both ways."
        </p>
        <p className="text-xs text-green-600 mt-2 text-center font-semibold">— Farming Wisdom</p>
      </div>
    </div>
  );
};

export default Dashboard;