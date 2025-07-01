import fetchJson from "../../../../utils/fetch-json";
import mapToCamelCase from "../../../../utils/map-to-camel-case";

interface Conversation {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface GetConversationsResponse {
  conversations: Conversation[];
  length: number;
}

interface GetConversationsOutput {
  conversations: Conversation[];
  length: number;
}

export const getConversations = async (
  options?: RequestInit
): Promise<GetConversationsOutput> => {
  const response = await fetchJson<GetConversationsResponse>("/api/conversations", options);

  return mapToCamelCase<GetConversationsOutput>(response);
};