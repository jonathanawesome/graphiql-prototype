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
  variableValue: string | string[];
  argument: GraphQLArgument;
};
export type EasyVars = Array<EasyVar>;

type Tab = {
  tabId: string;
  tabName: string;
  operationsModel: editor.ITextModel;
  variablesModel: editor.ITextModel;
  resultsModel: editor.ITextModel;
  operations?: string;
  variables?: string;
  results?: string;
};

type EditorNames = 'operations' | 'variables' | 'results';

export type GraphiQLStore = {
  activeTab: string | null;
  setActiveTab: ({ tabId }: { tabId: string }) => void;
  tabs: Array<Tab>;
  addTab: ({ tab }: { tab: Tab }) => void;
  // updateTabResults: ({ tabId, value }: { tabId: string; value: string }) => void;
  removeTab: ({ tabId }: { tabId: string }) => void;
  // editors bits are here only to offer editors and their actions across components (see PrettierButton)
  // there's probably a better way to do this
  editors: Array<{
    editor: editor.IStandaloneCodeEditor;
    name: EditorNames;
  }>;
  addEditor: ({
    editor,
    name,
  }: {
    editor: editor.IStandaloneCodeEditor;
    name: EditorNames;
  }) => void;
  updateSingleEditorModel: ({
    editorName,
    tabId,
  }: {
    editorName: EditorNames;
    tabId: string;
  }) => void;
  updateEditorModels: ({ tabId }: { tabId: string }) => void;
  // results: string | null;
  // setResults: ({ value }: { value: string }) => void;
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
