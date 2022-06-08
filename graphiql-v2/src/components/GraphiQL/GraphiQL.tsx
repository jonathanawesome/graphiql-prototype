import { Pathfinder } from '@graphiql-v2-prototype/graphiql-plugin-pane-pathfinder';
import { Scout } from '@graphiql-v2-prototype/graphiql-scout';
import { HorizontallyResizableContainer } from '@graphiql-v2-prototype/graphiql-ui-library';

/** components */
import {
  // InlineEditor,
  Navigation,
} from '../index';

/** constants */
// import { defaultResults } from '../../constants';

/** hooks */
import { useGraphiQL } from '../../hooks';

/** styles */
import { GraphiQLStyled } from './styles';
// import { TabbedEditors } from '../TabbedEditors';

type GraphiQLProps = {
  //TODO complete "plugin" props APIs
  panePlugins?: React.ReactElement[];
  sidebarPlugins?: React.ReactElement[];
};

export const GraphiQL = ({ panePlugins, sidebarPlugins }: GraphiQLProps) => {
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
              {panePlugins && panePlugins.map((s) => <div key={s?.toString()}>{s}</div>)}
              <Pathfinder />
            </>
          ),
          initialWidthPercent: 40,
        }}
        rightPane={{
          component: <Scout />,
          initialWidthPercent: 60,
        }}
      />
    </GraphiQLStyled>
  );
};
