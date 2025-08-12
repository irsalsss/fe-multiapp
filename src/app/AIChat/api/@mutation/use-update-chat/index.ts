import { useMutation } from "@tanstack/react-query";
import { updateChat, type UpdateChatInput } from "../../update-chat";
import type { ChatMessage } from "../../../types/chat.interface";

export const useUpdateChat = () => {
  return useMutation<ChatMessage, Error, UpdateChatInput>({
    mutationFn: updateChat,
  });
};