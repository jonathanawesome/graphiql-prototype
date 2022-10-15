// import cuid from 'cuid';
import {
  // FieldNode,
  GraphQLFieldMap,
  // InlineFragmentNode,
  Kind,
  // OperationTypeNode,
  SelectionNode,
} from 'graphql';

// components
import { Field } from '../index';

// types
import type {
  // AncestorMap,
  AncestorsArray,
} from '../../hooks';

export const Fields = ({
  ancestors,
  fields,
  // operationType,
  // selection,
  parentSelections,
}: {
  // ancestors: AncestorMap;
  ancestors: AncestorsArray;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any>;
  // operationType: OperationTypeNode;
  // selection: FieldNode | InlineFragmentNode | undefined;
  parentSelections: ReadonlyArray<SelectionNode>;
}) => {
  // const hash = cuid.slug();

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
              // selectionSet: selection?.selectionSet,
              selection:
                parentSelections?.find(
                  (s) => s.kind === Kind.FIELD && s.name.value === fields[f].name
                ) || null,
            },
          ]}
          // operationType={operationType}
        />
      ))}
    </>
  );
};
