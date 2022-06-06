import { ArgumentNode, Kind, ObjectFieldNode } from 'graphql';

/** types */
import {
  AncestorInputObject,
  NextAction,
  ObjectFieldAction,
  SetNextActionSignature,
} from '../../types';

export const handleAddInputObject = ({
  ancestor,
  nextAction,
  setNextAction,
}: {
  ancestor: AncestorInputObject;
  nextAction: NextAction;
  setNextAction: SetNextActionSignature;
}) => {
  // console.log(`running handleAddInputObject`, {
  //   ancestor,
  // });

  if (nextAction) {
    if (ancestor.parentType === 'FIELD') {
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
      return setNextAction({
        type: 'ADD',
        payload: { type: 'ARGUMENT', node: newArgument },
      });
    }

    if (ancestor.parentType === 'INPUT_OBJECT') {
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
