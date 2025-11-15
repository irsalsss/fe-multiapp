import { useParams } from 'react-router-dom';
import { useGetConversationsQuery } from '../../api/@query/use-get-conversations';
import ConversationsItems from './ConversationsItems';
import { useMemo } from 'react';
import useSidebarStore, { ActiveSidebar } from '../../store/useSidebarStore';
import { useShallow } from 'zustand/shallow';

const Conversations = () => {
  const { data } = useGetConversationsQuery();
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
      return conversations.filter((conv) => conv.isSaved).sort(
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
      className="flex flex-col gap-[10px] px-4 pb-4"
    >
      {sortedConversations.map((item) => (
        <ConversationsItems
          key={item.id}
          title={item.title}
          description={item.description}
          createdAt={item.createdAt}
          conversationId={item.id}
          isActive={isActiveConversation(item.id)}
          isSaved={item.isSaved}
        />
      ))}
    </div>
  );
};

export default Conversations;
