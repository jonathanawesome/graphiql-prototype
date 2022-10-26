// types
import { GetEditorStore, SetEditorStore } from '../types';
import { DocumentActions } from './types';

// utils
import { getLocationAndRangeForDefinition, parseQuery } from '@graphiql-prototype/utils';
import { OperationDefinitionNode } from 'graphql';

const DEFAULT_EDITOR_TAB_NAME = 'Untitled';

export const documentActions = (
  get: GetEditorStore,
  set: SetEditorStore
): DocumentActions => ({
  setActiveExecutableDefinition: ({ definitionNode }) => {
    set({ activeDefinition: definitionNode });
  },
  resetDocumentState: () => {
    set({
      activeDefinition: null,
      editorDecorations: {
        new: [],
        existing: [],
      },

      hasActiveDefinition: false,
      documentDefinitions: 0,
    });
  },
  setDocumentState: () => {
    const editor = get().monacoEditors['operations'];
    const resetDocumentState = get().resetDocumentState;
    const updateActiveTabState = get().updateActiveTabState;
    const model = editor?.getModel();
    const modelValue = editor?.getModel()?.getValue() as string;
    const existingActiveDefinition = JSON.stringify(get().activeDefinition);

    model?.deltaDecorations(get().editorDecorations.existing, []);
    editor?.deltaDecorations(get().editorDecorations.existing, []);

    if (model && editor) {
      const parsedQuery = parseQuery(modelValue);

      if (!parsedQuery) {
        // we've an empty editor (either user-cleared or cleared via pathfinder) so we reset our document state and update the active tab name
        updateActiveTabState({
          data: {
            editorTabName: DEFAULT_EDITOR_TAB_NAME,
          },
        });
        return resetDocumentState();
      }

      if (parsedQuery && !(parsedQuery instanceof Error)) {
        const definitionCount = parsedQuery.definitions.length;

        updateActiveTabState({
          data: {
            definitions: [...parsedQuery.definitions],
            editorTabName:
              (parsedQuery.definitions[0] as OperationDefinitionNode).name?.value ||
              DEFAULT_EDITOR_TAB_NAME,
          },
        });

        set({ documentDefinitions: definitionCount });

        if (definitionCount >= 1) {
          const cPos = editor?.getPosition();

          [...parsedQuery.definitions].forEach((d) => {
            const { range, startLine, endLine } = getLocationAndRangeForDefinition({
              definition: d,
            });

            if (cPos && cPos.lineNumber >= startLine && cPos.lineNumber <= endLine) {
              // if the cursor position exists within one of the definitions, it is the active definition

              // only update state if our exiting activeDefinition differs from this definition
              if (existingActiveDefinition !== JSON.stringify(d)) {
                set({ activeDefinition: d });
              }
              set({ hasActiveDefinition: true });
            } else {
              set({
                editorDecorations: {
                  ...get().editorDecorations,
                  new: [
                    ...get().editorDecorations.new,
                    {
                      range,
                      options: { inlineClassName: 'inactiveDefinition' },
                    },
                  ],
                },
              });
            }
          });

          if (!get().hasActiveDefinition) {
            // our cursor is not within any of our definitions, so we want our first definition to be active

            // shift first definition from newDecorations (do NOT mark it inactive)
            get().editorDecorations.new.shift();

            const def = parsedQuery.definitions[0];

            // only update state if our exiting activeDefinition differs from this definition
            if (existingActiveDefinition !== JSON.stringify(def)) {
              set({ activeDefinition: def });
            }
          }

          return set({
            editorDecorations: {
              // reset our newDecorations array
              new: [],
              existing: editor.deltaDecorations(
                get().editorDecorations.existing,
                get().editorDecorations.new
              ),
            },
            // reset our hasActiveDefinition marker
            hasActiveDefinition: false,
          });
        } else {
          // we have one or less definitions, so we clear all decorations
          return set({
            editorDecorations: {
              ...get().editorDecorations,
              existing: editor.deltaDecorations(get().editorDecorations.existing, []),
            },
          });
        }
      } else {
        return console.log('Error parsing query', { parsedQuery });
      }
    }

    return undefined;
  },
});
