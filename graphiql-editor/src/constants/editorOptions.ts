import { editor as MONACO_EDITOR } from 'monaco-editor';

export const editorOptions: MONACO_EDITOR.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  minimap: {
    enabled: false, // disable the minimap
  },
  // folding: false, // disable folding
  fontFamily: "'Fira Code', monospace", // TODO: set the font (this is problematic because the font has to be installed locally)
  theme: 'myTheme',
  scrollbar: {
    // hide the scrollbars
    horizontal: 'hidden',
    vertical: 'hidden',
  },
  // scrollPredominantAxis: false,
  scrollBeyondLastLine: false, // cleans up unnecessary "padding" on the bottom of each editor
  overviewRulerLanes: 0, // remove unnecessary cruft on right side of editors
  // lineDecorationsWidth: 100,
  lineNumbersMinChars: 2,
  wordWrap: 'on',
  wrappingStrategy: 'advanced',
  // wrappingIndent: 'none',
};
