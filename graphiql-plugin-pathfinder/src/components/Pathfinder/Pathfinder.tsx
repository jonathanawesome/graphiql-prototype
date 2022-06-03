import { Command, Ellipsis, useGraphiQL } from '@graphiql-v2-prototype/graphiql-v2';

/** components */
import { Search, RootType } from '../index';

/** styles */
import {
  ContainRight,
  EllipsisWrap,
  PathfinderContent,
  PathfinderContentWrap,
  PathfinderLead,
  PathfinderStyled,
  FakeSearch,
} from './styles';

export const Pathfinder = () => {
  const { schema } = useGraphiQL();

  if (!schema) {
    //TODO: some loading skeleton
    return <p>loading schema...</p>;
  }

  const queryType = schema.getQueryType();
  const mutationType = schema.getMutationType();

  return (
    <PathfinderStyled>
      <PathfinderLead>
        <h2>Pathfinder</h2>
        <ContainRight>
          <FakeSearch onClick={() => alert('FakeSearch...Todo!')}>
            <Search />
            <span>Search</span>
            <Command />
            <span>K</span>
          </FakeSearch>
          <EllipsisWrap onClick={() => alert('Ellipsis...Todo!')}>
            <Ellipsis />
          </EllipsisWrap>
        </ContainRight>
      </PathfinderLead>
      <PathfinderContentWrap>
        <PathfinderContent>
          {queryType ? <RootType rootType={queryType} /> : null}
          {mutationType ? <RootType rootType={mutationType} /> : null}
        </PathfinderContent>
      </PathfinderContentWrap>
    </PathfinderStyled>
  );
};
