import { Kind, NonNullTypeNode } from 'graphql';
import { buildListTypeNode } from './buildListTypeNode';
import { buildNamedTypeNode } from './buildNamedTypeNode';

export const buildNonNullTypeNode = ({
  typeNode,
}: {
  typeNode: NonNullTypeNode;
}): NonNullTypeNode => {
  // console.log('running buildNonNullTypeNode', typeNode);

  if (typeNode.type.kind === Kind.LIST_TYPE) {
    return {
      kind: Kind.NON_NULL_TYPE,
      type: buildListTypeNode({ typeNode: typeNode.type }),
    };
  } else {
    // not ListType...must be a NamedType
    return {
      kind: Kind.NON_NULL_TYPE,
      type: buildNamedTypeNode({ typeNode: typeNode.type }),
    };
  }
};
