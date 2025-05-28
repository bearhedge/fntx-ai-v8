
import React, { useState } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';

interface EnhancedMessageInputProps {
  onSendMessage: (message: string) => void;
}

export const EnhancedMessageInput = ({ onSendMessage }: EnhancedMessageInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about trades, market conditions, or strategy..."
              className="w-full resize-none border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
              rows={1}
              style={{
                minHeight: '48px',
                maxHeight: '120px',
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 120) + 'px';
              }}
            />
            
            <button
              type="button"
              className="absolute right-2 bottom-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Paperclip className="w-4 h-4" />
            </button>
          </div>
          
          <button
            type="button"
            className="p-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Mic className="w-5 h-5" />
          </button>
          
          <button
            type="submit"
            disabled={!message.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg p-3 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2 px-1">
          Press Enter to send, Shift+Enter for new line
        </p>
      </form>
    </div>
  );
};
