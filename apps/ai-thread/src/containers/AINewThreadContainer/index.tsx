import { useShallow } from 'zustand/react/shallow';
import useSendAIMessageStore from '../../store/useSendAIMessageStore';
import { twJoin } from 'tailwind-merge';
import ThreadSpinner from '../../components/ThreadSpinner';
import { EnumSpinnerType } from '../../components/ThreadSpinner/types';
import QuestionBubble from '../../components/QuestionBubble';
import { useUser } from '@clerk/clerk-react';

const AINewThreadContainer = () => {
  const nowDate = new Date().toLocaleString();

  const { user } = useUser();
  const isGuest = !user;
  const { question, isLoadingAnswer } = useSendAIMessageStore(
    useShallow((state) => ({
      question: state.question,
      isLoadingAnswer: state.isLoadingAnswer,
    }))
  );

  return (
    <div className="flex flex-col w-full relative">
      <div className="h-[64px] py-5 px-6 pr-0 flex justify-between items-center">
        <h2 className="text-[20px] font-bold text-white capitalize">
          {question}
        </h2>
      </div>

      {isLoadingAnswer ? (
        <div
          className={twJoin(
            'bg-gray-500 py-8',
            'flex justify-center w-full overflow-y-auto flex-1'
          )}
          id="thread-room-container"
        >
          <div className="flex flex-col gap-12 items-start md:w-[65%] w-[75%]">
            <QuestionBubble
              date={nowDate}
              key={'new-question'}
              message={question}
              index={1}
              isGuest={isGuest}
            />

            <ThreadSpinner type={EnumSpinnerType.GRADIENT_PULSE} />
          </div>
        </div>
      ) : (
        <div
          className={twJoin(
            'bg-gray-500 py-8 rounded-lg',
            'flex justify-center w-full overflow-y-auto flex-1'
          )}
        >
          <div className="flex items-center justify-center h-full w-full">
            <p className="text-center text-white">
              Ready when you are. Ask me anything!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AINewThreadContainer;
