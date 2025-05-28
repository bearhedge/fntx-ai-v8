
import React, { useState } from 'react';
import { EnhancedMessage } from './EnhancedMessage';
import { EnhancedMessageInput } from './EnhancedMessageInput';
import { Message } from '../../types/trading';

export const EnhancedChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to Trading Assistant! I\'m here to help you optimize your trading strategies.',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    },
    {
      id: '2',
      content: 'Based on current market conditions, I recommend waiting 1 hour 21 minutes before considering new positions.',
      sender: 'ai',
      timestamp: new Date(),
      type: 'waiting-period',
      waitingPeriod: {
        totalMinutes: 81,
        remainingMinutes: 81,
        reason: 'Market volatility is elevated due to upcoming economic data release.'
      }
    }
  ]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I understand your request. Let me analyze the current market conditions and provide recommendations.',
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Trading Assistant</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <EnhancedMessage key={message.id} message={message} />
        ))}
      </div>
      
      <div className="border-t border-gray-200">
        <EnhancedMessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
