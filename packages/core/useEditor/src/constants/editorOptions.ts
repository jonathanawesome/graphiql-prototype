import { editor as MONACO_EDITOR } from 'monaco-editor';

export const editorOptions: MONACO_EDITOR.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  // folding: false, // disable folding
  fontFamily: "'Fira Code', monospace", // TODO: set the font (this is problematic because the font has to be installed locally)
  fontSize: 13, // default is 12
  // lineDecorationsWidth: 100,
  lineNumbersMinChars: 2,
  minimap: {
    enabled: false, // disable the minimap
  },
  overviewRulerLanes: 0, // remove unnecessary cruft on right side of editors
  scrollbar: {
    // hide the scrollbars
    horizontal: 'hidden',
    vertical: 'hidden',
  },
  // scrollPredominantAxis: false,
  scrollBeyondLastLine: false, // cleans up unnecessary "padding" on the bottom of each editor
  tabSize: 2,
  theme: 'graphiql-default',
  wordWrap: 'on',
  // wrappingIndent: 'none',
  wrappingStrategy: 'advanced',
};
