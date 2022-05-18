import create from 'zustand';
import { editor, KeyCode, KeyMod } from 'monaco-editor';
import * as JSONC from 'jsonc-parser';

import {
  buildClientSchema,
  getIntrospectionQuery,
  isExecutableDefinitionNode,
  GraphQLSchema,
  OperationDefinitionNode,
  print,
  Kind,
  VariableDefinitionNode,
  NamedTypeNode,
} from 'graphql';

import type { ExecutableDefinitionNode, IntrospectionQuery } from 'graphql';

/** constants */
import {
  AvailableEditors,
  defaultOperation,
  defaultResults,
  defaultVariables,
} from '@/constants';

/** utils */
import { fetcher, parseQuery } from '@/utils';

export type GraphiQLStore = {
  schema: GraphQLSchema | null;
  initSchema: () => Promise<void>;
  operation: string;
  setOperation: ({ value }: { value: string }) => void;
  variables: string;
  setVariables: ({ value }: { value: string }) => void;
  operationDefinition: ExecutableDefinitionNode | null;
  setOperationDefinition: ({
    operationDefinition,
  }: {
    operationDefinition: ExecutableDefinitionNode | null;
  }) => void;
  results: string;
  setResults: ({ value }: { value: string }) => void;
  executeOperation: () => Promise<void>;
  operationAction: () => editor.IActionDescriptor;
  onEditDefinition: ({
    nextDefinition,
  }: {
    nextDefinition: OperationDefinitionNode | null;
  }) => void;
  editors: Array<{ editor: editor.IStandaloneCodeEditor; uri: AvailableEditors }>;
  setEditors: ({
    editor,
    uri,
  }: {
    editor: editor.IStandaloneCodeEditor;
    uri: AvailableEditors;
  }) => void;
};

export const useGraphiQL = create<GraphiQLStore>((set, get) => ({
  editors: [],
  setEditors: ({ editor, uri }) => {
    const editors = get().editors;
    const existingEditor = editors.find((e) => e.uri === uri);
    if (!existingEditor) {
      set({ editors: [...editors, { editor, uri }] });
    }
  },
  schema: null,
  initSchema: async () => {
    // console.log('initializing schema');
    const result = await fetcher({
      query: getIntrospectionQuery(),
      operationName: 'IntrospectionQuery',
    });

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
      // console.log('running setOperationDefinition:', { operationDefinition: operationDefinition() });
      setOperationDefinition({ operationDefinition: operationDefinition() });
    }
  },
  variables: defaultVariables,
  setVariables: ({ value }) => {
    set({ variables: value });
  },
  operationDefinition: null,
  setOperationDefinition: ({ operationDefinition }) => {
    set({ operationDefinition });
  },
  results: defaultResults,
  setResults: ({ value }) => {
    set({ results: value });
  },
  executeOperation: async () => {
    const operation = get().operation;
    const operationDefinition = get().operationDefinition;
    const variables = get().variables;

    const result = await fetcher({
      operationName: operationDefinition?.name?.value || '',
      query: operation,
      variables: JSON.stringify(JSONC.parse(variables)),
    });

    // TODO: this demo only supports a single iteration for http GET/POST,
    // no multipart or subscriptions yet.
    //@ts-expect-error FIXME
    const data = await result.next();

    set({ results: JSON.stringify(data.value, null, 2) });
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
    const setVariables = get().setVariables;

    if (nextDefinition) {
      if (nextDefinition.variableDefinitions) {
        //TODO: LOADS of work to do here, but it's working
        // console.log({ variableDefinitions: nextDefinition.variableDefinitions });

        const vars = nextDefinition.variableDefinitions.reduce(
          (accumulator: Record<string, string>, v: VariableDefinitionNode) => {
            return {
              ...accumulator,
              [v.variable.name.value]: (v.type as NamedTypeNode).name.value,
            };
          },
          {}
        );

        setVariables({
          value: JSON.stringify(vars, null, 2),
        });
      }
      setOperation({
        value: print({
          kind: Kind.DOCUMENT,
          definitions: [nextDefinition],
        }),
      });
    } else {
      setOperation({ value: '' });
      setVariables({ value: '' });
    }
  },
}));
