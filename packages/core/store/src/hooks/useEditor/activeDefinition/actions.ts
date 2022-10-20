// types
import { GetEditorStore, SetEditorStore } from '../types';
import { ActiveDefinitionActions } from './types';

// utils
import { getLocationAndRangeForDefinition, parseQuery } from '@graphiql-prototype/utils';

export const activeDefinitionActions = (
  get: GetEditorStore,
  set: SetEditorStore
): ActiveDefinitionActions => ({
  setActiveExecutableDefinition: ({ definitionNode }) => {
    set({ activeExecutableDefinition: definitionNode });
  },
  determineActiveExecutableDefinition: () => {
    const editor = get().monacoEditors['operations'];
    const modelValue = editor?.getModel()?.getValue();

    if (modelValue && editor) {
      const parsedQuery = parseQuery(modelValue);

      if (parsedQuery && !(parsedQuery instanceof Error)) {
        const definitionCount = parsedQuery.definitions.length;

        if (definitionCount > 1) {
          const cPos = editor?.getPosition();

          [...parsedQuery.definitions].forEach((d) => {
            const { range, startLine, endLine } = getLocationAndRangeForDefinition({
              definition: d,
            });

            if (cPos && cPos.lineNumber >= startLine && cPos.lineNumber <= endLine) {
              // if the cursor position exists within one of the definitions, it is the active definition
              set({ activeExecutableDefinition: d, hasActiveDefinition: true });
            } else {
              set({
                newDecorations: [
                  ...get().newDecorations,
                  {
                    range,
                    options: { inlineClassName: 'inactiveDefinition' },
                  },
                ],
              });
            }
          });
          if (!get().hasActiveDefinition) {
            // our cursor is not within any of our definitions, so we want our first definition to be active
            // shift first definition from newDecorations
            const firstDefinition = get().newDecorations.shift();
            set({ activeExecutableDefinition: parsedQuery.definitions[0] });
          }
          set({
            existingDecorations: editor.deltaDecorations(
              get().existingDecorations,
              get().newDecorations
            ),
            // reset our newDecorations array
            newDecorations: [],
            // reset our hasActiveDefinition marker
            hasActiveDefinition: false,
          });
        } else {
          // we have one or less definitions, so we clear all decorations
          set({
            existingDecorations: editor.deltaDecorations(get().existingDecorations, []),
          });
        }
      } else {
        console.log('Error parsing query', { parsedQuery });
      }
    }
  },
});
