import type { StoreApi } from 'zustand';
import type { OperationDefinitionNode } from 'graphql';
import type { IRange } from 'monaco-editor';

// types
import type { ActiveDefinitionActions, ActiveDefinitionState } from './activeDefinition';
import type { MonacoActions, MonacoState } from './monaco';
import type { TabsActions, TabsState } from './tabs';
import type { VariablesActions, VariablesState } from './variables';

export type GetEditorStore = StoreApi<EditorStore>['getState'];
export type SetEditorStore = StoreApi<EditorStore>['setState'];

export type EditorStore = ActiveDefinitionActions &
  ActiveDefinitionState &
  MonacoState &
  MonacoActions &
  TabsActions &
  TabsState &
  VariablesActions &
  VariablesState & {
    // "other"
    splitMultipleOperationsToSeparateTabs: () => void;
    updateModel: ({
      edits,
      targetEditor,
    }: {
      edits: Array<{
        range?: IRange;
        text: string | null;
      }>;
      targetEditor: 'operations' | 'variables' | 'results';
    }) => void;
    updateOperationDefinition: ({
      newDefinition,
    }: {
      newDefinition: OperationDefinitionNode | null;
    }) => void;
    updateOperationDefinitionFromModelValue: ({ value }: { value: string }) => void;
  };
