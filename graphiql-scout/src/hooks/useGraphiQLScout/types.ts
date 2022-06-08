import { ExecutableDefinitionNode, GraphQLSchema } from 'graphql';
import { editor } from 'monaco-editor';

type Scout = {
  scoutId: string;
  scoutName: string;
  operationModel: editor.ITextModel;
  variablesModel: editor.ITextModel;
  resultsModel: editor.ITextModel;
  operation: string;
  variables: string;
  results: string;
  operationDefinition: ExecutableDefinitionNode | null;
};

export type EditorTypes = 'operation' | 'variables' | 'results';

export type GraphiQLScoutStore = {
  activeScoutId: string | null;
  setActiveScoutId: ({ scoutId }: { scoutId: string }) => void;
  scouts: Scout[];
  addScout: ({ scout }: { scout: Scout }) => void;
  updateScoutData: ({ type, newValue }: { type: EditorTypes; newValue: string }) => void;
  removeScout: ({ scoutId }: { scoutId: string }) => void;
  swapScout: ({ scoutId }: { scoutId: string }) => void;
  editors: Array<{
    editor: editor.IStandaloneCodeEditor;
    name: EditorTypes;
  }>;
  addEditor: ({
    editor,
    name,
  }: {
    editor: editor.IStandaloneCodeEditor;
    name: EditorTypes;
  }) => void;
  executeOperation: () => Promise<void>;
  schema: GraphQLSchema | null;
  schemaUrl: string | null;
  initSchema: ({ url }: { url?: string }) => Promise<void>;
};
