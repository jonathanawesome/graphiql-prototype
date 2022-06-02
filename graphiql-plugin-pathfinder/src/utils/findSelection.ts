import { FieldNode, InlineFragmentNode, Kind, SelectionNode } from 'graphql';

export const findSelection = ({
  fieldName,
  selections,
}: {
  fieldName: string;
  selections: SelectionNode[];
}): InlineFragmentNode | FieldNode | undefined => {
  const selectionNode = selections?.find((selection) => {
    if (selection.kind === Kind.INLINE_FRAGMENT) {
      return selection.typeCondition?.name.value === fieldName;
    } else if (selection.kind === Kind.FRAGMENT_SPREAD) {
      //TODO handle fragment spreads
      // return null;
    }
    // otherwise, it's a FIELD
    return selection.name.value === fieldName;
  });

  if (selectionNode) {
    if (selectionNode.kind === Kind.INLINE_FRAGMENT) {
      return selectionNode as InlineFragmentNode;
    }
    if (selectionNode.kind === Kind.FIELD) {
      return selectionNode as FieldNode;
    }
  }
  return undefined;
};
