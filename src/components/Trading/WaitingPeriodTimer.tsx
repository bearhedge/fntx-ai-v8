
import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp } from 'lucide-react';
import { WaitingPeriod } from '../../types/trading';

interface WaitingPeriodTimerProps {
  waitingPeriod: WaitingPeriod;
}

export const WaitingPeriodTimer = ({ waitingPeriod }: WaitingPeriodTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(waitingPeriod.remainingTime);
  const [progress, setProgress] = useState(waitingPeriod.progress);

  useEffect(() => {
    if (!waitingPeriod.isActive) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
      
      setProgress(prev => {
        const newProgress = ((waitingPeriod.totalTime - timeRemaining) / waitingPeriod.totalTime) * 100;
        return Math.min(100, newProgress);
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [waitingPeriod.isActive, waitingPeriod.totalTime, timeRemaining]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins}m`;
    }
    return `${hours}h ${mins}m`;
  };

  if (!waitingPeriod.isActive) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="flex items-center text-green-700">
          <TrendingUp className="w-4 h-4 mr-2" />
          <span className="font-semibold">Waiting period complete - Ready to trade!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center text-blue-700">
          <Clock className="w-4 h-4 mr-2" />
          <span className="font-semibold">Waiting Period</span>
        </div>
        <span className="text-sm font-semibold text-blue-700">
          {formatTime(timeRemaining)} remaining
        </span>
      </div>
      
      <div className="mb-2">
        <div className="bg-blue-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-blue-600 mt-1">
          {Math.round(progress)}% complete
        </div>
      </div>
      
      <p className="text-xs text-blue-700">
        {waitingPeriod.rationale}
      </p>
    </div>
  );
};
