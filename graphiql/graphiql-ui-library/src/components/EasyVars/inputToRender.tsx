import { GraphQLType, isEnumType, isScalarType, VariableDefinitionNode } from 'graphql';

// components
import { Form, HandleChangeSignature, Pill } from '../index';

// utils
import { getEnumValues } from '@graphiql-v2-prototype/graphiql-editor';
import { getDefaultInputValue } from '@graphiql-v2-prototype/graphiql-utils';

export const inputToRender = ({
  currentValue,
  displayString,
  graphqlType,
  handleChange,
  isList,
  typeNameValue,
  variableDefinition,
}: {
  currentValue: string | string[];
  displayString: string;
  graphqlType: GraphQLType | undefined;
  handleChange: HandleChangeSignature;
  isList: boolean;
  typeNameValue: string;
  variableDefinition: VariableDefinitionNode;
}) => {
  const name = variableDefinition.variable.name.value;

  // console.log('inputToRender', { currentValue, graphqlType, isList });

  if (!graphqlType) {
    return null;
  }

  let inputToRender: React.ReactElement;
  if (isList) {
    // control is FieldList
    inputToRender = (
      <Form
        formType={{ type: 'DYNAMIC' }}
        formControls={[
          {
            control: {
              currentValue: currentValue as string[],
              handleChange,
              name,
              typeNameValue,
            },
            label: name,
            labelAddOn: <Pill copy={displayString} />,
          },
        ]}
      />
    );
  } else if (isScalarType(graphqlType) && graphqlType.name === 'Boolean') {
    // control is FieldSelect
    inputToRender = (
      <Form
        formType={{ type: 'DYNAMIC' }}
        formControls={[
          {
            control: {
              currentValue: currentValue as string,
              handleChange,
              name,
              options: [
                {
                  value: 'true',
                  name: 'True',
                },
                {
                  value: 'false',
                  name: 'False',
                },
              ],
            },
            label: name,
            labelAddOn: <Pill copy={displayString} />,
          },
        ]}
      />
    );
  } else if (isEnumType(graphqlType)) {
    // control is FieldSelect
    inputToRender = (
      <Form
        formType={{ type: 'DYNAMIC' }}
        formControls={[
          {
            control: {
              currentValue: currentValue as string,
              handleChange,
              name,
              options:
                getEnumValues({
                  enumTypeName: typeNameValue,
                }) || [],
            },
            label: name,
            labelAddOn: <Pill copy={displayString} />,
          },
        ]}
      />
    );
  } else {
    // control is FieldInput
    inputToRender = (
      <Form
        formType={{ type: 'DYNAMIC' }}
        formControls={[
          {
            control: {
              currentValue: currentValue as string,
              handleChange,
              name,
              placeholder: getDefaultInputValue({
                typeNameAsString: typeNameValue,
              }) as string,
            },
            label: name,
            labelAddOn: <Pill copy={displayString} />,
          },
        ]}
      />
    );
  }

  return inputToRender;
};
