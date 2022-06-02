import { useGraphiQL } from '@graphiql-v2-prototype/graphiql-v2';

/** types */
import {
  AncestorArgument,
  SetNextActionSignature,
  SetNextVariableDefinitionsSignature,
} from '../../types';

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

  const operationDefinition = useGraphiQL.getState().operationDefinition;
  const variableDefinitions = operationDefinition?.variableDefinitions;

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
