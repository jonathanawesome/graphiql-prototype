import { useEffect, useState } from 'react';
import { VariableDefinitionNode } from 'graphql';

/** styles */
import { EasyVarStyled, EasyVarsStyled, Name, NameAndType, Type } from './styles';

/** types */
import { HandleVariableChange } from './types';

/** utils */
import { inputToRender } from './inputToRender';
import {
  getDisplayStringFromVariableDefinitionTypeNode,
  getActiveEditorTab,
  useGraphiQLEditor,
} from '@graphiql-v2-prototype/graphiql-editor';
import { isVariableDefinitionListType, getTypeNameValue } from '../../utils';

const updateVariable = useGraphiQLEditor.getState().updateVariable;

const EasyVar = ({
  variableDefinition,
}: {
  variableDefinition: VariableDefinitionNode;
}) => {
  // console.log('rendering easyVar', {
  //   variableDefinition,
  //   getTypeNameValue: getTypeNameValue({
  //     type: variableDefinition.type,
  //   }),
  //   getDisplayString: getDisplayString({
  //     type: variableDefinition.type,
  //   }),
  // });

  const [newVariableListValue, setNewVariableListValue] = useState<
    Array<HandleVariableChange>
  >([]);

  const isList = isVariableDefinitionListType({ type: variableDefinition.type });
  const typeNameValue = getTypeNameValue({
    type: variableDefinition.type,
  });
  const displayString = getDisplayStringFromVariableDefinitionTypeNode({
    type: variableDefinition.type,
  });

  const handleVariableChange = ({ id, value, variableName }: HandleVariableChange) => {
    if (isList) {
      console.log('running handleVariableChange...isListType');
      setNewVariableListValue((previousListItems) => {
        if (previousListItems.length === 0) {
          return [{ id, value, variableName }];
        } else {
          const copy = [...previousListItems];
          const existingValue = copy.findIndex((x) => x.id === id);
          if (existingValue !== -1) {
            // if variable exists, replace it
            copy[existingValue] = { id, value, variableName };
            return copy;
          } else {
            return [...previousListItems, { id, value, variableName }];
          }
        }
      });
    } else {
      console.log('running handleVariableChange...is NOT ListType', {
        variableName: variableDefinition.variable.name.value,
        variableValue: value,
      });
      updateVariable({
        variableName: variableDefinition.variable.name.value,
        variableValue: value,
      });
    }
  };

  useEffect(() => {
    if (isList) {
      updateVariable({
        variableName: variableDefinition.variable.name.value,
        variableValue: newVariableListValue.map((v) => v.value),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newVariableListValue]);

  return (
    <EasyVarStyled>
      <NameAndType>
        <Name>{variableDefinition.variable.name.value}</Name>
        <Type>{displayString}</Type>
      </NameAndType>
      {inputToRender({
        handleVariableChange,
        isList,
        typeNameValue,
        variableDefinition,
      })}
    </EasyVarStyled>
  );
};

export const EasyVars = () => {
  const activeEditorTab = getActiveEditorTab();

  if (!activeEditorTab) {
    //TODO
    return <p>loading...</p>;
  }

  const variableDefinitions = activeEditorTab?.operationDefinition?.variableDefinitions;
  const variables = activeEditorTab?.variables;

  console.log('rendering EasyVars', {
    variableDefinitions,
    variables,
  });

  return (
    <EasyVarsStyled>
      {variableDefinitions?.map((v) => {
        return <EasyVar key={v.variable.name.value} variableDefinition={v} />;
      })}
    </EasyVarsStyled>
  );
};
