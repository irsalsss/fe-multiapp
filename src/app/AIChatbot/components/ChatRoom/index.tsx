import { useShallow } from 'zustand/shallow';
import useSendAIMessageStore from '../../store/useSendAIMessageStore';
import AnswerBubble from '../AnswerBubble';
import QuestionBubble from '../QuestionBubble';
import TodayDivider from '../TodayDivider';

const ChatRoom = () => {
  const { answer } = useSendAIMessageStore(
    useShallow((state) => ({
      answer: state.answer,
    })),
  )

  return (
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
  );
};

export default ChatRoom;
