import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DollarSign, Calendar, Leaf, ArrowLeft, Save } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const EditExpense = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [crops, setCrops] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    expenseDate: '',
    cropId: ''
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      // Fetch crops first
      const cropsRes = await api.get('/crop/all');
      setCrops(cropsRes.data);
      
      // Then fetch the specific expense
      const expenseRes = await api.get(`/expense/all`);
      const expense = expenseRes.data.find(e => e.id === parseInt(id));
      
      if (expense) {
        setFormData({
          type: expense.type,
          amount: expense.amount,
          expenseDate: expense.expenseDate,
          cropId: expense.cropId
        });
      } else {
        toast.error('Expense not found');
        navigate('/app/expenses');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch expense details');
      navigate('/app/expenses');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        type: formData.type,
        amount: parseFloat(formData.amount),
        expenseDate: formData.expenseDate,
        cropId: parseInt(formData.cropId)
      };
      
      console.log('Updating expense with payload:', payload);
      
      const response = await api.put(`/expense/update/${id}`, payload);
      
      if (response.data) {
        toast.success('Expense updated successfully!');
        navigate('/app/expenses');
      }
    } catch (error) {
      console.error('Update error:', error);
      const errorMessage = error.response?.data || 'Failed to update expense';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button 
          onClick={() => navigate('/app/expenses')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Edit Expense</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Expense Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <DollarSign size={18} className="text-green-600" />
                <span>Expense Type</span>
              </div>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              required
            >
              <option value="">Select Type</option>
              <option value="Seeds">Seeds</option>
              <option value="Fertilizer">Fertilizer</option>
              <option value="Pesticide">Pesticide</option>
              <option value="Labour">Labour</option>
              <option value="Equipment">Equipment</option>
              <option value="Transport">Transport</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Crop Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <Leaf size={18} className="text-green-600" />
                <span>Select Crop</span>
              </div>
            </label>
            <select
              name="cropId"
              value={formData.cropId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              required
            >
              <option value="">Select Crop</option>
              {crops.map(crop => (
                <option key={crop.id} value={crop.id}>
                  {crop.cropName} - {crop.season} (₹{crop.income})
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <DollarSign size={18} className="text-green-600" />
                <span>Amount (₹)</span>
              </div>
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="5000"
              min="0"
              step="100"
              required
            />
          </div>

          {/* Expense Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <Calendar size={18} className="text-green-600" />
                <span>Expense Date</span>
              </div>
            </label>
            <input
              type="date"
              name="expenseDate"
              value={formData.expenseDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate('/app/expenses')}
              className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save size={20} className="mr-2" />
                  Update Expense
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpense;