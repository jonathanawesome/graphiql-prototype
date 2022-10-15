import { GraphQLFieldMap, Kind, SelectionNode } from 'graphql';

// components
import { Field } from '../index';

// types
import type { AncestorsArray } from '../../hooks';

export const Fields = ({
  ancestors,
  fields,
  parentSelections,
}: {
  ancestors: AncestorsArray;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any>;
  parentSelections: ReadonlyArray<SelectionNode>;
}) => {
  // console.log('rendering Fields', { fields });

  return (
    <>
      {Object.keys(fields).map((f) => (
        <Field
          key={fields[f].name}
          ancestors={[
            ...ancestors,
            {
              field: fields[f],
              selection:
                parentSelections?.find(
                  (s) => s.kind === Kind.FIELD && s.name.value === fields[f].name
                ) || null,
            },
          ]}
        />
      ))}
    </>
  );
};
