import {
  ExecutableDefinitionNode,
  GraphQLSchema,
  OperationDefinitionNode,
} from 'graphql';
import { editor } from 'monaco-editor';

export type GraphiQLStore = {
  results: string | null;
  setResults: ({ value }: { value: string }) => void;
  variables: string | null;
  setVariables: ({ value }: { value: string }) => void;
  operationDefinition: ExecutableDefinitionNode | null;
  setOperationDefinition: ({
    operationDefinition,
  }: {
    operationDefinition: ExecutableDefinitionNode | null;
  }) => void;
  schema: GraphQLSchema | null;
  schemaUrl: string | null;
  initSchema: ({ url }: { url?: string }) => Promise<void>;
  // editors bits are here only to offer editors and their actions across components (see PrettierButton)
  // there's probably a better way to do this
  editors: Array<{ editor: editor.IStandaloneCodeEditor; name: string }>;
  setEditors: ({
    editor,
    name,
  }: {
    editor: editor.IStandaloneCodeEditor;
    name: string;
  }) => void;
  operation: string;
  setOperation: ({ value }: { value: string }) => void;
  executeOperation: () => Promise<void>;
  operationAction: () => editor.IActionDescriptor;
  onEditDefinition: ({
    nextDefinition,
  }: {
    nextDefinition: OperationDefinitionNode | null;
  }) => void;
};
