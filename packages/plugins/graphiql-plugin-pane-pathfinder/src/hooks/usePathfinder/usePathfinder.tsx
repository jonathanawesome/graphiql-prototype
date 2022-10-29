import create from 'zustand';

// actions and state
import { pathfinderActions } from './actions';
import { pathfinderState } from './state';

// types
import { PathfinderStore } from './types';

export const usePathfinder = create<PathfinderStore>((set) => ({
  ...pathfinderState,
  ...pathfinderActions(set),
}));
