import { GraphQLSchema } from 'graphql';

// components
import { DescriptionListItem } from '@graphiql-v2-prototype/graphiql-ui-library';
import { DescriptionList } from '../DescriptionList';
import { DocsDescription } from '../DocsDescription';
import { Separator } from '../Separator';

// hooks
import { DocPlacement, useDocs } from '../../hooks';

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
      <DocsDescription
        copy={
          schema.description && schema.description.length > 0
            ? schema.description
            : `No description`
        }
      />

      <Separator orientation={'horizontal'} />

      <DescriptionList
        items={arr.map((rootType) => (
          <DescriptionListItem
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
                {rootType.toString()}
              </button>
            }
          />
        ))}
        title="Root Types"
      />
    </>
  );
};
