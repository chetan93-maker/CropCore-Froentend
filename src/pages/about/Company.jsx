import { Link } from 'react-router-dom';
import { ArrowLeft, Sprout, Target, Heart, Award } from 'lucide-react';

const Company = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl max-w-3xl mx-auto">
            From a small idea to India's most trusted farming management platform
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Who We Are</h2>
            <p className="text-lg text-gray-600 mb-6">
              CropCore was founded in 2020 by a team of agricultural experts and technology enthusiasts 
              who saw the need for a modern, digital solution to help Indian farmers manage their farms 
              more efficiently.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our mission is to empower every farmer with the tools and insights they need to increase 
              productivity, reduce costs, and maximize profits. We believe that technology should be 
              accessible to all farmers, regardless of the size of their land or their technical expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-600">To revolutionize Indian agriculture through smart technology</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Values</h3>
              <p className="text-gray-600">Farmer-first approach, innovation, and integrity</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Promise</h3>
              <p className="text-gray-600">Delivering excellence in every feature we build</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;