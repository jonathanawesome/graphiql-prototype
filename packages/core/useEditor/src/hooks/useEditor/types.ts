import { OperationDefinitionNode } from 'graphql';
import { editor as MONACO_EDITOR } from 'monaco-editor/esm/vs/editor/editor.api';
import type { MonacoGraphQLAPI } from 'monaco-graphql';

export type EditorTabState = {
  editorTabId: string;
  editorTabName: string;
  operationsModel: MONACO_EDITOR.ITextModel;
  variablesModel: MONACO_EDITOR.ITextModel;
  headersModel: MONACO_EDITOR.ITextModel;
  resultsModel: MONACO_EDITOR.ITextModel;
  operationDefinition: OperationDefinitionNode | null;
};

type MonacoEditors = {
  operations: MONACO_EDITOR.IStandaloneCodeEditor | null;
  variables: MONACO_EDITOR.IStandaloneCodeEditor | null;
  results: MONACO_EDITOR.IStandaloneCodeEditor | null;
  headers: MONACO_EDITOR.IStandaloneCodeEditor | null;
};

export type MonacoEditorTypes = 'operations' | 'variables' | 'results' | 'headers';

export type EditorStore = {
  initMonacoEditor: ({
    monacoEditorType,
    monacoEditorRef,
    optionOverrides,
  }: {
    monacoEditorType: MonacoEditorTypes;
    monacoEditorRef: HTMLDivElement;
    optionOverrides?: MONACO_EDITOR.IStandaloneEditorConstructionOptions;
  }) => void;
  setModelsForAllEditorsWithinTab: ({
    destinationTab,
  }: {
    destinationTab: EditorTabState;
  }) => void;
  initEditorTab: () => void;
  monacoGraphQLAPI: MonacoGraphQLAPI;
  activeEditorTabId: string | null;
  setActiveEditorTabId: ({ editorTabId }: { editorTabId: string }) => void;
  getActiveTab: () => EditorTabState;
  editorTabs: EditorTabState[];
  resetEditorTabs: () => void;
  removeEditorTab: ({ editorTabId }: { editorTabId: string }) => void;
  switchEditorTab: ({ editorTabId }: { editorTabId: string }) => void;
  updateModel: ({
    modelType,
    newValue,
  }: {
    modelType: 'operationsModel' | 'variablesModel' | 'resultsModel';
    newValue: string;
  }) => void;
  updateOperationDefinition: ({
    newDefinition,
  }: {
    newDefinition: OperationDefinitionNode | null;
  }) => void;
  updateOperationDefinitionFromModelValue: ({ value }: { value: string }) => void;
  removeVariable: ({
    onInputObject,
    variableName,
  }: {
    onInputObject?: string;
    variableName: string;
  }) => void;
  activeVariables: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getVariables: () => Record<any, any>;
  updateVariable: ({
    onInputObject,
    variableName,
    variableValue,
  }: {
    onInputObject?: string;
    variableName: string;
    variableValue: string | string[];
  }) => void;
  monacoEditors: MonacoEditors;
  addMonacoEditor: ({
    editor,
    name,
  }: {
    editor: MONACO_EDITOR.IStandaloneCodeEditor;
    name: MonacoEditorTypes;
  }) => void;
};
