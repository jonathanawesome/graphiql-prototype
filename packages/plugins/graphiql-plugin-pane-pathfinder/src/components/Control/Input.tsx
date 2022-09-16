// styles
import { StyledInput } from './styles';

// types
import { InputProps } from './types';

export const Input = ({
  handleChange,
  name,
  placeholder,
  returnType,
  value,
}: InputProps) => {
  return (
    <StyledInput
      name={name}
      onChange={(e) => {
        console.log('Input handlechange', { name, value });
        handleChange({
          name,
          value: e.target.value,
        });
      }}
      placeholder={returnType || placeholder}
      type="text"
      value={value}
    />
  );
};
