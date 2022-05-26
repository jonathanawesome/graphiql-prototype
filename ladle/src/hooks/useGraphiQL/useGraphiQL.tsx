import create from 'zustand';
import { editor } from 'monaco-editor';

import { buildClientSchema, getIntrospectionQuery, GraphQLSchema } from 'graphql';

import type { IntrospectionQuery } from 'graphql';

/** constants */
import { AvailableEditors, defaultOperation } from '@/constants';

/** hooks */
import { useOperation } from '@/hooks';

/** utils */
import { fetcher } from '@/utils';

export type GraphiQLStore = {
  schema: GraphQLSchema | null;
  initSchema: () => Promise<void>;
  // operation: string;
  // setOperation: ({ value }: { value: string }) => void;
  // variables: string;
  // setVariables: ({ value }: { value: string }) => void;
  // operationDefinition: ExecutableDefinitionNode | null;
  // setOperationDefinition: ({
  //   operationDefinition,
  // }: {
  //   operationDefinition: ExecutableDefinitionNode | null;
  // }) => void;
  // results: string;
  // setResults: ({ value }: { value: string }) => void;
  // executeOperation: () => Promise<void>;
  // operationAction: () => editor.IActionDescriptor;
  // onEditDefinition: ({
  //   nextDefinition,
  // }: {
  //   nextDefinition: OperationDefinitionNode | null;
  // }) => void;
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
    console.log('running initschema:', { result });

    if (!('data' in result)) {
      throw Error('this demo does not support subscriptions or http multipart yet');
    }

    const setOperation = useOperation.getState().setOperation;
    set({ schema: buildClientSchema(result.data as unknown as IntrospectionQuery) });
    setOperation({ value: defaultOperation });
  },
  // operation: defaultOperation,
  // setOperation: ({ value }) => {
  //   // console.log('running setOperation:', { value });
  //   set({ operation: value });

  //   const parsedQuery = parseQuery(value);

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
  //     // console.log('running setOperationDefinition:', { operationDefinition: operationDefinition() });
  //     setOperationDefinition({ operationDefinition: operationDefinition() });
  //   }
  // },
  // variables: defaultVariables,
  // setVariables: ({ value }) => {
  //   console.log('setVariables', value);
  //   set({ variables: value });
  // },
  // operationDefinition: null,
  // setOperationDefinition: ({ operationDefinition }) => {
  //   set({ operationDefinition });
  // },
  // results: defaultResults,
  // setResults: ({ value }) => {
  //   set({ results: value });
  // },
  // executeOperation: async () => {
  //   const operation = get().operation;
  //   const operationDefinition = get().operationDefinition;
  //   const variables = get().variables;

  //   console.log('operation being submitted', operation);
  //   console.log('variables being submitted', JSON.stringify(JSONC.parse(variables)));

  //   const result = await fetcher({
  //     operationName: operationDefinition?.name?.value || '',
  //     query: operation,
  //     variables: JSON.stringify(JSONC.parse(variables)),
  //   });

  //   // TODO: this demo only supports a single iteration for http GET/POST,
  //   // no multipart or subscriptions yet.
  //   //@ts-expect-error FIXME
  //   const data = await result.next();

  //   set({ results: JSON.stringify(data.value, null, 2) });
  // },
  // operationAction: () => ({
  //   id: 'graphql-run',
  //   label: 'Run Operation',
  //   contextMenuOrder: 0,
  //   contextMenuGroupId: 'graphql',
  //   keybindings: [KeyMod.CtrlCmd | KeyCode.Enter],
  //   run: get().executeOperation,
  // }),
  // onEditDefinition: ({
  //   nextDefinition,
  // }: {
  //   nextDefinition: OperationDefinitionNode | null;
  // }) => {
  //   // const operationDefinition = get().operationDefinition;
  //   const setOperation = get().setOperation;
  //   const setVariables = get().setVariables;

  //   if (nextDefinition) {
  //     console.log({ nextDefinition });

  //     // if (nextDefinition.variableDefinitions) {
  //     //   //TODO: 👇 lots
  //     //   console.log({ variableDefinitions: nextDefinition.variableDefinitions });

  //     //   const vars = nextDefinition.variableDefinitions.reduce(
  //     //     (accumulator: Record<string, string>, v: VariableDefinitionNode) => {
  //     //       console.log({ v });
  //     //       const existingDefinition = operationDefinition?.variableDefinitions?.find(
  //     //         (vD) => vD.variable.name === v.variable.name
  //     //       );
  //     //       if (existingDefinition) {
  //     //         console.log(existingDefinition);
  //     //         return { ...accumulator, ...existingDefinition };
  //     //       } else {
  //     //         return {
  //     //           ...accumulator,
  //     //           [v.variable.name.value]: v.variable.name.value,
  //     //         };
  //     //       }
  //     //     },
  //     //     {}
  //     //   );

  //     //   setVariables({
  //     //     value: JSON.stringify(vars, null, 2),
  //     //   });
  //     // }

  //     setOperation({
  //       value: print({
  //         kind: Kind.DOCUMENT,
  //         definitions: [nextDefinition],
  //       }),
  //     });
  //   } else {
  //     setOperation({ value: '' });
  //     setVariables({ value: '' });
  //   }
  // },
}));
