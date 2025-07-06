import { twMerge } from 'tailwind-merge';
import { formatRelativeDate } from '../../../utils/date/date';
import ChatGPTIcon from '../../../../../assets/icons/chat-gpt-white.svg?react';
import { Link } from 'react-router-dom';
import { ROUTE_AI_CHAT } from '../../../../../const/routes';

interface ConversationsItemsProps {
  title: string;
  description: string;
  createdAt: string;
  isActive: boolean;
  conversationId: string;
}

const ConversationsItems = ({
  title,
  description,
  createdAt,
  isActive,
  conversationId,
}: ConversationsItemsProps) => {
  return (
    <Link to={`${ROUTE_AI_CHAT}/${conversationId}`} className="w-full">
      <div
        className={twMerge(
          'group py-[10px] px-6 flex flex-col gap-[6px] relative cursor-pointer',
          isActive && 'bg-gray-700 rounded-[8px] mx-[-8px] px-8',
          'hover:bg-gray-700 hover:rounded-[8px] hover:mx-[-8px] hover:px-8 transition-all duration-500'
        )}
      >
        <ChatGPTIcon
          className={twMerge(
            'absolute top-[14px] left-1 rounded-lg h-3 w-3',
            isActive && 'left-[12px]',
            'group-hover:left-[12px]'
          )}
        />

        <h5 className="text-[14px] font-semibold text-white capitalize truncate max-w-[90%]">
          {title}
        </h5>
        <p className="text-[12px] text-gray-200 line-clamp-2">{description}</p>
        <p
          className={twMerge(
            'text-[10px] leading-[8px] text-gray-200 absolute top-[16px] right-0 opacity-60',
            isActive && 'right-[8px]',
            'group-hover:right-[8px]'
          )}
        >
          {formatRelativeDate(createdAt)}
        </p>
      </div>
    </Link>
  );
};

export default ConversationsItems;
