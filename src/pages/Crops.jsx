import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Sprout,
  Calendar
} from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const Crops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await api.get('/crop/all');
      setCrops(response.data);
    } catch (error) {
      toast.error('Failed to fetch crops');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this crop?')) {
      try {
        await api.delete(`/crop/delete/${id}`);
        toast.success('Crop deleted successfully');
        fetchCrops();
      } catch (error) {
        toast.error('Failed to delete crop');
      }
    }
  };

  const filteredCrops = crops.filter(crop =>
    crop.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.season.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Crops Management</h1>
        <Link 
          to="/app/crops/add" 
          className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add New Crop
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search crops by name or season..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Crops Grid */}
      {filteredCrops.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Sprout className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Crops Found</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first crop</p>
          <Link 
            to="/app/crops/add" 
            className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Add New Crop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <div key={crop.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Sprout className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{crop.cropName}</h3>
                    <p className="text-sm text-gray-500">{crop.season}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link 
                    to={`/app/crops/edit/${crop.id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={18} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(crop.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Income:</span>
                  <span className="font-semibold text-green-600">₹{crop.income.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Expenses:</span>
                  <span className="font-semibold text-orange-600">₹{crop.totalExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-gray-600">Profit:</span>
                  <span className={`font-bold ${crop.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{crop.profit.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Calendar size={14} className="mr-1" />
                {crop.createdDate}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Crops;