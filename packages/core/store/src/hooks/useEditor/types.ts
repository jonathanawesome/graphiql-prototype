import type { StoreApi } from 'zustand';
import type { IPosition, IRange } from 'monaco-editor';

// types
import type { DocumentActions, DocumentState } from './document';
import type { MonacoActions, MonacoState } from './monaco';
import type { TabsActions, TabsState } from './tabs';
import type { VariablesActions, VariablesState } from './variables';

export type GetEditorStore = StoreApi<EditorStore>['getState'];
export type SetEditorStore = StoreApi<EditorStore>['setState'];

export type EditorStore = DocumentActions &
  DocumentState &
  MonacoState &
  MonacoActions &
  TabsActions &
  TabsState &
  VariablesActions &
  VariablesState & {
    // needs a home
    splitMultipleOperationsToSeparateTabs: () => void;
    pushEdit: ({
      edits,
      position,
      targetEditor,
    }: {
      edits: Array<{
        range?: IRange;
        text: string | null;
      }>;
      position: IPosition;
      targetEditor: 'operations' | 'variables' | 'results';
    }) => void;
    // updateActiveDefinitionFromModelValue: ({ value }: { value: string }) => void;
  };
