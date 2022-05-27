import cuid from 'cuid';
import { FieldNode, GraphQLFieldMap, InlineFragmentNode } from 'graphql';

/** components */
import { Field } from '../Field';

/** styles */
import { ObjectTypeWrap } from './styles';

/** types */
import type { AncestorMap } from '../Field/toggleField';

type ObjectTypeProps = {
  ancestors: AncestorMap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any> | null;
  selection: FieldNode | InlineFragmentNode | undefined;
};

export const ObjectType = ({ ancestors, fields, selection }: ObjectTypeProps) => {
  const hash = cuid();

  console.log('rendering ObjectType', { fields, selection });

  return (
    <ObjectTypeWrap>
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
                      selection: selection?.selectionSet?.selections.find((selection) => {
                        (selection as FieldNode).name.value === fields[f].name;
                      }),
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
