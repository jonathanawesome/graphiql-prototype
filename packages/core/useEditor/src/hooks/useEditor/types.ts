import { OperationDefinitionNode } from 'graphql';
import { editor as MONACO_EDITOR } from 'monaco-editor/esm/vs/editor/editor.api';
import type { MonacoGraphQLAPI } from 'monaco-graphql';

export type EditorTab = {
  editorTabId: string;
  editorTabName: string;
  operationsModel: MONACO_EDITOR.ITextModel;
  variablesModel: MONACO_EDITOR.ITextModel;
  headersModel: MONACO_EDITOR.ITextModel;
  resultsModel: MONACO_EDITOR.ITextModel;
  operationDefinition: OperationDefinitionNode | null;
};

export type MonacoEditorTypes = 'operations' | 'variables' | 'results' | 'headers';

export type EditorStore = {
  monacoGraphQLAPI: MonacoGraphQLAPI;
  activeEditorTabId: string | null;
  setActiveEditorTabId: ({ editorTabId }: { editorTabId: string }) => void;
  getActiveTab: () => EditorTab;
  editorTabs: EditorTab[];
  resetEditorTabs: () => void;
  addEditorTab: () => void;
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
  // removeVariables: ({ variableNames }: { variableNames: string[] }) => void;
  updateVariable: ({
    variableName,
    variableValue,
  }: {
    variableName: string;
    variableValue: string | string[];
  }) => void;

  monacoEditors: Array<{
    editor: MONACO_EDITOR.IStandaloneCodeEditor;
    name: MonacoEditorTypes;
  }>;
  addMonacoEditor: ({
    editor,
    name,
  }: {
    editor: MONACO_EDITOR.IStandaloneCodeEditor;
    name: MonacoEditorTypes;
  }) => void;
};
