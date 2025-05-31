
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
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="h-screen bg-white flex w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex min-w-0">
        {/* Main chat area */}
        <div className={`flex-1 ${isContextPanelExpanded ? 'max-w-[60%]' : 'w-full'} transition-all duration-300 min-w-0`}>
          <main className="h-full min-w-0">
            <EnhancedChatBot 
              onShowContextPanel={setShowContextPanel}
              onToggleContextPanel={() => setIsContextPanelExpanded(!isContextPanelExpanded)}
              showContextPanel={showContextPanel}
              isContextPanelExpanded={isContextPanelExpanded}
              onActivateChange={setIsActive}
            />
          </main>
        </div>
        
        {/* Context Panel - enlarged to 40% */}
        {showContextPanel && isContextPanelExpanded && (
          <div className="w-[40%] min-w-[400px] max-w-[600px] border-l border-gray-200 h-full">
            <ContextPanel 
              isOpen={true}
              onToggle={() => setIsContextPanelExpanded(false)}
              isActive={isActive}
            />
          </div>
        )}
      </div>
      
      {/* Bottom left user indicator - JH only */}
      <div className="absolute bottom-4 left-4 z-20">
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-medium">JH</span>
        </div>
      </div>
    </div>
  );
};
