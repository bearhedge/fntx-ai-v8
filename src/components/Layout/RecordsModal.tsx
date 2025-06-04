import React, { useState, useMemo } from 'react';
import { X, ChevronDown, ExternalLink, Brain, ChevronUp, Download, Search, Calendar as CalendarIcon, HelpCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { TabNavigation } from './TabNavigation';
import { WithdrawalTab } from './WithdrawalTab';
import { WithdrawalRecord, AvailabilityBreakdown } from '@/types/trading';

interface RecordDetails {
  time: string;
  waitTime: number;
  premium: number;
  otmPercent: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  ivRank: number;
  stopLossRatio: number;
  takeProfitRatio: number;
  blockchainTxId: string;
  optimalExit: boolean;
}
interface Record {
  id: string;
  date: string;
  type: 'put' | 'call' | 'both';
  strike: string;
  risk: 'low' | 'moderate' | 'high';
  volume: number;
  result: 'expired' | 'exercised';
  pnl: number;
  details: RecordDetails;
}
interface RecordsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Updated performance metrics with new metrics and refined definitions
const performanceMetrics = [{
  label: "DPI",
  fullLabel: "Distributions to Paid-in (DPI)",
  value: "0.05x",
  calculation: "5000 ÷ 1,000,000",
  definition: "Measures how much cash has been returned compared to what has been invested."
}, {
  label: "RVPI",
  fullLabel: "Residual Value to Paid-in (RVPI)",
  value: "0.95x",
  calculation: "999,5000 ÷ 1,000,000",
  definition: "Shows the current unrealized value of remaining principal relative to invested capital."
}, {
  label: "TVPI",
  fullLabel: "Total Value to Paid-in (TVPI)",
  value: "1.00x",
  calculation: "1,000,000 ÷ 1,000,000",
  definition: "Combines DPI and RVPI to show total value vs. principal."
}, {
  label: "MOIC",
  fullLabel: "Multiple on Invested Capital (MOIC)",
  value: "1.00x",
  calculation: "1,000,000 ÷ 1,000,000",
  definition: "Total value generated per $1 invested, before accounting for time."
}, {
  label: "NAV",
  fullLabel: "Net Asset Value (NAV)",
  value: "HKD 1,000,020",
  definition: "Total value of all assets held minus any liabilities."
}, {
  label: "IRR",
  fullLabel: "Internal Rate of Return (IRR)",
  value: "0.4%",
  definition: "Annualized return adjusted for time."
}, {
  label: "Principal",
  fullLabel: "Principal",
  value: "HKD 1,000,000",
  definition: "The original capital invested, excluding gains or losses."
}, {
  label: "Exercise Ratio",
  fullLabel: "Exercise Ratio",
  value: "2.0%",
  calculation: "2 ÷ 100",
  definition: "Percent of trades where options were exercised."
}, {
  label: "Time to Liquidity",
  fullLabel: "Time to Liquidity",
  value: "3.4 hours",
  calculation: "Average duration formula",
  definition: "How long it's expected to take before a transaction can be cashed out."
}, {
  label: "Sharpe Ratio",
  fullLabel: "Sharpe Ratio",
  value: "1.00",
  calculation: "Average Excess Return ÷ Standard Deviation",
  definition: "Risk-adjusted return; how much return per unit of volatility."
}, {
  label: "Take-profit Ratio",
  fullLabel: "Take-profit Ratio",
  value: "10.0%",
  calculation: "TP Hits ÷ Total Trades",
  definition: "Percent of trades that hit the take profit level."
}, {
  label: "Stop-loss Ratio",
  fullLabel: "Stop-loss Ratio",
  value: "10.0%",
  calculation: "SL Hits ÷ Total Trades",
  definition: "Percent of trades that hit the stop loss level."
}];
export const RecordsModal: React.FC<RecordsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('performance');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('3M');
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [customDateRange, setCustomDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({});
  const [isCustomDateOpen, setIsCustomDateOpen] = useState(false);
  const recordsPerPage = 50;

  // Sample withdrawal data
  const sampleWithdrawals: WithdrawalRecord[] = [{
    id: '1',
    date: '6/2/2025',
    amount: 350,
    status: 'Pending',
    destination: 'Bank Account (****1234)',
    transactionId: 'TXN001',
    fees: 5
  }, {
    id: '2',
    date: '5/28/2025',
    amount: 500,
    status: 'Completed',
    destination: 'Bank Account (****1234)',
    transactionId: 'TXN002',
    fees: 5
  }, {
    id: '3',
    date: '5/15/2025',
    amount: 1200,
    status: 'Completed',
    destination: 'Crypto Wallet (0x1234...)',
    transactionId: 'TXN003',
    fees: 15
  }, {
    id: '4',
    date: '4/30/2025',
    amount: 800,
    status: 'Completed',
    destination: 'Bank Account (****1234)',
    transactionId: 'TXN004',
    fees: 5
  }];
  const availabilityBreakdown: AvailabilityBreakdown = {
    total: 18820,
    available: 2500,
    locked: 14000,
    pendingRelease: [{
      amount: 2320,
      releaseDate: '6/15/2025',
      reason: 'Options expiry'
    }]
  };
  const filteredAndSortedRecords = useMemo(() => {
    let filtered = sampleData;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(record => record.date.toLowerCase().includes(searchTerm.toLowerCase()) || record.type.toLowerCase().includes(searchTerm.toLowerCase()) || record.strike.toLowerCase().includes(searchTerm.toLowerCase()) || record.risk.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(record => record.type === filterType);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'pnl':
          return b.pnl - a.pnl;
        case 'risk':
          const riskOrder = {
            'low': 1,
            'moderate': 2,
            'high': 3
          };
          return riskOrder[b.risk] - riskOrder[a.risk];
        default:
          return 0;
      }
    });
    return filtered;
  }, [searchTerm, filterType, sortBy]);
  const totalPages = Math.ceil(filteredAndSortedRecords.length / recordsPerPage);
  const currentRecords = filteredAndSortedRecords.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);
  const getResultIcon = (result: string) => {
    switch (result) {
      case 'expired':
        return '✓';
      case 'exercised':
        return '!';
      default:
        return '?';
    }
  };
  const handleRowClick = (recordId: string) => {
    setExpandedRow(expandedRow === recordId ? null : recordId);
  };
  const handleCardClick = (metricLabel: string) => {
    setFlippedCard(flippedCard === metricLabel ? null : metricLabel);
  };
  const handleExport = () => {
    console.log('Exporting CSV...');
  };
  const handleTimeframeChange = (timeframe: string) => {
    if (timeframe === 'Custom Date') {
      setIsCustomDateOpen(true);
    } else {
      setSelectedTimeframe(timeframe);
      setCustomDateRange({});
    }
  };
  const formatCustomDateRange = () => {
    if (customDateRange.from && customDateRange.to) {
      return `${format(customDateRange.from, "MMM dd")} - ${format(customDateRange.to, "MMM dd, yyyy")}`;
    } else if (customDateRange.from) {
      return `From ${format(customDateRange.from, "MMM dd, yyyy")}`;
    }
    return "Custom Date";
  };
  return <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl h-[95vh] flex flex-col bg-white p-0">
          <DialogHeader className="bg-gray-50 p-6 flex-shrink-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-medium text-gray-900">Records</DialogTitle>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Complete trading history with detailed metrics, outcomes, and withdrawal management.
            </p>
          </DialogHeader>

          <div className="flex-shrink-0 px-6">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="px-6 pb-6">
                {activeTab === 'performance' && <div className="space-y-6">
                    {/* Performance Metrics Section */}
                    <div className="flex items-center justify-between py-[5px]">
                      <h3 className="text-xl font-medium text-gray-900">Performance Metrics</h3>
                      <div className="flex gap-2">
                        {['1W', '1M', '3M', '6M', 'YTD', '1Y', 'ALL'].map(timeframe => <Button key={timeframe} variant={selectedTimeframe === timeframe ? "default" : "outline"} size="sm" onClick={() => handleTimeframeChange(timeframe)} className="h-8 px-3 text-xs bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
                            {timeframe}
                          </Button>)}
                        <Popover open={isCustomDateOpen} onOpenChange={setIsCustomDateOpen}>
                          <PopoverTrigger asChild>
                            <Button variant={customDateRange.from ? "default" : "outline"} size="sm" className="h-8 px-3 text-xs bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
                              <CalendarIcon className="w-3 h-3 mr-1" />
                              {formatCustomDateRange()}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="end">
                            <Calendar mode="range" selected={{
                          from: customDateRange.from,
                          to: customDateRange.to
                        }} onSelect={range => {
                          setCustomDateRange(range || {});
                          if (range?.from && range?.to) {
                            setSelectedTimeframe('Custom Date');
                            setIsCustomDateOpen(false);
                          }
                        }} disabled={date => date > new Date() || date < new Date(new Date().setFullYear(new Date().getFullYear() - 1))} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-8">
                      {performanceMetrics.map((metric, index) => <div key={metric.label} className="bg-gray-100 border border-gray-200 rounded-lg p-3 hover:bg-gray-700 transition-all duration-200 cursor-pointer relative w-50 h-50 group" onClick={() => handleCardClick(metric.label)}>
                          {/* Front Side */}
                          <div className={`absolute inset-0 p-3 transition-opacity duration-300 flex flex-col justify-center items-center text-center ${flippedCard === metric.label ? 'opacity-0' : 'opacity-100'}`}>
                            <div className="text-lg font-normal text-gray-600 group-hover:text-white mb-2" style={{ marginTop: '-0.5cm' }}>{metric.label}</div>
                            <div className="text-lg font-normal text-gray-600 group-hover:text-white">{metric.value}</div>
                          </div>
                          
                          {/* Back Side */}
                          <div className={`absolute inset-0 p-3 transition-opacity duration-300 flex flex-col justify-between ${flippedCard === metric.label ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="text-sm font-medium text-gray-600 group-hover:text-white text-center">{metric.fullLabel}</div>
                            <div className="flex-1 flex flex-col justify-center">
                              <div className="text-sm text-gray-600 group-hover:text-white text-center mb-2">{metric.definition}</div>
                              {metric.calculation && <div className="text-xs text-gray-500 group-hover:text-white text-center">{metric.calculation}</div>}
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </div>}

                {activeTab === 'history' && <div className="space-y-4">
                    {/* Controls */}
                    <div className="flex items-center gap-4">
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="put">put</SelectItem>
                          <SelectItem value="call">call</SelectItem>
                          <SelectItem value="both">both</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="pnl">PnL</SelectItem>
                          <SelectItem value="risk">Risk</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search records..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
                      </div>

                      <Button variant="outline" onClick={handleExport} className="gap-2">
                        <Download className="w-4 h-4" />
                        Export CSV
                      </Button>
                    </div>

                    {/* Table */}
                    <div className="border rounded-lg overflow-hidden mb-4">
                      <Table>
                        <TableHeader className="bg-gray-50">
                          <TableRow>
                            <TableHead className="w-24">Date</TableHead>
                            <TableHead className="w-16 text-center">Type</TableHead>
                            <TableHead className="w-20 text-right">Strike</TableHead>
                            <TableHead className="w-20 text-center">Risk</TableHead>
                            <TableHead className="w-16 text-center">Volume</TableHead>
                            <TableHead className="w-16 text-center">Result</TableHead>
                            <TableHead className="w-24 text-right">PnL (HKD)</TableHead>
                            <TableHead className="w-24 text-center">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentRecords.map((record, index) => <React.Fragment key={record.id}>
                              <TableRow className={`cursor-pointer hover:bg-gray-50 h-8 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`} onClick={() => handleRowClick(record.id)}>
                                <TableCell className="text-sm py-1 font-normal">{record.date}</TableCell>
                                <TableCell className="text-center text-sm py-1 font-normal">{record.type}</TableCell>
                                <TableCell className="text-right text-sm py-1 font-normal">{record.strike}</TableCell>
                                <TableCell className="text-center text-sm py-1 font-normal">{record.risk}</TableCell>
                                <TableCell className="text-center text-sm py-1 font-normal">{record.volume}</TableCell>
                                <TableCell className="text-center text-sm py-1 font-normal">{record.result === 'expired' ? 'Expired' : 'Exercised'}</TableCell>
                                <TableCell className="text-right text-sm py-1 font-normal">
                                  {record.pnl >= 0 ? `${Math.abs(record.pnl).toLocaleString()}` : `(${Math.abs(record.pnl).toLocaleString()})`}
                                </TableCell>
                                <TableCell className="text-center py-1">
                                  <div className="flex items-center justify-center gap-2">
                                    <Button variant="ghost" size="sm" className="w-6 h-6 p-0" onClick={e => {
                                e.stopPropagation();
                                console.log('Blockchain link clicked');
                              }}>
                                      <ExternalLink className="w-3 h-3" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="w-6 h-6 p-0" onClick={e => {
                                e.stopPropagation();
                                console.log('AI explanation clicked');
                              }}>
                                      <Brain className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                              
                              {/* Expanded Row */}
                              {expandedRow === record.id && <TableRow className="bg-gray-50">
                                  <TableCell colSpan={8} className="p-6">
                                    <div className="grid grid-cols-2 gap-6">
                                      <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg border">
                                          <h4 className="font-medium text-gray-900 mb-3">Trade Details</h4>
                                          <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Time:</span>
                                              <span>{record.details.time}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Wait:</span>
                                              <span>{record.details.waitTime} hours</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Premium:</span>
                                              <span>HKD {record.details.premium}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">OTM:</span>
                                              <span>{record.details.otmPercent}%</span>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="bg-white p-4 rounded-lg border">
                                          <h4 className="font-medium text-gray-900 mb-3">Risk Controls</h4>
                                          <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Stop-Loss:</span>
                                              <span>{record.details.stopLossRatio}x (HKD {(record.details.premium * record.details.stopLossRatio).toFixed(2)})</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Take-Profit:</span>
                                              <span>{record.details.takeProfitRatio * 100}% (HKD {(record.details.premium * record.details.takeProfitRatio).toFixed(2)})</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">IV Rank:</span>
                                              <span>{record.details.ivRank}%</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg border">
                                          <h4 className="font-medium text-gray-900 mb-3">Risk Metrics</h4>
                                          <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Delta:</span>
                                              <span>{record.details.delta}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Gamma:</span>
                                              <span>{record.details.gamma}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Theta:</span>
                                              <span>{record.details.theta}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Vega:</span>
                                              <span>{record.details.vega}</span>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="bg-white p-4 rounded-lg border">
                                          <h4 className="font-medium text-gray-900 mb-3">Outcome</h4>
                                          <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Result:</span>
                                              <span>{record.result === 'expired' ? 'Expired' : 'Exercised'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">PnL:</span>
                                              <span>
                                                HKD {record.pnl >= 0 ? `${Math.abs(record.pnl).toLocaleString()}` : `(${Math.abs(record.pnl).toLocaleString()})`}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Optimal Exit:</span>
                                              <span>{record.details.optimalExit ? 'Yes' : 'No'}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </TableCell>
                                </TableRow>}
                            </React.Fragment>)}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center mt-4">
                      <Pagination className="py-0">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                          </PaginationItem>
                          
                          {Array.from({
                        length: Math.min(5, totalPages)
                      }, (_, i) => {
                        const pageNum = i + 1;
                        return <PaginationItem key={pageNum}>
                                <PaginationLink onClick={() => setCurrentPage(pageNum)} isActive={currentPage === pageNum} className="cursor-pointer">
                                  {pageNum}
                                </PaginationLink>
                              </PaginationItem>;
                      })}
                          
                          <PaginationItem>
                            <PaginationNext onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  </div>}

                {activeTab === 'withdrawals' && <WithdrawalTab availableBalance={2500} withdrawalHistory={sampleWithdrawals} availabilityBreakdown={availabilityBreakdown} />}

                {activeTab === 'analytics' && <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics</h3>
                    <p className="text-gray-600 mb-4">
                      Detailed analytics and insights coming soon.
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                      <p className="text-sm text-gray-500">
                        This section will include advanced portfolio analytics, risk metrics, 
                        performance attribution, and AI-generated trading insights.
                      </p>
                    </div>
                  </div>}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>;
};
const sampleData: Record[] = [{
  id: '1',
  date: '6/1/2025',
  type: 'put',
  strike: '530P',
  risk: 'moderate',
  volume: 1,
  result: 'expired',
  pnl: 55,
  details: {
    time: '14:32 EST',
    waitTime: 2.1,
    premium: 0.55,
    otmPercent: 2.5,
    delta: -0.13,
    gamma: 0.02,
    theta: 0.19,
    vega: 0.11,
    ivRank: 78,
    stopLossRatio: 3,
    takeProfitRatio: 0.5,
    blockchainTxId: '0x1234...',
    optimalExit: true
  }
}, {
  id: '2',
  date: '6/2/2025',
  type: 'call',
  strike: '534C',
  risk: 'low',
  volume: 2,
  result: 'expired',
  pnl: 78,
  details: {
    time: '09:15 EST',
    waitTime: 3.2,
    premium: 0.39,
    otmPercent: 1.8,
    delta: 0.22,
    gamma: 0.03,
    theta: -0.15,
    vega: 0.09,
    ivRank: 65,
    stopLossRatio: 3,
    takeProfitRatio: 0.5,
    blockchainTxId: '0x5678...',
    optimalExit: true
  }
}, {
  id: '3',
  date: '6/3/2025',
  type: 'put',
  strike: '528P',
  risk: 'moderate',
  volume: 3,
  result: 'exercised',
  pnl: -120,
  details: {
    time: '10:15 EST',
    waitTime: 1.5,
    premium: 0.40,
    otmPercent: 3.2,
    delta: -0.18,
    gamma: 0.03,
    theta: 0.22,
    vega: 0.14,
    ivRank: 82,
    stopLossRatio: 3,
    takeProfitRatio: 0.5,
    blockchainTxId: '0x9abc...',
    optimalExit: false
  }
},
// Adding more sample data to reach sufficient records for pagination
...Array.from({
  length: 97
}, (_, i) => ({
  id: (i + 4).toString(),
  date: `6/${i + 4}/2025`,
  type: ['put', 'call', 'both'][i % 3] as 'put' | 'call' | 'both',
  strike: `${530 + i}${['P', 'C', 'C/P'][i % 3]}`,
  risk: ['low', 'moderate', 'high'][i % 3] as 'low' | 'moderate' | 'high',
  volume: i % 3 + 1,
  result: ['expired', 'exercised'][i % 2] as 'expired' | 'exercised',
  pnl: (i % 2 === 0 ? 1 : -1) * (50 + i * 10),
  details: {
    time: `${9 + i % 8}:${15 + i % 4 * 15} EST`,
    waitTime: 1 + i % 5,
    premium: 0.3 + i % 10 * 0.05,
    otmPercent: 1 + i % 8,
    delta: (i % 2 === 0 ? -1 : 1) * (0.1 + i % 5 * 0.02),
    gamma: 0.01 + i % 5 * 0.01,
    theta: (i % 2 === 0 ? 1 : -1) * (0.1 + i % 5 * 0.02),
    vega: 0.08 + i % 5 * 0.02,
    ivRank: 60 + i % 30,
    stopLossRatio: 3,
    takeProfitRatio: 0.5,
    blockchainTxId: `0x${Math.random().toString(16).substr(2, 8)}...`,
    optimalExit: i % 3 !== 1
  }
}))];
