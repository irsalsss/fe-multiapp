import { useMutation } from "@tanstack/react-query";
import { sendThread, type SendThreadInput } from "../../send-thread";

export const useSendThread = () => {
  return useMutation<string, Error, SendThreadInput>({
    mutationFn: sendThread,
  });
};