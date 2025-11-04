import AnswerBubble from '../AnswerBubble';
import QuestionBubble from '../QuestionBubble';
import { useParams } from 'react-router-dom';
import { useGetChatQuery } from '../../api/@query/use-get-chat';
import { useEffect, useMemo, useRef } from 'react';
import DropdownChat from '../DropdownChat';
import useSendAIMessageStore from '../../store/useSendAIMessageStore';
import { useShallow } from 'zustand/react/shallow';
import { UserRoleEnum } from '../../types/user-role.enum';
import { EnumSpinnerType } from '../ChatSpinner/types';
import ChatSpinner from '../ChatSpinner';

const ChatRoom = () => {
  const { answer: answerAI, isLoadingAnswer } = useSendAIMessageStore(
    useShallow((state) => ({
      answer: state.answer,
      isLoadingAnswer: state.isLoadingAnswer,
    }))
  );

  const ref = useRef<HTMLDivElement>(null);

  const params = useParams();
  const conversationId = params.conversationId ?? ('' as string);

  const { data: chat } = useGetChatQuery(conversationId);

  const title = useMemo(() => {
    return chat?.history[0]?.parts[0]?.text;
  }, [chat]);

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

        <DropdownChat />
      </div>

      <div
        ref={ref}
        className="bg-gray-500 py-8 rounded-lg flex justify-center w-full overflow-y-auto flex-1"
        id="chat-room-container"
      >
        {/* TODO: saved & unsaved message */}
        {/* TODO: scroll the latest question to the top */}
        {/* TODO: response answer loading appear first than question bubble */}
        <div className="flex flex-col gap-12 items-start w-[80%]">
          {chat?.history.map((message) => {
            if (message.role === UserRoleEnum.USER) {
              return (
                <QuestionBubble
                  date={message.createdAt}
                  key={message.id}
                  message={message.parts[0].text}
                />
              );
            }

            return (
              <AnswerBubble
                date={message.createdAt}
                key={message.id}
                answer={message.parts[0].text}
              />
            );
          })}

          {!!answerAI && (
            <AnswerBubble
              key="loading-answer"
              answer={answerAI}
              date={new Date().toLocaleString()}
            />
          )}

          {isLoadingAnswer && (
            <ChatSpinner type={EnumSpinnerType.GRADIENT_PULSE} />
          )}

          {/* TODO: fix here */}
          {/* <TodayDivider key="today-divider" /> */}

          <div key="padding-spacer" className="p-[40px]" />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
