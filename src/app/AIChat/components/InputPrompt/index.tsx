import Send from '../../../../assets/icons/send.svg?react';
import ButtonIcon from '../ButtonIcon';
import { ButtonSize, ButtonType } from '../ButtonIcon/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import useGoogleAI from '../../hooks/useGoogleAI';
import { useSendChat } from '../../api/@mutation/use-send-chat';
import { useQueryClient } from '@tanstack/react-query';
import {
  addConversationQueryData,
  setConversationsQueryData,
} from '../../api/@query/use-get-conversations';
import { useNavigate, useParams } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import useSendAIMessageStore from '../../store/useSendAIMessageStore';
import { ROUTE_AI_CHAT } from '../../../../const/routes';
import { useUpdateChat } from '../../api/@mutation/use-update-chat';
import type { ChatMessage } from '../../types/chat.interface';
import {
  addChatQueryData,
  setUpdateAnswerChatQueryData,
  useGetChatQuery,
} from '../../api/@query/use-get-chat';
import { UserRoleEnum } from '../../types/user-role.enum';
import { sleep } from '../../../../utils/sleep';

const InputPrompt = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const params = useParams();
  const navigate = useNavigate();

  const conversationId = params.conversationId ?? '';

  const {
    isLoadingAnswer,
    question,
    setQuestion,
    setAnswer,
    setIsLoadingAnswer,
  } = useSendAIMessageStore(
    useShallow((state) => ({
      isLoadingAnswer: state.isLoadingAnswer,
      question: state.question,
      setQuestion: state.setQuestion,
      setAnswer: state.setAnswer,
      setIsLoadingAnswer: state.setIsLoadingAnswer,
    }))
  );

  const queryClient = useQueryClient();
  const { mutateAsync: initiateChat } = useSendChat();
  const { mutateAsync: updateChat } = useUpdateChat();
  const { sendGoogleAIMessage } = useGoogleAI();
  const { data: chatData } = useGetChatQuery(conversationId, false);

  const isChatAlreadyInitiated = (chatData?.history.length ?? 0) > 1;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleScrollDown = useCallback(() => {
    const chatRoomContainer = document.getElementById('chat-room-container');
    if (chatRoomContainer) {
      chatRoomContainer.scrollTo({
        top: chatRoomContainer.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleSendMessageAI = useCallback(
    async (customQuestion?: string) => {
      await sendGoogleAIMessage({
        message: question || (customQuestion ?? ''),
        onSuccess: async (answer) => {
          await updateChat(
            { id: conversationId, answer },
            {
              onSuccess: (lastChat: ChatMessage) => {
                setQuestion('');
                setAnswer('');
                setIsLoadingAnswer(false);
                setConversationsQueryData(queryClient, conversationId, answer);
                addChatQueryData(queryClient, conversationId, [
                  { ...lastChat, createdAt: new Date().toLocaleString() },
                ]);
              },
            }
          );
        },
      });
    },
    [
      conversationId,
      question,
      queryClient,
      sendGoogleAIMessage,
      updateChat,
      setQuestion,
      setAnswer,
      setIsLoadingAnswer,
    ]
  );

  const handleInitiateChat = async () => {
    setQuestion(inputValue);
    setIsLoadingAnswer(true);
    setInputValue('');

    if (isChatAlreadyInitiated) {
      handleScrollDown();

      await updateChat(
        { id: conversationId, question: inputValue },
        {
          onSuccess: (lastChat: ChatMessage) => {
            setUpdateAnswerChatQueryData(queryClient, conversationId, {
              ...lastChat,
              createdAt: new Date().toLocaleString(),
            });
          },
        }
      );

      await sleep(2000);

      await handleSendMessageAI(inputValue);

      return;
    }

    await initiateChat(
      { title: inputValue },
      {
        onSuccess: (id: string) => {
          void navigate(`${ROUTE_AI_CHAT}/${id}`);
          addConversationQueryData(queryClient, id, inputValue);

          const now = new Date().toLocaleString();
          const chatMessage: ChatMessage[] = [
            {
              id: now,
              role: UserRoleEnum.USER,
              parts: [
                {
                  id: `parts-${now}`,
                  text: inputValue,
                  createdAt: now,
                },
              ],
              createdAt: now,
            },
          ];
          addChatQueryData(queryClient, id, chatMessage);
        },
      }
    );
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void handleInitiateChat();
    }
  };

  useEffect(() => {
    if (conversationId && isLoadingAnswer && !isChatAlreadyInitiated) {
      void handleSendMessageAI();
    }
  }, [
    conversationId,
    isLoadingAnswer,
    isChatAlreadyInitiated,
    handleSendMessageAI,
  ]);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  useEffect(() => {
    const chatRoomContainer = document.getElementById('chat-room-container');

    if (!chatRoomContainer || !isLoadingAnswer) {
      return;
    }

    const scrollInterval = setInterval(() => {
      const scrollHeight = chatRoomContainer.scrollHeight;
      const scrollTop = chatRoomContainer.scrollTop;
      const offsetHeight = chatRoomContainer.offsetHeight;

      const isAtBottom =
        Math.abs(scrollHeight - scrollTop - offsetHeight) < 400; // 400px tolerance

      if (isAtBottom) {
        handleScrollDown();
      }
    }, 200);

    return () => {
      clearInterval(scrollInterval);
    };
  }, [isLoadingAnswer, handleScrollDown]);

  return (
    <div className="relative w-full">
      <ButtonIcon
        type={ButtonType.Tertiary}
        size={ButtonSize.Medium}
        icon={<Send />}
        className="absolute top-[12px] right-[12px] rounded-lg h-8 w-8"
        onClick={() => {
          void handleInitiateChat();
        }}
      />

      <input
        ref={inputRef}
        name="input-prompt"
        placeholder="Ask questions, or type '/' for commands"
        type="text"
        className="w-full h-[56px] rounded-lg bg-gray-400 border-gray-400 pl-[20px] pr-[56px] py-[20px] placeholder:text-gray-200 placeholder:text-[12px] text-[12px] focus:outline-none focus:border-gray-800 border"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handlePressEnter}
        autoFocus
      />
    </div>
  );
};

export default InputPrompt;
