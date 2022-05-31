import { FieldNode, GraphQLFieldMap } from 'graphql';
import { Field } from '../Field';
import { AncestorMap } from '@/hooks';

/** styles */
import { ChildFieldsWrap } from './styles';

type ChildFieldsProps = {
  ancestors: AncestorMap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any> | null;
  fieldSelection: FieldNode | undefined;
  hash: string;
};

export const ChildFields = ({
  ancestors,
  fields,
  fieldSelection,
  hash,
}: ChildFieldsProps) => {
  console.log('rendering ChildFields', {
    hash,
    ancestors,
  });

  if (!fields) {
    return <p>loading....</p>;
  }

  return (
    <ChildFieldsWrap>
      {Object.keys(fields).map((f) => {
        return (
          <Field
            key={fields[f].name}
            ancestors={
              new Map([
                [
                  `${fields[f].name}-${hash}`,
                  {
                    field: fields[f],
                    selectionSet: fieldSelection?.selectionSet,
                    selection:
                      fieldSelection?.selectionSet?.selections.find(
                        (selection) =>
                          (selection as FieldNode).name.value === fields[f].name
                      ) || null,
                  },
                ],
                ...ancestors,
              ])
            }
          />
        );
      })}
    </ChildFieldsWrap>
  );
};
