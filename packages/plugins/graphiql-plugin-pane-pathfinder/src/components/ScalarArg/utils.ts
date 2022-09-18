export const validateInputValue = ({
  inputValue,
  setError,
  typeNameValue,
}: {
  inputValue: string | string[];
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  typeNameValue: string;
}) => {
  // we return null if we're valid or setError with a string if we're not
  let result: string | null = null;

  // if the incoming value is an array it means we're dealing with a list input, let's handle it differently
  if (Array.isArray(inputValue)) {
    // for each of the values in our string array, let's run our check
    inputValue.forEach((v) => {
      // let's skip inputs that don't have a value (newly added list items or when user removes value from input)
      if (v.length > 0) {
        // only run our check if the result is null...if we already have a string value that means we've already identified an invalid list item
        if (!result) {
          result = doCheck({ inputValue: v, typeNameValue });
        }
      }
    });
  } else {
    result = doCheck({ inputValue, typeNameValue });
  }

  return setError(result);
};

const doCheck = ({
  inputValue,
  typeNameValue,
}: {
  inputValue: string;
  typeNameValue: string;
}) => {
  const inputValueAsNumber = Number(inputValue);

  if (typeNameValue === 'Float') {
    if (Number.isNaN(inputValueAsNumber) || Number.isInteger(inputValueAsNumber)) {
      return `Value must be ${typeNameValue}`;
    }
  }
  if (typeNameValue === 'Int') {
    if (Number.isNaN(inputValueAsNumber) || !Number.isInteger(inputValueAsNumber)) {
      return `Value must be ${typeNameValue}`;
    }
  }
  return null;
};
