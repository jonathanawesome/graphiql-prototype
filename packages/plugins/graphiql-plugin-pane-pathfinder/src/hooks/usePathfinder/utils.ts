import { AncestorField, AncestorInlineFragment, AncestorTypes } from './types';

export const getAncestorText = ({
  ancestor,
}: {
  ancestor: AncestorField | AncestorInlineFragment;
}) => {
  if (ancestor.type === 'FIELD') {
    return ancestor.field.name;
  }
  if (ancestor.type === 'INLINE_FRAGMENT') {
    return `... on ${ancestor.onType}`;
  }
  return 'WHOOPS';
};

export const hasSiblingSelections = ({
  previousAncestor,
}: {
  previousAncestor: AncestorTypes;
}): boolean => {
  if (
    (previousAncestor.type === 'INLINE_FRAGMENT' || previousAncestor.type === 'FIELD') &&
    previousAncestor.selection &&
    'selectionSet' in previousAncestor.selection &&
    previousAncestor.selection.selectionSet
  ) {
    return previousAncestor.selection.selectionSet.selections.length >= 1;
  }
  if (
    previousAncestor.type === 'ROOT' &&
    previousAncestor.operationDefinition &&
    'selectionSet' in previousAncestor.operationDefinition &&
    previousAncestor.operationDefinition.selectionSet
  ) {
    return previousAncestor.operationDefinition.selectionSet.selections.length >= 1;
  }
  return false;
};

// export const countPreviousAncestorSelections = ({
//   previousAncestor,
// }: {
//   previousAncestor: AncestorTypes;
// }): number => {
//   if (
//     (previousAncestor.type === 'INLINE_FRAGMENT' || previousAncestor.type === 'FIELD') &&
//     previousAncestor.selection &&
//     'selectionSet' in previousAncestor.selection &&
//     previousAncestor.selection.selectionSet
//   ) {
//     return previousAncestor.selection.selectionSet.selections.length;
//   }
//   if (
//     previousAncestor.type === 'ROOT' &&
//     previousAncestor.operationDefinition &&
//     'selectionSet' in previousAncestor.operationDefinition &&
//     previousAncestor.operationDefinition.selectionSet
//   ) {
//     return previousAncestor.operationDefinition.selectionSet.selections.length;
//   }
//   return 0;
// };

export const getLocationFromPreviousAncestor = ({
  previousAncestor,
}: {
  previousAncestor: AncestorTypes;
}) => {
  if (
    (previousAncestor.type === 'INLINE_FRAGMENT' || previousAncestor.type === 'FIELD') &&
    previousAncestor.selection
  ) {
    return previousAncestor.selection.loc;
  }
  if (previousAncestor.type === 'ROOT' && previousAncestor.operationDefinition) {
    return previousAncestor.operationDefinition.loc;
  }
  return null;
};

// const getLocationFromAncestor = ({ index }: { index: number }) => {
//   const ancestor = ancestors[index];
//   console.log('ancester', { ancestor });
//   if (
//     (ancestor.type === 'INLINE_FRAGMENT' || ancestor.type === 'FIELD') &&
//     ancestor.selection
//   ) {
//     return ancestor.selection.loc;
//   }
//   if (ancestor.type === 'ROOT' && ancestor.operationDefinition) {
//     return ancestor.operationDefinition.loc;
//   }
//   return null;
// };
