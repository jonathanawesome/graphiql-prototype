import { GraphQLFieldMap, GraphQLInputFieldMap } from 'graphql';

// components
import { DescriptionListItem } from '@graphiql-v2-prototype/graphiql-ui-library';
import { DescriptionList } from '../DescriptionList';

// hooks
import { DocPlacement, useDocs } from '../../hooks';
import { unwrapType } from '@graphiql-v2-prototype/graphiql-utils';

type FieldsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any> | GraphQLInputFieldMap;
  placement: DocPlacement;
};

export const Fields = ({ fields, placement }: FieldsProps) => {
  const { navigateForward } = useDocs();

  return (
    <DescriptionList
      items={Object.keys(fields)
        .sort()
        .map((field) => (
          <DescriptionListItem
            key={fields[field].name}
            description={fields[field].description || null}
            name={fields[field].name}
            type={
              <button
                onClick={() => {
                  navigateForward({
                    docPane: {
                      description: fields[field].description || null,
                      name: unwrapType(fields[field].type).name,
                      type: fields[field].type,
                    },
                    placement,
                  });
                }}
              >
                {fields[field].type.toString()}
              </button>
            }
          />
        ))}
      title="Fields"
    />
  );
};
