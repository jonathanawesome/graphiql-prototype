import { editor as MONACO_EDITOR } from 'monaco-editor/esm/vs/editor/editor.api';

// constants
import { editorOptions } from '../../../constants';

// hooks
import { useEditor } from '../../useEditor';
import { useSchema } from '../../useSchema';

// types
import { GetEditorStore, SetEditorStore } from '../types';
import { MonacoActions } from './types';

export const monacoActions = (
  get: GetEditorStore,
  set: SetEditorStore
): MonacoActions => ({
  initMonacoEditor: ({ monacoEditorType, monacoEditorRef, optionOverrides }) => {
    const monacoEditors = get().monacoEditors;
    const activeTab = get().getActiveTab();

    const updateOperationDefinitionFromModelValue =
      get().updateOperationDefinitionFromModelValue;

    const runOperationAction = useSchema.getState().runOperationAction;

    const editor = MONACO_EDITOR.create(monacoEditorRef, {
      language: monacoEditorType === 'operations' ? 'graphql' : 'json',
      // spread our base options
      ...editorOptions,
      // spread any option overrides that were passed in
      ...(optionOverrides && optionOverrides),
      fixedOverflowWidgets: true,
      model: monacoEditors[monacoEditorType]
        ? // if we have an editor of this type, we'll set the model
          activeTab[`${monacoEditorType}Model`]
        : //otherwise, we'll leave it undefined for now
          undefined,
    });
    console.log('running initMonacoEditor2', { editor });

    // add this editor to our editors state array
    set({
      monacoEditors: {
        ...monacoEditors,
        [monacoEditorType]: editor,
      },
    });

    if (monacoEditorType !== 'results') {
      // add the runOperationAction to the operation and variables editors
      editor.addAction(runOperationAction());

      // when our operation or variables editor models change, update the operationDefinition
      editor.onDidChangeModelContent(() => {
        if (monacoEditorType === 'variables') {
          set({ activeVariables: editor.getValue() });
        }
        updateOperationDefinitionFromModelValue({ value: editor.getValue() });
      });

      // set the height of our editor
      editor.onDidContentSizeChange(() => {
        const contentHeight = editor.getContentHeight();
        if (monacoEditorRef) {
          monacoEditorRef.style.height = `${contentHeight}px`;
        }
      });
    }

    if (monacoEditorType === 'operations') {
      editor.onDidChangeCursorPosition(() => {
        const determineActiveExecutableDefinition =
          useEditor.getState().determineActiveExecutableDefinition;
        determineActiveExecutableDefinition();
      });
    }
  },
});
