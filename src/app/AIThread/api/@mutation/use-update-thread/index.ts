import { useMutation } from "@tanstack/react-query";
import { updateThread, type UpdateThreadInput } from "../../update-thread";
import type { ThreadMessage } from "../../../types/thread.interface";

export const useUpdateThread = () => {
  return useMutation<ThreadMessage, Error, UpdateThreadInput>({
    mutationFn: updateThread,
  });
};