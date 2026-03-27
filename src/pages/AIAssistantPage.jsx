import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Bot, User, ChevronLeft, ChevronDown, ChevronUp,
  Sun, Cloud, CloudRain, Sprout, Leaf, Droplets, AlertCircle,
  MessageCircle, X, Sparkles
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const AIAssistantPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: `👋 Namaste ${user?.name || 'Farmer'}! I'm your AI Farming Assistant. Ask me anything about farming!`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [remainingQuota, setRemainingQuota] = useState(50);
  const [rateLimited, setRateLimited] = useState(false);
  const [rateLimitResetTime, setRateLimitResetTime] = useState(null);
  const [showQuickQuestions, setShowQuickQuestions] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    { icon: "🌞", text: "Which crop is best for summer?" },
    { icon: "🧪", text: "Fertilizer for cotton?" },
    { icon: "📈", text: "How to increase yield?" },
    { icon: "🐛", text: "Natural pest control" },
    { icon: "🌾", text: "Best time for wheat" },
    { icon: "🌱", text: "Organic farming tips" },
    { icon: "🦗", text: "How to control aphids?" },
    { icon: "🍂", text: "What causes yellow leaves?" },
    { icon: "💧", text: "Best irrigation method for rice" },
    { icon: "🎋", text: "When to harvest sugarcane?" }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (rateLimitResetTime) {
      const now = new Date();
      if (now > rateLimitResetTime) {
        setRateLimited(false);
        setRateLimitResetTime(null);
        toast.success('✨ Rate limit reset! You can now use the AI assistant again.');
      }
    }
  }, [rateLimitResetTime]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getTimeUntilReset = () => {
    if (!rateLimitResetTime) return null;
    const now = new Date();
    const diffMs = rateLimitResetTime - now;
    if (diffMs <= 0) return null;
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    if (rateLimited) {
      toast.success('Using offline mode - your question will be answered from our database');
    }

    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    const minTimeBetweenRequests = 20000;
    
    if (timeSinceLastRequest < minTimeBetweenRequests && !rateLimited) {
      const waitTime = Math.ceil((minTimeBetweenRequests - timeSinceLastRequest) / 1000);
      toast.error(`⏳ Please wait ${waitTime} seconds between questions (generating detailed responses takes time)`);
      return;
    }

    if (remainingQuota <= 0 && !rateLimited) {
      toast.warning('Daily quota may be low. You might hit rate limits soon.');
    }

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setLastRequestTime(now);
    setRemainingQuota(prev => prev - 1);

    const loadingToast = toast.loading(rateLimited ? 
      'Getting offline response...' : 
      'Generating detailed response... (may take 15-20 seconds)'
    );

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login to continue');
        navigate('/login');
        return;
      }

      const requestData = {
        query: input
      };
      
      console.log('📤 Sending request:', {
        url: '/api/chat/ask',
        data: requestData
      });
      
      const response = await api.post('/api/chat/ask', requestData);
      
      toast.dismiss(loadingToast);

      console.log('📥 Response:', response.data);

      let botResponse = "I'm here to help!";
      
      if (response.data) {
        if (response.data.response) {
          botResponse = response.data.response;
        } else if (typeof response.data === 'string') {
          botResponse = response.data;
        } else {
          botResponse = JSON.stringify(response.data, null, 2);
        }
      }

      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      toast.success('Response received!');
      
    } catch (error) {
      toast.dismiss(loadingToast);
      
      console.error('❌ Chat error:', error);
      
      let errorText = "Sorry, I'm having trouble connecting. ";
      
      if (error.response?.status === 429) {
        setRateLimited(true);
        
        const resetTime = new Date();
        resetTime.setHours(resetTime.getHours() + 24);
        resetTime.setMinutes(0);
        resetTime.setSeconds(0);
        setRateLimitResetTime(resetTime);
        
        const timeUntilReset = getTimeUntilReset();
        
        errorText = "⚠️ **Daily Limit Reached - 24 Hours Cooldown** ⚠️\n\n" +
                   "You've used all **250 free requests** for today. The AI assistant is now in **offline mode**.\n\n" +
                   "🕒 **Your quota will reset in approximately 24 hours.**\n\n" +
                   "**While you wait, you can still ask about common farming topics:**\n" +
                   "• Summer/winter/monsoon crops\n" +
                   "• Fertilizer schedules\n" +
                   "• Pest control methods\n" +
                   "• Irrigation techniques\n" +
                   "• Harvesting steps\n\n" +
                   "✨ **Try asking:**\n" +
                   "• \"What causes yellow leaves?\"\n" +
                   "• \"Best fertilizer for cotton?\"\n" +
                   "• \"How to control aphids?\"";
        
      } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorText = "⏳ The request is taking longer than expected. Detailed farming advice can take 20-30 seconds to generate. Please try again and wait a bit longer.";
      } else if (error.response?.status === 401) {
        errorText = "Your session has expired. Please login again.";
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => navigate('/login'), 2000);
      } else if (error.response?.status === 400) {
        if (error.response?.data?.error) {
          errorText = `Error: ${error.response.data.error}`;
        } else {
          errorText = "The request format was incorrect. Please try again.";
        }
      } else if (error.response?.status === 500) {
        errorText = "Server error. Please try again later.";
      } else if (error.code === 'ERR_NETWORK') {
        errorText = "Cannot connect to server. Make sure backend is running on port 8080.";
      }
      
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: errorText,
        isError: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      if (error.response?.status !== 429) {
        toast.error('Failed to get response');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
    setShowQuickQuestions(false);
    setTimeout(() => handleSendMessage(), 100);
  };

  const timeUntilReset = getTimeUntilReset();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Matching CropCore Style */}
      <div className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/app/dashboard" 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </Link>
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-green-600 to-green-500 p-2 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">AI Farming Assistant</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {rateLimited && (
                <span className="flex items-center space-x-1 bg-orange-100 text-orange-800 px-3 py-1.5 rounded-full text-xs font-medium">
                  <AlertCircle size={14} />
                  <span>Daily Limit Reached</span>
                  {timeUntilReset && (
                    <span className="ml-1 bg-orange-200 px-1.5 py-0.5 rounded">
                      {timeUntilReset}
                    </span>
                  )}
                </span>
              )}
              
              {!rateLimited && remainingQuota < 10 && (
                <span className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-xs font-medium">
                  <AlertCircle size={14} />
                  <span>Low Quota ({remainingQuota} left)</span>
                </span>
              )}

              {/* User Info - Matching Sidebar Style */}
              {user && (
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-700">{user.name || 'Farmer'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rate Limit Banner */}
      <AnimatePresence>
        {rateLimited && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-6xl mx-auto px-4 pt-4"
          >
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-800">⚠️ Daily Limit Reached - 24 Hours Cooldown</h3>
                  <p className="text-sm text-orange-700 mt-1">
                    You've used all <strong>250 free requests</strong> for today. 
                    {timeUntilReset ? ` Your quota will reset in ${timeUntilReset}. ` : ' Please try again tomorrow. '}
                    In offline mode, you can still ask about common farming topics!
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button 
                      onClick={() => handleQuickQuestion("What causes yellow leaves?")}
                      className="text-xs bg-white text-orange-700 px-3 py-1.5 rounded-full border border-orange-300 hover:bg-orange-50 transition-colors"
                    >
                      🍂 Yellow leaves
                    </button>
                    <button 
                      onClick={() => handleQuickQuestion("Fertilizer for cotton?")}
                      className="text-xs bg-white text-orange-700 px-3 py-1.5 rounded-full border border-orange-300 hover:bg-orange-50"
                    >
                      🧪 Cotton fertilizer
                    </button>
                    <button 
                      onClick={() => handleQuickQuestion("How to control aphids?")}
                      className="text-xs bg-white text-orange-700 px-3 py-1.5 rounded-full border border-orange-300 hover:bg-orange-50"
                    >
                      🐛 Aphid control
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Container - Increased Size */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-600 to-green-500 p-2 rounded-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">Farming Assistant</h2>
                <p className="text-xs text-gray-500">Ask me anything about crops, fertilizers, pests & more</p>
              </div>
            </div>
            <button
              onClick={() => setShowQuickQuestions(!showQuickQuestions)}
              className="flex items-center space-x-2 text-sm text-green-600 hover:text-green-700 bg-green-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>Quick Questions</span>
              {showQuickQuestions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Quick Questions Dropdown */}
          <AnimatePresence>
            {showQuickQuestions && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-b border-gray-200 bg-gray-50"
              >
                <div className="p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {quickQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickQuestion(q.text)}
                        className="flex items-center space-x-2 text-xs bg-white text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:border-green-500 hover:text-green-600 hover:shadow-sm transition-all"
                      >
                        <span>{q.icon}</span>
                        <span className="truncate">{q.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages Area - Increased Height */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4" ref={messagesEndRef}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 ${message.type === 'user' ? 'ml-3' : 'mr-3'}`}>
                    {message.type === 'user' ? (
                      <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center shadow-sm">
                        <User size={16} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center shadow-sm">
                        <Bot size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-green-600 to-green-500 text-white'
                        : message.isError
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 px-2">
                      {message.timestamp?.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {loading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center shadow-sm">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <p className="text-xs text-gray-600">
                        {rateLimited ? 'Getting offline response...' : 'Generating response...'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={rateLimited 
                  ? "Ask a farming question (offline mode)..." 
                  : "Ask any farming question... (e.g., 'How to control pests in cotton?')"}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                disabled={loading}
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-sm"
              >
                <Send size={18} />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-gray-400">
                {rateLimited 
                  ? '🔴 Offline Mode • Resets in 24h'
                  : '⚡ Free Tier • 250 requests/day • 20s cooldown'}
              </p>
              <p className="text-xs text-gray-400">
                Powered by Gemini AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;