
import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ContextPanel } from './ContextPanel';

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
          <div className="flex-1 p-6 overflow-auto">
            {children}
          </div>
          <ContextPanel />
        </main>
      </div>
    </div>
  );
};
