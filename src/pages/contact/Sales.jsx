import { Link } from 'react-router-dom';
import { ArrowLeft, Sprout, Phone, Mail, Calendar, Users } from 'lucide-react';

const Sales = () => {
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
          <h1 className="text-5xl font-bold mb-6">Sales Inquiry</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get the best pricing for your farm
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Contact Sales</h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Phone className="w-6 h-6 text-green-600 mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Call us</p>
                  <p className="font-semibold">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Mail className="w-6 h-6 text-green-600 mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Email us</p>
                  <p className="font-semibold">sales@cropcore.com</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600 mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Schedule a demo</p>
                  <p className="font-semibold">Book a free consultation</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-4">Pricing Plans</h3>
              <div className="space-y-3">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Basic Plan</span>
                    <span className="text-green-600 font-bold">Free</span>
                  </div>
                  <p className="text-sm text-gray-600">Up to 5 crops, basic tracking</p>
                </div>
                <div className="border rounded-lg p-4 border-green-200 bg-green-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Pro Plan</span>
                    <span className="text-green-600 font-bold">₹999/month</span>
                  </div>
                  <p className="text-sm text-gray-600">Unlimited crops, advanced analytics, priority support</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Enterprise</span>
                    <span className="text-green-600 font-bold">Custom</span>
                  </div>
                  <p className="text-sm text-gray-600">For large farms and cooperatives</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Why Choose CropCore?</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Users className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                <span>Trusted by 10,000+ farmers</span>
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 text-green-600 mr-3 mt-0.5">✓</span>
                <span>14-day free trial, no credit card required</span>
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 text-green-600 mr-3 mt-0.5">✓</span>
                <span>24/7 customer support</span>
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 text-green-600 mr-3 mt-0.5">✓</span>
                <span>Regular feature updates</span>
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 text-green-600 mr-3 mt-0.5">✓</span>
                <span>Mobile and web access</span>
              </li>
            </ul>
            <div className="mt-8">
              <Link to="/register" className="block w-full bg-green-600 text-white text-center px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;