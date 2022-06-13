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

export type SelectInputValue = { value: string; name: string; description?: string };
