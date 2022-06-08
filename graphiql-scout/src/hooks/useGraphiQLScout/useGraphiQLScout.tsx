import create from 'zustand';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import * as JSONC from 'jsonc-parser';
// import cuid from 'cuid';

// import { fetcher, useGraphiQL } from '@graphiql-v2-prototype/graphiql-v2';

import { fetcher } from '../../utils';

/** types */
import { GraphiQLScoutStore } from './types';

/** test schema */
import testSchema from './testSchema.js';
import { buildClientSchema, getIntrospectionQuery, IntrospectionQuery } from 'graphql';

// const schemaUrl = useGraphiQL.getState().schemaUrl;

export const useGraphiQLScout = create<GraphiQLScoutStore>((set, get) => ({
  activeScoutId: null,
  setActiveScoutId: ({ scoutId }) => {
    set({ activeScoutId: scoutId });
  },
  scouts: [],
  addScout: ({ scout }) => {
    const scouts = get().scouts;
    const existingScout = scouts.find((t) => t.scoutId === scout.scoutId);
    // console.log('addScout', {scout});
    if (!existingScout) {
      // doesn't exist, let's add it
      set({ scouts: [...scouts, scout] });
    }
  },
  removeScout: ({ scoutId }) => {
    const scouts = get().scouts;
    // console.log('removeScout', { scoutId });
    const remainingScouts = scouts.filter((t) => t.scoutId === scoutId);
    set({ scouts: remainingScouts });
  },
  updateScoutData: ({ type, newValue }) => {
    const scouts = get().scouts;
    const activeScoutId = get().activeScoutId;

    // 👇 safety first
    const scoutsCopy = [...scouts];
    const existingScout = scoutsCopy.findIndex(
      (scout) => scout.scoutId === activeScoutId
    );
    if (existingScout !== -1) {
      scoutsCopy[existingScout] = {
        ...scoutsCopy[existingScout],
        [type]: newValue,
      };
      set({ scouts: scoutsCopy });
      console.log('running updateScoutData', {
        newScoutsData: scoutsCopy,
        type,
        newValue,
        existingScout,
      });
    } else {
      console.log("Scout doesn't exist ☠️");
    }
  },
  editors: [],
  addEditor: ({ editor, name }) => {
    const editors = get().editors;
    const existingEditor = editors.find((e) => e.name === name);
    console.log('running addEditor', { existingEditor, editors, editor, name });
    if (!existingEditor) {
      set({ editors: [...editors, { editor, name }] });
    }
  },
  swapScout: ({ scoutId }) => {
    const editors = get().editors;
    const scouts = get().scouts;

    const scout = scouts.find((t) => t.scoutId === scoutId);

    console.log('running swapScout', { editors, scout });
    if (scout) {
      // TODO: there's probably a better way to do this 👇
      const operationsEditor = editors.find((e) => e.name === 'operation');
      const variablesEditor = editors.find((e) => e.name === 'variables');
      const resultsEditor = editors.find((e) => e.name === 'results');
      operationsEditor?.editor.setModel(scout.operationModel);
      variablesEditor?.editor.setModel(scout.variablesModel);
      resultsEditor?.editor.setModel(scout.resultsModel);
    }
  },
  executeOperation: async () => {
    const updateScoutData = get().updateScoutData;
    const activeScoutId = get().activeScoutId;
    const scouts = get().scouts;
    const schemaUrl = get().schemaUrl;

    // 👇 safety first
    const scoutsCopy = [...scouts];
    const activeScout = scoutsCopy.find((scout) => scout.scoutId === activeScoutId);

    if (schemaUrl && activeScout) {
      const result = await fetcher({ url: schemaUrl })({
        operationName: activeScout.operationDefinition?.name?.value || '',
        query: activeScout.operation,
        variables: activeScout.variables
          ? JSON.stringify(JSONC.parse(activeScout.variables))
          : undefined,
      });

      console.log('running executeOperation', {
        operationName: activeScout.operationDefinition?.name?.value || '',
        query: activeScout.operation,
        variables: activeScout.variables
          ? JSON.stringify(JSONC.parse(activeScout.variables))
          : undefined,
        result,
      });

      updateScoutData({
        type: 'results',
        newValue: JSON.stringify(result, null, 2),
      });
    } else {
      alert(
        `Schucks...you're trying to run an operation on the test schema, but it's not backed by a server. Try clicking the GraphQL icon in the sidebar to explore publicly available schemas.`
      );
    }
  },
  schemaUrl: null,
  schema: null,
  initSchema: async ({ url }) => {
    // TODO 👇 hacky resets...need to fix
    // also, reinitializing here seems to work intermittently...operations editor still gets confused sometime about what schema it's on
    // i think this might be solved when tabs are in and we're keep model states globally
    set({
      schemaUrl: url,
      scouts: [],
      // operation: `{}`,
      // operationDefinition: null,
      // variables: [],
      // results: defaultResults,
      // editors: [],
    });

    if (!url) {
      set({ schema: testSchema, schemaUrl: null });
      console.log('no URL provided, setting testSchema');
      initializeMode({
        schemas: [
          {
            schema: testSchema,
            uri: `testSchema-schema.graphql`,
          },
        ],
      });
    } else {
      console.log('initializing schema:', { url });

      const result = await fetcher({ url })({
        query: getIntrospectionQuery(),
        operationName: 'IntrospectionQuery',
      });

      const schema = buildClientSchema(result.data as unknown as IntrospectionQuery);
      set({ schema });
      initializeMode({
        schemas: [
          {
            schema,
            uri: 'schema.graphql',
          },
        ],
      });
    }
  },
}));
