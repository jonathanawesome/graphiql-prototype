import create from 'zustand';
import { KeyCode, KeyMod } from 'monaco-editor';
import * as JSONC from 'jsonc-parser';
import {
  buildClientSchema,
  getIntrospectionQuery,
  IntrospectionQuery,
  OperationDefinitionNode,
} from 'graphql';

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

const RESULTS_EDITOR_POSITION = { column: 0, lineNumber: 0 };

export const useSchema = create<GraphiQLSchemaStore>((set, get) => ({
  isExecuting: false,
  executeOperation: async () => {
    const pushEdit = useEditor.getState().pushEdit;
    const activeTab = useEditor.getState().getActiveTab();
    const activeDefinition = useEditor.getState().activeDefinition;
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
        return pushEdit({
          edits: [
            {
              range: 'FULL_MODEL_RANGE',
              text: JSON.stringify(
                {
                  test_schema: `Hey there, looks like you're viewing the test schema. This schema is not backed by a server...you should try one of the publicly available schemas.`,
                },
                null,
                2
              ),
            },
          ],
          position: RESULTS_EDITOR_POSITION,
          targetEditor: 'results',
        });
      }

      try {
        console.log('executing operation:', {
          name: (activeDefinition as OperationDefinitionNode).name?.value,
        });
        const result = await fetcher({
          headers: {
            ...globalHeaders,
            ...tabHeaders,
          },
          params: {
            operationName:
              (activeDefinition as OperationDefinitionNode).name?.value || undefined,
            query: operationsModelValue,
            variables: variablesModelValue ? JSONC.parse(variablesModelValue) : undefined,
          },
          url: schemaUrl,
        });

        pushEdit({
          edits: [
            {
              range: 'FULL_MODEL_RANGE',
              text: JSON.stringify(result, null, 2),
            },
          ],
          position: RESULTS_EDITOR_POSITION,
          targetEditor: 'results',
        });
      } catch (error) {
        pushEdit({
          edits: [
            {
              range: 'FULL_MODEL_RANGE',
              text: JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
            },
          ],
          position: RESULTS_EDITOR_POSITION,
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
    const resetEditorTabs = useEditor.getState().resetEditorTabs;
    const resetDocumentState = useEditor.getState().resetDocumentState;
    const initMonacoGraphQLAPI = useEditor.getState().initMonacoGraphQLAPI;

    if (!useEditor.getState().monacoGraphQLAPI) {
      initMonacoGraphQLAPI();
    }

    const monacoGraphQLAPI = useEditor.getState().monacoGraphQLAPI;

    init && resetEditorTabs();
    init && resetDocumentState();

    if (url === testSchemaUrl) {
      // console.log('no URL provided, setting testSchema');
      monacoGraphQLAPI?.setSchemaConfig([
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
          params: {
            query: getIntrospectionQuery({
              // TODO: revisit passing options here. would love to get schemaDescription for use in documentation, but introspection query fails
              // specifiedByUrl: true,
              // schemaDescription: true,
            }),
            operationName: 'IntrospectionQuery',
          },
          url,
        });
        console.log('result', { result });
        const schema = buildClientSchema(result.data as unknown as IntrospectionQuery);

        set({
          schema,
          schemaLoading: false,
        });

        return monacoGraphQLAPI?.setSchemaConfig([
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
