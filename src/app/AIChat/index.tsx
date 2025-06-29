import React from 'react';
import ChatRoom from './components/ChatRoom';
import SidebarAIChat from './components/SidebarAIChat';

const AIChatbotPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <SidebarAIChat />

      <div
        id="ai-chatbot"
        className="flex bg-gray-600 h-full w-full text-white"
      >
        <ChatRoom />
      </div>
    </div>
  );
};

export default AIChatbotPage;
