import { useEffect } from 'react';
import { GraphiQL } from '@graphiql-prototype/graphiql';

// pane plugins
import { PanePluginHistory } from '@graphiql-prototype/graphiql-plugin-pane-history';
import { PanePluginPathfinder } from '@graphiql-prototype/graphiql-plugin-pane-pathfinder';

// hooks
import { useSchema } from '@graphiql-prototype/store';

// styles
import { globalStyles } from '@graphiql-prototype/ui-library';

export const App = () => {
  globalStyles();

  const { loadSchema } = useSchema();

  useEffect(() => {
    loadSchema({ init: true, url: 'GraphiQL Test Schema' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <GraphiQL panePlugins={[PanePluginPathfinder, PanePluginHistory]} />;
};
