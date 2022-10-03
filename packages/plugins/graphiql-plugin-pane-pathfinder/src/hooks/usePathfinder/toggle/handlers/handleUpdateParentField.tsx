import { FieldNode, Kind } from 'graphql';

// helpers
import { getFieldSiblings } from '../helpers';

// types
import {
  AncestorField,
  // ArgumentAction,
  NextAction,
  NextSelectionSet,
  SetNextActionSignature,
  SetNextSelectionSetSignature,
} from '../../types';

export const handleUpdateParentField = ({
  ancestor,
  nextAction,
  setNextAction,
  nextSelectionSet,
  setNextSelectionSet,
}: {
  ancestor: AncestorField;
  nextAction: NextAction;
  setNextAction: SetNextActionSignature;
  nextSelectionSet: NextSelectionSet;
  setNextSelectionSet: SetNextSelectionSetSignature;
}) => {
  // console.log(`running handleUpdateParentField`, {
  //   ancestor,
  //   nextAction,
  // });

  const siblings = getFieldSiblings({ ancestor });
  const selection = ancestor.selection as FieldNode;

  let newFieldNode: FieldNode = {
    ...selection,
  };

  // 👇 possible incoming child field/inline-fragment changes
  if (nextSelectionSet) {
    newFieldNode = {
      ...newFieldNode,
      selectionSet: {
        ...newFieldNode.selectionSet,
        ...nextSelectionSet,
      },
    };
  }

  // 👇 possible incoming argument additions
  if (nextAction?.type === 'ADD') {
    // does the incoming argument exist within the selection?
    const existingArgument = selection?.arguments?.findIndex(
      (f) => f.name.value === nextAction.payload.node.name.value
    );
    if (existingArgument !== -1 && selection.arguments) {
      // if argument exists, replace it
      //@ts-expect-error readonly
      selection.arguments[existingArgument] = nextAction.payload.node;
      newFieldNode = {
        ...newFieldNode,
        arguments: selection.arguments,
      };
    } else {
      // if it doesn't exist spread it in
      newFieldNode = {
        ...newFieldNode,
        arguments: selection.arguments
          ? [...selection.arguments, nextAction.payload.node]
          : [nextAction.payload.node],
      };
    }
  }

  // 👇 possible incoming argument removals
  if (nextAction?.type === 'REMOVE') {
    newFieldNode = {
      ...newFieldNode,
      arguments: selection?.arguments?.filter(
        (a) => a.name.value !== nextAction.payload.nodeName
      ),
    };
  }

  // clear next action so it doesn't bubble up
  setNextAction(null);

  /** update the nextSelectionSet */
  return setNextSelectionSet({
    nextSelectionSet: {
      kind: Kind.SELECTION_SET,
      selections: siblings ? [newFieldNode, ...siblings] : [newFieldNode],
    },
  });
};
