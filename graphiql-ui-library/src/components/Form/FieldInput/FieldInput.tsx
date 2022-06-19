import { useEffect, useState } from 'react';

/** styles */
import { StyledFieldInput } from './styles';

/** types */
import type { FieldInputProps } from '../types';

export const FieldInput = ({
  currentValue,
  handleChange,
  name,
  placeholder,
}: FieldInputProps) => {
  // console.log('rendering FieldInput', { currentValue, name });

  const [value, setValue] = useState<string | undefined>(currentValue || '');

  useEffect(() => {
    if (value) {
      handleChange({
        name,
        value,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <StyledFieldInput>
      <input
        autoComplete="off"
        name={name}
        onChange={(e) => {
          e.preventDefault();
          setValue(e.target.value);
        }}
        placeholder={placeholder}
        type="text"
        value={value}
      />
    </StyledFieldInput>
  );
};
