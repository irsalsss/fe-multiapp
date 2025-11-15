import fetchJson from "../../../../utils/fetch-json";

export interface SendThreadInput {
  title: string;
  description?: string;
}

export const sendThread = async (data: SendThreadInput): Promise<string> => {
  const response = await fetchJson<string>("/api/threads", {
    method: 'POST',
    body: data
  });

  return response;
};