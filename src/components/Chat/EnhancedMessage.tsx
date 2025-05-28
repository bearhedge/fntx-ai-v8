
import React from 'react';
import { Message } from '../../types/trading';
import { WaitingPeriodTimer } from '../Trading/WaitingPeriodTimer';

interface EnhancedMessageProps {
  message: Message;
}

export const EnhancedMessage = ({ message }: EnhancedMessageProps) => {
  const isAI = message.sender === 'ai';
  const isSystem = message.sender === 'system';

  return (
    <div className={`flex ${isAI || isSystem ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          isSystem
            ? 'bg-gray-50 text-gray-600 w-full text-sm'
            : isAI
            ? 'bg-white border border-gray-200 border-l-4 border-l-blue-600'
            : 'bg-blue-50 text-blue-900'
        }`}
      >
        <div className="text-sm font-medium text-gray-800 mb-2">
          {message.content}
        </div>
        
        {message.type === 'waiting-period' && message.waitingPeriod && (
          <div className="mt-3">
            <WaitingPeriodTimer
              totalMinutes={message.waitingPeriod.totalMinutes}
              remainingMinutes={message.waitingPeriod.remainingMinutes}
              reason={message.waitingPeriod.reason}
            />
          </div>
        )}
        
        <div className="text-xs text-gray-500 mt-2">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
