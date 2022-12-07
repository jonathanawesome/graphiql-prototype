// styles
import { StyledInput } from './styles';

// types
import { InputProps } from './types';

export const Input = ({
  handleChange,
  isDisabled,
  name,
  placeholder,
  value,
}: InputProps) => {
  return (
    <input
      autoComplete="off"
      className={StyledInput()}
      data-testid={`input-${name}`}
      disabled={isDisabled}
      id={name}
      name={name}
      onChange={(e) => {
        handleChange({
          name,
          value: e.target.value,
        });
      }}
      placeholder={placeholder}
      type="text"
      value={value as string}
    />
  );
};
