import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Monitor, Minimize2, Brain, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
interface ContextPanelProps {
  isOpen?: boolean;
  onToggle?: () => void;
}
export const ContextPanel = ({
  isOpen: externalIsOpen,
  onToggle
}: ContextPanelProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const handleToggle = onToggle || (() => setInternalIsOpen(!internalIsOpen));
  return <div className="bg-gray-800 text-white h-full flex flex-col rounded-l-3xl">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-100">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg text-gray-950 font-bold">FNTX's Computer</h2>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 hover:bg-gray-700 rounded transition-colors flex items-center space-x-1">
                <Monitor className="w-4 h-4" />
                <ChevronDown className="w-3 h-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-gray-700 border-gray-600" align="end">
              <DropdownMenuItem className="flex items-center space-x-3 p-3 text-white hover:bg-gray-600">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-xs text-white font-medium">VS</span>
                </div>
                <span className="text-sm">VS Code</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center space-x-3 p-3 text-white hover:bg-gray-600">
                <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-xs text-white font-medium">B</span>
                </div>
                <span className="text-sm">Browser</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button onClick={handleToggle} className="p-1 hover:bg-gray-700 rounded transition-colors">
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-auto flex flex-col bg-gray-100">
        <div className="flex-1 flex flex-col">
          {/* Status - Centered in the main area */}
          <div className="flex-1 flex flex-col justify-center items-center rounded-none bg-gray-100">
            {/* Manus Status */}
            <div className="mb-16">
              <div className="flex items-center space-x-1 mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-300">
                  <Brain className="w-6 h-6 text-gray-400" />
                </div>
                <div className="px-[10px]">
                  <div className="flex items-center space-x-2 mb-1 rounded-none">
                    
                    <span className="font-thin text-zinc-950 text-left text-sm">FNTX is inactive</span>
                  </div>
                  <div className="text-gray-200 text-sm rounded-none mx-0 px-0 my-0 py-0 bg-gray-100">Waiting for instructions</div>
                </div>
              </div>
            </div>

            {/* Computer Interface */}
            <div className="p-15 w-full max-w-sm bg-zinc-300 rounded-xl">
              <div className="text-center bg-zinc-300 px-0 py-0 my-[30px] mx-[30px]">
                <div className="w-200 h-200 mb-6 flex items-center justify-center relative bg-gray-100 rounded-xl px-0 mx-0 my-0 py-[10px]">
                  <Monitor className="w-40 h-40 text-gray-400" />
                  {/* Small power indicator */}
                  
                </div>
                <div className="text-gray-500 text-base">FNTX's Computer is inactive</div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Progress - Fixed at bottom */}
        <div className="mt-auto">
          <div className="p-2 bg-slate-200 rounded-xl px-[12px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-thin text-zinc-950">Task progress</h3>
              <div className="flex items-center text-sm text-gray-400">
                <span className="text-xs text-slate-700">1 / 1</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
              <span className="text-zinc-950 text-xs font-thin">Waiting for user instructions</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};