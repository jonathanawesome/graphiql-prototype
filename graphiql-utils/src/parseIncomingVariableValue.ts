export const parseIncomingVariableValue = (value: string | number | boolean) => {
  if (Array.isArray(value)) {
    return value.map((v) => {
      return parseIncomingVariableValue(v);
    });
  } else if (typeof value === 'boolean') {
    return `${value}`;
  } else if (!value) {
    return '';
  } else {
    return `${value}`;
  }
};
