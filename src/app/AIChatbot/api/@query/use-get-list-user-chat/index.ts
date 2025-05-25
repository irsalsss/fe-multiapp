import { useQuery } from "@tanstack/react-query";
import { getListUserChat } from "../../get-list-user-chat";

export const useGetListUserChatQuery = (enabled = true) => {
  return useQuery({
    queryKey: ["useGetListUserChatQuery"],
    queryFn: getListUserChat,
    enabled,
  });
};