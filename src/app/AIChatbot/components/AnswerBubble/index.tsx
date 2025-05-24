import { format } from 'date-fns';
import Markdown from 'react-markdown'

import ChatGPT from '../../../../assets/icons/chat-gpt.svg';

interface AnswerBubbleProps {
  answer: string;
}

const AnswerBubble = ({ answer }: AnswerBubbleProps) => {
  return (
    <div className="bg-[#28303F] px-[22px] py-3 rounded-lg relative w-full">
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
          {format(new Date(), 'dd MMM ▪ hh:mm a')}
        </span>
      </div>
      
      <Markdown
        components={{
          p: ({ children }) => (
            <p className="text-[12px] leading-[16px] font-normal">{children}</p>
          ),
        }}
      >
        {answer}
      </Markdown>
    </div>
  );
};

export default AnswerBubble;
