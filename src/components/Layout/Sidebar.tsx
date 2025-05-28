
import React from 'react';
import { BarChart3, MessageSquare, TrendingUp, Settings, FileText } from 'lucide-react';

const navItems = [
  { icon: MessageSquare, label: 'Chat Assistant', active: true },
  { icon: TrendingUp, label: 'Positions', active: false },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: FileText, label: 'Trade History', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export const Sidebar = () => {
  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Navigation</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                item.active
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 p-6 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Account Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Balance</span>
              <span className="text-sm font-semibold text-gray-800">$2,000,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Available</span>
              <span className="text-sm font-semibold text-gray-800">$1,850,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">P&L Today</span>
              <span className="text-sm font-semibold text-green-600">+$4,850</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
