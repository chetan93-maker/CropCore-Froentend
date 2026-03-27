import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sprout, Menu, X, Leaf, Sun } from 'lucide-react';

const BlogCategoryLayout = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  
  const {
    title = "Blog Category",
    subtitle = "Explore our articles",
    gradientFrom = "from-green-600",
    gradientTo = "to-green-500",
    icon = <Sprout className="w-8 h-8" />,
    children
  } = props;

  const categories = [
    { name: "Farming Tips", path: "/blogs/farming-tips", icon: "🌱", color: "green", count: 12 },
    { name: "Soil Health", path: "/blogs/soil-health", icon: "🧪", color: "amber", count: 8 },
    { name: "Seasonal Planning", path: "/blogs/seasonal-planning", icon: "📅", color: "emerald", count: 6 },
    { name: "Technology", path: "/blogs/technology", icon: "🤖", color: "blue", count: 10 },
    { name: "Success Stories", path: "/blogs/success-stories", icon: "⭐", color: "orange", count: 15 },
    { name: "Market Trends", path: "/blogs/market-trends", icon: "📊", color: "purple", count: 7 }
  ];

  const getCategoryColor = (color) => {
    const colors = {
      green: "bg-green-100 text-green-700 border-green-200 hover:bg-green-200",
      amber: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200",
      emerald: "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200",
      blue: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200",
      orange: "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200",
      purple: "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
    };
    return colors[color] || "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200";
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <Sprout className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold text-gray-800">CropCore</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link to="/blogs/farming-tips" className="text-gray-600 hover:text-green-600 transition-colors">Blogs</Link>
              <Link to="/about/company" className="text-gray-600 hover:text-green-600 transition-colors">About</Link>
              <Link to="/contact/support" className="text-gray-600 hover:text-green-600 transition-colors">Contact</Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                <Link to="/" className="px-4 py-2 text-gray-600 hover:bg-green-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link to="/blogs/farming-tips" className="px-4 py-2 text-gray-600 hover:bg-green-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Blogs</Link>
                <Link to="/about/company" className="px-4 py-2 text-gray-600 hover:bg-green-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>About</Link>
                <Link to="/contact/support" className="px-4 py-2 text-gray-600 hover:bg-green-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className={`relative bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white overflow-hidden`}>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          backgroundRepeat: 'repeat',
          opacity: 0.2
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              {icon}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
              <p className="text-xl opacity-90 mt-2">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Leaf className="w-5 h-5 text-green-600 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => {
                  const active = isActive(cat.path);
                  let linkClass = "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ";
                  
                  if (active) {
                    linkClass += `bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white shadow-md`;
                  } else {
                    linkClass += getCategoryColor(cat.color);
                  }
                  
                  return (
                    <Link
                      key={cat.path}
                      to={cat.path}
                      className={linkClass}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{cat.icon}</span>
                        <span className="font-medium">{cat.name}</span>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${active ? 'bg-white/20' : 'bg-white'}`}>
                        {cat.count}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Weather Widget */}
              <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-blue-800">Weather</span>
                  <Sun className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-800">24°C</p>
                    <p className="text-xs text-gray-600">Clear Sky</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Humidity: 65%</p>
                    <p className="text-sm text-gray-600">Wind: 12 km/h</p>
                  </div>
                </div>
              </div>

              {/* Back to Home Button */}
              <Link
                to="/"
                className="mt-6 flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Home size={18} />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>

          {/* Right Content - Blog Posts */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCategoryLayout;