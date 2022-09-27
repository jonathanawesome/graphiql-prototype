// components
import { Icon } from '../../icons';

// styles
import { StyledSelectWrap, StyledSelectDecoration } from './styles';

// types
import { SelectProps } from './types';

export const Select = ({
  handleChange,
  name,
  options,
  placeholder,
  value,
  variant,
}: SelectProps) => {
  return (
    <StyledSelectWrap
      isSelected={options.some((option) => option.value === value)}
      variant={variant}
    >
      <select
        name={name}
        onChange={(e) => {
          handleChange({
            name,
            value: e.target.value,
          });
        }}
        value={value}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <StyledSelectDecoration>
        <Icon name="Caret" />
      </StyledSelectDecoration>
    </StyledSelectWrap>
  );
};
