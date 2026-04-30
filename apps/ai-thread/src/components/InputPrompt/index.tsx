import Send from '../../assets/icons/send.svg?react';
import ButtonIcon from '../ButtonIcon';
import { twJoin } from 'tailwind-merge';
import { useCallback, useMemo, useState } from 'react';
import useGoogleAI from '../../hooks/useGoogleAI';
import { useSendThread } from '../../api/@mutation/use-send-thread';
import { useQueryClient } from '@tanstack/react-query';
import {
  addConversationQueryData,
  setConversationsQueryData,
} from '../../api/@query/use-get-conversations';
import { useNavigate, useParams } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import useSendAIMessageStore from '../../store/useSendAIMessageStore';
import { ROUTE_AI_THREAD } from '../../const/routes';
import { useUpdateThread } from '../../api/@mutation/use-update-thread';
import type { ThreadMessage } from '../../types/thread.interface';
import {
  addThreadQueryData,
  setUpdateAnswerThreadQueryData,
  useGetThreadQuery,
} from '../../api/@query/use-get-thread';
import { UserRoleEnum } from '../../types/user-role.enum';
import { sleep } from '../../utils/sleep';

import { useFocusInput } from '../../hooks/useFocusInput';
import { useCheckLimit } from '../../hooks/useCheckLimit';
import { useLimitStore } from '../../store/useLimitStore';

const InputPrompt = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useFocusInput();

  const params = useParams();
  const navigate = useNavigate();
  const { isLimitReached } = useCheckLimit();
  const { setIsShowLimitModal } = useLimitStore(useShallow((state) => ({
    setIsShowLimitModal: state.setIsShowLimitModal,
  })));

  const conversationId = params.conversationId ?? '';

  const { question, setQuestion, setAnswer, setIsLoadingAnswer } =
    useSendAIMessageStore(
      useShallow((state) => ({
        question: state.question,
        setQuestion: state.setQuestion,
        setAnswer: state.setAnswer,
        setIsLoadingAnswer: state.setIsLoadingAnswer,
      }))
    );

  const queryClient = useQueryClient();
  const { mutateAsync: initiateThread } = useSendThread();
  const { mutateAsync: updateThread } = useUpdateThread();
  const { sendGoogleAIMessage } = useGoogleAI();
  const { data: threadData } = useGetThreadQuery(conversationId, { enabled: false });

  const threadHistory = useMemo(() => {
    return threadData?.history ?? [];
  }, [threadData?.history]);
  const threadHistoryLength = threadHistory.length;

  const isThreadAlreadyInitiated = threadHistoryLength > 1;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleToLastQuestion = () => {
    const threadRoomContainer = document.getElementById(
      'thread-room-container'
    );
    const lastThread = threadHistory[threadHistoryLength - 1];
    const role = lastThread.role;

    const lastQuestionBox = document.getElementById(
      `${role}-${threadHistory.length.toString()}`
    );

    threadRoomContainer?.scrollTo({
      behavior: 'smooth',
      top:
        (lastQuestionBox?.offsetTop ?? 0) +
        (lastQuestionBox?.clientHeight ?? 0),
    });
  };

  const handleSendMessageAI = useCallback(
    async (customQuestion: string, customId?: string) => {
      const id = conversationId || (customId ?? '');
      await sendGoogleAIMessage({
        message: question || customQuestion,
        onSuccess: async (answer) => {
          await updateThread(
            { id, answer },
            {
              onSuccess: (lastThread: ThreadMessage) => {
                const now = new Date().toISOString();
                setQuestion('');
                setAnswer('');
                setIsLoadingAnswer(false);
                setConversationsQueryData(queryClient, id, answer);
                addThreadQueryData(queryClient, id, [
                  {
                    ...lastThread,
                    id: now,
                    createdAt: new Date().toISOString(),
                  },
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
      updateThread,
      setQuestion,
      setAnswer,
      setIsLoadingAnswer,
    ]
  );

  const handleInitiateThread = async () => {
    if (isLimitReached) {
      setIsShowLimitModal(true);
      setInputValue('');
      inputRef?.current?.blur();
      return;
    }

    setQuestion(inputValue);
    setIsLoadingAnswer(true);
    setInputValue('');

    if (isThreadAlreadyInitiated) {
      await updateThread(
        { id: conversationId, question: inputValue },
        {
          onSuccess: (lastThread: ThreadMessage) => {
            const now = new Date().toISOString();
            setUpdateAnswerThreadQueryData(queryClient, conversationId, {
              ...lastThread,
              id: now,
              createdAt: now,
            });
            setTimeout(() => {
              handleToLastQuestion();
            }, 100);
          },
        }
      );

      await sleep(1500);

      await handleSendMessageAI(inputValue);

      return;
    }

    await initiateThread(
      { title: inputValue },
      {
        onSuccess: (id: string) => {
          void navigate(`${ROUTE_AI_THREAD}/${id}`);
          addConversationQueryData(queryClient, id, inputValue);

          const now = new Date().toISOString();
          const threadMessage: ThreadMessage[] = [
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
          addThreadQueryData(queryClient, id, threadMessage);
          void handleSendMessageAI(inputValue, id);
        },
      }
    );
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void handleInitiateThread();
    }
  };


  return (
    <div className="relative w-full">
      <ButtonIcon
        type="tertiary"
        size="medium"
        icon={<Send />}
        className="absolute top-[50%] translate-y-[-50%] right-[12px] rounded-lg h-8 w-8 z-10"
        onClick={() => {
          void handleInitiateThread();
        }}
      />

      <input
        ref={inputRef}
        name="input-prompt"
        placeholder="Ask questions, or type '/' for commands"
        type="text"
        className={twJoin(
          'w-full rounded-xl bg-white/5 backdrop-blur-sm border border-white/10',
          'pl-[20px] pr-[56px] py-[20px]',
          'md:h-[64px] md:placeholder:text-[16px] md:text-[16px]',
          'placeholder:text-white/60 h-[56px] placeholder:text-[16px] text-[16px] text-white',
          'focus:outline-none focus:border-white/30 focus:bg-white/10',
          'transition-all duration-200 animate-pulse hover:animate-none focus:animate-none',
          'hover:border-blue-400/50 focus:border-blue-400/70',
          'hover:shadow-lg hover:shadow-blue-400/20 focus:shadow-xl focus:shadow-blue-400/30'
        )}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handlePressEnter}
        autoFocus
      />
    </div>
  );
};

export default InputPrompt;
