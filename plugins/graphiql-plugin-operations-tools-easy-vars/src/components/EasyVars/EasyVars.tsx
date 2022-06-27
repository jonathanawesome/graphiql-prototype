import { NamedTypeNode, VariableDefinitionNode } from 'graphql';
import {
  getActiveEditorTab,
  getDisplayStringFromVariableDefinitionTypeNode,
  useGraphiQLEditor,
} from '@graphiql-v2-prototype/graphiql-editor';

// styles
import { EasyVarsStyled } from './styles';

// types
import type { HandleChange } from '@graphiql-v2-prototype/graphiql-ui-library';

// utils
import { inputToRender } from './inputToRender';
import {
  // isVariableDefinitionListType,
  getTypeNameValue,
  parseOutgoingVariableValue,
  parseIncomingVariableValue,
} from '../../utils';

const updateVariable = useGraphiQLEditor.getState().updateVariable;

const EasyVar = ({
  currentValue,
  variableDefinition,
}: {
  currentValue: string;
  variableDefinition: VariableDefinitionNode;
}) => {
  const { schema } = useGraphiQLEditor();

  console.log('rendering easyVar', {
    variableDefinition,
    type: variableDefinition.type,
  });

  // const isList = isVariableDefinitionListType({ type: variableDefinition.type });
  const typeNameValue = getTypeNameValue({
    type: variableDefinition.type,
  });
  const displayString = getDisplayStringFromVariableDefinitionTypeNode({
    type: variableDefinition.type,
  });

  const handleChange = ({ value }: HandleChange) => {
    updateVariable({
      variableName: variableDefinition.variable.name.value,
      variableValue: parseOutgoingVariableValue({ typeNameValue, value }),
    });
  };

  if (!schema || 'error' in schema) {
    return null;
  }

  return inputToRender({
    currentValue: parseIncomingVariableValue(currentValue),
    displayString,
    graphqlType: schema.getType(typeNameValue),
    handleChange,
    typeNameValue,
    variableDefinition,
  });
};

export const EasyVars = ({
  variableDefinitions,
}: {
  variableDefinitions: VariableDefinitionNode[];
}) => {
  const activeEditorTab = getActiveEditorTab();
  const variablesModelValue = activeEditorTab?.variablesModel.getValue();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let parsedVariables: Record<any, any> = {};

  if (variablesModelValue) {
    // TODO enhance error handling with a UI
    try {
      parsedVariables = JSON.parse(variablesModelValue);
    } catch (e) {
      console.warn('error parsing variables in EasyVars');
    }
  }

  return (
    <EasyVarsStyled>
      {variableDefinitions?.map((v) => {
        return (
          <EasyVar
            key={v.variable.name.value}
            variableDefinition={v}
            currentValue={parsedVariables[v.variable.name.value]}
          />
        );
      })}
    </EasyVarsStyled>
  );
};
