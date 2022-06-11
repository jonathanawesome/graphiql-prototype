/** components */
import { Navigation } from '../index';
import { Pathfinder } from '@graphiql-v2-prototype/graphiql-plugin-pane-pathfinder';
import { GraphiQLEditor } from '@graphiql-v2-prototype/graphiql-editor';
import { Resizer } from '@graphiql-v2-prototype/graphiql-ui-library';

/** styles */
import { GraphiQLStyled, PanePluginContainer, Wrap } from './styles';

export type PanePlugin = {
  panePluginIcon: React.ReactElement;
  panePluginName: string;
  panePluginContent: React.ReactElement;
};

type SidebarPlugin = React.ReactElement;

type GraphiQLProps = {
  //TODO complete "plugin" props APIs
  panePlugins?: PanePlugin[];
  sidebarPlugins?: SidebarPlugin[];
};

export const GraphiQL = ({ panePlugins, sidebarPlugins }: GraphiQLProps) => {
  return (
    <GraphiQLStyled>
      <Navigation panePlugins={panePlugins} sidebarPlugins={sidebarPlugins} />
      <Wrap>
        <Resizer
          direction="horizontal"
          handleStyle="bar"
          /* {panePlugins && panePlugins.map((s) => <div key={s?.toString()}>{s}</div>)} */
          pane1={{
            initialFlexGrowValue: 0.5,
            component: (
              <PanePluginContainer>
                <Pathfinder />
              </PanePluginContainer>
            ),
          }}
          pane2={{ component: <GraphiQLEditor /> }}
        />
      </Wrap>
    </GraphiQLStyled>
  );
};
