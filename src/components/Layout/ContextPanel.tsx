
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
    <div className="bg-gray-800 text-white h-full flex flex-col rounded-l-3xl">
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
      <div className="flex-1 p-8 overflow-auto flex flex-col bg-gray-300">
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
                    // Active state - simulated live video feed
                    <div className="w-40 h-40 bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black opacity-80"></div>
                      <div className="relative z-10 text-center">
                        <Play className="w-12 h-12 text-green-400 mx-auto mb-2" />
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mx-auto"></div>
                        <span className="text-xs text-green-400 block mt-1">LIVE</span>
                      </div>
                      {/* Simulated processing lines */}
                      <div className="absolute top-2 left-2 right-2 h-1 bg-green-400 opacity-30 animate-pulse"></div>
                      <div className="absolute bottom-4 left-4 right-4 space-y-1">
                        <div className="h-0.5 bg-blue-400 w-3/4 animate-pulse"></div>
                        <div className="h-0.5 bg-purple-400 w-1/2 animate-pulse"></div>
                        <div className="h-0.5 bg-green-400 w-2/3 animate-pulse"></div>
                      </div>
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

        {/* Task Progress - Fixed at bottom */}
        <div className="mt-auto">
          <div className="p-2 rounded-xl bg-gray-200 py-[10px] my-[15px] px-[12px] mx-0">
            <Collapsible open={isTasksExpanded} onOpenChange={setIsTasksExpanded}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-thin text-slate-950">Task progress</h3>
                <div className="flex items-center text-sm text-gray-400">
                  <span className="text-slate-950 font-thin text-xs">
                    {isActive ? '4 / 4' : '1 / 1'}
                  </span>
                  <CollapsibleTrigger asChild>
                    <button className="ml-1 hover:bg-gray-300 rounded p-1 transition-colors">
                      {isTasksExpanded ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      }
                    </button>
                  </CollapsibleTrigger>
                </div>
              </div>
              
              <CollapsibleContent className="space-y-0">
                {isTasksExpanded && isActive ? (
                  // Expanded view showing completed tasks
                  <div className="space-y-3 mb-4">
                    {completedTasks.map((task, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                        <span className="text-xs font-thin text-slate-950">{task}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Collapsed view
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-green-500' : 'bg-gray-600'
                    }`}>
                      <div className={`w-1 h-1 rounded-full ${
                        isActive ? 'bg-white' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <span className="text-xs font-thin my-0 py-0 mx-[5px] px-[5px] text-slate-950">
                      {isActive ? 'Validating and delivering enhanced front-end design...' : 'Waiting for user instructions'}
                    </span>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </div>
  );
};
