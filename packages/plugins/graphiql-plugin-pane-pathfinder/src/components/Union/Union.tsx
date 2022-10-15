// import cuid from 'cuid';

import {
  FieldNode,
  GraphQLObjectType,
  GraphQLUnionType,
  InlineFragmentNode,
  Kind,
  // OperationTypeNode,
  SelectionNode,
} from 'graphql';

// components
import { Fields, ListItem } from '../index';

// types
import type {
  // AncestorMap,
  AncestorsArray,
} from '../../hooks';

type UnionProps = {
  // ancestors: AncestorMap;
  ancestors: AncestorsArray;
  // operationType: OperationTypeNode;
  // selection: FieldNode | InlineFragmentNode | undefined;
  parentSelections: ReadonlyArray<SelectionNode>;
  unionType: GraphQLUnionType;
};

export const Union = ({
  ancestors,
  // operationType,
  parentSelections,
  unionType,
}: UnionProps) => {
  const unionMembers = unionType.getTypes();

  // console.log('rendering Union', { unionMembers });

  return (
    <>
      {unionMembers.map((o) => (
        <UnionMember
          key={o.name}
          ancestors={ancestors}
          objectMember={o}
          // operationType={operationType}
          parentSelections={parentSelections}
        />
      ))}
    </>
  );
};

const UnionMember = ({
  ancestors,
  objectMember,
  // operationType,
  // selection,
  parentSelections,
}: {
  // ancestors: AncestorMap;
  ancestors: AncestorsArray;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  objectMember: GraphQLObjectType<any, any>;
  // operationType: OperationTypeNode;
  // selection: FieldNode | InlineFragmentNode | undefined;
  parentSelections: ReadonlyArray<SelectionNode>;
}) => {
  // const hash = cuid.slug();

  const inlineFragmentNode = parentSelections?.find(
    (s) =>
      s.kind === Kind.INLINE_FRAGMENT && s.typeCondition?.name.value === objectMember.name
  ) as InlineFragmentNode | undefined;

  return (
    <ListItem
      collapsibleContent={{
        childFields: (
          <Fields
            ancestors={[
              ...ancestors,
              {
                onType: objectMember.name,
                // selectionSet: selection?.selectionSet,
                selection: inlineFragmentNode || null,
              },
            ]}
            fields={objectMember.getFields()}
            // operationType={operationType}
            parentSelections={inlineFragmentNode ? [inlineFragmentNode] : []}
            // selection={inlineFragmentNode}
          />
        ),
      }}
      isSelected={!!inlineFragmentNode}
      type={objectMember}
      variant="INLINE_FRAGMENT"
    />
  );
};
