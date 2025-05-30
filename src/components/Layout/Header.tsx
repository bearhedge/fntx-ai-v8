import React from 'react';
import { Bot, Settings, User } from 'lucide-react';
export const Header = () => {
  return <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Bot className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800"></h1>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-sm text-gray-600">
          <span className="font-medium">SPY:</span> $452.75 
          <span className="ml-4 font-medium">VIX:</span> 16.42
        </div>
        <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>;
};