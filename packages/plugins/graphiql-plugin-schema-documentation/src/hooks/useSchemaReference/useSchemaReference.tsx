import create from 'zustand';
import createContext from 'zustand/context';
import cuid from 'cuid';

// types
import type { SchemaReferenceStore } from './types';

const createSchemaReferenceStore = () =>
  create<SchemaReferenceStore>((set, get) => ({
    activePrimaryPane: 'Query',
    setActivePrimaryPane: ({ destinationPane }) => {
      set({ activePrimaryPane: destinationPane });
    },
    activeTertiaryPane: null,
    tertiaryPaneStack: [],
    clearTertiaryPaneStack: () => {
      set({
        activeTertiaryPane: null,
        tertiaryPaneStack: [],
      });
    },
    navigateTertiaryPaneStack: ({ destinationPaneIndex }) => {
      const tertiaryPaneStack = get().tertiaryPaneStack;

      set({
        activeTertiaryPane: tertiaryPaneStack[destinationPaneIndex],
        // remove all panes after the destinationPaneIndex from our nav stack
        tertiaryPaneStack: tertiaryPaneStack.slice(0, destinationPaneIndex + 1),
      });
    },
    setActiveTertiaryPane: ({ destinationPane, reset = false }) => {
      const pane = { hash: cuid.slug(), pane: destinationPane };
      if (reset) {
        set({
          activeTertiaryPane: pane,
          tertiaryPaneStack: [pane],
        });
      } else {
        const tertiaryPaneStack = get().tertiaryPaneStack;
        set({
          activeTertiaryPane: pane,
          tertiaryPaneStack:
            tertiaryPaneStack[0] !== null ? [...tertiaryPaneStack, pane] : [pane],
        });
      }
    },
  }));

const { Provider, useStore } =
  createContext<ReturnType<typeof createSchemaReferenceStore>>();

const SchemaReferenceProvider = ({ children }) => (
  <Provider createStore={createSchemaReferenceStore}>{children}</Provider>
);

export { SchemaReferenceProvider, useStore as useSchemaReference };
