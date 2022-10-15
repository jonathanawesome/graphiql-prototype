import {
  GraphQLObjectType,
  GraphQLUnionType,
  InlineFragmentNode,
  Kind,
  SelectionNode,
} from 'graphql';

// components
import { Fields, ListItem } from '../index';

// types
import type { AncestorsArray } from '../../hooks';

type UnionProps = {
  ancestors: AncestorsArray;
  parentSelections: ReadonlyArray<SelectionNode>;
  unionType: GraphQLUnionType;
};

export const Union = ({ ancestors, parentSelections, unionType }: UnionProps) => {
  const unionMembers = unionType.getTypes();

  // console.log('rendering Union', { unionMembers });

  return (
    <>
      {unionMembers.map((o) => (
        <UnionMember
          key={o.name}
          ancestors={ancestors}
          objectMember={o}
          parentSelections={parentSelections}
        />
      ))}
    </>
  );
};

const UnionMember = ({
  ancestors,
  objectMember,
  parentSelections,
}: {
  ancestors: AncestorsArray;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  objectMember: GraphQLObjectType<any, any>;
  parentSelections: ReadonlyArray<SelectionNode>;
}) => {
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
                selection: inlineFragmentNode || null,
              },
            ]}
            fields={objectMember.getFields()}
            parentSelections={inlineFragmentNode ? [inlineFragmentNode] : []}
          />
        ),
      }}
      isSelected={!!inlineFragmentNode}
      type={objectMember}
      variant="INLINE_FRAGMENT"
    />
  );
};
