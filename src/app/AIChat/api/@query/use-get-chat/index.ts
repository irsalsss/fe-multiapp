import { QueryClient, useQuery } from "@tanstack/react-query";
import { getChat } from "../../get-chat";
import type { Chat, ChatMessage } from "../../../types/chat.interface";

type GetChatData = Chat;

export const QUERY_KEY_CHAT = "useGetChatQuery";

export const useGetChatQuery = (conversationId: string, enabled = true) => {
  return useQuery({
    queryKey: [QUERY_KEY_CHAT, conversationId],
    queryFn: () => getChat(conversationId),
    enabled,
  });
};

export const setUpdateAnswerChatQueryData = (queryClient: QueryClient, conversationId: string, lastChat: ChatMessage) => {
  queryClient.setQueryData([QUERY_KEY_CHAT, conversationId], (oldData: GetChatData | undefined) => {
    if (!oldData?.history) {
      return oldData;
    }

    const newHistory = [...oldData.history, lastChat];

    return { ...oldData, history: newHistory };
  });
};

export const addChatQueryData = (queryClient: QueryClient, conversationId: string, lastChat: ChatMessage[]) => {
  queryClient.setQueryData([QUERY_KEY_CHAT, conversationId], (oldData: GetChatData | undefined) => {
    const newHistory = [...oldData?.history ?? [], ...lastChat];

    return { ...oldData, history: newHistory };
  });
};