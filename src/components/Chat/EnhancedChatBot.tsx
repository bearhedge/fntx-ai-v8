
import React, { useState } from 'react';
import { EnhancedMessage } from './EnhancedMessage';
import { EnhancedMessageInput } from './EnhancedMessageInput';
import { Message } from '../../types/trading';

export const EnhancedChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: 'Hello Jimmy Hou\nWhat can I do for you?',
    sender: 'ai',
    timestamp: new Date(),
    type: 'text'
  }]);

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
        content: 'I understand your request. Let me analyze and provide recommendations.',
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return <div className="h-full flex flex-col bg-white">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <div className="flex-1 overflow-y-auto p-8 pt-24">
          {messages.length === 1 ?
        // Welcome state
        <div className="h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl font-medium text-gray-800 mb-4">Hello</h1>
              <p className="text-xl text-gray-500 mb-8">
                What can I do for you?
              </p>
              
              {/* Suggestion buttons */}
              <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors">Option 1</button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors">Option 2 ↗</button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors">Option 3 ↗</button>
              </div>
            </div> :
        // Messages view
        <div className="space-y-6">
              {messages.map(message => <EnhancedMessage key={message.id} message={message} />)}
            </div>}
        </div>
        
        {/* Message input - removed border-t */}
        <EnhancedMessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>;
};
