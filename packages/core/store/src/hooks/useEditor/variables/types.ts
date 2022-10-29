export type VariablesState = {
  // activeVariables: string;
};

export type VariablesActions = {
  updateVariable: ({
    onInputObject,
    variableName,
    variableValue,
  }: {
    onInputObject?: string;
    variableName: string;
    variableValue: string | string[];
  }) => void;
};
