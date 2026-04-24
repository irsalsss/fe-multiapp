import fetchJson from "../../utils/fetch-json";

export const deleteConversation = async (id: string): Promise<string> => {
  await fetchJson<string>(`/api/conversations/${id}`, {
    method: 'DELETE',
  });

  return id;
};