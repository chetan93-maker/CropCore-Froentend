import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Crops from './pages/Crops';
import AddCrop from './pages/AddCrop';
import EditCrop from './pages/EditCrop';
import Expenses from './pages/Expenses';
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import Reports from './pages/Reports';

// About Pages
import AboutCompany from './pages/about/Company';
import AboutTeam from './pages/about/Team';
import AboutMission from './pages/about/Mission';
import AboutCareers from './pages/about/Careers';

// Blog Pages
import BlogFarmingTips from './pages/blogs/FarmingTips';
import BlogTechnology from './pages/blogs/Technology';
import BlogSuccessStories from './pages/blogs/SuccessStories';
import BlogMarketTrends from './pages/blogs/MarketTrends';
import SoilHealth from './pages/blogs/SoilHealth';
import SeasonalPlanning from './pages/blogs/SeasonalPlanning';

// Contact Pages
import ContactSupport from './pages/contact/Support';
import ContactSales from './pages/contact/Sales';
import ContactPartnerships from './pages/contact/Partnerships';

// Weather and AI Pages
import WeatherPage from './pages/WeatherPage';
import AIAssistantPage from './pages/AIAssistantPage';
import MarketPage from './pages/MarketPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary>
          {/* Move Toaster outside of ErrorBoundary or ensure it's properly placed */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#2E7D32',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#2E7D32',
                },
              },
              error: {
                style: {
                  background: '#C62828',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#C62828',
                },
              },
            }}
          />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* About Routes */}
            <Route path="/about/company" element={<AboutCompany />} />
            <Route path="/about/team" element={<AboutTeam />} />
            <Route path="/about/mission" element={<AboutMission />} />
            <Route path="/about/careers" element={<AboutCareers />} />
            
            {/* Blog Routes */}
            <Route path="/blogs/farming-tips" element={<BlogFarmingTips />} />
            <Route path="/blogs/soil-health" element={<SoilHealth />} />
            <Route path="/blogs/seasonal-planning" element={<SeasonalPlanning />} />
            <Route path="/blogs/technology" element={<BlogTechnology />} />
            <Route path="/blogs/success-stories" element={<BlogSuccessStories />} />
            <Route path="/blogs/market-trends" element={<BlogMarketTrends />} />
            
            {/* Contact Routes */}
            <Route path="/contact/support" element={<ContactSupport />} />
            <Route path="/contact/sales" element={<ContactSales />} />
            <Route path="/contact/partnerships" element={<ContactPartnerships />} />

            {/* Protected Routes */}
            <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="crops" element={<Crops />} />
              <Route path="crops/add" element={<AddCrop />} />
              <Route path="crops/edit/:id" element={<EditCrop />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="expenses/add" element={<AddExpense />} />
              <Route path="expenses/edit/:id" element={<EditExpense />} />
              <Route path="reports" element={<Reports />} />
              <Route path="weather" element={<WeatherPage />} />
              <Route path="ai-assistant" element={<AIAssistantPage />} />
              <Route path="market" element={<MarketPage />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}

export default App;