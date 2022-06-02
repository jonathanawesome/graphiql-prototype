import { FieldNode, Kind, SelectionSetNode } from 'graphql';

/** helpers */
import { findFieldSiblings } from '../helpers';

/** types */
import {
  AncestorInlineFragment,
  NextSelectionSet,
  SetNextSelectionSetSignature,
} from '../types';

export const handleUpdateParentInlineFragment = ({
  ancestor,
  nextSelectionSet,
  setNextSelectionSet,
}: {
  ancestor: AncestorInlineFragment;
  nextSelectionSet: NextSelectionSet;
  setNextSelectionSet: SetNextSelectionSetSignature;
}) => {
  const siblings = findFieldSiblings({ ancestor });

  const selection = ancestor.selection as FieldNode;

  // console.log(`running handleUpdateParentInlineFragment`, {
  //   ancestor,
  //   siblings,
  //   nextSelectionSet,
  // });

  if (nextSelectionSet?.selections.length === 0) {
    /** this inline fragment has no more selections, so we only need to add siblings to the nextSlectionSet */
    return setNextSelectionSet({
      nextSelectionSet: {
        kind: Kind.SELECTION_SET,
        selections: siblings ? [...siblings] : [],
      },
    });
  } else {
    /** this inline fragment has other selections, so we replace ancestor.selection.selectionSet with  nextSelectionSet _and_ add siblings*/
    if (nextSelectionSet) {
      (selection.selectionSet as SelectionSetNode) = nextSelectionSet;

      return setNextSelectionSet({
        nextSelectionSet: {
          kind: Kind.SELECTION_SET,
          selections: siblings ? [selection, ...siblings] : [selection],
        },
      });
    }
  }
  return undefined;
};
