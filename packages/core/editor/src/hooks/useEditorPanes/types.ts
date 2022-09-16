type EditorPanes = 'WORKSPACE' | 'SCHEMA_REFERENCE';

export type EditorPanesStore = {
  activePane: EditorPanes;
  setActivePane: ({ destinationPane }: { destinationPane: EditorPanes }) => void;
};
