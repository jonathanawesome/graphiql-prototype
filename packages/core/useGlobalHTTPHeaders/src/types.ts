export type GlobalHeader = {
  id: string;
  header: {
    name: string;
    value: string;
  };
};

export type GlobalHTTPHeadersStore = {
  globalHeaders: Array<GlobalHeader>;
  addGlobalHeader: () => void;
  removeGlobalHeader: ({ id }: { id: string }) => void;
  updateGlobalHeader: ({
    id,
    name,
    value,
  }: {
    id: string;
    name: 'name' | 'value';
    value: string;
  }) => void;
};
