import React from 'react';
import ChatRoom from './components/ChatRoom';
import InputPrompt from './components/InputPrompt';
import SidebarHistoryChat from './components/SidebarHistoryChat';

const AIChatbotPage: React.FC = () => {
  return (
    <div className="flex">
      <SidebarHistoryChat />

      <div
        id="ai-chatbot"
        className="flex bg-gray-600 h-full w-full text-white"
      >
        <ChatRoom />

        <div className="absolute bottom-[24px] w-[80%] left-1/2 -translate-x-1/2 -translate-y-[24px]">
          <InputPrompt />
        </div>
      </div>
    </div>
  );
};

export default AIChatbotPage;
