import { useMutation } from "@tanstack/react-query";
import { updateChat, type UpdateChatInput } from "../../update-chat";
import type { ChatMessagePart } from "../../../types/chat.interface";

export const useUpdateChat = () => {
  return useMutation<ChatMessagePart, Error, UpdateChatInput>({
    mutationFn: updateChat,
  });
};