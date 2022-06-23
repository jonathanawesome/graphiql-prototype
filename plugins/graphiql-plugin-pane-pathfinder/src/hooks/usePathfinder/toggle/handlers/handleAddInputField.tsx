import { Kind, ObjectFieldNode } from 'graphql';

// helpers
import { setCorrectNextVariableDefinitions } from '../helpers';

// types
import { AncestorInputField, SetNextActionSignature } from '../../types';

// utils
import { buildNewVariableDefinition } from '../../../../utils';

export const handleAddInputField = ({
  ancestor,
  setNextAction,
}: {
  ancestor: AncestorInputField;
  setNextAction: SetNextActionSignature;
}) => {
  console.log('running handleAddInputField', {
    type: ancestor.inputField.type,
    variableName: ancestor.variableName,
  });

  const newVarDef = buildNewVariableDefinition({
    type: ancestor.inputField.type,
    variableName: ancestor.variableName,
  });

  setCorrectNextVariableDefinitions({ newVariableDefinition: newVarDef });

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
