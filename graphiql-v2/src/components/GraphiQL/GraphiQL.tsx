/** components */
import { Navigation } from '../index';
// import { Pathfinder } from '@graphiql-v2-prototype/graphiql-plugin-pane-pathfinder';
import { GraphiQLEditor } from '@graphiql-v2-prototype/graphiql-editor';
import { PanePlugins } from '../PanePlugins';
import { Resizer } from '@graphiql-v2-prototype/graphiql-ui-library';

/** styles */
import { GraphiQLStyled, Wrap } from './styles';

/** types */
import type { PanePluginsArray } from '../PanePlugins/types';
import { useGraphiQL } from '../../hooks';

type SidebarPlugin = React.ReactElement;

type GraphiQLProps = {
  //TODO complete "plugin" props APIs
  panePlugins: PanePluginsArray;
  sidebarPlugins?: SidebarPlugin[];
};

export const GraphiQL = ({ panePlugins, sidebarPlugins }: GraphiQLProps) => {
  const { activePane } = useGraphiQL();
  return (
    <GraphiQLStyled>
      <Navigation panePlugins={panePlugins} sidebarPlugins={sidebarPlugins} />
      <Wrap>
        <Resizer
          direction="horizontal"
          handleStyle="bar"
          pane1={{
            initialFlexGrowValue: activePane === 'GraphiQL' ? undefined : 0.4,
            component:
              activePane === 'GraphiQL' ? null : (
                <PanePlugins activePane={activePane} panePlugins={panePlugins} />
              ),
          }}
          pane2={{ component: <GraphiQLEditor /> }}
        />
      </Wrap>
    </GraphiQLStyled>
  );
};
