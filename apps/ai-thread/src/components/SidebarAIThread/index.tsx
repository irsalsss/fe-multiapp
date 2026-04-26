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
import { useMemo, useState } from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { 
  ExitIcon, 
  EnterIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  HamburgerMenuIcon, 
  Cross1Icon 
} from '@radix-ui/react-icons';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const savedConvesations = useMemo(() => {
    if (!data?.conversations) {
      return [];
    }

    return data.conversations.filter((conv) => conv.isSaved);
  }, [data?.conversations]);

  const { activeSidebar, setActiveSidebar, isCollapsed, toggleSidebar } = useSidebarStore(
    useShallow((state) => ({
      activeSidebar: state.activeSidebar,
      setActiveSidebar: state.setActiveSidebar,
      isCollapsed: state.isCollapsed,
      toggleSidebar: state.toggleSidebar,
    }))
  );

  const handleChangeSidebar = (value: ActiveSidebar) => () => {
    setActiveSidebar(value);
  };

  const totalTab = [data?.conversations?.length, savedConvesations?.length];

  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-[64px] bg-gray-600 border-b border-gray-500 z-[50] flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 hover:bg-gray-500 rounded-lg transition-colors text-white"
          >
            <HamburgerMenuIcon className="w-6 h-6" />
          </button>
          <h2 className="text-[18px] font-bold text-white">My Chats</h2>
        </div>
        
        <Link to={ROUTE_AI_THREAD} onClick={triggerFocus}>
          <NewThreadIcon
            className={twJoin(
              'cursor-pointer hover:opacity-80 hover:scale-110',
              'transition-all duration-300 w-8 h-8'
            )}
          />
        </Link>
      </div>

      {/* Mobile Overlay & Sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Content */}
          <div className="absolute top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-gray-600 flex flex-col border-r border-gray-500 animate-in slide-in-from-left duration-300">
            <div className="p-4 flex justify-between items-center border-b border-gray-500">
              <h2 className="text-[20px] font-bold text-white">My Chats</h2>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-500 rounded-lg transition-colors text-white"
              >
                <Cross1Icon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-center bg-gray-500 rounded-lg p-1">
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

            <div className="flex-1 overflow-y-auto px-2" onClick={() => setIsMobileMenuOpen(false)}>
              <Conversations />
            </div>

            <div className="p-4 border-t border-gray-500">
              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
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
                  onClick={() => setIsMobileMenuOpen(false)}
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
        </div>
      )}

      <div
        data-testid="sidebar-ai-thread"
        className={twJoin(
          "hidden md:flex flex-col h-full bg-gray-600 border-r border-gray-500 transition-all duration-300 ease-in-out relative",
          isCollapsed ? "w-[80px]" : "min-w-[320px] w-[320px]"
        )}
      >
        <button
          onClick={toggleSidebar}
          className={twJoin(
            "absolute -right-3 top-10 w-6 h-6 bg-gray-500 border border-gray-400 rounded-full flex items-center justify-center text-white z-20 hover:bg-gray-400 transition-colors",
            "shadow-lg"
          )}
        >
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </button>

        <div className={twJoin("p-4 pb-0 sticky top-0 bg-gray-600 z-10 pb-4", isCollapsed && "items-center")}>
          <div className={twJoin("flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
            {!isCollapsed && <h2 className="text-[20px] font-bold text-white truncate">My Chats</h2>}

            <div className="flex items-center gap-[10px]">
              <Link to={ROUTE_AI_THREAD} onClick={triggerFocus}>
                <NewThreadIcon
                  className={twJoin(
                    'cursor-pointer hover:opacity-80 hover:scale-110',
                    'transition-all duration-300',
                    isCollapsed ? "w-8 h-8" : "w-auto h-auto"
                  )}
                />
              </Link>
            </div>
          </div>

          <div className={twJoin("flex items-center bg-gray-500 rounded-lg p-1 mt-4", isCollapsed && "flex-col gap-1")}>
            {tabThreadHistoryList.map((item, index) => (
              <TabThreadHistory
                key={item.value}
                active={item.value === activeSidebar}
                title={item.title}
                icon={item.icon}
                onClick={handleChangeSidebar(item.value)}
                total={totalTab[index]}
                isSidebarCollapsed={isCollapsed}
                className={isCollapsed ? "p-2 justify-center" : ""}
              />
            ))}
          </div>
        </div>

        <div className={twJoin("flex-1 overflow-y-auto", isCollapsed ? "px-2" : "px-0")}>
          <Conversations isCollapsed={isCollapsed} />
        </div>

        <div className="p-4 border-t border-gray-500">
          {user ? (
            <button
              onClick={() => signOut()}
              className={twJoin(
                'flex items-center gap-2 w-full p-2 rounded-lg',
                'text-white hover:bg-gray-500 transition-colors duration-200',
                'cursor-pointer font-medium',
                isCollapsed ? "justify-center" : ""
              )}
              title={isCollapsed ? "Logout" : ""}
            >
              <ExitIcon className={twJoin("w-4 h-4", isCollapsed && "w-6 h-6")} />
              {!isCollapsed && <span>Logout</span>}
            </button>
          ) : (
            <Link
              to={ROUTE_SIGN_IN}
              className={twJoin(
                'flex items-center gap-2 w-full p-2 rounded-lg',
                'text-white hover:bg-gray-500 transition-colors duration-200',
                'cursor-pointer font-medium',
                isCollapsed ? "justify-center" : ""
              )}
              title={isCollapsed ? "Sign In" : ""}
            >
              <EnterIcon className={twJoin("w-4 h-4", isCollapsed && "w-6 h-6")} />
              {!isCollapsed && <span>Sign In</span>}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarAIThread;
