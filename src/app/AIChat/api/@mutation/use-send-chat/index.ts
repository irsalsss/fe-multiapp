import { useMutation } from "@tanstack/react-query";
import { sendChat, type SendChatInput } from "../../send-chat";

export const useSendChat = () => {
  return useMutation<string, Error, SendChatInput>({
    mutationFn: sendChat,
  });
};