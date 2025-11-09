import type { Conversation } from "./conversation.interface";
import type { UserRoleEnum } from "./user-role.enum";

export interface ChatMessagePart {
  id: string;
  text: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: UserRoleEnum;
  createdAt: string;
  parts: ChatMessagePart[];
}

export interface Chat extends Conversation {
  id: string;
  history: ChatMessage[];
  createdAt: string;
}