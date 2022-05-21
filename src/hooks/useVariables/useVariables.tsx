import create from 'zustand';

/** constants */
import { defaultVariables } from '@/constants';

export type VariablesStore = {
  variables: string;
  setVariables: ({ value }: { value: string }) => void;
};

export const useVariables = create<VariablesStore>((set) => ({
  variables: defaultVariables,
  setVariables: ({ value }) => {
    console.log('setVariables', value);
    set({ variables: value });
  },
}));
