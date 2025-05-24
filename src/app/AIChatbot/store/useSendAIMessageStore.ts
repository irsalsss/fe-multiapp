import { create } from 'zustand'

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface AIStore {
  answer: string;
  setAnswer: (newAnswer: string) => void;

  messagesAI: Message[];
  setMessagesAI: (newMessagesAI: Message) => void;
}

const useSendAIMessageStore = create<AIStore>((set) => ({
  answer: '',
  setAnswer: (newAnswer) => { set({ answer: newAnswer }); },

  messagesAI: [],
  setMessagesAI: (newMessagesAI) => { set((state) => ({ messagesAI: [...state.messagesAI, newMessagesAI]})); },
}))

export default useSendAIMessageStore;