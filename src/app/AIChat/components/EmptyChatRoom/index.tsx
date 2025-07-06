import InputPrompt from "../InputPrompt";

const EmptyChatRoom = () => {
  return (
    <div
      id="ai-chatbot"
      className="flex bg-gray-500 h-full w-full text-white p-4 pt-0 relative"
    >
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-center text-white">
          Ready when you are. Ask me anything!
        </p>
      </div>

      <div className="absolute bottom-[16px] w-[80%] left-1/2 -translate-x-1/2 -translate-y-[16px] shadow-custom z-10">
        <InputPrompt />
      </div>
    </div>
  );
};

export default EmptyChatRoom;
