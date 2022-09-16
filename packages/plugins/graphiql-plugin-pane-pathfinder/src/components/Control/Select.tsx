// components
import { Icon } from '@graphiql-prototype/ui-library';

// styles
import { StyledSelectWrap, StyledSelectDecoration } from './styles';

// types
import { SelectProps } from './types';

export const Select = ({
  handleChange,
  name,
  options,
  placeholder,
  returnType,
  value,
}: SelectProps) => {
  return (
    <StyledSelectWrap isSelected={options.some((option) => option.value === value)}>
      <select
        name={name}
        onChange={(e) => {
          console.log('Select handlechange', { name, value });
          handleChange({
            name,
            value: e.target.value,
          });
        }}
        value={value}
      >
        <option value="">{returnType || placeholder}</option>
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
