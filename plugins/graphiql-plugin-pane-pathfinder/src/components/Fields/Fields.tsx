import cuid from 'cuid';
import {
  FieldNode,
  GraphQLFieldMap,
  InlineFragmentNode,
  Kind,
  OperationTypeNode,
} from 'graphql';

// components
import { Field } from '../index';

// types
import type { AncestorMap } from '../../hooks';

export const Fields = ({
  ancestors,
  fields,
  operationType,
  selection,
}: {
  ancestors: AncestorMap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any>;
  operationType: OperationTypeNode;
  selection: FieldNode | InlineFragmentNode | undefined;
}) => {
  const hash = cuid.slug();

  // console.log('rendering Fields', { fields });

  return (
    <>
      {Object.keys(fields).map((f) => (
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
          operationType={operationType}
        />
      ))}
    </>
  );
};
