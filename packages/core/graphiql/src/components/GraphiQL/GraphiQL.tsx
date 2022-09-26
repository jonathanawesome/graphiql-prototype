import { GraphiQLEditor } from '@graphiql-prototype/editor';

// components
import { Navigation } from '../Navigation';
import { PanePlugins } from '../PanePlugins';
import { Resizer } from '@graphiql-prototype/ui-library';

// hooks
import { useGraphiQL } from '../../hooks';
import { useSchema } from '@graphiql-prototype/use-schema';

// styles
import { GraphiQLWrap, PaneWrap } from './styles';

// types
import type { PanePluginsArray } from '../PanePlugins/types';
import type { DialogPluginsArray } from '../DialogPlugins/types';

type GraphiQLProps = {
  dialogPlugins: DialogPluginsArray;
  panePlugins: PanePluginsArray;
};

export const GraphiQL = ({ dialogPlugins, panePlugins }: GraphiQLProps) => {
  const { activePanePlugin } = useGraphiQL();

  const { schemaLoading } = useSchema();

  return (
    <GraphiQLWrap>
      {/* <Navigation panePlugins={panePlugins} dialogPlugins={dialogPlugins} /> */}
      <Resizer
        direction="HORIZONTAL"
        handlePosition="RIGHT"
        pane1={{
          component: (
            <PaneWrap schemaLoading={schemaLoading}>
              <PanePlugins activePane={activePanePlugin} panePlugins={panePlugins} />
            </PaneWrap>
          ),
        }}
        pane2={{ component: <GraphiQLEditor />, initialWidthPercentage: 70 }}
      />
    </GraphiQLWrap>
  );
};
