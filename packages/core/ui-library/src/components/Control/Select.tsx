// components
import { Icon } from '../Icon';

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
    <div
      className={StyledSelectWrap({
        isSelected: options.some((option) => option.value === value),
      })}
    >
      <select
        className={StyledSelect()}
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
      </select>
      <div className={StyledSelectDecoration()}>
        <Icon name="Caret" />
      </div>
    </div>
  );
};
