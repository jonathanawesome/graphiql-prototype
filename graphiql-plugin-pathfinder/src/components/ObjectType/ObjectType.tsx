import cuid from 'cuid';
import { FieldNode, GraphQLFieldMap, InlineFragmentNode, Kind } from 'graphql';

/** components */
import { Field } from '../index';

/** styles */
import { ObjectTypeWrap } from './styles';

/** types */
import type { AncestorMap } from '../../hooks';

type ObjectTypeProps = {
  ancestors: AncestorMap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any> | null;
  parentType: 'FIELD' | 'INLINE_FRAGMENT';
  selection: FieldNode | InlineFragmentNode | undefined;
};

export const ObjectType = ({
  ancestors,
  fields,
  parentType,
  selection,
}: ObjectTypeProps) => {
  const hash = cuid.slug();

  // console.log('rendering ObjectType', { fields, selection });

  return (
    <ObjectTypeWrap parentType={parentType}>
      {fields &&
        Object.keys(fields).map((f) => {
          return (
            <Field
              key={fields[f].name}
              ancestors={
                new Map([
                  [
                    // we hash the key here to prevent the spread from overwriting deeply nested fields with the same key
                    `${fields[f].name}-${hash}`,
                    {
                      field: fields[f],
                      selectionSet: selection?.selectionSet,
                      selection:
                        selection?.selectionSet?.selections?.find(
                          (s) => s.kind === Kind.FIELD && s.name.value === fields[f].name
                        ) || null,
                    },
                  ],
                  ...ancestors,
                ])
              }
            />
          );
        })}
    </ObjectTypeWrap>
  );
};
