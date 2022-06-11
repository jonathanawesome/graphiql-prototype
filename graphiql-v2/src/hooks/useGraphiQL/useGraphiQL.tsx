import create from 'zustand';

/** types */
import { GraphiQLStore } from './types';

export const useGraphiQL = create<GraphiQLStore>((set, get) => ({
  schema: null,
  setSchema: ({ schema }) => {
    set({ schema });
  },
}));
