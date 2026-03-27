import { Link } from 'react-router-dom';
import { ArrowLeft, Sprout, Handshake, Building2, Users2, Globe } from 'lucide-react';

const Partnerships = () => {
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
          <h1 className="text-5xl font-bold mb-6">Partnerships</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Collaborate with us to transform agriculture
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="flex items-center mb-6">
              <Handshake className="w-12 h-12 text-green-600 mr-4" />
              <h2 className="text-3xl font-bold">Partner with CropCore</h2>
            </div>
            <p className="text-lg text-gray-600 mb-8">
              Join us in our mission to empower every farmer with technology. We're looking for partners who share our vision and want to make a difference in Indian agriculture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Building2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Corporate</h3>
              <p className="text-gray-600 mb-4">Enterprise solutions and CSR initiatives</p>
              <span className="text-green-600 font-medium">Learn more →</span>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Users2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">NGOs</h3>
              <p className="text-gray-600 mb-4">Collaborate on farmer welfare programs</p>
              <span className="text-green-600 font-medium">Learn more →</span>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Globe className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Government</h3>
              <p className="text-gray-600 mb-4">Public-private partnerships</p>
              <span className="text-green-600 font-medium">Learn more →</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Partner?</h2>
            <p className="text-gray-700 mb-6">Contact our partnerships team to discuss collaboration opportunities.</p>
            <a href="mailto:partnerships@cropcore.com" className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
              partnerships@cropcore.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnerships;