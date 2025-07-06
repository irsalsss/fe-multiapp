import fetchJson from "../../../../utils/fetch-json";
import mapToCamelCase from "../../../../utils/map-to-camel-case";
import type { Chat } from "../../types/chat.interface";

export const getChat = async (
  chatId: string,
  options?: RequestInit
): Promise<Chat> => {
  const response = await fetchJson<Chat>("/api/chats/" + chatId, options);

  return mapToCamelCase<Chat>(response);
};