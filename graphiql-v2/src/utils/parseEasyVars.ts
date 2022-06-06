import { EasyVars } from '../hooks/useGraphiQL/types';

export const parseEasyVars = ({ easyVars }: { easyVars: EasyVars }) => {
  return easyVars.reduce(
    (o: Record<string, string | boolean | number>, key) => ({
      ...o,
      [key.variableName]: key.variableValue,
    }),
    {}
  );
};
