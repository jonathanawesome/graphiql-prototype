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
import { Collapser, Column, ObjectType } from '../index';
import { DescriptionListItem } from '@graphiql-v2-prototype/graphiql-ui-library';

// hooks
import { useDocs } from '@graphiql-v2-prototype/graphiql-plugin-pane-docs';
import { AncestorMap, usePathfinder } from '../../hooks';

// utils
import { unwrapType } from '../../utils';

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

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { descriptionsVisibility } = usePathfinder();
  const { navigateForward } = useDocs();

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
          // type={objectMember.toString()}
          type={
            <button
              onClick={() => {
                navigateForward({
                  docPane: {
                    description: objectMember.description || null,
                    name: unwrapType(objectMember).toString(),
                    type: objectMember,
                  },
                  placement: 'PATHFINDER',
                });
              }}
            >
              {objectMember.toString()}
            </button>
          }
          entityType="INLINE_FRAGMENT"
        />
      }
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
    />
  );
};
