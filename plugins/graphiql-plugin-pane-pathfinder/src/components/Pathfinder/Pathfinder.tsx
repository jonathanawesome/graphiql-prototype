import { OperationTypeNode } from 'graphql';

// components
import { BreadcrumbOverlay, Options, Search, RootOperationType } from '../index';
import { Command } from '@graphiql-v2-prototype/graphiql-ui-library';

// hooks
import { useGraphiQLEditor } from '@graphiql-v2-prototype/graphiql-editor';
import { usePathfinder } from '../../hooks';

// styles
import {
  ContainRight,
  PathfinderContent,
  PathfinderContentWrap,
  PathfinderLead,
  PathfinderWrap,
  FakeSearch,
} from './styles';

export const Pathfinder = () => {
  const { schema } = useGraphiQLEditor();
  const { overlay } = usePathfinder();

  if (!schema) {
    //TODO: some loading skeleton
    return <p>loading schema...</p>;
  }
  if ('error' in schema) {
    //TODO: some error skeleton
    return <p>error loading schema.</p>;
  }

  const queryType = schema.getQueryType();
  const mutationType = schema.getMutationType();

  return (
    <PathfinderWrap>
      <PathfinderLead>
        <h2>Docs</h2>
        <ContainRight>
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
        </ContainRight>
      </PathfinderLead>
      <PathfinderContentWrap>
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
        {overlay.visible && <BreadcrumbOverlay />}
      </PathfinderContentWrap>
    </PathfinderWrap>
  );
};
