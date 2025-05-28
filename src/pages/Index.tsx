
import React from 'react';
import { AppLayout } from '../components/Layout/AppLayout';

const Index = () => {
  return (
    <AppLayout>
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Trading Assistant</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your AI-powered trading companion is ready to help optimize your strategies.
          </p>
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Status</h2>
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
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
