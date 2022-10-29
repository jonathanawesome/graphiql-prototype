import type { StoreApi } from 'zustand';
import type { IPosition, IRange } from 'monaco-editor';

// types
import type { DocumentActions, DocumentState } from './document';
import type { MonacoActions, MonacoState } from './monaco';
import type { TabsActions, TabsState } from './tabs';
import type { VariablesActions, VariablesState } from './variables';

export type GetEditorStore = StoreApi<EditorStore>['getState'];
export type SetEditorStore = StoreApi<EditorStore>['setState'];

export type EditorEdit = {
  /**
   * A valid range or an explicit call for the model's full range.
   * Source docs indicate that this can be "empty", but the source _type_ doesn't allow it.
   * @see {@link https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ISingleEditOperation.html#range}
   */
  range: IRange | 'FULL_MODEL_RANGE';
  text: string | null;
};

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
      edits: Array<EditorEdit>;
      position: IPosition;
      targetEditor: 'operations' | 'variables' | 'results';
    }) => void;
  };
