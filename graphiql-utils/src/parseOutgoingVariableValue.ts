export const parseOutgoingVariableValue = ({
  typeNameValue,
  value,
}: {
  typeNameValue: string;
  value: string | string[];
}) => {
  if (Array.isArray(value)) {
    return value.map((v) => {
      return parseOutgoingVariableValue({ typeNameValue, value: v });
    });
  } else if (['Int', 'Float'].includes(typeNameValue)) {
    return Number(value);
  } else if (typeNameValue === 'Boolean') {
    return value === 'true';
  } else {
    //it's an enum, "String", or "ID"
    return value;
  }
};
