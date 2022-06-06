import {
  isListType,
  isNonNullType,
  isEnumType,
  GraphQLEnumType,
  isScalarType,
} from 'graphql';

/** components */
import { Input } from './Input/Input';
import { List } from './List';
import { SelectInput } from './SelectInput';

/** types */
import { HandleVariableChangeSignature } from './types';
import type { EasyVar } from '../../../hooks';

/** utils */
import { unwrapInputType, defaultInputValue } from '../../../utils';

export const inputToRender = ({
  easyVar,
  handleVariableChange,
}: {
  easyVar: EasyVar;
  handleVariableChange: HandleVariableChangeSignature;
}) => {
  const unwrappedInputType = unwrapInputType({ inputType: easyVar.variableType });
  const name = easyVar.variableName;

  let inputToRender: React.ReactElement;
  if (
    isListType(easyVar.variableType) ||
    (isNonNullType(easyVar.variableType) && isListType(easyVar.variableType.ofType))
  ) {
    // rendering a List
    inputToRender = (
      <List
        handleVariableChange={handleVariableChange}
        variableName={easyVar.variableName}
        unwrappedInputType={unwrappedInputType}
      />
    );
  } else if (
    isEnumType(easyVar.variableType) ||
    (isNonNullType(easyVar.variableType) && isEnumType(easyVar.variableType.ofType))
  ) {
    // it's an enum, let's setup the SelectInput
    const values = (easyVar.variableType as GraphQLEnumType).getValues();
    inputToRender = (
      <SelectInput
        handleVariableChange={handleVariableChange}
        variableName={name}
        values={values.map((val) => ({
          value: val.value,
          name: val.name,
          description: val.description || undefined,
        }))}
      />
    );
  } else if (
    isScalarType(easyVar.variableType) &&
    easyVar.variableType.name === 'Boolean'
  ) {
    // we want to show a SelectInput for Boolean scalars
    inputToRender = (
      <SelectInput
        handleVariableChange={handleVariableChange}
        variableName={name}
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
    );
  } else {
    inputToRender = (
      <Input
        defaultValue={defaultInputValue({ typeNameAsString: unwrappedInputType.name })}
        handleVariableChange={handleVariableChange}
        variableName={easyVar.variableName}
      />
    );
  }
  return inputToRender;
};
