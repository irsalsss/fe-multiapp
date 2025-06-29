import { useParams } from 'react-router-dom';
import { useGetConversationsQuery } from '../../api/@query/use-get-conversations';
import ConversationsItems from './ConversationsItems';

const Conversations = () => {
  const { data: conversations } = useGetConversationsQuery();
  const params = useParams();
  const conversationId = params.conversationId;

  const isActiveConversation = (id: string) => {
    return conversationId === id;
  };

  return (
    <div
      data-testid="conversations-container"
      className="flex flex-col gap-[10px] px-4"
    >
      {conversations?.map((item) => (
        <ConversationsItems
          key={item.id}
          title={item.title}
          description={item.description}
          createdAt={item.createdAt}
          isActive={isActiveConversation(item.id)}
        />
      ))}
    </div>
  );
};

export default Conversations;
