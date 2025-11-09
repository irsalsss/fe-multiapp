import { QueryClient, useQuery } from "@tanstack/react-query";
import { getConversations } from "../../get-conversations";
import type { Conversation } from "../../../types/conversation.interface";

interface GetConversationsData {
  conversations: Conversation[];
  length: number;
}

export const QUERY_KEY_CONVERSATIONS = "useGetConversationsQuery";

export const useGetConversationsQuery = (enabled = true) => {
  return useQuery({
    queryKey: [QUERY_KEY_CONVERSATIONS],
    queryFn: getConversations,
    enabled,
  });
};

export const setConversationsQueryData = (queryClient: QueryClient, conversationId: string, answer: string) => {
  queryClient.setQueryData([QUERY_KEY_CONVERSATIONS], (oldData: GetConversationsData | undefined) => {
    if (!oldData?.conversations) {
      return oldData;
    }

    const newConversations = oldData.conversations.map((conversation: Conversation) => {
      if (conversation.id === conversationId) {
        return { ...conversation, description: answer };
      }
      return conversation;
    });

    return { ...oldData, conversations: newConversations };
  });
}

export const addConversationQueryData = (queryClient: QueryClient, conversationId: string, title: string) => {
  queryClient.setQueryData([QUERY_KEY_CONVERSATIONS], (oldData: GetConversationsData | undefined) => {
    if (!oldData?.conversations) {
      return oldData;
    }

    const newConversations = [{
      id: conversationId,
      title,
      description: '',
      createdAt: new Date().toLocaleString(),
    }, ...oldData.conversations];

    return { ...oldData, conversations: newConversations };
  });
}

export const setSaveUnsaveConversationQueryData = (queryClient: QueryClient, conversationId: string, isSaved: boolean) => {
  queryClient.setQueryData([QUERY_KEY_CONVERSATIONS], (oldData: GetConversationsData | undefined) => {
    if (!oldData?.conversations) {
      return oldData;
    }

    const updatedConversations = oldData.conversations.map(conv =>
      conv.id === conversationId ? { ...conv, isSaved } : conv
    );

    return {
      ...oldData,
      conversations: updatedConversations,
    };
  });
}