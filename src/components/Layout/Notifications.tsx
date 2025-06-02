
import React from 'react';
import { X } from 'lucide-react';

interface NotificationItem {
  id: number;
  date: string;
  title: string;
  body: string;
  visual?: string;
}

interface NotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications: NotificationItem[] = [
  {
    id: 1,
    date: 'May 29, 2025',
    title: 'Introducing FNTX slides',
    body: 'FNTX creates stunning, structured presentations—instantly. With a single prompt, FNTX generates entire slide decks tailored to your needs. Whether you\'re presenting in a boardroom, a classroom, or online, FNTX ensures your message lands. Want edits? Just click and adjust. Once you are done, export or share it with colleagues and peers.',
    visual: '/api/placeholder/400/200'
  },
  {
    id: 2,
    date: 'May 27, 2025',
    title: 'Edit text directly on FNTX-generated website!',
    body: 'No more starting over for small changes. Customize wording instantly, perfect your messaging, and make your content truly yours with just a few clicks.',
    visual: '/api/placeholder/400/200'
  }
];

export const Notifications = ({ isOpen, onClose }: NotificationsProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto border-0">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-semibold text-gray-900">Notifications</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          {mockNotifications.map((notification) => (
            <div key={notification.id} className="space-y-4">
              <div className="text-sm text-gray-500 font-medium">{notification.date}</div>
              <h3 className="text-xl font-semibold text-gray-900">{notification.title}</h3>
              <p className="text-gray-600 leading-relaxed text-base">{notification.body}</p>
              {notification.visual && (
                <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                  <span className="text-gray-500">Visual Content</span>
                </div>
              )}
              {notification.id !== mockNotifications.length && (
                <div className="border-b border-gray-100 pt-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
