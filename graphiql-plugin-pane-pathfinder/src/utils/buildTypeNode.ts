import { Kind, TypeNode } from 'graphql';
import { buildListTypeNode } from './buildListTypeNode';
import { buildNonNullTypeNode } from './buildNonNullTypeNode';

export const buildTypeNode = ({ typeNode }: { typeNode: TypeNode }): TypeNode => {
  // console.log('running buildTypeNode', { typeNode });

  if (typeNode.kind === Kind.NON_NULL_TYPE) {
    return buildNonNullTypeNode({ typeNode });
  }

  if (typeNode.kind === Kind.LIST_TYPE) {
    return buildListTypeNode({ typeNode });
  }
  return typeNode;
};
