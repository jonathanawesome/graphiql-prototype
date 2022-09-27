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
  } else if (['Int'].includes(typeNameValue)) {
    console.log('testing int', Number(value));
    const number = Number(value);
    if (isNaN(number)) {
      return value;
    }
    return number;
  } else if (['Float'].includes(typeNameValue)) {
    console.log('testing float', parseFloat(value));
    const number = parseFloat(value);
    if (isNaN(number)) {
      return value;
    }
    return number;
  } else if (typeNameValue === 'Boolean') {
    console.log('testing Boolean', { beforeValue: value, afterValue: value === 'true' });
    //
    if (value.length === 0) {
      return value;
    }
    return value === 'true';
  } else {
    //it's an enum, "String", or "ID"
    return value;
  }
};
