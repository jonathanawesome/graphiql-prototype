import create from 'zustand';

// import {
//   ExecutableDefinitionNode,
//   isEnumType,
//   isExecutableDefinitionNode,
//   Kind,
//   OperationDefinitionNode,
//   print,
// } from 'graphql';

/** types */
import { GraphiQLStore } from './types';

/** utils */
// import { parseQuery } from '../../utils';

export const useGraphiQL = create<GraphiQLStore>((set, get) => ({
  schema: null,
  setSchema: ({ schema }) => {
    set({ schema });
  },
  // onEditDefinition: ({
  //   nextDefinition,
  // }: {
  //   nextDefinition: OperationDefinitionNode | null;
  // }) => {
  //   const setOperation = get().setOperation;
  //   // const setVariables = useVariables.getState().setVariables;

  //   if (nextDefinition) {
  //     setOperation({
  //       value: print({
  //         kind: Kind.DOCUMENT,
  //         definitions: [nextDefinition],
  //       }),
  //     });
  //     // set;
  //   } else {
  //     setOperation({ value: '' });
  //     // setVariables({ value: '' });
  //   }
  // },
  // variables: [],
  // addVariable: ({ easyVar }) => {
  //   const variables = get().variables;
  //   const existingEasyVar = variables.find(
  //     (v) => v.variableName === easyVar.variableName
  //   );
  //   // console.log('addVariable', easyVar);
  //   if (!existingEasyVar) {
  //     // doesn't exist, let's add it
  //     const unwrappedInputType = unwrapInputType({ inputType: easyVar.variableType });
  //     if (isEnumType(unwrappedInputType)) {
  //       const defaultValue = unwrappedInputType.getValues()[0].value;
  //       easyVar.variableValue = defaultValue;
  //       set({ variables: [...variables, easyVar] });
  //     } else if (unwrappedInputType.name === 'Boolean') {
  //       easyVar.variableValue = 'true';
  //       set({ variables: [...variables, easyVar] });
  //     } else {
  //       set({ variables: [...variables, easyVar] });
  //     }
  //   }
  // },
  // updateVariable: ({ variableName, variableValue }) => {
  //   const variables = get().variables;
  //   const newVariables = variables.map((v) =>
  //     v.variableName === variableName ? { ...v, variableValue } : v
  //   );
  //   // console.log('updateVariable', {
  //   //   variableName,
  //   //   variableValue,
  //   //   existingVariables: variables,
  //   //   newVariables,
  //   // });
  //   set({ variables: newVariables });
  // },
  // removeVariables: ({ variableNames }) => {
  //   const variables = get().variables;
  //   // console.log('removeVariable', { variableNames, variables });

  //   const remainingVariables = variables.filter(
  //     (v) => !variableNames.includes(v.variableName)
  //   );

  //   set({ variables: remainingVariables });
  // },

  // operation: `{}`,
  // setOperation: ({ value }) => {
  //   set({ operation: value });

  //   const parsedQuery = parseQuery(value);
  //   // console.log('running setOperation:', { parsedQuery, value });

  //   if (!(parsedQuery instanceof Error)) {
  //     const setOperationDefinition = get().setOperationDefinition;
  //     const operationDefinition = (): ExecutableDefinitionNode | null => {
  //       const firstDefinition = parsedQuery?.definitions[0];

  //       if (!firstDefinition) {
  //         return null;
  //       }

  //       if (isExecutableDefinitionNode(firstDefinition)) {
  //         return firstDefinition;
  //       }

  //       return null;
  //     };
  //     setOperationDefinition({ operationDefinition: operationDefinition() });
  //   }
  // },
  // operationDefinition: null,
  // setOperationDefinition: ({ operationDefinition }) => {
  //   // console.log('running setOperationDefinition:', {
  //   //   operationDefinition,
  //   // });
  //   set({ operationDefinition });
  // },
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
}));
