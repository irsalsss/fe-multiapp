import fetchJson from "../../../../utils/fetch-json";
import mapToCamelCase from "../../../../utils/map-to-camel-case";

interface GetListUserChatResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface GetListUserChatOutput {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const getListUserChat = async (
  options?: RequestInit
): Promise<GetListUserChatOutput> => {
  const response = await fetchJson<GetListUserChatResponse>("/api/user-chats", options);

  return mapToCamelCase<GetListUserChatOutput>(response);
};