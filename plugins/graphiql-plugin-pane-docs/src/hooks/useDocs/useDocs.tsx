import create from 'zustand';

// types
import { DocsStore } from './types';

export const useDocs = create<DocsStore>((set, get) => ({
  currentType: null,
  setCurrentType: ({ currentType }) => {
    set({ currentType });
  },
  previousTypes: [],
  setPreviousTypes: ({ previousTypes }) => {
    set({ previousTypes });
  },
}));
