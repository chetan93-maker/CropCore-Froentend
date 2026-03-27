import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, X, Send, Bot, User, 
  Lightbulb, Cloud, TrendingUp, Maximize2,
  Minimize2, HelpCircle, Sparkles
} from 'lucide-react';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [weatherContext, setWeatherContext] = useState(null);
  const [marketContext, setMarketContext] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { user } = useAuth();

  const quickQuestions = [
    "Which crop in summer?",
    "Fertilizer for cotton?",
    "How to increase yield?",
    "Natural pest control",
    "Best time for wheat",
    "Organic farming tips"
  ];

  useEffect(() => {
    if (user) {
      // Welcome message with farmer's name
      setMessages([
        {
          id: 1,
          type: 'bot',
          text: `👋 Namaste ${user.name}! I'm your AI Farming Assistant. I can help you with:`,
          suggestions: [
            "🌱 Crop selection based on season",
            "🧪 Fertilizer recommendations",
            "📈 Yield improvement tips",
            "🐛 Pest control solutions",
            "🌾 Organic farming advice",
            "💧 Irrigation scheduling"
          ],
          timestamp: new Date()
        }
      ]);
      
      // Fetch suggestions and context
      fetchSuggestions();
      fetchWeatherContext();
      fetchMarketContext();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchSuggestions = async () => {
    try {
      const response = await api.get('/api/chat/suggestions');
      setSuggestions(response.data.suggestions || []);
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
  };

  const fetchWeatherContext = async () => {
    try {
      const response = await api.get('/api/weather/current/Mumbai');
      const data = response.data;
      setWeatherContext({
        temp: data.main.temp,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        humidity: data.main.humidity
      });
    } catch (error) {
      console.error('Failed to fetch weather:', error);
    }
  };

  const fetchMarketContext = async () => {
    try {
      const response = await api.get('/api/market/summary');
      setMarketContext(response.data);
    } catch (error) {
      console.error('Failed to fetch market:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.post('/api/chat/ask', {
        query: input
      });

      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: response.data.response,
        suggestions: response.data.suggestions || [],
        weather: response.data.weather,
        marketPrice: response.data.marketPrice,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: "Sorry, I'm having trouble connecting. Please try again.",
        isError: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Failed to get response');
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
    setTimeout(() => handleSendMessage(), 100);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50"
      >
        <MessageCircle size={24} />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden
        ${isExpanded ? 'w-[800px] h-[600px]' : 'w-96 h-[500px]'}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 text-white flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot size={24} />
          <div>
            <h3 className="font-semibold">AI Farming Assistant</h3>
            <p className="text-xs opacity-90">Powered by Gemini AI</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleExpand}
            className="p-1 hover:bg-green-700 rounded-lg transition-colors"
          >
            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-green-700 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Context Bar (Weather + Market) */}
      {(weatherContext || marketContext) && (
        <div className="bg-gray-50 border-b border-gray-200 p-2 flex items-center space-x-4 text-xs">
          {weatherContext && (
            <div className="flex items-center space-x-1">
              <Cloud size={14} className="text-blue-500" />
              <span>{Math.round(weatherContext.temp)}°C, {weatherContext.condition}</span>
            </div>
          )}
          {marketContext && (
            <div className="flex items-center space-x-1">
              <TrendingUp size={14} className="text-green-600" />
              <span>Avg: ₹{marketContext.average}</span>
            </div>
          )}
          <div className="flex items-center space-x-1 ml-auto">
            <Sparkles size={14} className="text-yellow-500" />
            <span className="text-gray-600">AI Ready</span>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 ${message.type === 'user' ? 'ml-3' : 'mr-3'}`}>
                {message.type === 'user' ? (
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                )}
              </div>
              <div>
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-green-600 text-white'
                      : message.isError
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
                
                {/* Suggestions from bot */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickQuestion(suggestion)}
                        className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full hover:bg-green-100 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center mb-2">
          <Lightbulb size={14} className="text-yellow-500 mr-1" />
          <span className="text-xs font-medium text-gray-600">Quick Questions</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickQuestion(question)}
              className="text-xs bg-white text-gray-700 px-3 py-1 rounded-full border border-gray-200 hover:border-green-600 hover:text-green-600 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about farming..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Ask about crops, fertilizers, pests, weather, or market prices
        </p>
      </div>
    </motion.div>
  );
};

export default ChatbotWidget;