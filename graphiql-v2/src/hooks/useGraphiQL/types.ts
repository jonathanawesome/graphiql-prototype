import { GraphQLSchema } from 'graphql';

export type GraphiQLStore = {
  schema: GraphQLSchema | null;
  setSchema: ({ schema }: { schema: GraphQLSchema }) => void;
  activePane: string;
  setActivePane: (paneName: string) => void;
};
