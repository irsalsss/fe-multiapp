import fetchJson from "../../../../utils/fetch-json";
import type { ChatMessagePart } from "../../types/chat.interface";
import type { UserRoleEnum } from "../../types/user-role.enum";

export interface UpdateChatInput {
  id: string;
  question?: string;
  answer?: string;
}

export interface UpdateChatResponse {
  role: UserRoleEnum
  parts: ChatMessagePart[]
}

export const updateChat = async (data: UpdateChatInput): Promise<ChatMessagePart> => {
  if (!data.id) {
    throw new Error('Conversation ID is required');
  }
  
  const body: Record<string, string> = {};

  if (data.question) {
    body.question = data.question;
  }

  if (data.answer) {
    body.answer = data.answer;
  }

  const response = await fetchJson<ChatMessagePart>(`/api/chats/${data.id}`, {
    method: 'PUT',
    body,
  });

  return response;
};