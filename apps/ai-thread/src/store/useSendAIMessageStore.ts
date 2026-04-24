import { create } from 'zustand'

export interface StreamChunk {
  text: string;
  timestamp: string;
  chunkIndex: number;
}

interface Message {
  role: 'user' | 'model';
  content: string;
  metadata?: {
    model: string;
    responseTimeMs: number;
    streamChunks: StreamChunk[];
  };
}

interface AIStore {
  answer: string;
  setAnswer: (newAnswer: string) => void;

  question: string;
  setQuestion: (newQuestion: string) => void;

  isLoadingAnswer: boolean;
  setIsLoadingAnswer: (newIsLoadingAnswer: boolean) => void;

  messagesAI: Message[];
  setMessagesAI: (newMessagesAI: Message) => void;

  error: any | null;
  setError: (error: any | null) => void;
}

const useSendAIMessageStore = create<AIStore>((set) => ({
  answer: '',
  setAnswer: (newAnswer) => { set({ answer: newAnswer }); },

  question: '',
  setQuestion: (newQuestion) => { set({ question: newQuestion }); },

  isLoadingAnswer: false,
  setIsLoadingAnswer: (newIsLoadingAnswer) => { set({ isLoadingAnswer: newIsLoadingAnswer }); },

  messagesAI: [],
  setMessagesAI: (newMessagesAI) => { set((state) => ({ messagesAI: [...state.messagesAI, newMessagesAI]})); },

  error: null,
  setError: (error) => { set({ error }); },
}))

export default useSendAIMessageStore;