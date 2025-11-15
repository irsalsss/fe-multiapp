import { useShallow } from 'zustand/react/shallow';
import useSendAIMessageStore from '../../store/useSendAIMessageStore';

const AINewThreadContainer = () => {
  const { question } = useSendAIMessageStore(
    useShallow((state) => ({
      answer: state.answer,
      question: state.question,
    }))
  );

  return (
    <div className="flex flex-col w-full relative">
      <div className="h-[64px] py-5 px-6 pr-0 flex justify-between items-center">
        <h2 className="text-[20px] font-bold text-white capitalize">
          {question}
        </h2>
      </div>

      <div className="bg-gray-500 py-8 rounded-lg flex justify-center w-full overflow-y-auto flex-1">
        <div className="flex items-center justify-center h-full w-full">
          <p className="text-center text-white">
            Ready when you are. Ask me anything!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AINewThreadContainer;
