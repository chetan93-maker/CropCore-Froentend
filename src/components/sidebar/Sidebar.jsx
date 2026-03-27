// import { NavLink, useLocation } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   Sprout, 
//   DollarSign, 
//   BarChart3,
//   X,
//   User,
//   Sun,
//   TrendingUp,
//   MessageCircle,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { useState, useEffect } from 'react';
// import api from '../services/api';
// import WeatherWidget from './sidebar/WeatherWidget';
// import MarketTicker from './sidebar/MarketTicker';

// const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
//   const location = useLocation();
//   const { user } = useAuth();
//   const [collapsed, setCollapsed] = useState(false);
//   const [quickStats, setQuickStats] = useState({
//     totalCrops: 0,
//     monthlyIncome: 0
//   });

//   useEffect(() => {
//     fetchQuickStats();
//   }, []);

//   const fetchQuickStats = async () => {
//     if (!user) return;
//     try {
//       const response = await api.get('/dashboard/summary');
//       setQuickStats({
//         totalCrops: response.data.totalCrops || 0,
//         monthlyIncome: response.data.monthlyIncome || 0
//       });
//     } catch (error) {
//       console.error('Failed to fetch quick stats:', error);
//     }
//   };

//   const menuItems = [
//     { path: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
//     { path: '/app/crops', icon: Sprout, label: 'Crops' },
//     { path: '/app/expenses', icon: DollarSign, label: 'Expenses' },
//     { path: '/app/reports', icon: BarChart3, label: 'Reports' },
//   ];

//   const toggleCollapse = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:sticky top-0 left-0 h-screen bg-white shadow-xl z-50 transition-all duration-300 ease-in-out ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//         } ${collapsed ? 'w-20' : 'w-72'}`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-green-600 to-green-500">
//             {!collapsed && (
//               <span className="text-xl font-bold text-white">🌾 CropCore</span>
//             )}
//             <div className="flex items-center space-x-2">
//               {/* Collapse/Expand Button */}
//               <button
//                 onClick={toggleCollapse}
//                 className="hidden lg:flex p-2 hover:bg-green-700 rounded-lg transition-colors text-white"
//                 title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//               >
//                 {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//               </button>
              
//               {/* Close Button (Mobile) */}
//               <button
//                 onClick={() => setSidebarOpen(false)}
//                 className="lg:hidden p-2 hover:bg-green-700 rounded-lg transition-colors text-white"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//           </div>

//           {/* User Info */}
//           {user && !collapsed && (
//             <div className="p-4 border-b border-gray-100 bg-gray-50">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center text-white font-bold">
//                   {user.name?.charAt(0).toUpperCase() || 'U'}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-gray-700 truncate">{user.name || 'Farmer'}</p>
//                   <p className="text-xs text-gray-500">Premium Member</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation */}
//           <nav className="flex-1 overflow-y-auto py-6 px-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//             <div className="space-y-2">
//               {menuItems.map((item) => (
//                 <NavLink
//                   key={item.path}
//                   to={item.path}
//                   onClick={() => {
//                     if (window.innerWidth < 1024) {
//                       setSidebarOpen(false);
//                     }
//                   }}
//                   className={({ isActive }) =>
//                     `flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-all duration-200 group ${
//                       isActive
//                         ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md'
//                         : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
//                     }`
//                   }
//                   title={collapsed ? item.label : undefined}
//                 >
//                   <item.icon size={20} />
//                   {!collapsed && (
//                     <span className="font-medium flex-1">{item.label}</span>
//                   )}
//                   {collapsed && location.pathname === item.path && (
//                     <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
//                       {item.label}
//                     </span>
//                   )}
//                 </NavLink>
//               ))}
//             </div>

//             {/* Quick Stats - Only when expanded */}
//             {!collapsed && (
//               <div className="mt-8 p-4 bg-gray-50 rounded-lg">
//                 <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
//                   Quick Stats
//                 </h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-600">Total Crops</span>
//                     <span className="font-semibold text-green-600">{quickStats.totalCrops}</span>
//                   </div>
//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-600">This Month</span>
//                     <span className="font-semibold text-green-600">
//                       ₹{quickStats.monthlyIncome.toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </nav>

//           {/* Weather Widget - New */}
//           {!collapsed && (
//             <div className="px-4 mb-4">
//               <WeatherWidget location={user?.location || 'Mumbai'} />
//             </div>
//           )}

//           {/* Market Ticker - New */}
//           {!collapsed && (
//             <div className="px-4 mb-4">
//               <MarketTicker />
//             </div>
//           )}

//           {/* Farming Tip - Only when expanded */}
//           {!collapsed && (
//             <div className="p-4 border-t border-gray-200 bg-gray-50">
//               <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
//                 <p className="text-xs text-green-800 italic leading-relaxed">
//                   "The farmer is the only man in our economy who buys everything at retail, 
//                   sells everything at wholesale, and pays the freight both ways."
//                 </p>
//                 <div className="flex items-center justify-between mt-2">
//                   <span className="text-xs text-green-600 font-semibold">— Farming Wisdom</span>
//                   <span className="text-xs text-green-500">🌱</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Collapsed version - icons only */}
//           {collapsed && (
//             <div className="p-4 border-t border-gray-200">
//               <div className="flex flex-col items-center space-y-4">
//                 <div className="p-2 bg-green-100 rounded-lg text-center group relative" title="Weather">
//                   <Sun className="w-5 h-5 text-green-600" />
//                   <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
//                     Weather
//                   </span>
//                 </div>
//                 <div className="p-2 bg-blue-100 rounded-lg text-center group relative" title="Market">
//                   <TrendingUp className="w-5 h-5 text-blue-600" />
//                   <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
//                     Market
//                   </span>
//                 </div>
//                 <div className="p-2 bg-orange-100 rounded-lg text-center group relative" title="AI Assistant">
//                   <MessageCircle className="w-5 h-5 text-orange-600" />
//                   <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
//                     AI Assistant
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;