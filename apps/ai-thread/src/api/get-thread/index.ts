import fetchJson from "../../utils/fetch-json";
import mapToCamelCase from "../../utils/map-to-camel-case";
import type { Thread } from "../../types/thread.interface";

export const getThread = async (
  threadId: string,
  options?: RequestInit
): Promise<Thread> => {
  const response = await fetchJson<Thread>("/api/threads/" + threadId, options);

  return mapToCamelCase<Thread>(response);
};