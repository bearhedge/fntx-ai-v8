
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { EnhancedChatBot } from '../Chat/EnhancedChatBot';
import { ContextPanel } from './ContextPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [showContextPanel, setShowContextPanel] = useState(false);
  const [isContextPanelExpanded, setIsContextPanelExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-white flex w-full">
      <Sidebar />
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={showContextPanel && isContextPanelExpanded ? 70 : 100}>
          <main className="flex flex-col min-w-0 h-full">
            <EnhancedChatBot 
              onShowContextPanel={setShowContextPanel}
              onToggleContextPanel={() => setIsContextPanelExpanded(!isContextPanelExpanded)}
              showContextPanel={showContextPanel}
              isContextPanelExpanded={isContextPanelExpanded}
            />
          </main>
        </ResizablePanel>
        
        {showContextPanel && isContextPanelExpanded && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={25} maxSize={50}>
              <ContextPanel 
                isOpen={true}
                onToggle={() => setIsContextPanelExpanded(false)}
              />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};
