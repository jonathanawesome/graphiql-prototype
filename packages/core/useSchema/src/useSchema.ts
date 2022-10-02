import create from 'zustand';
import { KeyCode, KeyMod } from 'monaco-editor';
import * as JSONC from 'jsonc-parser';
import { buildClientSchema, getIntrospectionQuery, IntrospectionQuery } from 'graphql';

// hooks
import { useEditor } from '@graphiql-prototype/use-editor';
import { useHTTPHeaders } from '@graphiql-prototype/use-http-headers';
import { useTestSchema } from '@graphiql-prototype/use-test-schema';

// types
import { GraphiQLSchemaStore } from './types';

// utils
import { fetcher } from '@graphiql-prototype/utils';

const testSchema = useTestSchema.getState().schema;

const testSchemaUrl = 'GraphiQL Test Schema';

export const useSchema = create<GraphiQLSchemaStore>((set, get) => ({
  isExecuting: false,
  executeOperation: async () => {
    const updateModel = useEditor.getState().updateModel;
    const activeTab = useEditor.getState().getActiveTab();
    const schemaUrl = get().schemaUrl;

    // console.log('running executeOperation', {
    //   // operationName: activeTab.operationDefinition?.name?.value,
    //   // variables: variablesModelValue ? JSONC.parse(variablesModelValue) : undefined,
    //   // result,
    // });

    set({ isExecuting: true });

    if (schemaUrl && activeTab) {
      const operationsModelValue = activeTab.operationsModel.getValue();
      const variablesModelValue = activeTab.variablesModel.getValue();

      const tabHeaders = activeTab.headers.reduce(
        (acc, header) => header.enabled && { ...acc, [header.key]: header.value },
        {}
      );

      const globalHeaders = useHTTPHeaders
        .getState()
        .globalHeaders.reduce(
          (acc, globalHeader) =>
            globalHeader.enabled && { ...acc, [globalHeader.key]: globalHeader.value },
          {}
        );

      if (schemaUrl === testSchemaUrl) {
        return updateModel({
          modelType: 'resultsModel',
          newValue: JSON.stringify(
            {
              test_schema: `Hey there, looks like you're viewing the test schema. This schema is not backed by a server...you should try one of the publicly available schemas.`,
            },
            null,
            2
          ),
        });
      }

      try {
        const result = await fetcher({
          headers: {
            ...tabHeaders,
            ...globalHeaders,
          },
          url: schemaUrl,
        })({
          operationName: activeTab.operationDefinition?.name?.value || undefined,
          query: operationsModelValue,
          variables: variablesModelValue ? JSONC.parse(variablesModelValue) : undefined,
        });

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
    }
    return set({ isExecuting: false });
  },
  schema: testSchema,
  schemaLoading: true,
  schemaName: null,
  schemaUrl: null,
  loadSchema: async ({ init, url }) => {
    set({ schemaLoading: true, schemaUrl: url });
    const monacoGraphQLAPI = useEditor.getState().monacoGraphQLAPI;
    const resetEditorTabs = useEditor.getState().resetEditorTabs;

    init && resetEditorTabs();

    if (url === testSchemaUrl) {
      // console.log('no URL provided, setting testSchema');

      monacoGraphQLAPI.setSchemaConfig([
        {
          schema: testSchema,
          uri: `testSchema-schema.graphql`,
        },
      ]);
      return set({
        schema: testSchema,
        schemaLoading: false,
        schemaUrl: testSchemaUrl,
      });
    } else {
      const globalHeaders = useHTTPHeaders
        .getState()
        .globalHeaders.reduce(
          (acc, globalHeader) =>
            globalHeader.enabled && { ...acc, [globalHeader.key]: globalHeader.value },
          {}
        );

      try {
        const result = await fetcher({
          headers: globalHeaders,
          url,
        })({
          query: getIntrospectionQuery({
            // specifiedByUrl: true,
          }),
          operationName: 'IntrospectionQuery',
        });

        const schema = buildClientSchema(result.data as unknown as IntrospectionQuery);

        set({
          schema,
          schemaLoading: false,
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
