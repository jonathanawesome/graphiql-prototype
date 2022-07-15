import { GraphiQLEditor, useGraphiQLSchema } from '@graphiql-prototype/graphiql-editor';

// components
import { Navigation } from '../Navigation';
import { PanePlugins } from '../PanePlugins';
import { Resizer } from '@graphiql-prototype/graphiql-ui-library';

// hooks
import { useGraphiQL } from '../../hooks';

// styles
import { GraphiQLWrap, ContentWrap, PaneWrap, PluginName } from './styles';

// types
import type { PanePluginsArray } from '../PanePlugins/types';
import type { DialogPluginsArray } from '../DialogPlugins/types';

type GraphiQLProps = {
  //TODO complete "plugin" props APIs
  panePlugins: PanePluginsArray;
  dialogPlugins: DialogPluginsArray;
};

export const GraphiQL = ({ panePlugins, dialogPlugins }: GraphiQLProps) => {
  const { activePanePlugin } = useGraphiQL();

  const { schemaLoading } = useGraphiQLSchema();

  return (
    <GraphiQLWrap>
      <Navigation panePlugins={panePlugins} dialogPlugins={dialogPlugins} />
      <ContentWrap>
        <Resizer
          direction="horizontal"
          handleStyle="bar"
          pane1={{
            initialFlexGrowValue: activePanePlugin === 'GraphiQL' ? undefined : 0.4,
            component:
              activePanePlugin === 'GraphiQL' ? null : (
                <PaneWrap schemaLoading={schemaLoading}>
                  <PluginName>
                    <span>{activePanePlugin}</span>
                  </PluginName>
                  <PanePlugins activePane={activePanePlugin} panePlugins={panePlugins} />
                </PaneWrap>
              ),
          }}
          pane2={{ component: <GraphiQLEditor /> }}
        />
      </ContentWrap>
    </GraphiQLWrap>
  );
};
