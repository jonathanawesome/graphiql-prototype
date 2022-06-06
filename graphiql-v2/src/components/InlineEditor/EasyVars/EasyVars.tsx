import { useEffect, useState } from 'react';
import { isListType } from 'graphql';

/** hooks */
import type { EasyVar as EV, EasyVars as EVs } from '../../../hooks';
import { useGraphiQL } from '../../../hooks';

/** styles */
import { EasyVarStyled, EasyVarsStyled, Name, NameAndType, Type } from './styles';

/** types */
import { HandleVariableChange } from './types';

/** utils */
import { inputToRender } from './inputToRender';
import { unwrapNonNullInputType } from '../../../utils';

const updateVariable = useGraphiQL.getState().updateVariable;

const EasyVar = ({ easyVar }: { easyVar: EV }) => {
  // console.log('rendering easyVar', { easyVar });

  const [newVariableListValue, setNewVariableListValue] = useState<
    Array<HandleVariableChange>
  >([]);

  const handleVariableChange = ({ id, value, variableName }: HandleVariableChange) => {
    if (isListType(unwrapNonNullInputType({ type: easyVar.variableType }))) {
      setNewVariableListValue((previousListItems) => {
        if (previousListItems.length === 0) {
          return [{ id, value, variableName }];
        } else {
          const copy = [...previousListItems];
          const existingValue = copy.findIndex((x) => x.id === id);
          if (existingValue !== -1) {
            // if argument exists, replace it
            copy[existingValue] = { id, value, variableName };
            return copy;
          } else {
            return [...previousListItems, { id, value, variableName }];
          }
        }
      });
    } else {
      updateVariable({ variableName: easyVar.variableName, variableValue: value });
    }
  };

  useEffect(() => {
    updateVariable({
      variableName: easyVar.variableName,
      variableValue: newVariableListValue.map((v) => v.value),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newVariableListValue]);

  return (
    <EasyVarStyled>
      <NameAndType>
        <Name>{easyVar.variableName}</Name>
        <Type>{easyVar.argument.type.toString()}</Type>
      </NameAndType>
      {inputToRender({ easyVar, handleVariableChange })}
    </EasyVarStyled>
  );
};

export const EasyVars = ({ easyVars }: { easyVars: EVs }) => {
  return (
    <EasyVarsStyled>
      {easyVars.map((v) => (
        <EasyVar key={v.variableName} easyVar={v} />
      ))}
    </EasyVarsStyled>
  );
};
