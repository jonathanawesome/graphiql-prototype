import cuid from 'cuid';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// components
import { Icon } from '@graphiql-prototype/ui-library';

//styles
import {
  StyledControlWrap,
  StyledInput,
  StyledSelectWrap,
  StyledSelectDecoration,
  StyledLabel,
  StyledNewForm,
  StyledAddItemButton,
  StyledList,
  StyledListItem,
  StyledRemoveItemButton,
} from './styles';

type FieldTypes = 'Boolean' | 'Int' | 'Float' | 'ID' | 'String' | string;

type FieldStateValue = {
  name: string;
  value: string | string[];
};

type BaseControlProps = {
  handleChange: ({ name, value }: FieldStateValue) => void;
  labelCopy: string;
  name: string;
  placeholder?: string;
  returnType: FieldTypes;
  value: string | string[];
};

type InputProps = BaseControlProps & {
  options?: never;
};

const Input = ({ handleChange, name, placeholder, returnType, value }: InputProps) => {
  return (
    <StyledInput
      name={name}
      onChange={(e) => {
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

type SelectProps = BaseControlProps & {
  options: Array<{ name: string; value: string }>;
};

const Select = ({
  handleChange,
  name,
  value,
  placeholder,
  returnType,
  options,
}: SelectProps) => {
  return (
    <StyledSelectWrap isSelected={options.some((option) => option.value === value)}>
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

// type ListBaseProps = {
//   handleChange: ({ name, value }: FieldStateValue) => void;
//   name: string;
//   placeholder: string;
//   returnType: string;
//   value: string[];
// };

type ListInputProps = BaseControlProps & {
  controlType: 'LIST_INPUT';
  options?: never;
};

type ListSelectProps = BaseControlProps & {
  controlType: 'LIST_SELECT';
  options: Array<{ name: string; value: string }>;
};

type ListProps = ListInputProps | ListSelectProps;

const List = ({
  controlType,
  handleChange,
  labelCopy,
  name,
  options,
  returnType,
  value,
  placeholder,
}: ListProps) => {
  // const [fieldListItems, setFieldListItems] = useState<
  //   Array<{ name: string; value: string; component: React.ReactElement }>
  // >([]);

  const [items, setItems] = useState<Array<{ name: string; value: string }>>(
    (value as string[]).map((v) => ({ name: `${cuid.slug()}-${v}`, value: v }))
  );

  // console.log('items', { items });

  useEffect(() => {
    handleChange({
      name,
      value: items.map((item) => item.value),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const handleItemControlChange = ({ name, value }: FieldStateValue) => {
    // console.log('handleItemControlChange', { name, value });

    setItems((prev) =>
      prev.map((p) => (p.name === name ? { ...p, value: value as string } : p))
    );
  };

  const handleAddItem = ({ name }: { name: string }) => {
    // if (['ID', 'String', 'Int', 'Float'].includes(typeNameValue)) {
    if (controlType === 'LIST_INPUT') {
      setItems((prev) => [
        ...prev,
        {
          name,
          value: '',
        },
      ]);
    }
    if (controlType === 'LIST_SELECT') {
      setItems((prev) => [
        ...prev,
        {
          name,
          value: '',
        },
      ]);
    }
  };

  const handleRemoveItem = ({ name }: { name: string }) => {
    setItems((items) => items.filter((item) => item.name !== name));
  };

  return (
    <StyledList>
      {items.length > 0 &&
        items.map((item) => (
          <StyledListItem key={`${item.name}`}>
            <StyledRemoveItemButton onClick={() => handleRemoveItem({ name: item.name })}>
              <Icon name="Close" />
            </StyledRemoveItemButton>
            {/* {item.component} */}
            {controlType === 'LIST_INPUT' && (
              <Input
                handleChange={handleItemControlChange}
                labelCopy={labelCopy}
                name={item.name}
                placeholder={returnType || placeholder}
                returnType={returnType}
                value={item.value}
              />
            )}
            {controlType === 'LIST_SELECT' && (
              <Select
                handleChange={handleItemControlChange}
                labelCopy={labelCopy}
                name={item.name}
                options={options}
                placeholder={returnType || placeholder}
                returnType={returnType}
                value={item.value}
              />
            )}
          </StyledListItem>
        ))}
      <StyledAddItemButton
        type="button"
        onClick={() => handleAddItem({ name: `${cuid.slug()}` })}
      >{`Add ${items.length > 0 ? 'another' : ''} ${returnType} +`}</StyledAddItemButton>
    </StyledList>
  );
};

type ControlInput = {
  controlType: 'INPUT' | 'LIST_INPUT';
  control: Omit<InputProps, 'handleChange'>;
};

type ControlSelect = {
  controlType: 'SELECT' | 'LIST_SELECT';
  control: Omit<SelectProps, 'handleChange'>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CaptureFormValuesSignature = Dispatch<SetStateAction<Record<any, any>>>;

type ControlProps = ControlInput | ControlSelect;

type NewFormProps = {
  captureFormValues: CaptureFormValuesSignature;
  controls: Array<ControlProps>;
};

export const NewForm = ({ captureFormValues, controls }: NewFormProps) => {
  const [values, setValues] = useState({});

  console.log('NewForm', values);

  useEffect(() => {
    setValues(() => {
      const newState = controls.reduce(
        (acc, control: ControlProps) => ({
          ...acc,
          [control.control.name]: control.control.value,
        }),
        {}
      );

      return newState;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('capturing the following values', { values });
    captureFormValues(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleControlChange = ({ name, value }: FieldStateValue) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <StyledNewForm>
      <fieldset>
        {controls.map((control) => {
          return (
            <StyledControlWrap key={control.control.name}>
              <StyledLabel>{control.control.labelCopy}</StyledLabel>
              {control.controlType === 'LIST_SELECT' && (
                <List
                  key={control.control.name}
                  controlType="LIST_SELECT"
                  handleChange={handleControlChange}
                  labelCopy={control.control.labelCopy}
                  name={control.control.name}
                  options={control.control.options}
                  placeholder={control.control.placeholder}
                  returnType={control.control.returnType}
                  value={values[control.control.name] || control.control.value}
                />
              )}
              {control.controlType === 'LIST_INPUT' && (
                <List
                  key={control.control.name}
                  controlType="LIST_INPUT"
                  handleChange={handleControlChange}
                  labelCopy={control.control.labelCopy}
                  name={control.control.name}
                  placeholder={control.control.placeholder}
                  returnType={control.control.returnType}
                  value={values[control.control.name] || control.control.value}
                />
              )}
              {control.controlType === 'SELECT' && (
                <Select
                  key={control.control.name}
                  handleChange={handleControlChange}
                  labelCopy={control.control.labelCopy}
                  name={control.control.name}
                  options={control.control.options}
                  placeholder={control.control.placeholder}
                  returnType={control.control.returnType}
                  value={values[control.control.name] || control.control.value}
                />
              )}
              {
                control.controlType === 'INPUT' && (
                  // default to input
                  <Input
                    key={control.control.name}
                    handleChange={handleControlChange}
                    labelCopy={control.control.labelCopy}
                    name={control.control.name}
                    placeholder={control.control.placeholder}
                    returnType={control.control.returnType}
                    value={values[control.control.name] || control.control.value}
                  />
                )
                // }
              }
            </StyledControlWrap>
          );
        })}
      </fieldset>
    </StyledNewForm>
  );
};
