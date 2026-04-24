import { create } from 'zustand';

interface InputPromptStore {
  focusTrigger: number;
  triggerFocus: () => void;
}

export const useInputPromptStore = create<InputPromptStore>((set) => ({
  focusTrigger: 0,
  triggerFocus: () => set((state) => ({ focusTrigger: state.focusTrigger + 1 })),
}));
