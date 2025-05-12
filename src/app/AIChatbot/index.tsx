import React from 'react';
import ChatRoom from './components/ChatRoom';

const AIChatbotPage: React.FC = () => {
  return (
    <div id="ai-chatbot" className="bg-gray-600 h-full w-full p-6 text-white">
      <ChatRoom />
    </div>
  );
};

export default AIChatbotPage; 