// types
import {
  AncestorArgument,
  SetNextActionSignature,
  SetNextVariableDefinitionsSignature,
} from '../../types';

// utils
import { getActiveEditorTab } from '@graphiql-prototype/graphiql-editor';

export const handleRemoveArgument = ({
  ancestor,
  setNextAction,
  setNextVariableDefinitions,
}: {
  ancestor: AncestorArgument;
  setNextAction: SetNextActionSignature;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
}) => {
  // console.log('running handleRemoveArgument', {
  //   ancestor,
  // });

  const activeEditorTab = getActiveEditorTab();
  const variableDefinitions = activeEditorTab?.operationDefinition?.variableDefinitions;

  const newVarDefs = variableDefinitions?.filter(
    (v) => v.variable.name.value !== ancestor.variableName
  );

  setNextVariableDefinitions({
    nextVariableDefinitions: newVarDefs ?? [],
  });

  return setNextAction({
    type: 'REMOVE',
    payload: { type: 'ARGUMENT', nodeName: ancestor.argument.name },
  });
};
