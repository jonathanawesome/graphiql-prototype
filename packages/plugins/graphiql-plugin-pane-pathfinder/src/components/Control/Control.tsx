// components
import { Input } from './Input';
import { List } from './List';
import { Select } from './Select';

//styles
import { StyledControlWrap, StyledLabel } from './styles';

// types
import { ControlProps } from './types';

export const Control = ({ control, labelCopy, list }: ControlProps) => {
  return (
    <StyledControlWrap key={control.name}>
      <StyledLabel>{labelCopy}</StyledLabel>
      {list === true && control.controlType === 'SELECT' && (
        <List
          key={control.name}
          controlType={control.controlType}
          handleChange={control.handleChange}
          name={control.name}
          options={control.options}
          placeholder={control.placeholder}
          returnType={control.returnType}
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
          returnType={control.returnType}
          value={control.value}
        />
      )}
      {list === false && control.controlType === 'SELECT' && (
        <Select
          controlType={control.controlType}
          handleChange={control.handleChange}
          name={control.name}
          options={control.options}
          placeholder={control.placeholder}
          returnType={control.returnType}
          value={control.value}
        />
      )}
      {list === false && control.controlType === 'INPUT' && (
        <Input
          controlType={control.controlType}
          handleChange={control.handleChange}
          name={control.name}
          placeholder={control.placeholder}
          returnType={control.returnType}
          value={control.value}
        />
      )}
    </StyledControlWrap>
  );
};
