import React from 'react';
import ChatRoom from './components/ChatRoom';
import InputPrompt from './components/InputPrompt';

const AIChatbotPage: React.FC = () => {
  return (
    <div
      id="ai-chatbot"
      className="flex bg-gray-600 h-full w-full p-6 text-white"
    >
      <ChatRoom />

      <div className="absolute bottom-[24px] w-[80%] left-1/2 -translate-x-1/2 -translate-y-[24px]">
        <InputPrompt />
      </div>
    </div>
  );
};

export default AIChatbotPage;
