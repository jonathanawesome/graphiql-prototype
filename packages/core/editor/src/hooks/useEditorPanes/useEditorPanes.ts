import create from 'zustand';

// types
import { EditorPanesStore } from './types';

export const useEditorPanes = create<EditorPanesStore>((set, get) => ({
  activePane: 'WORKSPACE',
  setActivePane: ({ destinationPane }) => {
    set({ activePane: destinationPane });
  },
}));
