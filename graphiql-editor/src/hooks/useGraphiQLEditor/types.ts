import { ExecutableDefinitionNode, GraphQLSchema } from 'graphql';
import { editor as MONACO_EDITOR } from 'monaco-editor';

type EditorTab = {
  editorTabId: string;
  editorTabName: string;
  operationModel: MONACO_EDITOR.ITextModel;
  variablesModel: MONACO_EDITOR.ITextModel;
  resultsModel: MONACO_EDITOR.ITextModel;
  operation: string;
  variables: string;
  results: string;
  operationDefinition: ExecutableDefinitionNode | null;
};

export type MonacoEditorTypes = 'operation' | 'variables' | 'results';

export type GraphiQLEditorStore = {
  activeEditorTabId: string | null;
  setActiveEditorTabId: ({ editorTabId }: { editorTabId: string }) => void;
  editorTabs: EditorTab[];
  addEditorTab: ({ editorTab }: { editorTab: EditorTab }) => void;
  updateEditorTabData: ({
    dataType,
    newValue,
  }: {
    dataType: MonacoEditorTypes;
    newValue: string;
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
  schema: GraphQLSchema | null;
  schemaUrl: string | null;
  initSchema: ({ url }: { url?: string }) => Promise<void>;
};
