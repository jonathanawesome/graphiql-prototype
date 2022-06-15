import { useState, useEffect } from 'react';
import { FieldInput, HandleChange } from '@graphiql-v2-prototype/graphiql-ui-library';

/** types */
import { HandleVariableChange, HandleVariableChangeSignature } from '../types';

export const Input = ({
  defaultValue,
  handleVariableChange,
  id,
  variableName,
}: {
  defaultValue: string;
  handleVariableChange: HandleVariableChangeSignature;
  id: string;
  variableName: string;
}) => {
  const [val, setVal] = useState<string>('');

  const handleChange = ({ name, value }: HandleChange) => {
    setVal(value);
  };

  useEffect(() => {
    handleVariableChange({ id, value: val, variableName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);

  // this order 👆 👇 is critical, don't change it

  useEffect(() => {
    handleVariableChange({ id, value: defaultValue, variableName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FieldInput
      handleChange={handleChange}
      // id={id}
      name={variableName}
      placeholder={defaultValue}
      value={val}
    />
  );
};
