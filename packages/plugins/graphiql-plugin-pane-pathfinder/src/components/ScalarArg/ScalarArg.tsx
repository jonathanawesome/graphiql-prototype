import { useEffect, useState } from 'react';
import {
  GraphQLArgument,
  isEnumType,
  isListType,
  isNonNullType,
  isRequiredArgument,
  isRequiredInputField,
  OperationTypeNode,
} from 'graphql';

// components
import { Control, HandleChangeSignature, Tag } from '@graphiql-prototype/ui-library';
import { Toggler } from '../Toggler';

// hooks
import { AncestorMap } from '../../hooks';
import { useEditor } from '@graphiql-prototype/use-editor';

// styles
import { StyledContainer, StyledError, StyledScalarArgWrap } from './styles';

// utils
import {
  unwrapType,
  getEnumValues,
  parseOutgoingVariableValue,
  parseIncomingVariableValue,
} from '@graphiql-prototype/utils';
import { generateVariableNameFromAncestorMap } from '../../utils';
import { validateInputValue } from './utils';

export const ScalarArg = ({
  ancestors,
  argument,
  onInputType,
  operationType,
}: {
  ancestors: AncestorMap;
  argument: GraphQLArgument;
  onInputType: boolean;
  operationType: OperationTypeNode;
}) => {
  let baseType = argument.type;

  if (isNonNullType(argument.type)) {
    baseType = argument.type.ofType;
  }

  const unwrappedType = unwrapType(baseType);

  // using simple state here to track the value of our argument/input field
  // if it's a list, it'll be a string array
  // if it's not a list, it's a string
  const [inputValue, setInputValue] = useState<string | string[]>(
    isListType(baseType) ? [] : ``
  );

  const [error, setError] = useState<string | null>(null);

  const ancestor = ancestors.values().next().value;

  const isSelected = !!ancestor.selection;

  const variableName = `${generateVariableNameFromAncestorMap({
    ancestors,
    variableType: 'ARGUMENT',
  })}`;

  const { activeVariables, updateVariable } = useEditor();

  const typeName = unwrapType(argument.type).toString();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange: HandleChangeSignature = ({ name, value }) => {
    setInputValue(value as string | string[]);
  };

  const isRequired = isRequiredArgument(argument) || isRequiredInputField(argument);

  // console.log('ScalarArg', {
  //   ancestor,
  //   variableName,
  //   inputValue,
  // });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let vars: Record<any, any> = {};
    let val: string | string[] = isListType(baseType) ? [] : ``;
    try {
      vars = JSON.parse(activeVariables);
    } catch (e) {
      // console.warn(e);
      // return here so we don't muck with existing values when the incoming variables object doesn't pass parse
      return undefined;
    }

    if (onInputType) {
      if (
        vars &&
        vars.hasOwnProperty(variableName) &&
        vars[variableName].hasOwnProperty(argument.name)
      ) {
        val = parseIncomingVariableValue(vars[variableName][argument.name]);
      } else {
      }
    } else {
      if (vars && vars.hasOwnProperty(variableName)) {
        val = parseIncomingVariableValue(vars[variableName]);
      } else {
      }
    }

    return setInputValue(val);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVariables]);

  useEffect(() => {
    // clear errors if input is empty
    if (inputValue.length === 0) {
      setError(null);
    }

    if (inputValue.length > 0) {
      validateInputValue({
        inputValue,
        setError,
        typeNameValue: unwrappedType.toString(),
      });

      updateVariable({
        onInputObject: onInputType ? variableName : undefined,
        variableName: onInputType ? argument.name : variableName,
        variableValue: parseOutgoingVariableValue({
          typeNameValue: baseType.toString(),
          value: inputValue,
        }),
      });
    }

    // TODO: 👇 this code will automatically remove variables from the editor when their value is empty, which is not ideal for variable-editor users
    // if (isTouched && inputValue.length === 0) {
    //   updateVariable({
    //     onInputObject: onInputType ? variableName : undefined,
    //     variableName: onInputType ? argument.name : variableName,
    //     variableValue: '',
    //   });
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  let toRender: React.ReactElement = <></>;

  if (isListType(baseType)) {
    if (unwrappedType.toString() === 'Boolean') {
      toRender = (
        <Control
          control={{
            controlType: 'SELECT',
            handleChange,
            name: variableName,
            options: [
              { name: 'true', value: 'true' },
              { name: 'false', value: 'false' },
            ],
            placeholder: 'Boolean',
            value: inputValue,
            variant: onInputType ? 'INPUT_FIELD' : 'ARGUMENT',
          }}
          labelAddon={isRequired && <Tag copy={`R`} title={`Required`} type="ERROR" />}
          labelCopy={argument.name}
          list={true}
        />
      );
    } else if (isEnumType(unwrappedType)) {
      toRender = (
        <Control
          control={{
            controlType: 'SELECT',
            handleChange,
            name: variableName,
            options:
              getEnumValues({
                enumTypeName: typeName,
              }) || [],
            placeholder: typeName,
            value: inputValue,
            variant: onInputType ? 'INPUT_FIELD' : 'ARGUMENT',
          }}
          labelAddon={isRequired && <Tag copy={`R`} title={`Required`} type="ERROR" />}
          labelCopy={argument.name}
          list={true}
        />
      );
    } else {
      toRender = (
        <Control
          control={{
            controlType: 'INPUT',
            handleChange,
            name: variableName,
            placeholder: typeName,
            value: inputValue,
            variant: onInputType ? 'INPUT_FIELD' : 'ARGUMENT',
          }}
          labelAddon={isRequired && <Tag copy={`R`} title={`Required`} type="ERROR" />}
          labelCopy={argument.name}
          list={true}
        />
      );
    }
  } else if (isEnumType(unwrappedType)) {
    toRender = (
      <Control
        control={{
          controlType: 'SELECT',
          handleChange,
          name: variableName,
          options:
            getEnumValues({
              enumTypeName: unwrappedType.name,
            }) || [],
          placeholder: unwrappedType.name,
          value: inputValue,
          variant: onInputType ? 'INPUT_FIELD' : 'ARGUMENT',
        }}
        labelAddon={isRequired && <Tag copy={`R`} title={`Required`} type="ERROR" />}
        labelCopy={argument.name}
        list={false}
      />
    );
  } else if (typeName === 'Boolean') {
    toRender = (
      <Control
        control={{
          controlType: 'SELECT',
          handleChange,
          name: variableName,
          options: [
            { name: 'true', value: 'true' },
            { name: 'false', value: 'false' },
          ],
          placeholder: 'Boolean',
          value: inputValue,
          variant: onInputType ? 'INPUT_FIELD' : 'ARGUMENT',
        }}
        labelAddon={isRequired && <Tag copy={`R`} title={`Required`} type="ERROR" />}
        labelCopy={argument.name}
        list={false}
      />
    );
  } else {
    // default to input string
    toRender = (
      <Control
        control={{
          controlType: 'INPUT',
          handleChange,
          name: variableName,
          placeholder: argument.type.toString(),
          value: inputValue,
          variant: onInputType ? 'INPUT_FIELD' : 'ARGUMENT',
        }}
        labelAddon={isRequired && <Tag copy={`R`} title={`Required`} type="ERROR" />}
        labelCopy={argument.name}
        list={false}
      />
    );
  }

  return (
    <StyledScalarArgWrap>
      {/* this bit's here to warn when this argument's type is not a built-in scalar or an enum. users should have the ability to pass in handlers for custom scalars */}
      {!['String', 'ID', 'Int', 'Float', 'Boolean'].includes(typeName) &&
        !isEnumType(unwrapType(argument.type)) && (
          <StyledError>
            The scalar type for this argument is not being handled
          </StyledError>
        )}
      <StyledContainer>
        {!onInputType && (
          <Toggler
            ancestors={ancestors}
            isSelected={!!isSelected}
            operationType={operationType}
            variant={`ARGUMENT`}
          />
        )}
        {toRender}
      </StyledContainer>
      {error && <StyledError>{error}</StyledError>}
    </StyledScalarArgWrap>
  );
};
