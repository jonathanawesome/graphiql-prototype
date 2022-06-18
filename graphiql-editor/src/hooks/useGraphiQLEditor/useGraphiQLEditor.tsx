import create from 'zustand';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import * as JSONC from 'jsonc-parser';
import {
  buildClientSchema,
  ExecutableDefinitionNode,
  getIntrospectionQuery,
  IntrospectionQuery,
  isExecutableDefinitionNode,
  Kind,
} from 'graphql';

/** types */
import { GraphiQLEditorStore } from './types';

/** test schema */
import testSchema from './testSchema.js';

/** utils */
import {
  fetcher,
  getActiveEditorTab,
  getOrCreateModel,
  parseQuery,
  pushEditOperationsToModel,
} from '../../utils';
import { KeyCode, KeyMod } from 'monaco-editor';
import { defaultOperation, defaultResults, defaultVariables } from '../../constants';
import cuid from 'cuid';

export const useGraphiQLEditor = create<GraphiQLEditorStore>((set, get) => ({
  monacoGraphQLAPI: initializeMode({
    formattingOptions: {
      prettierConfig: {
        printWidth: 90,
      },
    },
  }),
  activeEditorTabId: null,
  setActiveEditorTabId: ({ editorTabId }) => {
    set({ activeEditorTabId: editorTabId });
  },
  editorTabs: [],
  initializeAndActivateEditorTab: () => {
    const addEditorTab = get().addEditorTab;
    const switchEditorTab = get().switchEditorTab;

    const editorTabId = cuid.slug();

    const operationModel = getOrCreateModel({
      uri: `${editorTabId}-operations.graphql`,
      value: defaultOperation,
    });
    const variablesModel = getOrCreateModel({
      uri: `${editorTabId}-variables.json`,
      value: defaultVariables,
    });
    const resultsModel = getOrCreateModel({
      uri: `${editorTabId}-results.json`,
      value: defaultResults,
    });

    addEditorTab({
      editorTab: {
        editorTabId,
        editorTabName: '<untitled>',
        operationModel,
        variablesModel,
        resultsModel,
        operationDefinition: null,
      },
    });

    set({ activeEditorTabId: editorTabId });
    switchEditorTab({ editorTabId });
    return { operationModelUri: `${editorTabId}-operations.graphql` };
  },
  addEditorTab: ({ editorTab }) => {
    const editorTabs = get().editorTabs;
    const existingEditorTab = editorTabs.find(
      (t) => t.editorTabId === editorTab.editorTabId
    );
    // console.log('addEditorTab', {existingEditorTab});
    if (!existingEditorTab) {
      set({ editorTabs: [...editorTabs, editorTab] });
    }
  },
  removeEditorTab: ({ editorTabId }) => {
    // console.log('removeEditorTab', { editorTabId });
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

    console.log('running switchEditorTab', { monacoEditors, editorTab });

    if (editorTab) {
      // TODO: there's probably a better way to do this 👇
      const operationsEditor = monacoEditors.find((e) => e.name === 'operation');
      const variablesEditor = monacoEditors.find((e) => e.name === 'variables');
      const resultsEditor = monacoEditors.find((e) => e.name === 'results');
      operationsEditor?.editor.setModel(editorTab.operationModel);
      variablesEditor?.editor.setModel(editorTab.variablesModel);
      resultsEditor?.editor.setModel(editorTab.resultsModel);
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
    console.log('running updateVariable', {
      variableName,
      variableValue,
    });
    if (activeEditorTab) {
      // 1. parse the existing variables string to an object
      // if the current variables model is undefined, use an empty object string
      const parsedVariables = JSON.parse(
        activeEditorTab.variablesModel.getValue() || '{}'
      );
      // 2. set the variableName and/or variableValue
      parsedVariables[variableName] = variableValue;
      // 3. return to string
      const newVariablesString = JSON.stringify(parsedVariables, null, ' ');
      // 4. update the model
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
        editorTabsCopy[existingEditorTabIndex] = {
          ...editorTabsCopy[existingEditorTabIndex],
          operationDefinition: null,
        };
      } else if (isExecutableDefinitionNode(newDefinition)) {
        // TODO: do we want to populate the variables editor here?
        // const variableDefinitions = newDefinition.variableDefinitions;

        // if (variableDefinitions && variableDefinitions?.length > 0) {
        //   const activeEditorTab = editorTabsCopy.find(
        //     (eT) => eT.editorTabId === activeEditorTabId
        //   );

        //   const variablesString = activeEditorTab?.variablesModel.getValue();

        //   let parsed: Record<any, any> = {};
        //   if (variablesString) {
        //     parsed = JSON.parse(variablesString);
        //   }
        // }

        editorTabsCopy[existingEditorTabIndex] = {
          ...editorTabsCopy[existingEditorTabIndex],
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
    const monacoEditors = get().monacoEditors;
    const existingEditor = monacoEditors.find((e) => e.name === name);
    if (!existingEditor) {
      set({ monacoEditors: [...monacoEditors, { editor, name }] });
    }
  },
  executeOperation: async () => {
    const activeEditor = getActiveEditorTab();
    const updateModel = get().updateModel;
    const schemaUrl = get().schemaUrl;

    if (schemaUrl && activeEditor) {
      const operationModelValue = activeEditor.operationModel.getValue();
      const variablesModelValue = activeEditor.variablesModel.getValue();

      const result = await fetcher({ url: schemaUrl })({
        operationName: activeEditor.operationDefinition?.name?.value || '',
        query: operationModelValue,
        variables: variablesModelValue ? JSONC.parse(variablesModelValue) : undefined,
      });

      console.log('running executeOperation', {
        operationName: activeEditor.operationDefinition?.name?.value || '',
        query: operationModelValue,
        variables: variablesModelValue ? JSONC.parse(variablesModelValue) : undefined,
        result,
      });

      updateModel({
        modelType: 'resultsModel',
        newValue: JSON.stringify(result, null, 2),
      });
    } else {
      alert(
        `Schucks...you're trying to run an operation on the test schema, but it's not backed by a server. Try the 🔀 icon in the sidebar to explore publicly available schemas.`
      );
    }
  },
  schemaUrl: null,
  schema: null,
  initSchema: async ({ url }) => {
    const monacoGraphQLAPI = get().monacoGraphQLAPI;

    const initializeAndActivateEditorTab = get().initializeAndActivateEditorTab;

    set({
      schemaUrl: url,
      // "reset" editorTabs
      editorTabs: [],
    });

    const { operationModelUri } = initializeAndActivateEditorTab();
    console.log('operationModelUri', operationModelUri);

    if (!url) {
      set({ schema: testSchema, schemaUrl: null });
      console.log('no URL provided, setting testSchema');

      return monacoGraphQLAPI.setSchemaConfig([
        {
          schema: testSchema,
          uri: `testSchema-schema.graphql`,
          // fileMatch: [operationModelUri],
        },
      ]);
    } else {
      console.log('initializing schema:', { url });

      try {
        const result = await fetcher({ url })({
          query: getIntrospectionQuery(),
          operationName: 'IntrospectionQuery',
        });
        const schema = buildClientSchema(result.data as unknown as IntrospectionQuery);

        set({ schema });

        return monacoGraphQLAPI.setSchemaConfig([
          {
            schema,
            uri: `${url}-schema.graphql`,
            // fileMatch: [operationModelUri],
          },
        ]);
      } catch (error) {
        return set({ schema: { error } });
      }
    }
  },
  runOperationAction: () => ({
    id: 'graphql-run-operation',
    label: 'Run Operation',
    contextMenuOrder: 0,
    contextMenuGroupId: 'graphql',
    keybindings: [KeyMod.CtrlCmd | KeyCode.Enter],
    run: get().executeOperation,
  }),
}));
