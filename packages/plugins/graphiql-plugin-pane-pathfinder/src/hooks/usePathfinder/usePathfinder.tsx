import create from 'zustand';
import { useEditor } from '@graphiql-prototype/store';
import { editor, Range } from 'monaco-editor/esm/vs/editor/editor.api';

/** toggle */
import { toggle } from './toggle';

// types
import { PathfinderStore } from './types';

const activeEditorTab = useEditor.getState().getActiveTab();

const variableDefinitions = activeEditorTab?.operationDefinition?.variableDefinitions;

export const usePathfinder = create<PathfinderStore>((set, get) => ({
  nextOperationType: null,
  setNextOperationType: ({ nextOperationType }) => {
    // console.log('setNextOperationType', nextOperationType);
    set({ nextOperationType });
  },
  nextSelectionSet: null,
  setNextSelectionSet: ({ nextSelectionSet }) => {
    // console.log('setNextSelectionSet', nextSelectionSet);
    set({ nextSelectionSet });
  },
  nextVariableDefinitions: variableDefinitions ? [...variableDefinitions] : undefined,
  setNextVariableDefinitions: ({ nextVariableDefinitions }) => {
    // console.log('setNextVariableDefinitions', nextVariableDefinitions);
    set({ nextVariableDefinitions });
  },
  nextAction: null,
  setNextAction: (action) => {
    // console.log('nextAction', { action });
    set({ nextAction: action });
  },
  newContainer: null,
  setNewContainer: ({ astNode, range, text }) => {
    set({ newContainer: { astNode: astNode || null, range, text } });
  },
  toggle: ({
    ancestors,
    // operationType
  }) =>
    toggle({
      ancestors,
      get,
      // operationType
    }),
}));
