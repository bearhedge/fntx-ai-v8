import React, { useState } from 'react';
import { MessageSquare, Plus, User, ChevronUp, BookOpen, Settings, Home, Mail, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const previousChats = [{
  id: 1,
  title: 'Wednesday, 28 May 2025',
  date: 'Wed',
  active: false
}, {
  id: 2,
  title: 'Thursday, 29 May 2025',
  date: 'Thu',
  active: true
}, {
  id: 3,
  title: 'Friday, 30 May 2025',
  date: 'Fri',
  active: false
}];

export const Sidebar = () => {
  return <div className="w-80 bg-gray-100 border-r border-gray-300 flex flex-col relative">
      {/* Header with New task button */}
      <div className="p-4 border-b border-gray-300 flex items-center justify-between">
        <button className="flex items-center space-x-2 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium text-gray-700">New day</span>
        </button>
      </div>

      {/* Logo positioned further right, cleanly in the chat area */}
      <div className="absolute top-4 -right-[165px] z-10">
        <svg width="140" height="75" viewBox="0 0 640 347" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M205.848 115.154H282.121V141.048H256.978V253.159H230.334V141.048H205.848V115.154Z" fill="#374151" />
          <path d="M85.0049 115.154H110.148L169.346 205.969V115.154H195.615V253.159H170.378L111.274 162.626V253.159H85.0049V115.154Z" fill="#374151" />
          <path d="M0.656494 115.154H69.1427V140.766H26.6437V165.815H69.1427V191.052H26.6437V253.159H0.656494V115.154Z" fill="#374151" />
          <path d="M232.712 141.035V115.175H314.998L356.238 167.605C356.238 167.605 441.088 55.0648 639.478 0.53479C639.478 0.53479 477.868 51.5648 352.048 212.345C338.068 194.175 292.628 141.045 292.628 141.045H270.057H259.972H232.712V141.035Z" fill="#374151" />
          <path d="M319.538 189.975L341.558 216.885L212.938 346.555L319.538 189.975Z" fill="#9CA3AF" />
          <path d="M361.838 215.715L403.078 263.365H445.718L384.198 186.475L361.838 215.715Z" fill="#9CA3AF" />
        </svg>
      </div>

      {/* Previous chats list */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {previousChats.map(chat => <button key={chat.id} className={`w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-colors ${chat.active ? 'bg-gray-200 border border-gray-400' : 'hover:bg-gray-200'}`}>
              <MessageSquare className="w-4 h-4 mt-0.5 text-gray-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {chat.title}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {chat.date}
                </p>
              </div>
            </button>)}
        </div>
      </div>

      {/* User Profile Section */}
      <div className="border-t border-gray-300 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors text-left">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-pink-600 text-white text-sm font-medium">
                  BH
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Bear Hedge</p>
                <p className="text-xs text-gray-600 truncate">info@bearhedge.com</p>
              </div>
              <ChevronUp className="w-4 h-4 text-gray-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 mb-2 ml-4" align="start" side="top">
            {/* Plan Section */}
            <div className="p-3 bg-gray-50 rounded-lg mb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Free</span>
                <button className="px-3 py-1 bg-black text-white text-xs rounded-full hover:bg-gray-800 transition-colors">
                  Upgrade
                </button>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="flex items-center space-x-1">
                  <span>✨</span>
                  <span>Credits</span>
                </span>
                <span>190 + 291 →</span>
              </div>
            </div>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="flex items-center space-x-2 px-3 py-2">
              <BookOpen className="w-4 h-4" />
              <span>Knowledge</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="flex items-center space-x-2 px-3 py-2">
              <User className="w-4 h-4" />
              <span>Account</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="flex items-center space-x-2 px-3 py-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="flex items-center space-x-2 px-3 py-2">
              <Home className="w-4 h-4" />
              <span>Homepage</span>
              <span className="ml-auto">↗</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="flex items-center space-x-2 px-3 py-2">
              <Mail className="w-4 h-4" />
              <span>Contact us</span>
              <span className="ml-auto">↗</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="flex items-center space-x-2 px-3 py-2 text-red-600">
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>;
};
