// types
import { GetEditorStore, SetEditorStore } from '../types';
import { DocumentActions } from './types';

// utils
import { getLocationAndRangeForDefinition, parseQuery } from '@graphiql-prototype/utils';

export const documentActions = (
  get: GetEditorStore,
  set: SetEditorStore
): DocumentActions => ({
  setActiveExecutableDefinition: ({ definitionNode }) => {
    set({ activeDefinition: definitionNode });
  },
  clearDocumentState: () => {
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
    const model = editor?.getModel();
    const modelValue = editor?.getModel()?.getValue();
    const existingActiveDefinition = JSON.stringify(get().activeDefinition);

    model?.deltaDecorations(get().editorDecorations.existing, []);
    editor?.deltaDecorations(get().editorDecorations.existing, []);

    if (model && modelValue && editor) {
      const parsedQuery = parseQuery(modelValue);

      if (parsedQuery && !(parsedQuery instanceof Error)) {
        const definitionCount = parsedQuery.definitions.length;

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

          set({
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
          set({
            editorDecorations: {
              ...get().editorDecorations,
              existing: editor.deltaDecorations(get().editorDecorations.existing, []),
            },
          });
        }
      } else {
        console.log('Error parsing query', { parsedQuery });
      }
    }
  },
});
