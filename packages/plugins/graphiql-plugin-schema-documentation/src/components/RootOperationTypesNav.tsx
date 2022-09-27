import type { GraphQLObjectType } from 'graphql';

// components
import { PaneSection } from './PaneSection/PaneSection';
import { TabButton } from './TabButton';
import { Tag } from '@graphiql-prototype/ui-library';

export const RootOperationTypesNav = ({
  queryRootType,
  mutationRootType,
  subscriptionRootType,
}: {
  queryRootType: GraphQLObjectType | null;
  mutationRootType: GraphQLObjectType | null;
  subscriptionRootType: GraphQLObjectType | null;
}) => {
  // console.log('RootOperationTypesNav', {});

  return (
    <PaneSection lead={`Root Operation Types`} withSidePadding={false}>
      {queryRootType && (
        <TabButton
          destinationPane="Query"
          copy={
            <div style={{ display: 'flex', gap: 12 }}>
              Query
              <Tag
                copy={Object.keys(queryRootType.getFields()).length.toString() as string}
                title={`Query`}
                type="OPERATION"
              />
            </div>
          }
        />
      )}
      {mutationRootType && (
        <TabButton
          destinationPane="Mutation"
          copy={
            <div style={{ display: 'flex', gap: 12 }}>
              Mutation
              <Tag
                copy={
                  Object.keys(mutationRootType.getFields()).length.toString() as string
                }
                title={`Mutation`}
                type="OPERATION"
              />
            </div>
          }
        />
      )}

      {subscriptionRootType && (
        <TabButton
          destinationPane="Subscription"
          copy={
            <div style={{ display: 'flex', gap: 12 }}>
              Subscription
              <Tag
                copy={
                  Object.keys(
                    subscriptionRootType.getFields()
                  ).length.toString() as string
                }
                title={`Subscription`}
                type="OPERATION"
              />
            </div>
          }
        />
      )}
    </PaneSection>
  );
};
