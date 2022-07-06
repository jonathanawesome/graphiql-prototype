import cuid from 'cuid';

import {
  FieldNode,
  GraphQLObjectType,
  GraphQLUnionType,
  InlineFragmentNode,
  Kind,
  OperationTypeNode,
} from 'graphql';

// components
import { Fields, ListItem } from '../index';

// types
import type { AncestorMap } from '../../hooks';

type UnionProps = {
  ancestors: AncestorMap;
  operationType: OperationTypeNode;
  selection: FieldNode | InlineFragmentNode | undefined;
  unionType: GraphQLUnionType;
};

export const Union = ({ ancestors, operationType, selection, unionType }: UnionProps) => {
  const unionMembers = unionType.getTypes();

  // console.log('rendering Union', { unionMembers });

  return (
    <>
      {unionMembers.map((o) => (
        <UnionMember
          key={o.name}
          ancestors={ancestors}
          objectMember={o}
          operationType={operationType}
          selection={selection}
        />
      ))}
    </>
  );
};

const UnionMember = ({
  ancestors,
  objectMember,
  operationType,
  selection,
}: {
  ancestors: AncestorMap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  objectMember: GraphQLObjectType<any, any>;
  operationType: OperationTypeNode;
  selection: FieldNode | InlineFragmentNode | undefined;
}) => {
  const hash = cuid.slug();

  const inlineFragmentNode = selection?.selectionSet?.selections?.find(
    (s) =>
      s.kind === Kind.INLINE_FRAGMENT && s.typeCondition?.name.value === objectMember.name
  ) as InlineFragmentNode | undefined;

  return (
    <ListItem
      collapsibleContent={{
        childFields: (
          <Fields
            ancestors={
              new Map([
                // set inline fragment ancestor
                [
                  // hash = safety first!
                  `${objectMember.name}-${hash}`,
                  {
                    onType: objectMember.name,
                    selectionSet: selection?.selectionSet,
                    selection: inlineFragmentNode || null,
                  },
                ],
                ...ancestors,
              ])
            }
            fields={objectMember.getFields()}
            operationType={operationType}
            selection={inlineFragmentNode}
          />
        ),
      }}
      isSelected={!!inlineFragmentNode}
      type={objectMember}
      variant="INLINE_FRAGMENT"
    />
  );
};
