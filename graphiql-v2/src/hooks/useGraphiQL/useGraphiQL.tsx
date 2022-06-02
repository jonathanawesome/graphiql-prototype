import create from 'zustand';
import { KeyCode, KeyMod } from 'monaco-editor';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
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
import { parseQuery } from '../../utils';

/** test schema */
// import testSchema from './testSchema.js';

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
  fetcher: null,
  editors: [],
  setEditors: ({ editor, uri }) => {
    const editors = get().editors;
    const existingEditor = editors.find((e) => e.uri === uri);
    if (!existingEditor) {
      set({ editors: [...editors, { editor, uri }] });
    }
  },
  // schema: testSchema,
  schema: null,
  createFetcher: async ({ url }) => {
    // console.log('initializing schema');
    const fetcher = createGraphiQLFetcher({ url });
    set({
      fetcher,
    });
    const result = await fetcher({
      query: getIntrospectionQuery(),
      operationName: 'IntrospectionQuery',
    });
    console.log('running createFetcher:', { result });

    if (!('data' in result)) {
      throw Error('this demo does not support subscriptions or http multipart yet');
    }

    const setOperation = get().setOperation;
    set({ schema: buildClientSchema(result.data as unknown as IntrospectionQuery) });
    setOperation({ value: defaultOperation });
  },
  operation: defaultOperation,
  setOperation: ({ value }) => {
    // console.log('running setOperation:', { value });
    set({ operation: value });

    const parsedQuery = parseQuery(value);

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
  executeOperation: async () => {
    const operation = get().operation;
    const operationDefinition = get().operationDefinition;
    const setResults = get().setResults;
    const variables = get().variables;
    const fetcher = get().fetcher;

    if (fetcher) {
      const result = await fetcher({
        operationName: operationDefinition?.name?.value || '',
        query: operation,
        variables: JSONC.parse(variables),
      });

      // TODO: this demo only supports a single iteration for http GET/POST,
      // no multipart or subscriptions yet.
      //@ts-expect-error FIXME
      const data = await result.next();

      setResults({ value: JSON.stringify(data.value, null, 2) });
    } else {
      console.log(`cannot execute operation...fetcher is null`);
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
