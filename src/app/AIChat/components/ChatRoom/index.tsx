import { useShallow } from 'zustand/shallow';
import useSendAIMessageStore from '../../store/useSendAIMessageStore';
import AnswerBubble from '../AnswerBubble';
import QuestionBubble from '../QuestionBubble';
import TodayDivider from '../TodayDivider';
import InputPrompt from '../InputPrompt';

const ChatRoom = () => {
  const { answer } = useSendAIMessageStore(
    useShallow((state) => ({
      answer: state.answer,
    }))
  );

  return (
    <div
      id="ai-chatbot"
      className="flex bg-gray-600 h-full w-full text-white p-4 pt-0 pl-0"
    >
      <div className="flex flex-col w-full relative">
        <div className="h-[64px] py-5 px-6">
          <h2 className="text-[20px] font-bold text-white">
            Warning Messages Samples
          </h2>
        </div>

        <div className="bg-gray-500 py-8 rounded-lg flex justify-center w-full overflow-y-auto">
          <div className="flex flex-col gap-12 items-start w-[80%]">
            <QuestionBubble />
            <AnswerBubble />
            <TodayDivider />
            <QuestionBubble />
            <AnswerBubble />
            <QuestionBubble />
            <AnswerBubble />
            <QuestionBubble />
            <AnswerBubble />

            <p>{answer}</p>

            <div className="p-[100px]" />
          </div>
        </div>

        <div className="absolute bottom-[16px] w-[80%] left-1/2 -translate-x-1/2 -translate-y-[16px] shadow-custom z-10">
          <InputPrompt />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
