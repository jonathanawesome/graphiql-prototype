import { editor as MONACO_EDITOR } from 'monaco-editor';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';

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
  initMonacoGraphQLAPI: () => {
    set({
      monacoGraphQLAPI: initializeMode({
        formattingOptions: {
          prettierConfig: {
            // TODO: this could use some tweaking
            printWidth: 40,
          },
        },
      }),
    });
  },
  initMonacoEditor: ({ monacoEditorType, monacoEditorRef, optionOverrides }) => {
    const monacoEditors = get().monacoEditors;
    const activeTab = get().getActiveTab();
    const setDocumentState = useEditor.getState().setDocumentState;

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
        const editorValue = editor.getValue();

        console.log('onDidChangeModelContent', {
          // docState: useEditor.getState().documentDefinitions,
          value: editorValue,
        });

        if (monacoEditorType === 'variables') {
          set({ activeVariables: editorValue });
        }

        if (monacoEditorType === 'operations') {
          const selection = editor.getSelection();

          if (editorValue.length === 0) {
            useEditor.getState().clearDocumentState();
          }

          if (selection) {
            editor.setSelection(selection);
          }

          editor.focus();
        }
      });

      // TODO: FIX THIS...set the height of our editor
      editor.onDidContentSizeChange(() => {
        // const contentHeight = editor.getContentHeight();
        // if (monacoEditorRef) {
        //   monacoEditorRef.style.height = `${contentHeight}px`;
        // }
      });
    }

    if (monacoEditorType === 'operations') {
      editor.onDidChangeCursorPosition(() => {
        setDocumentState();
      });
    }
  },
});
