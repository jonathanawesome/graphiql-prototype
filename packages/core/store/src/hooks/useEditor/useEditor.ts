import create from 'zustand';
import {
  isExecutableDefinitionNode,
  Kind,
  OperationDefinitionNode,
  print,
} from 'graphql';
import { editor as MONACO_EDITOR, Selection } from 'monaco-editor';

// constants
import { editorThemeDark, editorThemeLight } from '../../constants';

// types
import { EditorStore } from './types';

import { documentActions, documentState } from './document';
import { monacoActions, monacoState } from './monaco';
import { tabsActions, tabsState } from './tabs';
import { variablesActions, variablesState } from './variables';

// utils
import { parseQuery } from '@graphiql-prototype/utils';

// this should be called somewhere else, but fine here for now
MONACO_EDITOR.defineTheme('graphiql-DARK', editorThemeDark);
MONACO_EDITOR.defineTheme('graphiql-LIGHT', editorThemeLight);

export const useEditor = create<EditorStore>()((set, get) => ({
  ...documentState,
  ...documentActions(get, set),

  ...monacoState,
  ...monacoActions(get, set),

  ...tabsState,
  ...tabsActions(get, set),

  ...variablesState,
  ...variablesActions(get),

  splitMultipleOperationsToSeparateTabs: () => {
    // TODO: this was written very quickly, need to revisit

    const pushEdit = get().pushEdit;
    const initEditorTab = get().initEditorTab;
    const getActiveTab = get().getActiveTab();
    const parsedQuery = parseQuery(getActiveTab.operationsModel.getValue());

    if (parsedQuery && !(parsedQuery instanceof Error)) {
      console.log('running splitMultipleOperationsToSeparateTabs', {
        parsedQuery,
        firstDef: [...parsedQuery.definitions][0],
        defsToSplit: [...parsedQuery.definitions].splice(1),
      });

      pushEdit({
        edits: [
          {
            text: print({
              kind: Kind.DOCUMENT,
              definitions: [[...parsedQuery.definitions][0]],
            }),
          },
        ],
        position: { column: 0, lineNumber: 0 },
        targetEditor: 'operations',
      });

      [...parsedQuery.definitions].splice(1).forEach((d) =>
        initEditorTab({
          withOperationModelValue: {
            value: print({
              kind: Kind.DOCUMENT,
              definitions: [d],
            }),
            operationName: 'name' in d && d.name?.value ? d.name.value : null,
            operationDefinition: d as OperationDefinitionNode,
          },
        })
      );
    } else {
      console.log('Something went wrong!');
    }
  },

  pushEdit: ({ edits, position, targetEditor }) => {
    // 👇 edits via editor
    const monacoEditors = get().monacoEditors;

    const editor = monacoEditors[targetEditor] as MONACO_EDITOR.IStandaloneCodeEditor;

    const model = editor.getModel() as MONACO_EDITOR.ITextModel;

    // if we're not passed a range we'll use the full model range
    const editsWithViableRange: MONACO_EDITOR.ISingleEditOperation[] = edits.map(
      (edit) => {
        return {
          ...edit,
          range: edit.range || model.getFullModelRange(),
          forceMoveMarkers: true,
        };
      }
    );

    if (targetEditor === 'results') {
      // results editor is read-only
      model.pushEditOperations([], editsWithViableRange, () => null);
    } else {
      editor.executeEdits('edit', editsWithViableRange);

      // console.log('edits complete, setting position:', {
      //   // column: finalEdit.range.endColumn,
      //   // lineNumber: finalEdit.range?.endLineNumber,
      //   // editLength: finalEdit.text?.length,
      //   // pos: model.getPositionAt(finalEdit.text?.length as number),
      //   activeDefinition,
      //   activeDefinitionLocation: activeDefinition?.loc,
      //   // modelValue: model.getValue(),
      //   // range: finalEdit.range,
      //   // attemptingToMatch: finalEdit.text,
      //   // matches: finalEdit.text
      //   //   ? model.findMatches(print(activeDefinition), true, false, true, null, true)
      //   //   : 'NO TEXT TO MATCH',
      // });

      editor.setPosition(position);
    }

    // 👇 edits via model
    // const editorTabs = get().editorTabs;
    // const activeEditorTabId = get().activeEditorTabId;
    // const monacoEditors = get().monacoEditors;
    // const editor = monacoEditors[targetEditor] as MONACO_EDITOR.IStandaloneCodeEditor;

    // const activeEditorTab = editorTabs.find(
    //   (editorTab) => editorTab.editorTabId === activeEditorTabId
    // );

    // if (activeEditorTab) {
    //   const model = activeEditorTab[`${targetEditor}Model`];

    //   // if we're not passed a range we'll use the full model range
    //   const editsWithViableRange: MONACO_EDITOR.ISingleEditOperation[] = edits.map(
    //     (edit) => {
    //       return {
    //         ...edit,
    //         range: edit.range || model.getFullModelRange(),
    //         // forceMoveMarkers: true,
    //       };
    //     }
    //   );

    //   // edit our model
    //   // TODO: set the cursor position here

    //   model.pushEditOperations([], editsWithViableRange, () => null);

    //   const finalEdit = editsWithViableRange[editsWithViableRange.length - 1];

    //   console.log('edits complete, setting position:', {
    //     column: finalEdit.range.endColumn,
    //     lineNumber: finalEdit.range?.endLineNumber,
    //   });

    //   editor.setPosition({
    //     column: finalEdit.range.endColumn,
    //     lineNumber: finalEdit.range?.endLineNumber,
    //   });
    // }
  },
  // updateActiveDefinitionFromModelValue: ({ value }) => {
  //   const updateTabState = get().updateTabState;

  //   const parsedQuery = parseQuery(value);

  //   console.log('updateActiveDefinitionFromModelValue', { value, parsedQuery });

  //   if (!(parsedQuery instanceof Error)) {
  //     if (parsedQuery?.definitions && parsedQuery.definitions.length > 1) {
  //       updateTabState({
  //         data: { warningWhenMultipleOperations: true },
  //       });
  //     }

  //     if (parsedQuery?.definitions && parsedQuery.definitions.length <= 1) {
  //       updateTabState({
  //         data: { warningWhenMultipleOperations: false },
  //       });
  //     }

  //     // const firstDefinition = parsedQuery?.definitions[0];

  //     // if (!firstDefinition) {
  //     //   return set({ activeDefinition: null });
  //     // }

  //     // if (
  //     //   isExecutableDefinitionNode(firstDefinition) &&
  //     //   firstDefinition.kind === Kind.OPERATION_DEFINITION
  //     // ) {
  //     //   return set({ activeDefinition: firstDefinition });
  //     // }
  //   }
  //   return null;
  // },
}));
