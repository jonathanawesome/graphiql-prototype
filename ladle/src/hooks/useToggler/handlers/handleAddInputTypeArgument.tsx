import { ArgumentNode, Kind, ObjectFieldNode, ObjectValueNode } from 'graphql';

/** hooks */
import { useOperation } from '@/hooks';

/** types */
import {
  AncestorArgument,
  SetNextArgumentsSignature,
  SetNextVariableDefinitionsSignature,
} from '../types';

/** utils */
import { buildNewVariableDefinition } from '@/utils';

export const handleAddInputTypeArgument = ({
  ancestor,
  setNextArguments,
  setNextVariableDefinitions,
}: {
  ancestor: AncestorArgument;
  setNextArguments: SetNextArgumentsSignature;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
}) => {
  const operationDefinition = useOperation.getState().operationDefinition;
  const varDefs = operationDefinition?.variableDefinitions;

  const copyParentSelection = ancestor.parentSelection as ArgumentNode;

  let argumentSiblings: ObjectFieldNode[] | null = null;

  if (copyParentSelection) {
    argumentSiblings = (copyParentSelection.value as ObjectValueNode).fields.filter(
      (f) => f.name.value !== ancestor.arg.name
    );
  }

  console.log('running handleAddInputTypeArgument', {
    ancestor,
    argumentSiblings,
  });

  const newObjectFieldNode: ObjectFieldNode = {
    kind: Kind.OBJECT_FIELD,
    name: {
      kind: Kind.NAME,
      value: ancestor.arg.name,
    },
    value: {
      kind: Kind.VARIABLE,
      name: {
        kind: Kind.NAME,
        value: ancestor.variableName,
      },
    },
  };

  const newArgumentNode: ArgumentNode = {
    kind: Kind.ARGUMENT,
    name: {
      kind: Kind.NAME,
      value: ancestor.onInputTypeName as string,
    },
    value: {
      kind: Kind.OBJECT,
      fields: argumentSiblings
        ? [newObjectFieldNode, ...argumentSiblings]
        : [newObjectFieldNode],
    },
  };

  setNextArguments({
    nextArguments: [newArgumentNode],
  });

  const newVarDef = buildNewVariableDefinition({
    variableName: ancestor.variableName,
    forArg: ancestor.arg,
  });

  setNextVariableDefinitions({
    nextVariableDefinitions: [...(varDefs ? varDefs : []), newVarDef],
  });
};
