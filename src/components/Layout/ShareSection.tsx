
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
    <div className="w-6 h-6 flex items-center justify-center">
      <img 
        src="/lovable-uploads/74deb9a2-253e-47ac-a98c-f1767624e468.png" 
        alt="Hand Heart" 
        className="w-5 h-5"
      />
    </div>
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
        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors text-left"
      >
        <div className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center flex-shrink-0">
          <HandHeartIcon />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900 font-light">Share FNTX with a friend</p>
          <p className="text-xs text-gray-600 font-light">Get 500 credits each</p>
        </div>
        <span className="text-gray-400">→</span>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border-0 p-0 overflow-hidden">
          <div className="relative">
            <DialogHeader className="text-center p-6 pb-4">
              <DialogTitle className="flex items-center justify-center mb-4">
                <img 
                  src="/lovable-uploads/b85318d4-56bb-4df5-bebf-97205c24e092.png" 
                  alt="FNTX" 
                  className="h-8"
                />
              </DialogTitle>
            </DialogHeader>
            
            <div className="px-6 pb-6 space-y-6">
              <p className="text-gray-600 text-center text-sm">Refer a friend, get 500 credits each</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm text-gray-500 px-4">
                  <span>Invitation code</span>
                  <span>Friends invited</span>
                  <span>Share</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-mono text-sm font-medium text-gray-900">FXBXHKSL8XR7</span>
                  <span className="text-sm text-gray-600">1 / 1</span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-200">
                      <Copy className="w-4 h-4 text-gray-600" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-200">
                      <Mail className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-mono text-sm font-medium text-gray-900">L05OUHWNAXE7W9</span>
                  <span className="text-sm text-gray-600">1 / 1</span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-200">
                      <Copy className="w-4 h-4 text-gray-600" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-200">
                      <Mail className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
