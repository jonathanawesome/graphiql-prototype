/** components */
import { Navigation } from '../Navigation';
import { GraphiQLEditor } from '@graphiql-v2-prototype/graphiql-editor';
import { PanePlugins } from '../PanePlugins';
import { Resizer } from '@graphiql-v2-prototype/graphiql-ui-library';

/** hooks */
import { useGraphiQL } from '../../hooks';

/** styles */
import { GraphiQLStyled, Wrap } from './styles';

/** types */
import type { PanePluginsArray } from '../PanePlugins/types';
import { DialogPluginsArray } from '../DialogPlugins/types';

type GraphiQLProps = {
  //TODO complete "plugin" props APIs
  panePlugins: PanePluginsArray;
  dialogPlugins: DialogPluginsArray;
};

export const GraphiQL = ({ panePlugins, dialogPlugins }: GraphiQLProps) => {
  const { activePane } = useGraphiQL();
  return (
    <GraphiQLStyled>
      <Navigation panePlugins={panePlugins} dialogPlugins={dialogPlugins} />
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
