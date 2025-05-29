
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ContextPanelProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const ContextPanel = ({ isOpen: externalIsOpen, onToggle }: ContextPanelProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const handleToggle = onToggle || (() => setInternalIsOpen(!internalIsOpen));

  return (
    <div className={`bg-white border-l border-gray-200 flex transition-all duration-300 ${
      isOpen ? 'w-80' : 'w-12'
    }`}>
      <button
        onClick={handleToggle}
        className="w-12 flex items-center justify-center border-r border-gray-200 hover:bg-gray-50 transition-colors"
      >
        {isOpen ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>
      
      {isOpen && (
        <div className="flex-1 p-6 overflow-auto">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Status</h2>
            <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Market Status:</span>
                  <span className="font-semibold text-green-600">Open</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SPY Price:</span>
                  <span className="font-semibold">$452.75</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VIX:</span>
                  <span className="font-semibold">16.42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Recommendation:</span>
                  <span className="font-semibold text-blue-600">1h 21m</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Account Summary</h3>
              <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Balance:</span>
                    <span className="font-semibold">$25,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available:</span>
                    <span className="font-semibold">$18,500.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily P&L:</span>
                    <span className="font-semibold text-green-600">+$245.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Win Rate:</span>
                    <span className="font-semibold">68%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
