type EditorPanes = 'EDITOR' | 'SCHEMA';

export type EditorPanesStore = {
  activePane: EditorPanes;
  setActivePane: ({ destinationPane }: { destinationPane: EditorPanes }) => void;
};
