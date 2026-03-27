import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  DollarSign,
  Calendar,
  Filter,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedMobileCard, setExpandedMobileCard] = useState(null);
  const [dateFilter, setDateFilter] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchExpenses();
  }, [dateFilter]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/expense/date?from=${dateFilter.from}&to=${dateFilter.to}`);
      setExpenses(response.data);
    } catch (error) {
      toast.error('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await api.delete(`/expense/delete/${id}`);
        toast.success('Expense deleted successfully');
        fetchExpenses();
      } catch (error) {
        toast.error('Failed to delete expense');
      }
    }
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.cropName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const toggleMobileCard = (id) => {
    setExpandedMobileCard(expandedMobileCard === id ? null : id);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateFilter({
      from: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      to: new Date().toISOString().split('T')[0]
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Expenses Management</h1>
        <Link 
          to="/app/expenses/add" 
          className="inline-flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
        >
          <Plus size={20} className="mr-2" />
          Add New Expense
        </Link>
      </div>

      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden w-full flex items-center justify-between bg-white p-4 rounded-xl shadow-md"
      >
        <span className="font-medium text-gray-700">Filters & Search</span>
        {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Filters Section - Responsive */}
      <div className={`${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            {/* Date From */}
            <div>
              <input
                type="date"
                value={dateFilter.from}
                onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            {/* Date To */}
            <div>
              <input
                type="date"
                value={dateFilter.to}
                onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <X size={18} className="mr-2" />
              Clear Filters
            </button>
          </div>

          {/* Total Summary */}
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="text-gray-600">Total Expenses for period:</span>
              <span className="text-2xl font-bold text-green-600">₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table View - Hidden on Mobile */}
      <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-lg font-medium">No expenses found</p>
                    <p className="text-sm mt-1">Try adjusting your filters or add a new expense</p>
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-orange-500 mr-2" />
                        <span className="font-medium">{expense.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-600">{expense.cropName || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-orange-600">₹{expense.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-gray-600">
                        <Calendar size={14} className="mr-1" />
                        {expense.expenseDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Link 
                          to={`/app/expenses/edit/${expense.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit expense"
                        >
                          <Edit size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(expense.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete expense"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View - Visible only on mobile */}
      <div className="lg:hidden space-y-4">
        {filteredExpenses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Expenses Found</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first expense</p>
            <Link 
              to="/app/expenses/add" 
              className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Add New Expense
            </Link>
          </div>
        ) : (
          filteredExpenses.map((expense) => (
            <div 
              key={expense.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Card Header - Always visible */}
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleMobileCard(expense.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{expense.type}</h3>
                      <p className="text-sm text-gray-500">{expense.cropName || 'No crop'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-orange-600">₹{expense.amount.toLocaleString()}</span>
                    {expandedMobileCard === expense.id ? (
                      <ChevronUp size={20} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Quick Info - Always visible */}
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <Calendar size={12} className="mr-1" />
                  {expense.expenseDate}
                </div>
              </div>

              {/* Expanded Details - Shown when card is expanded */}
              {expandedMobileCard === expense.id && (
                <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="font-semibold text-orange-600">₹{expense.amount.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="font-semibold text-gray-700">{expense.expenseDate}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg col-span-2">
                      <p className="text-xs text-gray-500">Crop</p>
                      <p className="font-semibold text-gray-700">{expense.cropName || 'Not assigned'}</p>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Link 
                      to={`/app/expenses/edit/${expense.id}`}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(expense.id)}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Summary Footer for Mobile */}
      {filteredExpenses.length > 0 && (
        <div className="lg:hidden bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Expenses:</span>
            <span className="text-xl font-bold text-green-600">₹{totalAmount.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''} found
          </p>
        </div>
      )}
    </div>
  );
};

export default Expenses;