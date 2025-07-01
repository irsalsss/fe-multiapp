const EmptyChatRoom = () => {
  return (
    <div
      id="ai-chatbot"
      className="flex bg-gray-500 h-full w-full text-white p-4 pt-0"
    >
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-center text-white">
          Ready when you are. Ask me anything!
        </p>
      </div>
    </div>
  );
};

export default EmptyChatRoom;
