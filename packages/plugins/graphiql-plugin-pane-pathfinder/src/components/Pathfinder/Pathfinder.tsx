import { OperationTypeNode } from 'graphql';

// components
import { QuickDocs, RootOperation } from '../index';
import { Message, Tabs } from '@graphiql-prototype/ui-library';

// hooks
import { useEditor } from '@graphiql-prototype/store';
import { useSchema } from '@graphiql-prototype/store';

// using this provider allows us to have separate state for the Schema Reference and the simple docs lookup within Pathfinder
import { SchemaReferenceProvider } from '@graphiql-prototype/graphiql-plugin-schema-documentation';

// styles
import {
  StyledContainer,
  StyledPathfinder,
  StyledPathfinderContainer,
  StyledPathfinderContent,
} from './styles';

export const Pathfinder = () => {
  const activeEditorTab = useEditor().getActiveTab();

  const { schema } = useSchema();

  if (!schema || 'error' in schema) {
    //TODO: loading/error skeleton
    return (
      <StyledContainer>
        <Message message={<p>Unable to load schema</p>} variant="ERROR" />
      </StyledContainer>
    );
  }

  // console.log('rendering Pathfinder', { typeMap: schema.getTypeMap() });

  return (
    <SchemaReferenceProvider>
      <StyledPathfinder>
        <StyledPathfinderContainer>
          <StyledPathfinderContent>
            <Tabs
              initialActiveTab={activeEditorTab?.operationDefinition?.operation}
              ariaLabel="root operations types"
              tabbedContent={[
                {
                  id: 'query',
                  name: 'Query',
                  panel: (
                    <RootOperation
                      ancestors={[
                        {
                          type: 'ROOT',
                          operationType: OperationTypeNode.QUERY,
                          operationDefinition:
                            activeEditorTab && activeEditorTab.operationDefinition,
                        },
                      ]}
                      fields={schema.getQueryType()?.getFields()}
                    />
                  ),
                },
                {
                  id: 'mutation',
                  name: 'Mutation',
                  panel: (
                    <RootOperation
                      ancestors={[
                        {
                          type: 'ROOT',
                          operationType: OperationTypeNode.MUTATION,
                          operationDefinition:
                            activeEditorTab && activeEditorTab.operationDefinition,
                        },
                      ]}
                      fields={schema.getMutationType()?.getFields()}
                    />
                  ),
                },
                {
                  id: 'subscription',
                  name: 'Subscription',
                  panel: (
                    <RootOperation
                      ancestors={[
                        {
                          type: 'ROOT',
                          operationType: OperationTypeNode.SUBSCRIPTION,
                          operationDefinition:
                            activeEditorTab && activeEditorTab.operationDefinition,
                        },
                      ]}
                      fields={schema.getSubscriptionType()?.getFields()}
                    />
                  ),
                },
                // {
                //   id: 'Fragments',
                //   name: 'Fragments',
                //   panel: (
                //     <StyledContainer>
                //       <Message
                //         message={
                //           <>
                //             This is a placeholder/idea for saving fragments for reuse
                //             across tabs/operations. Maybe it doesn't belong here and
                //             should be a plugin.
                //           </>
                //         }
                //         variant="WARNING"
                //       />
                //     </StyledContainer>
                //   ),
                // },
              ]}
            />
          </StyledPathfinderContent>
        </StyledPathfinderContainer>
        <QuickDocs />
      </StyledPathfinder>
    </SchemaReferenceProvider>
  );
};
