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

// hooks
import {
  AncestorArgument,
  AncestorInputField,
  AncestorMap,
  usePathfinder,
} from '../../hooks';
import { useEditor } from '@graphiql-prototype/use-editor';

// styles
import { StyledScalarArgWrap, StyledError } from './styles';

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
  operationType,
}: {
  ancestors: AncestorMap;
  argument: GraphQLArgument;
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

  const [isTouched, setIsTouched] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const ancestor = ancestors.values().next().value as
    | AncestorArgument
    | AncestorInputField;

  const variableName = `${generateVariableNameFromAncestorMap({
    ancestors,
    variableType: 'inputField' in ancestor ? 'INPUT_FIELD' : 'ARGUMENT',
  })}`;

  const { toggle } = usePathfinder();

  const { activeVariables, getActiveTab, updateVariable } = useEditor();

  const activeEditorTab = getActiveTab();

  const variableDefinitions = activeEditorTab?.operationDefinition?.variableDefinitions;

  const variableDefinitionIsActive = variableDefinitions?.find(
    (vD) => vD.variable.name.value === variableName
  );

  const typeName = unwrapType(argument.type).toString();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange: HandleChangeSignature = ({ name, value }) => {
    setInputValue(value as string | string[]);
  };

  const isRequired = isRequiredArgument(argument) || isRequiredInputField(argument);

  // console.log('ScalarArg', {
  //   argument,
  //   ancestors,
  //   variableName,
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

    if ('parentInputObject' in ancestor) {
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

    if (variableDefinitionIsActive === undefined && inputValue.length > 0) {
      toggle({ ancestors, operationType });
    }

    if (variableDefinitionIsActive && isTouched && inputValue.length < 1) {
      toggle({ ancestors, operationType });
    }

    if (inputValue.length > 0) {
      validateInputValue({
        inputValue,
        setError,
        typeNameValue: unwrappedType.toString(),
      });

      updateVariable({
        onInputObject: 'parentInputObject' in ancestor ? variableName : undefined,
        variableName: 'parentInputObject' in ancestor ? argument.name : variableName,
        variableValue: parseOutgoingVariableValue({
          typeNameValue: baseType.toString(),
          value: inputValue,
        }),
      });
    }

    // TODO: 👇 this code will automatically remove variables from the editor when their value is empty, which is not ideal for variable-editor users
    // if (isTouched && inputValue.length === 0) {
    //   updateVariable({
    //     onInputObject: 'parentInputObject' in ancestor ? variableName : undefined,
    //     variableName: 'parentInputObject' in ancestor ? argument.name : variableName,
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
            variant: 'parentInputObject' in ancestor ? 'INPUT_FIELD' : 'ARGUMENT',
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
            variant: 'parentInputObject' in ancestor ? 'INPUT_FIELD' : 'ARGUMENT',
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
            variant: 'parentInputObject' in ancestor ? 'INPUT_FIELD' : 'ARGUMENT',
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
          variant: 'parentInputObject' in ancestor ? 'INPUT_FIELD' : 'ARGUMENT',
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
          variant: 'parentInputObject' in ancestor ? 'INPUT_FIELD' : 'ARGUMENT',
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
          variant: 'parentInputObject' in ancestor ? 'INPUT_FIELD' : 'ARGUMENT',
        }}
        labelAddon={isRequired && <Tag copy={`R`} title={`Required`} type="ERROR" />}
        labelCopy={argument.name}
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
      {toRender}
      {error && <StyledError>{error}</StyledError>}
    </StyledScalarArgWrap>
  );
};
