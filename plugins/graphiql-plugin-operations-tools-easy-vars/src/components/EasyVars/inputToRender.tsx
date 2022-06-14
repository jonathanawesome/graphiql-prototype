import cuid from 'cuid';
import { VariableDefinitionNode } from 'graphql';

/** components */
import { Input } from './Input/Input';
import { List } from './List';
import { SelectInput } from './SelectInput';

/** constants */
import { INPUT_TYPES } from './constants';

/** types */
import { HandleVariableChangeSignature } from './types';

/** utils */
import { defaultInputValue, getReadyEnumValues } from '../../utils';

export const inputToRender = ({
  handleVariableChange,
  isList,
  typeNameValue,
  variableDefinition,
}: {
  handleVariableChange: HandleVariableChangeSignature;
  isList: boolean;
  typeNameValue: string;
  variableDefinition: VariableDefinitionNode;
}) => {
  const name = variableDefinition.variable.name.value;

  let inputToRender: React.ReactElement;
  if (isList) {
    // rendering a List
    inputToRender = (
      <List
        handleVariableChange={handleVariableChange}
        variableName={variableDefinition.variable.name.value}
        typeNameValue={typeNameValue}
      />
    );
  } else if (typeNameValue === 'Boolean') {
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
  } else if (INPUT_TYPES.includes(typeNameValue)) {
    inputToRender = (
      <Input
        defaultValue={defaultInputValue({ typeNameAsString: typeNameValue })}
        handleVariableChange={handleVariableChange}
        id={cuid.slug()}
        variableName={variableDefinition.variable.name.value}
      />
    );
  } else {
    // it's an enum, let's setup the SelectInput
    inputToRender = (
      <SelectInput
        handleVariableChange={handleVariableChange}
        id={cuid.slug()}
        variableName={name}
        values={
          getReadyEnumValues({
            enumTypeName: typeNameValue,
          }) || []
        }
      />
    );
  }

  return inputToRender;
};
