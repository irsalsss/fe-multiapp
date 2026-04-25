import { QueryClient, useQuery } from "@tanstack/react-query";
import { getThread } from "../../get-thread";
import type { Thread, ThreadMessage } from "../../../types/thread.interface";

import { useEffect } from "react";

type GetThreadData = Thread;

export const QUERY_KEY_THREAD = "useGetThreadQuery";

export const useGetThreadQuery = (
  conversationId: string,
  options?: { enabled?: boolean; onError?: (error: any) => void }
) => {
  const query = useQuery({
    queryKey: [QUERY_KEY_THREAD, conversationId],
    queryFn: () => getThread(conversationId),
    enabled: options?.enabled ?? true,
  });

  useEffect(() => {
    if (query.isError && options?.onError) {
      options.onError(query.error);
    }
  }, [query.isError, query.error, options?.onError]);

  return query;
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