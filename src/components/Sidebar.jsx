import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sprout, 
  DollarSign, 
  BarChart3,
  X,
  User,
  Sun,
  MessageCircle,
  LogOut,
  Settings,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import api from '../services/api';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [quickStats, setQuickStats] = useState({
    totalCrops: 0,
    monthlyIncome: 0
  });

  useEffect(() => {
    fetchQuickStats();
  }, []);

  const fetchQuickStats = async () => {
    if (!user) return;
    try {
      const response = await api.get('/dashboard/summary');
      setQuickStats({
        totalCrops: response.data.totalCrops || 0,
        monthlyIncome: response.data.monthlyIncome || 0
      });
    } catch (error) {
      console.error('Failed to fetch quick stats:', error);
    }
  };

  const menuItems = [
    { path: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/app/crops', icon: Sprout, label: 'Crops' },
    { path: '/app/expenses', icon: DollarSign, label: 'Expenses' },
    { path: '/app/reports', icon: BarChart3, label: 'Reports' },
    { path: '/app/market', icon: TrendingUp, label: 'Market Prices' },
    { path: '/app/weather', icon: Sun, label: 'Weather' },
    { path: '/app/ai-assistant', icon: MessageCircle, label: 'AI Assistant' },
  ];

  const bottomMenuItems = [
    { path: '/app/settings', icon: Settings, label: 'Settings' },
    { path: '/app/help', icon: HelpCircle, label: 'Help' },
  ];

  // EXACT NAVBAR COLOR - From your crops page screenshot
  // This is the perfect green - not too dark, not too light
  const brandGreen = '#22c55e'; // green-500 - Perfect navbar green
  
  // Alternative shades if needed:
  // const brandGreen = '#16a34a'; // green-600 (slightly darker)
  // const brandGreen = '#4ade80'; // green-400 (slightly lighter)
  // const brandGreen = '#2E7D32'; // Material green

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out overflow-hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Flex Column to Fill Height */}
        <div className="h-full flex flex-col">
          {/* Logo Header - Exact Navbar Color */}
          <div 
            className="flex-shrink-0 flex items-center"
            style={{ backgroundColor: brandGreen, height: '64px' }}
          >
            <div className="flex items-center justify-between w-full px-4">
              <div className="flex items-center space-x-2">
                <Sprout className="w-6 h-6 text-white" />
                <span className="text-xl font-bold text-white">CropCore</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* User Info - Directly under logo */}
          {user && (
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                  style={{ backgroundColor: brandGreen }}
                >
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{user.name || 'Farmer'}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email || 'Premium Member'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {/* Navigation Menu */}
            <nav className="p-4">
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) {
                          setSidebarOpen(false);
                        }
                      }}
                    >
                      {({ isActive: navActive }) => {
                        const active = navActive || isActive;
                        return (
                          <div 
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                              active 
                                ? 'text-white' 
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                            style={{ 
                              backgroundColor: active ? brandGreen : 'transparent',
                            }}
                          >
                            <item.icon size={20} className={active ? 'text-white' : ''} />
                            <span className="font-medium">{item.label}</span>
                          </div>
                        );
                      }}
                    </NavLink>
                  );
                })}
              </div>
            </nav>

            {/* Quick Stats */}
            <div className="px-4 pb-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                QUICK STATS
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Crops</span>
                  <span className="font-semibold" style={{ color: brandGreen }}>{quickStats.totalCrops}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-semibold" style={{ color: brandGreen }}>
                    ₹{quickStats.monthlyIncome.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Settings & Help */}
            <div className="px-4 pb-2">
              {bottomMenuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                  >
                    {({ isActive: navActive }) => {
                      const active = navActive || isActive;
                      return (
                        <div 
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 mb-1 ${
                            active 
                              ? 'text-white' 
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                          style={{ 
                            backgroundColor: active ? brandGreen : 'transparent',
                          }}
                        >
                          <item.icon size={20} className={active ? 'text-white' : ''} />
                          <span className="font-medium">{item.label}</span>
                        </div>
                      );
                    }}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Logout Button */}
          <div className="flex-shrink-0 p-4 border-t border-gray-100">
            <button
              onClick={logout}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default Sidebar;