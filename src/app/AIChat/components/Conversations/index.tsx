import { useParams } from 'react-router-dom';
import { useGetConversationsQuery } from '../../api/@query/use-get-conversations';
import ConversationsItems from './ConversationsItems';
import { useMemo } from 'react';

const Conversations = () => {
  const { data } = useGetConversationsQuery();
  const params = useParams();
  const conversationId = params.conversationId;

  const sortedConversations = useMemo(() => {
    const conversations = data?.conversations;

    if (!conversations) {
      return [];
    }

    return conversations.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [data]);

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
        />
      ))}
    </div>
  );
};

export default Conversations;
