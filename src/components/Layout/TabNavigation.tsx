
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
  return <Tabs value={activeTab} onValueChange={onTabChange} className="w-full py-2">
      <TabsList className="grid grid-cols-4 mb-4 py-0 bg-stone-200 rounded-none w-full">
        <TabsTrigger value="performance" className={`text-lg font-normal py-3 px-8 ${activeTab === 'performance' ? 'font-bold' : ''}`}>PERFORMANCE</TabsTrigger>
        <TabsTrigger value="history" className={`text-lg font-normal py-3 px-8 ${activeTab === 'history' ? 'font-bold' : ''}`}>HISTORY</TabsTrigger>
        <TabsTrigger value="withdrawals" className={`text-lg font-normal py-3 px-8 ${activeTab === 'withdrawals' ? 'font-bold' : ''}`}>WITHDRAWALS</TabsTrigger>
        <TabsTrigger value="analytics" className={`text-lg font-normal py-3 px-8 ${activeTab === 'analytics' ? 'font-bold' : ''}`}>ANALYTICS</TabsTrigger>
      </TabsList>
    </Tabs>;
};
