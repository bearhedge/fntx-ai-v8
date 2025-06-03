import React, { useState, useMemo } from 'react';
import { X, ChevronDown, ExternalLink, Brain, ChevronUp, Download, Search, TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  type: 'PUT' | 'CALL' | 'BOTH';
  strike: string;
  risk: 'Low' | 'Mod.' | 'High';
  volume: number;
  result: 'EXPIRED' | 'STOPPED' | 'EXERCISED';
  pnl: number;
  details: RecordDetails;
}
interface RecordsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Performance metrics data
const performanceMetrics = [
  {
    label: "DPI",
    value: "1.27x",
    delta: "+0.02",
    positive: true,
    subtext: "$22,860 / $18,000",
    tooltip: "Distributions to Paid-In Capital - Total premium collected divided by principal deployed"
  },
  {
    label: "TVPI",
    value: "1.74x",
    delta: "+0.05",
    positive: true,
    subtext: "$31,250 / $18,000",
    tooltip: "Total Value to Paid-In Capital - Total value including unrealized positions"
  },
  {
    label: "RVPI",
    value: "0.47x",
    delta: "-0.01",
    positive: false,
    subtext: "$8,390 / $18,000",
    tooltip: "Residual Value to Paid-In Capital - Unrealized value divided by principal"
  },
  {
    label: "IRR",
    value: "13.4%",
    delta: "+0.8%",
    positive: true,
    subtext: "Annualized",
    tooltip: "Internal Rate of Return - Annualized return based on cash flows and PnL"
  },
  {
    label: "MOIC",
    value: "1.58x",
    delta: "+0.03",
    positive: true,
    subtext: "$28,440 / $18,000",
    tooltip: "Multiple on Invested Capital - Total return divided by invested capital"
  },
  {
    label: "Loss Ratio",
    value: "5.3%",
    delta: "-1.2%",
    positive: true,
    subtext: "7 / 131 trades",
    tooltip: "Percentage of trades resulting in realized loss"
  },
  {
    label: "Principal",
    value: "$18,000",
    delta: null,
    positive: null,
    subtext: "Capital Deployed",
    tooltip: "Total capital deployed in trading strategies"
  },
  {
    label: "NAV",
    value: "$18,820",
    delta: "+$420",
    positive: true,
    subtext: "Net Asset Value",
    tooltip: "Current value of open positions plus remaining capital"
  },
  {
    label: "Time to Liquidity",
    value: "2.3d",
    delta: "-0.2d",
    positive: true,
    subtext: "Avg time to close",
    tooltip: "Average time from trade open to closure"
  }
];

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
  const recordsPerPage = 10;

  // Sample withdrawal data
  const sampleWithdrawals: WithdrawalRecord[] = [
    {
      id: '1',
      date: '6/2/2025',
      amount: 350,
      status: 'Pending',
      destination: 'Bank Account (****1234)',
      transactionId: 'TXN001',
      fees: 5
    },
    {
      id: '2',
      date: '5/28/2025',
      amount: 500,
      status: 'Completed',
      destination: 'Bank Account (****1234)',
      transactionId: 'TXN002',
      fees: 5
    },
    {
      id: '3',
      date: '5/15/2025',
      amount: 1200,
      status: 'Completed',
      destination: 'Crypto Wallet (0x1234...)',
      transactionId: 'TXN003',
      fees: 15
    },
    {
      id: '4',
      date: '4/30/2025',
      amount: 800,
      status: 'Completed',
      destination: 'Bank Account (****1234)',
      transactionId: 'TXN004',
      fees: 5
    }
  ];

  const availabilityBreakdown: AvailabilityBreakdown = {
    total: 18820,
    available: 2500,
    locked: 14000,
    pendingRelease: [
      {
        amount: 2320,
        releaseDate: '6/15/2025',
        reason: 'Options expiry'
      }
    ]
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
            'Low': 1,
            'Mod.': 2,
            'High': 3
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
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-blue-600';
      case 'Mod.':
        return 'text-amber-600';
      case 'High':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PUT':
        return 'text-red-600';
      case 'CALL':
        return 'text-green-600';
      case 'BOTH':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };
  const getResultIcon = (result: string) => {
    switch (result) {
      case 'EXPIRED':
        return '✅';
      case 'STOPPED':
        return '❌';
      case 'EXERCISED':
        return '⚠️';
      default:
        return '❓';
    }
  };
  const handleRowClick = (recordId: string) => {
    setExpandedRow(expandedRow === recordId ? null : recordId);
  };
  const handleExport = () => {
    console.log('Exporting CSV...');
    // CSV export functionality would go here
  };

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden bg-white py-[25px]">
          <DialogHeader className="bg-gray-50 -m-6 p-6 mb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold text-gray-900">Records</DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="w-8 h-8 p-0 rounded-full hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Complete trading history with detailed metrics, outcomes, and withdrawal management.
            </p>
          </DialogHeader>

          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          <ScrollArea className="h-[calc(90vh-200px)]">
            {activeTab === 'performance' && (
              <div className="mb-6 px-1">
                {/* Performance Metrics Section */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
                  <div className="flex gap-2">
                    {['1M', '3M', 'YTD', 'ALL'].map((timeframe) => (
                      <Button
                        key={timeframe}
                        variant={selectedTimeframe === timeframe ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTimeframe(timeframe)}
                        className="h-8 px-3 text-xs"
                      >
                        {timeframe}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {performanceMetrics.map((metric, index) => (
                    <div key={metric.label} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">{metric.label}</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">{metric.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      
                      <div className="flex items-baseline justify-between">
                        <span className="text-xl font-bold text-gray-900">{metric.value}</span>
                        {metric.delta && (
                          <div className={`flex items-center text-sm font-medium ${
                            metric.positive ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {metric.positive ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {metric.delta}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xs text-gray-500 mt-1">{metric.subtext}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                {/* Controls */}
                <div className="flex items-center gap-4 mb-4 px-1 py-[10px]">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="CALL">CALL</SelectItem>
                      <SelectItem value="BOTH">BOTH</SelectItem>
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
                    <TableHeader className="bg-gray-100">
                      <TableRow>
                        <TableHead className="w-16">Date</TableHead>
                        <TableHead className="w-16 text-center">Type</TableHead>
                        <TableHead className="w-20 text-right">Strike</TableHead>
                        <TableHead className="w-16 text-center">Risk</TableHead>
                        <TableHead className="w-16 text-center">Volume</TableHead>
                        <TableHead className="w-16 text-center">Risk</TableHead>
                        <TableHead className="w-16 text-center">Result</TableHead>
                        <TableHead className="w-20 text-right">PnL</TableHead>
                        <TableHead className="w-24 text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentRecords.map((record, index) => <React.Fragment key={record.id}>
                          <TableRow className={`cursor-pointer hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`} onClick={() => handleRowClick(record.id)}>
                            <TableCell className="font-mono text-sm">{record.date}</TableCell>
                            <TableCell className={`text-center font-medium ${getTypeColor(record.type)}`}>
                              {record.type}
                            </TableCell>
                            <TableCell className="text-right font-mono text-sm">{record.strike}</TableCell>
                            <TableCell className={`text-center font-medium ${getRiskColor(record.risk)}`}>
                              {record.risk}
                            </TableCell>
                            <TableCell className="text-center">{record.volume}</TableCell>
                            <TableCell className={`text-center font-medium ${getRiskColor(record.risk)}`}>
                              {record.risk}
                            </TableCell>
                            <TableCell className="text-center text-lg">{getResultIcon(record.result)}</TableCell>
                            <TableCell className={`text-right font-mono font-medium ${record.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {record.pnl >= 0 ? '+' : ''}${record.pnl}
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                <Button variant="ghost" size="sm" className="w-8 h-8 p-0" onClick={e => {
                              e.stopPropagation();
                              console.log('Blockchain link clicked');
                            }}>
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0" onClick={e => {
                              e.stopPropagation();
                              console.log('AI explanation clicked');
                            }}>
                              <Brain className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                          </TableRow>
                          
                          {/* Expanded Row */}
                          {expandedRow === record.id && <TableRow className="bg-gray-50">
                              <TableCell colSpan={9} className="p-6">
                                <div className="grid grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div className="bg-white p-4 rounded-lg border">
                                      <h4 className="font-semibold text-gray-900 mb-3">TRADE DETAILS</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Time:</span>
                                          <span className="font-mono">{record.details.time}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Wait:</span>
                                          <span className="font-mono">{record.details.waitTime}h</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Premium:</span>
                                          <span className="font-mono">${record.details.premium}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">OTM:</span>
                                          <span className="font-mono">{record.details.otmPercent}%</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="bg-white p-4 rounded-lg border">
                                      <h4 className="font-semibold text-gray-900 mb-3">RISK CONTROLS</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Stop-Loss:</span>
                                          <span className="font-mono">{record.details.stopLossRatio}x (${(record.details.premium * record.details.stopLossRatio).toFixed(2)})</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Take-Profit:</span>
                                          <span className="font-mono">{record.details.takeProfitRatio * 100}% (${(record.details.premium * record.details.takeProfitRatio).toFixed(2)})</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">IV Rank:</span>
                                          <span className="font-mono">{record.details.ivRank}%</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <div className="bg-white p-4 rounded-lg border">
                                      <h4 className="font-semibold text-gray-900 mb-3">RISK METRICS</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Delta:</span>
                                          <span className="font-mono">{record.details.delta}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Gamma:</span>
                                          <span className="font-mono">{record.details.gamma}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Theta:</span>
                                          <span className="font-mono">{record.details.theta}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Vega:</span>
                                          <span className="font-mono">{record.details.vega}</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="bg-white p-4 rounded-lg border">
                                      <h4 className="font-semibold text-gray-900 mb-3">OUTCOME</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Result:</span>
                                          <span>{record.result === 'EXPIRED' ? 'Expired worthless' : record.result === 'STOPPED' ? 'Stopped out' : 'Exercised'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">PnL:</span>
                                          <span className={`font-mono font-medium ${record.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {record.pnl >= 0 ? '+' : ''}${record.pnl}
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Optimal Exit:</span>
                                          <span className={record.details.optimalExit ? 'text-green-600' : 'text-red-600'}>
                                            {record.details.optimalExit ? 'YES' : 'NO'}
                                          </span>
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

                <div className="text-center text-sm text-gray-500 mt-2 my-[5px] mx-0 px-0 py-[8px]">
                  Showing {Math.min(recordsPerPage, filteredAndSortedRecords.length)} of {filteredAndSortedRecords.length} records
                </div>
              </div>
            )}

            {activeTab === 'withdrawals' && (
              <WithdrawalTab
                availableBalance={2500}
                withdrawalHistory={sampleWithdrawals}
                availabilityBreakdown={availabilityBreakdown}
              />
            )}

            {activeTab === 'analytics' && (
              <div className="px-1">
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
                  <p className="text-gray-600 mb-4">
                    Detailed analytics and insights coming soon.
                  </p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                    <p className="text-sm text-gray-500">
                      This section will include advanced portfolio analytics, risk metrics, 
                      performance attribution, and AI-generated trading insights.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

const sampleData: Record[] = [
  {
    id: '1',
    date: '6/1',
    type: 'PUT',
    strike: '530P',
    risk: 'Mod.',
    volume: 1,
    result: 'EXPIRED',
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
  },
  {
    id: '2',
    date: '6/2',
    type: 'CALL',
    strike: '534C',
    risk: 'Low',
    volume: 2,
    result: 'EXPIRED',
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
  },
  {
    id: '3',
    date: '6/3',
    type: 'PUT',
    strike: '528P',
    risk: 'Mod.',
    volume: 3,
    result: 'STOPPED',
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
  // Adding more sample data to reach 30 rows
  ...Array.from({ length: 27 }, (_, i) => ({
    id: (i + 4).toString(),
    date: `6/${i + 4}`,
    type: ['PUT', 'CALL', 'BOTH'][i % 3] as 'PUT' | 'CALL' | 'BOTH',
    strike: `${530 + i}${['P', 'C', 'C/P'][i % 3]}`,
    risk: ['Low', 'Mod.', 'High'][i % 3] as 'Low' | 'Mod.' | 'High',
    volume: i % 3 + 1,
    result: ['EXPIRED', 'STOPPED', 'EXERCISED'][i % 3] as 'EXPIRED' | 'STOPPED' | 'EXERCISED',
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
  }))
];
