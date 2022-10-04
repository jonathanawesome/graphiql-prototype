// components
import { Icon } from '../../icons';

// styles
import { StyledSelect, StyledSelectWrap, StyledSelectDecoration } from './styles';

// types
import { SelectProps } from './types';

export const Select = ({
  handleChange,
  isDisabled,
  name,
  options,
  placeholder,
  value,
}: SelectProps) => {
  return (
    <StyledSelectWrap isSelected={options.some((option) => option.value === value)}>
      <StyledSelect
        disabled={isDisabled}
        name={name}
        onChange={(e) => {
          handleChange({
            name,
            value: e.target.value,
          });
        }}
        value={value as string}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </StyledSelect>
      <StyledSelectDecoration>
        <Icon name="Caret" />
      </StyledSelectDecoration>
    </StyledSelectWrap>
  );
};
