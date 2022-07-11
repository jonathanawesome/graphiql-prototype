import { useEffect } from 'react';
import { GraphiQL } from '@graphiql-v2-prototype/graphiql-v2';

// pane plugins
import { PanePluginDocs } from '@graphiql-v2-prototype/graphiql-plugin-pane-docs';
import { PanePluginEasyVars } from '@graphiql-v2-prototype/graphiql-plugin-pane-easy-vars';
import { PanePluginHistory } from '@graphiql-v2-prototype/graphiql-plugin-pane-history';
import { PanePluginPathfinder } from '@graphiql-v2-prototype/graphiql-plugin-pane-pathfinder';

// dialog plugins
import { DialogPluginSchemaSelector } from '@graphiql-v2-prototype/graphiql-plugin-dialog-schema-selector';
import { DialogPluginSettings } from '@graphiql-v2-prototype/graphiql-plugin-dialog-settings';

// hooks
import { useGraphiQLSchema } from '@graphiql-v2-prototype/graphiql-editor';

// styles
import { globalStyles } from '@graphiql-v2-prototype/graphiql-ui-library';

export const App = () => {
  globalStyles();

  const { initSchema } = useGraphiQLSchema();

  useEffect(() => {
    initSchema({
      // url:
      //   import.meta.env.MODE === 'development'
      //     ? 'http://localhost:4000/graphql'
      //     : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GraphiQL
      panePlugins={[
        PanePluginPathfinder,
        PanePluginHistory,
        PanePluginEasyVars,
        PanePluginDocs,
      ]}
      dialogPlugins={[DialogPluginSchemaSelector, DialogPluginSettings]}
    />
  );
};
