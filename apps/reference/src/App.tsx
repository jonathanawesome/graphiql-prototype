import { useEffect } from 'react';
import { GraphiQL } from '@graphiql-prototype/graphiql-app';

// pane plugins
import { PanePluginDocs } from '@graphiql-prototype/graphiql-plugin-pane-docs';
import { PanePluginEasyVars } from '@graphiql-prototype/graphiql-plugin-pane-easy-vars';
import { PanePluginHistory } from '@graphiql-prototype/graphiql-plugin-pane-history';
import { PanePluginPathfinder } from '@graphiql-prototype/graphiql-plugin-pane-pathfinder';

// dialog plugins
import { DialogPluginSchemaSelector } from '@graphiql-prototype/graphiql-plugin-dialog-schema-selector';
import { DialogPluginSettings } from '@graphiql-prototype/graphiql-plugin-dialog-settings';

// hooks
import { useGraphiQLSchema } from '@graphiql-prototype/graphiql-editor';

// styles
import { globalStyles } from '@graphiql-prototype/graphiql-ui-library';

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
      dialogPlugins={[DialogPluginSchemaSelector, DialogPluginSettings]}
      panePlugins={[
        PanePluginPathfinder,
        PanePluginHistory,
        PanePluginEasyVars,
        PanePluginDocs,
      ]}
      theme={{
        colors: {
          neutral: '#123',
          primary: '#asd',
          secondary: '#Asd',
        },
      }}
    />
  );
};
