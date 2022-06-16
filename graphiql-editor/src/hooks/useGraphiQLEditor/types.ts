import { GraphQLSchema, OperationDefinitionNode } from 'graphql';
import { editor as MONACO_EDITOR } from 'monaco-editor';

type EditorTab = {
  editorTabId: string;
  editorTabName: string;
  operationModel: MONACO_EDITOR.ITextModel;
  variablesModel: MONACO_EDITOR.ITextModel;
  resultsModel: MONACO_EDITOR.ITextModel;
  operationDefinition: OperationDefinitionNode | null;
};

export type MonacoEditorTypes = 'operation' | 'variables' | 'results';

export type GraphiQLEditorStore = {
  activeEditorTabId: string | null;
  setActiveEditorTabId: ({ editorTabId }: { editorTabId: string }) => void;
  editorTabs: EditorTab[];
  addEditorTab: ({ editorTab }: { editorTab: EditorTab }) => void;
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
  removeVariables: ({ variableNames }: { variableNames: string[] }) => void;
  updateVariable: ({
    variableName,
    variableValue,
  }: {
    variableName: string;
    variableValue: string | string[];
  }) => void;
  removeEditorTab: ({ editorTabId }: { editorTabId: string }) => void;
  swapEditorTab: ({ editorTabId }: { editorTabId: string }) => void;
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
  schema: GraphQLSchema | null;
  schemaUrl: string | null;
  initSchema: ({ url }: { url?: string }) => Promise<void>;
};
