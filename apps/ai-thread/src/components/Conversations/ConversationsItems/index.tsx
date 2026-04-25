import { twJoin, twMerge } from 'tailwind-merge';
import ThreadGPTIcon from '../../../assets/icons/thread-gpt-white.svg?react';
import { Link } from 'react-router-dom';
import { formatRelativeDate } from '../../../utils/date/date';
import { DrawingPinFilledIcon } from '@radix-ui/react-icons';

interface ConversationsItemsProps {
  title: string;
  description: string;
  createdAt: string;
  isActive: boolean;
  conversationId: string;
  isSaved: boolean;
  isCollapsed?: boolean;
}

const ConversationsItems = ({
  title,
  description,
  createdAt,
  isActive,
  conversationId,
  isSaved,
  isCollapsed,
}: ConversationsItemsProps) => {
  if (isCollapsed) {
    return (
      <Link to={conversationId} className="w-full flex justify-center" title={title}>
        <div
          className={twMerge(
            'group p-3 flex items-center justify-center relative cursor-pointer',
            'transition-all duration-300',
            isActive ? 'bg-gray-700 rounded-lg text-green-300' : 'hover:bg-gray-700/50 rounded-lg text-white'
          )}
        >
          {isSaved ? (
            <DrawingPinFilledIcon className="w-5 h-5 text-[#FEC553]" />
          ) : (
            <ThreadGPTIcon className={twJoin("w-5 h-5", isActive ? "text-green-300" : "text-white")} />
          )}
        </div>
      </Link>
    );
  }

  const iconClass = twMerge(
    'absolute top-[14px] left-1 rounded-lg h-3 w-3',
    isActive && 'left-[12px]',
    'group-hover:left-[12px]',
    isSaved && 'text-[#FEC553]'
  );

  return (
    <Link to={conversationId} className="w-full">
      <div
        className={twMerge(
          'group py-[10px] px-6 flex flex-col gap-[6px]',
          'relative cursor-pointer transition-all duration-200',
          isActive && 'bg-gray-700 rounded-[8px] mx-[-8px] px-8',
          'hover:bg-gray-700 hover:rounded-[8px] hover:mx-[-8px] hover:px-8'
        )}
      >
        {isSaved ? (
          <DrawingPinFilledIcon className={iconClass} />
        ) : (
          <ThreadGPTIcon className={iconClass} />
        )}

        <h5
          className={twJoin(
            'text-[14px] font-semibold text-white capitalize',
            'truncate max-w-[90%]'
          )}
        >
          {title}
        </h5>
        <p className="text-[12px] text-gray-200 line-clamp-2">{description}</p>
        <p
          className={twMerge(
            'text-[10px] leading-[8px] text-gray-200 opacity-60',
            'absolute top-[16px] right-0',
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
