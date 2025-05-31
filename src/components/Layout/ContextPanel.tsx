
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Monitor, Minimize2, Brain, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ContextPanelProps {
  isOpen?: boolean;
  onToggle?: () => void;
  isActive?: boolean;
}

export const ContextPanel = ({
  isOpen: externalIsOpen,
  onToggle,
  isActive = false
}: ContextPanelProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const [isTasksExpanded, setIsTasksExpanded] = useState(false);
  
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const handleToggle = onToggle || (() => setInternalIsOpen(!internalIsOpen));

  const completedTasks = [
    "Extract and review the front-end design section from the provided RTF d...",
    "Analyze and benchmark the design against the color theme used by bear...",
    "Draft highly detailed web application front-end design instructions with v...",
    "Validate and deliver the enhanced front-end design section to the user."
  ];

  return (
    <div className="bg-gray-800 text-white h-full flex flex-col rounded-l-3xl relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-200">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl text-slate-800 font-light">FNTX's Computer</h2>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded transition-colors flex items-center space-x-1 bg-transparent">
                <Monitor className="w-4 h-4 text-slate-950" />
                <ChevronDown className="w-3 h-3 text-slate-950" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-25 border-gray-200 bg-gray-200">
              <DropdownMenuItem className="flex items-center space-x-3 p-3 text-white hover:bg-gray-600 ">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-xs text-white font-medium">VS</span>
                </div>
                <span className="text-sm text-zinc-950 font-normal">VS Code</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center space-x-3 p-3 text-white hover:bg-gray-600">
                <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-xs text-white font-medium">B</span>
                </div>
                <span className="text-sm font-normal text-zinc-950">Browser</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button onClick={handleToggle} className="p-1 rounded transition-colors bg-transparent">
            <Minimize2 className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-hidden flex flex-col bg-gray-300 relative">
        <div className="flex-1 flex flex-col">
          {/* Status - Centered in the main area */}
          <div className="flex-1 flex flex-col justify-center items-center rounded-none bg-gray-300 py-0 my-0 mx-0 px-0">
            {/* Manus Status */}
            <div className="mb-16">
              <div className="flex items-center space-x-1 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-green-500' : 'bg-gray-500'}`}>
                  <Brain className="w-6 h-6 text-slate-50" />
                </div>
                <div className="px-[10px]">
                  <div className="flex items-center space-x-2 mb-1 rounded-none">
                    <span className="font-thin text-zinc-950 text-left text-sm">
                      {isActive ? 'FNTX is active' : 'FNTX is inactive'}
                    </span>
                  </div>
                  <div className="text-zinc-500 text-sm rounded-none mx-0 px-0 my-0 py-0 bg-gray-300">
                    {isActive ? 'Processing your request...' : 'Waiting for instructions'}
                  </div>
                </div>
              </div>
            </div>

            {/* Computer Interface */}
            <div className="p-2 w-full max-w-sm rounded-xl bg-gray-200 py-[2px] my-0 px-0 mx-0">
              <div className="text-center px-0 py-0 my-[30px] mx-[30px] bg-gray-200">
                <div className="w-100 h-100 mb-6 flex items-center justify-center relative rounded-xl px-0 mx-0 my-0 bg-gray-200 py-[30px]">
                  {isActive ? (
                    // Active state - enhanced live video feed
                    <div className="w-40 h-40 bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                      {/* Dark gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black"></div>
                      
                      {/* Grid pattern overlay */}
                      <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `
                          linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px'
                      }}></div>
                      
                      {/* Animated scanning lines */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-400 animate-pulse"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      
                      {/* Central content */}
                      <div className="relative z-10 text-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2 mx-auto">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex items-center space-x-1 mb-1">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-400 font-mono">LIVE</span>
                        </div>
                        <div className="text-xs text-gray-400 font-mono">PROC</div>
                      </div>
                      
                      {/* Processing indicators */}
                      <div className="absolute bottom-3 left-3 right-3 space-y-0.5">
                        <div className="h-0.5 bg-green-400 w-3/4 animate-pulse"></div>
                        <div className="h-0.5 bg-blue-400 w-1/2 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                        <div className="h-0.5 bg-purple-400 w-2/3 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                      </div>
                      
                      {/* Corner indicators */}
                      <div className="absolute top-2 left-2 w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
                      <div className="absolute top-2 right-2 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  ) : (
                    <Monitor className="w-40 h-40 text-gray-400" />
                  )}
                </div>
                <div className="text-slate-500 text-base">
                  {isActive ? 'FNTX\'s Computer is active' : 'FNTX\'s Computer is inactive'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Progress - Fixed at bottom with upward expansion */}
        <div className="relative">
          {/* Expanded tasks - positioned absolutely above the collapsed view */}
          {isTasksExpanded && (
            <div className="absolute bottom-full left-0 right-0 mb-2">
              <div className="p-2 rounded-xl bg-gray-200 py-[10px] px-[12px]">
                <div className="space-y-3">
                  {isActive ? (
                    completedTasks.map((task, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                        <span className="text-xs font-thin text-slate-950">{task}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      </div>
                      <span className="text-xs font-thin text-slate-950">Waiting for user instructions</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Always visible collapsed view */}
          <div className="p-2 rounded-xl bg-gray-200 py-[10px] px-[12px]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-thin text-slate-950">Task progress</h3>
              <div className="flex items-center text-sm text-gray-400">
                <span className="text-slate-950 font-thin text-xs">
                  {isActive ? '4 / 4' : '1 / 1'}
                </span>
                <button 
                  onClick={() => setIsTasksExpanded(!isTasksExpanded)}
                  className="ml-1 hover:bg-gray-300 rounded p-1 transition-colors"
                >
                  {isTasksExpanded ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronUp className="w-4 h-4" />
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
