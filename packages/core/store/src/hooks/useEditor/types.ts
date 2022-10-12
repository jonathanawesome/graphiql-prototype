import { OperationDefinitionNode } from 'graphql';
import { editor as MONACO_EDITOR, IRange } from 'monaco-editor/esm/vs/editor/editor.api';
import type { MonacoGraphQLAPI } from 'monaco-graphql';

// types
import type { HTTPHeaderValue } from '../useHTTPHeaders';

export type EditorTabState = {
  editorTabId: string;
  editorTabName: string;
  operationsModel: MONACO_EDITOR.ITextModel;
  variablesModel: MONACO_EDITOR.ITextModel;
  resultsModel: MONACO_EDITOR.ITextModel;
  headers: HTTPHeaderValue[];
  operationDefinition: OperationDefinitionNode | null;
  warningWhenMultipleOperations: boolean;
};

type MonacoEditors = {
  operations: MONACO_EDITOR.IStandaloneCodeEditor | null;
  variables: MONACO_EDITOR.IStandaloneCodeEditor | null;
  results: MONACO_EDITOR.IStandaloneCodeEditor | null;
};

export type MonacoEditorTypes = 'operations' | 'variables' | 'results';

export type EditorStore = {
  // monaco
  monacoGraphQLAPI: MonacoGraphQLAPI;
  initMonacoEditor: ({
    monacoEditorType,
    monacoEditorRef,
    optionOverrides,
  }: {
    monacoEditorType: MonacoEditorTypes;
    monacoEditorRef: HTMLDivElement;
    optionOverrides?: MONACO_EDITOR.IStandaloneEditorConstructionOptions;
  }) => void;
  monacoEditors: MonacoEditors;
  addMonacoEditor: ({
    editor,
    name,
  }: {
    editor: MONACO_EDITOR.IStandaloneCodeEditor;
    name: MonacoEditorTypes;
  }) => void;

  // tabs
  setModelsForAllEditorsWithinTab: ({
    destinationTab,
  }: {
    destinationTab: EditorTabState;
  }) => void;
  initEditorTab: ({
    withOperationModelValue,
  }: {
    withOperationModelValue?: {
      value: string;
      operationName: string | null;
      operationDefinition: OperationDefinitionNode;
    };
  }) => void;
  activeEditorTabId: string | null;
  setActiveEditorTabId: ({ editorTabId }: { editorTabId: string }) => void;
  getActiveTab: () => EditorTabState;
  editorTabs: EditorTabState[];
  resetEditorTabs: () => void;
  removeEditorTab: ({ editorTabId }: { editorTabId: string }) => void;
  switchEditorTab: ({ editorTabId }: { editorTabId: string }) => void;

  // variables
  removeVariable: ({
    onInputObject,
    variableName,
  }: {
    onInputObject?: string;
    variableName: string;
  }) => void;
  activeVariables: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getVariables: () => Record<any, any>;
  updateVariable: ({
    onInputObject,
    variableName,
    variableValue,
  }: {
    onInputObject?: string;
    variableName: string;
    variableValue: string | string[];
  }) => void;

  // "other"
  splitMultipleOperationsToSeparateTabs: () => void;
  updateModel: ({
    range,
    targetModel,
    text,
  }: {
    range?: IRange;
    targetModel: 'operationsModel' | 'variablesModel' | 'resultsModel';
    text: string | null;
  }) => void;
  updateOperationDefinition: ({
    newDefinition,
  }: {
    newDefinition: OperationDefinitionNode | null;
  }) => void;
  updateOperationDefinitionFromModelValue: ({ value }: { value: string }) => void;
  // these TabHeader functions are basically duplicates of those in the useHTTPHeaders package
  // there's gotta be a better way to do this
  // addTabHeader: () => void;
  // removeTabHeader: ({ id }: { id: string }) => void;
  // updateHeader: ({
  //   id,
  //   payload,
  // }: {
  //   id: string;
  //   payload: UpdateHeaderKeyOrValue | UpdateHeaderStatus;
  // }) => void;

  // TODO: 👇 is this the right way to update editor tab state? it seems brittle...currently only used for updating tab headers
  updateTabState: ({ data }: { data: Partial<EditorTabState> }) => void;
};
