export const parseOutgoingVariableValue = ({
  typeNameValue,
  value,
}: {
  typeNameValue: string;
  value: string | string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): any => {
  if (Array.isArray(value)) {
    // filter out empty values before parsing
    return value
      .filter((v) => v.length > 0)
      .map((v) => {
        return parseOutgoingVariableValue({ typeNameValue, value: v });
      });
  } else if (['Int'].includes(typeNameValue)) {
    // console.log('testing int', { value, asNumber: Number(value) });
    const number = Number(value);

    /**
     * if the value length is less than one, it's an empty string (which means the input is empty),
     * we want to send that empty string through our updateVariable function as variableValue,
     * sending an empty string will clear the variable from the variables editor
     *
     * if the value is not a number, we still want to send that through to the variables editor
     * even though it wouldn't pass validation from the editor or the server. our input field will warn about this, as should the variables editor
     */
    if (value.length < 1 || isNaN(number)) {
      return value;
    }
    return number;
  } else if (['Float'].includes(typeNameValue)) {
    // console.log('testing float', parseFloat(value));
    const number = parseFloat(value);
    if (isNaN(number)) {
      return value;
    }
    return number;
  } else if (typeNameValue === 'Boolean') {
    // console.log('testing Boolean', { beforeValue: value, afterValue: value === 'true' });
    if (value.length === 0) {
      return value;
    }
    return value === 'true';
  } else {
    //it's an enum, "String", or "ID"
    return value;
  }
};
