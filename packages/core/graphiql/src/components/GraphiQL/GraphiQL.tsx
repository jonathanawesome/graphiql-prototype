import { GraphiQLEditor } from '@graphiql-prototype/editor';

// components
import { Navigation } from '../Navigation';
import { PanePlugins } from '../PanePlugins';
import { Resizer } from '@graphiql-prototype/ui-library';

// hooks
import { useGraphiQL } from '../../hooks';
import { useSchema } from '@graphiql-prototype/use-schema';

// styles
import { GraphiQLWrap, ContentWrap, PaneWrap, PluginName } from './styles';

// types
import type { PanePluginsArray } from '../PanePlugins/types';
import type { DialogPluginsArray } from '../DialogPlugins/types';

type GraphiQLProps = {
  dialogPlugins: DialogPluginsArray;
  panePlugins: PanePluginsArray;
};

export const GraphiQL = ({ panePlugins, dialogPlugins }: GraphiQLProps) => {
  const { activePanePlugin } = useGraphiQL();

  const { schemaLoading } = useSchema();

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
