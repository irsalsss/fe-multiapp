import { create } from 'zustand';

interface UseInputPromptStore {
  focusTrigger: number;
  triggerFocus: () => void;
}

export const useInputPromptStore = create<UseInputPromptStore>((set) => ({
  focusTrigger: 0,
  triggerFocus: () => set((state) => ({ focusTrigger: state.focusTrigger + 1 })),
}));
