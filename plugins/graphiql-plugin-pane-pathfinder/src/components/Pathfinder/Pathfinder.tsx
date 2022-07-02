import { OperationTypeNode } from 'graphql';

// components
import { DocsOverlay, Options, RootOperationType } from '../index';
import { Command } from '@graphiql-v2-prototype/graphiql-ui-library';
import { Search } from '../../icons';

// hooks
import { useDocs } from '@graphiql-v2-prototype/graphiql-plugin-pane-docs';
import { useGraphiQLSchema } from '@graphiql-v2-prototype/graphiql-editor';

// styles
import {
  PathfinderContent,
  PathfinderContentWrap,
  PathfinderLead,
  PathfinderWrap,
  FakeSearch,
} from './styles';

export const Pathfinder = () => {
  const { schema } = useGraphiQLSchema();
  const { getDocsInstance } = useDocs();

  const docsInstance = getDocsInstance({ placement: 'PATHFINDER' });

  if (!schema || 'error' in schema) {
    //TODO: loading/error skeleton
    return <></>;
  }

  const queryType = schema.getQueryType();
  const mutationType = schema.getMutationType();

  return (
    <PathfinderWrap>
      <PathfinderContentWrap overlayVisible={!!docsInstance?.activeDocPane}>
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
            <RootOperationType
              rootType={queryType}
              operationType={OperationTypeNode.QUERY}
            />
          ) : null}
          {mutationType ? (
            <RootOperationType
              rootType={mutationType}
              operationType={OperationTypeNode.MUTATION}
            />
          ) : null}
        </PathfinderContent>
      </PathfinderContentWrap>
      <DocsOverlay />
    </PathfinderWrap>
  );
};
