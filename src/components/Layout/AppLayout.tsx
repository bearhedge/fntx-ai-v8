
import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ContextPanel } from './ContextPanel';
import { EnhancedChatBot } from '../Chat/EnhancedChatBot';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col">
            <EnhancedChatBot />
          </div>
          <ContextPanel />
        </main>
      </div>
    </div>
  );
};
