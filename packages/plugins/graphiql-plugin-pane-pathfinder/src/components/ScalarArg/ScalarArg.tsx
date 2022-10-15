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
import {
  // AncestorMap,
  AncestorsArray,
} from '../../hooks';
import { useEditor } from '@graphiql-prototype/store';

// styles
import { StyledContainer, StyledError, StyledScalarArgWrap } from './styles';

// utils
import {
  unwrapType,
  getEnumValues,
  parseOutgoingVariableValue,
  parseIncomingVariableValue,
} from '@graphiql-prototype/utils';
import { validateInputValue } from './utils';

export const ScalarArg = ({
  ancestors,
  argument,
  // operationType,
  onInputType,
}: {
  // ancestors: AncestorMap;
  ancestors: AncestorsArray;
  argument: GraphQLArgument;
  onInputType: string | null;
  // operationType: OperationTypeNode;
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

  const [isTouched, setIsTouched] = useState<boolean>(false);

  const ancestor = ancestors.values().next().value;

  const isSelected = !!ancestor.selection;

  const argumentName = argument.name;

  const { activeVariables, updateVariable } = useEditor();

  const typeName = unwrapType(argument.type).toString();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange: HandleChangeSignature = ({ name, value }) => {
    setInputValue(value as string | string[]);
  };

  const isRequired = isRequiredArgument(argument) || isRequiredInputField(argument);

  // console.log('ScalarArg', {
  //   argumentName,
  //   onInputType,
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
        vars.hasOwnProperty(onInputType) &&
        vars[onInputType].hasOwnProperty(argumentName)
      ) {
        val = parseIncomingVariableValue(vars[onInputType][argumentName]);
      } else {
      }
    } else {
      if (vars && vars.hasOwnProperty(argumentName)) {
        val = parseIncomingVariableValue(vars[argumentName]);
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

    if (isTouched) {
      validateInputValue({
        inputValue,
        setError,
        typeNameValue: unwrappedType.toString(),
      });

      updateVariable({
        onInputObject: onInputType || undefined,
        variableName: argumentName,
        variableValue: parseOutgoingVariableValue({
          typeNameValue: baseType.toString(),
          value: inputValue,
        }),
      });
    }

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
            name: onInputType ? `${onInputType}-${argumentName}` : argumentName,
            options: [
              { name: 'true', value: 'true' },
              { name: 'false', value: 'false' },
            ],
            placeholder: 'Boolean',
            value: inputValue,
          }}
          labelAddon={isRequired && <Tag copy={`R`} title={`Required`} type="ERROR" />}
          labelCopy={argumentName}
          list={true}
        />
      );
    } else if (isEnumType(unwrappedType)) {
      toRender = (
        <Control
          control={{
            controlType: 'SELECT',
            handleChange,
            name: onInputType ? `${onInputType}-${argumentName}` : argumentName,
            options:
              getEnumValues({
                enumTypeName: typeName,
              }) || [],
            placeholder: typeName,
            value: inputValue,
          }}
          labelAddon={isRequired && <Tag copy={`R`} title={`Required`} type="ERROR" />}
          labelCopy={argumentName}
          list={true}
        />
      );
    } else {
      toRender = (
        <Control
          control={{
            controlType: 'INPUT',
            handleChange,
            name: onInputType ? `${onInputType}-${argumentName}` : argumentName,
            placeholder: typeName,
            value: inputValue,
          }}
          labelAddon={isRequired && <Tag copy={`R`} title={`Required`} type="ERROR" />}
          labelCopy={argumentName}
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
          name: onInputType ? `${onInputType}-${argumentName}` : argumentName,
          options:
            getEnumValues({
              enumTypeName: unwrappedType.name,
            }) || [],
          placeholder: unwrappedType.name,
          value: inputValue,
        }}
        labelAddon={isRequired && <Tag copy={`R`} title={`Required`} type="ERROR" />}
        labelCopy={argumentName}
        list={false}
      />
    );
  } else if (typeName === 'Boolean') {
    toRender = (
      <Control
        control={{
          controlType: 'SELECT',
          handleChange,
          name: onInputType ? `${onInputType}-${argumentName}` : argumentName,
          options: [
            { name: 'true', value: 'true' },
            { name: 'false', value: 'false' },
          ],
          placeholder: 'Boolean',
          value: inputValue,
        }}
        labelAddon={isRequired && <Tag copy={`R`} title={`Required`} type="ERROR" />}
        labelCopy={argumentName}
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
          name: onInputType ? `${onInputType}-${argumentName}` : argumentName,
          placeholder: argument.type.toString(),
          value: inputValue,
        }}
        labelAddon={isRequired && <Tag copy={`R`} title={`Required`} type="ERROR" />}
        labelCopy={argumentName}
        list={false}
      />
    );
  }

  return (
    <StyledScalarArgWrap onFocus={() => setIsTouched(true)}>
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
            // operationType={operationType}
            variant={`ARGUMENT`}
          />
        )}
        {toRender}
      </StyledContainer>
      {error && <StyledError>{error}</StyledError>}
    </StyledScalarArgWrap>
  );
};
