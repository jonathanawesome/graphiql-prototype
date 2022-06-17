import { VariableDefinitionNode } from 'graphql';

/** components */
import {
  Form,
  HandleChangeSignature,
  Pill,
} from '@graphiql-v2-prototype/graphiql-ui-library';

/** constants */
import { INPUT_TYPES } from './constants';

/** utils */
import {
  getDefaultInputValue,
  getEnumValues,
} from '@graphiql-v2-prototype/graphiql-editor';

export const inputToRender = ({
  currentValue,
  displayString,
  handleChange,
  isList,
  typeNameValue,
  variableDefinition,
}: {
  currentValue: string | string[];
  displayString: string;
  handleChange: HandleChangeSignature;
  isList: boolean;
  typeNameValue: string;
  variableDefinition: VariableDefinitionNode;
}) => {
  const name = variableDefinition.variable.name.value;

  // console.log('inputToRender', { currentValue });

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
  } else if (typeNameValue === 'Boolean') {
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
  } else if (INPUT_TYPES.includes(typeNameValue)) {
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
  } else {
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
  }

  return inputToRender;
};
