import AnswerBubble from '../AnswerBubble';
import QuestionBubble from '../QuestionBubble';
import { useParams, useNavigate } from 'react-router-dom';
import { twJoin } from 'tailwind-merge';
import { useGetThreadQuery } from '../../api/@query/use-get-thread';
import { useEffect, useMemo, useRef } from 'react';
import DropdownThread from '../DropdownThread';
import useSendAIMessageStore from '../../store/useSendAIMessageStore';
import { useShallow } from 'zustand/react/shallow';
import { UserRoleEnum } from '../../types/user-role.enum';
import { EnumSpinnerType } from '../ThreadSpinner/types';
import ThreadSpinner from '../ThreadSpinner';
import BubbleGap from '../BubbleGap';
import AnswerError from '../AnswerError';
import { useUser } from '@clerk/clerk-react';

const ThreadRoom = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const isGuest = !user;

  const { answer: answerAI, isLoadingAnswer, error } = useSendAIMessageStore(
    useShallow((state) => ({
      answer: state.answer,
      isLoadingAnswer: state.isLoadingAnswer,
      error: state.error,
    }))
  );

  const ref = useRef<HTMLDivElement>(null);

  const params = useParams();
  const conversationId = params.conversationId ?? ('' as string);

  const { data: detailConversation } = useGetThreadQuery(conversationId, {
    onError: () => {
      navigate('/app/ai-thread');
    },
  });

  const title = useMemo(() => {
    return detailConversation?.history[0]?.parts[0]?.text;
  }, [detailConversation]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
      });
    }
  }, []);

  return (
    <div className="flex flex-col w-full relative">
      <div className="h-[64px] py-5 px-6 pr-0 flex justify-between items-center">
        <h2 className="text-[20px] font-bold text-white capitalize">{title}</h2>

        <DropdownThread />
      </div>

      <div
        ref={ref}
        className={twJoin(
          'bg-gray-500 py-8 rounded-lg',
          'flex justify-center w-full overflow-y-auto flex-1'
        )}
        id="thread-room-container"
      >
        {/* TODO: handle success message */}
        {/* TODO: Handle audio and image */}
        {/* TODO: logout */}
        {/* TODO: infinite scroll */}
        {/* TODO: handle react virtualization */}
        {/* TODO-important: handle maksimum using the conversation */}
        {/* TODO-important: handle responsive */}
        <div className="flex flex-col gap-12 items-start w-[65%]">
          {detailConversation?.history.map((message, index) => {
            if (message.role === UserRoleEnum.USER) {
              return (
                <QuestionBubble
                  date={message.createdAt}
                  key={message.id}
                  message={message.parts[0].text}
                  index={index + 1}
                  isGuest={isGuest}
                />
              );
            }

            return (
              <AnswerBubble
                date={message.createdAt}
                key={message.id}
                answer={message.parts[0].text}
                index={index + 1}
              />
            );
          })}

          {!!answerAI && (
            <AnswerBubble
              key="loading-answer"
              answer={answerAI}
              date={new Date().toLocaleString()}
              index={0}
            />
          )}

          {isLoadingAnswer && (
            <ThreadSpinner type={EnumSpinnerType.GRADIENT_PULSE} />
          )}

          {!isLoadingAnswer && !!error && (
            <AnswerError error={error} />
          )}

          {/* TODO: fix here */}
          {/* <TodayDivider key="today-divider" /> */}

          <BubbleGap conversationId={conversationId} />
        </div>
      </div>
    </div>
  );
};

export default ThreadRoom;
