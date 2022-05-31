import { FieldNode } from 'graphql';

/** hooks */
import { useOperation } from '@/hooks';

/** types */
import {
  AncestorArgument,
  SetNextArgumentsSignature,
  SetNextVariableDefinitionsSignature,
} from '../types';

export const handleRemoveFieldArgument = ({
  ancestor,
  setNextArguments,
  setNextVariableDefinitions,
}: {
  ancestor: AncestorArgument;
  setNextArguments: SetNextArgumentsSignature;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
}) => {
  console.log('running handleRemoveFieldArgument', {
    ancestor,
  });

  const copyParentSelection = ancestor.parentSelection as FieldNode;

  const operationDefinition = useOperation.getState().operationDefinition;
  const varDefs = operationDefinition?.variableDefinitions;

  const argumentSiblings = copyParentSelection.arguments?.filter(
    (a) => a.name.value !== ancestor.arg.name
  );

  if (argumentSiblings) {
    setNextArguments({ nextArguments: argumentSiblings });
  }

  const newVarDefs = varDefs?.filter(
    (v) => v.variable.name.value !== ancestor.variableName
  );

  setNextVariableDefinitions({
    nextVariableDefinitions: newVarDefs ?? [],
  });
};
