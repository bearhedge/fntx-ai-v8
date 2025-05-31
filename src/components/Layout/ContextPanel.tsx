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
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-200">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl text-slate-800 font-light">FNTX's Computer</h2>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 hover:bg-gray-700 rounded transition-colors flex items-center space-x-1">
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
          <button onClick={handleToggle} className="p-1 hover:bg-gray-700 rounded transition-colors">
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
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-500">
                  <Brain className="w-6 h-6 text-slate-50" />
                </div>
                <div className="px-[10px]">
                  <div className="flex items-center space-x-2 mb-1 rounded-none">
                    
                    <span className="font-thin text-zinc-950 text-left text-sm">FNTX is inactive</span>
                  </div>
                  <div className="text-zinc-500 text-sm rounded-none mx-0 px-0 my-0 py-0 bg-gray-300">Waiting for instructions</div>
                </div>
              </div>
            </div>

            {/* Computer Interface */}
            <div className="p-2 w-full max-w-sm rounded-xl bg-gray-200 py-[2px] my-0 px-0 mx-0">
              <div className="text-center px-0 py-0 my-[30px] mx-[30px] bg-gray-200">
                <div className="w-100 h-100 mb-6 flex items-center justify-center relative rounded-xl px-0 mx-0 my-0 bg-gray-200 py-[30px]">
                  <Monitor className="w-40 h-40 text-gray-400" />
                  {/* Small power indicator */}
                  
                </div>
                <div className="text-slate-500 text-base">FNTX's Computer is inactive</div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Progress - Fixed at bottom */}
        <div className="mt-auto">
          <div className="p-2 rounded-xl bg-gray-200 py-[10px] my-[15px] px-[12px] mx-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-thin text-slate-950">Task progress</h3>
              <div className="flex items-center text-sm text-gray-400">
                <span className="text-slate-950 font-thin text-xs">1 / 1</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
              <span className="text-xs font-thin my-0 py-0 mx-[5px] px-[5px] text-slate-950">Waiting for user instructions</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};