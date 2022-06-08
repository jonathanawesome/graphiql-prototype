import {
  ExecutableDefinitionNode,
  GraphQLArgument,
  GraphQLInputType,
  GraphQLSchema,
  OperationDefinitionNode,
} from 'graphql';

export type EasyVar = {
  variableName: string;
  variableType: GraphQLInputType;
  variableValue: string | string[];
  argument: GraphQLArgument;
};
export type EasyVars = Array<EasyVar>;

export type GraphiQLStore = {
  schema: GraphQLSchema | null;
  setSchema: ({ schema }: { schema: GraphQLSchema }) => void;
  // onEditDefinition: ({
  //   nextDefinition,
  // }: {
  //   nextDefinition: OperationDefinitionNode | null;
  // }) => void;
  // variables: EasyVars;
  // addVariable: ({ easyVar }: { easyVar: EasyVar }) => void;
  // updateVariable: ({
  //   variableName,
  //   variableValue,
  // }: {
  //   variableName: string;
  //   variableValue: string | string[];
  // }) => void;
  // removeVariables: ({ variableNames }: { variableNames: string[] }) => void;
  // operationDefinition: ExecutableDefinitionNode | null;
  // setOperationDefinition: ({
  //   operationDefinition,
  // }: {
  //   operationDefinition: ExecutableDefinitionNode | null;
  // }) => void;
  // operation: string;
  // setOperation: ({ value }: { value: string }) => void;
};
