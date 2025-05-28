
export interface TradeOption {
  id: string;
  type: 'PUT' | 'CALL';
  symbol: string;
  strike: number;
  premium: number;
  contracts: number;
  expiration: Date;
  riskLevel: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';
  probability: number;
  totalPremium: number;
  riskReward: string;
  strategy: string;
  stopLoss: number;
  takeProfit: number;
}

export interface Position {
  id: string;
  symbol: string;
  type: 'PUT' | 'CALL';
  strike: number;
  contracts: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercentage: number;
  stopLoss: number;
  takeProfit: number;
  expiration: Date;
  riskMeterPosition: number; // 0-100, position on risk meter
}

export interface AccountSummary {
  balance: number;
  available: number;
  marginUsed: number;
  dailyPnl: number;
  tradesCompleted: number;
  winRate: number;
}

export interface MarketConditions {
  spyPrice: number;
  vix: number;
  marketTrend: string;
}

export interface WaitingPeriod {
  isActive: boolean;
  remainingTime: number; // in minutes
  totalTime: number; // in minutes
  progress: number; // 0-100
  rationale: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai' | 'system';
  timestamp: Date;
  type?: 'text' | 'trade-options' | 'waiting-period' | 'position-update';
  data?: any; // For embedded components like trade cards, timers, etc.
}
