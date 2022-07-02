import create from 'zustand';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import { editor as MONACO_EDITOR } from 'monaco-editor';
import cuid from 'cuid';
import { ExecutableDefinitionNode, isExecutableDefinitionNode, Kind } from 'graphql';

// constants
import {
  defaultOperation,
  defaultResults,
  defaultVariables,
  editorTheme,
} from '../../constants';

// types
import { GraphiQLEditorStore } from './types';

// utils
import {
  getActiveEditorTab,
  getOrCreateModel,
  parseQuery,
  pushEditOperationsToModel,
} from '../../utils';

export const useGraphiQLEditor = create<GraphiQLEditorStore>((set, get) => ({
  monacoGraphQLAPI: initializeMode({
    formattingOptions: {
      prettierConfig: {
        // TODO: this could use some tweaking
        printWidth: 40,
      },
    },
  }),
  activeEditorTabId: null,
  setActiveEditorTabId: ({ editorTabId }) => {
    set({ activeEditorTabId: editorTabId });
  },
  editorTabs: [],
  resetEditorTabs: () => {
    const addEditorTab = get().addEditorTab;
    // reset
    set({ editorTabs: [] });

    // init new tab1
    addEditorTab();
  },
  addEditorTab: () => {
    const editorTabs = get().editorTabs;
    const switchEditorTab = get().switchEditorTab;

    const newEditorTabId = cuid.slug();

    const operationModel = getOrCreateModel({
      uri: `${newEditorTabId}-operations.graphql`,
      value: defaultOperation,
    });
    const variablesModel = getOrCreateModel({
      uri: `${newEditorTabId}-variables.json`,
      value: defaultVariables,
    });
    const headersModel = getOrCreateModel({
      uri: `${newEditorTabId}-headers.json`,
      value: defaultVariables,
    });
    const resultsModel = getOrCreateModel({
      uri: `${newEditorTabId}-results.json`,
      value: defaultResults,
    });

    const newEditorTab = {
      editorTabId: newEditorTabId,
      editorTabName: `Tab${editorTabs.length > 0 ? editorTabs.length + 1 : 1}`,
      operationModel,
      variablesModel,
      headersModel,
      resultsModel,
      operationDefinition: null,
    };

    set({ activeEditorTabId: newEditorTabId, editorTabs: [...editorTabs, newEditorTab] });
    switchEditorTab({ editorTabId: newEditorTabId });
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
    const monacoEditors = get().monacoEditors;
    const editorTabs = get().editorTabs;
    const editorTab = editorTabs.find((t) => t.editorTabId === editorTabId);

    // console.log('running switchEditorTab', { monacoEditors, editorTab });

    if (editorTab) {
      // explicitly set the activeEditorTabId
      set({ activeEditorTabId: editorTabId });

      // TODO: there's probably a better way to do this 👇
      const operationsEditor = monacoEditors.find((e) => e.name === 'operation');
      const variablesEditor = monacoEditors.find((e) => e.name === 'variables');
      const headersEditor = monacoEditors.find((e) => e.name === 'headers');
      const resultsEditor = monacoEditors.find((e) => e.name === 'results');
      operationsEditor?.editor.setModel(editorTab.operationModel);
      variablesEditor?.editor.setModel(editorTab.variablesModel);
      headersEditor?.editor.setModel(editorTab.headersModel);
      resultsEditor?.editor.setModel(editorTab.resultsModel);

      //TODO there's an uncaught promise in the DiagnosticsAdapter
      // languageFeatures.ts:124 Uncaught (in promise) TypeError: Cannot read properties of null (reading 'doValidation') at DiagnosticsAdapter._doValidate (languageFeatures.ts:124:38)
      monacoGraphQLAPI.setDiagnosticSettings({
        validateVariablesJSON: {
          [editorTab.operationModel.uri.toString()]: [
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
  // removeVariables: ({ variableNames }) => {
  //   const activeEditorTab = getActiveEditorTab();

  //   if (activeEditorTab) {
  //     // 1. parse the existing variables string to an object
  //     const parsedVariables = JSON.parse(activeEditorTab.variablesModel.getValue());
  //     // 2. remove the variables
  //     variableNames.forEach((v) => {
  //       delete parsedVariables[v];
  //     });
  //     // 3. return to string
  //     const newVariablesString = JSON.stringify(parsedVariables, null, ' ');
  //     // 4. update the model
  //     pushEditOperationsToModel({
  //       model: activeEditorTab.variablesModel,
  //       text: newVariablesString,
  //     });
  //   } else {
  //     console.log("editorTab doesn't exist ☠️");
  //   }
  // },
  updateVariable: ({ variableName, variableValue }) => {
    const activeEditorTab = getActiveEditorTab();
    // console.log('running updateVariable', {
    //   variableName,
    //   variableValue,
    // });
    if (activeEditorTab) {
      // 1. parse the existing variables string to an object
      // if the current variables model is undefined, use an empty object string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let parsedVariables: Record<any, any> = {};
      try {
        parsedVariables = JSON.parse(activeEditorTab.variablesModel.getValue() || '{}');
      } catch (error) {
        console.warn('error parsing variables in updateVariable');
      }
      // 2. set the variableName and/or variableValue
      parsedVariables[variableName] = variableValue;
      // 3. return to string
      const newVariablesString = JSON.stringify(parsedVariables, null, ' ');
      // 4. update the model
      // console.log('updateVariable, pushEditOperationsToModel', { newVariablesString });
      pushEditOperationsToModel({
        model: activeEditorTab.variablesModel,
        text: newVariablesString,
      });
    } else {
      console.log("editorTab doesn't exist ☠️");
    }
  },
  updateModel: ({ modelType, newValue }) => {
    const editorTabs = get().editorTabs;
    const activeEditorTabId = get().activeEditorTabId;

    const activeEditorTab = editorTabs.find(
      (editorTab) => editorTab.editorTabId === activeEditorTabId
    );

    if (activeEditorTab) {
      const model = activeEditorTab[modelType];
      model.pushEditOperations(
        [],
        [
          {
            range: model.getFullModelRange(),
            text: newValue,
          },
        ],
        () => []
      );
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

    const parsedQuery = parseQuery(value);
    if (!(parsedQuery instanceof Error)) {
      // console.log('parsedQuery', { parsedQuery });
      const operationDefinition = (): ExecutableDefinitionNode | null => {
        const firstDefinition = parsedQuery?.definitions[0];

        if (!firstDefinition) {
          return null;
        }

        if (isExecutableDefinitionNode(firstDefinition)) {
          return firstDefinition;
        }

        return null;
      };

      const newDefinition = operationDefinition();

      if (newDefinition?.kind === Kind.OPERATION_DEFINITION) {
        updateOperationDefinition({ newDefinition });
      }
    }
  },

  monacoEditors: [],
  addMonacoEditor: ({ editor, name }) => {
    // console.log('running addMonacoEditor', { editor });

    MONACO_EDITOR.defineTheme('graphiql-default', editorTheme);

    const monacoEditors = get().monacoEditors;
    const existingEditor = monacoEditors.find((e) => e.name === name);
    if (!existingEditor) {
      set({ monacoEditors: [...monacoEditors, { editor, name }] });
    }
  },
}));
