
import React, { useState, useRef, useEffect } from 'react';
import { EnhancedMessage } from './EnhancedMessage';
import { EnhancedMessageInput } from './EnhancedMessageInput';
import { Message } from '../../types/trading';
import { Monitor, Maximize2, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
              {/* FNTX Logo above welcome message */}
              <div className="mb-8">
                <svg width="100" height="54" viewBox="0 0 640 347" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M205.848 115.154H282.121V141.048H256.978V253.159H230.334V141.048H205.848V115.154Z" fill="#374151" />
                  <path d="M85.0049 115.154H110.148L169.346 205.969V115.154H195.615V253.159H170.378L111.274 162.626V253.159H85.0049V115.154Z" fill="#374151" />
                  <path d="M0.656494 115.154H69.1427V140.766H26.6437V165.815H69.1427V191.052H26.6437V253.159H0.656494V115.154Z" fill="#374151" />
                  <path d="M232.712 141.035V115.175H314.998L356.238 167.605C356.238 167.605 441.088 55.0648 639.478 0.53479C639.478 0.53479 477.868 51.5648 352.048 212.345C338.068 194.175 292.628 141.045 292.628 141.045H270.057H259.972H232.712V141.035Z" fill="#374151" />
                  <path d="M319.538 189.975L341.558 216.885L212.938 346.555L319.538 189.975Z" fill="#9CA3AF" />
                  <path d="M361.838 215.715L403.078 263.365H445.718L384.198 186.475L361.838 215.715Z" fill="#9CA3AF" />
                </svg>
              </div>
              
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
            // Messages view - aligned to the left
            <div className="space-y-6 ml-0">
              {messages.map((message, index) => {
                // Show FNTX logo above every AI message
                const showLogo = message.sender === 'ai';
                return (
                  <div key={message.id}>
                    {showLogo && (
                      <div className="flex justify-start mb-4">
                        <svg width="100" height="54" viewBox="0 0 640 347" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M205.848 115.154H282.121V141.048H256.978V253.159H230.334V141.048H205.848V115.154Z" fill="#374151" />
                          <path d="M85.0049 115.154H110.148L169.346 205.969V115.154H195.615V253.159H170.378L111.274 162.626V253.159H85.0049V115.154Z" fill="#374151" />
                          <path d="M0.656494 115.154H69.1427V140.766H26.6437V165.815H69.1427V191.052H26.6437V253.159H0.656494V115.154Z" fill="#374151" />
                          <path d="M232.712 141.035V115.175H314.998L356.238 167.605C356.238 167.605 441.088 55.0648 639.478 0.53479C639.478 0.53479 477.868 51.5648 352.048 212.345C338.068 194.175 292.628 141.045 292.628 141.045H270.057H259.972H232.712V141.035Z" fill="#374151" />
                          <path d="M319.538 189.975L341.558 216.885L212.938 346.555L319.538 189.975Z" fill="#9CA3AF" />
                          <path d="M361.838 215.715L403.078 263.365H445.718L384.198 186.475L361.838 215.715Z" fill="#9CA3AF" />
                        </svg>
                      </div>
                    )}
                    <EnhancedMessage message={message} />
                  </div>
                );
              })}
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
