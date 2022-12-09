// components
import { Input } from './Input';
import { List } from './List';
import { Select } from './Select';

//styles
import { StyledControlWrap, StyledLabel } from './styles';

// types
import { ControlProps } from './types';

export const Control = ({
  alignment = 'RIGHT',
  control,
  displayLabel = true,
  isDisabled = false,
  labelAddon,
  labelCopy,
  list = false,
}: ControlProps) => {
  // console.log('control', { isDisabled });

  return (
    <div
      key={control.name}
      className={StyledControlWrap({ alignment, displayLabel, isDisabled })}
    >
      <label className={StyledLabel()} htmlFor={control.name}>
        {labelCopy}
        {labelAddon && labelAddon}
      </label>
      {list === true && control.controlType === 'SELECT' && (
        <List
          key={control.name}
          controlType={control.controlType}
          handleChange={control.handleChange}
          name={control.name}
          options={control.options}
          placeholder={control.placeholder}
          value={control.value}
        />
      )}
      {list === true && control.controlType === 'INPUT' && (
        <List
          key={control.name}
          controlType={control.controlType}
          handleChange={control.handleChange}
          name={control.name}
          placeholder={control.placeholder}
          value={control.value}
        />
      )}
      {list === false && control.controlType === 'SELECT' && (
        <Select
          controlType={control.controlType}
          handleChange={control.handleChange}
          isDisabled={isDisabled}
          name={control.name}
          options={control.options}
          placeholder={control.placeholder}
          value={control.value}
        />
      )}
      {list === false && control.controlType === 'INPUT' && (
        <Input
          controlType={control.controlType}
          handleChange={control.handleChange}
          isDisabled={isDisabled}
          name={control.name}
          placeholder={control.placeholder}
          value={control.value}
        />
      )}
    </div>
  );
};
