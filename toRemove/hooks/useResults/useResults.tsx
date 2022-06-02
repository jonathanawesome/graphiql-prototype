import create from 'zustand';

/** constants */
import { defaultResults } from '@/constants';

export type ResultsStore = {
  results: string;
  setResults: ({ value }: { value: string }) => void;
};

export const useResults = create<ResultsStore>((set) => ({
  results: defaultResults,
  setResults: ({ value }) => {
    set({ results: value });
  },
}));
