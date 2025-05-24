
import React from 'react';
import { Bot, User } from 'lucide-react';

interface MessageProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
  };
}

const Message = ({ message }: MessageProps) => {
  const isUser = message.sender === 'user';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-gray-600' : 'bg-gray-300'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-gray-600" />
        )}
      </div>

      {/* Message Bubble */}
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${isUser ? 'text-right' : ''}`}>
        <div className={`rounded-lg px-4 py-3 shadow-sm border transition-all duration-200 hover:shadow-md ${
          isUser 
            ? 'bg-gray-600 text-white border-gray-600' 
            : 'bg-white text-gray-800 border-gray-200'
        }`}>
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        
        {/* Timestamp */}
        <p className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default Message;
