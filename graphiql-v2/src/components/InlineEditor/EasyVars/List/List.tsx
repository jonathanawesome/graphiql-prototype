import React, { useState } from 'react';
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
      setListItems((listItems) => [
        ...listItems,
        <Input
          defaultValue={defaultInputValue({
            typeNameAsString: unwrappedInputType.name,
          })}
          handleVariableChange={handleVariableChange}
          onList={true}
          variableName={variableName}
        />,
      ]);
    }
  };

  return (
    <StyledList>
      {listItems.length > 0 &&
        listItems.map((l, index) => <div key={`${l.key}-${index}`}>{l}</div>)}
      <button onClick={() => handleAddItem()}>Add {unwrappedInputType.name} +</button>
    </StyledList>
  );
};
