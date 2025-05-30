
import React from 'react';
import { Sidebar } from './Sidebar';
import { EnhancedChatBot } from '../Chat/EnhancedChatBot';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-white flex w-full">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <EnhancedChatBot />
      </main>
    </div>
  );
};
