import { useShallow } from 'zustand/shallow';
import NewThreadIcon from '../../assets/icons/new-thread-green.svg?react';
import { twJoin } from 'tailwind-merge';
import SavedIcon from '../../assets/icons/saved.svg?react';
import ThreadBubbleIcon from '../../assets/icons/thread-bubble.svg?react';
import TabThreadHistory from '../TabThreadHistory';
import useSidebarStore, { ActiveSidebar } from '../../store/useSidebarStore';
import Conversations from '../Conversations';
import { useGetConversationsQuery } from '../../api/@query/use-get-conversations';
import { Link } from 'react-router-dom';
import { ROUTE_AI_THREAD, ROUTE_SIGN_IN } from '../../const/routes';
import { useMemo } from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { ExitIcon, EnterIcon } from '@radix-ui/react-icons';

import { useInputPromptStore } from '../../store/useInputPromptStore';

const tabThreadHistoryList = [
  {
    title: 'Chats',
    value: ActiveSidebar.THREAD,
    icon: <ThreadBubbleIcon />,
  },
  {
    title: 'Saved',
    value: ActiveSidebar.SAVED,
    icon: <SavedIcon />,
  },
];

const SidebarAIThread = () => {
  const { data } = useGetConversationsQuery(false);
  const triggerFocus = useInputPromptStore((state) => state.triggerFocus);

  const savedConvesations = useMemo(() => {
    if (!data?.conversations) {
      return [];
    }

    return data.conversations.filter((conv) => conv.isSaved);
  }, [data?.conversations]);

  const { activeSidebar, setActiveSidebar } = useSidebarStore(
    useShallow((state) => ({
      activeSidebar: state.activeSidebar,
      setActiveSidebar: state.setActiveSidebar,
    }))
  );

  const handleChangeSidebar = (value: ActiveSidebar) => () => {
    setActiveSidebar(value);
  };

  const totalTab = [data?.conversations?.length, savedConvesations?.length];

  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div className="bg-gray-600 min-w-[320px] w-[320px] flex flex-col h-full border-r border-gray-500">
      <div className="p-4 pb-0 sticky top-0 bg-gray-600 z-10 pb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] font-bold text-white">My Chats</h2>

          <div className="flex items-center gap-[10px]">
            <Link to={ROUTE_AI_THREAD} onClick={triggerFocus}>
              <NewThreadIcon
                className={twJoin(
                  'cursor-pointer hover:opacity-80 hover:scale-110',
                  'transition-all duration-300'
                )}
              />
            </Link>
          </div>
        </div>

        <div className="flex items-center bg-gray-500 rounded-lg p-1 mt-4">
          {tabThreadHistoryList.map((item, index) => (
            <TabThreadHistory
              key={item.value}
              active={item.value === activeSidebar}
              title={item.title}
              icon={item.icon}
              onClick={handleChangeSidebar(item.value)}
              total={totalTab[index]}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Conversations />
      </div>

      <div className="p-4 border-t border-gray-500">
        {user ? (
          <button
            onClick={() => signOut()}
            className={twJoin(
              'flex items-center gap-2 w-full p-2 rounded-lg',
              'text-white hover:bg-gray-500 transition-colors duration-200',
              'cursor-pointer font-medium'
            )}
          >
            <ExitIcon className="w-4 h-4" />
            <span>Logout</span>
          </button>
        ) : (
          <Link
            to={ROUTE_SIGN_IN}
            className={twJoin(
              'flex items-center gap-2 w-full p-2 rounded-lg',
              'text-white hover:bg-gray-500 transition-colors duration-200',
              'cursor-pointer font-medium'
            )}
          >
            <EnterIcon className="w-4 h-4" />
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SidebarAIThread;
