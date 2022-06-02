import { Kind, ObjectFieldNode } from 'graphql';

/** hooks */
import { useOperation } from '@/hooks';

/** types */
import {
  AncestorInputField,
  SetNextActionSignature,
  SetNextVariableDefinitionsSignature,
} from '../types';

/** utils */
import { buildNewVariableDefinition } from '@/utils';

export const handleAddInputField = ({
  ancestor,
  setNextAction,
  setNextVariableDefinitions,
}: {
  ancestor: AncestorInputField;
  setNextAction: SetNextActionSignature;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
}) => {
  const operationDefinition = useOperation.getState().operationDefinition;
  const variableDefinitions = operationDefinition?.variableDefinitions;

  // console.log('running handleAddInputField', {
  //   ancestor,
  // });

  const newVarDef = buildNewVariableDefinition({
    type: ancestor.inputField.type,
    variableName: ancestor.variableName,
  });

  setNextVariableDefinitions({
    nextVariableDefinitions: [
      ...(variableDefinitions ? variableDefinitions : []),
      newVarDef,
    ],
  });

  const newObjectFieldNode: ObjectFieldNode = {
    kind: Kind.OBJECT_FIELD,
    name: {
      kind: Kind.NAME,
      value: ancestor.inputField.name,
    },
    value: {
      kind: Kind.VARIABLE,
      name: {
        kind: Kind.NAME,
        value: ancestor.variableName,
      },
    },
  };

  setNextAction({
    type: 'ADD',
    payload: { type: 'INPUT_FIELD', node: newObjectFieldNode },
  });
};
