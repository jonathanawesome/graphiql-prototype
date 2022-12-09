import { useEffect } from 'react';

// components
import { GraphiQLEditor } from '@graphiql-prototype/editor';
import { PanePlugins } from '../PanePlugins';
import { globalStyles, Resizer } from '@graphiql-prototype/ui-library';

// hooks
import { useGraphiQL } from '../../hooks';
import { useSchema } from '@graphiql-prototype/store';
import { useTheme } from '@graphiql-prototype/ui-library';

// styles
import { StyledGraphiQLWrap, StyledPaneWrap } from './styles';

// types
import type { PanePluginsArray } from '../PanePlugins/types';

type GraphiQLProps = {
  panePlugins: PanePluginsArray;
};

export const GraphiQL = ({ panePlugins }: GraphiQLProps) => {
  globalStyles();

  const { themeClass } = useTheme();

  const { activePanePlugin } = useGraphiQL();

  const { loadSchema, schemaLoading } = useSchema();

  useEffect(() => {
    loadSchema({ init: true, url: 'GraphiQL Test Schema' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${themeClass()} ${StyledGraphiQLWrap()}`}>
      <Resizer
        direction="HORIZONTAL"
        handlePosition="RIGHT"
        pane1={{
          component: (
            <div className={StyledPaneWrap({ schemaLoading })}>
              <PanePlugins activePane={activePanePlugin} panePlugins={panePlugins} />
            </div>
          ),
        }}
        pane2={{ component: <GraphiQLEditor />, initialWidthPercentage: 70 }}
      />
    </div>
  );
};
