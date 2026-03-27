import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sprout, Calendar, IndianRupee, Leaf, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const EditCrop = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [formData, setFormData] = useState({
    cropName: '',
    season: '',
    income: '',
    createdDate: ''
  });

  useEffect(() => {
    fetchCrop();
  }, [id]);

  const fetchCrop = async () => {
    try {
      const response = await api.get(`/crop/all`);
      const crop = response.data.find(c => c.id === parseInt(id));
      if (crop) {
        setFormData({
          cropName: crop.cropName,
          season: crop.season,
          income: crop.income,
          createdDate: crop.createdDate
        });
      }
    } catch (error) {
      toast.error('Failed to fetch crop details');
      navigate('/app/crops');
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
      await api.put(`/crop/update/${id}`, {
        ...formData,
        income: parseFloat(formData.income)
      });
      toast.success('Crop updated successfully!');
      navigate('/app/crops');
    } catch (error) {
      toast.error('Failed to update crop');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button 
          onClick={() => navigate('/app/crops')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Edit Crop</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Crop Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <Sprout size={18} className="text-primary" />
                <span>Crop Name</span>
              </div>
            </label>
            <input
              type="text"
              name="cropName"
              value={formData.cropName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Season */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <Leaf size={18} className="text-primary" />
                <span>Season</span>
              </div>
            </label>
            <select
              name="season"
              value={formData.season}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="Rabi">Rabi (Winter)</option>
              <option value="Kharif">Kharif (Monsoon)</option>
              <option value="Summer">Summer</option>
              <option value="Annual">Annual</option>
            </select>
          </div>

          {/* Income */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <IndianRupee size={18} className="text-primary" />
                <span>Expected Income (₹)</span>
              </div>
            </label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              min="0"
              step="100"
              required
            />
          </div>

          {/* Created Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <Calendar size={18} className="text-primary" />
                <span>Planting Date</span>
              </div>
            </label>
            <input
              type="date"
              name="createdDate"
              value={formData.createdDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating Crop...' : 'Update Crop'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCrop;