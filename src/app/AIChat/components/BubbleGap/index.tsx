import { useEffect, useMemo, useState } from 'react';
import { useGetChatQuery } from '../../api/@query/use-get-chat';

interface BubbleGapProps {
  conversationId: string;
}

const BubbleGap = ({ conversationId }: BubbleGapProps) => {
  const [gap, setGap] = useState(40);
  const { data: chat } = useGetChatQuery(conversationId, false);

  const chatHistory = useMemo(() => {
    return chat?.history ?? [];
  }, [chat?.history]);

  useEffect(() => {
    const chatRoomContainer = document.getElementById('chat-room-container');
    const chatRoomContainerHeight =
      (chatRoomContainer?.clientHeight ?? 0) -
      (chatRoomContainer?.offsetTop ?? 0);

    const lastAnswerBox = document.getElementById(
      `answer-${chatHistory.length.toString()}`
    );
    const lastAnswerBoxHeight = (lastAnswerBox?.clientHeight ?? 0) + 32; // 32px = icon
    const inputPromptHeight = 56 + 32; // 32px = margin bottom
    const customGap = 32;

    setGap(
      chatRoomContainerHeight -
        lastAnswerBoxHeight -
        inputPromptHeight -
        customGap
    );
  }, [chatHistory]);

  return (
    <div
      style={{ paddingTop: gap }}
      id="padding-gap"
      key="padding-gap"
      className="p-[40px]"
    />
  );
};

export default BubbleGap;
