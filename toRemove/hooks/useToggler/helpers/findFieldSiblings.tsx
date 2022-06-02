import { FieldNode, InlineFragmentNode, SelectionNode } from 'graphql';

/** types */
import { AncestorTypes } from '../types';

export const findFieldSiblings = ({
  ancestor,
}: {
  ancestor: AncestorTypes;
}): SelectionNode[] | undefined => {
  if ('field' in ancestor) {
    return ancestor.selectionSet?.selections.filter(
      (s) => (s as FieldNode).name.value !== ancestor.field?.name
    ) as SelectionNode[];
  } else if ('onType' in ancestor) {
    return ancestor.selectionSet?.selections.filter(
      (s) => (s as InlineFragmentNode).typeCondition?.name.value !== ancestor.onType
    ) as SelectionNode[];
  }
  return undefined;
};
