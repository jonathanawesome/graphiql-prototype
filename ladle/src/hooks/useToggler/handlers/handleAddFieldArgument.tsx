import { ArgumentNode, FieldNode, Kind } from 'graphql';

/** types */
import {
  AncestorArgument,
  NextVariableDefinitions,
  SetNextArgumentsSignature,
  SetNextVariableDefinitionsSignature,
} from '../types';

/** utils */
import { buildNewVariableDefinition } from '@/utils';

export const handleAddFieldArgument = ({
  ancestor,
  nextVariableDefinitions,
  setNextArguments,
  setNextVariableDefinitions,
}: {
  ancestor: AncestorArgument;
  nextVariableDefinitions: NextVariableDefinitions;
  setNextArguments: SetNextArgumentsSignature;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
}) => {
  const copyParentSelection = ancestor.parentSelection as FieldNode;

  let argumentSiblings: ArgumentNode[] | undefined = undefined;

  if (copyParentSelection) {
    argumentSiblings = copyParentSelection.arguments?.filter(
      (a) => a.name.value !== ancestor.arg.name
    );
  }

  console.log('running handleAddFieldArgument', {
    ancestor,
    argumentSiblings,
  });

  // we need to get vairbale definitions for this argument
  const newVarDef = buildNewVariableDefinition({
    variableName: ancestor.variableName,
    forArg: ancestor.arg,
  });

  setNextVariableDefinitions({
    nextVariableDefinitions: [
      ...(nextVariableDefinitions ? nextVariableDefinitions : []),
      newVarDef,
    ],
  });

  const newArgumentNode: ArgumentNode = {
    kind: Kind.ARGUMENT,
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

  const newArguments: ArgumentNode[] = argumentSiblings
    ? [newArgumentNode, ...argumentSiblings]
    : [newArgumentNode];

  return setNextArguments({ nextArguments: newArguments });
};
