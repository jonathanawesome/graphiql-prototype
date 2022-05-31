/** components */
import { Command, Ellipsis, Search, RootType } from '@/components';

/** hooks */
import { useGraphiQL } from '@/hooks';

/** styles */
import {
  ContainRight,
  EllipsisWrap,
  ExplorerContent,
  ExplorerContentWrap,
  ExplorerLead,
  ExplorerStyled,
  FakeSearch,
} from './styles';

export const Explorer = () => {
  const { schema } = useGraphiQL();

  if (!schema) {
    //TODO: some loading skeleton
    return <p>loading...</p>;
  }

  const queryType = schema.getQueryType();
  // const mutationType = schema.getMutationType();

  return (
    <ExplorerStyled>
      <ExplorerLead>
        <h2>Docs</h2>
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
      </ExplorerLead>
      <ExplorerContentWrap>
        <ExplorerContent>
          {queryType ? <RootType rootType={queryType} /> : null}
          {/* {mutationType ? <RootType rootType={mutationType} /> : null} */}
        </ExplorerContent>
      </ExplorerContentWrap>
    </ExplorerStyled>
  );
};
