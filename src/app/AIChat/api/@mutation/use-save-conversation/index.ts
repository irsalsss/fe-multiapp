import { useMutation } from "@tanstack/react-query";
import { saveConversation } from "../../save-conversation";

export const useSaveConversation = () => {
  return useMutation<string, Error, string>({
    mutationFn: saveConversation,
  });
};
