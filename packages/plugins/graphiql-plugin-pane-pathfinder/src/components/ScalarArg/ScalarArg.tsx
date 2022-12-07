import { useEffect, useState } from 'react';
import {
  GraphQLArgument,
  GraphQLSchema,
  isEnumType,
  isListType,
  isNonNullType,
  isRequiredArgument,
  isRequiredInputField,
} from 'graphql';

// components
import { Control, HandleChangeSignature, Tag } from '@graphiql-prototype/ui-library';
import { Toggler } from '../Toggler';

// hooks
import { AncestorArgument, AncestorField, AncestorsArray } from '../../hooks';
import { useEditor, useSchema } from '@graphiql-prototype/store';

// styles
import {
  // StyledContainer,
  //  StyledError,
  StyledScalarArgWrap,
} from './styles';

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
  onInputType,
}: {
  ancestors: AncestorsArray;
  argument: GraphQLArgument;
  onInputType: string | null;
}) => {
  const schema = useSchema().schema;

  const variablesModel = useEditor((state) => state.monacoEditors.variables?.getModel());
  const updateVariable = useEditor((state) => state.updateVariable);

  const { selection } = ancestors[ancestors.length - 1] as AncestorArgument;

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

  const { selection: ancestorSelection } = ancestors[
    ancestors.length - 2
  ] as AncestorField;

  const isSelected = !!selection;

  const argumentName = argument.name;

  const typeName = unwrapType(argument.type).toString();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange: HandleChangeSignature = ({ name, value }) => {
    setInputValue(value as string | string[]);
  };

  const isRequired = isRequiredArgument(argument) || isRequiredInputField(argument);

  // console.log('ScalarArg', {
  //   // ancestors,
  //   name: argument.name,
  //   argument,
  //   selection,
  //   typeName,
  //   onInputType,
  // });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let vars: Record<any, any> = {};
    let val: string | string[] = isListType(baseType) ? [] : ``;
    try {
      vars = variablesModel && JSON.parse(variablesModel.getValue());
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
  }, [variablesModel]);

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
                schema: schema as GraphQLSchema,
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
              schema: schema as GraphQLSchema,
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
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={StyledScalarArgWrap({ onInputType: !!onInputType })}
      onFocus={() => setIsTouched(true)}
    >
      {/* this bit's here to warn when this argument's type is not a built-in scalar or an enum. users should have the ability to pass in handlers for custom scalars */}
      {/* {!['String', 'ID', 'Int', 'Float', 'Boolean'].includes(typeName) &&
        !isEnumType(unwrapType(argument.type)) && (
          <StyledError>
            The scalar type for this argument is not being handled
          </StyledError>
        )} */}
      <div className="scalar-arg">
        {!onInputType && (
          <Toggler
            ancestors={ancestors}
            isDisabled={!ancestorSelection}
            isSelected={!!isSelected}
            variant="ARGUMENT"
          />
        )}
        {toRender}
      </div>
      {error && <div className="scalar-arg-error">{error}</div>}
    </div>
  );
};
