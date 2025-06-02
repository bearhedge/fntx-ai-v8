import React, { useState, useMemo } from 'react';
import { X, ChevronDown, ExternalLink, Brain, ChevronUp, Download, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    volume: (i % 3) + 1,
    result: ['EXPIRED', 'STOPPED', 'EXERCISED'][i % 3] as 'EXPIRED' | 'STOPPED' | 'EXERCISED',
    pnl: (i % 2 === 0 ? 1 : -1) * (50 + (i * 10)),
    details: {
      time: `${9 + (i % 8)}:${15 + (i % 4) * 15} EST`,
      waitTime: 1 + (i % 5),
      premium: 0.3 + (i % 10) * 0.05,
      otmPercent: 1 + (i % 8),
      delta: (i % 2 === 0 ? -1 : 1) * (0.1 + (i % 5) * 0.02),
      gamma: 0.01 + (i % 5) * 0.01,
      theta: (i % 2 === 0 ? 1 : -1) * (0.1 + (i % 5) * 0.02),
      vega: 0.08 + (i % 5) * 0.02,
      ivRank: 60 + (i % 30),
      stopLossRatio: 3,
      takeProfitRatio: 0.5,
      blockchainTxId: `0x${Math.random().toString(16).substr(2, 8)}...`,
      optimalExit: i % 3 !== 1
    }
  }))
];

export const RecordsModal: React.FC<RecordsModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  
  const recordsPerPage = 10;

  const filteredAndSortedRecords = useMemo(() => {
    let filtered = sampleData;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.strike.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.risk.toLowerCase().includes(searchTerm.toLowerCase())
      );
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
          const riskOrder = { 'Low': 1, 'Mod.': 2, 'High': 3 };
          return riskOrder[b.risk] - riskOrder[a.risk];
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterType, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedRecords.length / recordsPerPage);
  const currentRecords = filteredAndSortedRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-blue-600';
      case 'Mod.': return 'text-amber-600';
      case 'High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PUT': return 'text-red-600';
      case 'CALL': return 'text-green-600';
      case 'BOTH': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'EXPIRED': return '✅';
      case 'STOPPED': return '❌';
      case 'EXERCISED': return '⚠️';
      default: return '❓';
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden bg-white">
        <DialogHeader className="bg-gray-50 -m-6 p-6 mb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">Records</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Complete trading history with detailed metrics and outcomes. Review your trading performance and learn from past decisions.
          </p>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-200px)]">
          {/* Controls */}
          <div className="flex items-center gap-4 mb-4 px-1">
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
              <Input
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
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
                {currentRecords.map((record, index) => (
                  <React.Fragment key={record.id}>
                    <TableRow 
                      className={`cursor-pointer hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}
                      onClick={() => handleRowClick(record.id)}
                    >
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
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Blockchain link clicked');
                            }}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('AI explanation clicked');
                            }}
                          >
                            <Brain className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    {/* Expanded Row */}
                    {expandedRow === record.id && (
                      <TableRow className="bg-gray-50">
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
                                    <span className="font-mono">{(record.details.takeProfitRatio * 100)}% (${(record.details.premium * record.details.takeProfitRatio).toFixed(2)})</span>
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
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNum)}
                        isActive={currentPage === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <div className="text-center text-sm text-gray-500 mt-2">
            Showing {Math.min(recordsPerPage, filteredAndSortedRecords.length)} of {filteredAndSortedRecords.length} records
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
