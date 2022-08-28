import { Kind, NamedTypeNode } from 'graphql';

export const buildNamedTypeNode = ({
  typeNode,
}: {
  typeNode: NamedTypeNode;
}): NamedTypeNode => {
  // console.log('running buildNamedTypeNode', typeNode);

  return {
    kind: Kind.NAMED_TYPE,
    name: {
      kind: Kind.NAME,
      value: typeNode.name.value,
    },
  };
};
