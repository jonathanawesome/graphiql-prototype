import create from 'zustand';
import { editor, KeyCode, KeyMod } from 'monaco-editor';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import cuid from 'cuid';

import {
  buildClientSchema,
  ExecutableDefinitionNode,
  getIntrospectionQuery,
  IntrospectionQuery,
  isEnumType,
  isExecutableDefinitionNode,
  Kind,
  OperationDefinitionNode,
  print,
} from 'graphql';

/** constants */
// import { defaultOperation } from '../../constants';

/** types */
import { GraphiQLStore } from './types';

/** utils */
import { fetcher, parseEasyVars, parseQuery, unwrapInputType } from '../../utils';

/** test schema */
import testSchema from './testSchema.js';

export const useGraphiQL = create<GraphiQLStore>((set, get) => ({
  // activeSurveyor: null,
  // setActiveSurveyor: ({ surveyorId }) => {
  //   set({ activeSurveyor: surveyorId });
  // },
  // surveyors: [],
  // addSurveyor: ({ surveyor }) => {
  //   const surveyors = get().surveyors;
  //   const existingSurveyor = surveyors.find((t) => t.surveyorId === surveyor.surveyorId);
  //   // console.log('addSurveyor', {surveyor});
  //   if (!existingSurveyor) {
  //     // doesn't exist, let's add it
  //     set({ surveyors: [...surveyors, surveyor] });
  //   }
  // },
  // removeSurveyor: ({ surveyorId }) => {
  //   const surveyors = get().surveyors;
  //   // console.log('removeSurveyor', { surveyorId });
  //   const remainingSurveyors = surveyors.filter((t) => t.surveyorId === surveyorId);
  //   set({ surveyors: remainingSurveyors });
  // },
  // updateSurveyorData: ({ type, newValue }) => {
  //   const surveyors = get().surveyors;
  //   const activeSurveyor = get().activeSurveyor;

  //   // 👇 safety first
  //   const surveyorsCopy = [...surveyors];
  //   const existingSurveyor = surveyorsCopy.findIndex(
  //     (surveyor) => surveyor.surveyorId === activeSurveyor
  //   );
  //   if (existingSurveyor !== -1) {
  //     surveyorsCopy[existingSurveyor] = {
  //       ...surveyorsCopy[existingSurveyor],
  //       [type]: newValue,
  //     };
  //     set({ surveyors: surveyorsCopy });
  //   } else {
  //     console.log("Surveyor doesn't exist ☠️");
  //   }
  // },
  // editors: [],
  // addEditor: ({ editor, name }) => {
  //   const editors = get().editors;
  //   const existingEditor = editors.find((e) => e.name === name);
  //   if (!existingEditor) {
  //     set({ editors: [...editors, { editor, name }] });
  //   }
  // },
  // swapSurveyor: ({ surveyorId }) => {
  //   const editors = get().editors;
  //   const surveyors = get().surveyors;

  //   const surveyor = surveyors.find((t) => t.surveyorId === surveyorId);

  //   console.log('running swapSurveyor', { editors, surveyor });
  //   if (surveyor) {
  //     // TODO: there's probably a better way to do this 👇
  //     const operationsEditor = editors.find((e) => e.name === 'operation');
  //     const variablesEditor = editors.find((e) => e.name === 'variables');
  //     const resultsEditor = editors.find((e) => e.name === 'results');
  //     operationsEditor?.editor.setModel(surveyor.operationModel);
  //     variablesEditor?.editor.setModel(surveyor.variablesModel);
  //     resultsEditor?.editor.setModel(surveyor.resultsModel);
  //   }
  // },
  variables: [],
  addVariable: ({ easyVar }) => {
    const variables = get().variables;
    const existingEasyVar = variables.find(
      (v) => v.variableName === easyVar.variableName
    );
    // console.log('addVariable', easyVar);
    if (!existingEasyVar) {
      // doesn't exist, let's add it
      const unwrappedInputType = unwrapInputType({ inputType: easyVar.variableType });
      if (isEnumType(unwrappedInputType)) {
        const defaultValue = unwrappedInputType.getValues()[0].value;
        easyVar.variableValue = defaultValue;
        set({ variables: [...variables, easyVar] });
      } else if (unwrappedInputType.name === 'Boolean') {
        easyVar.variableValue = 'true';
        set({ variables: [...variables, easyVar] });
      } else {
        set({ variables: [...variables, easyVar] });
      }
    }
  },
  updateVariable: ({ variableName, variableValue }) => {
    const variables = get().variables;
    const newVariables = variables.map((v) =>
      v.variableName === variableName ? { ...v, variableValue } : v
    );
    // console.log('updateVariable', {
    //   variableName,
    //   variableValue,
    //   existingVariables: variables,
    //   newVariables,
    // });
    set({ variables: newVariables });
  },
  removeVariables: ({ variableNames }) => {
    const variables = get().variables;
    // console.log('removeVariable', { variableNames, variables });

    const remainingVariables = variables.filter(
      (v) => !variableNames.includes(v.variableName)
    );

    set({ variables: remainingVariables });
  },
  // schemaUrl: null,
  // schema: null,
  // initSchema: async ({ url }) => {
  //   // TODO 👇 hacky resets...need to fix
  //   // also, reinitializing here seems to work intermittently...operations editor still gets confused sometime about what schema it's on
  //   // i think this might be solved when tabs are in and we're keep model states globally
  //   set({
  //     schemaUrl: url,
  //     operation: `{}`,
  //     operationDefinition: null,
  //     variables: [],
  //     // results: defaultResults,
  //     // editors: [],
  //   });

  //   if (!url) {
  //     set({ schema: testSchema, schemaUrl: null });
  //     console.log('no URL provided, setting testSchema');
  //     // initializeMode({
  //     //   schemas: [
  //     //     {
  //     //       schema: testSchema,
  //     //       uri: `testSchema-schema.graphql`,
  //     //     },
  //     //   ],
  //     // });
  //   } else {
  //     console.log('initializing schema:', { url });

  //     const result = await fetcher({ url })({
  //       query: getIntrospectionQuery(),
  //       operationName: 'IntrospectionQuery',
  //     });

  //     const schema = buildClientSchema(result.data as unknown as IntrospectionQuery);
  //     set({ schema });
  //     // initializeMode({
  //     //   schemas: [
  //     //     {
  //     //       schema,
  //     //       uri: `${cuid.slug()}-schema.graphql`,
  //     //     },
  //     //   ],
  //     // });
  //   }
  // },
  operation: `{}`,
  setOperation: ({ value }) => {
    set({ operation: value });

    const parsedQuery = parseQuery(value);
    // console.log('running setOperation:', { parsedQuery, value });

    if (!(parsedQuery instanceof Error)) {
      const setOperationDefinition = get().setOperationDefinition;
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
      setOperationDefinition({ operationDefinition: operationDefinition() });
    }
  },
  operationDefinition: null,
  setOperationDefinition: ({ operationDefinition }) => {
    // console.log('running setOperationDefinition:', {
    //   operationDefinition,
    // });
    set({ operationDefinition });
  },
  // executeOperation: async () => {
  //   const operation = get().operation;
  //   const operationDefinition = get().operationDefinition;
  //   const variables = get().variables;
  //   const schemaUrl = get().schemaUrl;
  //   const updateSurveyorData = get().updateSurveyorData;

  //   if (schemaUrl) {
  //     const result = await fetcher({ url: schemaUrl })({
  //       operationName: operationDefinition?.name?.value || '',
  //       query: operation,
  //       variables: variables ? parseEasyVars({ easyVars: variables }) : undefined,
  //     });

  //     console.log('running executeOperation', {
  //       operationName: operationDefinition?.name?.value || '',
  //       query: operation,
  //       variables: variables ? parseEasyVars({ easyVars: variables }) : undefined,
  //       result,
  //     });

  //     updateSurveyorData({
  //       type: 'results',
  //       newValue: JSON.stringify(result, null, 2),
  //     });
  //   } else {
  //     alert(
  //       `Schucks...you're trying to run an operation on the test schema, but it's not backed by a server. Try clicking the GraphQL icon in the sidebar to explore publicly available schemas.`
  //     );
  //   }
  // },
  // operationAction: () => ({
  //   id: 'graphql-run',
  //   label: 'Run Operation',
  //   contextMenuOrder: 0,
  //   contextMenuGroupId: 'graphql',
  //   keybindings: [KeyMod.CtrlCmd | KeyCode.Enter],
  //   run: get().executeOperation,
  // }),
  onEditDefinition: ({
    nextDefinition,
  }: {
    nextDefinition: OperationDefinitionNode | null;
  }) => {
    const setOperation = get().setOperation;
    // const setVariables = useVariables.getState().setVariables;

    if (nextDefinition) {
      setOperation({
        value: print({
          kind: Kind.DOCUMENT,
          definitions: [nextDefinition],
        }),
      });
      set;
    } else {
      setOperation({ value: '' });
      // setVariables({ value: '' });
    }
  },
}));
