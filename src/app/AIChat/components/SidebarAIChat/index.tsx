import { useShallow } from 'zustand/shallow';
import NewChatIcon from '../../../../assets/icons/new-chat-green.svg?react';
import SavedIcon from '../../../../assets/icons/saved.svg?react';
import ＣhatBubbleIcon from '../../../../assets/icons/chat-bubble.svg?react';
import KebabMenuIcon from '../../../../assets/icons/kebab-menu-black.svg?react';
import TabChatHistory from '../TabChatHistory';
import useSidebarStore, { ActiveSidebar } from '../../store/useSidebarStore';
import Conversations from '../Conversations';

const TabChatHistoryList = [
  {
    title: 'Chats',
    value: ActiveSidebar.CHAT,
    icon: <ＣhatBubbleIcon />,
  },
  {
    title: 'Saved',
    value: ActiveSidebar.SAVED,
    icon: <SavedIcon />,
  },
];

const SidebarAIChat = () => {
  const { activeSidebar, setActiveSidebar } = useSidebarStore(
    useShallow((state) => ({
      activeSidebar: state.activeSidebar,
      setActiveSidebar: state.setActiveSidebar,
    }))
  );

  const handleChangeSidebar = (value: ActiveSidebar) => () => {
    setActiveSidebar(value);
  };

  return (
    <div
      data-testid="sidebar-ai-chat"
      className="bg-gray-600 min-w-[320px] w-[320px] flex-1 overflow-y-auto"
    >
      <div className="p-4 pb-0 sticky top-0 bg-gray-600 z-10 pb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] font-bold text-white">My Chats</h2>

          <div className="flex items-center gap-[10px]">
            <NewChatIcon className="cursor-pointer hover:opacity-80 hover:scale-110 transition-all duration-300" />
            <KebabMenuIcon className="cursor-pointer hover:opacity-80 hover:scale-110 transition-all duration-300" />
          </div>
        </div>

        <div className="flex items-center bg-gray-500 rounded-lg p-1 mt-4">
          {TabChatHistoryList.map((item) => (
            <TabChatHistory
              key={item.value}
              active={item.value === activeSidebar}
              title={item.title}
              icon={item.icon}
              onClick={handleChangeSidebar(item.value)}
            />
          ))}
        </div>
      </div>

      <Conversations />
    </div>
  );
};

export default SidebarAIChat;
