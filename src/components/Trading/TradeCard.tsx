
import React from 'react';
import { TradeOption } from '../../types/trading';
import { TrendingDown, TrendingUp, Clock } from 'lucide-react';

interface TradeCardProps {
  trade: TradeOption;
  onSelect: () => void;
  compact?: boolean;
}

export const TradeCard = ({ trade, onSelect, compact = false }: TradeCardProps) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CONSERVATIVE': return 'bg-blue-600';
      case 'MODERATE': return 'bg-amber-500';
      case 'AGGRESSIVE': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const formatExpiration = (date: Date) => {
    const now = new Date();
    const diffHours = Math.abs(date.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 24) {
      return `Expiring in ${Math.round(diffHours)}h`;
    }
    return date.toLocaleDateString();
  };

  if (compact) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
        <div className={`text-xs font-semibold text-white px-2 py-1 rounded mb-2 ${getRiskColor(trade.riskLevel)}`}>
          {trade.riskLevel}
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-800">{trade.symbol} ${trade.strike} {trade.type}</span>
          <span className="text-xs text-gray-600">{formatExpiration(trade.expiration)}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div>
            <span className="text-gray-600">Premium:</span>
            <span className="ml-1 font-semibold">${trade.premium}</span>
          </div>
          <div>
            <span className="text-gray-600">Probability:</span>
            <span className="ml-1 font-semibold">{trade.probability}% OTM</span>
          </div>
        </div>
        
        <button
          onClick={onSelect}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-3 rounded transition-colors"
        >
          Select
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className={`text-sm font-semibold text-white px-3 py-1 rounded mb-4 inline-block ${getRiskColor(trade.riskLevel)}`}>
        {trade.riskLevel}
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {trade.symbol} ${trade.strike} {trade.type}
        </h3>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          {formatExpiration(trade.expiration)}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-xs font-semibold text-gray-600 uppercase mb-1">Premium</div>
          <div className="text-lg font-semibold text-gray-800">${trade.premium}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-xs font-semibold text-gray-600 uppercase mb-1">Contracts</div>
          <div className="text-lg font-semibold text-gray-800">{trade.contracts}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-xs font-semibold text-gray-600 uppercase mb-1">Probability</div>
          <div className="text-lg font-semibold text-gray-800">{trade.probability}% OTM</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-xs font-semibold text-gray-600 uppercase mb-1">Total Premium</div>
          <div className="text-lg font-semibold text-gray-800">${trade.totalPremium}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-xs font-semibold text-gray-600 uppercase mb-1">Risk/Reward</div>
          <div className="text-lg font-semibold text-gray-800">{trade.riskReward}</div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-3 rounded mb-4">
        <div className="text-xs font-semibold text-gray-600 uppercase mb-2">Strategy Details</div>
        <p className="text-sm text-gray-800">{trade.strategy}</p>
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={onSelect}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded transition-colors"
        >
          Select
        </button>
        <button className="px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-50 transition-colors">
          View Details
        </button>
        <button className="px-4 py-3 text-gray-600 font-semibold rounded hover:bg-gray-50 transition-colors">
          Modify
        </button>
      </div>
    </div>
  );
};
