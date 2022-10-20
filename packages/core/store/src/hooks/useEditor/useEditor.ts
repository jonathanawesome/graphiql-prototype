import create from 'zustand';
import {
  isExecutableDefinitionNode,
  Kind,
  OperationDefinitionNode,
  print,
} from 'graphql';
import { editor as MONACO_EDITOR } from 'monaco-editor/esm/vs/editor/editor.api';

// constants
import { editorThemeDark, editorThemeLight } from '../../constants';

// types
import { EditorStore } from './types';

import { monacoActions, monacoState } from './monaco';
import { tabsActions, tabsState } from './tabs';
import { variablesActions, variablesState } from './variables';

// utils
import { parseQuery } from '@graphiql-prototype/utils';

// this should be called somewhere else, but fine here for now
MONACO_EDITOR.defineTheme('graphiql-DARK', editorThemeDark);
MONACO_EDITOR.defineTheme('graphiql-LIGHT', editorThemeLight);

export const useEditor = create<EditorStore>()((set, get) => ({
  ...monacoState,
  ...monacoActions(get, set),

  ...variablesState,
  ...variablesActions(get),

  ...tabsState,
  ...tabsActions(get, set),

  splitMultipleOperationsToSeparateTabs: () => {
    // TODO: this was written very quickly, need to revisit

    const updateModel = get().updateModel;
    const initEditorTab = get().initEditorTab;
    const getActiveTab = get().getActiveTab();
    const parsedQuery = parseQuery(getActiveTab.operationsModel.getValue());

    if (parsedQuery && !(parsedQuery instanceof Error)) {
      console.log('running splitMultipleOperationsToSeparateTabs', {
        parsedQuery,
        firstDef: [...parsedQuery.definitions][0],
        defsToSplit: [...parsedQuery.definitions].splice(1),
      });

      updateModel({
        edits: [
          {
            text: print({
              kind: Kind.DOCUMENT,
              definitions: [[...parsedQuery.definitions][0]],
            }),
          },
        ],
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

  updateModel: ({ edits, targetEditor }) => {
    const monacoEditors = get().monacoEditors;

    const editor = monacoEditors[targetEditor] as MONACO_EDITOR.IStandaloneCodeEditor;

    const model = editor.getModel() as MONACO_EDITOR.ITextModel;

    const editsWithProperRange: MONACO_EDITOR.ISingleEditOperation[] = edits.map(
      (edit) => {
        return {
          ...edit,
          range: edit.range || model.getFullModelRange(),
        };
      }
    );

    console.log('updateModel', { editor, model, editsWithProperRange, targetEditor });

    if (targetEditor === 'results') {
      model.pushEditOperations([], editsWithProperRange, () => null);
    } else {
      const selection = editor.getSelection();

      editor.executeEdits('edit', editsWithProperRange);

      if (selection) {
        editor.setSelection(selection);
      }
    }
  },
  updateOperationDefinition: ({ newDefinition }) => {
    const editorTabs = get().editorTabs;
    const activeEditorTabId = get().activeEditorTabId;

    // 👇 safety first
    const editorTabsCopy = [...editorTabs];

    const existingEditorTabIndex = editorTabsCopy.findIndex(
      (editorTab) => editorTab.editorTabId === activeEditorTabId
    );

    if (existingEditorTabIndex !== -1) {
      if (!newDefinition) {
        // if we're here,  user has either manually cleared the operations editor or user has toggled OFF all fields in Pathfinder
        editorTabsCopy[existingEditorTabIndex] = {
          ...editorTabsCopy[existingEditorTabIndex],
          operationDefinition: null,
        };
      } else if (isExecutableDefinitionNode(newDefinition)) {
        // TODO: do we want to populate the variables editor here?
        // const variableDefinitions = newDefinition.variableDefinitions;
        // console.log('variableDefinitions', { variableDefinitions });
        // if (variableDefinitions && variableDefinitions?.length > 0) {
        //   const activeEditorTab = editorTabsCopy.find(
        //     (eT) => eT.editorTabId === activeEditorTabId
        //   );

        //   const variablesString = activeEditorTab?.variablesModel.getValue();

        //   let parsed: Record<any, any> = {};
        //   if (variablesString) {
        //     parsed = JSON.parse(variablesString);
        //     // we have an object with our existing variables
        //   }
        // }

        editorTabsCopy[existingEditorTabIndex] = {
          ...editorTabsCopy[existingEditorTabIndex],
          // let's ensure we're covering situations where user is explicitly naming their operation
          // this is the only way, currently, to provide a name for a tab
          editorTabName:
            newDefinition.name?.value ||
            editorTabsCopy[existingEditorTabIndex].editorTabName,
          operationDefinition: newDefinition,
        };
      }
      set({ editorTabs: editorTabsCopy });
    }
  },
  updateOperationDefinitionFromModelValue: ({ value }) => {
    const updateOperationDefinition = get().updateOperationDefinition;
    const updateTabState = get().updateTabState;

    const parsedQuery = parseQuery(value);

    // console.log('updateOperationDefinitionFromModelValue', { value, parsedQuery });

    if (!(parsedQuery instanceof Error)) {
      // console.log('parsedQuery', { parsedQuery });

      if (parsedQuery?.definitions && parsedQuery.definitions.length > 1) {
        updateTabState({
          data: { warningWhenMultipleOperations: true },
        });
      }

      if (parsedQuery?.definitions && parsedQuery.definitions.length <= 1) {
        updateTabState({
          data: { warningWhenMultipleOperations: false },
        });
      }

      const firstDefinition = parsedQuery?.definitions[0];

      if (!firstDefinition) {
        return updateOperationDefinition({ newDefinition: null });
      }

      if (
        isExecutableDefinitionNode(firstDefinition) &&
        firstDefinition.kind === Kind.OPERATION_DEFINITION
      ) {
        return updateOperationDefinition({ newDefinition: firstDefinition });
      }
    }
    return null;
  },
  warningWhenMultipleOperations: false,
}));
