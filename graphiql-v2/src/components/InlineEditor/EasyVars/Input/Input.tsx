import React, { useState, useEffect } from 'react';
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
    color: '$accentWarning',
    paddingRight: 12,

    '&:focus': {
      backgroundColor: '$scale200',
    },
    minHeight: 32,
  },
});

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
  const [value, setValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    handleVariableChange({ id, value, variableName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // this order 👆 👇 is critical, don't change it

  useEffect(() => {
    // set a default value in our variables state
    handleVariableChange({ id, value: defaultValue, variableName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
