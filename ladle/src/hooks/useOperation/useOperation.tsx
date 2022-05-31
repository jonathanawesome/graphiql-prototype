import create from 'zustand';
import { editor, KeyCode, KeyMod } from 'monaco-editor';
import * as JSONC from 'jsonc-parser';

import {
  isExecutableDefinitionNode,
  OperationDefinitionNode,
  print,
  Kind,
  // VariableDefinitionNode,
  // TypeNode,
  // NamedTypeNode,
  // ListTypeNode,
  // NonNullTypeNode,
} from 'graphql';

import type { ExecutableDefinitionNode } from 'graphql';

/** constants */
import { defaultOperation } from '@/constants';

/** hooks */
import { useResults, useVariables } from '@/hooks';

/** utils */
import { fetcher, parseQuery } from '@/utils';

export type OperationStore = {
  operation: string;
  setOperation: ({ value }: { value: string }) => void;
  operationDefinition: ExecutableDefinitionNode | null;
  setOperationDefinition: ({
    operationDefinition,
  }: {
    operationDefinition: ExecutableDefinitionNode | null;
  }) => void;
  executeOperation: () => Promise<void>;
  operationAction: () => editor.IActionDescriptor;
  onEditDefinition: ({
    nextDefinition,
  }: {
    nextDefinition: OperationDefinitionNode | null;
  }) => void;
};

export const useOperation = create<OperationStore>((set, get) => ({
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
    const variables = useVariables.getState().variables;
    const setResults = useResults.getState().setResults;

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
    // const setOperationDefinition = get().setOperationDefinition;
    const setOperation = get().setOperation;
    // const operationDefinition = get().operationDefinition;
    const setVariables = useVariables.getState().setVariables;

    if (nextDefinition) {
      console.log("let's set this operation:", { nextDefinition });

      // onEditVariables(
      //   JSON.stringify(
      //     getArgumentsVariableExample(input.payloads.args),
      //     null,
      //     2
      //   )
      // );

      setOperation({
        value: print({
          kind: Kind.DOCUMENT,
          definitions: [nextDefinition],
        }),
      });
      set;
    } else {
      setOperation({ value: '' });
      setVariables({ value: '' });
    }
  },
}));
