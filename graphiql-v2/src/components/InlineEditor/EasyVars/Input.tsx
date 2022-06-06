import cuid from 'cuid';
import React, { useState, useEffect } from 'react';
import { styled } from '../../../theme';
import { defaultInputValue, HandleVariableChangeSignature } from './EasyVars';

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
    if (onList) {
      // handleVariableChange({ id, value: values[0].value, variableName });
      handleVariableChange({
        id,
        value: defaultValue,
        variableName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('value changing in Input, calling handleVariableChange', {
      id,
      value,
      variableName,
    });
    handleVariableChange({ id, value, variableName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <StyledInput>
      <input
        autoComplete="off"
        name={variableName}
        onChange={(e) => handleInputChange(e)}
        // ref={inputRef}
        type="text"
        value={value || defaultValue}
      />
    </StyledInput>
  );
};
