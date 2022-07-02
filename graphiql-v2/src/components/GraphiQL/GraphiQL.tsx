import {
  GraphiQLEditor,
  useGraphiQLSchema,
} from '@graphiql-v2-prototype/graphiql-editor';

// components
import { Navigation } from '../Navigation';
import { PanePlugins } from '../PanePlugins';
import { Resizer } from '@graphiql-v2-prototype/graphiql-ui-library';

// hooks
import { useGraphiQL } from '../../hooks';

// styles
import { GraphiQLWrap, ContentWrap, PaneWrap, SchemaName } from './styles';

// types
import type { PanePluginsArray } from '../PanePlugins/types';
import type { DialogPluginsArray } from '../DialogPlugins/types';

type GraphiQLProps = {
  //TODO complete "plugin" props APIs
  panePlugins: PanePluginsArray;
  dialogPlugins: DialogPluginsArray;
};

export const GraphiQL = ({ panePlugins, dialogPlugins }: GraphiQLProps) => {
  const { activePane } = useGraphiQL();
  const { schemaLoading, schemaName } = useGraphiQLSchema();

  return (
    <GraphiQLWrap>
      <Navigation panePlugins={panePlugins} dialogPlugins={dialogPlugins} />
      <ContentWrap>
        <Resizer
          direction="horizontal"
          handleStyle="bar"
          pane1={{
            initialFlexGrowValue: activePane === 'GraphiQL' ? undefined : 0.4,
            component:
              activePane === 'GraphiQL' ? null : (
                <PaneWrap schemaLoading={schemaLoading}>
                  <SchemaName>
                    <span>{activePane}</span>
                    {/* <span>{schemaName || 'GraphiQL'}</span> */}
                  </SchemaName>
                  <PanePlugins activePane={activePane} panePlugins={panePlugins} />
                </PaneWrap>
              ),
          }}
          pane2={{ component: <GraphiQLEditor /> }}
        />
      </ContentWrap>
    </GraphiQLWrap>
  );
};
