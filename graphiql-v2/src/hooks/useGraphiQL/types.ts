import {
  ExecutableDefinitionNode,
  GraphQLArgument,
  GraphQLInputType,
  GraphQLSchema,
  OperationDefinitionNode,
} from 'graphql';
import { editor } from 'monaco-editor';

export type EasyVar = {
  variableName: string;
  variableType: GraphQLInputType;
  variableValue: string | boolean | number | string[];
  argument: GraphQLArgument;
};
export type EasyVars = Array<EasyVar>;

export type GraphiQLStore = {
  results: string | null;
  setResults: ({ value }: { value: string }) => void;
  variables: EasyVars;
  addVariable: ({ easyVar }: { easyVar: EasyVar }) => void;
  updateVariable: ({
    variableName,
    variableValue,
  }: {
    variableName: string;
    variableValue: string | string[];
  }) => void;
  removeVariables: ({ variableNames }: { variableNames: string[] }) => void;
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
