import fetchJson from "../../utils/fetch-json";
import type { ThreadMessage } from "../../types/thread.interface";
import type { UserRoleEnum } from "../../types/user-role.enum";

export interface UpdateThreadInput {
  id: string;
  question?: string;
  answer?: string;
}

export interface UpdateThreadResponse {
  role: UserRoleEnum
  thread: ThreadMessage[]
}

export const updateThread = async (data: UpdateThreadInput): Promise<ThreadMessage> => {
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

  const response = await fetchJson<ThreadMessage>(`/api/threads/${data.id}`, {
    method: 'PUT',
    body,
  });

  return response;
};