
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Lightbulb, Download } from 'lucide-react';

interface TreasuryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MetricCardProps {
  title: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
  tooltip: string;
}

interface ChartData {
  date: string;
  value: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, delta, trend, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Card className="bg-gray-50 border border-gray-300 relative">
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs text-gray-600 font-medium">{title}</span>
          <div className="relative">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <Lightbulb className="w-3 h-3" />
            </button>
            {showTooltip && (
              <div className="absolute z-50 bottom-full right-0 mb-1 p-2 bg-gray-800 text-white text-xs rounded shadow-lg w-48">
                {tooltip}
              </div>
            )}
          </div>
        </div>
        <div className="text-lg font-semibold text-gray-900 mb-1">{value}</div>
        <div className={`text-xs flex items-center ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          <span className="mr-1">{trend === 'up' ? '⬆' : '⬇'}</span>
          {delta}
        </div>
      </CardContent>
    </Card>
  );
};

const SimpleLineChart: React.FC<{ data: ChartData[]; timeframe: string }> = ({ data, timeframe }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  return (
    <div className="h-48 bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Premium Collected</h3>
      <div className="relative h-32">
        <svg className="w-full h-full">
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((point.value - minValue) / range) * 100;
            return (
              <circle
                key={index}
                cx={`${x}%`}
                cy={`${y}%`}
                r="3"
                fill="#4A72B0"
                className="hover:r-4 transition-all cursor-pointer"
              />
            );
          })}
          <polyline
            points={data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - ((point.value - minValue) / range) * 100;
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="#4A72B0"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

const SimplePieChart: React.FC = () => {
  return (
    <div className="h-48 bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Strategy Distribution</h3>
      <div className="flex items-center justify-center h-32">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r="40" fill="#5A9178" stroke="white" strokeWidth="2" />
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="#4A72B0"
              strokeWidth="40"
              strokeDasharray="100 251"
              strokeDashoffset="0"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="#A23A3A"
              strokeWidth="40"
              strokeDasharray="63 251"
              strokeDashoffset="-100"
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-center space-x-4 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-600 rounded mr-1"></div>
          <span>Conservative (40%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-600 rounded mr-1"></div>
          <span>Moderate (35%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-600 rounded mr-1"></div>
          <span>Aggressive (25%)</span>
        </div>
      </div>
    </div>
  );
};

const SimpleBarChart: React.FC<{ pnlView: string }> = ({ pnlView }) => {
  const sampleData = {
    daily: [8500, -3000, 12000, 7500, 9000, -2000, 11000],
    weekly: [28500, -12000, 35000, 22500],
    monthly: [85000, 120000, -30000]
  };

  const data = sampleData[pnlView as keyof typeof sampleData] || sampleData.daily;
  const maxValue = Math.max(...data.map(Math.abs));

  return (
    <div className="h-48 bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-4">PnL Chart</h3>
      <div className="flex justify-center h-32 items-end space-x-1">
        {data.map((value, index) => {
          const height = (Math.abs(value) / maxValue) * 100;
          const isPositive = value >= 0;
          return (
            <div
              key={index}
              className={`w-8 ${isPositive ? 'bg-green-500' : 'bg-red-500'} hover:opacity-80 cursor-pointer`}
              style={{ height: `${height}%` }}
              title={`${isPositive ? '+' : ''}$${value.toLocaleString()}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export const TreasuryModal: React.FC<TreasuryModalProps> = ({ isOpen, onClose }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('3M');
  const [pnlView, setPnlView] = useState('daily');

  const timeframes = ['1D', '1W', '1M', '3M', 'YTD', '1Y', 'ALL'];
  const pnlViews = ['Daily', 'Weekly', 'Monthly'];

  const premiumData: ChartData[] = [
    { date: '2025-03-01', value: 12000 },
    { date: '2025-03-15', value: 24500 },
    { date: '2025-04-01', value: 31000 },
    { date: '2025-04-15', value: 38000 },
    { date: '2025-05-01', value: 45000 },
    { date: '2025-05-15', value: 52000 }
  ];

  const metrics = [
    {
      title: 'DPI',
      value: '1.27x',
      delta: '+0.02',
      trend: 'up' as const,
      tooltip: 'Distribution to Paid-In capital. Shows return relative to investment.'
    },
    {
      title: 'TVPI',
      value: '1.74x',
      delta: '+0.05',
      trend: 'up' as const,
      tooltip: 'Total Value to Paid-In capital. Measures total value created.'
    },
    {
      title: 'Sharpe',
      value: '1.91',
      delta: '+0.08',
      trend: 'up' as const,
      tooltip: 'Risk-adjusted return metric. Higher is better.'
    },
    {
      title: 'Win Rate',
      value: '94%',
      delta: '+1.2%',
      trend: 'up' as const,
      tooltip: 'Percentage of trades that resulted in profit.'
    }
  ];

  const observations = [
    'Highest premium week: May 13–17',
    'Aggressive trades yield higher theta but lower Sharpe',
    'SLs triggered 3x more in volatile weeks'
  ];

  const recommendations = [
    'Consider reducing trade size during high IV spikes',
    'Use moderate strikes when IV rank > 70%'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="bg-gray-50 -m-6 mb-6 p-6 border-b border-gray-300">
          <DialogTitle className="text-xl font-semibold text-center text-gray-900">
            TREASURY
          </DialogTitle>
          <p className="text-sm text-gray-600 text-center mt-2">
            Treasury provides institutional-grade metrics for your options strategy
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Principal Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-gray-50 border border-gray-300">
              <CardContent className="p-4">
                <div className="text-xs text-gray-600 mb-1">PRINCIPAL</div>
                <div className="text-xl font-bold text-gray-900 font-mono">HKD 1,000,000</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-50 border border-gray-300">
              <CardContent className="p-4">
                <div className="text-xs text-gray-600 mb-1">CURRENT VALUE</div>
                <div className="text-xl font-bold text-gray-900 font-mono">HKD 1,274,000</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-50 border border-gray-300">
              <CardContent className="p-4">
                <div className="text-xs text-gray-600 mb-1">WITHDRAWALS</div>
                <div className="text-xl font-bold text-gray-900 font-mono">HKD 0</div>
              </CardContent>
            </Card>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          {/* Timeframe Selector */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {timeframes.map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`h-7 px-3 rounded-full ${
                    selectedTimeframe === timeframe
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {timeframe}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
          </div>

          {/* Premium Collected Chart */}
          <SimpleLineChart data={premiumData} timeframe={selectedTimeframe} />

          {/* Strategy Distribution and PnL Charts */}
          <div className="grid grid-cols-2 gap-4">
            <SimplePieChart />
            <div className="space-y-4">
              <div className="flex justify-center space-x-2">
                {pnlViews.map((view) => (
                  <Button
                    key={view}
                    variant={pnlView === view.toLowerCase() ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPnlView(view.toLowerCase())}
                    className={`h-7 px-3 ${
                      pnlView === view.toLowerCase()
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {view}
                  </Button>
                ))}
              </div>
              <SimpleBarChart pnlView={pnlView} />
            </div>
          </div>

          {/* Principal Breakdown */}
          <Card className="bg-gray-50 border border-gray-300">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900">PRINCIPAL BREAKDOWN</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Initial Investment:</span>
                <span className="font-mono font-semibold">HKD 1,000,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Total Deposits:</span>
                <span className="font-mono font-semibold">HKD 0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Total Withdrawals:</span>
                <span className="font-mono font-semibold">HKD 0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Net Profit:</span>
                <span className="font-mono font-semibold text-green-600">HKD 274,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Return on Principal:</span>
                <span className="font-mono font-semibold text-green-600">27.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Annualized Return:</span>
                <span className="font-mono font-semibold text-green-600">32.1%</span>
              </div>
            </CardContent>
          </Card>

          {/* AI-Assisted Insights */}
          <Card className="bg-gray-50 border border-gray-300">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900">AI-ASSISTED INSIGHTS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  📌 Observations
                </h4>
                <ul className="space-y-1">
                  {observations.map((observation, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="mr-2">•</span>
                      {observation}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  📍 Recommendations
                </h4>
                <ul className="space-y-1">
                  {recommendations.map((recommendation, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="mr-2">•</span>
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
