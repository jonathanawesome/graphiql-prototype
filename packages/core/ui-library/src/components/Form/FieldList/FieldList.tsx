import React, { useEffect, useState } from 'react';
import cuid from 'cuid';

// components
import { Close } from '../../../icons';
import { FieldInput } from '../FieldInput';
import { FieldSelect } from '../FieldSelect';

// styles
import { AddItemButton, RemoveItemButton, StyledList, StyledListItem } from './styles';

// types
import type { FieldListProps, HandleChange } from '../types';

// utils
import { getDefaultInputValue, getEnumValues } from '@graphiql-prototype/utils';

export const FieldList = ({
  handleChange,
  listType,
  name,
  options,
  placeholder,
  // typeNameValue,
  returnType,
  value,
}: FieldListProps) => {
  const [fieldListItems, setFieldListItems] = useState<
    Array<{ name: string; value: string; component: React.ReactElement }>
  >([]);

  console.log('rendering FieldList', { value, fieldListItems });

  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    setFieldListItems(
      value.map((val) => ({
        name: `${name}-${cuid.slug()}`,
        value: val,
        component:
          listType === 'INPUT' ? (
            <FieldInput
              fieldType="TEXT"
              handleChange={handleChange}
              name={name}
              placeholder={placeholder}
              value={val}
            />
          ) : (
            <FieldSelect
              fieldType="SELECT"
              handleChange={handleChange}
              name={name}
              options={options}
              placeholder={placeholder}
              returnType={returnType}
              value={val}
            />
          ),
      }))
    );
    // on mount, if we have existing values for our variable, set the values and add the UI items
    // if (Array.isArray(currentValue)) {
    // currentValue.forEach((cV) => {
    //   const fieldListItemName = `${name}-${cuid.slug()}`;
    //   setValues((prev) => ({ ...prev, [fieldListItemName]: cV }));
    //   handleAddItem({ currentValue: cV, name: fieldListItemName });
    // });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   // on mount, if we have existing values for our variable, set the values and add the UI items
  //   if (Array.isArray(currentValue)) {
  //     currentValue.forEach((cV) => {
  //       const fieldListItemName = `${name}-${cuid.slug()}`;
  //       setValues((prev) => ({ ...prev, [fieldListItemName]: cV }));
  //       handleAddItem({ currentValue: cV, name: fieldListItemName });
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleListChange = ({ name, value }: HandleChange) => {
    // setValues((prev) => ({ ...prev, [name]: value as string }));
  };

  // useEffect(() => {
  //   handleChange({ name, value: Object.values(values).map((v) => v) });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [values]);

  // console.log('rendering FieldList', {
  //   name,
  //   fieldListItems,
  //   currentValue,
  // });

  const handleAddItem = ({ value, name }: { value: string; name: string }) => {
    // if (['ID', 'String', 'Int', 'Float'].includes(typeNameValue)) {
    if (listType === 'INPUT') {
      setFieldListItems((prev) => [
        ...prev,
        {
          name,
          value,
          component: (
            <FieldInput
              fieldType="TEXT"
              handleChange={handleChange}
              name={name}
              placeholder={placeholder}
              value={value}
            />
          ),
        },
      ]);
    }
    if (listType === 'SELECT') {
      setFieldListItems((prev) => [
        ...prev,
        {
          name,
          value,
          component: (
            <FieldSelect
              fieldType="SELECT"
              handleChange={handleChange}
              name={name}
              options={options}
              placeholder={placeholder}
              returnType={returnType}
              value={value}
            />
          ),
        },
      ]);
    }

    // else if (typeNameValue === 'Boolean') {
    //   setFieldListItems((prev) => [
    //     ...prev,
    //     {
    //       name,
    //       component: (
    //         <FieldSelect
    //           currentValue={currentValue || values[name]}
    //           handleChange={handleListChange}
    //           name={name}
    //           options={[
    //             {
    //               value: 'true',
    //               name: 'True',
    //             },
    //             {
    //               value: 'false',
    //               name: 'False',
    //             },
    //           ]}
    //         />
    //       ),
    //     },
    //   ]);
    // } else {
    //   setFieldListItems((prev) => [
    //     ...prev,
    //     {
    //       name,
    //       component: (
    //         <FieldSelect
    //           currentValue={currentValue || values[name]}
    //           handleChange={handleListChange}
    //           name={name}
    //           options={
    //             getEnumValues({
    //               enumTypeName: typeNameValue,
    //             }) || []
    //           }
    //         />
    //       ),
    //     },
    //   ]);
    // }
  };

  const handleRemoveItem = ({ name }: { name: string }) => {
    setFieldListItems((fieldListItems) =>
      fieldListItems.filter((item) => item.name !== name)
    );
    const vals = { ...values };
    delete vals[name];
    // setValues({ ...vals });
  };

  return (
    <StyledList>
      {fieldListItems.length > 0 &&
        fieldListItems.map((l) => (
          <StyledListItem key={`${l.name}`}>
            <RemoveItemButton onClick={() => handleRemoveItem({ name: l.name })}>
              <Close />
            </RemoveItemButton>
            {l.component}
          </StyledListItem>
        ))}
      <AddItemButton
        type="button"
        onClick={() => handleAddItem({ name: `${name}-${cuid.slug()}` })}
      >{`Add ${
        fieldListItems.length > 0 ? 'another' : ''
      } ${returnType} +`}</AddItemButton>
    </StyledList>
  );
};
