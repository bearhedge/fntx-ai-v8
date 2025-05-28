
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, TradeOption, WaitingPeriod } from '../../types/trading';
import { EnhancedMessage } from './EnhancedMessage';
import { EnhancedMessageInput } from './EnhancedMessageInput';
import { Bot, Clock, TrendingUp } from 'lucide-react';

export const EnhancedChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Welcome! I'm your AI trading assistant. I've analyzed current market conditions and recommend waiting 1 hour 21 minutes before making any new trades.",
      sender: 'system',
      timestamp: new Date(),
      type: 'text',
    },
    {
      id: '2',
      content: "Based on current SPY volatility and market conditions, waiting will improve your probability of success. The market is showing slight consolidation patterns that should resolve within the next hour.",
      sender: 'ai',
      timestamp: new Date(),
      type: 'waiting-period',
      data: {
        isActive: true,
        remainingTime: 81, // 1h 21m in minutes
        totalTime: 120, // 2 hours total
        progress: 32.5, // 32.5% complete
        rationale: "Market consolidation expected to resolve within 1 hour based on technical analysis"
      } as WaitingPeriod
    },
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response with trade options
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Here are three trade options I recommend based on current market conditions:",
        sender: 'ai',
        timestamp: new Date(),
        type: 'trade-options',
        data: [
          {
            id: 'trade-1',
            type: 'PUT' as const,
            symbol: 'SPY',
            strike: 443,
            premium: 1.15,
            contracts: 1,
            expiration: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
            riskLevel: 'CONSERVATIVE' as const,
            probability: 92,
            totalPremium: 115,
            riskReward: '1:3.2',
            strategy: 'Sell 1 contract of SPY $443 Put expiring today. Stop-loss at $3.45 (3x premium). Take-profit at $0.58 (50% of premium).',
            stopLoss: 3.45,
            takeProfit: 0.58,
          },
          {
            id: 'trade-2',
            type: 'PUT' as const,
            symbol: 'SPY',
            strike: 445,
            premium: 1.85,
            contracts: 1,
            expiration: new Date(Date.now() + 6 * 60 * 60 * 1000),
            riskLevel: 'MODERATE' as const,
            probability: 85,
            totalPremium: 185,
            riskReward: '1:2.8',
            strategy: 'Sell 1 contract of SPY $445 Put expiring today. Moderate risk with higher premium collection.',
            stopLoss: 5.55,
            takeProfit: 0.93,
          },
          {
            id: 'trade-3',
            type: 'PUT' as const,
            symbol: 'SPY',
            strike: 447,
            premium: 2.65,
            contracts: 1,
            expiration: new Date(Date.now() + 6 * 60 * 60 * 1000),
            riskLevel: 'AGGRESSIVE' as const,
            probability: 75,
            totalPremium: 265,
            riskReward: '1:2.2',
            strategy: 'Sell 1 contract of SPY $447 Put expiring today. Higher risk, higher premium strategy.',
            stopLoss: 7.95,
            takeProfit: 1.33,
          },
        ] as TradeOption[]
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleTradeSelection = (tradeId: string) => {
    const confirmationMessage: ChatMessage = {
      id: Date.now().toString(),
      content: `Great choice! I've prepared the trade details for SPY PUT ${tradeId}. Would you like me to execute this trade?`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'text',
    };
    setMessages(prev => [...prev, confirmationMessage]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">AI Trading Assistant</h2>
          <p className="text-sm text-gray-600">Always here to optimize your trades</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <EnhancedMessage 
            key={message.id} 
            message={message} 
            onTradeSelect={handleTradeSelection}
          />
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-gray-600" />
            </div>
            <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200 max-w-xs">
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

      {/* Message Input */}
      <div className="border-t border-gray-200 bg-white">
        <EnhancedMessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
