import { EasyVars } from '../hooks/useGraphiQL/types';

export const prepValue = ({
  type,
  value,
}: {
  type: string;
  value: string | string[];
}) => {
  if (Array.isArray(value)) {
    return value.map((v) => prepValue({ type, value: v }));
  } else if (['Int', 'Float', '[Int]', '[Float]'].includes(type)) {
    return Number(value);
  } else if (['Boolean', '[Boolean]'].includes(type)) {
    return value === 'true';
  } else {
    return value;
  }
};

export const parseEasyVars = ({ easyVars }: { easyVars: EasyVars }) => {
  return easyVars.reduce(
    (o: Record<string, string | boolean | number | string[]>, key) => {
      return {
        ...o,
        [key.variableName]: prepValue({
          type: key.variableType.toString(),
          value: key.variableValue,
        }),
      };
    },
    {}
  );
};
