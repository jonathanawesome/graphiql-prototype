import create from 'zustand';

// types
import { EditorPanesStore } from './types';

export const useEditorPanes = create<EditorPanesStore>((set) => ({
  activePane: 'EDITOR',
  setActivePane: ({ destinationPane }) => {
    set({ activePane: destinationPane });
  },
}));
