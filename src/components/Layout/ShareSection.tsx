
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Mail, Hand, Heart } from 'lucide-react';

interface ShareSectionProps {
  isCollapsed: boolean;
}

export const ShareSection = ({ isCollapsed }: ShareSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const HandHeartIcon = () => (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <Hand className="w-5 h-5 text-black" strokeWidth={1.5} />
      <Heart className="w-2 h-2 text-black absolute top-0 right-0" fill="black" strokeWidth={1} />
    </div>
  );

  if (isCollapsed) {
    return (
      <div className="border-t border-gray-300 p-2">
        <button 
          onClick={() => setIsOpen(true)}
          className="w-full p-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
        >
          <HandHeartIcon />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="border-t border-gray-300 p-4">
        <button 
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center flex-shrink-0">
            <HandHeartIcon />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">Share FNTX with a friend</p>
            <p className="text-xs text-gray-600">Get 500 credits each</p>
          </div>
          <span className="text-gray-400">→</span>
        </button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">
              <div className="text-2xl font-bold text-gray-800">FNTX</div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <p className="text-gray-600 text-center">Refer a friend, get 500 credits each</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Invitation code</span>
                <span>Friends invited</span>
                <span>Share</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-mono text-sm">FXBXHKSL8XR7</span>
                <span className="text-sm text-gray-600">1 / 1</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-mono text-sm">L05OUHWNAXE7W9</span>
                <span className="text-sm text-gray-600">1 / 1</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
