import { useEffect } from 'react';
import { GraphiQL } from '@graphiql-prototype/graphiql';

// pane plugins
import { PanePluginDocs } from '@graphiql-prototype/graphiql-plugin-pane-docs';
import { PanePluginEasyVars } from '@graphiql-prototype/graphiql-plugin-pane-easy-vars';
import { PanePluginHistory } from '@graphiql-prototype/graphiql-plugin-pane-history';
import { PanePluginPathfinder } from '@graphiql-prototype/graphiql-plugin-pane-pathfinder';

// dialog plugins
import { DialogPluginSettings } from '@graphiql-prototype/graphiql-plugin-dialog-settings';

// hooks
import { useSchema } from '@graphiql-prototype/use-schema';

// styles
import { globalStyles } from '@graphiql-prototype/ui-library';

export const App = () => {
  globalStyles();

  const { loadSchema } = useSchema();

  useEffect(() => {
    loadSchema({ init: true, url: 'GraphiQL Test Schema' });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GraphiQL
      dialogPlugins={[DialogPluginSettings]}
      panePlugins={[
        PanePluginPathfinder,
        PanePluginHistory,
        PanePluginEasyVars,
        PanePluginDocs,
      ]}
    />
  );
};
