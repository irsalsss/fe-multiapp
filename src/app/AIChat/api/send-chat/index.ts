import fetchJson from "../../../../utils/fetch-json";

export interface SendChatInput {
  title: string;
  description: string;
}

export const sendChat = async (data: SendChatInput): Promise<string> => {
  const response = await fetchJson<string>("/api/chats", {
    method: 'POST',
    body: data
  });

  return response;
};