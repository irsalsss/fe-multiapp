import fetchJson from "../../../../utils/fetch-json";
import mapToCamelCase from "../../../../utils/map-to-camel-case";

interface SendChatResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface SendChatOutput {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface SendChatInput {
  title: string;
  description: string;
}

export const sendChat = async (data: SendChatInput): Promise<SendChatOutput[]> => {
  const response = await fetchJson<SendChatResponse[]>("/api/chats", {
    method: 'POST',
    body: data
  });

  return mapToCamelCase<SendChatOutput[]>(response);
};