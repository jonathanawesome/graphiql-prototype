import { useEffect, useState } from 'react';
import {
  GraphQLArgument,
  isEnumType,
  isListType,
  isNonNullType,
  isRequiredArgument,
  isRequiredInputField,
  isScalarType,
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
} from '@graphiql-prototype/utils';
import { generateVariableNameFromAncestorMap, unwrapInputType } from '../../utils';
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
  let workingType = argument.type;

  if (isNonNullType(argument.type)) {
    workingType = argument.type.ofType;
  }

  const unwrappedType = unwrapType(workingType);

  // using simple state here to track the value of our argument/input field
  // if it's a list, it'll be a string array
  // if it's not a list, it's a string
  const [inputValue, setInputValue] = useState<string | string[]>(
    isListType(workingType) ? [] : ``
  );

  const [variableValue, setVariableValue] = useState<
    string | number | (string | number)[]
  >(``);

  const [error, setError] = useState<string | null>(null);

  const ancestor = ancestors.values().next().value as
    | AncestorArgument
    | AncestorInputField;

  const variableName = `${generateVariableNameFromAncestorMap({
    ancestors,
    variableType: 'inputField' in ancestor ? 'INPUT_FIELD' : 'ARGUMENT',
  })}`;

  // const isSelected = !!ancestor.selection;

  // const [variableIsSet, setVariableIsSet] = useState<boolean>(false);

  const { toggle } = usePathfinder();

  const {
    updateVariable,
    // getVariables,
    removeVariables,
  } = useEditor();

  const activeEditorTab = useEditor().getActiveTab();

  const variableDefinitions = activeEditorTab?.operationDefinition?.variableDefinitions;

  const variableDefinitionIsActive = variableDefinitions?.find(
    (vD) => vD.variable.name.value === variableName
  );

  const typeName = unwrapType(argument.type).toString();

  // const variableisActive = Object.keys(getVariables().m)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange: HandleChangeSignature = ({ name, value }) => {
    setInputValue(value);
  };

  const isRequired = isRequiredArgument(argument) || isRequiredInputField(argument);

  console.log('ScalarArg', {
    name: argument.name,
    isRequired: isRequiredArgument(argument) || isRequiredInputField(argument),
    // workingType,
    // unwrappedType,
    argument,
    // ancestor,
    // inputValue,
    variableDefinitionIsActive,
    variableDefinitions,
    // variableName,
    // isEnumType: isEnumType(unwrapType(argument.type)),
    // vairables: getVariables(),
    // variableDefinitions,
  });

  useEffect(() => {
    // we don't have a variable definition AND there's some value in the input, so we should add the variable definition by calling toggle
    if (!variableDefinitionIsActive && inputValue.length > 0) {
      toggle({ ancestors, operationType });
    }

    // we have a variable definition and a value to do something with
    if (variableDefinitionIsActive && inputValue.length > 0) {
      // if we're on an input field and the variable exists, do not toggle
      // toggle({ ancestors, operationType });
    }

    // we have a variable definition and the input is empty
    // we should toggle to remove the variable definition, remove the variable
    if (variableDefinitionIsActive && inputValue.length === 0) {
      toggle({ ancestors, operationType });
      removeVariables({
        onInputObject: 'parentInputObject' in ancestor ? variableName : undefined,
        variableNames: ['parentInputObject' in ancestor ? argument.name : variableName],
      });
    }

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
        onInputObject: 'parentInputObject' in ancestor ? variableName : undefined,
        variableName: 'parentInputObject' in ancestor ? argument.name : variableName,
        variableValue: parseOutgoingVariableValue({
          typeNameValue: workingType.toString(),
          value: inputValue,
        }),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  let toRender: React.ReactElement = <></>;

  if (isListType(workingType)) {
    if (unwrappedType.toString() === 'Boolean') {
      toRender = (
        <Control
          control={{
            controlType: 'SELECT',
            handleChange,
            name: argument.name,
            options: [
              { name: 'True', value: 'true' },
              { name: 'False', value: 'false' },
            ],
            placeholder: 'Boolean',
            value: inputValue,
            variant: 'parentInputObject' in ancestor ? 'INPUT_FIELD' : 'ARGUMENT',
          }}
          labelAddon={isRequired && <Tag copy={`R`} type="ERROR" />}
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
            name: argument.name,
            options:
              getEnumValues({
                enumTypeName: typeName,
              }) || [],
            placeholder: typeName,
            value: inputValue,
            variant: 'parentInputObject' in ancestor ? 'INPUT_FIELD' : 'ARGUMENT',
          }}
          labelAddon={isRequired && <Tag copy={`R`} type="ERROR" />}
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
            name: argument.name,
            placeholder: typeName,
            value: inputValue,
            variant: 'parentInputObject' in ancestor ? 'INPUT_FIELD' : 'ARGUMENT',
          }}
          labelAddon={isRequired && <Tag copy={`R`} type="ERROR" />}
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
          name: argument.name,
          options:
            getEnumValues({
              enumTypeName: unwrappedType.name,
            }) || [],
          placeholder: unwrappedType.name,
          value: inputValue,
          variant: 'parentInputObject' in ancestor ? 'INPUT_FIELD' : 'ARGUMENT',
        }}
        labelAddon={isRequired && <Tag copy={`R`} type="ERROR" />}
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
          name: argument.name,
          options: [
            { name: 'True', value: 'true' },
            { name: 'False', value: 'false' },
          ],
          placeholder: 'Boolean',
          value: inputValue,
          variant: 'parentInputObject' in ancestor ? 'INPUT_FIELD' : 'ARGUMENT',
        }}
        labelAddon={isRequired && <Tag copy={`R`} type="ERROR" />}
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
          name: argument.name,
          placeholder: argument.type.toString(),
          value: inputValue,
          variant: 'parentInputObject' in ancestor ? 'INPUT_FIELD' : 'ARGUMENT',
        }}
        labelAddon={isRequired && <Tag copy={`R`} type="ERROR" />}
        labelCopy={argument.name}
        list={false}
      />
      // <ListItem
      //   isSelected={isSelected}
      //   toggler={{
      //     ancestors,
      //     fieldOrArgumentName: argument.name,
      //     isSelected,
      //     operationType,
      //     variant: 'ARGUMENT',
      //   }}
      //   type={argument}
      //   variant="ARGUMENT"
      // />
    );
  }

  return (
    <StyledScalarArgWrap>
      {/* this components exists to warn when this argument's type is not a built-in scalar or an enum. users should have the ability to pass in handlers for custom scalars */}
      {!['String', 'ID', 'Int', 'Float', 'Boolean'].includes(typeName) &&
        !isEnumType(unwrapType(argument.type)) && (
          <StyledError>
            The scalar type for this argument is not being handled
          </StyledError>
        )}
      {toRender}
      {/* <div>{variableName}</div> */}
      {error && <StyledError>{error}</StyledError>}
      {/* <div>type:{typeName}</div> */}
    </StyledScalarArgWrap>
  );
};
