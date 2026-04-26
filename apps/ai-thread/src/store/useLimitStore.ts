import { create } from 'zustand';

interface LimitStore {
  isShowLimitModal: boolean;
  setIsShowLimitModal: (value: boolean) => void;
}

export const useLimitStore = create<LimitStore>((set) => ({
  isShowLimitModal: false,
  setIsShowLimitModal: (value) => set({ isShowLimitModal: value }),
}));
