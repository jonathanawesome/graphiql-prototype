import {
  ExecutableDefinitionNode,
  GraphQLSchema,
  OperationDefinitionNode,
} from 'graphql';
import { editor } from 'monaco-editor';
import { AvailableEditors } from '../../constants';

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
  editors: Array<{ editor: editor.IStandaloneCodeEditor; uri: AvailableEditors }>;
  setEditors: ({
    editor,
    uri,
  }: {
    editor: editor.IStandaloneCodeEditor;
    uri: AvailableEditors;
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
