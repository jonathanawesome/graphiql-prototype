import create from 'zustand';

// toggle
import { toggle } from './toggle';

// types
import { PathfinderStore } from './types';

export const usePathfinder = create<PathfinderStore>(() => ({
  toggle: ({ ancestors }) => toggle({ ancestors }),
}));
