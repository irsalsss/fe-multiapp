import { useQuery } from "@tanstack/react-query";
import { getChat } from "../../get-chat";

export const QUERY_KEY_CHAT = "useGetChatQuery";

export const useGetChatQuery = (chatId: string, enabled = true) => {
  return useQuery({
    queryKey: [QUERY_KEY_CHAT, chatId],
    queryFn: () => getChat(chatId),
    enabled,
  });
};