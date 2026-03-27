import { Menu, User, LogOut, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Don't show navbar on home, login, register pages
  if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  // Same green as sidebar logo - #22c55e (green-500)
  const brandGreen = '#22c55e';

  return (
    <nav 
      className="sticky top-0 z-40 shadow-lg text-white"
      style={{ backgroundColor: brandGreen }}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu button and Logo */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-colors mr-2"
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
            
            {/* Logo */}
            <span className="text-xl lg:text-2xl font-bold">🌾 CropCore</span>
          </div>

          {/* Right side - Navigation Items */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Home Button */}
            <Link 
              to="/" 
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-white/20 transition-colors"
              title="Go to Home"
            >
              <Home size={20} />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            {/* User Info - Only when logged in */}
            {user && (
              <>
                {/* Desktop User Info */}
                <div className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/20">
                  <User size={20} />
                  <span className="font-medium">{user.name || 'User'}</span>
                </div>
                
                {/* Mobile User Initial */}
                <div className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                  <span className="text-sm font-bold">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                </div>
                
                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-white/20 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut size={20} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}

            {/* If not logged in, show Login link */}
            {!user && (
              <Link
                to="/login"
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <User size={20} />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;