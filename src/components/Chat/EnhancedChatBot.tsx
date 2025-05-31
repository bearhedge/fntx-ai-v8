
import React, { useState, useRef, useEffect } from 'react';
import { EnhancedMessage } from './EnhancedMessage';
import { EnhancedMessageInput } from './EnhancedMessageInput';
import { Message } from '../../types/trading';
import { Monitor, Maximize2 } from 'lucide-react';

interface EnhancedChatBotProps {
  onShowContextPanel?: (show: boolean) => void;
  onToggleContextPanel?: () => void;
  showContextPanel?: boolean;
  isContextPanelExpanded?: boolean;
}

export const EnhancedChatBot = ({ 
  onShowContextPanel,
  onToggleContextPanel,
  showContextPanel,
  isContextPanelExpanded
}: EnhancedChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: 'Hello Jimmy Hou\nWhat can I do for you?',
    sender: 'ai',
    timestamp: new Date(),
    type: 'text'
  }]);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, userMessage]);

    // Show context panel and start processing for any message
    setIsProcessing(true);
    onShowContextPanel?.(true);

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
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="h-screen flex flex-col bg-white relative">
      {/* Main chat area with fixed height and scroll */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full min-h-0">
        <div className="flex-1 overflow-y-auto p-8 pb-4">
          {messages.length === 1 ? (
            // Welcome state
            <div className="h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl font-medium text-gray-800 mb-4">Hello Jimmy Hou</h1>
              <p className="text-xl text-gray-500 mb-8">
                What can I do for you?
              </p>
              
              {/* Suggestion buttons */}
              <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors">Option 1</button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors">Option 2 ↗</button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors">Option 3 ↗</button>
              </div>
            </div>
          ) : (
            // Messages view
            <div className="space-y-6">
              {messages.map(message => (
                <EnhancedMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* Message input fixed at the bottom */}
        <div className="flex-shrink-0">
          <EnhancedMessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>

      {/* Context Panel Collapsed State */}
      {showContextPanel && !isContextPanelExpanded && (
        <div className="absolute bottom-24 right-8 z-10">
          <div 
            className="bg-gray-800 text-white rounded-lg px-4 py-3 flex items-center space-x-3 cursor-pointer hover:bg-gray-700 transition-colors shadow-lg"
            onClick={onToggleContextPanel}
          >
            <Monitor className="w-4 h-4" />
            <span className="text-sm font-medium">Manus's Computer</span>
            <Maximize2 className="w-4 h-4" />
          </div>
          {isProcessing && (
            <div className="mt-2 text-xs text-gray-500 text-center">
              Processing...
            </div>
          )}
        </div>
      )}
    </div>
  );
};
