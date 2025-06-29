import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../../get-conversations";

export const QUERY_KEY_CONVERSATIONS = "useGetConversationsQuery";

export const useGetConversationsQuery = (enabled = true) => {
  return useQuery({
    queryKey: [QUERY_KEY_CONVERSATIONS],
    queryFn: getConversations,
    enabled,
  });
};