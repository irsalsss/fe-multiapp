import { v4 as uuidv4 } from 'uuid';

export class CustomError extends Error {
  statusCode: number;
  api?: string;

  constructor(
    message: string,
    { statusCode, api }: { statusCode: number; api?: string }
  ) {
    super(message);
    this.statusCode = statusCode;
    this.api = api;
  }
}

interface ErrorResponse {
  message: string;
  statusCode: number;
}

export const fetchJson = async <JSONDataType = unknown>(
  input: string,
  init?: RequestInit
): Promise<JSONDataType> => {
  const API_URL = (import.meta.env.VITE_API_URL as string) || '';
  const url = API_URL + input;

  const headers = new Headers(init?.headers);
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  headers.set('X-Request-ID', uuidv4());

  // Add authorization header if Clerk session token exists in cookies
  const clerkSession = document.cookie
    .split('; ')
    .find(row => row.startsWith('__session='));
  
  if (clerkSession) {
    const token = clerkSession.split('=')[1];
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...init,
    headers,
  });

  let data: JSONDataType;

  try {
    data = await response.json() as JSONDataType;
  } catch {
    throw new CustomError('Failed to parse response', {
      statusCode: response.status,
      api: url,
    });
  }

  if (!response.ok) {
    const errorData = data as unknown as ErrorResponse;
    throw new CustomError(errorData.message || 'Request failed', {
      statusCode: errorData.statusCode || response.status,
      api: url,
    });
  }

  return data;
};

export default fetchJson;