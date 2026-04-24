import fetchJson from "../../utils/fetch-json";

export const saveConversation = async (id: string): Promise<string> => {
  await fetchJson<string>(`/api/conversations/${id}/save`, {
    method: 'PUT',
  });

  return id;
};