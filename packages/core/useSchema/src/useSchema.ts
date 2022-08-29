import create from 'zustand';
import { KeyCode, KeyMod } from 'monaco-editor';
import * as JSONC from 'jsonc-parser';
import { buildClientSchema, getIntrospectionQuery, IntrospectionQuery } from 'graphql';

// hooks
import { useGlobalHTTPHeaders } from '@graphiql-prototype/use-global-http-headers';
import { useTestSchema } from '@graphiql-prototype/use-test-schema';
import { useEditor } from '@graphiql-prototype/use-editor';

// types
import { GraphiQLSchemaStore } from './types';

// utils
import { fetcher } from '@graphiql-prototype/utils';

const testSchema = useTestSchema.getState().schema;

export const useSchema = create<GraphiQLSchemaStore>((set, get) => ({
  executeOperation: async () => {
    const updateModel = useEditor.getState().updateModel;
    const activeTab = useEditor.getState().getActiveTab();
    const schemaUrl = get().schemaUrl;

    if (schemaUrl && activeTab) {
      const operationsModelValue = activeTab.operationsModel.getValue();
      const variablesModelValue = activeTab.variablesModel.getValue();
      const headersModelValue = activeTab.headersModel.getValue();

      const tabHeaders = JSONC.parse(headersModelValue);
      const globalHeaders = useGlobalHTTPHeaders.getState().globalHeaders.reduce(
        (a, globalHeader) => ({
          ...a,
          [globalHeader.header.name]: globalHeader.header.value,
        }),
        {}
      );

      try {
        const result = await fetcher({
          headers: { ...tabHeaders, ...globalHeaders },
          url: schemaUrl,
        })({
          operationName: activeTab.operationDefinition?.name?.value || undefined,
          query: operationsModelValue,
          variables: variablesModelValue ? JSONC.parse(variablesModelValue) : undefined,
        });

        // console.log('running executeOperation', {
        //   operationName: activeTab.operationDefinition?.name?.value,
        //   query: operationsModelValue,
        //   variables: variablesModelValue ? JSONC.parse(variablesModelValue) : undefined,
        //   result,
        // });

        updateModel({
          modelType: 'resultsModel',
          newValue: JSON.stringify(result, null, 2),
        });
      } catch (error) {
        updateModel({
          modelType: 'resultsModel',
          newValue: JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
        });
      }
    } else {
      alert(
        `Schucks...you're trying to run an operation on the test schema, but it's not backed by a server. Try the 🔀 icon in the sidebar to explore other schemas.`
      );
    }
  },
  schema: testSchema,
  schemaLoading: true,
  schemaName: null,
  schemaUrl: null,
  initSchema: async ({ url }) => {
    set({ schemaLoading: true });
    const monacoGraphQLAPI = useEditor.getState().monacoGraphQLAPI;
    const resetEditorTabs = useEditor.getState().resetEditorTabs;

    resetEditorTabs();

    if (!url) {
      console.log('no URL provided, setting testSchema');

      monacoGraphQLAPI.setSchemaConfig([
        {
          schema: testSchema,
          uri: `testSchema-schema.graphql`,
        },
      ]);
      return set({
        schema: testSchema,
        schemaLoading: false,
        schemaUrl: null,
      });
    } else {
      console.log('initializing schema:', { url });
      const globalHeaders = useGlobalHTTPHeaders.getState().globalHeaders;
      try {
        const result = await fetcher({
          headers: globalHeaders.reduce(
            (a, globalHeader) => ({
              ...a,
              [globalHeader.header.name]: globalHeader.header.value,
            }),
            {}
          ),
          url,
        })({
          query: getIntrospectionQuery(),
          operationName: 'IntrospectionQuery',
        });

        const schema = buildClientSchema(result.data as unknown as IntrospectionQuery);

        set({
          schema,
          schemaLoading: false,
          schemaUrl: url,
        });

        return monacoGraphQLAPI.setSchemaConfig([
          {
            schema,
            uri: `${url}-schema.graphql`,
          },
        ]);
      } catch (error) {
        return set({
          schema: { error },
          schemaLoading: false,
          schemaUrl: null,
        });
      }
    }
  },
  runOperationAction: () => ({
    id: 'graphql-run-operation',
    label: 'Run Operation',
    contextMenuOrder: 0,
    contextMenuGroupId: 'graphql',
    keybindings: [KeyMod.CtrlCmd | KeyCode.Enter],
    run: get().executeOperation,
  }),
}));
