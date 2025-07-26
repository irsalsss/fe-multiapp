import { useMutation } from "@tanstack/react-query";
import { deleteConversation } from "../../delete-conversation";

export const useDeleteConversation = () => {
  return useMutation<string, Error, string>({
    mutationFn: deleteConversation,
  });
};
