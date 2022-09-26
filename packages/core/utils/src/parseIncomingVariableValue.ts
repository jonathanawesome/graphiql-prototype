export const parseIncomingVariableValue = (
  value: string | string[] | number | boolean
): string | string[] => {
  if (Array.isArray(value)) {
    return value.map((v: string) => parseIncomingVariableValue(v)) as string[];
  } else if (typeof value === 'boolean') {
    return `${value}`;
  } else if (!value) {
    return '';
  }
  return `${value}`;
};
