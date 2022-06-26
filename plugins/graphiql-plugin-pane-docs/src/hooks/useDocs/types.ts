import { GraphQLSchema, GraphQLType } from 'graphql';

export type DocsTypes = GraphQLType | GraphQLSchema;

export type DocsStore = {
  currentType: DocsTypes | null;
  setCurrentType: ({ currentType }: { currentType: DocsTypes }) => void;
  previousTypes: Array<DocsTypes>;
  setPreviousTypes: ({ previousTypes }: { previousTypes: Array<DocsTypes> }) => void;
};
