import { Pathfinder } from '@graphiql-v2-prototype/graphiql-plugin-pathfinder';

/** components */
import { EditorGroup, Navigation } from '../index';

/** constants */
import { defaultResults } from '../../constants';

/** hooks */
import { useGraphiQL } from '../../hooks';

/** layouts */
import { HorizontallyResizableContainer } from '../../layouts';

/** styles */
import { GraphiQLStyled } from './styles';

// type GraphiQLProps = {};

export const GraphiQL = () => {
  const { results, setResults, schema } = useGraphiQL();

  if (!schema) {
    return <p>loading schema...</p>;
  }

  return (
    <GraphiQLStyled>
      <HorizontallyResizableContainer
        leftPane={{
          component: (
            <>
              <Navigation />
              <Pathfinder />
            </>
          ),
          initialWidthPercent: 40,
        }}
        rightPane={{
          component: (
            <EditorGroup
              defaultResults={defaultResults}
              results={results}
              schema={schema}
              setResults={setResults}
            />
          ),
          initialWidthPercent: 60,
        }}
      />
    </GraphiQLStyled>
  );
};
