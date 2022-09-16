import { ArgumentNode, Kind, ObjectFieldNode, ObjectValueNode } from 'graphql';

// types
import { AncestorInputObject, NextAction, SetNextActionSignature } from '../../types';

export const handleUpdateInputObject = ({
  ancestor,
  nextAction,
  setNextAction,
}: {
  ancestor: AncestorInputObject;
  nextAction: NextAction;
  setNextAction: SetNextActionSignature;
}) => {
  const selection = ancestor.selection as ArgumentNode | ObjectFieldNode;

  let newObjectFields: ObjectFieldNode[] = [];

  console.log(`running handleUpdateInputObject`, {
    ancestor,
    nextAction,
    selectionDotValue: selection.value,
  });
  if (nextAction) {
    if (ancestor.isNested === false) {
      if (nextAction.type === 'ADD') {
        // does the incoming objectField exist within the selection?
        const existingField = (selection.value as ObjectValueNode).fields.findIndex(
          (f) => f.name.value === nextAction.payload.node.name.value
        );
        // if it does, we need to replace it with the incoming fields
        if (existingField !== -1) {
          //@ts-expect-error readonly
          (selection.value as ObjectValueNode).fields[existingField] =
            nextAction.payload.node;

          newObjectFields = [...(selection.value as ObjectValueNode).fields];
        } else {
          // if it doesn't, spread it in
          newObjectFields = [
            ...(selection.value as ObjectValueNode).fields,
            nextAction.payload.node as ObjectFieldNode,
          ];
        }
      } else if (nextAction.type === 'REMOVE') {
        // here, selection.kind === Kind.ARGUMENT
        const remainingFieldsOnInputObject = (
          selection.value as ObjectValueNode
        ).fields.filter((f) => f.name.value !== nextAction.payload.nodeName);

        // if there are no remaining fields, we return early and remove the ARGUMENT
        if (remainingFieldsOnInputObject.length === 0) {
          return setNextAction({
            type: 'REMOVE',
            payload: { type: 'ARGUMENT', nodeName: selection.name.value },
          });
        } else {
          // if there are remaining fields, we keep them around
          newObjectFields = remainingFieldsOnInputObject;
        }
      }
    }

    if (ancestor.isNested === true) {
      if (nextAction.type === 'ADD') {
        const newObjectField: ObjectFieldNode = {
          ...(selection as ObjectFieldNode),
          value: {
            ...(selection.value as ObjectValueNode),
            fields: [
              ...(selection.value as ObjectValueNode).fields,
              nextAction.payload.node as ObjectFieldNode,
            ],
          },
        };

        return setNextAction({
          type: 'ADD',
          payload: { type: 'INPUT_FIELD', node: newObjectField },
        });
      } else if (nextAction.type === 'REMOVE') {
        const remainingFieldsOnInputObject = (
          selection.value as ObjectValueNode
        ).fields.filter((f) => f.name.value !== nextAction.payload.nodeName);

        // if there are no remaining fields, we remove the OBJECT_FIELD
        if (remainingFieldsOnInputObject.length === 0) {
          return setNextAction({
            type: 'REMOVE',
            payload: { type: 'ARGUMENT', nodeName: selection.name.value },
          });
        } else {
          // if there are remaining fields, we keep them around
          newObjectFields = remainingFieldsOnInputObject;
        }
      }
    }

    if (ancestor.isNested === false) {
      const newVal: ArgumentNode | ObjectFieldNode = {
        ...selection,
        value: {
          kind: Kind.OBJECT,
          fields: newObjectFields,
        },
      };
      return setNextAction({
        type: 'ADD',
        payload: { type: 'ARGUMENT', node: newVal as ArgumentNode },
      });
    }

    if (ancestor.isNested === true) {
      const newVal: ArgumentNode | ObjectFieldNode = {
        ...selection,
        value: {
          kind: Kind.OBJECT,
          fields: newObjectFields,
        },
      };

      return setNextAction({
        type: 'ADD',
        payload: { type: 'INPUT_FIELD', node: newVal as ObjectFieldNode },
      });
    }
  }
  console.log('no nextAction to perform in handleUpdateInputObject');
  return undefined;
};
