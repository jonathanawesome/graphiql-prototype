import { Pathfinder } from '@graphiql-v2-prototype/graphiql-plugin-pathfinder';

/** components */
import { InlineEditor, Navigation } from '../index';

/** constants */
import { defaultResults } from '../../constants';

/** hooks */
import { useGraphiQL } from '../../hooks';

/** layouts */
import { HorizontallyResizableContainer } from '../../layouts';

/** styles */
import { GraphiQLStyled } from './styles';

type GraphiQLProps = {
  sidebarPlugins?: React.ReactElement[];
};

export const GraphiQL = ({ sidebarPlugins }: GraphiQLProps) => {
  const { schema } = useGraphiQL();

  if (!schema) {
    return <p>loading schema...</p>;
  }

  return (
    <GraphiQLStyled>
      <HorizontallyResizableContainer
        leftPane={{
          component: (
            <>
              <Navigation sidebarPlugins={sidebarPlugins} />
              <Pathfinder />
            </>
          ),
          initialWidthPercent: 40,
        }}
        rightPane={{
          component: <InlineEditor defaultResults={defaultResults} />,
          initialWidthPercent: 60,
        }}
      />
    </GraphiQLStyled>
  );
};
