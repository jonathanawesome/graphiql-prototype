import create from 'zustand';
import { KeyCode, KeyMod } from 'monaco-editor';
// import * as JSONC from 'jsonc-parser';

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
import {
  defaultOperation,
  defaultResults,
  //  defaultVariables
} from '../../constants';

/** types */
import { GraphiQLStore } from './types';

/** utils */
import { fetcher, parseEasyVars, parseQuery } from '../../utils';

/** test schema */
import testSchema from './testSchema.js';
import { unwrapInputType } from '@graphiql-v2-prototype/graphiql-plugin-pane-pathfinder/src/utils';

export const useGraphiQL = create<GraphiQLStore>((set, get) => ({
  results: defaultResults,
  setResults: ({ value }) => {
    set({ results: value });
  },
  variables: [],
  addVariable: ({ easyVar }) => {
    const variables = get().variables;
    const existingEasyVar = variables.find(
      (v) => v.variableName === easyVar.variableName
    );
    console.log('addVariable', easyVar);
    if (!existingEasyVar) {
      // doesn't exist, let's add it
      const unwrappedInputType = unwrapInputType({ inputType: easyVar.variableType });
      if (isEnumType(unwrappedInputType)) {
        const defaultValue = unwrappedInputType.getValues()[0].value;
        // const newVariables = variables.map((v) =>
        //   v.variableName === easyVar.variableName
        //     ? { ...v, variableValue: defaultValue }
        //     : v
        // );
        //set default enum value
        easyVar.variableValue = defaultValue;
        console.log('addVariable enum', { easyVar });
        // set({ variables: newVariables });
        set({ variables: [...variables, easyVar] });
      } else if (unwrappedInputType.name === 'Boolean') {
        //set "true as defualt value"

        // const newVariables = variables.map((v) =>
        //   v.variableName === easyVar.variableName ? { ...v, variableValue: 'true' } : v
        // );
        easyVar.variableValue = true;
        console.log('addVariable boolean', { easyVar });
        // set({ variables: newVariables });
        set({ variables: [...variables, easyVar] });
      } else {
        console.log('addVariable', { easyVar });

        set({ variables: [...variables, easyVar] });
      }
    }
  },
  updateVariable: ({ variableName, variableValue }) => {
    console.log('updateVariable', { variableName, variableValue });
    const variables = get().variables;
    const newVariables = variables.map((v) =>
      v.variableName === variableName ? { ...v, variableValue } : v
    );
    set({ variables: newVariables });
  },
  removeVariables: ({ variableNames }) => {
    const variables = get().variables;
    const remainingVariables = variables.filter((v) =>
      variableNames.includes(v.variableName)
    );
    // const remainingVariables = variables.filter((v) => v.variableName !== variableName);
    console.log('removeVariable', { variableNames, remainingVariables });
    set({ variables: remainingVariables });
  },
  editors: [],
  setEditors: ({ editor, name }) => {
    const editors = get().editors;
    const existingEditor = editors.find((e) => e.name === name);
    if (!existingEditor) {
      set({ editors: [...editors, { editor, name }] });
    }
  },
  schemaUrl: null,
  schema: null,
  initSchema: async ({ url }) => {
    // TODO 👇 hacky resets...need to fix
    set({
      schemaUrl: url,
      operation: defaultOperation,
      operationDefinition: null,
      variables: [],
      results: defaultResults,
      // editors: [],
    });
    if (!url) {
      set({ schema: testSchema, schemaUrl: null });
      console.log('no URL provided, setting testSchema');
    } else {
      console.log('initializing schema:', { url });

      const result = await fetcher({ url })({
        query: getIntrospectionQuery(),
        operationName: 'IntrospectionQuery',
      });

      // TODO 👇 hacky resets...need to fix
      set({
        schema: buildClientSchema(result.data as unknown as IntrospectionQuery),
      });
    }
  },
  operation: defaultOperation,
  setOperation: ({ value }) => {
    set({ operation: value });

    const parsedQuery = parseQuery(value);
    console.log('running setOperation:', { parsedQuery, value });

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
    console.log('running setOperationDefinition:', {
      operationDefinition,
    });
    set({ operationDefinition });
  },
  executeOperation: async () => {
    const operation = get().operation;
    const operationDefinition = get().operationDefinition;
    const setResults = get().setResults;
    const variables = get().variables;
    const schemaUrl = get().schemaUrl;

    console.log('executeOperation', {
      variables: parseEasyVars({ easyVars: variables }),
    });

    if (schemaUrl) {
      const result = await fetcher({ url: schemaUrl })({
        operationName: operationDefinition?.name?.value || '',
        query: operation,
        variables: variables ? parseEasyVars({ easyVars: variables }) : undefined,
        // variables: variables ? JSONC.parse(variables) : undefined,
      });

      setResults({ value: JSON.stringify(result, null, 2) });
    } else {
      alert(`schemaUrl not provided, can't run operations`);
    }
  },
  operationAction: () => ({
    id: 'graphql-run',
    label: 'Run Operation',
    contextMenuOrder: 0,
    contextMenuGroupId: 'graphql',
    keybindings: [KeyMod.CtrlCmd | KeyCode.Enter],
    run: get().executeOperation,
  }),
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
