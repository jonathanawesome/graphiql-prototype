import { GraphQLFieldMap, SelectionNode } from 'graphql';

// components
import { Field } from '../index';

// types
import type { AncestorsArray } from '../../hooks';

// utils
import { findSelection } from '../../utils';

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
  // console.log('rendering Fields', { fields, parentSelections });

  return (
    <>
      {Object.keys(fields).map((f) => (
        <Field
          key={fields[f].name}
          ancestors={[
            ...ancestors,
            {
              type: 'FIELD',
              field: fields[f],
              selection:
                findSelection({
                  fieldName: fields[f].name,
                  selections: [...parentSelections],
                }) || null,
            },
          ]}
        />
      ))}
    </>
  );
};
