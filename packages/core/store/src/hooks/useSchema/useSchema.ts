import create from 'zustand';
import { KeyCode, KeyMod } from 'monaco-editor';
import * as JSONC from 'jsonc-parser';
import { buildClientSchema, getIntrospectionQuery, IntrospectionQuery } from 'graphql';

// hooks
import { useEditor } from '../useEditor';
import { useHTTPHeaders } from '../useHTTPHeaders';
import { useTestSchema } from '../useTestSchema';

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
        set({ isExecuting: false });
        return updateModel({
          edits: [
            {
              text: JSON.stringify(
                {
                  test_schema: `Hey there, looks like you're viewing the test schema. This schema is not backed by a server...you should try one of the publicly available schemas.`,
                },
                null,
                2
              ),
            },
          ],
          targetEditor: 'results',
        });
      }

      try {
        const result = await fetcher({
          headers: {
            ...globalHeaders,
            ...tabHeaders,
          },
          url: schemaUrl,
        })({
          operationName: activeTab.operationDefinition?.name?.value || undefined,
          query: operationsModelValue,
          variables: variablesModelValue ? JSONC.parse(variablesModelValue) : undefined,
        });

        updateModel({
          edits: [
            {
              text: JSON.stringify(result, null, 2),
            },
          ],
          targetEditor: 'results',
        });
      } catch (error) {
        updateModel({
          edits: [
            {
              text: JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
            },
          ],
          targetEditor: 'results',
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
            // TODO: revisit passing options here. would love to get schemaDescription for use in documentation, but introspection query fails
            // specifiedByUrl: true,
            // schemaDescription: true,
          }),
          operationName: 'IntrospectionQuery',
        });
        console.log('data', { res: result.data });
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
