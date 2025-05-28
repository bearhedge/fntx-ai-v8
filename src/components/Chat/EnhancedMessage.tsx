
import React from 'react';
import { Bot, User, Clock, TrendingUp } from 'lucide-react';
import { ChatMessage, TradeOption, WaitingPeriod } from '../../types/trading';
import { TradeCard } from '../Trading/TradeCard';
import { WaitingPeriodTimer } from '../Trading/WaitingPeriodTimer';

interface EnhancedMessageProps {
  message: ChatMessage;
  onTradeSelect?: (tradeId: string) => void;
}

export const EnhancedMessage = ({ message, onTradeSelect }: EnhancedMessageProps) => {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getAvatarBg = () => {
    if (isUser) return 'bg-gray-600';
    if (isSystem) return 'bg-blue-600';
    return 'bg-gray-300';
  };

  const getMessageBg = () => {
    if (isUser) return 'bg-blue-50 border-blue-200';
    if (isSystem) return 'bg-blue-100 border-blue-300';
    return 'bg-white border-gray-200';
  };

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getAvatarBg()}`}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Message Bubble */}
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${isUser ? 'text-right' : ''}`}>
        <div className={`rounded-lg px-4 py-3 shadow-sm border transition-all duration-200 hover:shadow-md ${getMessageBg()}`}>
          <p className="text-sm leading-relaxed text-gray-800">{message.content}</p>
          
          {/* Embedded Components */}
          {message.type === 'waiting-period' && message.data && (
            <div className="mt-3">
              <WaitingPeriodTimer waitingPeriod={message.data as WaitingPeriod} />
            </div>
          )}
          
          {message.type === 'trade-options' && message.data && (
            <div className="mt-3 space-y-3">
              {(message.data as TradeOption[]).map((trade) => (
                <TradeCard 
                  key={trade.id} 
                  trade={trade} 
                  onSelect={() => onTradeSelect?.(trade.id)}
                  compact={true}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Timestamp */}
        <p className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};
