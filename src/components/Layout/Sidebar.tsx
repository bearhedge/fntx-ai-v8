import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, User, ChevronUp, Settings, Home, Mail, LogOut, PanelLeftClose, PanelLeftOpen, Search, Lock, Unlock, Bell, Zap } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ShareSection } from './ShareSection';
import { Notifications } from './Notifications';

const previousChats = [{
  id: 1,
  title: 'Daily Trading Day',
  preview: 'Based on your feedback, I\'ve co...',
  date: '17:28',
  icon: '🧠',
  active: false
}, {
  id: 2,
  title: 'Daily Trading Day',
  preview: 'You don\'t have enough credits to...',
  date: '4/23',
  icon: '🧠',
  active: true
}, {
  id: 3,
  title: 'Daily Trading Day',
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

  console.log('Sidebar render - showNotifications:', showNotifications);

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
  const handleNotificationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Notification button clicked - current state:', showNotifications);
    setShowNotifications(true);
    console.log('Notification state set to true');
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

  // Simple SVG icons as components
  const PandaIcon = ({
    size = "w-4 h-4"
  }: {
    size?: string;
  }) => <img src="/lovable-uploads/698821d8-abf9-4326-884d-fe71882efa8b.png" alt="Panda" className={`${size} object-contain`} style={{ transform: 'translateY(1px)' }} />;
  
  const SimpleLightbulb = ({
    size = "w-4 h-4"
  }: {
    size?: string;
  }) => <svg className={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 21h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 3a6 6 0 0 1 6 6c0 3-2 4-2 6H8c0-2-2-3-2-6a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>;

  return <div className={`${sidebarWidth} bg-gray-100 border-r border-gray-300 flex flex-col relative transition-all duration-300`} onMouseEnter={() => !isDocked && setIsHovering(true)} onMouseLeave={() => !isDocked && setIsHovering(false)}>
      {/* Header with dock/undock, collapse, New day button, and search */}
      <div className="p-4 border-b border-gray-300">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <button onClick={toggleDock} className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title={isDocked ? "Undock sidebar" : "Dock sidebar"}>
              {isDocked ? <Lock className="w-4 h-4 text-gray-600" /> : <Unlock className="w-4 h-4 text-gray-600" />}
            </button>
            {!isCollapsed && <button onClick={toggleCollapse} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <PanelLeftClose className="w-4 h-4 text-gray-600" />
              </button>}
          </div>
          {!isCollapsed && <button onClick={openSearch} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <Search className="w-4 h-4 text-gray-600" />
            </button>}
        </div>
        {!isCollapsed && <button className="flex items-center space-x-2 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors w-full">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700 flex-1">New day</span>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <span className="px-1 py-0.5 bg-gray-300 rounded text-xs">⌘</span>
              <span className="px-1 py-0.5 bg-gray-300 rounded text-xs">K</span>
            </div>
          </button>}
      </div>

      {isCollapsed ? <>
          {/* Collapsed search button */}
          <div className="p-2">
            <button onClick={openSearch} className="w-full p-2 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center">
              <Search className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Collapsed chat items */}
          <div className="flex-1 overflow-y-auto p-2">
            {previousChats.map(chat => <button key={chat.id} className={`w-full p-2 rounded-lg transition-colors mb-2 ${chat.active ? 'bg-gray-200 border border-gray-400' : 'hover:bg-gray-200'}`}>
                <div className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center mx-auto bg-neutral-300">
                  🧠
                </div>
              </button>)}
          </div>

          <ShareSection isCollapsed={true} />

          {/* Collapsed user profile without notification and knowledge icons */}
          <div className="border-t border-gray-300 p-2 space-y-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full p-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-white border border-gray-300 flex items-center justify-center">
                      <PandaIcon size="w-4 h-4" />
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
                  <SimpleLightbulb />
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
        </> : <>
          {/* Previous chats list */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-2">
              {previousChats.map(chat => <button key={chat.id} className={`w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-colors ${chat.active ? 'bg-gray-200 border border-gray-400' : 'hover:bg-gray-200'}`}>
                  <div className="w-8 h-8 rounded-full text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 bg-neutral-300">
                    🧠
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
                </button>)}
            </div>
          </div>

          <ShareSection isCollapsed={false} />

          {/* User Profile Section with icons */}
          <div className="border-t border-gray-300 p-4">
            <div className="flex items-center space-x-3">
              {/* Dropdown trigger for user profile FIRST */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex-1 flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors text-left">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-white border border-gray-300 flex items-center justify-center">
                        <PandaIcon size="w-4 h-4" />
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
                  
                  <DropdownMenuItem className="flex items-center space-x-2 px-3 py-2" onClick={handleKnowledgeClick}>
                    <SimpleLightbulb />
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
              
              {/* Bell icon SECOND */}
              <button 
                onClick={handleNotificationClick}
                className="p-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <Bell className="w-4 h-4 text-gray-600" />
              </button>
              
              {/* Knowledge icon THIRD with more space to the right and moved 10mm to the left */}
              <button 
                onClick={e => {
                  e.stopPropagation();
                  handleKnowledgeClick();
                }} 
                className="p-2 rounded-lg hover:bg-gray-300 transition-colors mr-2"
                style={{ marginLeft: '1mm' }}
              >
                <SimpleLightbulb />
              </button>
            </div>
          </div>
        </>}

      {/* Search Dialog with enhanced information */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Search chats..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recent Chats">
            {previousChats.map(chat => (
              <CommandItem key={chat.id} className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <MessageSquare className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-900 truncate block">{chat.title}</span>
                    <span className="text-xs text-gray-500 truncate block">{chat.preview}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{chat.date}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Notifications Modal */}
      {showNotifications && (
        <Notifications 
          isOpen={showNotifications} 
          onClose={() => {
            console.log('Closing notifications');
            setShowNotifications(false);
          }} 
        />
      )}
    </div>;
};
