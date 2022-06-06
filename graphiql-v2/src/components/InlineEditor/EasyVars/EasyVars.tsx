import { useEffect, useState } from 'react';
import {
  GraphQLEnumType,
  GraphQLInputType,
  isEnumType,
  isListType,
  isNonNullType,
  isScalarType,
} from 'graphql';

/** components */
import { Input } from './Input';
import { List } from './List';
import { SelectInput } from './SelectInput';

/** hooks */
import type { EasyVar as EV, EasyVars as EVs } from '../../../hooks';
import { useGraphiQL } from '../../../hooks';

/** styles */
import { EasyVarStyled, EasyVarsStyled, Name, NameAndType, Type } from './styles';

/** utils */
import { unwrapInputType } from '../../../utils';

export const unwrapNonNull = ({ type }: { type: GraphQLInputType }) => {
  if (isNonNullType(type)) {
    return type.ofType;
  } else {
    return type;
  }
};

export const defaultInputValue = ({ typeNameAsString }: { typeNameAsString: string }) => {
  console.log('typeNameAsString', typeNameAsString);
  switch (typeNameAsString) {
    case 'Float':
      return '1.23';
    case 'Int':
      return '123';
    case 'ID':
      return 'cl3mbj6ta002z3e0wfn017z27';
    case 'String':
      return 'meowwoof';
    default:
      return 'Whoops...';
  }
};

const inputToRender = ({
  easyVar,
  handleVariableChange,
}: {
  easyVar: EV;
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
        // unwrappedTypeName={unwrappedInputType.name}
      />
    );
  }
  return inputToRender;
};

const updateVariable = useGraphiQL.getState().updateVariable;

type HandleVariableChange = {
  id: string;
  value: string;
  variableName: string;
};

export type HandleVariableChangeSignature = ({
  id,
  value,
  variableName,
}: HandleVariableChange) => void;

const EasyVar = ({ easyVar }: { easyVar: EV }) => {
  // console.log('rendering easyVar', { easyVar });

  const [newVariableListValue, setNewVariableListValue] = useState<
    Array<HandleVariableChange>
  >([]);

  console.log('value in EasyVar', {
    newVariableListValue,
    easyVarType: easyVar.variableType,
  });

  const handleVariableChange = ({ id, value, variableName }: HandleVariableChange) => {
    if (isListType(easyVar.variableType)) {
      setNewVariableListValue((previousListItems) => {
        if (previousListItems.length === 0) {
          return [{ id, value, variableName }];
        } else {
          const copy = [...previousListItems];
          const existingValue = copy.findIndex((x) => x.id === id);
          console.log('copy', { copy });
          if (existingValue !== -1) {
            // if argument exists, replace it
            copy[existingValue] = { id, value, variableName };
            return copy;
          } else {
            return [...previousListItems, { id, value, variableName }];
          }
        }
      });
    } else {
      updateVariable({ variableName: easyVar.variableName, variableValue: value });
    }
  };

  useEffect(() => {
    // updateVariable({
    //   variableName: easyVar.variableName,
    //   variableValue: newVariableListValue,
    // });
  }, [newVariableListValue]);

  return (
    <EasyVarStyled>
      <NameAndType>
        <Name>{easyVar.variableName}</Name>
        <Type>{easyVar.argument.type.toString()}</Type>
      </NameAndType>
      {inputToRender({ easyVar, handleVariableChange })}
    </EasyVarStyled>
  );
};

export const EasyVars = ({ easyVars }: { easyVars: EVs }) => {
  console.log('easyVars', easyVars);
  return (
    <EasyVarsStyled>
      {easyVars.map((v) => (
        <EasyVar key={v.variableName} easyVar={v} />
      ))}
    </EasyVarsStyled>
  );
};
