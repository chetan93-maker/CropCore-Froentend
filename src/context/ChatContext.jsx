import React, { createContext, useContext, useState, useReducer } from 'react';

const ChatContext = createContext();

const initialState = {
  messages: [],
  isOpen: false,
  isExpanded: false,
  unreadCount: 0,
  suggestions: [],
  context: {
    weather: null,
    market: null,
    location: 'Mumbai'
  }
};

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        unreadCount: action.payload.type === 'bot' && !state.isOpen 
          ? state.unreadCount + 1 
          : state.unreadCount
      };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'TOGGLE_OPEN':
      return { ...state, isOpen: !state.isOpen, unreadCount: 0 };
    case 'SET_OPEN':
      return { ...state, isOpen: action.payload, unreadCount: 0 };
    case 'TOGGLE_EXPAND':
      return { ...state, isExpanded: !state.isExpanded };
    case 'SET_SUGGESTIONS':
      return { ...state, suggestions: action.payload };
    case 'SET_CONTEXT':
      return { ...state, context: { ...state.context, ...action.payload } };
    default:
      return state;
  }
};

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const addMessage = (message) => {
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  };

  const toggleChat = () => {
    dispatch({ type: 'TOGGLE_OPEN' });
  };

  const openChat = () => {
    dispatch({ type: 'SET_OPEN', payload: true });
  };

  const closeChat = () => {
    dispatch({ type: 'SET_OPEN', payload: false });
  };

  const toggleExpand = () => {
    dispatch({ type: 'TOGGLE_EXPAND' });
  };

  const setSuggestions = (suggestions) => {
    dispatch({ type: 'SET_SUGGESTIONS', payload: suggestions });
  };

  const setContext = (context) => {
    dispatch({ type: 'SET_CONTEXT', payload: context });
  };

  const clearMessages = () => {
    dispatch({ type: 'SET_MESSAGES', payload: [] });
  };

  return (
    <ChatContext.Provider value={{
      ...state,
      addMessage,
      toggleChat,
      openChat,
      closeChat,
      toggleExpand,
      setSuggestions,
      setContext,
      clearMessages
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};