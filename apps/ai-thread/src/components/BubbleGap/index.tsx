import { useEffect, useMemo, useState } from 'react';
import { useGetThreadQuery } from '../../api/@query/use-get-thread';

interface BubbleGapProps {
  conversationId: string;
}

const BubbleGap = ({ conversationId }: BubbleGapProps) => {
  const [gap, setGap] = useState(40);
  const { data: thread } = useGetThreadQuery(conversationId, { enabled: false });

  const threadHistory = useMemo(() => {
    return thread?.history ?? [];
  }, [thread?.history]);

  useEffect(() => {
    const threadRoomContainer = document.getElementById('thread-room-container');
    const threadRoomContainerHeight =
      (threadRoomContainer?.clientHeight ?? 0) -
      (threadRoomContainer?.offsetTop ?? 0);

    const lastAnswerBox = document.getElementById(
      `answer-${threadHistory.length.toString()}`
    );
    const lastAnswerBoxHeight = (lastAnswerBox?.clientHeight ?? 0) + 32; // 32px = icon
    const inputPromptHeight = 56 + 32; // 32px = margin bottom
    const customGap = 32;

    setGap(
      threadRoomContainerHeight -
        lastAnswerBoxHeight -
        inputPromptHeight -
        customGap
    );
  }, [threadHistory]);

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
