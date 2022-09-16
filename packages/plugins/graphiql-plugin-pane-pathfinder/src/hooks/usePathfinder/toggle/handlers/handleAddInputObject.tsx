import { ArgumentNode, Kind, ObjectFieldNode } from 'graphql';
import { buildNewVariableDefinition } from '../../../../utils';

// types
import {
  AncestorInputObject,
  NextAction,
  ObjectFieldAction,
  SetNextActionSignature,
} from '../../types';
import { setCorrectNextVariableDefinitions } from '../helpers';

export const handleAddInputObject = ({
  ancestor,
  nextAction,
  setNextAction,
}: {
  ancestor: AncestorInputObject;
  nextAction: NextAction;
  setNextAction: SetNextActionSignature;
}) => {
  const newVarDef = buildNewVariableDefinition({
    type: ancestor.inputObject,
    variableName: ancestor.name,
  });

  console.log(`running handleAddInputObject`, {
    //   ancestor,
    ancestor,
    variableName: ancestor.variableName,
    newVarDef,
  });

  setCorrectNextVariableDefinitions({ newVariableDefinition: newVarDef });

  //   {
  //     "kind": "VariableDefinition",
  //     "variable": {
  //         "kind": "Variable",
  //         "name": {
  //             "kind": "Name",
  //             "value": "filter"
  //         }
  //     },
  //     "type": {
  //         "kind": "NonNullType",
  //         "type": {
  //             "kind": "NamedType",
  //             "name": {
  //                 "kind": "Name",
  //                 "value": "FilterCharacter"
  //             }
  //         }
  //     },
  //     "directives": []
  // }

  if (nextAction) {
    if (ancestor.isNested === false) {
      console.log('handleAddInputObject, is NOT nested', ancestor.isNested);

      const newArgument: ArgumentNode = {
        kind: Kind.ARGUMENT,
        name: {
          kind: Kind.NAME,
          value: ancestor.name,
        },
        value: {
          kind: Kind.OBJECT,
          fields: [(nextAction.payload as ObjectFieldAction).node],
        },
      };
      console.log('new argument', { newArgument });
      return setNextAction({
        type: 'ADD',
        payload: { type: 'ARGUMENT', node: newArgument },
      });
    }

    if (ancestor.isNested === true) {
      console.log(
        'handleAddInputObject, is nested within another input object',
        ancestor.isNested
      );

      const newObjectFieldNode: ObjectFieldNode = {
        kind: Kind.OBJECT_FIELD,
        name: {
          kind: Kind.NAME,
          value: ancestor.name,
        },
        value: {
          kind: Kind.OBJECT,
          fields: [(nextAction.payload as ObjectFieldAction).node],
        },
      };
      return setNextAction({
        type: 'ADD',
        payload: { type: 'INPUT_FIELD', node: newObjectFieldNode },
      });
    }
  }
  console.log('no nextAction to perform in handleAddInputObject');
  return undefined;
};
