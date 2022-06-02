import create from 'zustand';
import { editor } from 'monaco-editor';
import { createGraphiQLFetcher, Fetcher } from '@graphiql/toolkit';

import { buildClientSchema, getIntrospectionQuery, GraphQLSchema } from 'graphql';

import type { IntrospectionQuery } from 'graphql';

/** constants */
import { AvailableEditors, defaultOperation } from '@/constants';

/** hooks */
import { useOperation } from '@/hooks';

/** test schema */
// import testSchema from './schema.js';

export type GraphiQLStore = {
  schema: GraphQLSchema | null;
  fetcher: Fetcher | null;
  initSchema: ({ url }: { url: string }) => Promise<void>;
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
  initSchema: async ({ url }) => {
    // console.log('initializing schema');
    const fetcher = createGraphiQLFetcher({ url });
    set({
      fetcher,
    });
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
}));
