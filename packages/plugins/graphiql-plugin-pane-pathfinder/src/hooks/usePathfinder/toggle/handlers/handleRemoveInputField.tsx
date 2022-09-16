// types
import {
  AncestorInputField,
  SetNextActionSignature,
  SetNextVariableDefinitionsSignature,
} from '../../types';

// utils
import { useEditor } from '@graphiql-prototype/use-editor';

export const handleRemoveInputField = ({
  ancestor,
  setNextAction,
  setNextVariableDefinitions,
}: {
  ancestor: AncestorInputField;
  setNextAction: SetNextActionSignature;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
}) => {
  console.log('running handleRemoveInputField', { ancestor });

  const activeEditorTab = useEditor.getState().getActiveTab();
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
