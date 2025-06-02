import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, User, ChevronUp, Settings, Home, Mail, LogOut, PanelLeftClose, PanelLeftOpen, Search, Lock, Unlock, Bell, Zap } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ShareSection } from './ShareSection';
import { Notifications } from './Notifications';

const previousChats = [{
  id: 1,
  title: 'Daily trading day',
  preview: 'Based on your feedback, I\'ve co...',
  date: '17:28',
  icon: '🧠',
  active: false
}, {
  id: 2,
  title: 'Daily trading day',
  preview: 'You don\'t have enough credits to...',
  date: '4/23',
  icon: '🧠',
  active: true
}, {
  id: 3,
  title: 'Daily trading day',
  preview: 'Let me create a comprehensive...',
  date: 'Yesterday',
  icon: '🧠',
  active: false
}];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDocked, setIsDocked] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDock = () => {
    setIsDocked(!isDocked);
    if (isDocked) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const handleKnowledgeClick = () => {
    console.log('Knowledge clicked');
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        openSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isDocked) {
      if (isHovering) {
        setIsCollapsed(false);
      } else {
        const timer = setTimeout(() => {
          setIsCollapsed(true);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [isHovering, isDocked]);

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-80';

  const BrainIcon = ({ size = 'w-6 h-6' }: { size?: string }) => (
    <svg className={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C8.68629 3 6 5.68629 6 9V11C6 11.5523 5.55228 12 5 12C4.44772 12 4 11.5523 4 11V9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9V11C20 11.5523 19.5523 12 19 12C18.4477 12 18 11.5523 18 11V9C18 5.68629 15.3137 3 12 3Z" fill="currentColor"/>
      <path d="M7 14C7 12.8954 7.89543 12 9 12C10.1046 12 11 12.8954 11 14V18C11 19.1046 10.1046 20 9 20C7.89543 20 7 19.1046 7 18V14Z" fill="currentColor"/>
      <path d="M13 14C13 12.8954 13.8954 12 15 12C16.1046 12 17 12.8954 17 14V18C17 19.1046 16.1046 20 15 20C13.8954 20 13 19.1046 13 18V14Z" fill="currentColor"/>
    </svg>
  );

  const LightbulbIcon = ({ size = 'w-4 h-4' }: { size?: string }) => (
    <svg className={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 21C9 21.5523 9.44772 22 10 22H14C14.5523 22 15 21.5523 15 21C15 20.4477 14.5523 20 14 20H10C9.44772 20 9 20.4477 9 21Z" fill="currentColor"/>
      <path d="M12 2C8.13401 2 5 5.13401 5 9C5 11.3891 6.26156 13.4894 8.14061 14.7094C8.60827 15.0398 8.99022 15.4616 9.26773 15.9438C9.54525 16.426 9.71171 16.9564 9.75826 17.5H14.2417C14.2883 16.9564 14.4547 16.426 14.7323 15.9438C15.0098 15.4616 15.3917 15.0398 15.8594 14.7094C17.7384 13.4894 19 11.3891 19 9C19 5.13401 15.866 2 12 2Z" fill="currentColor"/>
    </svg>
  );

  return (
    <div 
      className={`${sidebarWidth} bg-gray-100 border-r border-gray-300 flex flex-col relative transition-all duration-300`}
      onMouseEnter={() => !isDocked && setIsHovering(true)}
      onMouseLeave={() => !isDocked && setIsHovering(false)}
    >
      {/* Header with dock/undock, collapse, New day button, and search */}
      <div className="p-4 border-b border-gray-300">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleDock} 
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors" 
              title={isDocked ? "Undock sidebar" : "Dock sidebar"}
            >
              {isDocked ? <Lock className="w-4 h-4 text-gray-600" /> : <Unlock className="w-4 h-4 text-gray-600" />}
            </button>
            {!isCollapsed && (
              <button onClick={toggleCollapse} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <PanelLeftClose className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>
          {!isCollapsed && (
            <button onClick={openSearch} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <Search className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>
        {!isCollapsed && (
          <button className="flex items-center space-x-2 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors w-full">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700 flex-1">New day</span>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <span className="px-1 py-0.5 bg-gray-300 rounded text-xs">⌘</span>
              <span className="px-1 py-0.5 bg-gray-300 rounded text-xs">K</span>
            </div>
          </button>
        )}
      </div>

      {isCollapsed ? (
        <>
          {/* Collapsed search button */}
          <div className="p-2">
            <button onClick={openSearch} className="w-full p-2 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center">
              <Search className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Collapsed chat items */}
          <div className="flex-1 overflow-y-auto p-2">
            {previousChats.map(chat => (
              <button 
                key={chat.id} 
                className={`w-full p-2 rounded-lg transition-colors mb-2 ${chat.active ? 'bg-gray-200 border border-gray-400' : 'hover:bg-gray-200'}`}
              >
                <div className="w-6 h-6 rounded-lg bg-gray-200 text-gray-600 text-xs flex items-center justify-center mx-auto">
                  <BrainIcon size="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>

          {/* Collapsed user profile */}
          <div className="border-t border-gray-300 p-2 space-y-2">
            {/* Share section when collapsed */}
            <ShareSection isCollapsed={true} />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full p-2 rounded-lg hover:bg-gray-200 transition-colors flex flex-col items-center space-y-2">
                  {/* Notification and Knowledge icons row */}
                  <div className="flex space-x-1">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowNotifications(true);
                      }} 
                      className="p-1 rounded hover:bg-gray-300 transition-colors"
                    >
                      <Bell className="w-3 h-3 text-gray-600" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleKnowledgeClick();
                      }} 
                      className="p-1 rounded hover:bg-gray-300 transition-colors"
                    >
                      <LightbulbIcon size="w-3 h-3" />
                    </button>
                  </div>
                  
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/lovable-uploads/7298bd16-e578-4e19-b93f-68c7989ae501.png" alt="Panda" />
                    <AvatarFallback className="bg-pink-600 text-white text-sm font-medium">
                      🐼
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
                
                <DropdownMenuItem className="flex items-center space-x-2 px-3 py-2" onClick={handleKnowledgeClick}>
                  <LightbulbIcon />
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
        </>
      ) : (
        <>
          {/* Previous chats list */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-2">
              {previousChats.map(chat => (
                <button 
                  key={chat.id} 
                  className={`w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-colors ${chat.active ? 'bg-gray-200 border border-gray-400' : 'hover:bg-gray-200'}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-200 text-gray-600 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BrainIcon size="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 truncate font-light text-sm">
                      {chat.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-1 truncate font-light">
                      {chat.preview}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 flex-shrink-0 mt-0.5">
                    {chat.date}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* User Profile Section with share and icons */}
          <div className="border-t border-gray-300 p-4">
            {/* Share section */}
            <div className="mb-4">
              <ShareSection isCollapsed={false} />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors text-left">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/lovable-uploads/7298bd16-e578-4e19-b93f-68c7989ae501.png" alt="Panda" />
                    <AvatarFallback className="bg-pink-600 text-white text-sm font-medium">
                      🐼
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Jimmy Hou</p>
                    <p className="text-xs text-gray-600 truncate">info@bearhedge.com</p>
                  </div>
                  
                  {/* Notification and Knowledge icons aligned with username */}
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowNotifications(true);
                      }} 
                      className="p-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <Bell className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleKnowledgeClick();
                      }} 
                      className="p-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <LightbulbIcon />
                    </button>
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  </div>
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
                
                <DropdownMenuItem className="flex items-center space-x-2 px-3 py-2" onClick={handleKnowledgeClick}>
                  <LightbulbIcon />
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
        </>
      )}

      {/* Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Search tasks..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recent">
            {previousChats.map(chat => (
              <CommandItem key={chat.id}>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>{chat.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Notifications Modal */}
      <Notifications isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </div>
  );
};
