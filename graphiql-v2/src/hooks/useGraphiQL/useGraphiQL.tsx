import create from 'zustand';
import { KeyCode, KeyMod } from 'monaco-editor';
import * as JSONC from 'jsonc-parser';

import {
  buildClientSchema,
  ExecutableDefinitionNode,
  getIntrospectionQuery,
  IntrospectionQuery,
  isExecutableDefinitionNode,
  Kind,
  OperationDefinitionNode,
  print,
} from 'graphql';

/** constants */
import { defaultOperation, defaultResults, defaultVariables } from '../../constants';

/** types */
import { GraphiQLStore } from './types';

/** utils */
import { fetcher, parseQuery } from '../../utils';

/** test schema */
import testSchema from './testSchema.js';

export const useGraphiQL = create<GraphiQLStore>((set, get) => ({
  results: defaultResults,
  setResults: ({ value }) => {
    set({ results: value });
  },
  variables: defaultVariables,
  setVariables: ({ value }) => {
    console.log('setVariables', value);
    set({ variables: value });
  },
  editors: [],
  setEditors: ({ editor, uri }) => {
    const editors = get().editors;
    const existingEditor = editors.find((e) => e.uri === uri);
    if (!existingEditor) {
      set({ editors: [...editors, { editor, uri }] });
    }
  },
  schemaUrl: null,
  schema: null,
  initSchema: async ({ url }) => {
    //TODO clear editors/models
    if (!url) {
      set({ schema: testSchema });
      console.log('no URL provided, setting testSchema');
    } else {
      console.log('initializing schema:', { url });

      const result = await fetcher({ url })({
        query: getIntrospectionQuery(),
        operationName: 'IntrospectionQuery',
      });

      // TODO 👇 hacky resets...need to fix
      set({
        schemaUrl: url,
        schema: buildClientSchema(result.data as unknown as IntrospectionQuery),
        operation: defaultOperation,
        operationDefinition: null,
        variables: null,
        results: defaultResults,
        editors: [],
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

    if (schemaUrl) {
      const result = await fetcher({ url: schemaUrl })({
        operationName: operationDefinition?.name?.value || '',
        query: operation,
        variables: variables ? JSONC.parse(variables) : undefined,
      });

      setResults({ value: JSON.stringify(result.data, null, 2) });
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
      // console.log('setting operation:', { nextDefinition });

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
