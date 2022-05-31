import { ArgumentNode, ObjectValueNode } from 'graphql';

/** hooks */
import { useOperation } from '@/hooks';

/** types */
import {
  AncestorArgument,
  SetNextArgumentsSignature,
  SetNextVariableDefinitionsSignature,
} from '../types';

export const handleRemoveInputTypeArgument = ({
  ancestor,
  setNextArguments,
  setNextVariableDefinitions,
}: {
  ancestor: AncestorArgument;
  setNextArguments: SetNextArgumentsSignature;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
}) => {
  console.log('running handleRemoveInputTypeArgument', { ancestor });

  const copyParentSelection = ancestor.parentSelection as ArgumentNode;

  const operationDefinition = useOperation.getState().operationDefinition;
  const varDefs = operationDefinition?.variableDefinitions;

  const argumentSiblings = (copyParentSelection.value as ObjectValueNode).fields.filter(
    (f) => f.name.value !== ancestor.arg.name
  );

  const nextArg: ArgumentNode = {
    ...copyParentSelection,
    value: {
      ...(copyParentSelection.value as ObjectValueNode),
      fields: argumentSiblings,
    },
  };

  setNextArguments({ nextArguments: [nextArg] });

  const newVarDefs = varDefs?.filter(
    (v) => v.variable.name.value !== ancestor.variableName
  );

  setNextVariableDefinitions({
    nextVariableDefinitions: newVarDefs ?? [],
  });
};
