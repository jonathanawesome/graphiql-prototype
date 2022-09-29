import create from 'zustand';
import cuid from 'cuid';
import {
  isExecutableDefinitionNode,
  Kind,
  OperationDefinitionNode,
  print,
} from 'graphql';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import { editor as MONACO_EDITOR } from 'monaco-editor/esm/vs/editor/editor.api';

// constants
import {
  defaultOperation,
  defaultResults,
  defaultVariables,
  editorOptions,
  editorThemeDark,
  editorThemeLight,
} from '../../constants';

// hooks
import { useSchema } from '@graphiql-prototype/use-schema';

// types
import { EditorTabState, EditorStore } from './types';

// utils
import { getOrCreateModel, pushEditOperationsToModel } from '../../utils';
import { parseQuery } from '@graphiql-prototype/utils';

// this should be called somewhere else, but fine here for now
MONACO_EDITOR.defineTheme('graphiql-DARK', editorThemeDark);
MONACO_EDITOR.defineTheme('graphiql-LIGHT', editorThemeLight);

export const useEditor = create<EditorStore>()((set, get) => ({
  initMonacoEditor: ({ monacoEditorType, monacoEditorRef, optionOverrides }) => {
    const monacoEditors = get().monacoEditors;
    const activeTab = get().getActiveTab();

    const updateOperationDefinitionFromModelValue =
      get().updateOperationDefinitionFromModelValue;

    const runOperationAction = useSchema.getState().runOperationAction;

    const editor = MONACO_EDITOR.create(monacoEditorRef, {
      language: monacoEditorType === 'operations' ? 'graphql' : 'json',
      ...editorOptions, // spread our base options
      ...(optionOverrides && optionOverrides), // spread any option overrides that were passed in
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

    // add the runOperationAction to the operation and variables editors
    if (monacoEditorType !== 'results') {
      editor.addAction(runOperationAction());

      // when our operation or variables editor models change, update the operationDefinition
      editor.onDidChangeModelContent(() => {
        if (monacoEditorType === 'variables') {
          set({ activeVariables: editor.getValue() });
        }
        updateOperationDefinitionFromModelValue({ value: editor.getValue() });
      });

      editor.onDidContentSizeChange(() => {
        const contentHeight = editor.getContentHeight();
        if (monacoEditorRef && monacoEditorRef) {
          monacoEditorRef.style.height = `${contentHeight}px`;
        }
      });
    }
  },
  setModelsForAllEditorsWithinTab: ({ destinationTab }) => {
    // get our array of editors
    const monacoEditors = get().monacoEditors;

    // set the model for each of our editors
    monacoEditors.operations?.setModel(destinationTab.operationsModel);
    monacoEditors.variables?.setModel(destinationTab.variablesModel);
    monacoEditors.headers?.setModel(destinationTab.headersModel);
    monacoEditors.results?.setModel(destinationTab.resultsModel);
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
    const headersModel = getOrCreateModel({
      uri: `${newEditorTabId}-headers.json`,
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
      headersModel,
      resultsModel,
      operationDefinition: withOperationModelValue?.operationDefinition || null,
    };

    setModelsForAllEditorsWithinTab({ destinationTab: newEditorTab });

    monacoGraphQLAPI.setDiagnosticSettings({
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
  getActiveTab: () => {
    const activeEditorTabId = get().activeEditorTabId;
    const editorTabs = get().editorTabs;
    const activeTab = editorTabs.find(
      (editorTab) => editorTab.editorTabId === activeEditorTabId
    );

    return activeTab as EditorTabState;
  },
  editorTabs: [],
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
    // const monacoEditors = get().monacoEditors;
    const editorTabs = get().editorTabs;
    const editorTab = editorTabs.find((t) => t.editorTabId === editorTabId);
    const setModelsForAllEditorsWithinTab = get().setModelsForAllEditorsWithinTab;

    if (editorTab) {
      set({
        // set the activeEditorTabId
        activeEditorTabId: editorTabId,
        // set the active variables
        activeVariables: editorTab.variablesModel.getValue(),
      });

      // set the model values for each of our editors
      setModelsForAllEditorsWithinTab({ destinationTab: editorTab });

      //TODO there's an uncaught promise in the DiagnosticsAdapter
      // languageFeatures.ts:124 Uncaught (in promise) TypeError: Cannot read properties of null (reading 'doValidation') at DiagnosticsAdapter._doValidate (languageFeatures.ts:124:38)
      monacoGraphQLAPI.setDiagnosticSettings({
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
        modelType: 'operationsModel',
        newValue: print({
          kind: Kind.DOCUMENT,
          definitions: [[...parsedQuery.definitions][0]],
        }),
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
  activeVariables: ``,
  removeVariable: ({ onInputObject, variableName }) => {
    const activeEditorTab = get().getActiveTab();
    console.log('running removeVariables', {
      onInputObject,
      variableName,
    });
    if (activeEditorTab) {
      // 1. parse the existing variables string to an object
      const parsedVariables = JSON.parse(activeEditorTab.variablesModel.getValue());
      // 2. remove the variables
      if (onInputObject) {
        if (Object.keys(parsedVariables[onInputObject]).length === 1) {
          delete parsedVariables[onInputObject];
        } else {
          delete parsedVariables[onInputObject][variableName];
        }
      } else {
        delete parsedVariables[variableName];
      }
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
  getVariables: () => {
    const activeEditorTab = get().getActiveTab();
    try {
      return JSON.parse(activeEditorTab.variablesModel.getValue());
    } catch (e) {
      console.warn(e);
      // Return a default object, or null based on use case.
      return {};
    }
  },
  updateVariable: async ({ onInputObject, variableName, variableValue }) => {
    console.log('running updateVariable', {
      onInputObject,
      variableName,
      variableValue,
    });
    const activeEditorTab = get().getActiveTab();

    if (activeEditorTab) {
      // 1. parse the existing variables string to an object
      // if the current variables model is undefined, use an empty object string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let parsedVariables: Record<any, any> = {};
      try {
        parsedVariables = await JSON.parse(
          activeEditorTab.variablesModel.getValue() || '{}'
        );
      } catch (error) {
        console.warn('error parsing variables in updateVariable');
      }
      // 2. set the variableName and/or variableValue
      if (onInputObject) {
        parsedVariables = {
          ...parsedVariables,
          [onInputObject]: {
            ...parsedVariables[onInputObject],
            [variableName]: variableValue,
          },
        };
        // parsedVariables['somenewobj'][variableName] = variableValue;
      } else {
        parsedVariables[variableName] = variableValue;
      }
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

    // console.log('updateOperationDefinitionFromModelValue', { value, parsedQuery });

    if (!(parsedQuery instanceof Error)) {
      // console.log('parsedQuery', { parsedQuery });

      if (parsedQuery?.definitions && parsedQuery.definitions.length > 1) {
        set({ warningWhenMultipleOperations: true });
      }

      if (parsedQuery?.definitions && parsedQuery.definitions.length <= 1) {
        set({ warningWhenMultipleOperations: false });
      }

      const firstDefinition = parsedQuery?.definitions[0];

      if (!firstDefinition) {
        return null;
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
  clearWarningWhenMultipleOperations: () => {
    set({ warningWhenMultipleOperations: false });
  },
  monacoEditors: {
    operations: null,
    variables: null,
    results: null,
    headers: null,
  },
  addMonacoEditor: ({ editor, name }) => {
    // console.log('running addMonacoEditor', { editor, name });

    const monacoEditors = get().monacoEditors;

    set({
      monacoEditors: {
        ...monacoEditors,
        ...(!monacoEditors[name] && { [name]: editor }),
      },
    });
  },
}));
