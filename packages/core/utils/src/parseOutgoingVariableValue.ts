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
    console.log('testing number', Number(value));
    const number = Number(value);
    if (isNaN(number)) {
      return value;
    }
    return number;
  } else if (typeNameValue === 'Boolean') {
    return value === 'true';
  } else {
    //it's an enum, "String", or "ID"
    return value;
  }
};
