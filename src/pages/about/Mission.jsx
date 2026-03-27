import { Link } from 'react-router-dom';
import { ArrowLeft, Sprout, Target, Eye, Heart, TrendingUp } from 'lucide-react';

const Mission = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2">
              <Sprout className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">CropCore</span>
            </Link>
            <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Mission & Vision</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Driving agricultural transformation through technology
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center mb-6">
              <Target className="w-12 h-12 text-green-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-600 mb-8">
              To empower every farmer with cutting-edge technology that simplifies farm management, 
              optimizes resources, and maximizes profitability. We are committed to bridging the gap 
              between traditional farming practices and modern agricultural technology.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3 text-green-700">For Farmers</h3>
                <p className="text-gray-600">Provide intuitive tools for crop tracking, expense management, and profit analysis</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3 text-green-700">For Agriculture</h3>
                <p className="text-gray-600">Promote sustainable farming practices through data-driven insights</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3 text-green-700">For India</h3>
                <p className="text-gray-600">Contribute to the growth and modernization of Indian agriculture</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3 text-green-700">For Future</h3>
                <p className="text-gray-600">Build a sustainable agricultural ecosystem for generations to come</p>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <Eye className="w-12 h-12 text-green-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-lg text-gray-600">
              To become India's most trusted farming companion, reaching every farmer in the country 
              and transforming the agricultural landscape through innovation, education, and technology. 
              We envision a future where every farm, regardless of size, is equipped with smart tools 
              that ensure sustainable growth and maximum profitability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;