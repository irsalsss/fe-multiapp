import fetchJson from "../../../../utils/fetch-json";
import mapToCamelCase from "../../../../utils/map-to-camel-case";

interface GetConversationsResponse {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface GetConversationsOutput {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const getConversations = async (
  options?: RequestInit
): Promise<GetConversationsOutput[]> => {
  const response = await fetchJson<GetConversationsResponse[]>("/api/conversations", options);

  return mapToCamelCase<GetConversationsOutput[]>(response);
};