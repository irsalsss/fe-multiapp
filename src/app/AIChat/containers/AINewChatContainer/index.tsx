import { useShallow } from 'zustand/react/shallow';
import InputPrompt from '../../components/InputPrompt';
import useSendAIMessageStore from '../../store/useSendAIMessageStore';
import AnswerBubble from '../../components/AnswerBubble';
import QuestionBubble from '../../components/QuestionBubble';

const AINewChatContainer = () => {
  const { answer, question } = useSendAIMessageStore(
    useShallow((state) => ({
      answer: state.answer,
      question: state.question,
    }))
  );

  return (
    <div
      id="new-ai-chat"
      className="flex bg-gray-600 h-full w-full text-white p-4 pt-0 pl-0"
    >
      <div className="flex flex-col w-full relative">
        <div className="h-[64px] py-5 px-6 pr-0 flex justify-between items-center">
          <h2 className="text-[20px] font-bold text-white capitalize">
            {question}
          </h2>
        </div>

        <div className="bg-gray-500 py-8 rounded-lg flex justify-center w-full overflow-y-auto flex-1">
          {answer || question ? (
            <div className="flex flex-col gap-12 items-start w-[80%]">
              <QuestionBubble
                date={new Date().toISOString()}
                message={question}
              />
              <AnswerBubble answer={answer} date={new Date().toISOString()} />
              <div className="p-[40px]" />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-center text-white">
                Ready when you are. Ask me anything!
              </p>
            </div>
          )}
        </div>

        <div className="absolute bottom-[16px] w-[80%] left-1/2 -translate-x-1/2 -translate-y-[16px] shadow-custom z-10">
          <InputPrompt />
        </div>
      </div>
    </div>
  );
};

export default AINewChatContainer;
