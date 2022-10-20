export type VariablesState = {
  activeVariables: string;
};

export type VariablesActions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getVariables: () => Record<any, any>;
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
