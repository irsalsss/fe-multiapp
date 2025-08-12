import ChatGPT from '../../../../assets/icons/chat-gpt.svg';
import { formatTimeAgo } from '../../utils/date/date';
import ChatSpinner from '../ChatSpinner';
import { EnumSpinnerType } from '../ChatSpinner/types';
import MarkdownAnswer from '../MarkdownAnswer';

interface AnswerBubbleProps {
  answer: string;
  date: string;
  isLoadingAnswer: boolean;
}

const AnswerBubble = ({ answer, date, isLoadingAnswer }: AnswerBubbleProps) => {
  return (
    <div className="bg-gray-650 px-6 py-3 rounded-lg relative w-full">
      <img
        src={ChatGPT}
        alt="chat-gpt"
        className="absolute top-[-16px] left-[-16px] rounded-lg h-8 w-8"
      />
      <div className="flex gap-2 items-center absolute top-[-16px]">
        <span className="text-[12px] leading-[16px] font-semibold">
          Response
        </span>
        <span className="text-[8px] leading-[8px] text-gray-200 opacity-60">
          {formatTimeAgo(date)}
        </span>
      </div>

      <MarkdownAnswer answer={answer} />

      {isLoadingAnswer && <ChatSpinner type={EnumSpinnerType.GRADIENT_PULSE} />}
    </div>
  );
};

export default AnswerBubble;
