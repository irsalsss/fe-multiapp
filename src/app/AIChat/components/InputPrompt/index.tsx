import Send from '../../../../assets/icons/send.svg?react';
import ButtonIcon from '../ButtonIcon';
import { ButtonSize, ButtonType } from '../ButtonIcon/types';
import { useCallback, useEffect, useState } from 'react';
import useGoogleAI from '../../hooks/useGoogleAI';
import { useSendChat } from '../../api/@mutation/use-send-chat';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY_CONVERSATIONS, setConversationsQueryData } from '../../api/@query/use-get-conversations';
import { useNavigate, useParams } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import useSendAIMessageStore from '../../store/useSendAIMessageStore';
import { ROUTE_AI_CHAT } from '../../../../const/routes';
import { useUpdateChat } from '../../api/@mutation/use-update-chat';
import type { ChatMessagePart } from '../../types/chat.interface';
import { setUpdateChatQueryData } from '../../api/@query/use-get-chat';

const InputPrompt = () => {
  const [inputValue, setInputValue] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  const conversationId = params.conversationId ?? '';

  const { isLoadingAnswer, question, setQuestion, setAnswer, setIsLoadingAnswer } = useSendAIMessageStore(
    useShallow((state) => ({
      isLoadingAnswer: state.isLoadingAnswer,
      question: state.question,
      setQuestion: state.setQuestion,
      setAnswer: state.setAnswer,
      setIsLoadingAnswer: state.setIsLoadingAnswer,
    }))
  );

  const { mutateAsync: initiateChat } = useSendChat();
  const { mutateAsync: updateChat } = useUpdateChat();
  const { sendGoogleAIMessage } = useGoogleAI();
  const queryClient = useQueryClient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessageAI = useCallback(async () => {
    await sendGoogleAIMessage({
      message: question,
      onSuccess: async (answer) => {

        await updateChat(
          { id: conversationId, answer },
          {
            onSuccess: (lastChat: ChatMessagePart) => {
              setQuestion('');
              setAnswer('');
              setIsLoadingAnswer(false);
              setConversationsQueryData(queryClient, conversationId, answer);
              setUpdateChatQueryData(queryClient, conversationId, lastChat);
            },
          }
        );
      },
    }); 
  }, [
    conversationId,
    question,
    queryClient,
    sendGoogleAIMessage,
    updateChat,
    setQuestion,
    setAnswer,
    setIsLoadingAnswer,
  ]);

  const handleInitiateChat = async () => {
    setQuestion(inputValue);
    setIsLoadingAnswer(true);
    setInputValue('');

    await initiateChat(
      { title: inputValue},
      {
        onSuccess: (id: string) => {
          void navigate(`${ROUTE_AI_CHAT}/${id}`);
        },
      }
    );

    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_CONVERSATIONS],
    });
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void handleInitiateChat();
    }
  };

  useEffect(() => {
    if (conversationId && isLoadingAnswer) {
      void handleSendMessageAI();
    }
  }, [conversationId, isLoadingAnswer]);

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
        placeholder="Ask questions, or type ‘/’ for commands"
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
