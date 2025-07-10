import Send from '../../../../assets/icons/send.svg?react';
import ButtonIcon from '../ButtonIcon';
import { ButtonSize, ButtonType } from '../ButtonIcon/types';
import { useState } from 'react';
import useGoogleAI from '../../hooks/useGoogleAI';
import { useSendChat } from '../../api/@mutation/use-send-chat';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY_CONVERSATIONS } from '../../api/@query/use-get-conversations';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import useSendAIMessageStore from '../../store/useSendAIMessageStore';

const InputPrompt = () => {
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  const { setQuestion, setAnswer, setIsLoadingAnswer } = useSendAIMessageStore(
    useShallow((state) => ({
      setQuestion: state.setQuestion,
      setAnswer: state.setAnswer,
      setIsLoadingAnswer: state.setIsLoadingAnswer,
    }))
  );

  const { mutateAsync: sendChat } = useSendChat();
  const { sendGoogleAIMessage } = useGoogleAI();
  const queryClient = useQueryClient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    setQuestion(inputValue);

    await sendGoogleAIMessage({
      message: inputValue,
      onSuccess: async (title, description) => {
        await sendChat(
          { title, description },
          {
            onSuccess: (id: string) => {
              setQuestion('');
              setAnswer('');
              setIsLoadingAnswer(false);
              void navigate(`/ai-chat/${id}`);
            },
          }
        );

        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_CONVERSATIONS],
        });

        setInputValue('');
      },
    });
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void handleSendMessage();
    }
  };

  return (
    <div className="relative w-full">
      <ButtonIcon
        type={ButtonType.Tertiary}
        size={ButtonSize.Medium}
        icon={<Send />}
        className="absolute top-[12px] right-[12px] rounded-lg h-8 w-8"
        onClick={() => {
          void handleSendMessage();
        }}
      />

      <input
        placeholder="Ask questions, or type ‘/’ for commands"
        type="text"
        className="w-full h-[56px] rounded-lg bg-gray-400 border-gray-400 pl-[20px] pr-[56px] py-[20px] placeholder:text-gray-200 placeholder:text-[12px] text-[12px] focus:outline-none focus:border-gray-800 border"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handlePressEnter}
      />
    </div>
  );
};

export default InputPrompt;
