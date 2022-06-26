import { useState } from 'react';
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
import {
  Collapser,
  Column,
  // Describe,
  ObjectType,
} from '../index';
import { DescriptionListItem } from '@graphiql-v2-prototype/graphiql-ui-library';

// types
import { AncestorMap, usePathfinder } from '../../hooks';

type UnionTypeProps = {
  ancestors: AncestorMap;
  operationType: OperationTypeNode;
  selection: FieldNode | InlineFragmentNode | undefined;
  unionType: GraphQLUnionType;
};

export const UnionType = ({
  ancestors,
  operationType,
  selection,
  unionType,
}: UnionTypeProps) => {
  const unionMembers = unionType.getTypes();

  // console.log('rendering UnionType', { unionMembers });

  return (
    <Column>
      {unionMembers.map((o) => (
        <UnionMember
          key={o.name}
          ancestors={ancestors}
          objectMember={o}
          operationType={operationType}
          selection={selection}
        />
      ))}
    </Column>
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

  const { descriptionsVisibility } = usePathfinder();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const inlineFragmentNode = selection?.selectionSet?.selections?.find(
    (s) =>
      s.kind === Kind.INLINE_FRAGMENT && s.typeCondition?.name.value === objectMember.name
  ) as InlineFragmentNode | undefined;

  return (
    <Collapser
      content={
        <ObjectType
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
      }
      leadContent={
        <DescriptionListItem
          descriptionPlacement={descriptionsVisibility}
          description={objectMember.description || null}
          isSelected={!!inlineFragmentNode}
          name={`... on`}
          type={objectMember.toString()}
          entityType="INLINE_FRAGMENT"
        />
      }
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
    />
  );
};
