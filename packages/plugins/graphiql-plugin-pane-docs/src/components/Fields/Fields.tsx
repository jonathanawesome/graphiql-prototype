import { GraphQLFieldMap, GraphQLInputFieldMap } from 'graphql';

// components
import { ListItem } from '../ListItem';
import { List } from '../List';

// hooks
import { DocPlacement, useDocs } from '../../hooks';

// utils
import { unwrapType } from '@graphiql-prototype/utils';

type FieldsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any> | GraphQLInputFieldMap;
  placement: DocPlacement;
};

export const Fields = ({ fields, placement }: FieldsProps) => {
  const { navigateForward } = useDocs();

  return (
    <List
      items={Object.keys(fields)
        .sort()
        .map((field) => (
          <ListItem
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
