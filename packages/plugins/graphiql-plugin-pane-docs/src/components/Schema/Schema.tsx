import { GraphQLSchema } from 'graphql';

// components
import { Description } from '../Description';
import { ListItem } from '../ListItem';
import { List } from '../List';
import { Separator } from '../Separator';

// hooks
import { DocPlacement, useDocs } from '../../hooks';
import { Icon } from '@graphiql-prototype/ui-library';

export const Schema = ({
  placement,
  schema,
}: {
  placement: DocPlacement;
  schema: GraphQLSchema;
}) => {
  const { navigateForward } = useDocs();

  // console.log('Schema', { schema });

  const queryType = schema.getQueryType();
  const mutationType = schema.getMutationType();
  const subscriptionType = schema.getSubscriptionType();

  const arr = [
    ...(queryType ? [queryType] : []),
    ...(mutationType ? [mutationType] : []),
    ...(subscriptionType ? [subscriptionType] : []),
  ];

  return (
    <>
      <Description
        copy={
          schema.description && schema.description.length > 0
            ? schema.description
            : `No description`
        }
      />

      <Separator orientation={'horizontal'} />

      <List
        items={arr.map((rootType) => (
          <ListItem
            key={rootType?.name}
            description={rootType.description || null}
            name={rootType.name}
            type={
              <button
                onClick={() => {
                  navigateForward({
                    docPane: {
                      description: rootType.description || null,
                      name: rootType.name,
                      type: rootType,
                    },
                    placement,
                  });
                }}
              >
                <Icon name="Docs" />
                {/* {rootType.toString()} */}
              </button>
            }
          />
        ))}
        title="Root Types"
      />
    </>
  );
};
