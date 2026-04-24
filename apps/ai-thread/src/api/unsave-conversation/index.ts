import fetchJson from "../../utils/fetch-json";

export const unsaveConversation = async (id: string): Promise<string> => {
  await fetchJson<string>(`/api/conversations/${id}/unsave`, {
    method: 'PUT',
  });

  return id;
};