import AnswerBubble from '../AnswerBubble';
import QuestionBubble from '../QuestionBubble';
import TodayDivider from '../TodayDivider';
import InputPrompt from '../InputPrompt';
import { useParams } from 'react-router-dom';
import { useGetChatQuery } from '../../api/@query/use-get-chat';
import { useMemo } from 'react';
import { UserRole } from '../../types/user-role.enum';
import DropdownChat from '../DropdownChat';

const ChatRoom = () => {
  const params = useParams();
  const conversationId = params.conversationId ?? ('' as string);

  const { data: chat } = useGetChatQuery(conversationId);

  const title = useMemo(() => {
    return chat?.history[0]?.parts[0]?.text;
  }, [chat]);

  return (
    <div
      id="ai-chat-room"
      className="flex bg-gray-600 h-full w-full text-white p-4 pt-0 pl-0"
    >
      <div className="flex flex-col w-full relative">
        <div className="h-[64px] py-5 px-6 pr-0 flex justify-between items-center">
          <h2 className="text-[20px] font-bold text-white capitalize">
            {title}
          </h2>

          <DropdownChat />
        </div>

        <div className="bg-gray-500 py-8 rounded-lg flex justify-center w-full overflow-y-auto flex-1">
          <div className="flex flex-col gap-12 items-start w-[80%]">
            {chat?.history.map((message) => {
              if (message.role === UserRole.USER) {
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

            {/* TODO: fix here */}
            <TodayDivider />

            <div className="p-[40px]" />
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
