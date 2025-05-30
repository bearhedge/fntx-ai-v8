
import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';

const previousChats = [{
  id: 1,
  title: 'Responding to SparkBrainz ...',
  date: 'Thu',
  active: false
}, {
  id: 2,
  title: 'Hello',
  date: 'Sat',
  active: true
}, {
  id: 3,
  title: 'AI Chatbot for Blockchain-B...',
  date: '5/21',
  active: false
}];

export const Sidebar = () => {
  return (
    <div className="w-80 bg-gray-100 border-r border-gray-300 flex flex-col relative">
      {/* Header with New task button */}
      <div className="p-4 border-b border-gray-300 flex items-center justify-between">
        <button className="flex items-center space-x-2 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium text-gray-700">New task</span>
        </button>
      </div>

      {/* Logo positioned further right, cleanly in the chat area */}
      <div className="absolute top-4 -right-[160px] z-10">
        <svg width="120" height="65" viewBox="0 0 640 347" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          {previousChats.map(chat => (
            <button 
              key={chat.id} 
              className={`w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-colors ${
                chat.active 
                  ? 'bg-gray-200 border border-gray-400' 
                  : 'hover:bg-gray-200'
              }`}
            >
              <MessageSquare className="w-4 h-4 mt-0.5 text-gray-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {chat.title}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {chat.date}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
