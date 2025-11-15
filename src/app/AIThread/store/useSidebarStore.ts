import { create } from 'zustand';

export enum ActiveSidebar {
  THREAD = 'thread',
  SAVED = 'saved',
}

interface AIStore {
  activeSidebar: ActiveSidebar;
  setActiveSidebar: (newActiveSidebar: ActiveSidebar) => void;
}

const useSidebarStore = create<AIStore>((set) => ({
  activeSidebar: ActiveSidebar.THREAD,
  setActiveSidebar: (newActiveSidebar) => { set({ activeSidebar: newActiveSidebar }); },
}))

export default useSidebarStore;