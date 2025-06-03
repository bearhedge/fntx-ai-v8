
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { WithdrawalForm } from './WithdrawalForm';
import { WithdrawalHistory } from './WithdrawalHistory';
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
          <Button variant="outline" onClick={() => setActiveView('dashboard')} className="font-normal">
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
          <div className="text-sm text-gray-600 mb-1 font-normal">Available for Withdrawal</div>
          <div className="text-2xl font-medium text-gray-900">${availableBalance.toLocaleString()}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1 font-normal">Pending Release</div>
          <div className="text-2xl font-medium text-gray-900">${pendingAmount.toLocaleString()}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1 font-normal">Total Withdrawn (YTD)</div>
          <div className="text-2xl font-medium text-gray-900">${totalWithdrawnYTD.toLocaleString()}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={() => setActiveView('form')} size="lg" className="flex-1 font-normal">
          Make Withdrawal
        </Button>
        <Button variant="outline" onClick={() => setActiveView('history')} size="lg" className="flex-1 font-normal">
          Withdrawal History
        </Button>
      </div>

      {/* Availability Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Fund Availability Breakdown</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-normal">Total Portfolio Value</span>
            <span className="font-mono font-normal">${availabilityBreakdown.total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-normal">Available for Withdrawal</span>
            <span className="font-mono font-normal text-gray-900">${availabilityBreakdown.available.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-normal">Locked in Positions</span>
            <span className="font-mono font-normal text-gray-900">(${availabilityBreakdown.locked.toLocaleString()})</span>
          </div>
          {availabilityBreakdown.pendingRelease.map((pending, index) => (
            <div key={index} className="flex justify-between items-center pl-4 border-l-2 border-gray-200">
              <span className="text-gray-600 text-sm font-normal">
                Pending Release ({pending.reason})
              </span>
              <span className="font-mono font-normal text-gray-900">
                ${pending.amount.toLocaleString()} on {pending.releaseDate}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Withdrawals Preview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-900">Recent Withdrawals</h4>
          <Button variant="ghost" onClick={() => setActiveView('history')} className="text-sm font-normal">
            View All →
          </Button>
        </div>
        <div className="space-y-2">
          {withdrawalHistory.slice(0, 3).map((withdrawal) => (
            <div key={withdrawal.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <div className="text-sm font-normal">${withdrawal.amount.toLocaleString()}</div>
                <div className="text-xs text-gray-500 font-normal">{withdrawal.date}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-normal">{withdrawal.destination}</div>
                <div className="text-xs text-gray-900 font-normal">
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
