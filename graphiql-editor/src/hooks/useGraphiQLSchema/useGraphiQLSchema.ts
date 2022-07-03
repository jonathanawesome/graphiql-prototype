import create from 'zustand';
import { KeyCode, KeyMod } from 'monaco-editor';
import * as JSONC from 'jsonc-parser';
import { buildClientSchema, getIntrospectionQuery, IntrospectionQuery } from 'graphql';

// hooks
import { useGraphiQLGlobalHeaders } from '../useGraphiQLGlobalHeaders';
import { useGraphiQLEditor } from '../useGraphiQLEditor';
import { useTestSchema } from '@graphiql-v2-prototype/graphiql-test-schema';

// types
import { GraphiQLSchemaStore } from './types';

// utils
import { fetcher, getActiveEditorTab } from '../../utils';

const testSchema = useTestSchema.getState().schema;

export const useGraphiQLSchema = create<GraphiQLSchemaStore>((set, get) => ({
  executeOperation: async () => {
    const activeEditor = getActiveEditorTab();
    const updateModel = useGraphiQLEditor.getState().updateModel;
    const schemaUrl = get().schemaUrl;

    if (schemaUrl && activeEditor) {
      const operationModelValue = activeEditor.operationModel.getValue();
      const variablesModelValue = activeEditor.variablesModel.getValue();
      const headersModelValue = activeEditor.headersModel.getValue();

      const tabHeaders = JSONC.parse(headersModelValue);
      const globalHeaders = useGraphiQLGlobalHeaders.getState().globalHeaders.reduce(
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
          operationName: activeEditor.operationDefinition?.name?.value || '',
          query: operationModelValue,
          variables: variablesModelValue ? JSONC.parse(variablesModelValue) : undefined,
        });

        // console.log('running executeOperation', {
        //   operationName: activeEditor.operationDefinition?.name?.value || '',
        //   query: operationModelValue,
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
  schema: null,
  schemaLoading: true,
  schemaName: null,
  schemaUrl: null,
  initSchema: async ({ name, url }) => {
    set({ schemaLoading: true });
    const monacoGraphQLAPI = useGraphiQLEditor.getState().monacoGraphQLAPI;
    const resetEditorTabs = useGraphiQLEditor.getState().resetEditorTabs;

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
        schemaName: 'testSchema',
        schemaUrl: null,
      });
    } else {
      console.log('initializing schema:', { url });
      const globalHeaders = useGraphiQLGlobalHeaders.getState().globalHeaders;
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
          schemaName: name || 'Schema name not provided',
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
          schemaName: 'Error fetching schema',
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
