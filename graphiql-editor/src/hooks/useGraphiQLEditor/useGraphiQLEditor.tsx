import create from 'zustand';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import * as JSONC from 'jsonc-parser';
import {
  buildClientSchema,
  ExecutableDefinitionNode,
  getIntrospectionQuery,
  IntrospectionQuery,
  isExecutableDefinitionNode,
} from 'graphql';

/** types */
import { GraphiQLEditorStore } from './types';

/** test schema */
import testSchema from './testSchema.js';

/** utils */
import {
  fetcher,
  getActiveEditorTab,
  getDisplayStringFromVariableDefinitionTypeNode,
  parseQuery,
  pushEditOperationsToModel,
} from '../../utils';
import { KeyCode, KeyMod } from 'monaco-editor';

export const useGraphiQLEditor = create<GraphiQLEditorStore>((set, get) => ({
  activeEditorTabId: null,
  setActiveEditorTabId: ({ editorTabId }) => {
    set({ activeEditorTabId: editorTabId });
  },
  editorTabs: [],
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
    const editorTabs = get().editorTabs;
    // console.log('removeEditorTab', { editorTabId });
    const remainingEditors = editorTabs.filter((t) => t.editorTabId !== editorTabId);
    set({
      editorTabs: remainingEditors,
      activeEditorTabId: remainingEditors[0].editorTabId,
    });
  },
  removeVariables: ({ variableNames }) => {
    const activeEditorTab = getActiveEditorTab();

    if (activeEditorTab) {
      // 1. parse the existing variables string to an object
      const parsedVariables = JSON.parse(activeEditorTab.variables);
      // 2. remove the variables
      variableNames.forEach((v) => {
        delete parsedVariables[v];
      });
      // 3. return to string
      const newVariablesString = JSON.stringify(parsedVariables);
      // 4. update the model
      pushEditOperationsToModel({
        model: activeEditorTab.variablesModel,
        text: newVariablesString,
      });
    } else {
      console.log("editorTab doesn't exist ☠️");
    }
  },
  updateVariable: ({ variableName, variableValue }) => {
    const activeEditorTab = getActiveEditorTab();

    if (activeEditorTab) {
      // 1. parse the existing variables string to an object
      const parsedVariables = JSON.parse(activeEditorTab.variables);
      // 2. set the variableName and/or variableValue
      parsedVariables[variableName] = variableValue;
      // 3. return to string
      const newVariablesString = JSON.stringify(parsedVariables);
      // 4. update the model
      pushEditOperationsToModel({
        model: activeEditorTab.variablesModel,
        text: newVariablesString,
      });
    } else {
      console.log("editorTab doesn't exist ☠️");
    }
  },
  updateEditorTabData: ({ dataType, newValue }) => {
    // TODO: lots to improve here.
    console.log('running updateEditorTabData', {
      dataType,
      newValue,
    });

    const editorTabs = get().editorTabs;
    const activeEditorTabId = get().activeEditorTabId;
    const updateVariable = get().updateVariable;

    // 👇 safety first
    const editorTabsCopy = [...editorTabs];
    const existingEditorTabIndex = editorTabsCopy.findIndex(
      (editorTab) => editorTab.editorTabId === activeEditorTabId
    );
    if (existingEditorTabIndex !== -1) {
      let operationDefinitionUpdate: ExecutableDefinitionNode | null =
        editorTabsCopy[existingEditorTabIndex].operationDefinition;

      if (dataType === 'operation') {
        const parsedQuery = parseQuery(newValue);
        if (!(parsedQuery instanceof Error)) {
          const operationDefinition = (): ExecutableDefinitionNode | null => {
            const firstDefinition = parsedQuery?.definitions[0];

            if (!firstDefinition) {
              return null;
            }

            if (isExecutableDefinitionNode(firstDefinition)) {
              const variableDefinitions = firstDefinition.variableDefinitions;
              if (variableDefinitions && variableDefinitions?.length > 0) {
                variableDefinitions.forEach((v) =>
                  updateVariable({
                    variableName: v.variable.name.value,
                    variableValue: getDisplayStringFromVariableDefinitionTypeNode({
                      type: v.type,
                    }),
                  })
                );
              }
              return firstDefinition;
            }

            return null;
          };
          operationDefinitionUpdate = operationDefinition();
        }
      }

      editorTabsCopy[existingEditorTabIndex] = {
        ...editorTabsCopy[existingEditorTabIndex],
        [dataType]: newValue,
        operationDefinition: operationDefinitionUpdate,
      };

      set({ editorTabs: editorTabsCopy });
    } else {
      console.log("editorTab doesn't exist ☠️");
    }
  },
  swapEditorTab: ({ editorTabId }) => {
    const monacoEditors = get().monacoEditors;
    const editorTabs = get().editorTabs;
    const editorTab = editorTabs.find((t) => t.editorTabId === editorTabId);

    // console.log('running swapEditorTab', { monacoEditors, editorTab });

    if (editorTab) {
      // TODO: there's probably a better way to do this 👇
      const operationsEditor = monacoEditors.find((e) => e.name === 'operation');
      const variablesEditor = monacoEditors.find((e) => e.name === 'variables');
      const resultsEditor = monacoEditors.find((e) => e.name === 'results');
      operationsEditor?.editor.setModel(editorTab.operationModel);
      variablesEditor?.editor.setModel(editorTab.variablesModel);
      resultsEditor?.editor.setModel(editorTab.resultsModel);
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
    const updateEditorTabData = get().updateEditorTabData;
    const schemaUrl = get().schemaUrl;

    if (schemaUrl && activeEditor) {
      const result = await fetcher({ url: schemaUrl })({
        operationName: activeEditor.operationDefinition?.name?.value || '',
        query: activeEditor.operation,
        variables: activeEditor.variables
          ? JSONC.parse(activeEditor.variables)
          : undefined,
      });

      console.log('running executeOperation', {
        result,
      });

      updateEditorTabData({
        dataType: 'results',
        newValue: JSON.stringify(result, null, 2),
      });
    } else {
      alert(
        `Schucks...you're trying to run an operation on the test schema, but it's not backed by a server. Try clicking the GraphQL icon in the sidebar to explore publicly available schemas.`
      );
    }
  },
  schemaUrl: null,
  schema: null,
  initSchema: async ({ url }) => {
    // TODO 👇 hacky resets...need to fix
    // also, reinitializing here seems to work intermittently...operations editor still gets confused sometimes about what schema it's on
    // i think this might be solved when tabs are in and we're keep model states globally
    set({
      schemaUrl: url,
      editorTabs: [],
    });

    if (!url) {
      set({ schema: testSchema, schemaUrl: null });
      console.log('no URL provided, setting testSchema');

      initializeMode({
        schemas: [
          {
            schema: testSchema,
            uri: `testSchema-schema.graphql`,
          },
        ],
      });
    } else {
      console.log('initializing schema:', { url });

      const result = await fetcher({ url })({
        query: getIntrospectionQuery(),
        operationName: 'IntrospectionQuery',
      });

      const schema = buildClientSchema(result.data as unknown as IntrospectionQuery);

      set({ schema });

      initializeMode({
        schemas: [
          {
            schema,
            uri: `${url}-schema.graphql`,
          },
        ],
      });
    }
  },
  operationAction: () => ({
    id: 'graphql-run-operation',
    label: 'Run Operation',
    contextMenuOrder: 0,
    contextMenuGroupId: 'graphql',
    keybindings: [KeyMod.CtrlCmd | KeyCode.Enter],
    run: get().executeOperation,
  }),
}));
