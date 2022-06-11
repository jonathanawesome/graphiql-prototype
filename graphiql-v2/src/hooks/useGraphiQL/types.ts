import {
  // GraphQLArgument, GraphQLInputType,
  GraphQLSchema,
} from 'graphql';

// export type EasyVar = {
//   variableName: string;
//   variableType: GraphQLInputType;
//   variableValue: string | string[];
//   argument: GraphQLArgument;
// };
// export type EasyVars = Array<EasyVar>;

export type GraphiQLStore = {
  schema: GraphQLSchema | null;
  setSchema: ({ schema }: { schema: GraphQLSchema }) => void;
};
