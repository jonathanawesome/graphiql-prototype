import type { DefinitionNode, OperationDefinitionNode } from 'graphql';
import { editor as MONACO_EDITOR } from 'monaco-editor';
import type { HTTPHeaderValue } from '../../useHTTPHeaders';

export type EditorTabState = {
  editorTabId: string;
  editorTabName: string;
  operationsModel: MONACO_EDITOR.ITextModel;
  variablesModel: MONACO_EDITOR.ITextModel;
  resultsModel: MONACO_EDITOR.ITextModel;
  headers: HTTPHeaderValue[];
  definitions: DefinitionNode[];
};

export type TabsState = {
  activeEditorTabId: string | null;
  editorTabs: EditorTabState[];
};

export type TabsActions = {
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

  setActiveEditorTabId: ({ editorTabId }: { editorTabId: string }) => void;
  getActiveTab: () => EditorTabState;
  resetEditorTabs: () => void;
  removeEditorTab: ({ editorTabId }: { editorTabId: string }) => void;
  switchEditorTab: ({ editorTabId }: { editorTabId: string }) => void;
  // TODO: 👇 is this the right way to update editor tab state? it seems brittle...currently only used for updating tab headers
  updateActiveTabState: ({ data }: { data: Partial<EditorTabState> }) => void;
};
