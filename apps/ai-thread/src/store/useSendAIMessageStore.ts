import { create } from 'zustand'

interface UseSendAIMessageStore {
  answer: string;
  setAnswer: (newAnswer: string) => void;

  question: string;
  setQuestion: (newQuestion: string) => void;

  isLoadingAnswer: boolean;
  setIsLoadingAnswer: (newIsLoadingAnswer: boolean) => void;

  error: any | null;
  setError: (error: any | null) => void;
}

const useSendAIMessageStore = create<UseSendAIMessageStore>((set) => ({
  answer: '',
  setAnswer: (newAnswer) => { set({ answer: newAnswer }); },

  question: '',
  setQuestion: (newQuestion) => { set({ question: newQuestion }); },

  isLoadingAnswer: false,
  setIsLoadingAnswer: (newIsLoadingAnswer) => { set({ isLoadingAnswer: newIsLoadingAnswer }); },

  error: null,
  setError: (error) => { set({ error }); },
}))

export default useSendAIMessageStore;