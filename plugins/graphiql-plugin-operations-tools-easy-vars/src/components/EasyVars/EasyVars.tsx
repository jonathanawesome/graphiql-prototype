import {
  //  useEffect,
  useState,
} from 'react';
// import { isListType } from 'graphql';

/** hooks */
// import type { EasyVar as EV, EasyVars as EVs } from '../../hooks';
import {
  getActiveEditorTab,
  // useGraphiQLEditor,
} from '@graphiql-v2-prototype/graphiql-editor';

/** styles */
import { EasyVarStyled, EasyVarsStyled, Name, NameAndType, Type } from './styles';

/** types */
import { HandleVariableChange } from './types';

/** utils */
import { inputToRender } from './inputToRender';
import {
  getDisplayString,
  isVariableDefinitionListType,
  getTypeNameValue,
} from '../../utils';
import { GraphQLEnumType, VariableDefinitionNode } from 'graphql';

// const updateVariable = useGraphiQL.getState().updateVariable;

const EasyVar = ({
  variableDefinition,
}: {
  variableDefinition: VariableDefinitionNode;
}) => {
  console.log('rendering easyVar', {
    variableDefinition,
    getTypeNameValue: getTypeNameValue({
      type: variableDefinition.type,
    }),
    getDisplayString: getDisplayString({
      type: variableDefinition.type,
    }),
  });

  // const { schema } = useGraphiQLEditor();

  const [newVariableListValue, setNewVariableListValue] = useState<
    Array<HandleVariableChange>
  >([]);

  // if (schema) {
  //   const enumType = schema.getType('TestEnum');
  //   console.log('TestEnum values?', {
  //     values: (enumType as GraphQLEnumType).getValues(),
  //   });
  // }

  const isList = isVariableDefinitionListType({ type: variableDefinition.type });
  const typeNameValue = getTypeNameValue({
    type: variableDefinition.type,
  });
  const displayString = getDisplayString({
    type: variableDefinition.type,
  });

  const handleVariableChange = ({ id, value, variableName }: HandleVariableChange) => {
    console.log('running handleVariableChange', {
      // type: easyVar.variableType,
      id,
      value,
      variableName,
    });
    // if (isList) {
    //   console.log('running handleVariableChange...isListType');
    //   setNewVariableListValue((previousListItems) => {
    //     if (previousListItems.length === 0) {
    //       return [{ id, value, variableName }];
    //     } else {
    //       const copy = [...previousListItems];
    //       const existingValue = copy.findIndex((x) => x.id === id);
    //       if (existingValue !== -1) {
    //         // if variable exists, replace it
    //         copy[existingValue] = { id, value, variableName };
    //         return copy;
    //       } else {
    //         return [...previousListItems, { id, value, variableName }];
    //       }
    //     }
    //   });
    // } else {
    //   console.log('running handleVariableChange...is NOT ListType', {
    //     variableName: easyVar.variableName,
    //     variableValue: value,
    //   });
    //   updateVariable({ variableName: easyVar.variableName, variableValue: value });
    // }
  };

  // useEffect(() => {
  //   if (isList) {
  //     updateVariable({
  //       variableName: easyVar.variableName,
  //       variableValue: newVariableListValue.map((v) => v.value),
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [newVariableListValue]);

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

  // console.log('rendering EasyVars', {
  //   variableDefintiions: activeEditorTab?.operationDefinition?.variableDefinitions,
  // });

  return (
    <EasyVarsStyled>
      {activeEditorTab?.operationDefinition?.variableDefinitions?.map((v) => (
        <EasyVar key={v.variable.name.value} variableDefinition={v} />
      ))}
    </EasyVarsStyled>
  );
};
