import create from 'zustand';
import { useGraphiQL } from '@graphiql-v2-prototype/graphiql-v2';

/** toggle */
import { toggle } from './toggle';

/** types */
import { PathfinderStore } from './types';

const operationDefinition = useGraphiQL.getState().operationDefinition;
const variableDefinitions = operationDefinition?.variableDefinitions;

export const usePathfinder = create<PathfinderStore>((set, get) => ({
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
}));
