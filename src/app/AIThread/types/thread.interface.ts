import type { Conversation } from "./conversation.interface";
import type { UserRoleEnum } from "./user-role.enum";

export interface ThreadMessagePart {
  id: string;
  text: string;
  createdAt: string;
}

export interface ThreadMessage {
  id: string;
  role: UserRoleEnum;
  createdAt: string;
  parts: ThreadMessagePart[];
}

export interface Thread extends Conversation {
  id: string;
  history: ThreadMessage[];
  createdAt: string;
}