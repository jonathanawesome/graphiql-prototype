/** hooks */
import { useOperation } from '@/hooks';

/** types */
import {
  AncestorInputField,
  SetNextActionSignature,
  SetNextVariableDefinitionsSignature,
} from '../types';

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

  const operationDefinition = useOperation.getState().operationDefinition;
  const variableDefinitions = operationDefinition?.variableDefinitions;

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
