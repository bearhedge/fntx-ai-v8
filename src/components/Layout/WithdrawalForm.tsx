
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WithdrawalDestination } from '@/types/trading';

interface WithdrawalFormProps {
  availableBalance: number;
  destinations: WithdrawalDestination[];
  onSubmit: (amount: number, destinationId: string) => void;
  onCancel: () => void;
}

export const WithdrawalForm: React.FC<WithdrawalFormProps> = ({
  availableBalance,
  destinations,
  onSubmit,
  onCancel
}) => {
  const [amount, setAmount] = useState<string>('');
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAmountChange = (value: string) => {
    setAmount(value);
    setError('');
  };

  const setPercentage = (percentage: number) => {
    const calculatedAmount = (availableBalance * percentage / 100).toFixed(2);
    setAmount(calculatedAmount);
    setError('');
  };

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    
    if (!numAmount || numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (numAmount > availableBalance) {
      setError('Amount exceeds available balance');
      return;
    }
    
    if (!selectedDestination) {
      setError('Please select a destination');
      return;
    }

    onSubmit(numAmount, selectedDestination);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Make Withdrawal</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Withdrawal Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <Input
              type="number"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0.00"
              className="pl-8 text-right"
              step="0.01"
              min="0"
              max={availableBalance}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">USD</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setPercentage(25)}>25%</Button>
          <Button variant="outline" size="sm" onClick={() => setPercentage(50)}>50%</Button>
          <Button variant="outline" size="sm" onClick={() => setPercentage(75)}>75%</Button>
          <Button variant="outline" size="sm" onClick={() => setPercentage(100)}>Max</Button>
        </div>

        <p className="text-sm text-gray-600">
          Available balance: <span className="font-mono font-medium">${availableBalance.toLocaleString()}</span>
        </p>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Destination
          </label>
          <Select value={selectedDestination} onValueChange={setSelectedDestination}>
            <SelectTrigger>
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((dest) => (
                <SelectItem key={dest.id} value={dest.id}>
                  <div className="flex items-center gap-2">
                    <span>{dest.name}</span>
                    <span className="text-gray-500 text-sm">({dest.details})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <div className="flex gap-3 pt-4">
          <Button onClick={handleSubmit} className="flex-1">
            Continue
          </Button>
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
