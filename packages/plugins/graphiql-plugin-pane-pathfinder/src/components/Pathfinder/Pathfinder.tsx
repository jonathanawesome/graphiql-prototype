import { Kind, OperationTypeNode } from 'graphql';

// components
import { QuickDocs, RootOperation } from '../index';
import { Button, Message, Tabs } from '@graphiql-prototype/ui-library';

// hooks
import { useEditor } from '@graphiql-prototype/store';
import { useSchema } from '@graphiql-prototype/store';

// using this provider allows us to have separate state for the Schema Reference and the simple docs lookup within Pathfinder
import { SchemaReferenceProvider } from '@graphiql-prototype/graphiql-plugin-schema-documentation';

// styles
import {
  StyledContainer,
  StyledPathfinder,
  StyledPathfinderContent,
  StyledPathfinderLead,
} from './styles';

export const Pathfinder = () => {
  const activeDefinition = useEditor((state) => state.activeDefinition);

  const { schema } = useSchema();

  if (!schema || 'error' in schema) {
    //TODO: loading/error skeleton
    return (
      <StyledContainer>
        <Message message={<p>Unable to load schema</p>} variant="ERROR" />
      </StyledContainer>
    );
  }

  const operationDefinition =
    activeDefinition?.kind === Kind.OPERATION_DEFINITION ? activeDefinition : null;

  // console.log('rendering Pathfinder', { activeDefinition });

  return (
    <SchemaReferenceProvider>
      <StyledPathfinder>
        <StyledPathfinderLead>
          <span>Pathfinder</span>
          <Button
            action={() => undefined}
            icon="Gear"
            label="Pathfinder options"
            size="MEDIUM"
            style="ICON"
          />
        </StyledPathfinderLead>
        <StyledPathfinderContent>
          <Tabs
            initialSelectedTab={
              activeDefinition?.kind === Kind.OPERATION_DEFINITION
                ? activeDefinition?.operation
                : 'query'
            }
            ariaLabel="root operations types and fragments"
            tabbedContent={[
              {
                name: 'Query',
                panel: (
                  <RootOperation
                    ancestors={[
                      {
                        type: 'ROOT',
                        operationType: OperationTypeNode.QUERY,
                        operationDefinition,
                      },
                    ]}
                    fields={schema.getQueryType()?.getFields()}
                  />
                ),
                panelId: 'query',
                tabId: 'query',
              },
              {
                name: 'Mutation',
                panel: (
                  <RootOperation
                    ancestors={[
                      {
                        type: 'ROOT',
                        operationType: OperationTypeNode.MUTATION,
                        operationDefinition,
                      },
                    ]}
                    fields={schema.getMutationType()?.getFields()}
                  />
                ),
                panelId: 'mutation',
                tabId: 'mutation',
              },
              {
                name: 'Subscription',
                panel: (
                  <RootOperation
                    ancestors={[
                      {
                        type: 'ROOT',
                        operationType: OperationTypeNode.SUBSCRIPTION,
                        operationDefinition,
                      },
                    ]}
                    fields={schema.getSubscriptionType()?.getFields()}
                  />
                ),
                panelId: 'subscription',
                tabId: 'subscription',
              },
              {
                name: 'Fragments',
                panel: (
                  <StyledContainer>
                    <Message
                      message={
                        <>
                          This is a placeholder/idea for saving fragments for reuse across
                          tabs/operations. Maybe it doesn't belong here and should be a
                          plugin.
                        </>
                      }
                      variant="WARNING"
                    />
                  </StyledContainer>
                ),
                panelId: 'fragments',
                tabId: 'fragments',
              },
            ]}
          />
        </StyledPathfinderContent>
        <QuickDocs />
      </StyledPathfinder>
    </SchemaReferenceProvider>
  );
};
