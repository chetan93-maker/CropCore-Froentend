import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  // Navigation Icons
  Menu,
  X,
  ChevronDown,

  // Feature Icons
  Sprout,
  TrendingUp,
  Shield,
  Clock,
  Users,
  Leaf,

  // UI Icons
  ArrowRight,
  Star,
  CheckCircle,

  // Weather Icons
  Sun,
  Droplets,
  Wind,

  // Contact Icons
  Mail,
  Phone,
  MapPin,

  // Blog Icons
  Calendar,
  Clock as ClockIcon,

  // About Icons
  Award,
  Eye,
  Heart
} from 'lucide-react';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const [counts, setCounts] = useState({ farmers: 0, crops: 0, profits: 0, uptime: 0 });

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 }
  };

  const floatAnimation = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const shakeAnimation = {
    hover: {
      rotate: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.5 }
    }
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Animate numbers on scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        farmers: prev.farmers < 10000 ? prev.farmers + 100 : 10000,
        crops: prev.crops < 50000 ? prev.crops + 500 : 50000,
        profits: prev.profits < 100 ? prev.profits + 1 : 100,
        uptime: prev.uptime < 99.9 ? prev.uptime + 0.1 : 99.9
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const features = [
    {
      icon: <Sprout className="w-8 h-8 text-green-600" />,
      title: "Crop Management",
      description: "Easily track all your crops, seasons, and expected income in one place."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      title: "Expense Tracking",
      description: "Monitor every expense from seeds to labor with detailed categorization."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Profit Analysis",
      description: "Get real-time profit calculations and financial insights for better decisions."
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: "Seasonal Planning",
      description: "Plan your farming activities according to seasons and optimize yield."
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Multi-Farmer Support",
      description: "Manage multiple farms and collaborate with your farming team."
    },
    {
      icon: <Leaf className="w-8 h-8 text-emerald-600" />,
      title: "Sustainable Farming",
      description: "Make data-driven decisions for sustainable and profitable farming."
    }
  ];

  const stats = [
    { value: counts.farmers.toLocaleString() + "+", label: "Happy Farmers" },
    { value: counts.crops.toLocaleString() + "+", label: "Crops Tracked" },
    { value: `₹${counts.profits}M+`, label: "Profits Generated" },
    { value: counts.uptime.toFixed(1) + "%", label: "Uptime" }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Wheat Farmer, Punjab",
      content: "CropCore has transformed how I manage my farm. I can track every expense and know my profits in real-time.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Priya Sharma",
      role: "Organic Farmer, Maharashtra",
      content: "The dashboard gives me clear insights into my farming operations. Highly recommended for modern farmers.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Suresh Patel",
      role: "Rice Farmer, Gujarat",
      content: "Simple to use yet powerful. The expense tracking feature alone saved me thousands.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  // Complete blog posts data with proper links
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Increasing Crop Yield",
      excerpt: "Learn the best practices to maximize your agricultural output this season with proven techniques from expert farmers.",
      fullContent: `
        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">10 Essential Tips for Beginner Farmers</h2>
          <p class="text-gray-700">Starting a farming journey can be both exciting and challenging. Here are 10 proven tips from experienced farmers that will help you build a successful farming operation.</p>
          <div class="bg-green-50 p-4 rounded-lg my-4">
            <p class="text-green-800 italic">"The secret of getting ahead is getting started." - Mark Twain</p>
          </div>
          <h3 class="text-xl font-semibold mt-4">1. Start Small and Scale Gradually</h3>
          <p class="text-gray-700">Begin with 1-2 acres, learn the basics, and gradually expand as you gain experience and confidence.</p>
          <h3 class="text-xl font-semibold mt-4">2. Know Your Soil</h3>
          <p class="text-gray-700">Get your soil tested before planting. Understanding soil pH and nutrients is crucial for success.</p>
        </div>
      `,
      date: "March 15, 2024",
      author: "Dr. Rajesh Sharma",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Farming Tips",
      readTime: "5 min read",
      views: "1.2k",
      link: "/blogs/farming-tips"
    },
    {
      id: 2,
      title: "Understanding Soil Health",
      excerpt: "Why soil testing is crucial for successful farming and how to do it properly for better results.",
      fullContent: `
        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Understanding Soil Health</h2>
          <p class="text-gray-700">Soil health is the foundation of successful farming. Healthy soil leads to healthy crops, better yields, and sustainable farming practices.</p>
          <h3 class="text-xl font-semibold mt-4">Why Soil Health Matters</h3>
          <ul class="list-disc pl-5 text-gray-700">
            <li>Provides essential nutrients for plant growth</li>
            <li>Improves water retention and drainage</li>
            <li>Supports beneficial microorganisms</li>
          </ul>
        </div>
      `,
      date: "March 10, 2024",
      author: "Dr. Priya Patel",
      authorImage: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Soil Health",
      readTime: "4 min read",
      views: "856",
      link: "/blogs/soil-health"
    },
    {
      id: 3,
      title: "Seasonal Crop Planning Guide",
      excerpt: "What to plant and when - a complete guide for Indian farmers to maximize yield throughout the year.",
      fullContent: `
        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Complete Seasonal Crop Planning Guide</h2>
          <h3 class="text-xl font-semibold mt-4">Major Crop Seasons in India</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div class="bg-green-50 p-3 rounded">
              <h4 class="font-bold">Kharif</h4>
              <p>June-October</p>
              <p class="text-sm">Rice, Cotton, Maize</p>
            </div>
            <div class="bg-blue-50 p-3 rounded">
              <h4 class="font-bold">Rabi</h4>
              <p>October-March</p>
              <p class="text-sm">Wheat, Mustard, Gram</p>
            </div>
            <div class="bg-yellow-50 p-3 rounded">
              <h4 class="font-bold">Zaid</h4>
              <p>April-June</p>
              <p class="text-sm">Watermelon, Cucumber</p>
            </div>
          </div>
        </div>
      `,
      date: "March 5, 2024",
      author: "Agricultural Team",
      authorImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Seasonal Planning",
      readTime: "6 min read",
      views: "2.1k",
      link: "/blogs/seasonal-planning"
    },
    {
      id: 4,
      title: "AI in Agriculture: The Future is Here",
      excerpt: "How artificial intelligence is transforming farming practices with predictive analytics and automation.",
      fullContent: `
        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">AI in Agriculture</h2>
          <p class="text-gray-700">Artificial Intelligence is revolutionizing agriculture, offering farmers unprecedented insights and automation capabilities.</p>
        </div>
      `,
      date: "March 14, 2024",
      author: "Dr. Amit Kumar",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Technology",
      readTime: "6 min read",
      views: "1.8k",
      link: "/blogs/technology"
    },
    {
      id: 5,
      title: "Natural Pest Control Methods",
      excerpt: "Eco-friendly ways to protect your crops without harmful chemicals while maintaining ecological balance.",
      fullContent: `
        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Natural Pest Control</h2>
          <p class="text-gray-700">Protect your crops using companion planting, beneficial insects, and organic solutions.</p>
        </div>
      `,
      date: "March 12, 2024",
      author: "Dr. Priya Patel",
      authorImage: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Farming Tips",
      readTime: "4 min read",
      views: "956",
      link: "/blogs/farming-tips"
    },
    {
      id: 6,
      title: "Success Story: From 2 to 20 Acres",
      excerpt: "How a small farmer used CropCore to scale operations and increase profits by 300%.",
      fullContent: `
        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Success Story</h2>
          <p class="text-gray-700">Rajesh Kumar started with 2 acres and now manages 20 acres, increasing his profit by 300% using CropCore.</p>
        </div>
      `,
      date: "March 12, 2024",
      author: "Rajesh Kumar",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Success Stories",
      readTime: "7 min read",
      views: "3.2k",
      link: "/blogs/success-stories"
    }
  ];

  const companyInfo = {
    mission: "To revolutionize Indian agriculture through accessible technology that empowers every farmer to make data-driven decisions, increase productivity, and maximize profits.",
    vision: "A future where every farm in India, regardless of size, is equipped with smart tools that ensure sustainable growth and food security for generations to come.",
    values: [
      "Farmer-First Approach",
      "Innovation in Agriculture",
      "Sustainability",
      "Integrity & Trust",
      "Community Empowerment"
    ]
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const openBlogModal = (blog) => {
    setSelectedBlog(blog);
    setShowBlogModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeBlogModal = () => {
    setShowBlogModal(false);
    setSelectedBlog(null);
    document.body.style.overflow = 'unset';
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'Farming Tips': 'bg-green-100 text-green-700',
      'Soil Health': 'bg-amber-100 text-amber-700',
      'Seasonal Planning': 'bg-emerald-100 text-emerald-700',
      'Technology': 'bg-blue-100 text-blue-700',
      'Success Stories': 'bg-orange-100 text-orange-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  // Display either 3 blogs or all blogs based on state
  const displayedBlogs = showAllBlogs ? blogPosts : blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Navigation Bar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo with animation */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </motion.div>
                <span className="text-xl sm:text-2xl font-bold text-gray-800">CropCore</span>
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
                Home
              </Link>

              {/* About Us Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors font-medium"
                  onClick={() => toggleDropdown('about')}
                >
                  <span>About Us</span>
                  <ChevronDown size={16} className={`transform transition-transform ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'about' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100 z-50"
                  >
                    <Link to="/about/company" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600">Our Story</Link>
                    <Link to="/about/team" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600">Our Team</Link>
                    <Link to="/about/mission" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600">Mission & Vision</Link>
                    <Link to="/about/careers" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600">Careers</Link>
                  </motion.div>
                )}
              </div>

              {/* Blogs Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors font-medium"
                  onClick={() => toggleDropdown('blogs')}
                >
                  <span>Blogs</span>
                  <ChevronDown size={16} className={`transform transition-transform ${activeDropdown === 'blogs' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'blogs' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-100 z-50"
                  >
                    <Link to="/blogs/farming-tips" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600">🌱 Farming Tips</Link>
                    <Link to="/blogs/soil-health" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600">🧪 Soil Health</Link>
                    <Link to="/blogs/seasonal-planning" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600">📅 Seasonal Planning</Link>
                    <Link to="/blogs/technology" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600">🤖 Agri Technology</Link>
                    <Link to="/blogs/success-stories" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600">⭐ Success Stories</Link>
                  </motion.div>
                )}
              </div>

              {/* Contact Us Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors font-medium"
                  onClick={() => toggleDropdown('contact')}
                >
                  <span>Contact Us</span>
                  <ChevronDown size={16} className={`transform transition-transform ${activeDropdown === 'contact' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'contact' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-100"
                  >
                    <Link to="/contact/support" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600">Customer Support</Link>
                    <Link to="/contact/sales" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600">Sales Inquiry</Link>
                    <Link to="/contact/partnerships" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600">Partnerships</Link>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-green-600 transition-colors font-medium">
                  Login
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={pulseAnimation.animate}
              >
                <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium">
                  Get Started
                </Link>
              </motion.div>
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
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 border-t border-gray-200"
            >
              <div className="flex flex-col space-y-3">
                <Link to="/" className="px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/about/company" className="px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                  About Us
                </Link>
                <Link to="/blogs/farming-tips" className="px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                  Blogs
                </Link>
                <Link to="/contact/support" className="px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                  Contact Us
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Link to="/login" className="px-4 py-2 text-center text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="px-4 py-2 text-center bg-green-600 text-white rounded-lg hover:bg-green-700" onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 overflow-hidden">
        <motion.div 
          variants={floatAnimation}
          animate="animate"
          className="absolute inset-0 bg-grid-pattern opacity-5"
        ></motion.div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="inline-block px-3 sm:px-4 py-2 bg-green-100 rounded-full"
              >
                <span className="text-sm sm:text-base text-green-600 font-semibold">🌟 Trusted by 10,000+ Farmers</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              >
                Smart Farming with{' '}
                <span className="text-green-600">CropCore</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg lg:text-xl text-gray-600"
              >
                Track your crops, manage expenses, and maximize profits with India's most loved farming management platform.
              </motion.p>
              
              {/* BUTTONS - WORKING */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Link 
                  to="/register" 
                  className="bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-green-700 transition-all duration-300 text-center inline-block cursor-pointer z-50 relative"
                >
                  Start Free Trial
                  <ArrowRight className="inline ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>

                <Link 
                  to="/about/company" 
                  className="bg-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-orange-600 transition-all duration-300 text-center inline-block cursor-pointer z-50 relative"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="relative mt-8 lg:mt-0"
            >
              <motion.img
                animate={floatAnimation.animate}
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Happy Farmer"
                className="rounded-2xl shadow-2xl relative z-10 w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-green-600 py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={shakeAnimation.hover}
                className="text-center text-white cursor-pointer"
              >
                <motion.div 
                  animate={pulseAnimation.animate}
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs sm:text-sm lg:text-base text-green-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Everything You Need to <span className="text-green-600">Manage Your Farm</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Powerful features designed specifically for Indian farmers.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="mb-3 sm:mb-4 p-2 sm:p-3 bg-green-50 rounded-lg w-fit"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Latest from Our <span className="text-green-600">Blog</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Stay updated with the latest farming tips, technology, and success stories.
            </p>
          </motion.div>

          {/* Blog Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayedBlogs.map((post) => (
              <motion.div
                key={post.id}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock size={14} className="mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img src={post.authorImage} alt={post.author} className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-sm text-gray-500">{post.author}</span>
                    </div>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link to={post.link} className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                        Read More
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Blogs Button */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowAllBlogs(!showAllBlogs)}
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              {showAllBlogs ? 'Show Less' : 'View All Blogs'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              What <span className="text-green-600">Farmers Say</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Join thousands of satisfied farmers who trust CropCore.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="bg-white rounded-xl shadow-md p-4 sm:p-6"
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <motion.img 
                    whileHover={{ rotate: 5 }}
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mr-3 sm:mr-4"
                  />
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold">{testimonial.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-2 sm:mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-600 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Info Section - CENTERED */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              About <span className="text-green-600">CropCore</span>
            </h2>
            <p className="text-lg text-gray-600">
              Learn more about our mission, vision, and the team behind your favorite farming platform.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 h-full"
            >
              <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">Our Mission & Vision</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-3 flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-600 mr-2" />
                    Mission
                  </h4>
                  <p className="text-gray-600 text-center">{companyInfo.mission}</p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-3 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-green-600 mr-2" />
                    Vision
                  </h4>
                  <p className="text-gray-600 text-center">{companyInfo.vision}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 h-full"
            >
              <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">Our Values</h3>
              <ul className="grid grid-cols-1 gap-4">
                {companyInfo.values.map((value, index) => (
                  <motion.li 
                    key={index} 
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center p-3 bg-green-50 rounded-xl"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{value}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 mb-6">Want to know more about us?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/about/company" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Our Story
              </Link>
              <Link to="/about/team" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Our Team
              </Link>
              <Link to="/about/careers" className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                Careers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - CENTERED */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Get in <span className="text-green-600">Touch</span>
            </h2>
            <p className="text-lg text-gray-600">
              Have questions? Our team is here to help you succeed with CropCore.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Mail, title: "Email", value: "support@cropcore.com", bg: "bg-blue-50", iconBg: "bg-blue-100", textColor: "text-blue-600" },
                { icon: Phone, title: "Phone", value: "+91 98765 43210", bg: "bg-green-50", iconBg: "bg-green-100", textColor: "text-green-600" },
                { icon: MapPin, title: "Address", value: "Mumbai, India", bg: "bg-orange-50", iconBg: "bg-orange-100", textColor: "text-orange-600" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`${item.bg} rounded-2xl p-6 text-center`}
                >
                  <div className={`w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className={`w-8 h-8 ${item.textColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.value}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <p className="text-gray-600 mb-6">Prefer to reach out directly?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact/support" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Customer Support
                </Link>
                <Link to="/contact/sales" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Sales Inquiry
                </Link>
                <Link to="/contact/partnerships" className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  Partnerships
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="col-span-2 md:col-span-1"
            >
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                <span className="text-lg sm:text-xl lg:text-2xl font-bold">CropCore</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400">
                Empowering Indian farmers with smart technology.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                <motion.li whileHover={{ x: 5 }}><Link to="/about/company" className="hover:text-green-500 transition-colors">About Us</Link></motion.li>
                <motion.li whileHover={{ x: 5 }}><Link to="/blogs/farming-tips" className="hover:text-green-500 transition-colors">Blogs</Link></motion.li>
                <motion.li whileHover={{ x: 5 }}><Link to="/contact/support" className="hover:text-green-500 transition-colors">Contact</Link></motion.li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Support</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                <motion.li whileHover={{ x: 5 }}><Link to="/faq" className="hover:text-green-500 transition-colors">FAQ</Link></motion.li>
                <motion.li whileHover={{ x: 5 }}><Link to="/privacy" className="hover:text-green-500 transition-colors">Privacy</Link></motion.li>
                <motion.li whileHover={{ x: 5 }}><Link to="/terms" className="hover:text-green-500 transition-colors">Terms</Link></motion.li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Contact</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                <motion.li whileHover={{ x: 5 }}>support@cropcore.com</motion.li>
                <motion.li whileHover={{ x: 5 }}>+91 98765 43210</motion.li>
                <motion.li whileHover={{ x: 5 }}>Mumbai, India</motion.li>
              </ul>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400"
          >
            <p>&copy; 2024 CropCore. All rights reserved. Made with ❤️ for Indian Farmers.</p>
          </motion.div>
        </div>
      </footer>

      {/* Blog Modal */}
      {showBlogModal && selectedBlog && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto" 
          onClick={closeBlogModal}
        >
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm"></div>
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" 
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 py-4 sticky top-0 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">{selectedBlog.category}</h3>
                <motion.button 
                  whileHover={{ rotate: 90 }}
                  onClick={closeBlogModal} 
                  className="text-white hover:text-gray-200"
                >
                  <X size={24} />
                </motion.button>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <img src={selectedBlog.authorImage} alt={selectedBlog.author} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-semibold">{selectedBlog.author}</p>
                    <p className="text-sm text-gray-500">{selectedBlog.date} • {selectedBlog.readTime}</p>
                  </div>
                </div>
                <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-96 object-cover rounded-lg mb-6" />
                <div dangerouslySetInnerHTML={{ __html: selectedBlog.fullContent }} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;