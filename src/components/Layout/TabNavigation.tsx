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
  return <Tabs value={activeTab} onValueChange={onTabChange} className="w-full py-[7px]">
      <TabsList className="grid grid-cols-4 mb-4 bg-gray-100">
        <TabsTrigger value="performance" className="text-sm">Performance</TabsTrigger>
        <TabsTrigger value="history" className="text-sm">History</TabsTrigger>
        <TabsTrigger value="withdrawals" className="text-sm">Withdrawals</TabsTrigger>
        <TabsTrigger value="analytics" className="text-sm">Analytics</TabsTrigger>
      </TabsList>
    </Tabs>;
};