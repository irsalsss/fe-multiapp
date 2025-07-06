import type { UserRole } from "./user-role.enum";

export interface ChatMessagePart {
  id: string;
  text: string;
}

export interface ChatMessage {
  id: string;
  role: UserRole;
  createdAt: string;
  parts: ChatMessagePart[];
}

export interface Chat {
  id: string;
  history: ChatMessage[];
}