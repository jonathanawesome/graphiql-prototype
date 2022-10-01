import { ArgumentNode, Kind, ObjectFieldNode, VariableDefinitionNode } from 'graphql';

// helpers
import { setCorrectNextVariableDefinitions } from '../helpers';

// types
import { AncestorInputField, SetNextActionSignature } from '../../types';

// utils
import { buildNewVariableDefinition } from '../../../../utils';

export const handleAddInputField = ({
  ancestor,
  // variableDefinitions,
  setNextAction,
}: {
  ancestor: AncestorInputField;
  setNextAction: SetNextActionSignature;
  // variableDefinitions: Array<VariableDefinitionNode>;
}) => {
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

  // console.log('running handleAddInputField', {
  //   ancestor,
  //   variableName: ancestor.variableName,
  //   // newArgumentNode,
  //   // newObjectFieldNode,
  //   // variableDefinitions,
  // });

  setNextAction({
    type: 'ADD',
    payload: { type: 'INPUT_FIELD', node: newObjectFieldNode },
  });
};
