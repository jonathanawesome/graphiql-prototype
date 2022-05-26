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
}));
