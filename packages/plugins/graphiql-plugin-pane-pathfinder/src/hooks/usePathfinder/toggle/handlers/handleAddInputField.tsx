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
  // 1. check if the parent input object is already in the variable definitions

  // 2. if it is, we do nothing

  //  3. if it's NOT, we need to add the input object variable definition

  // const newVarDef = buildNewVariableDefinition({
  //   type: ancestor.inputField.type,
  //   variableName: ancestor.variableName,
  // });

  // setCorrectNextVariableDefinitions({ newVariableDefinition: newVarDef });

  // const newObjectFieldNode: ObjectFieldNode = {
  //   kind: Kind.OBJECT_FIELD,
  //   name: {
  //     kind: Kind.NAME,
  //     value: ancestor.inputField.name,
  //   },
  //   value: {
  //     kind: Kind.VARIABLE,
  //     name: {
  //       kind: Kind.NAME,
  //       value: ancestor.variableName,
  //     },
  //   },
  // };

  console.log('running handleAddInputField', {
    ancestor,
    variableName: ancestor.variableName,
    // newObjectFieldNode,
    // variableDefinitions,
  });

  const newArgumentNode: ArgumentNode = {
    kind: Kind.ARGUMENT,
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

  console.log('running handleAddInputField', {
    ancestor,
    variableName: ancestor.variableName,
    newArgumentNode,
    // newObjectFieldNode,
    // variableDefinitions,
  });

  return setNextAction({
    type: 'ADD',
    payload: { type: 'ARGUMENT', node: newArgumentNode },
  });

  // setNextAction({
  //   type: 'ADD',
  //   payload: { type: 'INPUT_FIELD', node: newObjectFieldNode },
  // });
};
