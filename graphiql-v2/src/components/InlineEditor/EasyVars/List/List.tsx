import React, { useState } from 'react';
import cuid from 'cuid';
import { GraphQLNamedType, isEnumType, isScalarType } from 'graphql';
import { styled } from '../../../../theme';

/** components */
import { Input } from '../Input';
import { SelectInput } from '../SelectInput';

/** types */
import { HandleVariableChangeSignature } from '../types';

/** utils */
import { defaultInputValue } from '../../../../utils';

const StyledList = styled('div', {
  width: '100%',
  padding: '4px 0',
});

const StyledListItem = styled('div', {
  borderBottom: '1px solid $scale400 !important',
  marginBottom: '4px !important',
});

const AddItemButton = styled('button', {
  width: '100%',
  textAlign: 'right',
  padding: '4px 0',
  fontSize: '$mini',
  color: '$scale700',
});

export const List = ({
  handleVariableChange,
  variableName,
  unwrappedInputType,
}: {
  handleVariableChange: HandleVariableChangeSignature;
  variableName: string;
  unwrappedInputType: GraphQLNamedType;
}) => {
  // console.log('rendering List', {
  //   variableName,
  //   unwrappedInputType,
  // });
  const [listItems, setListItems] = useState<React.ReactElement[]>([]);

  const handleAddItem = () => {
    if (isEnumType(unwrappedInputType)) {
      // it's an enum, let's setup the SelectInput
      const values = unwrappedInputType.getValues().map((val) => ({
        value: val.value,
        name: val.name,
        description: val.description || undefined,
      }));

      setListItems((listItems) => [
        ...listItems,
        <SelectInput
          handleVariableChange={handleVariableChange}
          id={cuid.slug()}
          onList={true}
          variableName={variableName}
          values={values}
        />,
      ]);
    } else if (
      isScalarType(unwrappedInputType) &&
      unwrappedInputType.name === 'Boolean'
    ) {
      setListItems((listItems) => [
        ...listItems,
        <SelectInput
          handleVariableChange={handleVariableChange}
          id={cuid.slug()}
          onList={true}
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
        />,
      ]);
    } else {
      const defaultValue = defaultInputValue({
        typeNameAsString: unwrappedInputType.name,
      });

      setListItems((listItems) => [
        ...listItems,
        <Input
          defaultValue={defaultValue}
          handleVariableChange={handleVariableChange}
          id={cuid.slug()}
          onList={true}
          variableName={variableName}
        />,
      ]);
    }
  };

  return (
    <StyledList>
      {listItems.length > 0 &&
        listItems.map((l, index) => (
          <StyledListItem key={`${l.key}-${index}`}>{l}</StyledListItem>
        ))}
      <AddItemButton onClick={() => handleAddItem()}>{`Add ${
        listItems.length > 0 ? 'another' : ''
      } ${unwrappedInputType.name} +`}</AddItemButton>
    </StyledList>
  );
};
