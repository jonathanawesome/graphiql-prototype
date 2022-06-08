import create from 'zustand';
import { useGraphiQL } from '../../../../graphiql-v2/src/hooks/useGraphiQL/useGraphiQL';

/** toggle */
import { toggle } from './toggle';

/** types */
import { PathfinderStore } from './types';

const operationDefinition = useGraphiQL.getState().operationDefinition;
const variableDefinitions = operationDefinition?.variableDefinitions;

export const usePathfinder = create<PathfinderStore>((set, get) => ({
  /** begin controls */
  descriptionsVisibility: 'Inline',
  setDescriptionsVisibility: (descriptionsVisibility) => {
    set({ descriptionsVisibility });
  },
  pillsVisibility: 'Off',
  setPillsVisibility: (pillsVisibility) => {
    set({ pillsVisibility });
  },
  /** end controls */

  /** begin toggle */
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
  toggle: ({ ancestors }) => toggle({ ancestors, get }),
  /** end toggle */
}));
