
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { EnhancedChatBot } from '../Chat/EnhancedChatBot';
import { ContextPanel } from './ContextPanel';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [showContextPanel, setShowContextPanel] = useState(false);
  const [isContextPanelExpanded, setIsContextPanelExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-white flex w-full">
      <Sidebar />
      <div className="flex-1 flex">
        {/* Main chat area */}
        <div className={`flex-1 ${isContextPanelExpanded ? 'max-w-[70%]' : 'w-full'} transition-all duration-300`}>
          <main className="flex flex-col min-w-0 h-full">
            <EnhancedChatBot 
              onShowContextPanel={setShowContextPanel}
              onToggleContextPanel={() => setIsContextPanelExpanded(!isContextPanelExpanded)}
              showContextPanel={showContextPanel}
              isContextPanelExpanded={isContextPanelExpanded}
            />
          </main>
        </div>
        
        {/* Context Panel */}
        {showContextPanel && isContextPanelExpanded && (
          <div className="w-[30%] min-w-[300px] max-w-[500px] border-l border-gray-200">
            <ContextPanel 
              isOpen={true}
              onToggle={() => setIsContextPanelExpanded(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
