import { FieldNode, InlineFragmentNode, Kind, SelectionNode } from 'graphql';

export const findSelection = ({
  fieldName,
  selections,
}: {
  fieldName: string;
  selections: SelectionNode[];
}): InlineFragmentNode | FieldNode | undefined => {
  // console.log('findSelection', { fieldName, selections });
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

// import { FieldNode, InlineFragmentNode, Kind, SelectionNode } from 'graphql';

// export const findSelection = ({
//   fieldName,
//   selections,
// }: {
//   fieldName: string;
//   selections: SelectionNode[];
// }): SelectionNode | undefined => {
//   // console.log('fieldName', { fieldName, selections });
//   const selectionNode = selections?.find((selection) => {
//     // console.log('selection', { selection });

//     if (selection.kind === Kind.INLINE_FRAGMENT) {
//       // return selection.typeCondition?.name.value === fieldName;
//       const foundSelection = selection.selectionSet.selections.find(
//         (s) => (s as FieldNode).name.value === fieldName
//       );
//       // console.log('foundSelection', { foundSelection });
//       return foundSelection;
//     } else if (selection.kind === Kind.FRAGMENT_SPREAD) {
//       //TODO handle fragment spreads
//       // return null;
//     }
//     // otherwise, it's a FIELD
//     return selection.name.value === fieldName;
//   });

//   console.log('selectionNode', { selectionNode });

//   return selectionNode;
//   // if (selectionNode) {

//   //   if (selectionNode.kind === Kind.INLINE_FRAGMENT) {
//   //     return selectionNode;
//   //   }
//   //   if (selectionNode.kind === Kind.FIELD) {
//   //     return selectionNode;
//   //   }
//   // }
//   // return undefined;
// };
