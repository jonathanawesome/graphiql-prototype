export type SearchStore = {
  searchBarVisible: boolean;
  setSearchBarVisible: ({ bool }: { bool: boolean }) => void;
  searchValue: string;
  setSearchValue: ({ value }: { value: string }) => void;
};
