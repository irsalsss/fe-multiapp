import { useMutation } from "@tanstack/react-query";
import { unsaveConversation } from "../../unsave-conversation";

export const useUnsaveConversation = () => {
  return useMutation<string, Error, string>({
    mutationFn: unsaveConversation,
  });
};
