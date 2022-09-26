import create from 'zustand';

// types
import { EditorPanesStore } from './types';

export const useEditorPanes = create<EditorPanesStore>((set, get) => ({
  // activePane: 'EDITOR',
  activePane: 'SCHEMA',
  setActivePane: ({ destinationPane }) => {
    set({ activePane: destinationPane });
  },
}));
