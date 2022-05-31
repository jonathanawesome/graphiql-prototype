import { ArgumentNode, FieldNode, Kind, SelectionSetNode } from 'graphql';

/** helpers */
import { findFieldSiblings } from '../helpers';

/** types */
import {
  AncestorField,
  NextArguments,
  NextSelectionSet,
  SetNextArgumentsSignature,
  SetNextSelectionSetSignature,
} from '../types';

export const handleUpdateParentField = ({
  ancestor,
  nextArguments,
  setNextArguments,
  nextSelectionSet,
  setNextSelectionSet,
}: {
  ancestor: AncestorField;
  nextArguments: NextArguments;
  setNextArguments: SetNextArgumentsSignature;
  nextSelectionSet: NextSelectionSet;
  setNextSelectionSet: SetNextSelectionSetSignature;
}) => {
  const siblings = findFieldSiblings({ ancestor });

  const copySelection = ancestor.selection as FieldNode;

  if (nextSelectionSet) {
    (copySelection.selectionSet as SelectionSetNode) = nextSelectionSet;
  }

  let newArgs: ArgumentNode[] | null = null;
  if (nextArguments && copySelection.arguments) {
    newArgs = [
      ...nextArguments,
      ...copySelection.arguments.filter(
        (existingArg) =>
          !nextArguments.some(
            (incomingArg) => incomingArg.name.value === existingArg.name.value
          )
      ),
    ];
  }

  console.log(`running handleUpdateParentField`, {
    ancestor,
    arguments: copySelection.arguments,
    nextArguments,
    newArgs,
  });

  if (newArgs) {
    //@ts-expect-error arguments is readonly
    copySelection.arguments = newArgs;
  }

  setNextArguments({ nextArguments: null });

  /** update the nextSelectionSet */
  return setNextSelectionSet({
    nextSelectionSet: {
      kind: Kind.SELECTION_SET,
      selections: siblings ? [copySelection, ...siblings] : [copySelection],
    },
  });
};
