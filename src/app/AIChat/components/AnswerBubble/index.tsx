import Markdown from 'react-markdown';

import ChatGPT from '../../../../assets/icons/chat-gpt.svg';
import { formatTimeAgo } from '../../utils/date/date';

interface AnswerBubbleProps {
  answer: string;
  date: string;
}

const AnswerBubble = ({ answer, date }: AnswerBubbleProps) => {
  return (
    <div className="bg-[#28303F] p-6 rounded-lg relative w-full">
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

      <Markdown
        components={{
          p: ({ children }) => (
            <p className="text-[12px] leading-[20px] font-normal mb-4 last:mb-0">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="text-[12px] leading-[16px] font-normal list-decimal list-outside space-y-4 ml-2 pl-2 mb-4 last:mb-0">
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li className="text-[12px] leading-[16px] font-normal ml-2 mb-2">
              {children}
            </li>
          ),
        }}
      >
        {answer}
      </Markdown>
    </div>
  );
};

export default AnswerBubble;
