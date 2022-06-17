/** types */
import {
  AncestorInputField,
  SetNextActionSignature,
  SetNextVariableDefinitionsSignature,
} from '../../types';

/** utils */
import { getActiveEditorTab } from '@graphiql-v2-prototype/graphiql-editor';

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

  setNextAction({
    type: 'REMOVE',
    payload: { type: 'INPUT_FIELD', nodeName: ancestor.inputField.name },
  });
};
