import { getActiveEditorTab } from '@graphiql-v2-prototype/graphiql-editor';

/** types */
import {
  AncestorInputField,
  SetNextActionSignature,
  SetNextVariableDefinitionsSignature,
} from '../../types';

export const handleRemoveInputField = ({
  ancestor,
  setNextAction,
  setNextVariableDefinitions,
}: {
  ancestor: AncestorInputField;
  setNextAction: SetNextActionSignature;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
}) => {
  // console.log('running handleRemoveInputField', { ancestor });

  // const operationDefinition = useGraphiQL.getState().operationDefinition;
  // const variableDefinitions = operationDefinition?.variableDefinitions;
  // const removeVariables = useGraphiQL.getState().removeVariables;

  const activeEditorTab = getActiveEditorTab();
  const variableDefinitions = activeEditorTab?.operationDefinition?.variableDefinitions;

  const newVarDefs = variableDefinitions?.filter(
    (v) => v.variable.name.value !== ancestor.variableName
  );

  if (newVarDefs) {
    setNextVariableDefinitions({
      nextVariableDefinitions: newVarDefs,
    });
  }

  // removeVariables({ variableNames: [ancestor.variableName] });

  setNextAction({
    type: 'REMOVE',
    payload: { type: 'INPUT_FIELD', nodeName: ancestor.inputField.name },
  });
};
