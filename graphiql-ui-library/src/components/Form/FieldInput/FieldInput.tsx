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
  // console.log('rendering FieldInput', { value, name });

  return (
    <StyledFieldInput>
      <input
        autoComplete="off"
        name={name}
        onChange={(e) =>
          handleChange({
            name,
            value: e.target.value,
          })
        }
        placeholder={placeholder}
        type="text"
        value={currentValue}
      />
    </StyledFieldInput>
  );
};
