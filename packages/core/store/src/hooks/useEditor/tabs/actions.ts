import cuid from 'cuid';

// types
import { EditorTabState } from './types';

// utils
import { getOrCreateModel } from '@graphiql-prototype/utils';

// constants
import { defaultOperation, defaultResults, defaultVariables } from '../../../constants';

// types
import { GetEditorStore, SetEditorStore } from '../types';
import { TabsActions } from './types';

export const tabsActions = (get: GetEditorStore, set: SetEditorStore): TabsActions => ({
  setModelsForAllEditorsWithinTab: ({ destinationTab }) => {
    const clearDocumentState = get().clearDocumentState;
    const setDocumentState = get().setDocumentState;

    // get our array of editors
    const monacoEditors = get().monacoEditors;

    // set the model for each of our editors
    monacoEditors.operations?.setModel(destinationTab.operationsModel);
    monacoEditors.variables?.setModel(destinationTab.variablesModel);
    monacoEditors.results?.setModel(destinationTab.resultsModel);

    clearDocumentState();
    setDocumentState();
  },
  initEditorTab: ({ withOperationModelValue }) => {
    const monacoGraphQLAPI = get().monacoGraphQLAPI;

    // grab our array of existing editorTabs
    const editorTabs = get().editorTabs;

    const setModelsForAllEditorsWithinTab = get().setModelsForAllEditorsWithinTab;
    const switchEditorTab = get().switchEditorTab;

    // generate a unique id for our new editorTab
    const newEditorTabId = cuid.slug();

    // create all of the necessary models for our new editorTab
    const operationsModel = getOrCreateModel({
      uri: `${newEditorTabId}-operations.graphql`,
      // if we've a value for withOperationModelValue, it means we're splitting multiple operations into tabs,
      // so we initialize the new operations model with the incoming value
      value: withOperationModelValue ? withOperationModelValue.value : defaultOperation,
    });
    const variablesModel = getOrCreateModel({
      uri: `${newEditorTabId}-variables.json`,
      value: defaultVariables,
    });
    const resultsModel = getOrCreateModel({
      uri: `${newEditorTabId}-results.json`,
      value: defaultResults,
    });

    // build our new editorTab shape
    const newEditorTab: EditorTabState = {
      editorTabId: newEditorTabId,
      editorTabName:
        withOperationModelValue?.operationName ||
        `Tab${editorTabs.length > 0 ? editorTabs.length + 1 : 1}`,
      operationsModel,
      variablesModel,
      resultsModel,
      headers: [
        {
          id: cuid.slug(),
          enabled: false,
          isRequired: false,
          key: '',
          value: '',
        },
      ],
      operationDefinition: withOperationModelValue?.operationDefinition || null,
    };

    setModelsForAllEditorsWithinTab({ destinationTab: newEditorTab });

    monacoGraphQLAPI?.setDiagnosticSettings({
      validateVariablesJSON: {
        [operationsModel.uri.toString()]: [variablesModel.uri.toString()],
      },
      jsonDiagnosticSettings: {
        allowComments: true,
        schemaValidation: 'error',
        trailingCommas: 'warning',
      },
    });

    // set the activeEditorTabId to our new editorTab and spread our new editorTab into our array of editorTabs
    set({
      activeEditorTabId: newEditorTabId,
      editorTabs: [...editorTabs, newEditorTab],
    });
    switchEditorTab({ editorTabId: newEditorTabId });
  },

  setActiveEditorTabId: ({ editorTabId }) => {
    set({ activeEditorTabId: editorTabId });
  },
  getActiveTab: () => {
    const activeEditorTabId = get().activeEditorTabId;
    const editorTabs = get().editorTabs;
    const activeTab = editorTabs.find(
      (editorTab) => editorTab.editorTabId === activeEditorTabId
    );

    return activeTab as EditorTabState;
  },
  resetEditorTabs: () => {
    const initEditorTab = get().initEditorTab;

    // reset
    set({ editorTabs: [] });

    // init new tab1
    initEditorTab({});
  },
  removeEditorTab: ({ editorTabId }) => {
    const editorTabs = get().editorTabs;
    const switchEditorTab = get().switchEditorTab;

    // filter the tab we're removing from our editorTabs array
    const remainingEditors = editorTabs.filter((t) => t.editorTabId !== editorTabId);

    set({
      // replace our editorTabs array with our remaining editors
      editorTabs: remainingEditors,

      // set the new active tab to the first tab
      activeEditorTabId: remainingEditors[0].editorTabId,
    });

    // replace the models within our editors
    switchEditorTab({ editorTabId: remainingEditors[0].editorTabId });
  },
  switchEditorTab: ({ editorTabId }) => {
    const monacoGraphQLAPI = get().monacoGraphQLAPI;
    const editorTabs = get().editorTabs;
    const editorTab = editorTabs.find((t) => t.editorTabId === editorTabId);
    const setModelsForAllEditorsWithinTab = get().setModelsForAllEditorsWithinTab;
    const activeDefinition = get().activeDefinition;

    if (editorTab) {
      set({
        // set the activeEditorTabId
        activeEditorTabId: editorTabId,
        // set the active variables
        activeVariables: editorTab.variablesModel.getValue(),
        // set the activeDefinition
        activeDefinition,
      });

      // set the model values for each of our editors
      setModelsForAllEditorsWithinTab({ destinationTab: editorTab });

      monacoGraphQLAPI?.setDiagnosticSettings({
        validateVariablesJSON: {
          [editorTab.operationsModel.uri.toString()]: [
            editorTab.variablesModel.uri.toString(),
          ],
        },
        jsonDiagnosticSettings: {
          // jsonc tip!
          allowComments: true,
          schemaValidation: 'error',
          // this is nice too
          trailingCommas: 'warning',
        },
      });
    }
  },
  updateTabState: ({ data }) => {
    const editorTabs = get().editorTabs;
    const activeEditorTabId = get().activeEditorTabId;

    // 👇 safety first
    const editorTabsCopy = [...editorTabs];

    const existingEditorTabIndex = editorTabsCopy.findIndex(
      (editorTab) => editorTab.editorTabId === activeEditorTabId
    );

    if (existingEditorTabIndex !== -1) {
      editorTabsCopy[existingEditorTabIndex] = {
        ...editorTabsCopy[existingEditorTabIndex],
        ...data,
      };
      set({ editorTabs: editorTabsCopy });
    }
  },
});
