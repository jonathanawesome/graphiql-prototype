import { useState } from 'react';
import cuid from 'cuid';

import {
  FieldNode,
  GraphQLObjectType,
  GraphQLUnionType,
  InlineFragmentNode,
  Kind,
} from 'graphql';

/** components */
import { ObjectType } from '../ObjectType';

/** styles */
import {
  Content,
  UnionTypeWrap,
  Trigger,
  TriggerWrap,
  Root,
  NestedObjectType,
} from './styles';
/** types */
import { AncestorMap } from '@/hooks';

/** utils */
import { getTypeFields } from '../../../utils';
import { Caret } from '../../icons';
import { FieldDetails } from '../FieldDetails';

type UnionTypeProps = {
  ancestors: AncestorMap;
  selection: FieldNode | InlineFragmentNode | undefined;
  unionType: GraphQLUnionType;
};

export const UnionType = ({ ancestors, selection, unionType }: UnionTypeProps) => {
  // console.log('rendering UnionType', { selection });

  const array = unionType.getTypes();

  return (
    <UnionTypeWrap>
      {array.map((o) => (
        <UnionMember
          key={o.name}
          ancestors={ancestors}
          objectMember={o}
          selection={selection}
        />
      ))}
    </UnionTypeWrap>
  );
};

const UnionMember = ({
  ancestors,
  objectMember,
  selection,
}: {
  ancestors: AncestorMap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  objectMember: GraphQLObjectType<any, any>;
  selection: FieldNode | InlineFragmentNode | undefined;
}) => {
  const hash = cuid();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const inlineFragmentNode = selection?.selectionSet?.selections?.find(
    (s) =>
      s.kind === Kind.INLINE_FRAGMENT && s.typeCondition?.name.value === objectMember.name
  ) as InlineFragmentNode | undefined;

  return (
    <Root open={isExpanded} onOpenChange={setIsExpanded}>
      <TriggerWrap>
        <Trigger>
          <Caret isExpanded={isExpanded} />
        </Trigger>
        <FieldDetails
          // fieldOrArg={inputTypeArg}
          name={`... on ${objectMember.name}`}
          description={objectMember.description || null}
          isSelected={!!inlineFragmentNode}
          typeName={null}
          variant="INLINE_FRAGMENT"
        />
      </TriggerWrap>
      <Content>
        <NestedObjectType>
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
            fields={getTypeFields({ type: objectMember })}
            parentType="INLINE_FRAGMENT"
            selection={inlineFragmentNode}
          />
        </NestedObjectType>
      </Content>
    </Root>
  );
};
