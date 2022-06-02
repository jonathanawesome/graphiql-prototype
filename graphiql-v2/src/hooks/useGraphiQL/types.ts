import { Fetcher } from '@graphiql/toolkit';
import {
  ExecutableDefinitionNode,
  GraphQLSchema,
  OperationDefinitionNode,
} from 'graphql';
import { editor } from 'monaco-editor';
import { AvailableEditors } from '../../constants';

export type GraphiQLStore = {
  results: string;
  setResults: ({ value }: { value: string }) => void;
  variables: string;
  setVariables: ({ value }: { value: string }) => void;
  schema: GraphQLSchema | null;
  fetcher: Fetcher | null;
  createFetcher: ({ url }: { url: string }) => Promise<void>;
  // initSchema: ({ url }: { url: string }) => Promise<void>;
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
  operationDefinition: ExecutableDefinitionNode | null;
  setOperationDefinition: ({
    operationDefinition,
  }: {
    operationDefinition: ExecutableDefinitionNode | null;
  }) => void;
  executeOperation: () => Promise<void>;
  operationAction: () => editor.IActionDescriptor;
  onEditDefinition: ({
    nextDefinition,
  }: {
    nextDefinition: OperationDefinitionNode | null;
  }) => void;
};
