import cuid from 'cuid';
import { isListType, isEnumType, isScalarType } from 'graphql';

/** components */
import { Input } from './Input/Input';
import { List } from './List';
import { SelectInput } from './SelectInput';

/** types */
import { HandleVariableChangeSignature } from './types';
import type { EasyVar } from '../../hooks';

/** utils */
import { unwrapInputType, defaultInputValue, unwrapNonNullInputType } from '../../utils';

export const inputToRender = ({
  easyVar,
  handleVariableChange,
}: {
  easyVar: EasyVar;
  handleVariableChange: HandleVariableChangeSignature;
}) => {
  const unwrappedInputType = unwrapInputType({ inputType: easyVar.variableType });
  const unwrappedNonNullType = unwrapNonNullInputType({ type: easyVar.variableType });
  const name = easyVar.variableName;

  let inputToRender: React.ReactElement;
  if (isListType(unwrappedNonNullType)) {
    // rendering a List
    inputToRender = (
      <List
        handleVariableChange={handleVariableChange}
        variableName={easyVar.variableName}
        unwrappedInputType={unwrappedInputType}
      />
    );
  } else if (isEnumType(unwrappedNonNullType)) {
    // it's an enum, let's setup the SelectInput
    const values = unwrappedNonNullType.getValues();
    inputToRender = (
      <SelectInput
        handleVariableChange={handleVariableChange}
        id={cuid.slug()}
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
        id={cuid.slug()}
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
        id={cuid.slug()}
        variableName={easyVar.variableName}
      />
    );
  }
  return inputToRender;
};
