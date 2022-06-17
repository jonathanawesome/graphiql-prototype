import { ArgumentNode, Kind } from 'graphql';

/** types */
import {
  AncestorArgument,
  SetNextActionSignature,
  SetNextVariableDefinitionsSignature,
} from '../../types';

/** utils */
import { buildNewVariableDefinition } from '../../../../utils';
import { getActiveEditorTab } from '@graphiql-v2-prototype/graphiql-editor';

export const handleAddArgument = ({
  ancestor,
  setNextAction,
  setNextVariableDefinitions,
}: {
  ancestor: AncestorArgument;
  setNextAction: SetNextActionSignature;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
}) => {
  const activeEditorTab = getActiveEditorTab();
  const variableDefinitions = activeEditorTab?.operationDefinition?.variableDefinitions;

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
      ...(variableDefinitions ? variableDefinitions : []),
      newVarDef,
    ],
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
