import { useShallow } from 'zustand/shallow';
import NewChatIcon from '../../../../assets/icons/new-chat-green.svg?react';
import SavedIcon from '../../../../assets/icons/saved.svg?react';
import ChatBubbleIcon from '../../../../assets/icons/chat-bubble.svg?react';
import TabChatHistory from '../TabChatHistory';
import useSidebarStore, { ActiveSidebar } from '../../store/useSidebarStore';
import Conversations from '../Conversations';
import { useGetConversationsQuery } from '../../api/@query/use-get-conversations';
import { Link } from 'react-router-dom';
import { ROUTE_AI_CHAT } from '../../../../const/routes';

const tabChatHistoryList = [
  {
    title: 'Chats',
    value: ActiveSidebar.CHAT,
    icon: <ChatBubbleIcon />,
  },
  {
    title: 'Saved',
    value: ActiveSidebar.SAVED,
    icon: <SavedIcon />,
  },
];

const SidebarAIChat = () => {
  const { data } = useGetConversationsQuery(false);
  const converstionsLength = data?.length ?? 0;

  const { activeSidebar, setActiveSidebar } = useSidebarStore(
    useShallow((state) => ({
      activeSidebar: state.activeSidebar,
      setActiveSidebar: state.setActiveSidebar,
    }))
  );

  const handleChangeSidebar = (value: ActiveSidebar) => () => {
    setActiveSidebar(value);
  };

  const totalTab = [converstionsLength, 0];

  return (
    <div className="bg-gray-600 min-w-[320px] w-[320px] flex-1 overflow-y-auto">
      <div className="p-4 pb-0 sticky top-0 bg-gray-600 z-10 pb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] font-bold text-white">My Chats</h2>

          <div className="flex items-center gap-[10px]">
            <Link to={ROUTE_AI_CHAT}>
              <NewChatIcon className="cursor-pointer hover:opacity-80 hover:scale-110 transition-all duration-300" />
            </Link>
          </div>
        </div>

        <div className="flex items-center bg-gray-500 rounded-lg p-1 mt-4">
          {tabChatHistoryList.map((item, index) => (
            <TabChatHistory
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

      <Conversations />
    </div>
  );
};

export default SidebarAIChat;
