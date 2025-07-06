import Avatar from '../../../../assets/illus/avatar-man.png';
import { formatTimeAgo } from '../../utils/date/date';

interface QuestionBubbleProps {
  message: string;
  date: string;
}

const QuestionBubble = ({ message, date }: QuestionBubbleProps) => {
  return (
    <div className="bg-gray-400 px-6 py-3 rounded-lg relative w-full">
      <img
        src={Avatar}
        alt="avatar"
        className="absolute top-[-16px] left-[-16px] rounded-lg h-8 w-8"
      />
      <div className="flex gap-2 items-center absolute top-[-16px]">
        <span className="text-[12px] leading-[16px] font-semibold">You</span>
        <span className="text-[8px] leading-[8px] text-gray-200 opacity-60">
          {formatTimeAgo(date)}
        </span>
      </div>
      <p className="text-[12px] leading-[16px] font-normal">{message}</p>
    </div>
  );
};

export default QuestionBubble;
