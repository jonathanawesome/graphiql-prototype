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
import { Close } from '../../../icons';

const StyledList = styled('div', {
  width: '100%',
  // height: '100%',
  // padding: '4px 0',
});

const StyledListItem = styled('div', {
  display: 'flex',
  borderBottom: '1px solid $scale400 !important',
  // marginBottom: '4px !important',
});

const RemoveItemButton = styled('button', {
  width: 32,
  textAlign: 'right',
  padding: '8px 8px 8px 0',
  fontSize: '$mini',
  color: '$scale700',
  borderRight: '1px solid $scale300',

  '&:hover': {
    backgroundColor: '$scale200',
    color: '$scale100',
    svg: {
      path: {
        stroke: '$accentError',
      },
    },
  },

  svg: {
    height: 12,
    width: 12,
  },
});

const AddItemButton = styled('button', {
  width: '100%',
  // height: '100%',
  height: 32,

  textAlign: 'right',
  padding: '8px 8px 8px 0',
  fontSize: '$mini',
  color: '$scale700',

  '&:hover': {
    backgroundColor: '$scale200',
    color: '$scale900',
  },
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
  const [listItems, setListItems] = useState<
    Array<{ id: string; component: React.ReactElement }>
  >([]);

  console.log('rendering List', {
    variableName,
    listItems,
  });

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
        {
          id: cuid.slug(),
          component: (
            <SelectInput
              handleVariableChange={handleVariableChange}
              id={cuid.slug()}
              variableName={variableName}
              values={values}
            />
          ),
        },
      ]);
    } else if (
      isScalarType(unwrappedInputType) &&
      unwrappedInputType.name === 'Boolean'
    ) {
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
      const defaultValue = defaultInputValue({
        typeNameAsString: unwrappedInputType.name,
      });

      setListItems((listItems) => [
        ...listItems,
        {
          id: cuid.slug(),
          component: (
            <Input
              defaultValue={defaultValue}
              handleVariableChange={handleVariableChange}
              id={cuid.slug()}
              variableName={variableName}
            />
          ),
        },
      ]);
    }
  };

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
      } ${unwrappedInputType.name} +`}</AddItemButton>
    </StyledList>
  );
};
