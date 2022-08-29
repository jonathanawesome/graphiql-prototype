import { useEffect } from 'react';
import { OperationTypeNode } from 'graphql';

// components
import { DocsDialog, Options, RootOperation } from '../index';
import { Command } from '@graphiql-prototype/ui-library';
import { Search } from '../../icons';

// hooks
import { useDocs } from '@graphiql-prototype/graphiql-plugin-pane-docs';
import { useSchema } from '@graphiql-prototype/use-schema';

// styles
import {
  FakeSearch,
  Note,
  PathfinderContainer,
  PathfinderContent,
  PathfinderLead,
  PathfinderWrap,
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
    return <Note>Unable to load schema.</Note>;
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
