import React, { useState } from 'react';
import cuid from 'cuid';

/** components */
import { Close } from '@graphiql-v2-prototype/graphiql-ui-library';
import { Input } from '../Input';
import { SelectInput } from '../SelectInput';

/** constants */
import { INPUT_TYPES } from '../constants';

/** styles */
import { AddItemButton, RemoveItemButton, StyledList, StyledListItem } from './styles';

/** types */
import { HandleVariableChangeSignature } from '../types';

/** utils */
import { defaultInputValue, getReadyEnumValues } from '../../../utils';

export const List = ({
  handleVariableChange,
  variableName,
  typeNameValue,
}: {
  handleVariableChange: HandleVariableChangeSignature;
  variableName: string;
  typeNameValue: string;
}) => {
  const [listItems, setListItems] = useState<
    Array<{ id: string; component: React.ReactElement }>
  >([]);

  console.log('rendering List', {
    variableName,
    listItems,
  });

  const handleAddItem = () => {
    if (INPUT_TYPES.includes(typeNameValue)) {
      setListItems((listItems) => [
        ...listItems,
        {
          id: cuid.slug(),
          component: (
            <Input
              defaultValue={defaultInputValue({
                typeNameAsString: typeNameValue,
              })}
              handleVariableChange={handleVariableChange}
              id={cuid.slug()}
              variableName={variableName}
            />
          ),
        },
      ]);
    } else if (typeNameValue === 'Boolean') {
      setListItems((listItems) => [
        ...listItems,
        {
          id: cuid.slug(),
          component: (
            <SelectInput
              handleVariableChange={handleVariableChange}
              id={cuid.slug()}
              variableName={variableName}
              values={[
                {
                  value: 'true',
                  name: 'True',
                },
                {
                  value: 'false',
                  name: 'False',
                },
              ]}
            />
          ),
        },
      ]);
    } else {
      setListItems((listItems) => [
        ...listItems,
        {
          id: cuid.slug(),
          component: (
            <SelectInput
              handleVariableChange={handleVariableChange}
              id={cuid.slug()}
              variableName={variableName}
              values={
                getReadyEnumValues({
                  enumTypeName: typeNameValue,
                }) || []
              }
            />
          ),
        },
      ]);
    }
  };

  // if (isEnumType(unwrappedInputType)) {
  //   // it's an enum, let's setup the SelectInput
  //   const values = unwrappedInputType.getValues().map((val) => ({
  //     value: val.value,
  //     name: val.name,
  //     description: val.description || undefined,
  //   }));

  //   setListItems((listItems) => [
  //     ...listItems,
  //     {
  //       id: cuid.slug(),
  //       component: (
  //         <SelectInput
  //           handleVariableChange={handleVariableChange}
  //           id={cuid.slug()}
  //           variableName={variableName}
  //           values={values}
  //         />
  //       ),
  //     },
  //   ]);
  // } else if (
  //   isScalarType(unwrappedInputType) &&
  //   unwrappedInputType.name === 'Boolean'
  // ) {
  //   setListItems((listItems) => [
  //     ...listItems,
  //     {
  //       id: cuid.slug(),
  //       component: (
  //         <SelectInput
  //           handleVariableChange={handleVariableChange}
  //           id={cuid.slug()}
  //           variableName={variableName}
  //           values={[
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
  //   const defaultValue = defaultInputValue({
  //     typeNameAsString: unwrappedInputType.name,
  //   });

  //   setListItems((listItems) => [
  //     ...listItems,
  //     {
  //       id: cuid.slug(),
  //       component: (
  //         <Input
  //           defaultValue={defaultValue}
  //           handleVariableChange={handleVariableChange}
  //           id={cuid.slug()}
  //           variableName={variableName}
  //         />
  //       ),
  //     },
  //   ]);
  // }
  // };

  const handleRemoveItem = ({ id }: { id: string }) => {
    return setListItems((listItems) => listItems.filter((item) => item.id !== id));
  };

  return (
    <StyledList>
      {listItems.length > 0 &&
        listItems.map((l) => (
          <StyledListItem key={`${l.id}`}>
            <RemoveItemButton onClick={() => handleRemoveItem({ id: l.id })}>
              <Close />
            </RemoveItemButton>
            {l.component}
          </StyledListItem>
        ))}
      <AddItemButton onClick={() => handleAddItem()}>{`Add ${
        listItems.length > 0 ? 'another' : ''
      } ${typeNameValue} +`}</AddItemButton>
    </StyledList>
  );
};
