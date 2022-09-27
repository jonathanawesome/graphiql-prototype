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
    variableName: ancestor.variableName,
  });

  console.log(`running handleAddInputObject`, {
    //   ancestor,
    ancestor,
    variableName: ancestor.variableName,
    newVarDef,
    nextAction,
  });

  setCorrectNextVariableDefinitions({ newVariableDefinition: newVarDef });

  if (nextAction) {
    if (ancestor.isNested === false) {
      console.log('handleAddInputObject, is NOT nested', {
        'ancestor.isNested': ancestor.isNested,
        nextAction,
      });

      const newArgument: ArgumentNode = {
        kind: Kind.ARGUMENT,
        name: {
          kind: Kind.NAME,
          value: ancestor.name,
        },
        value: {
          kind: Kind.VARIABLE,
          name: {
            kind: Kind.NAME,
            value: ancestor.variableName,
          },
        },
        // value: {
        //   kind: Kind.OBJECT,
        //   fields: [(nextAction.payload as ObjectFieldAction).node],
        // },
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