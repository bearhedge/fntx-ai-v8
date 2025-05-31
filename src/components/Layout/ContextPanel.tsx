
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

  return (
    <div className="bg-gray-200 text-gray-800 h-full flex flex-col border-l border-gray-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <div className="flex items-center space-x-2">
          <Monitor className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Manus's Computer</h2>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 hover:bg-gray-300 rounded transition-colors flex items-center space-x-1">
                <Monitor className="w-4 h-4" />
                <ChevronDown className="w-3 h-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end">
              <DropdownMenuItem className="flex items-center space-x-3 p-3">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-xs text-white font-medium">VS</span>
                </div>
                <span className="text-sm">VS Code</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center space-x-3 p-3">
                <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-xs text-white font-medium">B</span>
                </div>
                <span className="text-sm">Browser</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button onClick={handleToggle} className="p-1 hover:bg-gray-300 rounded transition-colors">
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="space-y-4">
          {/* Status */}
          <div className="bg-gray-300 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm">Manus is inactive</span>
                </div>
                <div className="text-gray-700 text-sm">Waiting for instructions</div>
              </div>
            </div>
          </div>

          {/* Computer Interface */}
          <div className="bg-gray-300 rounded-lg p-4">
            <div className="text-center mb-4">
              <div className="w-24 h-16 bg-gray-400 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <Monitor className="w-8 h-8 text-gray-600" />
              </div>
              <div className="text-gray-600 text-sm">Manus's computer is inactive</div>
            </div>
          </div>

          {/* Task Progress */}
          <div className="bg-gray-300 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Task progress</h3>
              <div className="flex items-center text-xs text-gray-600">
                <span>1 / 1</span>
                <ChevronRight className="w-3 h-3 ml-1" />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-gray-600 rounded"></div>
              </div>
              <span className="text-gray-700 text-sm">Wait for user instructions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
