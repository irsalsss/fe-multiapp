import AnswerBubble from '../AnswerBubble';
import QuestionBubble from '../QuestionBubble';
import TodayDivider from '../TodayDivider';

const ChatRoom = () => {
  return (
    <div className="bg-gray-500 py-8 rounded-lg flex justify-center w-full">
      <div className="flex flex-col gap-12 items-start w-[80%]">
        <QuestionBubble />
        <AnswerBubble />
        <TodayDivider />
        <QuestionBubble />
        <AnswerBubble />
      </div>
    </div>
  );
};

export default ChatRoom;
