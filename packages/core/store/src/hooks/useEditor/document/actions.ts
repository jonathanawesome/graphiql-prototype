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

    console.log('setdocumentState', {
      existingDecoratiosn: model?.getAllDecorations(),
    });

    model?.deltaDecorations(get().editorDecorations.existing, []);
    editor?.deltaDecorations(get().editorDecorations.existing, []);

    if (model && modelValue && editor) {
      const parsedQuery = parseQuery(modelValue);

      if (parsedQuery && !(parsedQuery instanceof Error)) {
        const definitionCount = parsedQuery.definitions.length;

        set({ documentDefinitions: definitionCount });

        if (definitionCount > 1) {
          const cPos = editor?.getPosition();
          // console.log('cursorPosition', { cPos });

          [...parsedQuery.definitions].forEach((d) => {
            const { range, startLine, endLine } = getLocationAndRangeForDefinition({
              definition: d,
            });

            if (cPos && cPos.lineNumber >= startLine && cPos.lineNumber <= endLine) {
              // if the cursor position exists within one of the definitions, it is the active definition
              set({ activeDefinition: d, hasActiveDefinition: true });
              console.log('setting active definition', {
                d,
              });
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
            // shift first definition from newDecorations
            const firstDefinition = get().editorDecorations.new.shift();
            set({ activeDefinition: parsedQuery.definitions[0] });
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
