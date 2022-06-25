import create from 'zustand';
import { getActiveEditorTab } from '@graphiql-v2-prototype/graphiql-editor';

/** toggle */
import { toggle } from './toggle';

// types
import { PathfinderStore } from './types';

const activeEditorTab = getActiveEditorTab();

const variableDefinitions = activeEditorTab?.operationDefinition?.variableDefinitions;

export const usePathfinder = create<PathfinderStore>((set, get) => ({
  /** begin overlay */
  overlay: {
    currentType: null,
    prevTypes: [],
    visible: false,
  },
  setOverlay: ({ currentType, prevTypes, visible }) => {
    set({ overlay: { currentType, prevTypes, visible } });
  },
  /** end overlay */

  /** begin controls */
  descriptionsVisibility: 'Below',
  setDescriptionsVisibility: (descriptionsVisibility) => {
    set({ descriptionsVisibility });
  },
  fieldsVisibility: 'Off',
  setFieldsVisibility: (fieldsVisibility) => {
    set({ fieldsVisibility });
  },
  pillsVisibility: 'Off',
  setPillsVisibility: (pillsVisibility) => {
    set({ pillsVisibility });
  },
  /** end controls */

  /** begin toggle */
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
  toggle: ({ ancestors, operationType }) => toggle({ ancestors, get, operationType }),
  /** end toggle */
}));
