import React, { useState } from 'react';
import { MessageSquare, Plus, User, ChevronUp, BookOpen, Settings, Home, Mail, LogOut, PanelLeftClose, PanelLeftOpen, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const openSearch = () => {
    setIsSearchOpen(true);
  };
  if (isCollapsed) {
    return <div className="w-16 bg-gray-100 border-r border-gray-300 flex flex-col relative">
        {/* Collapsed header */}
        <div className="p-4 border-b border-gray-300 flex flex-col items-center space-y-3">
          <button onClick={toggleCollapse} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <PanelLeftOpen className="w-4 h-4 text-gray-600" />
          </button>
          <button onClick={openSearch} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <Search className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Collapsed chat items */}
        <div className="flex-1 overflow-y-auto p-2">
          {previousChats.map(chat => <button key={chat.id} className={`w-full p-2 rounded-lg transition-colors mb-2 ${chat.active ? 'bg-gray-200 border border-gray-400' : 'hover:bg-gray-200'}`}>
              <MessageSquare className="w-4 h-4 text-gray-600 mx-auto" />
            </button>)}
        </div>

        {/* Collapsed user profile */}
        <div className="border-t border-gray-300 p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Avatar className="w-8 h-8 mx-auto">
                  <AvatarFallback className="bg-pink-600 text-white text-sm font-medium">
                    BH
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 mb-2 ml-4" align="start" side="right">
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

        {/* Search Dialog */}
        <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <CommandInput placeholder="Search tasks..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Recent">
              {previousChats.map(chat => <CommandItem key={chat.id}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>{chat.title}</span>
                </CommandItem>)}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>;
  }
  return <div className="w-80 bg-gray-100 border-r border-gray-300 flex flex-col relative">
      {/* Header with collapse, New task button, and search */}
      <div className="p-4 border-b border-gray-300">
        <div className="flex items-center justify-between mb-3">
          <button onClick={toggleCollapse} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <PanelLeftClose className="w-4 h-4 text-gray-600" />
          </button>
          <button onClick={openSearch} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <Search className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <button className="flex items-center space-x-2 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors w-full">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium text-gray-700">New day</span>
        </button>
      </div>

      {/* Logo positioned further right, cleanly in the chat area */}
      <div className="absolute top-4 -right-[165px] z-10">
        
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
                <p className="text-sm font-medium text-gray-900">Jimmy Hou</p>
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
              <span>Track record</span>
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

      {/* Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Search tasks..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recent">
            {previousChats.map(chat => <CommandItem key={chat.id}>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>{chat.title}</span>
              </CommandItem>)}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>;
};