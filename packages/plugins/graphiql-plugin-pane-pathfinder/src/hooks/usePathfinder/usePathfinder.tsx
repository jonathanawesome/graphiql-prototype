import create from 'zustand';
import { useEditor } from '@graphiql-prototype/store';

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

  // newNextAction: null,
  // newSetNextAction: ({ action }) => {
  //   // console.log('nextAction', { action });
  //   set({ newNextAction: action });
  // },
  nextField: null,
  setNextField: ({ nextField }) => {
    set({ nextField });
  },
  actionMode: null,
  setActionMode: ({ actionMode }) => {
    set({ actionMode });
  },

  // parts: {
  //   operationDefinition: null,
  //   fields: [],
  // },
  // pushPartsField: ({ field }) => {
  //   const parts = get().parts;
  //   set({
  //     parts: {
  //       ...parts,
  //       fields: [...parts.fields, field],
  //     },
  //   });
  // },

  // setOperationDefinition: ({ operationDefinition }) => {
  //   const parts = get().parts;
  //   set({
  //     parts: {
  //       ...parts,
  //       operationDefinition,
  //     },
  //   });
  // },

  // resetParts: () => {
  //   set({
  //     parts: {
  //       operationDefinition: null,
  //       fields: [],
  //     },
  //   });
  // },

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
