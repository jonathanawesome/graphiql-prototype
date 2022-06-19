import create from 'zustand';

/** types */
import { GraphiQLStore } from './types';

export const useGraphiQL = create<GraphiQLStore>((set, get) => ({
  activePane: 'GraphiQL',
  // activePane: 'Pathfinder',
  setActivePane: (activePane) => {
    set({ activePane });
  },
  schema: null,
  setSchema: ({ schema }) => {
    set({ schema });
  },
}));
