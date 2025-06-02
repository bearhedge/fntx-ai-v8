
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Mail, Hand, Heart } from 'lucide-react';

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
      <div className="border-t border-gray-100 p-4">
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
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl border-0 p-8">
          <DialogHeader className="text-center pb-6">
            <div className="flex justify-center mb-6">
              <HandHeartIcon />
            </div>
            <div className="border-2 border-yellow-400 rounded-lg p-4 mb-4">
              <DialogTitle className="text-2xl font-medium text-gray-900">
                Share FNTX with a friend
              </DialogTitle>
            </div>
            <p className="text-gray-600">Refer a friend, get 500 credits each</p>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 font-medium">
              <div className="text-left">Invitation code</div>
              <div className="text-center">Friends invited</div>
              <div className="text-right">Share</div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 items-center py-3 px-4 bg-gray-50 rounded-lg">
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
              
              <div className="grid grid-cols-3 gap-4 items-center py-3 px-4 bg-gray-50 rounded-lg">
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
