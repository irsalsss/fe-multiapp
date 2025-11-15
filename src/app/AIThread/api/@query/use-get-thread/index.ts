import { QueryClient, useQuery } from "@tanstack/react-query";
import { getThread } from "../../get-thread";
import type { Thread, ThreadMessage } from "../../../types/thread.interface";

type GetThreadData = Thread;

export const QUERY_KEY_THREAD = "useGetThreadQuery";

export const useGetThreadQuery = (conversationId: string, enabled = true) => {
  return useQuery({
    queryKey: [QUERY_KEY_THREAD, conversationId],
    queryFn: () => getThread(conversationId),
    enabled,
  });
};

export const setUpdateAnswerThreadQueryData = (queryClient: QueryClient, conversationId: string, lastThread: ThreadMessage) => {
  queryClient.setQueryData([QUERY_KEY_THREAD, conversationId], (oldData: GetThreadData | undefined) => {
    if (!oldData?.history) {
      return oldData;
    }

    const newHistory = [...oldData.history, lastThread];

    return { ...oldData, history: newHistory };
  });
};

export const addThreadQueryData = (queryClient: QueryClient, conversationId: string, lastThread: ThreadMessage[]) => {
  queryClient.setQueryData([QUERY_KEY_THREAD, conversationId], (oldData: GetThreadData | undefined) => {
    const newHistory = [...oldData?.history ?? [], ...lastThread];

    return { ...oldData, history: newHistory };
  });
};

export const setSaveUnsaveThreadQueryData = (queryClient: QueryClient, conversationId: string, isSaved: boolean) => {
  queryClient.setQueryData([QUERY_KEY_THREAD, conversationId], (oldData: GetThreadData | undefined) => {
    if (!oldData?.history) {
      return oldData;
    }

    oldData.isSaved = isSaved

    return { ...oldData };
  });
}