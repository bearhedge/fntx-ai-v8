
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { WithdrawalForm } from './WithdrawalForm';
import { WithdrawalHistory } from './WithdrawalHistory';
import { FundBreakdown } from './FundBreakdown';
import { WithdrawalRecord, WithdrawalDestination, AvailabilityBreakdown } from '@/types/trading';

interface WithdrawalTabProps {
  availableBalance: number;
  withdrawalHistory: WithdrawalRecord[];
  availabilityBreakdown: AvailabilityBreakdown;
}

export const WithdrawalTab: React.FC<WithdrawalTabProps> = ({
  availableBalance,
  withdrawalHistory,
  availabilityBreakdown
}) => {
  const [activeView, setActiveView] = useState<'dashboard' | 'form' | 'history'>('dashboard');

  const sampleDestinations: WithdrawalDestination[] = [
    {
      id: '1',
      type: 'bank',
      name: 'Bank Account',
      details: '****1234',
      lastUsed: '2025-05-28'
    },
    {
      id: '2',
      type: 'crypto',
      name: 'Crypto Wallet',
      details: '0x1234...abcd',
      lastUsed: '2025-05-15'
    }
  ];

  const pendingAmount = withdrawalHistory
    .filter(w => w.status === 'Pending')
    .reduce((sum, w) => sum + w.amount, 0);

  const totalWithdrawnYTD = withdrawalHistory
    .filter(w => w.status === 'Completed' && new Date(w.date).getFullYear() === 2025)
    .reduce((sum, w) => sum + w.amount, 0);

  const handleWithdrawal = (amount: number, destinationId: string) => {
    console.log('Processing withdrawal:', { amount, destinationId });
    setActiveView('history');
  };

  if (activeView === 'form') {
    return (
      <div className="px-1">
        <WithdrawalForm
          availableBalance={availableBalance}
          destinations={sampleDestinations}
          onSubmit={handleWithdrawal}
          onCancel={() => setActiveView('dashboard')}
        />
      </div>
    );
  }

  if (activeView === 'history') {
    return (
      <div className="px-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Withdrawal History</h3>
          <Button variant="outline" onClick={() => setActiveView('dashboard')} className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
            Back to Dashboard
          </Button>
        </div>
        <WithdrawalHistory withdrawals={withdrawalHistory} />
      </div>
    );
  }

  return (
    <div className="px-1 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Available for Withdrawal</div>
          <div className="text-2xl font-medium text-gray-900">${availableBalance.toLocaleString()}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Pending Release</div>
          <div className="text-2xl font-medium text-gray-900">${pendingAmount.toLocaleString()}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Total Withdrawn (YTD)</div>
          <div className="text-2xl font-medium text-gray-900">${totalWithdrawnYTD.toLocaleString()}</div>
        </div>
      </div>

      {/* AI Cash Flow Suggestion */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <div className="text-sm font-medium text-gray-900 mb-1">AI Cash Flow Analysis</div>
            <p className="text-sm text-gray-700">
              Based on your current open positions and typical holding period, you could potentially withdraw an additional <span className="font-medium">$1,200</span> by next week without impacting margin requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={() => setActiveView('form')} size="lg" className="flex-1 bg-gray-900 hover:bg-gray-800 text-white">
          Make Withdrawal
        </Button>
        <Button variant="outline" onClick={() => setActiveView('history')} size="lg" className="flex-1 bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
          Withdrawal History
        </Button>
      </div>

      {/* Enhanced Fund Breakdown */}
      <FundBreakdown breakdown={availabilityBreakdown} />

      {/* Recent Withdrawals Preview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-900">Recent Withdrawals</h4>
          <Button variant="ghost" onClick={() => setActiveView('history')} className="text-sm text-gray-600 hover:text-gray-900">
            View All →
          </Button>
        </div>
        <div className="space-y-3">
          {withdrawalHistory.slice(0, 3).map((withdrawal) => (
            <div key={withdrawal.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <div className="text-sm text-gray-900">${withdrawal.amount.toLocaleString()}</div>
                <div className="text-xs text-gray-500">{withdrawal.date}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-700">{withdrawal.destination}</div>
                <div className="text-xs text-gray-900">
                  {withdrawal.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
