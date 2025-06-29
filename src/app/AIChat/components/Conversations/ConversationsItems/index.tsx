import { twMerge } from 'tailwind-merge';
import { formatRelativeDate } from '../../../utils/date/date';
import ChatGPTIcon from '../../../../../assets/icons/chat-gpt-white.svg?react';

interface ConversationsItemsProps {
  title: string;
  description: string;
  createdAt: string;
  isActive: boolean;
}

const ConversationsItems = ({
  title,
  description,
  createdAt,
  isActive,
}: ConversationsItemsProps) => {
  return (
    <div
      className={twMerge(
        'py-[10px] px-6 flex flex-col gap-[6px] relative',
        isActive && 'bg-gray-700 rounded-[8px]'
      )}
    >
      <ChatGPTIcon className="absolute top-[14px] left-1 rounded-lg h-3 w-3" />

      <h5 className="text-[14px] font-semibold text-white capitalize">
        {title}
      </h5>
      <p className="text-[12px] text-gray-200 line-clamp-2">{description}</p>
      <p className="text-[10px] leading-[8px] text-gray-200 absolute top-[16px] right-0 opacity-60">
        {formatRelativeDate(createdAt)}
      </p>
    </div>
  );
};

export default ConversationsItems;
