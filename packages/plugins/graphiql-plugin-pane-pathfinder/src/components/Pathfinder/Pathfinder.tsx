import { useEffect } from 'react';
import { OperationTypeNode } from 'graphql';

// components
import { DocsDialog, Options, RootOperation } from '../index';
import { Command, Message, Tabs } from '@graphiql-prototype/ui-library';
import { Search } from '../Search';

// hooks
import { useDocs } from '@graphiql-prototype/graphiql-plugin-pane-docs';
import { useSchema } from '@graphiql-prototype/use-schema';

// styles
import {
  StyledPathfinder,
  StyledPathfinderContainer,
  StyledPathfinderContent,
  StyledPathfinderLead,
} from './styles';

export const Pathfinder = () => {
  // console.log('rendering Pathfinder');

  const { schema } = useSchema();

  const { getDocsInstance, initDocsInstance } = useDocs();

  const docsInstance = getDocsInstance({ placement: 'PATHFINDER' });

  useEffect(() => {
    if (!docsInstance) {
      // we haven't initialized the Pathfinder instance, let's do it now
      return initDocsInstance({
        placement: 'PATHFINDER',
      });
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!schema || 'error' in schema) {
    //TODO: loading/error skeleton
    return <Message message={<p>Unable to load schema</p>} type="ERROR" />;
  }

  // const queryType = schema.getQueryType();
  // const mutationType = schema.getMutationType();

  return (
    <StyledPathfinder>
      <StyledPathfinderContainer dialogActive={!!docsInstance?.activeDocPane}>
        <StyledPathfinderLead>
          <Search />
          {/* <div>gear Icon</div> */}

          {/* <Options /> */}
        </StyledPathfinderLead>
        <StyledPathfinderContent>
          <Tabs
            ariaLabel="root operations types"
            tabbedContent={[
              {
                id: 'Query',
                name: 'Query',
                panel: (
                  <RootOperation
                    rootType={schema.getQueryType() || null}
                    operationType={OperationTypeNode.QUERY}
                  />
                ),
              },
              {
                id: 'Mutation',
                name: 'Mutation',
                panel: (
                  <RootOperation
                    rootType={schema.getMutationType() || null}
                    operationType={OperationTypeNode.MUTATION}
                  />
                ),
              },
              {
                id: 'Subscription',
                name: 'Subscription',
                panel: (
                  <RootOperation
                    rootType={schema.getSubscriptionType() || null}
                    operationType={OperationTypeNode.SUBSCRIPTION}
                  />
                ),
              },
              {
                id: 'Fragment',
                name: 'Fragment',
                panel: <p>fragment</p>,
              },
            ]}
          />
        </StyledPathfinderContent>
      </StyledPathfinderContainer>
      <DocsDialog dialogActive={!!docsInstance?.activeDocPane} />
    </StyledPathfinder>
  );
};
