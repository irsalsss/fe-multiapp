import { create } from 'zustand';

export enum ActiveSidebar {
  THREAD = 'thread',
  SAVED = 'saved',
}

interface AIStore {
  activeSidebar: ActiveSidebar;
  setActiveSidebar: (newActiveSidebar: ActiveSidebar) => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const useSidebarStore = create<AIStore>((set) => ({
  activeSidebar: ActiveSidebar.THREAD,
  setActiveSidebar: (newActiveSidebar) => { set({ activeSidebar: newActiveSidebar }); },
  isCollapsed: false,
  toggleSidebar: () => { set((state) => ({ isCollapsed: !state.isCollapsed })); },
  setIsCollapsed: (isCollapsed) => { set({ isCollapsed }); },
}))

export default useSidebarStore;