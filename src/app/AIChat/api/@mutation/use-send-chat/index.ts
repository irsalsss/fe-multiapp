import { useMutation } from "@tanstack/react-query";
import { sendChat, type SendChatInput } from "../../send-chat";

interface SendChatOutput {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const useSendChat = () => {
  return useMutation<SendChatOutput[], Error, SendChatInput>({
    mutationFn: sendChat,
  });
};