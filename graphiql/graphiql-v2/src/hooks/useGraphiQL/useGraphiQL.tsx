import create from 'zustand';

// types
import { GraphiQLStore } from './types';

export const useGraphiQL = create<GraphiQLStore>((set) => ({
  activePanePlugin: 'Pathfinder',
  setActivePanePlugin: (activePanePlugin) => {
    set({ activePanePlugin });
  },
}));
