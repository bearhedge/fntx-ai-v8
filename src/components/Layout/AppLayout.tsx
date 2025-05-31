
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
    <div className="h-screen bg-white flex w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex min-w-0">
        {/* Main chat area */}
        <div className={`flex-1 ${isContextPanelExpanded ? 'max-w-[70%]' : 'w-full'} transition-all duration-300 min-w-0`}>
          <main className="h-full min-w-0">
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
          <div className="w-[30%] min-w-[300px] max-w-[500px] border-l border-gray-200 h-full">
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
