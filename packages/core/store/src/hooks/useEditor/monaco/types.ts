import { editor as MONACO_EDITOR } from 'monaco-editor/esm/vs/editor/editor.api';
import type { MonacoGraphQLAPI } from 'monaco-graphql';

type MonacoEditorTypes = 'operations' | 'variables' | 'results';

type MonacoEditors = {
  operations: MONACO_EDITOR.IStandaloneCodeEditor | null;
  variables: MONACO_EDITOR.IStandaloneCodeEditor | null;
  results: MONACO_EDITOR.IStandaloneCodeEditor | null;
};

export type MonacoState = {
  monacoGraphQLAPI: MonacoGraphQLAPI;
  monacoEditors: MonacoEditors;
};

export type MonacoActions = {
  initMonacoEditor: ({
    monacoEditorType,
    monacoEditorRef,
    optionOverrides,
  }: {
    monacoEditorType: MonacoEditorTypes;
    monacoEditorRef: HTMLDivElement;
    optionOverrides?: MONACO_EDITOR.IStandaloneEditorConstructionOptions;
  }) => void;
};
