import { VariableDefinitionNode } from 'graphql';
import {
  getDisplayStringFromVariableDefinitionTypeNode,
  useGraphiQLEditor,
} from '@graphiql-v2-prototype/graphiql-editor';

/** styles */
import { EasyVarsStyled } from './styles';

/** types */
import type { HandleChange } from '@graphiql-v2-prototype/graphiql-ui-library';

/** utils */
import { inputToRender } from './inputToRender';
import { isVariableDefinitionListType, getTypeNameValue } from '../../utils';

const updateVariable = useGraphiQLEditor.getState().updateVariable;

const EasyVar = ({
  currentValue,
  variableDefinition,
}: {
  currentValue: string;
  variableDefinition: VariableDefinitionNode;
}) => {
  // console.log('rendering easyVar', {
  //   variableDefinition,
  //   currentValue,
  // });

  const isList = isVariableDefinitionListType({ type: variableDefinition.type });
  const typeNameValue = getTypeNameValue({
    type: variableDefinition.type,
  });
  const displayString = getDisplayStringFromVariableDefinitionTypeNode({
    type: variableDefinition.type,
  });

  const handleChange = ({ value }: HandleChange) => {
    updateVariable({
      variableName: variableDefinition.variable.name.value,
      variableValue: value,
    });
  };

  return inputToRender({
    currentValue,
    displayString,
    handleChange,
    isList,
    typeNameValue,
    variableDefinition,
  });
};

export const EasyVars = ({
  variableDefinitions,
  variables,
}: {
  variableDefinitions: VariableDefinitionNode[];
  variables: string;
}) => {
  const parsedVariables = JSON.parse(variables);

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
