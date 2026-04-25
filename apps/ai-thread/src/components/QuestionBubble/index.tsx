import { formatTimeAgo } from '../../utils/date/date';
import { FaceIcon, PersonIcon } from '@radix-ui/react-icons';

interface QuestionBubbleProps {
  message: string;
  date: string;
  index: number;
  isGuest?: boolean;
}

const QuestionBubble: React.FC<QuestionBubbleProps> = ({
  message,
  date,
  index,
  isGuest = false,
}) => {
  return (
    <div
      id={`user-${index.toString()}`}
      className="bg-gray-400 px-6 py-3 rounded-lg relative w-full"
    >
      <div className="absolute top-[-16px] left-[-16px] rounded-lg h-8 w-8 bg-gray-300 flex items-center justify-center text-gray-700">
        {isGuest ? (
          <FaceIcon className="w-5 h-5" />
        ) : (
          <PersonIcon className="w-5 h-5" />
        )}
      </div>
      <div className="flex gap-2 items-center absolute top-[-16px]">
        <span className="text-[12px] leading-[16px] font-semibold">
          {isGuest ? 'Guest' : 'You'}
        </span>
        <span className="text-[8px] leading-[8px] text-gray-200 opacity-60">
          {formatTimeAgo(date)}
        </span>
      </div>
      <p className="text-[12px] leading-[16px] font-normal">{message}</p>
    </div>
  );
};

export default QuestionBubble;
