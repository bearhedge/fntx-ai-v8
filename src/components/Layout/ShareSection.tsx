
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Mail } from 'lucide-react';

interface ShareSectionProps {
  isCollapsed: boolean;
}

export const ShareSection = ({
  isCollapsed
}: ShareSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const HandHeartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
      <path d="M10 6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" fill="white"/>
    </svg>
  );

  if (isCollapsed) {
    return (
      <button 
        onClick={() => setIsOpen(true)} 
        className="w-full p-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
      >
        <HandHeartIcon />
      </button>
    );
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors text-left border border-blue-400 bg-blue-50"
      >
        <div className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center flex-shrink-0">
          <HandHeartIcon />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900 font-medium">Share FNTX with a friend</p>
          <p className="text-xs text-gray-600 font-light">Get 500 credits each</p>
        </div>
        <span className="text-gray-400">→</span>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border-0 p-6">
          <DialogHeader className="text-center mb-6">
            <DialogTitle className="flex items-center justify-center mb-4">
              <img 
                src="/lovable-uploads/b85318d4-56bb-4df5-bebf-97205c24e092.png" 
                alt="FNTX" 
                className="h-8"
              />
            </DialogTitle>
            <p className="text-gray-600 text-center">Refer a friend, get 500 credits each</p>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 px-2">
              <span>Invitation code</span>
              <span className="text-center">Friends invited</span>
              <span className="text-right">Share</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-mono text-sm font-medium text-gray-900">FXBXHKSL8XR7</span>
              <span className="text-sm text-gray-600 text-center">1 / 1</span>
              <div className="flex justify-end space-x-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-mono text-sm font-medium text-gray-900">L05OUHWNAXE7W9</span>
              <span className="text-sm text-gray-600 text-center">1 / 1</span>
              <div className="flex justify-end space-x-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
