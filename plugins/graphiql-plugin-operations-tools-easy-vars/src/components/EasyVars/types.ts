export type HandleVariableChange = {
  id: string;
  value: string;
  variableName: string;
};

export type HandleVariableChangeSignature = ({
  id,
  value,
  variableName,
}: HandleVariableChange) => void;

// export type EasyVar = {
//   variableName: string;
//   variableType: GraphQLInputType;
//   variableValue: string | string[];
//   argument: GraphQLArgument;
// };
// export type EasyVars = Array<EasyVar>;

export type SelectInputValue = { value: string; name: string; description?: string };
