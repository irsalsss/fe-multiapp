import { useParams } from 'react-router-dom';
import { useGetConversationsQuery } from '../../api/@query/use-get-conversations';
import ConversationsItems from './ConversationsItems';
import { useMemo } from 'react';
import useSidebarStore, { ActiveSidebar } from '../../store/useSidebarStore';
import { useShallow } from 'zustand/shallow';
import ThreadSpinner from '../ThreadSpinner';
import { EnumSpinnerType } from '../ThreadSpinner/types';
import { twMerge } from 'tailwind-merge';

interface ConversationsProps {
  isCollapsed?: boolean;
}

const Conversations = ({ isCollapsed }: ConversationsProps) => {
  const { data, isLoading: isLoadingGetConversations } =
    useGetConversationsQuery();
  const params = useParams();
  const conversationId = params.conversationId;

  const { activeSidebar } = useSidebarStore(
    useShallow((state) => ({
      activeSidebar: state.activeSidebar,
    }))
  );

  const sortedConversations = useMemo(() => {
    const conversations = data?.conversations;

    if (!conversations) {
      return [];
    }

    if (activeSidebar === ActiveSidebar.SAVED) {
      return conversations
        .filter((conv) => conv.isSaved)
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
    }

    return conversations.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [data, activeSidebar]);

  const isActiveConversation = (id: string) => {
    return conversationId === id;
  };

  return (
    <div
      data-testid="conversations-container"
      className={twMerge(
        "flex flex-col gap-[10px] pb-4 relative",
        isCollapsed ? "px-0" : "px-4"
      )}
    >
      {!isLoadingGetConversations &&
        sortedConversations.map((item) => (
          <ConversationsItems
            key={item.id}
            title={item.title}
            description={item.description}
            createdAt={item.createdAt}
            conversationId={item.id}
            isActive={isActiveConversation(item.id)}
            isSaved={item.isSaved}
            isCollapsed={isCollapsed}
          />
        ))}

      {isLoadingGetConversations && (
        <div
          id="conversations-spinner"
          className={twMerge(
            'flex justify-center items-center',
            'absolute translate-y-[-10%] left-[50%] -translate-x-1/2',
            'h-screen'
          )}
        >
          <ThreadSpinner type={EnumSpinnerType.AURORA_SPIN} />
        </div>
      )}
    </div>
  );
};

export default Conversations;
