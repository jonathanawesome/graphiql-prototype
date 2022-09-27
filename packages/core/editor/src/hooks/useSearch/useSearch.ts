import create from 'zustand';

// types
import { SearchStore } from './types';

export const useSearch = create<SearchStore>((set) => ({
  searchBarVisible: false,
  setSearchBarVisible: ({ bool }) => {
    set({ searchBarVisible: bool });
  },
  searchValue: '',
  setSearchValue: ({ value }) => {
    set({ searchValue: value });
  },
}));
