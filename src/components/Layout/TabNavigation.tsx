
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full py-2">
      <TabsList className="grid grid-cols-4 mb-4 bg-gray-100 h-12 px-2">
        <TabsTrigger 
          value="performance" 
          className={`text-lg font-normal px-6 py-2 ${activeTab === 'performance' ? 'font-bold' : ''}`}
        >
          Performance
        </TabsTrigger>
        <TabsTrigger 
          value="history" 
          className={`text-lg font-normal px-6 py-2 ${activeTab === 'history' ? 'font-bold' : ''}`}
        >
          History
        </TabsTrigger>
        <TabsTrigger 
          value="withdrawals" 
          className={`text-lg font-normal px-6 py-2 ${activeTab === 'withdrawals' ? 'font-bold' : ''}`}
        >
          Withdrawals
        </TabsTrigger>
        <TabsTrigger 
          value="analytics" 
          className={`text-lg font-normal px-6 py-2 ${activeTab === 'analytics' ? 'font-bold' : ''}`}
        >
          Analytics
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
