import api from './api';

class ChatbotService {
  async sendMessage(query) {
    try {
      const response = await api.post('/api/chat/ask', { query });
      return response.data;
    } catch (error) {
      console.error('Chatbot service error:', error);
      throw error;
    }
  }

  async getSuggestions() {
    try {
      const response = await api.get('/api/chat/suggestions');
      return response.data.suggestions || [];
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
      return [];
    }
  }

  async getWeatherContext(location = 'Mumbai') {
    try {
      const response = await api.get(`/api/weather/current/${location}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch weather:', error);
      return null;
    }
  }

  async getMarketContext() {
    try {
      const response = await api.get('/api/market/summary');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch market:', error);
      return null;
    }
  }

  // Predefined questions for quick access
  getQuickQuestions() {
    return [
      { id: 1, question: "Which crop is best for summer?", category: "crops" },
      { id: 2, question: "What fertilizer should I use for cotton?", category: "fertilizer" },
      { id: 3, question: "How can I increase my crop yield?", category: "yield" },
      { id: 4, question: "Natural pest control methods?", category: "pests" },
      { id: 5, question: "Best time to plant wheat?", category: "seasonal" },
      { id: 6, question: "Organic farming tips for beginners?", category: "organic" },
      { id: 7, question: "How to test soil health?", category: "soil" },
      { id: 8, question: "Water management techniques for dry season?", category: "irrigation" }
    ];
  }

  // Get category-specific questions
  getQuestionsByCategory(category) {
    const questions = {
      crops: [
        "Which crop is most profitable in this season?",
        "What are the best drought-resistant crops?",
        "Which crops require less water?",
        "Best companion plants for vegetables"
      ],
      fertilizer: [
        "How much NPK for wheat crop?",
        "Organic fertilizer recommendations",
        "When to apply second dose of fertilizer?",
        "Signs of nitrogen deficiency"
      ],
      pests: [
        "How to control aphids naturally?",
        "Best pesticide for cotton bollworms",
        "Organic solution for fungus on leaves",
        "How to identify pest infestation early?"
      ],
      soil: [
        "How to improve soil fertility?",
        "What causes yellowing of leaves?",
        "Soil pH testing methods",
        "How to add organic matter to soil?"
      ],
      irrigation: [
        "Best irrigation method for rice",
        "How often to water vegetable garden?",
        "Signs of over-watering in plants",
        "Drip irrigation benefits and cost"
      ]
    };
    
    return questions[category] || [];
  }
}

export default new ChatbotService();