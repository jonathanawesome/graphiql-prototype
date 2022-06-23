import { InlineFragmentNode, Kind } from 'graphql';

// helpers
import { getFieldSiblings } from '../helpers';

// types
import {
  AncestorInlineFragment,
  NextSelectionSet,
  SetNextSelectionSetSignature,
} from '../../types';

export const handleAddParentInlineFragment = ({
  ancestor,
  nextSelectionSet,
  setNextSelectionSet,
}: {
  ancestor: AncestorInlineFragment;
  nextSelectionSet: NextSelectionSet;
  setNextSelectionSet: SetNextSelectionSetSignature;
}) => {
  // console.log(`running handleAddParentInlineFragment`, {
  //   ancestor,
  // });

  const newInlineFragmentNode: InlineFragmentNode = {
    kind: Kind.INLINE_FRAGMENT,
    typeCondition: {
      kind: Kind.NAMED_TYPE,
      name: { kind: Kind.NAME, value: ancestor.onType },
    },
    selectionSet: nextSelectionSet ?? {
      kind: Kind.SELECTION_SET,
      selections: [],
    },
  };

  const siblings = getFieldSiblings({ ancestor });

  /** update the nextSelectionSet */
  return setNextSelectionSet({
    nextSelectionSet: {
      kind: Kind.SELECTION_SET,
      selections: siblings
        ? [newInlineFragmentNode, ...siblings]
        : [newInlineFragmentNode],
    },
  });
};
