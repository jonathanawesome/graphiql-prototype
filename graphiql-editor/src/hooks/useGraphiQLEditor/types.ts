import { GraphQLSchema, OperationDefinitionNode } from 'graphql';
import { editor as MONACO_EDITOR } from 'monaco-editor';
import type { MonacoGraphQLAPI } from 'monaco-graphql';

type EditorTab = {
  editorTabId: string;
  editorTabName: string;
  operationModel: MONACO_EDITOR.ITextModel;
  variablesModel: MONACO_EDITOR.ITextModel;
  headersModel: MONACO_EDITOR.ITextModel;
  resultsModel: MONACO_EDITOR.ITextModel;
  operationDefinition: OperationDefinitionNode | null;
};

export type MonacoEditorTypes = 'operation' | 'variables' | 'results' | 'headers';

export type GraphiQLEditorStore = {
  monacoGraphQLAPI: MonacoGraphQLAPI;
  activeEditorTabId: string | null;
  setActiveEditorTabId: ({ editorTabId }: { editorTabId: string }) => void;
  editorTabs: EditorTab[];
  initializeAndActivateEditorTab: () => void;
  addEditorTab: () => string;
  removeEditorTab: ({ editorTabId }: { editorTabId: string }) => void;
  switchEditorTab: ({ editorTabId }: { editorTabId: string }) => void;
  updateModel: ({
    modelType,
    newValue,
  }: {
    modelType: 'operationModel' | 'variablesModel' | 'resultsModel';
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
  executeOperation: () => Promise<void>;
  runOperationAction: () => MONACO_EDITOR.IActionDescriptor;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: GraphQLSchema | null | { error: any };
  schemaUrl: string | null;
  initSchema: ({ url }: { url?: string }) => Promise<void>;
};
