
import React from 'react';
import { EnhancedChatBot } from '../Chat/EnhancedChatBot';

export const ContextPanel = () => {
  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
      <EnhancedChatBot />
    </div>
  );
};
