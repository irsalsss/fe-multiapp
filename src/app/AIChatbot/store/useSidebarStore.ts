import { create } from 'zustand';

export enum ActiveSidebar {
  CHAT = 'chat',
  SAVED = 'saved',
}

interface AIStore {
  activeSidebar: ActiveSidebar;
  setActiveSidebar: (newActiveSidebar: ActiveSidebar) => void;
}

const useSidebarStore = create<AIStore>((set) => ({
  activeSidebar: ActiveSidebar.CHAT,
  setActiveSidebar: (newActiveSidebar) => { set({ activeSidebar: newActiveSidebar }); },
}))

export default useSidebarStore;