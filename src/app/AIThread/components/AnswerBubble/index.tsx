import ThreadGPT from '../../../../assets/icons/thread-gpt.svg';
import { formatTimeAgo } from '../../utils/date/date';
import MarkdownAnswer from '../MarkdownAnswer';

interface AnswerBubbleProps {
  index: number;
  answer: string;
  date: string;
}

const AnswerBubble = ({ answer, date, index }: AnswerBubbleProps) => {
  return (
    <div
      id={`model-${index.toString()}`}
      className="bg-gray-650 px-6 py-3 rounded-lg relative w-full"
    >
      <img
        src={ThreadGPT}
        alt="thread-gpt"
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
    </div>
  );
};

export default AnswerBubble;
