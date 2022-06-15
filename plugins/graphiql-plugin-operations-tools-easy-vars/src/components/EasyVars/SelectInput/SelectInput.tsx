import { useEffect } from 'react';

/** components */
import { FieldSelect } from '@graphiql-v2-prototype/graphiql-ui-library';

/** types */
import { HandleVariableChangeSignature, SelectInputValue } from '../types';
import { HandleChange } from '@graphiql-v2-prototype/graphiql-ui-library';

export const SelectInput = ({
  handleVariableChange,
  id,
  values,
  variableName,
}: {
  handleVariableChange: HandleVariableChangeSignature;
  id: string;
  values: SelectInputValue[];
  variableName: string;
}) => {
  console.log('rendering SelectInput', { values });

  useEffect(() => {
    // set a default value
    handleVariableChange({ id, value: values[0].value, variableName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = ({ value }: HandleChange) => {
    handleVariableChange({ id, value, variableName });
  };

  return (
    <FieldSelect
      handleChange={handleChange}
      // id={id}
      name={variableName}
      values={values}
    />
  );
};
