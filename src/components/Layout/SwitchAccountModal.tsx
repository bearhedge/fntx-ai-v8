
import React from 'react';
import { X, Check, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SwitchAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SwitchAccountModal: React.FC<SwitchAccountModalProps> = ({ isOpen, onClose }) => {
  const PandaIcon = ({ size = "w-8 h-8" }: { size?: string }) => (
    <img 
      src="/lovable-uploads/698821d8-abf9-4326-884d-fe71882efa8b.png" 
      alt="Panda" 
      className={`${size} object-contain`} 
    />
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-800 text-white border-gray-700">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-lg font-normal text-white">Select a workspace</DialogTitle>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <div className="space-y-3">
          {/* Current workspace */}
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg border border-gray-600">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-yellow-500 text-white font-semibold">
                  J
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-white">Jimmy Hou</p>
                <p className="text-sm text-gray-400">Personal</p>
              </div>
            </div>
            <Check className="w-5 h-5 text-white" />
          </div>
          
          {/* Create team option */}
          <button className="flex items-center justify-center w-full p-4 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-600 transition-colors">
            <Plus className="w-5 h-5 mr-2 text-gray-400" />
            <span className="text-gray-300">Create a team</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
