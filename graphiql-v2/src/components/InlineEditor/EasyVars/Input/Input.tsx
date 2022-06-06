import React, { useState, useEffect } from 'react';
import cuid from 'cuid';
import { styled } from '../../../../theme';

/** types */
import { HandleVariableChangeSignature } from '../types';

const StyledInput = styled('div', {
  width: '100%',
  input: {
    all: 'unset',
    boxSizing: 'border-box',
    width: '100%',
    textAlign: 'right',
    padding: 4,
    color: '$accentWarning',
  },
});

export const Input = ({
  defaultValue,
  handleVariableChange,
  onList = false,
  variableName,
}: {
  defaultValue: string;
  handleVariableChange: HandleVariableChangeSignature;
  onList?: boolean;
  variableName: string;
}) => {
  const id = cuid.slug();
  const [value, setValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    // set a default value for inputs on lists
    if (onList) {
      handleVariableChange({ id, value: defaultValue, variableName });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleVariableChange({ id, value, variableName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <StyledInput>
      <input
        autoComplete="off"
        name={variableName}
        onChange={(e) => handleInputChange(e)}
        type="text"
        value={value || defaultValue}
      />
    </StyledInput>
  );
};
