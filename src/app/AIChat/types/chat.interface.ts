import type { UserRoleEnum } from "./user-role.enum";

export interface ChatMessagePart {
  id: string;
  text: string;
}

export interface ChatMessage {
  id: string;
  role: UserRoleEnum;
  createdAt: string;
  parts: ChatMessagePart[];
}

export interface Chat {
  id: string;
  history: ChatMessage[];
  createdAt: string;
}