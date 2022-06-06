import { ArgumentNode, isEnumType, Kind } from 'graphql';
import { useGraphiQL } from '@graphiql-v2-prototype/graphiql-v2';

/** types */
import {
  AncestorArgument,
  NextVariableDefinitions,
  SetNextActionSignature,
  SetNextVariableDefinitionsSignature,
} from '../../types';

/** utils */
import { buildNewVariableDefinition } from '../../../../utils';

export const handleAddArgument = ({
  ancestor,
  nextVariableDefinitions,
  setNextAction,
  setNextVariableDefinitions,
}: {
  ancestor: AncestorArgument;
  nextVariableDefinitions: NextVariableDefinitions;
  setNextAction: SetNextActionSignature;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
}) => {
  const addVariable = useGraphiQL.getState().addVariable;

  // console.log('running handleAddArgument', {
  //   ancestor,
  // });

  // we need to get variable definitions for this argument
  const newVarDef = buildNewVariableDefinition({
    type: ancestor.argument.type,
    variableName: ancestor.variableName,
  });

  setNextVariableDefinitions({
    nextVariableDefinitions: [
      ...(nextVariableDefinitions ? nextVariableDefinitions : []),
      newVarDef,
    ],
  });

  addVariable({
    easyVar: {
      variableName: ancestor.variableName,
      variableType: ancestor.argument.type,
      variableValue: '',
    },
  });

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
