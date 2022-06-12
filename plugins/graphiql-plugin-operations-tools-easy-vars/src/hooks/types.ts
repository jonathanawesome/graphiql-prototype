import { GraphQLArgument, GraphQLInputType } from 'graphql';

export type EasyVar = {
  variableName: string;
  variableType: GraphQLInputType;
  variableValue: string | string[];
  argument: GraphQLArgument;
};
export type EasyVars = Array<EasyVar>;

export type EasyVarsStore = {
  easyVars: EasyVars;
  addEasyVar: ({ easyVar }: { easyVar: EasyVar }) => void;
};
