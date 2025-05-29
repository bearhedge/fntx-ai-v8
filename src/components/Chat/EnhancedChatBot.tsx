
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

    // Handle special commands
    if (content.toLowerCase().includes('show status') || content.toLowerCase().includes('context panel')) {
      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Context panel visibility toggled. You can see your current status and account information on the right side.',
        sender: 'system',
        timestamp: new Date(),
        type: 'text'
      };
      setTimeout(() => {
        setMessages(prev => [...prev, systemMessage]);
      }, 500);
      return;
    }

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
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold text-gray-800">Trading Assistant</h2>
        <p className="text-sm text-gray-600">Your AI-powered trading companion</p>
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
