import { ArgumentNode, Kind } from 'graphql';

// helpers
import { setCorrectNextVariableDefinitions } from '../helpers';

// types
import { AncestorArgument, SetNextActionSignature } from '../../types';

// utils
import { buildNewVariableDefinition } from '../../../../utils';

export const handleAddArgument = ({
  ancestor,
  setNextAction,
}: {
  ancestor: AncestorArgument;
  setNextAction: SetNextActionSignature;
}) => {
  console.log('running handleAddArgument', {
    ancestor,
  });

  // we need to get variable definitions for this argument
  const newVarDef = buildNewVariableDefinition({
    type: ancestor.argument.type,
    variableName: ancestor.variableName,
  });

  setCorrectNextVariableDefinitions({ newVariableDefinition: newVarDef });

  const newArgumentNode: ArgumentNode = {
    kind: Kind.ARGUMENT,
    name: {
      kind: Kind.NAME,
      value: ancestor.argument.name,
    },
    value: {
      kind: Kind.VARIABLE,
      name: {
        kind: Kind.NAME,
        value: ancestor.variableName,
      },
    },
  };

  return setNextAction({
    type: 'ADD',
    payload: { type: 'ARGUMENT', node: newArgumentNode },
  });
};
