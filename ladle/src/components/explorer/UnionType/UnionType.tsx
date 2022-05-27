import cuid from 'cuid';

import { FieldNode, GraphQLUnionType, InlineFragmentNode, Kind } from 'graphql';

/** components */
import { ObjectType } from '../ObjectType';

/** styles */
import { UnionTypeWrap } from './styles';

/** types */
import { AncestorMap } from '../Field/toggleField';

/** utils */
import { getTypeFields } from '../../../utils';

type UnionTypeProps = {
  ancestors: AncestorMap;
  selection: FieldNode | InlineFragmentNode | undefined;
  unionType: GraphQLUnionType;
};

export const UnionType = ({ ancestors, selection, unionType }: UnionTypeProps) => {
  console.log('rendering UnionType', { selection });
  const hash = cuid();

  const array = unionType.getTypes();

  return (
    <UnionTypeWrap>
      {array.map((o) => {
        const inlineFragmentNode = selection?.selectionSet?.selections?.find(
          (s) => s.kind === Kind.INLINE_FRAGMENT && s.typeCondition?.name.value === o.name
        ) as InlineFragmentNode | undefined;

        console.log({ 'o.name': o.name, inlineFragmentNode, selection });
        return (
          <div key={o.name}>
            <p>...on {o.name}</p>
            <ObjectType
              ancestors={
                new Map([
                  // inline fragment ancestor here
                  [
                    // hash = safety first!
                    `${o.name}-${hash}`,
                    {
                      onType: o.name,
                      selectionSet: selection?.selectionSet,
                      selection: inlineFragmentNode,
                    },
                  ],
                  ...ancestors,
                ])
              }
              fields={getTypeFields({ type: o })}
              selection={inlineFragmentNode}
            />
          </div>
        );
      })}
    </UnionTypeWrap>
  );
};
