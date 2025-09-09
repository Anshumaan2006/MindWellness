import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle, Phone, Calendar } from 'lucide-react';
import { User as UserType } from '../App';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  riskLevel?: 'low' | 'medium' | 'high';
}

interface AIChatProps {
  user: UserType | null;
}

const AIChat: React.FC<AIChatProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello${user ? ` ${user.name}` : ''}! I'm your AI mental health support assistant. I'm here to listen, provide coping strategies, and help you access the right resources. Everything we discuss is confidential. How are you feeling today?`,
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Keywords and patterns for risk assessment
  const highRiskKeywords = ['suicide', 'kill myself', 'end it all', 'not worth living', 'hurt myself'];
  const mediumRiskKeywords = ['depressed', 'hopeless', 'can\'t cope', 'overwhelming', 'panic'];
  const copingStrategies = {
    anxiety: [
      'Try the 4-7-8 breathing technique: Breathe in for 4 counts, hold for 7, exhale for 8.',
      'Ground yourself using the 5-4-3-2-1 technique: 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, 1 thing you can taste.',
      'Practice progressive muscle relaxation starting from your toes and working up to your head.'
    ],
    stress: [
      'Take a 10-minute walk outside if possible. Fresh air and movement can help reset your mind.',
      'Try journaling about what\'s causing your stress. Writing it down can help organize your thoughts.',
      'Listen to calming music or nature sounds for a few minutes.'
    ],
    sadness: [
      'Remember that it\'s okay to feel sad. Emotions are temporary and will pass.',
      'Reach out to a friend or family member you trust.',
      'Engage in a small activity you usually enjoy, even if you don\'t feel like it right now.'
    ]
  };

  const assessRisk = (message: string): 'low' | 'medium' | 'high' => {
    const lowerMessage = message.toLowerCase();
    
    if (highRiskKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'high';
    }
    if (mediumRiskKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'medium';
    }
    return 'low';
  };

  const generateAIResponse = (userMessage: string, riskLevel: 'low' | 'medium' | 'high'): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (riskLevel === 'high') {
      return `I'm very concerned about what you're sharing with me. Your safety is the most important thing right now. Please reach out for immediate professional help:

• Call 988 (Suicide & Crisis Lifeline) - available 24/7
• Text "HELLO" to 741741 (Crisis Text Line)
• Call 911 if you're in immediate danger
• Contact campus security: (555) 123-4567

You don't have to go through this alone. These feelings can change, and help is available. Would you like me to help you find additional resources or connect you with a counselor?`;
    }
    
    if (riskLevel === 'medium') {
      let response = "I hear that you're going through a difficult time. These feelings are valid, and it's important that you're reaching out. ";
      
      if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
        response += `Here are some immediate anxiety coping strategies:

${copingStrategies.anxiety[Math.floor(Math.random() * copingStrategies.anxiety.length)]}

Would you like to try this technique now, or would you prefer to talk about what's making you anxious?`;
      } else if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed')) {
        response += `Here's a stress management technique you can try:

${copingStrategies.stress[Math.floor(Math.random() * copingStrategies.stress.length)]}

Remember, it's okay to take things one step at a time. What feels most overwhelming right now?`;
      } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed')) {
        response += `I want you to know that your feelings are valid. Here's something that might help:

${copingStrategies.sadness[Math.floor(Math.random() * copingStrategies.sadness.length)]}

Would you like to talk about what's been contributing to these feelings?`;
      } else {
        response += "I'd like to help you work through this. Can you tell me more about what's been bothering you? Sometimes talking through our thoughts can help us process them better.";
      }
      
      response += "\n\nIf you'd like to speak with a professional counselor, I can help you schedule an appointment.";
      return response;
    }
    
    // Low risk responses
    const responses = [
      "Thank you for sharing that with me. It sounds like you're being thoughtful about your situation. What would be most helpful for you right now?",
      "I appreciate you opening up. What you're experiencing is more common than you might think. How long have you been feeling this way?",
      "That takes courage to share. What do you think would help you feel more supported in this situation?",
      "I'm here to listen. Would you like to explore some strategies for managing these feelings, or would you prefer to talk more about what's going on?",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Assess risk level
    const riskLevel = assessRisk(userMessage.content);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: generateAIResponse(userMessage.content, riskLevel),
      sender: 'ai',
      timestamp: new Date(),
      riskLevel,
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <Bot className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Mental Health Support</h2>
          <p className="text-gray-600 mb-6">
            Our AI assistant provides immediate support and coping strategies. Please log in to start a confidential conversation.
          </p>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Login to Chat
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">AI Mental Health Support</h2>
            <p className="text-sm text-gray-500">Confidential • Available 24/7</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link
            to="/booking"
            className="bg-teal-100 text-teal-700 px-3 py-1 rounded-md hover:bg-teal-200 transition-colors text-sm flex items-center space-x-1"
          >
            <Calendar className="h-4 w-4" />
            <span>Book Counselor</span>
          </Link>
          <a
            href="tel:988"
            className="bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200 transition-colors text-sm flex items-center space-x-1"
          >
            <Phone className="h-4 w-4" />
            <span>Crisis: 988</span>
          </a>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender === 'ai' && (
              <div className="bg-blue-500 p-2 rounded-lg">
                <Bot className="h-5 w-5 text-white" />
              </div>
            )}
            
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : `bg-white text-gray-800 shadow-sm ${
                      message.riskLevel === 'high' ? 'border-l-4 border-red-500' :
                      message.riskLevel === 'medium' ? 'border-l-4 border-yellow-500' : ''
                    }`
              }`}
            >
              {message.riskLevel === 'high' && (
                <div className="flex items-center space-x-1 text-red-600 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Crisis Support Alert</span>
                </div>
              )}
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>

            {message.sender === 'user' && (
              <div className="bg-blue-600 p-2 rounded-lg">
                <User className="h-5 w-5 text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind... (Press Enter to send, Shift+Enter for new line)"
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          This AI provides support but is not a replacement for professional therapy. 
          In crisis situations, please call 988 or emergency services.
        </p>
      </div>
    </div>
  );
};

export default AIChat;