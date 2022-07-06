import { useEffect } from 'react';
import { OperationTypeNode } from 'graphql';

// components
import { DocsDialog, Options, RootOperation } from '../index';
import { Command } from '@graphiql-v2-prototype/graphiql-ui-library';
import { Search } from '../../icons';

// hooks
import { useDocs } from '@graphiql-v2-prototype/graphiql-plugin-pane-docs';
import { useGraphiQLSchema } from '@graphiql-v2-prototype/graphiql-editor';

// styles
import {
  PathfinderContainer,
  PathfinderContent,
  PathfinderLead,
  PathfinderWrap,
  FakeSearch,
} from './styles';

export const Pathfinder = () => {
  // console.log('rendering Pathfinder');

  const { schema } = useGraphiQLSchema();

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
    return <></>;
  }

  const queryType = schema.getQueryType();
  const mutationType = schema.getMutationType();

  return (
    <PathfinderWrap>
      <PathfinderContainer dialogActive={!!docsInstance?.activeDocPane}>
        <PathfinderLead>
          <FakeSearch>
            <div>
              <Search />
              <span>Search</span>
            </div>
            <div>
              <Command />
              <span>K</span>
            </div>
          </FakeSearch>
          <Options />
        </PathfinderLead>
        <PathfinderContent>
          {queryType ? (
            <RootOperation rootType={queryType} operationType={OperationTypeNode.QUERY} />
          ) : null}
          {mutationType ? (
            <RootOperation
              rootType={mutationType}
              operationType={OperationTypeNode.MUTATION}
            />
          ) : null}
        </PathfinderContent>
      </PathfinderContainer>
      <DocsDialog dialogActive={!!docsInstance?.activeDocPane} />
    </PathfinderWrap>
  );
};
